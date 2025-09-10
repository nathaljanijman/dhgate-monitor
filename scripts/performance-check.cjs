#!/usr/bin/env node
/**
 * Performance Check Script for DHgate Monitor
 * 
 * Analyzes current bundle size and performance metrics
 */

const fs = require('fs');
const path = require('path');

// Performance thresholds
const THRESHOLDS = {
  maxBundleSize: 512000,      // 500KB
  maxMainFileSize: 1024000,   // 1MB  
  maxModuleSize: 256000,      // 250KB
  maxFunctionLength: 100,     // lines
  maxComplexity: 15
};

// Colors for output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m', 
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

/**
 * Analyze main cloudflare_app.js file
 */
function analyzeMainFile() {
  const filePath = path.join(__dirname, '..', 'cloudflare_app.js');
  
  if (!fs.existsSync(filePath)) {
    log('❌ cloudflare_app.js not found', 'red');
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const stats = fs.statSync(filePath);
  
  const analysis = {
    size: stats.size,
    lines: content.split('\n').length,
    functions: (content.match(/function\s+\w+|const\s+\w+\s*=\s*\(.*\)\s*=>/g) || []).length,
    classes: (content.match(/class\s+\w+/g) || []).length,
    comments: (content.match(/\/\*[\s\S]*?\*\/|\/\/.*$/gm) || []).length
  };
  
  log('\n📊 Main File Analysis (cloudflare_app.js):', 'blue');
  log(`   Size: ${(analysis.size / 1024).toFixed(1)}KB ${analysis.size > THRESHOLDS.maxMainFileSize ? '🔴' : '✅'}`);
  log(`   Lines: ${analysis.lines.toLocaleString()}`);
  log(`   Functions: ${analysis.functions}`);
  log(`   Classes: ${analysis.classes}`);
  log(`   Comments: ${analysis.comments}`);
  
  return analysis;
}

/**
 * Analyze modular structure
 */
function analyzeModules() {
  const srcPath = path.join(__dirname, '..', 'src');
  
  if (!fs.existsSync(srcPath)) {
    log('❌ src/ directory not found', 'yellow');
    return [];
  }
  
  const modules = [];
  const utilsPath = path.join(srcPath, 'utils');
  
  if (fs.existsSync(utilsPath)) {
    const files = fs.readdirSync(utilsPath);
    
    files.forEach(file => {
      if (path.extname(file) === '.js') {
        const filePath = path.join(utilsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        
        modules.push({
          name: file,
          size: stats.size,
          lines: content.split('\n').length,
          functions: (content.match(/function\s+\w+|const\s+\w+\s*=\s*\(.*\)\s*=>/g) || []).length,
          exports: (content.match(/export\s+(function|class|const)/g) || []).length
        });
      }
    });
  }
  
  log('\n📦 Modular Structure Analysis:', 'blue');
  modules.forEach(module => {
    const sizeKB = (module.size / 1024).toFixed(1);
    const status = module.size > THRESHOLDS.maxModuleSize ? '🔴' : '✅';
    log(`   ${module.name}: ${sizeKB}KB, ${module.lines} lines, ${module.functions} functions ${status}`);
  });
  
  return modules;
}

/**
 * Check bundle size if webpack dist exists
 */
function checkBundleSize() {
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distPath)) {
    log('\n📦 Bundle Analysis: Not built yet (run npm run build)', 'yellow');
    return null;
  }
  
  const files = fs.readdirSync(distPath);
  const bundles = files.filter(f => f.endsWith('.js'));
  
  log('\n📦 Bundle Analysis:', 'blue');
  
  let totalSize = 0;
  bundles.forEach(bundle => {
    const filePath = path.join(distPath, bundle);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    const status = stats.size > THRESHOLDS.maxBundleSize ? '🔴' : '✅';
    
    log(`   ${bundle}: ${sizeKB}KB ${status}`);
    totalSize += stats.size;
  });
  
  log(`   Total: ${(totalSize / 1024).toFixed(1)}KB`);
  return totalSize;
}

