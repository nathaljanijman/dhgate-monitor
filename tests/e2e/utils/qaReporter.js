/**
 * QA Reporter Utility - Interactieve versie
 * 
 * Centralized reporting system for QA test results
 * with detailed logging and interactive email reporting capability.
 */

export class QAReporter {
  constructor(testSuite) {
    this.testSuite = testSuite;
    this.currentTest = null;
    this.results = [];
    this.startTime = Date.now();
  }

  startTest(testName, category = 'general', description = '', solution = '') {
    this.currentTest = {
      name: testName,
      suite: this.testSuite,
      category: category,
      description: description,
      solution: solution,
      startTime: Date.now(),
      status: 'running',
      details: [],
      screenshots: [],
      technicalInfo: {},
      promptSuggestion: ''
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

  async failTest(message, error = null, screenshot = null, promptSuggestion = '') {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'failed';
    this.currentTest.message = message;
    this.currentTest.error = error;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    this.currentTest.promptSuggestion = promptSuggestion || this.generatePromptSuggestion(this.currentTest.name, message, error);
    
    if (screenshot) {
      this.currentTest.screenshots.push(screenshot);
    }
    
    this.results.push({ ...this.currentTest });
    console.log(`❌ [${this.testSuite}] FAILED: ${this.currentTest.name} - ${message}`);
    
    this.currentTest = null;
  }

  async warnTest(message, details = null, promptSuggestion = '') {
    if (!this.currentTest) return;
    
    this.currentTest.status = 'warning';
    this.currentTest.message = message;
    this.currentTest.endTime = Date.now();
    this.currentTest.duration = this.currentTest.endTime - this.currentTest.startTime;
    this.currentTest.promptSuggestion = promptSuggestion || this.generatePromptSuggestion(this.currentTest.name, message, null);
    
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

  generatePromptSuggestion(testName, message, error) {
    const testPrompts = {
      'Homepage laadtijd': 'Optimaliseer de laadtijd van de homepage. Bekijk de performance metrics en verbeter langzame elementen zoals afbeeldingen, scripts of CSS.',
      'Mobile responsiveness': 'Fix de mobile responsiveness issues. Controleer CSS media queries, flexbox/grid layouts en zorg dat alle elementen goed schalen op verschillende schermgroottes.',
      'Kleurcontrast validatie': 'Verbeter het kleurcontrast voor betere toegankelijkheid. Update kleuren naar WCAG 2.1 AA standaarden (minimaal 4.5:1 contrast ratio voor normale tekst).',
      'Cookie consent banner': 'Fix de cookie consent functionaliteit. Zorg dat de banner correct wordt getoond, cookies worden opgeslagen en gebruikerskeuzes worden gerespecteerd.',
      'Privacy policy link': 'Herstel de privacy policy link. Controleer of de link werkt en naar de juiste pagina verwijst.',
      'Meta tags optimalisatie': 'Optimaliseer de meta tags voor SEO. Voeg ontbrekende title, description, og:tags toe en zorg voor unieke meta data per pagina.',
      'Alt-teksten afbeeldingen': 'Voeg alt-teksten toe aan alle afbeeldingen voor betere toegankelijkheid. Zorg voor beschrijvende alt attributen die de inhoud van de afbeelding uitleggen.',
      'Dashboard toegang': 'Fix de dashboard toegang functionaliteit. Controleer authenticatie, autorisatie en zorg dat gebruikers correct worden doorgeleid.',
      'Email validatie': 'Herstel de email validatie. Implementeer server-side en client-side validatie voor email formaten en functionality.',
      'GDPR compliance': 'Zorg voor GDPR compliance. Implementeer cookie toestemming, privacy policy toegang en data verwijdering opties.',
      'Performance metrics': 'Verbeter de performance metrics. Optimaliseer Core Web Vitals (LCP, FID, CLS) en algemene website snelheid.',
      'Navigatie functionaliteit': 'Fix navigatie problemen. Controleer menu items, links, responsive navigatie en zorg voor consistente user experience.',
      'Toetsenbordnavigatie': 'Implementeer volledige toetsenbordnavigatie. Zorg voor tab-order, focus indicators en keyboard shortcuts voor toegankelijkheid.',
      'Registratie bevestiging': 'Fix email registratie workflow. Controleer email sending, templates en bevestiging processen.',
      'Uitschrijf mechanisme': 'Implementeer unsubscribe functionaliteit. Voeg uitschrijf links toe aan emails en respecteer gebruikerskeuzes.'
    };

    // Zoek specifieke prompt voor deze test
    let prompt = testPrompts[testName] || `Fix de "${testName}" test. Analyseer de fout: "${message}" en implementeer een oplossing.`;
    
    // Voeg error details toe indien beschikbaar
    if (error) {
      prompt += ` Technical error: ${error.toString().substring(0, 200)}`;
    }

    return prompt;
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
        passRate: totalTests > 0 ? Math.round((passed / totalTests) * 100) : 0,
        duration: totalDuration
      },
      results: this.results,
      startTime: this.startTime,
      endTime: Date.now(),
      timestamp: new Date().toISOString()
    };
  }

  async generateEmailReport() {
    const report = this.getReport();
    const { summary, results } = report;
    
    // Create detailed test data for JavaScript
    const testDetailData = results.map(result => ({
      id: result.name.replace(/\s+/g, '-').toLowerCase(),
      name: result.name,
      status: result.status,
      message: result.message,
      error: result.error ? result.error.toString() : null,
      duration: result.duration || 0,
      category: result.category || 'general',
      description: result.description || `Test voor ${result.name}`,
      solution: result.solution || 'Geen specifieke oplossing beschikbaar',
      promptSuggestion: result.promptSuggestion || this.generatePromptSuggestion(result.name, result.message, result.error),
      screenshots: result.screenshots || []
    }));
    
    // Determine overall status
    const overallStatus = summary.failed === 0 ? 'ALLE TESTS GESLAAGD' : `${summary.failed} TEST(S) GEFAALD`;
    const statusClass = summary.failed === 0 ? 'status-success' : 'status-error';
    const statusIcon = summary.failed === 0 ? '✅' : '❌';
    
    // Determine pass rate color
    const passRateColor = summary.passRate >= 95 ? 'var(--success-color)' : summary.passRate >= 80 ? 'var(--warning-color)' : 'var(--danger-color)';
    
    try {
      // Load the interactive template
      const fs = await import('fs/promises');
      const path = await import('path');
      const templatePath = path.join(process.cwd(), 'tests/e2e/templates/interactive-email-template.html');
      let template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables
      template = template
        .replace(/{{date}}/g, new Date().toLocaleDateString('nl-NL'))
        .replace(/{{statusClass}}/g, statusClass)
        .replace(/{{statusIcon}}/g, statusIcon)
        .replace(/{{overallStatus}}/g, overallStatus)
        .replace(/{{totalTests}}/g, summary.total.toString())
        .replace(/{{passedTests}}/g, summary.passed.toString())
        .replace(/{{failedTests}}/g, summary.failed.toString())
        .replace(/{{passRate}}/g, summary.passRate.toString())
        .replace(/{{passRateColor}}/g, passRateColor)
        .replace(/{{testDataJSON}}/g, JSON.stringify(testDetailData));
      
      return template;
      
    } catch (error) {
      console.log('⚠️  Could not load interactive template, using fallback');
      return this.generateBasicTemplate(report, testDetailData);
    }
  }

  generateBasicTemplate(report, testDetailData) {
    const { summary } = report;
    const overallStatus = summary.failed === 0 ? 'ALLE TESTS GESLAAGD' : `${summary.failed} TEST(S) GEFAALD`;
    const statusClass = summary.failed === 0 ? 'status-success' : 'status-error';
    const statusIcon = summary.failed === 0 ? '✅' : '❌';
    
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHgate Monitor QA Rapport</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .status-${statusClass.split('-')[1]} { background: #dcfce7; color: #166534; padding: 15px; margin: 15px 0; }
        .test-list { margin: 20px 0; }
        .test-item { padding: 10px; margin: 5px 0; border: 1px solid #ddd; }
        .status-failed { background: #fee2e2; color: #991b1b; }
        .status-warning { background: #fef3c7; color: #92400e; }
        .status-passed { background: #dcfce7; color: #166534; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 DHgate Monitor QA Rapport</h1>
    </div>
    <div class="content">
        <div class="${statusClass}">
            ${statusIcon} ${overallStatus}
        </div>
        <div class="test-list">
            <h2>Test Resultaten:</h2>
            ${testDetailData.map(test => `
                <div class="test-item status-${test.status}">
                    <strong>${test.name}</strong>: ${test.message}<br>
                    ${test.promptSuggestion ? `<em>Oplossing: ${test.promptSuggestion}</em>` : ''}
                </div>
            `).join('')}
        </div>
        <p>Totaal: ${summary.total} tests | Geslaagd: ${summary.passed} | Gefaald: ${summary.failed}</p>
    </div>
</body>
</html>`;
  }

  // Static method to combine multiple suite reports
  static combineReports(reporters) {
    const combinedResults = [];
    let totalStartTime = Date.now();
    
    reporters.forEach(reporter => {
      const report = reporter.getReport();
      combinedResults.push(...report.results);
      totalStartTime = Math.min(totalStartTime, report.startTime);
    });
    
    const totalTests = combinedResults.length;
    const passed = combinedResults.filter(r => r.status === 'passed').length;
    const failed = combinedResults.filter(r => r.status === 'failed').length;
    const warnings = combinedResults.filter(r => r.status === 'warning').length;
    const skipped = combinedResults.filter(r => r.status === 'skipped').length;
    
    return {
      suite: 'Combined Report',
      summary: {
        total: totalTests,
        passed,
        failed,
        warnings,
        skipped,
        passRate: totalTests > 0 ? Math.round((passed / totalTests) * 100) : 0,
        duration: Date.now() - totalStartTime
      },
      results: combinedResults,
      startTime: totalStartTime,
      endTime: Date.now(),
      timestamp: new Date().toISOString()
    };
  }
}

export default QAReporter;