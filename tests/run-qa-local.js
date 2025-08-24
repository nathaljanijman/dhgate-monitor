#!/usr/bin/env node

/**
 * Local QA Test Runner with Detailed Output
 * 
 * This script runs QA tests and displays results in a readable format
 */

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LocalQARunner {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async run() {
    console.log('🧪 DHgate Monitor - Local QA Test Runner');
    console.log('=====================================');
    console.log(`📅 ${new Date().toLocaleString('nl-NL')}`);
    console.log('');

    try {
      // Ensure directories exist
      await this.createDirectories();

      // Check if server is running
      const serverRunning = await this.checkServer();
      
      if (!serverRunning) {
        console.log('⚠️  Development server is not running at http://localhost:3000');
        console.log('   Start it with: npm run dev');
        console.log('   Then run tests again with: npm run test:qa');
        console.log('');
        return;
      }

      // Run tests with detailed output
      await this.runTests();

      // Display results
      this.displayResults();

    } catch (error) {
      console.error('❌ QA Test Runner failed:', error.message);
    }
  }

  async createDirectories() {
    const dirs = [
      'test-results',
      'test-results/screenshots',
      'test-results/videos',
      'test-results/html-report'
    ];

    for (const dir of dirs) {
      try {
        await fs.mkdir(path.join(process.cwd(), dir), { recursive: true });
      } catch (error) {
        // Directory already exists, that's fine
      }
    }
  }

  async checkServer() {
    try {
      const response = await fetch('http://localhost:3000');
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async runTests() {
    console.log('🚀 Starting QA Tests...');
    console.log('');

    const testSuites = [
      {
        name: '🏠 Landing Page Tests',
        command: 'npx',
        args: ['playwright', 'test', 'tests/e2e/core/landingPage.test.js', '--reporter=json'],
        file: 'tests/e2e/core/landingPage.test.js'
      },
      {
        name: '🔐 Dashboard Access Tests',
        command: 'npx',
        args: ['playwright', 'test', 'tests/e2e/core/dashboardAccess.test.js', '--reporter=json'],
        file: 'tests/e2e/core/dashboardAccess.test.js'
      },
      {
        name: '♿ Accessibility Tests',
        command: 'npx',
        args: ['playwright', 'test', 'tests/e2e/compliance/accessibility.test.js', '--reporter=json'],
        file: 'tests/e2e/compliance/accessibility.test.js'
      },
      {
        name: '🔒 GDPR Compliance Tests',
        command: 'npx',
        args: ['playwright', 'test', 'tests/e2e/compliance/gdpr.test.js', '--reporter=json'],
        file: 'tests/e2e/compliance/gdpr.test.js'
      },
      {
        name: '🚀 Performance & SEO Tests',
        command: 'npx',
        args: ['playwright', 'test', 'tests/e2e/performance/seo.test.js', '--reporter=json'],
        file: 'tests/e2e/performance/seo.test.js'
      }
    ];

    for (const suite of testSuites) {
      console.log(`📋 Running ${suite.name}...`);
      
      try {
        // Check if test file exists
        const testPath = path.join(process.cwd(), suite.file);
        try {
          await fs.access(testPath);
        } catch (error) {
          console.log(`   ⏭️  Skipped (file not found): ${suite.file}`);
          continue;
        }

        const result = await this.runSingleTest(suite);
        this.results.push({
          name: suite.name,
          ...result
        });

        if (result.success) {
          console.log(`   ✅ ${suite.name} - ${result.passed} passed, ${result.failed} failed`);
        } else {
          console.log(`   ❌ ${suite.name} - ${result.failed} failed tests`);
          if (result.errors && result.errors.length > 0) {
            result.errors.forEach(error => {
              console.log(`      • ${error}`);
            });
          }
        }
      } catch (error) {
        console.log(`   ⚠️  ${suite.name} - Error: ${error.message}`);
        this.results.push({
          name: suite.name,
          success: false,
          error: error.message,
          passed: 0,
          failed: 1
        });
      }
      
      console.log('');
    }
  }

  async runSingleTest(suite) {
    return new Promise((resolve, reject) => {
      const testProcess = spawn(suite.command, suite.args, {
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

      testProcess.on('close', (code) => {
        try {
          // Try to parse JSON output
          let results = {};
          if (stdout) {
            try {
              results = JSON.parse(stdout);
            } catch (e) {
              // If JSON parsing fails, create basic result
              results = {
                suites: [],
                tests: [],
                stats: { expected: 0, skipped: 0, ok: code === 0 ? 1 : 0, ko: code === 0 ? 0 : 1 }
              };
            }
          }

          const passed = results.stats?.ok || 0;
          const failed = results.stats?.ko || 0;
          const errors = [];

          // Extract error messages if any
          if (results.tests) {
            results.tests.forEach(test => {
              if (test.status === 'failed' && test.errors) {
                test.errors.forEach(error => {
                  errors.push(`${test.title}: ${error.message}`);
                });
              }
            });
          }

          resolve({
            success: code === 0,
            passed,
            failed,
            errors,
            fullResults: results
          });

        } catch (error) {
          resolve({
            success: false,
            passed: 0,
            failed: 1,
            errors: [stderr || error.message],
            fullResults: {}
          });
        }
      });

      testProcess.on('error', (error) => {
        reject(error);
      });

      // Timeout after 60 seconds
      setTimeout(() => {
        testProcess.kill();
        reject(new Error('Test timed out after 60 seconds'));
      }, 60000);
    });
  }

  displayResults() {
    const endTime = Date.now();
    const duration = Math.round((endTime - this.startTime) / 1000);

    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(50));
    
    let totalPassed = 0;
    let totalFailed = 0;
    let totalSuites = this.results.length;
    let successfulSuites = 0;

    this.results.forEach(result => {
      totalPassed += result.passed || 0;
      totalFailed += result.failed || 0;
      if (result.success) successfulSuites++;
    });

    const overallSuccess = totalFailed === 0;
    const passRate = totalPassed + totalFailed > 0 ? Math.round((totalPassed / (totalPassed + totalFailed)) * 100) : 0;

    console.log(`🎯 Overall Status: ${overallSuccess ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📈 Pass Rate: ${passRate}%`);
    console.log(`📋 Test Suites: ${successfulSuites}/${totalSuites} passed`);
    console.log(`📊 Individual Tests: ${totalPassed} passed, ${totalFailed} failed`);
    console.log('');

    if (totalFailed > 0) {
      console.log('🚨 FAILED TESTS:');
      console.log('-'.repeat(30));
      this.results.forEach(result => {
        if (!result.success && result.errors) {
          console.log(`❌ ${result.name}:`);
          result.errors.forEach(error => {
            console.log(`   • ${error}`);
          });
          console.log('');
        }
      });
    }

    console.log('📁 RESULTS LOCATIONS:');
    console.log('-'.repeat(30));
    console.log('• Screenshots: test-results/screenshots/');
    console.log('• Videos: test-results/videos/');
    console.log('• HTML Report: test-results/html-report/');
    console.log('');

    if (overallSuccess) {
      console.log('🎉 All tests passed! Your platform is working correctly.');
    } else {
      console.log('⚠️  Some tests failed. Please review the errors above and fix the issues.');
    }

    console.log('');
    console.log('💡 TIPS:');
    console.log('• Run specific tests: npm run test:accessibility');
    console.log('• Interactive mode: npm run test:e2e:ui');
    console.log('• View detailed reports in HTML format');
    console.log('• Check screenshots for visual test failures');
  }

  async saveResults() {
    const report = {
      timestamp: new Date().toISOString(),
      duration: Date.now() - this.startTime,
      results: this.results,
      summary: {
        totalPassed: this.results.reduce((sum, r) => sum + (r.passed || 0), 0),
        totalFailed: this.results.reduce((sum, r) => sum + (r.failed || 0), 0),
        totalSuites: this.results.length,
        successfulSuites: this.results.filter(r => r.success).length
      }
    };

    try {
      await fs.writeFile(
        path.join(process.cwd(), 'test-results/local-qa-report.json'),
        JSON.stringify(report, null, 2)
      );
      console.log('💾 Results saved to: test-results/local-qa-report.json');
    } catch (error) {
      console.log('⚠️  Could not save results to file:', error.message);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new LocalQARunner();
  runner.run().then(() => {
    runner.saveResults();
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { LocalQARunner };
export default LocalQARunner;