/**
 * Analyze ESLint issues
 */
function checkCodeQuality() {
  const { execSync } = require('child_process');
  
  try {
    const output = execSync('npm run lint', { encoding: 'utf8', stdio: 'pipe' });
    log('\n✅ Code Quality: All ESLint checks passed', 'green');
    return { errors: 0, warnings: 0 };
  } catch (error) {
    const output = error.stdout || error.stderr;
    const errorLines = output.match(/\d+ error/g);
    const warningLines = output.match(/\d+ warning/g);
    
    const errors = errorLines ? parseInt(errorLines[0]) : 0;
    const warnings = warningLines ? parseInt(warningLines[0]) : 0;
    
    log('\n📊 Code Quality Analysis:', 'blue');
    log(`   Errors: ${errors} ${errors === 0 ? '✅' : '🔴'}`);
    log(`   Warnings: ${warnings} ${warnings < 10 ? '✅' : '🟡'}`);
    
    return { errors, warnings };
  }
}

/**
 * Performance recommendations
 */
function generateRecommendations(mainAnalysis, modules, codeQuality) {
  log('\n💡 Performance Recommendations:', 'blue');
  
  const recommendations = [];
  
  if (mainAnalysis?.size > THRESHOLDS.maxMainFileSize) {
    recommendations.push('🔴 CRITICAL: Main file is too large - consider splitting into modules');
  }
  
  if (mainAnalysis?.lines > 10000) {
    recommendations.push('🟡 HIGH: Consider breaking down large functions and classes');
  }
  
  if (codeQuality.errors > 0) {
    recommendations.push('🔴 CRITICAL: Fix ESLint errors to improve code quality');
  }
  
  if (codeQuality.warnings > 50) {
    recommendations.push('🟡 MEDIUM: Clean up ESLint warnings for better maintainability');
  }
  
  if (modules.length === 0) {
    recommendations.push('🟡 MEDIUM: Implement modular architecture for better organization');
  }
  
  if (recommendations.length === 0) {
    log('   ✅ No critical performance issues found!', 'green');
    log('   ✅ Code structure looks good', 'green');
  } else {
    recommendations.forEach(rec => log(`   ${rec}`));
  }
  
  return recommendations;
}

/**
 * Generate performance score
 */
function calculateScore(mainAnalysis, modules, codeQuality) {
  let score = 100;
  
  // Deduct for file size
  if (mainAnalysis?.size > THRESHOLDS.maxMainFileSize) {
    score -= 20;
  }
  
  // Deduct for code quality issues
  score -= codeQuality.errors * 5;
  score -= Math.min(codeQuality.warnings * 0.5, 15);
  
  // Bonus for modular structure
  if (modules.length > 0) {
    score += 10;
  }
  
  score = Math.max(0, Math.min(100, score));
  
  const color = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
  
  log(`\n🏆 Performance Score: ${score}/100 (Grade: ${grade})`, color);
  
  return { score, grade };
}

// Main execution
function main() {
  log('🚀 DHgate Monitor Performance Check', 'blue');
  log('=====================================');
  
  const mainAnalysis = analyzeMainFile();
  const modules = analyzeModules();
  const bundleSize = checkBundleSize();
  const codeQuality = checkCodeQuality();
  
  const recommendations = generateRecommendations(mainAnalysis, modules, codeQuality);
  const performance = calculateScore(mainAnalysis, modules, codeQuality);
  
  log('\n📋 Summary:', 'blue');
  log(`   Main file: ${mainAnalysis ? (mainAnalysis.size / 1024).toFixed(1) + 'KB' : 'N/A'}`);
  log(`   Modules: ${modules.length} created`);
  log(`   Bundle: ${bundleSize ? (bundleSize / 1024).toFixed(1) + 'KB' : 'Not built'}`);
  log(`   Code quality: ${codeQuality.errors} errors, ${codeQuality.warnings} warnings`);
  log(`   Score: ${performance.score}/100 (${performance.grade})`)
  
  process.exit(codeQuality.errors > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}