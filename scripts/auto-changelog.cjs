#!/usr/bin/env node

/**
 * Automatic Changelog Generation Script
 * Triggered during production deployments to create changelog entries
 * from git commit messages and version information
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  apiEndpoint: process.env.CHANGELOG_API_ENDPOINT || 'https://dhgate-monitor.nathaljanijman.workers.dev/admin/api/changelog/create',
  adminToken: process.env.ADMIN_TOKEN, // Set via GitHub secrets
  packageJsonPath: path.join(__dirname, '..', 'package.json'),
  changelogPath: path.join(__dirname, '..', 'docs', 'CHANGELOG.md'),
  commitRange: process.env.COMMIT_RANGE || 'HEAD~10..HEAD' // Default: last 10 commits
};

/**
 * Extract version from package.json or git tag
 */
function getCurrentVersion() {
  try {
    // Try to get version from package.json
    if (fs.existsSync(config.packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(config.packageJsonPath, 'utf8'));
      if (packageJson.version) {
        return packageJson.version;
      }
    }
    
    // Fallback: get latest git tag
    try {
      const gitTag = execSync('git describe --tags --abbrev=0 2>/dev/null', { encoding: 'utf8' }).trim();
      if (gitTag) {
        return gitTag.replace(/^v/, ''); // Remove 'v' prefix if present
      }
    } catch (error) {
      console.warn('No git tags found');
    }
    
    // Final fallback: use date-based version
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
    
  } catch (error) {
    console.error('Failed to determine version:', error.message);
    return '1.0.0'; // Ultimate fallback
  }
}

/**
 * Get commit messages since last release
 */
function getRecentCommits() {
  try {
    const gitLog = execSync(`git log ${config.commitRange} --pretty=format:"%h|%s|%b|%an|%ad" --date=iso`, {
      encoding: 'utf8'
    }).trim();
    
    if (!gitLog) {
      return [];
    }
    
    return gitLog.split('\n').map(line => {
      const [hash, subject, body, author, date] = line.split('|');
      return {
        hash: hash,
        subject: subject,
        body: body || '',
        author: author,
        date: new Date(date)
      };
    }).filter(commit => commit.subject); // Filter out empty commits
    
  } catch (error) {
    console.error('Failed to get git commits:', error.message);
    return [];
  }
}

/**
 * Parse commits into changelog categories
 */
function parseCommits(commits) {
  const categories = {
    features: [],
    fixes: [],
    improvements: [],
    breaking_changes: [],
    other: []
  };
  
  const patterns = {
    features: /^(feat|feature|add)(\(.+\))?:/i,
    fixes: /^(fix|bugfix|patch)(\(.+\))?:/i,
    improvements: /^(improve|enhance|perf|refactor|style|docs)(\(.+\))?:/i,
    breaking_changes: /^(breaking|break)(\(.+\))?:/i
  };
  
  commits.forEach(commit => {
    const message = commit.subject;
    let categorized = false;
    
    // Check each pattern
    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(message)) {
        categories[category].push({
          message: message.replace(pattern, '').trim(),
          hash: commit.hash,
          author: commit.author
        });
        categorized = true;
        break;
      }
    }
    
    // If no pattern matches, add to 'other'
    if (!categorized) {
      categories.other.push({
        message: message,
        hash: commit.hash,
        author: commit.author
      });
    }
  });
  
  return categories;
}

/**
 * Generate changelog entry data
 */
function generateChangelogEntry(version, commits) {
  const categories = parseCommits(commits);
  
  // Generate title based on most significant changes
  let title = 'Platform Updates';
  if (categories.breaking_changes.length > 0) {
    title = 'Major Breaking Changes';
  } else if (categories.features.length > 0) {
    title = 'New Features & Enhancements';
  } else if (categories.fixes.length > 0) {
    title = 'Bug Fixes & Improvements';
  }
  
  // Generate description
  const totalChanges = Object.values(categories).reduce((sum, cat) => sum + cat.length, 0);
  const description = `Version ${version} brings ${totalChanges} updates including ` +
    `${categories.features.length} new features, ` +
    `${categories.fixes.length} bug fixes, ` +
    `${categories.improvements.length} improvements, and ` +
    `${categories.breaking_changes.length} breaking changes. ` +
    `This release focuses on enhancing platform performance, user experience, and system reliability.`;
  
  return {
    version: version,
    title: title,
    description: description,
    features: categories.features,
    fixes: categories.fixes,
    improvements: categories.improvements,
    breaking_changes: categories.breaking_changes
  };
}

