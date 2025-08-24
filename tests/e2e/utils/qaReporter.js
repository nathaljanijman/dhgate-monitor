/**
 * QA Reporter Utility
 * 
 * Centralized reporting system for QA test results
 * with detailed logging and email reporting capability.
 */

export class QAReporter {
  constructor(testSuite) {
    this.testSuite = testSuite;
    this.currentTest = null;
    this.results = [];
    this.startTime = Date.now();
  }

  startTest(testName) {
    this.currentTest = {
      name: testName,
      suite: this.testSuite,
      startTime: Date.now(),
      status: 'running',
      details: [],
      screenshots: []
    };
    
    console.log(`🧪 [${this.testSuite}] Starting: ${testName}`);
  }

  async passTest(message, details = null) {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'passed';
    this.currentTest.message = message;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    
    if (details) {
      this.currentTest.details.push(details);
    }
    
    this.results.push({ ...this.currentTest });
    console.log(`✅ [${this.testSuite}] PASSED: ${this.currentTest.name} - ${message}`);
    
    this.currentTest = null;
  }

  async failTest(message, error = null, screenshot = null) {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'failed';
    this.currentTest.message = message;
    this.currentTest.error = error;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    
    if (screenshot) {
      this.currentTest.screenshots.push(screenshot);
    }
    
    this.results.push({ ...this.currentTest });
    console.log(`❌ [${this.testSuite}] FAILED: ${this.currentTest.name} - ${message}`);
    
    this.currentTest = null;
  }

  async warnTest(message, details = null) {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'warning';
    this.currentTest.message = message;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    
    if (details) {
      this.currentTest.details.push(details);
    }
    
    this.results.push({ ...this.currentTest });
    console.log(`⚠️  [${this.testSuite}] WARNING: ${this.currentTest.name} - ${message}`);
    
    this.currentTest = null;
  }

  async skipTest(reason) {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'skipped';
    this.currentTest.message = reason;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    
    this.results.push({ ...this.currentTest });
    console.log(`⏭️  [${this.testSuite}] SKIPPED: ${this.currentTest.name} - ${reason}`);
    
    this.currentTest = null;
  }

  getReport() {
    const totalTests = this.results.length;
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;
    
    const totalDuration = Date.now() - this.startTime;
    
    return {
      suite: this.testSuite,
      summary: {
        total: totalTests,
        passed,
        failed,
        warnings,
        skipped,
        duration: totalDuration,
        passRate: totalTests > 0 ? Math.round((passed / totalTests) * 100) : 0
      },
      results: this.results,
      timestamp: new Date().toISOString()
    };
  }

  generateEmailReport() {
    const report = this.getReport();
    const { summary, results } = report;
    
    const statusEmoji = {
      passed: '✅',
      failed: '❌',
      warning: '⚠️',
      skipped: '⏭️'
    };
    
    let html = `
    <h2>🧪 QA Test Report - ${this.testSuite}</h2>
    <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    
    <h3>📊 Summary</h3>
    <ul>
      <li><strong>Total Tests:</strong> ${summary.total}</li>
      <li><strong>✅ Passed:</strong> ${summary.passed}</li>
      <li><strong>❌ Failed:</strong> ${summary.failed}</li>
      <li><strong>⚠️ Warnings:</strong> ${summary.warnings}</li>
      <li><strong>⏭️ Skipped:</strong> ${summary.skipped}</li>
      <li><strong>📈 Pass Rate:</strong> ${summary.passRate}%</li>
      <li><strong>⏱️ Duration:</strong> ${Math.round(summary.duration / 1000)}s</li>
    </ul>
    
    <h3>🔍 Detailed Results</h3>
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr style="background-color: #f0f0f0;">
        <th style="padding: 8px;">Status</th>
        <th style="padding: 8px;">Test Name</th>
        <th style="padding: 8px;">Message</th>
        <th style="padding: 8px;">Duration</th>
      </tr>
    `;
    
    results.forEach(result => {
      const bgColor = result.status === 'failed' ? '#ffebee' : 
                     result.status === 'warning' ? '#fff3e0' : 
                     result.status === 'passed' ? '#e8f5e8' : '#f5f5f5';
      
      html += `
      <tr style="background-color: ${bgColor};">
        <td style="padding: 8px; text-align: center;">${statusEmoji[result.status]}</td>
        <td style="padding: 8px;"><strong>${result.name}</strong></td>
        <td style="padding: 8px;">${result.message}</td>
        <td style="padding: 8px;">${result.duration}ms</td>
      </tr>
      `;
    });
    
    html += `</table>`;
    
    if (summary.failed > 0 || summary.warnings > 0) {
      html += `
      <h3>🚨 Action Items</h3>
      <ul>
      `;
      
      results.filter(r => r.status === 'failed').forEach(result => {
        html += `<li><strong>CRITICAL:</strong> ${result.name} - ${result.message}</li>`;
      });
      
      results.filter(r => r.status === 'warning').forEach(result => {
        html += `<li><strong>REVIEW:</strong> ${result.name} - ${result.message}</li>`;
      });
      
      html += `</ul>`;
    }
    
    return html;
  }

  // Static method to combine multiple suite reports
  static combineReports(reporters) {
    const combinedResults = [];
    let totalPassed = 0, totalFailed = 0, totalWarnings = 0, totalSkipped = 0;
    
    reporters.forEach(reporter => {
      const report = reporter.getReport();
      combinedResults.push(report);
      totalPassed += report.summary.passed;
      totalFailed += report.summary.failed;
      totalWarnings += report.summary.warnings;
      totalSkipped += report.summary.skipped;
    });
    
    const overallTotal = totalPassed + totalFailed + totalWarnings + totalSkipped;
    const overallPassRate = overallTotal > 0 ? Math.round((totalPassed / overallTotal) * 100) : 0;
    
    return {
      timestamp: new Date().toISOString(),
      overall: {
        suites: reporters.length,
        total: overallTotal,
        passed: totalPassed,
        failed: totalFailed,
        warnings: totalWarnings,
        skipped: totalSkipped,
        passRate: overallPassRate
      },
      suiteReports: combinedResults
    };
  }
}

// Export for use in other modules
export default QAReporter;