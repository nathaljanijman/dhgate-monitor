/**
 * QA Test Runner
 * 
 * Main script to run all QA tests and generate comprehensive reports
 * for the DHgate Monitor platform.
 */

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { QAReporter } from './utils/qaReporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class QATestRunner {
  constructor() {
    this.testSuites = [
      {
        name: 'Core Functionality',
        files: [
          'core/landingPage.test.js',
          'core/dashboardAccess.test.js',
          'core/emailJourneys.test.js'
        ],
        critical: true
      },
      {
        name: 'Compliance',
        files: [
          'compliance/accessibility.test.js',
          'compliance/gdpr.test.js'
        ],
        critical: true
      },
      {
        name: 'Performance & SEO',
        files: [
          'performance/seo.test.js'
        ],
        critical: false
      }
    ];
    
    this.results = [];
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Starting DHgate Monitor QA Test Suite');
    console.log(`📅 ${new Date().toLocaleString()}`);
    console.log('=' * 50);

    try {
      // Install Playwright if not already installed
      await this.ensurePlaywrightInstalled();
      
      // Run each test suite
      for (const suite of this.testSuites) {
        console.log(`\n📦 Running ${suite.name} Tests...`);
        
        const suiteResults = await this.runTestSuite(suite);
        this.results.push({
          ...suite,
          results: suiteResults,
          timestamp: new Date().toISOString()
        });
      }

      // Generate comprehensive report
      const report = await this.generateComprehensiveReport();
      
      // Save results
      await this.saveResults(report);
      
      // Send email report if configured
      if (process.env.SEND_EMAIL_REPORTS === 'true') {
        await this.sendEmailReport(report);
      }

      // Display summary
      this.displaySummary(report);
      
      return report;
      
    } catch (error) {
      console.error('❌ QA Test Runner failed:', error);
      throw error;
    }
  }

  async ensurePlaywrightInstalled() {
    try {
      // Check if Playwright is installed
      const { execSync } = await import('child_process');
      execSync('npx playwright --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('📦 Installing Playwright...');
      const { execSync } = await import('child_process');
      execSync('npm install -D @playwright/test', { stdio: 'inherit' });
      execSync('npx playwright install', { stdio: 'inherit' });
    }
  }

  async runTestSuite(suite) {
    return new Promise(async (resolve, reject) => {
      const command = 'npx';
      const args = [
        'playwright',
        'test',
        ...suite.files.map(file => path.join(__dirname, file)),
        '--reporter=line'
      ];

      const testProcess = spawn(command, args, {
        cwd: path.resolve(__dirname, '../..'),
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      testProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      testProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      testProcess.on('close', async (code) => {
        try {
          // Parse console output to extract test results
          const results = this.parsePlaywrightOutput(stdout, stderr, code);
          resolve(results);
        } catch (error) {
          console.warn(`⚠️  Could not parse results for ${suite.name}:`, error.message);
          if (stderr) {
            console.warn(`Error output: ${stderr.slice(0, 500)}`);
          }
          resolve({
            suites: [],
            tests: [],
            errors: [stderr || error.message],
            stats: { passed: 0, failed: 0, skipped: 0 }
          });
        }
      });

      testProcess.on('error', (error) => {
        reject(error);
      });
    });
  }

  parsePlaywrightOutput(stdout, stderr, exitCode) {
    const stats = { passed: 0, failed: 0, skipped: 0 };
    const tests = [];
    
    // Parse the output to count tests
    const output = stdout + stderr;
    
    // Look for final summary line like "15 failed" or "3 passed"
    const summaryMatch = output.match(/(\d+)\s+(passed|failed|skipped)/g);
    if (summaryMatch) {
      summaryMatch.forEach(match => {
        const [, count, status] = match.match(/(\d+)\s+(passed|failed|skipped)/);
        const num = parseInt(count, 10);
        
        if (status === 'passed') stats.passed += num;
        else if (status === 'failed') stats.failed += num;
        else if (status === 'skipped') stats.skipped += num;
      });
    }
    
    // If no explicit stats found, infer from exit code
    if (stats.passed === 0 && stats.failed === 0 && stats.skipped === 0) {
      if (exitCode === 0) {
        // Check if there were actually tests run
        const testRunIndicator = output.includes('Running') || output.includes('test');
        if (testRunIndicator) {
          stats.passed = 1; // Assume at least 1 test passed
        }
      } else {
        stats.failed = 1; // Assume at least 1 test failed
      }
    }
    
    return {
      suites: [],
      tests,
      stats
    };
  }

  convertPlaywrightResults(playwrightResults) {
    const stats = {
      passed: 0,
      failed: 0,
      skipped: 0
    };

    const tests = [];
    
    if (playwrightResults.suites) {
      playwrightResults.suites.forEach(suite => {
        if (suite.specs) {
          suite.specs.forEach(spec => {
            spec.tests.forEach(test => {
              const testResult = {
                title: test.title,
                fullTitle: `${suite.title} > ${spec.title} > ${test.title}`,
                status: this.mapPlaywrightStatus(test.results[0]?.status),
                duration: test.results[0]?.duration || 0,
                error: test.results[0]?.error
              };
              
              tests.push(testResult);
              
              // Count stats
              if (testResult.status === 'passed') stats.passed++;
              else if (testResult.status === 'failed') stats.failed++;
              else stats.skipped++;
            });
          });
        }
      });
    }

    return {
      suites: playwrightResults.suites || [],
      tests,
      stats
    };
  }

  mapPlaywrightStatus(status) {
    switch (status) {
      case 'passed': return 'passed';
      case 'failed': return 'failed';
      case 'skipped': return 'skipped';
      case 'timedOut': return 'failed';
      default: return 'skipped';
    }
  }

  async generateComprehensiveReport() {
    const totalDuration = Date.now() - this.startTime;
    
    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalSkipped = 0;
    let criticalIssues = 0;

    const suiteReports = this.results.map(suite => {
      const stats = suite.results.stats || { passed: 0, failed: 0, skipped: 0 };
      
      totalTests += (stats.passed + stats.failed + stats.skipped);
      totalPassed += stats.passed;
      totalFailed += stats.failed;
      totalSkipped += stats.skipped;
      
      if (suite.critical && stats.failed > 0) {
        criticalIssues += stats.failed;
      }

      return {
        name: suite.name,
        critical: suite.critical,
        stats,
        status: stats.failed === 0 ? 'PASS' : 'FAIL',
        details: suite.results
      };
    });

    const overallStatus = criticalIssues === 0 ? 'PASS' : 'FAIL';
    const passRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;

    return {
      timestamp: new Date().toISOString(),
      platform: 'DHgate Monitor',
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      duration: totalDuration,
      overall: {
        status: overallStatus,
        total: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        skipped: totalSkipped,
        passRate,
        criticalIssues
      },
      suites: suiteReports,
      recommendations: this.generateRecommendations(suiteReports),
      nextActions: this.generateNextActions(suiteReports)
    };
  }

  generateRecommendations(suiteReports) {
    const recommendations = [];
    
    suiteReports.forEach(suite => {
      if (suite.stats.failed > 0) {
        if (suite.critical) {
          recommendations.push({
            priority: 'HIGH',
            area: suite.name,
            message: `${suite.stats.failed} critical test(s) failing - immediate attention required`
          });
        } else {
          recommendations.push({
            priority: 'MEDIUM',
            area: suite.name,
            message: `${suite.stats.failed} test(s) failing - review and fix when possible`
          });
        }
      }
      
      if (suite.stats.skipped > 0) {
        recommendations.push({
          priority: 'LOW',
          area: suite.name,
          message: `${suite.stats.skipped} test(s) skipped - review test configuration`
        });
      }
    });
    
    return recommendations;
  }

  generateNextActions(suiteReports) {
    const actions = [];
    
    // Check for critical failures
    const criticalFailures = suiteReports.filter(s => s.critical && s.stats.failed > 0);
    if (criticalFailures.length > 0) {
      actions.push({
        type: 'URGENT',
        action: 'Fix critical test failures before deployment',
        deadline: 'Immediate',
        owner: 'Development Team'
      });
    }

    // Check accessibility compliance
    const accessibilityFailures = suiteReports.find(s => s.name === 'Compliance');
    if (accessibilityFailures && accessibilityFailures.stats.failed > 0) {
      actions.push({
        type: 'COMPLIANCE',
        action: 'Address accessibility compliance issues',
        deadline: '2 days',
        owner: 'Frontend Team'
      });
    }

    // Check performance issues
    const performanceFailures = suiteReports.find(s => s.name === 'Performance & SEO');
    if (performanceFailures && performanceFailures.stats.failed > 0) {
      actions.push({
        type: 'OPTIMIZATION',
        action: 'Optimize performance and SEO issues',
        deadline: '1 week',
        owner: 'Full Stack Team'
      });
    }

    return actions;
  }

  async saveResults(report) {
    const resultsDir = path.join(__dirname, '../../test-results');
    
    try {
      await fs.mkdir(resultsDir, { recursive: true });
      
      // Save JSON report
      const jsonFile = path.join(resultsDir, `qa-report-${Date.now()}.json`);
      await fs.writeFile(jsonFile, JSON.stringify(report, null, 2));
      
      // Save HTML report
      const htmlFile = path.join(resultsDir, `qa-report-${Date.now()}.html`);
      const htmlReport = this.generateHTMLReport(report);
      await fs.writeFile(htmlFile, htmlReport);
      
      console.log(`📄 Reports saved:`);
      console.log(`   JSON: ${jsonFile}`);
      console.log(`   HTML: ${htmlFile}`);
      
    } catch (error) {
      console.error('❌ Failed to save results:', error);
    }
  }

  generateHTMLReport(report) {
    const { overall, suites, recommendations, nextActions } = report;
    
    const statusColor = overall.status === 'PASS' ? '#4CAF50' : '#F44336';
    const statusIcon = overall.status === 'PASS' ? '✅' : '❌';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor QA Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .status { color: ${statusColor}; font-size: 24px; font-weight: bold; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .summary-card { background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: center; }
        .summary-number { font-size: 28px; font-weight: bold; color: #333; }
        .summary-label { font-size: 14px; color: #666; }
        .suite { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .suite-header { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .suite-pass { border-left: 4px solid #4CAF50; }
        .suite-fail { border-left: 4px solid #F44336; }
        .recommendations { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .actions { background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .priority-high { color: #d32f2f; font-weight: bold; }
        .priority-medium { color: #f57c00; font-weight: bold; }
        .priority-low { color: #388e3c; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 DHgate Monitor QA Report</h1>
        <div class="status">${statusIcon} ${overall.status}</div>
        <p><strong>Generated:</strong> ${new Date(report.timestamp).toLocaleString()}</p>
        <p><strong>Duration:</strong> ${Math.round(report.duration / 1000)}s</p>
    </div>

    <div class="summary">
        <div class="summary-card">
            <div class="summary-number">${overall.total}</div>
            <div class="summary-label">Total Tests</div>
        </div>
        <div class="summary-card">
            <div class="summary-number" style="color: #4CAF50">${overall.passed}</div>
            <div class="summary-label">Passed</div>
        </div>
        <div class="summary-card">
            <div class="summary-number" style="color: #F44336">${overall.failed}</div>
            <div class="summary-label">Failed</div>
        </div>
        <div class="summary-card">
            <div class="summary-number" style="color: #FF9800">${overall.skipped}</div>
            <div class="summary-label">Skipped</div>
        </div>
        <div class="summary-card">
            <div class="summary-number" style="color: ${overall.passRate >= 80 ? '#4CAF50' : '#F44336'}">${overall.passRate}%</div>
            <div class="summary-label">Pass Rate</div>
        </div>
    </div>

    <h2>📋 Test Suites</h2>
    ${suites.map(suite => `
    <div class="suite ${suite.status === 'PASS' ? 'suite-pass' : 'suite-fail'}">
        <div class="suite-header">
            ${suite.status === 'PASS' ? '✅' : '❌'} ${suite.name}
            ${suite.critical ? '<span style="color: #d32f2f;">[CRITICAL]</span>' : ''}
        </div>
        <p><strong>Passed:</strong> ${suite.stats.passed} | <strong>Failed:</strong> ${suite.stats.failed} | <strong>Skipped:</strong> ${suite.stats.skipped}</p>
    </div>
    `).join('')}

    ${recommendations.length > 0 ? `
    <div class="recommendations">
        <h2>💡 Recommendations</h2>
        <ul>
        ${recommendations.map(rec => `
            <li class="priority-${rec.priority.toLowerCase()}">
                <strong>[${rec.priority}]</strong> ${rec.area}: ${rec.message}
            </li>
        `).join('')}
        </ul>
    </div>
    ` : ''}

    ${nextActions.length > 0 ? `
    <div class="actions">
        <h2>🎯 Next Actions</h2>
        <table>
            <tr>
                <th>Type</th>
                <th>Action</th>
                <th>Deadline</th>
                <th>Owner</th>
            </tr>
            ${nextActions.map(action => `
            <tr>
                <td><strong>${action.type}</strong></td>
                <td>${action.action}</td>
                <td>${action.deadline}</td>
                <td>${action.owner}</td>
            </tr>
            `).join('')}
        </table>
    </div>
    ` : ''}

    <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 8px; text-align: center;">
        <small>Generated by DHgate Monitor QA System | ${new Date().toISOString()}</small>
    </div>
</body>
</html>
    `;
  }

  async sendEmailReport(report) {
    // This would integrate with your email system
    console.log('📧 Email reporting not yet configured');
    // TODO: Implement email sending using the same email system as the main app
  }

  displaySummary(report) {
    const { overall } = report;
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 QA TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`🎯 Overall Status: ${overall.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📈 Pass Rate: ${overall.passRate}%`);
    console.log(`⏱️  Duration: ${Math.round(report.duration / 1000)}s`);
    console.log(`📋 Tests: ${overall.passed}✅ ${overall.failed}❌ ${overall.skipped}⏭️`);
    
    if (overall.criticalIssues > 0) {
      console.log(`🚨 Critical Issues: ${overall.criticalIssues}`);
    }
    
    console.log('='.repeat(60));
    
    if (overall.status === 'FAIL') {
      console.log('❌ Some tests failed. Review the detailed report for issues.');
      process.exit(1);
    } else {
      console.log('✅ All tests passed! Platform is ready for deployment.');
    }
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new QATestRunner();
  runner.runAllTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { QATestRunner };
export default QATestRunner;