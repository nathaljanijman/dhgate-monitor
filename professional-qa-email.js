#!/usr/bin/env node

/**
 * Professional QA Email Template - No Icons, Fully Responsive, Brand Compliant
 * With clickable test links and action buttons for failed tests
 */

import nodemailer from 'nodemailer';

async function sendProfessionalQAEmail() {
    console.log('DHgate Monitor - Professional QA Email Sender');
    console.log('==============================================');
    console.log(`${new Date().toLocaleString('nl-NL')}`);
    console.log('');

    // Setup Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply@dhgate-monitor.com',
            pass: 'lmku psea ugao ztjb'
        }
    });

    // Professional responsive email template
    const professionalEmailHTML = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DHgate Monitor QA Rapport</title>
        <!--[if mso]>
        <noscript>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        </noscript>
        <![endif]-->
        <style>
            /* Brand Colors - DHgate Monitor */
            :root {
                --primary-blue: #1e40af;
                --secondary-orange: #ff6b35;
                --text-dark: #1e293b;
                --text-medium: #64748b;
                --text-light: #94a3b8;
                --bg-white: #ffffff;
                --bg-light: #f8fafc;
                --border-light: #e2e8f0;
                --success: #10b981;
                --warning: #f59e0b;
                --danger: #ef4444;
            }

            /* Reset and Base Styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: var(--text-dark);
                background-color: var(--bg-light);
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            /* Email Container */
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: var(--bg-white);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }

            /* Header */
            .header {
                background: linear-gradient(135deg, var(--primary-blue) 0%, #2563eb 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
            }
            
            .header .subtitle {
                font-size: 16px;
                opacity: 0.9;
                font-weight: 400;
            }

            /* Content Area */
            .content {
                padding: 40px 30px;
            }

            /* Summary Stats */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 16px;
                margin-bottom: 40px;
            }

            .stat-card {
                background: var(--bg-light);
                border: 1px solid var(--border-light);
                border-radius: 12px;
                padding: 24px;
                text-align: center;
            }

            .stat-number {
                font-size: 36px;
                font-weight: 800;
                line-height: 1;
                margin-bottom: 8px;
            }

            .stat-label {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--text-medium);
            }

            .stat-success { color: var(--success); }
            .stat-warning { color: var(--warning); }
            .stat-danger { color: var(--danger); }
            .stat-primary { color: var(--primary-blue); }

            /* Test Results */
            .section-title {
                font-size: 20px;
                font-weight: 700;
                margin: 40px 0 24px 0;
                padding-bottom: 12px;
                border-bottom: 2px solid var(--border-light);
                color: var(--text-dark);
            }

            .test-item {
                border: 1px solid var(--border-light);
                border-radius: 8px;
                margin-bottom: 16px;
                overflow: hidden;
                background: var(--bg-white);
            }

            .test-header {
                padding: 20px 24px;
                background: var(--bg-light);
                border-bottom: 1px solid var(--border-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .test-name {
                font-weight: 600;
                font-size: 16px;
                color: var(--text-dark);
            }

            .test-status {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .status-passed {
                background: #dcfce7;
                color: #166534;
            }

            .status-failed {
                background: #fee2e2;
                color: #991b1b;
            }

            .status-warning {
                background: #fef3c7;
                color: #92400e;
            }

            .test-details {
                padding: 20px 24px;
            }

            .test-description {
                color: var(--text-medium);
                margin-bottom: 16px;
                line-height: 1.5;
            }

            /* Action Buttons */
            .action-buttons {
                margin-top: 16px;
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            .btn {
                display: inline-block;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 14px;
                text-decoration: none;
                text-align: center;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .btn-primary {
                background: var(--primary-blue);
                color: white;
            }

            .btn-secondary {
                background: var(--secondary-orange);
                color: white;
            }

            .btn-outline {
                background: transparent;
                border: 2px solid var(--primary-blue);
                color: var(--primary-blue);
            }

            /* Priority Actions */
            .priority-section {
                background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
                border: 2px solid var(--warning);
                border-radius: 12px;
                padding: 24px;
                margin: 32px 0;
            }

            .priority-title {
                color: #92400e;
                font-weight: 700;
                font-size: 18px;
                margin-bottom: 16px;
            }

            .priority-item {
                margin-bottom: 12px;
                padding: 12px 0;
            }

            .priority-high { color: var(--danger); font-weight: 700; }
            .priority-medium { color: var(--warning); font-weight: 600; }
            .priority-low { color: var(--success); font-weight: 500; }

            /* Footer */
            .footer {
                background: var(--bg-light);
                border-top: 1px solid var(--border-light);
                padding: 32px 30px;
                text-align: center;
            }

            .footer-brand {
                font-size: 20px;
                font-weight: 700;
                color: var(--primary-blue);
                margin-bottom: 16px;
            }

            .footer-info {
                font-size: 14px;
                color: var(--text-medium);
                line-height: 1.5;
                margin-bottom: 8px;
            }

            .footer-note {
                font-size: 12px;
                color: var(--text-light);
                font-style: italic;
                margin-top: 16px;
            }

            /* Mobile Responsiveness */
            @media only screen and (max-width: 480px) {
                .header { padding: 30px 20px; }
                .header h1 { font-size: 24px; }
                .content { padding: 30px 20px; }
                .footer { padding: 24px 20px; }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }
                
                .stat-card { padding: 16px; }
                .stat-number { font-size: 28px; }
                
                .test-header {
                    padding: 16px;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }
                
                .test-details { padding: 16px; }
                
                .action-buttons {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                    text-align: center;
                }
            }

            /* Outlook Compatibility */
            @media screen and (max-width: 525px) {
                .email-container { width: 100% !important; }
            }

            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                .email-container { background-color: #1f2937; }
                .content { background-color: #1f2937; }
                .test-item { background-color: #374151; border-color: #4b5563; }
                .test-header { background-color: #374151; }
                .stat-card { background-color: #374151; border-color: #4b5563; }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>DHgate Monitor QA Rapport</h1>
                <div class="subtitle">${new Date().toLocaleDateString('nl-NL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</div>
            </div>

            <!-- Content -->
            <div class="content">
                <!-- Summary Statistics -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number stat-success">3</div>
                        <div class="stat-label">Geslaagd</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number stat-warning">1</div>
                        <div class="stat-label">Waarschuwing</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number stat-danger">2</div>
                        <div class="stat-label">Gefaald</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number stat-primary">50%</div>
                        <div class="stat-label">Slaagkans</div>
                    </div>
                </div>

                <!-- Test Results -->
                <div class="section-title">Test Resultaten</div>

                <!-- Passed Tests -->
                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">SSL Certificaat Validatie</div>
                        <div class="test-status status-passed">Geslaagd</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            SSL certificaat is geldig en veilig. HTTPS verbindingen werken correct.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/ssl-details" class="btn btn-outline">Details Bekijken</a>
                        </div>
                    </div>
                </div>

                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">Performance Audit</div>
                        <div class="test-status status-passed">Geslaagd</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            Website laadtijden binnen acceptabele grenzen. Core Web Vitals zijn geoptimaliseerd.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/performance-details" class="btn btn-outline">Performance Report</a>
                        </div>
                    </div>
                </div>

                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">Email Functionaliteit</div>
                        <div class="test-status status-passed">Geslaagd</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            Email registratie en formulieren functioneren correct. Alle validaties werken.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/email-details" class="btn btn-outline">Email Logs</a>
                        </div>
                    </div>
                </div>

                <!-- Warning Test -->
                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">GDPR Compliance</div>
                        <div class="test-status status-warning">Waarschuwing</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            GDPR compliance kan verbeterd worden. Cookie consent en privacy policy vereisen updates.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/gdpr-fix" class="btn btn-secondary">Fix GDPR Issues</a>
                            <a href="https://dhgate-monitor.com/qa/gdpr-details" class="btn btn-outline">Details</a>
                        </div>
                    </div>
                </div>

                <!-- Failed Tests -->
                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">Website Bereikbaarheid</div>
                        <div class="test-status status-failed">Gefaald</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            Website niet bereikbaar tijdens test. Mogelijk server of DNS problemen.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/uptime-fix" class="btn btn-primary">Fix Server Issues</a>
                            <a href="https://dhgate-monitor.com/qa/uptime-details" class="btn btn-outline">Server Status</a>
                        </div>
                    </div>
                </div>

                <div class="test-item">
                    <div class="test-header">
                        <div class="test-name">Mobile Responsiveness</div>
                        <div class="test-status status-failed">Gefaald</div>
                    </div>
                    <div class="test-details">
                        <div class="test-description">
                            Layout issues op mobile devices. CSS media queries vereisen aanpassingen.
                        </div>
                        <div class="action-buttons">
                            <a href="https://dhgate-monitor.com/qa/mobile-fix" class="btn btn-primary">Fix Mobile Issues</a>
                            <a href="https://dhgate-monitor.com/qa/mobile-details" class="btn btn-outline">Mobile Report</a>
                        </div>
                    </div>
                </div>

                <!-- Priority Actions -->
                <div class="priority-section">
                    <div class="priority-title">Prioriteit Actieplan</div>
                    <div class="priority-item">
                        <span class="priority-high">KRITIEK:</span> Los website bereikbaarheid op binnen 2 uur
                    </div>
                    <div class="priority-item">
                        <span class="priority-high">HOOG:</span> Fix mobile responsiveness issues
                    </div>
                    <div class="priority-item">
                        <span class="priority-medium">MEDIUM:</span> Verbeter GDPR compliance
                    </div>
                    <div class="priority-item">
                        <span class="priority-low">LAAG:</span> Monitor performance trends
                    </div>
                </div>

                <!-- Main Actions -->
                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://dhgate-monitor.com/qa/dashboard" class="btn btn-primary" style="margin: 8px;">QA Dashboard</a>
                    <a href="https://dhgate-monitor.com/qa/fix-all" class="btn btn-secondary" style="margin: 8px;">Fix All Issues</a>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-brand">DHgate Monitor</div>
                <div class="footer-info">Professional E-commerce Monitoring Platform</div>
                <div class="footer-info">Volgende automatische test: Morgen 06:00 UTC</div>
                <div class="footer-note">
                    Voor technische ondersteuning: support@dhgate-monitor.com
                    <br>
                    Dit is een automatisch gegenereerd rapport
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        console.log('Verzenden professionele QA email...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <noreply@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} [ACTIE VEREIST]`,
            html: professionalEmailHTML,
            text: `
DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}

SAMENVATTING:
- 3 tests GESLAAGD (SSL, Performance, Email)
- 1 WAARSCHUWING (GDPR compliance) 
- 2 tests GEFAALD (Bereikbaarheid, Mobile)
- 50% slagingspercentage

URGENTE ACTIES:
1. KRITIEK: Los website bereikbaarheid op (binnen 2 uur)
2. HOOG: Fix mobile responsiveness issues  
3. MEDIUM: Verbeter GDPR compliance

QA Dashboard: https://dhgate-monitor.com/qa/dashboard
Fix All Issues: https://dhgate-monitor.com/qa/fix-all

Voor ondersteuning: support@dhgate-monitor.com
            `
        });

        console.log('Professionele QA email succesvol verzonden!');
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Verzonden naar: nathaljanijman@hotmail.com`);
        console.log('');
        console.log('Email features:');
        console.log('- Geen icons, alleen tekst');
        console.log('- Volledig responsive design');  
        console.log('- DHgate Monitor brand guidelines');
        console.log('- Klikbare test detail links');
        console.log('- Action buttons voor gefaalde tests');
        console.log('- Mobile-first approach');
        
        return info;
        
    } catch (error) {
        console.error('Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Export and run
if (import.meta.url === `file://${process.argv[1]}`) {
    sendProfessionalQAEmail().catch(console.error);
}

export { sendProfessionalQAEmail };