/**
 * Send changelog entry to API
 */
function createChangelogEntry(changelogData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(changelogData);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Cookie': `admin_token=${config.adminToken}`
      }
    };
    
    const req = https.request(config.apiEndpoint, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200 && response.success) {
            resolve(response);
          } else {
            reject(new Error(`API Error: ${response.error || 'Unknown error'}`));
          }
        } catch (error) {
          reject(new Error(`Invalid API response: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Update local CHANGELOG.md file
 */
function updateLocalChangelog(changelogData) {
  try {
    if (!fs.existsSync(config.changelogPath)) {
      console.warn('Local CHANGELOG.md not found, skipping update');
      return;
    }
    
    const currentChangelog = fs.readFileSync(config.changelogPath, 'utf8');
    
    // Generate new entry
    const newEntry = `
## 🚀 Version ${changelogData.version} - ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}

### ${changelogData.title}
${changelogData.description}

${changelogData.features.length > 0 ? `### ✨ **New Features**
${changelogData.features.map(f => `- ${f.message} (${f.hash})`).join('\n')}
` : ''}
${changelogData.fixes.length > 0 ? `### 🐛 **Bug Fixes**  
${changelogData.fixes.map(f => `- ${f.message} (${f.hash})`).join('\n')}
` : ''}
${changelogData.improvements.length > 0 ? `### 🔧 **Improvements**
${changelogData.improvements.map(f => `- ${f.message} (${f.hash})`).join('\n')}
` : ''}
${changelogData.breaking_changes.length > 0 ? `### ⚠️ **Breaking Changes**
${changelogData.breaking_changes.map(f => `- ${f.message} (${f.hash})`).join('\n')}
` : ''}
`;

    // Insert new entry after the first heading
    const lines = currentChangelog.split('\n');
    const insertIndex = lines.findIndex(line => line.startsWith('## ')) || 3;
    lines.splice(insertIndex, 0, newEntry);
    
    fs.writeFileSync(config.changelogPath, lines.join('\n'), 'utf8');
    console.log('✅ Local CHANGELOG.md updated');
    
  } catch (error) {
    console.error('Failed to update local changelog:', error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting automatic changelog generation...');
  
  // Validate configuration
  if (!config.adminToken) {
    console.error('❌ ADMIN_TOKEN environment variable is required');
    process.exit(1);
  }
  
  try {
    // Get version and commits
    const version = getCurrentVersion();
    const commits = getRecentCommits();
    
    console.log(`📦 Version: ${version}`);
    console.log(`📝 Found ${commits.length} commits to process`);
    
    if (commits.length === 0) {
      console.log('ℹ️ No commits found, skipping changelog generation');
      process.exit(0);
    }
    
    // Generate changelog entry
    const changelogData = generateChangelogEntry(version, commits);
    
    console.log(`📄 Generated changelog entry: ${changelogData.title}`);
    console.log(`📊 Features: ${changelogData.features.length}, Fixes: ${changelogData.fixes.length}, Improvements: ${changelogData.improvements.length}`);
    
    // Create changelog entry via API
    console.log('🌐 Creating changelog entry via API...');
    const result = await createChangelogEntry(changelogData);
    
    console.log('✅ Changelog entry created successfully!');
    console.log(`🆔 Entry ID: ${result.entry.id}`);
    
    // Update local changelog file
    updateLocalChangelog(changelogData);
    
    console.log('🎉 Automatic changelog generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Changelog generation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, generateChangelogEntry, parseCommits };