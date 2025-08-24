#!/usr/bin/env node

/**
 * Improved QA Email Template
 * 
 * Based on qa-email-demo.html with improvements:
 * - Uses the beautiful header from support & contact
 * - Removes all icons (except brand elements)
 * - Fully responsive for all devices
 * - Clickable action buttons for test management
 */

import nodemailer from 'nodemailer';

async function sendImprovedQAEmail() {
    console.log('DHgate Monitor - Improved QA Email (No Icons, All Devices)');
    console.log('=======================================================');
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

    // Improved email template based on qa-email-demo.html
    const improvedEmailHTML = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DHgate Monitor QA Rapport</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
            :root {
                --accent-color: #1e40af;
                --accent-secondary: #ff6b35;
                --text-primary: #1e293b;
                --text-secondary: #64748b;
                --bg-primary: #ffffff;
                --bg-secondary: #f8fafc;
                --border-color: #e2e8f0;
                --success-color: #10b981;
                --warning-color: #f59e0b;
                --danger-color: #ef4444;
                --border-radius: 12px;
            }
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
                font-family: 'Raleway', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: var(--text-primary);
                background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%);
                margin: 0;
                padding: 20px;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            
            /* Email Container */
            .email-container {
                max-width: 800px;
                margin: 0 auto;
                background: var(--bg-primary);
                border-radius: var(--border-radius);
                box-shadow: 0 10px 30px rgba(30, 41, 59, 0.1);
                overflow: hidden;
            }
            
            /* Header - Beautiful gradient with texture */
            .header {
                background: linear-gradient(135deg, var(--accent-color) 0%, #2563eb 100%);
                color: white;
                padding: 40px;
                text-align: center;
                position: relative;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                opacity: 0.3;
            }
            
            .header-content { position: relative; z-index: 2; }
            .logo { 
                font-size: 28px; 
                font-weight: 700; 
                margin-bottom: 8px; 
                letter-spacing: -0.5px; 
            }
            .tagline { 
                font-size: 16px; 
                opacity: 0.9; 
                font-weight: 400; 
            }
            
            /* Content Area */
            .content { padding: 40px; }
            .greeting { 
                font-size: 18px; 
                font-weight: 500; 
                margin-bottom: 24px; 
                color: var(--text-primary); 
            }
            
            /* Status Banner */
            .status-banner { 
                padding: 24px; 
                border-radius: var(--border-radius); 
                text-align: center; 
                font-weight: 600; 
                font-size: 18px; 
                margin: 24px 0; 
                border: 2px solid; 
            }
            
            .status-success { background: #dcfce7; color: #166534; border-color: #16a34a; }
            .status-warning { background: #fef3c7; color: #92400e; border-color: #f59e0b; }
            .status-error { background: #fee2e2; color: #991b1b; border-color: #ef4444; }
            
            /* Metrics Grid */
            .metrics-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
                gap: 20px; 
                margin: 32px 0; 
            }
            
            .metric-card { 
                background: var(--bg-secondary); 
                border: 1px solid var(--border-color); 
                border-radius: var(--border-radius); 
                padding: 24px; 
                text-align: center; 
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .metric-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(30, 64, 175, 0.15);
            }
            
            .metric-number { 
                font-size: 36px; 
                font-weight: 700; 
                color: var(--accent-color); 
                margin-bottom: 8px; 
                line-height: 1; 
            }
            
            .metric-label { 
                font-size: 14px; 
                color: var(--text-secondary); 
                font-weight: 500; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            
            /* Section Styling */
            .section { margin: 32px 0; }
            
            .section-title { 
                font-size: 20px; 
                font-weight: 600; 
                color: var(--text-primary); 
                margin-bottom: 20px; 
                padding-bottom: 12px; 
                border-bottom: 2px solid var(--border-color); 
            }
            
            /* Test Categories */
            .test-category { 
                background: var(--bg-secondary); 
                border: 1px solid var(--border-color); 
                border-radius: var(--border-radius); 
                margin-bottom: 16px; 
                overflow: hidden; 
            }
            
            .category-header { 
                background: linear-gradient(90deg, var(--accent-color), #2563eb); 
                color: white; 
                padding: 16px 24px; 
                font-weight: 600; 
                font-size: 16px; 
            }
            
            .category-content { padding: 20px 24px; }
            
            /* Test Items */
            .test-item { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 16px; 
                border-bottom: 1px solid var(--border-color);
                border-radius: 8px;
                margin: 4px 0;
                transition: all 0.2s ease;
                background: var(--bg-primary);
            }
            
            .test-item:hover {
                background: rgba(30, 64, 175, 0.02);
                transform: translateX(2px);
            }
            
            .test-item:last-child { border-bottom: none; }
            
            .test-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .test-name { 
                font-weight: 500; 
                color: var(--text-primary);
                font-size: 15px;
            }
            
            .test-description {
                font-size: 13px;
                color: var(--text-secondary);
                margin-top: 4px;
            }
            
            /* Test Actions */
            .test-actions {
                display: flex;
                gap: 8px;
                align-items: center;
                margin-left: 16px;
            }
            
            .test-status { 
                padding: 6px 16px; 
                border-radius: 20px; 
                font-size: 12px; 
                font-weight: 600; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            
            .status-passed { background: #dcfce7; color: #166534; }
            .status-failed { background: #fee2e2; color: #991b1b; }
            .status-warning { background: #fef3c7; color: #92400e; }
            
            /* Action Buttons */
            .btn {
                display: inline-block;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                text-decoration: none;
                text-align: center;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
                white-space: nowrap;
            }

            .btn-primary {
                background: var(--accent-color);
                color: white;
            }

            .btn-secondary {
                background: var(--accent-secondary);
                color: white;
            }

            .btn-outline {
                background: transparent;
                border: 1px solid var(--accent-color);
                color: var(--accent-color);
            }

            .btn-fix {
                background: var(--danger-color);
                color: white;
            }

            .btn-details {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
            }

            .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
            
            /* Call to Action */
            .cta-section {
                text-align: center;
                margin: 40px 0;
                padding: 32px;
                background: var(--bg-secondary);
                border-radius: var(--border-radius);
                border: 1px solid var(--border-color);
            }

            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, var(--accent-color), #2563eb);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: var(--border-radius);
                font-weight: 600;
                font-size: 16px;
                margin: 8px 12px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
            }

            .cta-secondary {
                background: linear-gradient(135deg, var(--accent-secondary), #f97316);
                box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
            }

            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
            }
            
            /* Footer */
            .footer {
                background: var(--bg-secondary);
                border-top: 1px solid var(--border-color);
                padding: 32px 40px;
                text-align: center;
            }

            .footer-brand {
                font-weight: 700;
                color: var(--accent-color);
                font-size: 18px;
                margin-bottom: 16px;
            }

            .footer-info {
                color: var(--text-secondary);
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 8px;
            }

            .footer-note {
                color: var(--text-secondary);
                font-size: 12px;
                font-style: italic;
                margin-top: 16px;
            }
            
            /* Mobile Responsiveness - All Devices */
            @media only screen and (max-width: 600px) {
                body { padding: 10px; }
                
                .header, .content { padding: 24px 20px; }
                
                .metrics-grid { 
                    grid-template-columns: 1fr 1fr; 
                    gap: 12px; 
                }
                
                .metric-card { padding: 16px; }
                .metric-number { font-size: 28px; }
                
                .test-item { 
                    flex-direction: column; 
                    align-items: flex-start; 
                    gap: 12px; 
                }
                
                .test-actions {
                    margin-left: 0;
                    width: 100%;
                    justify-content: space-between;
                }
                
                .btn {
                    padding: 10px 16px;
                    font-size: 11px;
                }
                
                .cta-button {
                    display: block;
                    margin: 10px 0;
                }
                
                .cta-section { padding: 20px; }
            }

            /* Small Mobile Phones */
            @media only screen and (max-width: 400px) {
                .metrics-grid {
                    grid-template-columns: 1fr;
                    gap: 10px;
                }
                
                .test-actions {
                    flex-direction: column;
                    gap: 6px;
                }
                
                .btn {
                    width: 100%;
                    text-align: center;
                }
            }

            /* Large Screens */
            @media only screen and (min-width: 1200px) {
                .email-container {
                    max-width: 900px;
                }
                
                .metrics-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }

            /* Tablet Portrait */
            @media only screen and (min-width: 601px) and (max-width: 900px) {
                .metrics-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .test-item {
                    flex-wrap: wrap;
                }
            }

            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                :root {
                    --bg-primary: #1f2937;
                    --bg-secondary: #374151;
                    --text-primary: #f9fafb;
                    --text-secondary: #d1d5db;
                    --border-color: #4b5563;
                }
            }

            /* High Contrast Mode */
            @media (prefers-contrast: high) {
                .test-item {
                    border: 2px solid var(--border-color);
                }
                
                .btn {
                    border: 2px solid currentColor;
                }
            }

            /* Reduced Motion */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .metric-card:hover,
                .test-item:hover,
                .btn:hover {
                    transform: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header - Based on qa-email-demo.html -->
            <div class="header">
                <div class="header-content">
                    <div class="logo">DHgate Monitor</div>
                    <div class="tagline">Quality Assurance Report</div>
                </div>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="greeting">
                    <strong>Hallo Nathalja,</strong>
                </div>

                <p style="margin-bottom: 24px; color: var(--text-secondary); font-size: 16px;">
                    Hier is je dagelijkse QA rapport voor het DHgate Monitor platform van 
                    <strong>${new Date().toLocaleDateString('nl-NL')}</strong>. 
                    Gebruik de actie buttons om issues direct op te lossen.
                </p>

                <!-- Status Banner -->
                <div class="status-banner status-error">
                    Platform Status: ACTIE VEREIST
                </div>

                <!-- Metrics Grid -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-number">6</div>
                        <div class="metric-label">Totaal Tests</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number" style="color: var(--success-color);">4</div>
                        <div class="metric-label">Geslaagd</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number" style="color: var(--danger-color);">1</div>
                        <div class="metric-label">Gefaald</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-number" style="color: var(--warning-color);">67%</div>
                        <div class="metric-label">Slagingspercentage</div>
                    </div>
                </div>

                <!-- Test Categories -->
                <div class="section">
                    <div class="section-title">Test Resultaten</div>
                    
                    <!-- Toegankelijkheid -->
                    <div class="test-category">
                        <div class="category-header">Toegankelijkheid (WCAG 2.1 AA)</div>
                        <div class="category-content">
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Alt-teksten afbeeldingen</div>
                                    <div class="test-description">Alle afbeeldingen hebben correcte alt-teksten</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/accessibility/alt-text" class="btn btn-details">Details</a>
                                    <span class="test-status status-passed">Geslaagd</span>
                                </div>
                            </div>
                            
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Kleurcontrast validatie</div>
                                    <div class="test-description">Kleurcontrast kan verbeterd worden voor WCAG compliance</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/accessibility/contrast-fix" class="btn btn-secondary">Fix Issues</a>
                                    <a href="https://dhgate-monitor.com/qa/accessibility/contrast" class="btn btn-details">Details</a>
                                    <span class="test-status status-warning">Waarschuwing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- GDPR Compliance -->
                    <div class="test-category">
                        <div class="category-header">GDPR Compliance</div>
                        <div class="category-content">
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Cookie consent banner</div>
                                    <div class="test-description">Cookie consent en privacy policy correct geïmplementeerd</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/gdpr/cookies" class="btn btn-details">Details</a>
                                    <span class="test-status status-passed">Geslaagd</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Performance & SEO -->
                    <div class="test-category">
                        <div class="category-header">Performance & SEO</div>
                        <div class="category-content">
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Pagina laadtijd</div>
                                    <div class="test-description">Homepage laadt binnen 2 seconden</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/performance/load-time" class="btn btn-details">Details</a>
                                    <span class="test-status status-passed">Geslaagd</span>
                                </div>
                            </div>
                            
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Mobile responsiveness</div>
                                    <div class="test-description">Enkele elementen zijn niet goed responsive op mobile</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/performance/mobile-fix" class="btn btn-fix">Fix Nu</a>
                                    <a href="https://dhgate-monitor.com/qa/performance/mobile" class="btn btn-details">Details</a>
                                    <span class="test-status status-failed">Gefaald</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Email Workflows -->
                    <div class="test-category">
                        <div class="category-header">Email Workflows</div>
                        <div class="category-content">
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">Email validatie</div>
                                    <div class="test-description">Email registratie workflow werkt correct</div>
                                </div>
                                <div class="test-actions">
                                    <a href="https://dhgate-monitor.com/qa/email/validation" class="btn btn-details">Details</a>
                                    <span class="test-status status-passed">Geslaagd</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Call to Action -->
                <div class="cta-section">
                    <h3 style="margin-bottom: 20px; color: var(--text-primary);">Actie Vereist</h3>
                    <p style="margin-bottom: 24px; color: var(--text-secondary);">
                        Er zijn issues gevonden die je aandacht vereisen. Gebruik de buttons hieronder om direct actie te ondernemen.
                    </p>
                    <a href="https://dhgate-monitor.com/qa/dashboard" class="cta-button">
                        QA Dashboard
                    </a>
                    <a href="https://dhgate-monitor.com/qa/fix-all" class="cta-button cta-secondary">
                        Fix All Issues
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-brand">DHgate Monitor</div>
                <div class="footer-info">Professional E-commerce Monitoring Platform</div>
                <div class="footer-info">Volgende test: Morgen om 06:00 UTC (08:00 Nederlandse tijd)</div>
                <div class="footer-note">
                    Dit rapport is automatisch gegenereerd door het DHgate Monitor QA systeem.<br>
                    Voor technische ondersteuning: support@dhgate-monitor.com
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        console.log('Verzenden verbeterde QA email (geen icons, alle devices)...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <noreply@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} [ACTIE VEREIST]`,
            html: improvedEmailHTML,
            text: `
DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}

SAMENVATTING:
- 6 totaal tests uitgevoerd
- 4 tests GESLAAGD 
- 1 test GEFAALD (Mobile responsiveness)
- 1 WAARSCHUWING (Kleurcontrast)
- 67% slagingspercentage

URGENTE ACTIES:
- Fix mobile responsiveness issues
- Verbeter kleurcontrast voor WCAG compliance

QA Dashboard: https://dhgate-monitor.com/qa/dashboard
Fix All Issues: https://dhgate-monitor.com/qa/fix-all

DHgate Monitor - Professional E-commerce Monitoring Platform
Voor technische ondersteuning: support@dhgate-monitor.com
            `
        });

        console.log('Verbeterde QA email succesvol verzonden!');
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Verzonden naar: nathaljanijman@hotmail.com`);
        console.log('');
        console.log('Verbeteringen:');
        console.log('- Gebruikt mooie header van qa-email-demo.html');
        console.log('- Alle icons verwijderd (behalve brand tekst)');
        console.log('- Volledig responsive voor alle devices (mobile, tablet, desktop)');
        console.log('- Klikbare actie buttons per test');
        console.log('- Fix buttons voor gefaalde/waarschuwing tests');
        console.log('- Support voor dark mode en high contrast');
        console.log('- Reduced motion support voor accessibility');
        
        return info;
        
    } catch (error) {
        console.error('Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Export and run
if (import.meta.url === `file://${process.argv[1]}`) {
    sendImprovedQAEmail().catch(console.error);
}

export { sendImprovedQAEmail };