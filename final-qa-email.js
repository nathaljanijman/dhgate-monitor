#!/usr/bin/env node

/**
 * Final QA Email Template
 * 
 * Based on production-qa-report.html with:
 * - Header from dhgate-monitor.com/service page
 * - Raleway typography throughout
 * - Brand colors (#2563EB primary, #111827 text)
 * - No emojis anywhere
 * - Fully responsive design
 */

import nodemailer from 'nodemailer';

async function sendFinalQAEmail() {
    console.log('DHgate Monitor - Final QA Email (Service Header + Production Base)');
    console.log('===================================================================');
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

    // Final email template: production-qa-report.html base + service header + no emojis
    const finalEmailHTML = `
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
            /* DHgate Monitor Brand Variables - From Service Page */
            :root {
                --accent-color: #2563EB;
                --accent-secondary: #ff6b35;
                --text-primary: #111827;
                --text-secondary: #374151;
                --bg-primary: #ffffff;
                --bg-secondary: #f8fafc;
                --bg-tertiary: #f1f5f9;
                --border-color: #e2e8f0;
                --success-color: #10b981;
                --warning-color: #f59e0b;
                --danger-color: #ef4444;
                --border-radius: 12px;
            }
            
            /* Reset */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            /* Typography - Raleway Brand Font */
            body {
                font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: var(--text-primary);
                background: linear-gradient(135deg, #FEFEFE 0%, #F8FAFC 50%, #F1F5F9 100%);
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
                box-shadow: 0 10px 30px rgba(17, 24, 39, 0.1);
                overflow: hidden;
            }
            
            /* Service Page Header Style */
            .header {
                background: linear-gradient(135deg, var(--accent-color) 0%, #1e40af 100%);
                color: white;
                padding: 32px 40px;
                position: relative;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
                opacity: 0.5;
            }
            
            .header-content { 
                position: relative; 
                z-index: 2; 
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .header-brand {
                display: flex;
                flex-direction: column;
            }
            
            .logo { 
                font-family: 'Raleway', sans-serif;
                font-size: 24px; 
                font-weight: 700; 
                margin-bottom: 4px; 
                letter-spacing: -0.5px; 
            }
            
            .tagline { 
                font-family: 'Raleway', sans-serif;
                font-size: 14px; 
                opacity: 0.9; 
                font-weight: 400; 
            }

            .header-nav {
                display: flex;
                gap: 24px;
                font-size: 14px;
                font-weight: 500;
            }

            .nav-item {
                color: rgba(255, 255, 255, 0.9);
                text-decoration: none;
                padding: 8px 16px;
                border-radius: 6px;
                transition: background-color 0.2s ease;
            }

            .nav-item:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }

            .nav-item.active {
                background: rgba(255, 255, 255, 0.15);
                color: white;
                font-weight: 600;
            }
            
            /* Content Area - Production QA Styles */
            .content { 
                padding: 40px; 
                font-family: 'Raleway', sans-serif;
            }
            
            .greeting { 
                font-size: 18px; 
                font-weight: 500; 
                margin-bottom: 24px; 
                color: var(--text-primary); 
            }
            
            .intro-text {
                margin-bottom: 24px;
                color: var(--text-secondary);
                font-size: 16px;
                line-height: 1.6;
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
                font-family: 'Raleway', sans-serif;
            }
            
            .status-success { background: #dcfce7; color: #166534; border-color: #16a34a; }
            .status-warning { background: #fef3c7; color: #92400e; border-color: #f59e0b; }
            .status-error { background: #fee2e2; color: #991b1b; border-color: #ef4444; }
            
            /* Metrics Grid - From Production QA */
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
                box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
            }
            
            .metric-number { 
                font-family: 'Raleway', sans-serif;
                font-size: 36px; 
                font-weight: 700; 
                color: var(--accent-color); 
                margin-bottom: 8px; 
                line-height: 1; 
            }
            
            .metric-label { 
                font-family: 'Raleway', sans-serif;
                font-size: 14px; 
                color: var(--text-secondary); 
                font-weight: 500; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            
            /* Section Styling */
            .section { margin: 32px 0; }
            
            .section-title { 
                font-family: 'Raleway', sans-serif;
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
                background: linear-gradient(90deg, var(--accent-color), #1e40af); 
                color: white; 
                padding: 16px 24px; 
                font-family: 'Raleway', sans-serif;
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
                background: rgba(37, 99, 235, 0.02);
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
                font-family: 'Raleway', sans-serif;
                font-weight: 600; 
                color: var(--text-primary);
                font-size: 15px;
            }
            
            .test-description {
                font-family: 'Raleway', sans-serif;
                font-size: 13px;
                color: var(--text-secondary);
                margin-top: 4px;
                font-weight: 400;
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
                font-family: 'Raleway', sans-serif;
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
                font-family: 'Raleway', sans-serif;
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

            .cta-title {
                font-family: 'Raleway', sans-serif;
                margin-bottom: 16px;
                color: var(--text-primary);
                font-weight: 600;
                font-size: 20px;
            }

            .cta-description {
                margin-bottom: 24px;
                color: var(--text-secondary);
                font-family: 'Raleway', sans-serif;
                font-weight: 400;
            }

            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, var(--accent-color), #1e40af);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: var(--border-radius);
                font-family: 'Raleway', sans-serif;
                font-weight: 600;
                font-size: 16px;
                margin: 8px 12px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }

            .cta-secondary {
                background: linear-gradient(135deg, var(--accent-secondary), #ea580c);
                box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
            }

            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
            }
            
            /* Footer */
            .footer {
                background: var(--bg-secondary);
                border-top: 1px solid var(--border-color);
                padding: 32px 40px;
                text-align: center;
            }

            .footer-brand {
                font-family: 'Raleway', sans-serif;
                font-weight: 700;
                color: var(--accent-color);
                font-size: 18px;
                margin-bottom: 16px;
            }

            .footer-info {
                color: var(--text-secondary);
                font-family: 'Raleway', sans-serif;
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 8px;
                font-weight: 400;
            }

            .footer-note {
                color: var(--text-secondary);
                font-family: 'Raleway', sans-serif;
                font-size: 12px;
                font-style: italic;
                margin-top: 16px;
                font-weight: 300;
            }
            
            /* Mobile Responsiveness */
            @media only screen and (max-width: 600px) {
                body { padding: 10px; }
                
                .header { padding: 24px 20px; }
                .content { padding: 24px 20px; }
                
                .header-content {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;
                }
                
                .header-nav {
                    display: none; /* Hide navigation on mobile emails */
                }
                
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
                .footer { padding: 24px 20px; }
            }

            /* Small Mobile */
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
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Service Page Header -->
            <div class="header">
                <div class="header-content">
                    <div class="header-brand">
                        <div class="logo">DHgate Monitor</div>
                        <div class="tagline">E-commerce Intelligence Platform</div>
                    </div>
                    <nav class="header-nav">
                        <a href="#" class="nav-item">Dashboard</a>
                        <a href="#" class="nav-item active">QA Report</a>
                        <a href="#" class="nav-item">Service</a>
                    </nav>
                </div>
            </div>

            <!-- Content -->
            <div class="content">
                <div class="greeting">
                    <strong>Hallo Nathalja,</strong>
                </div>

                <p class="intro-text">
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
                    <h3 class="cta-title">Actie Vereist</h3>
                    <p class="cta-description">
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
        console.log('Verzenden finale QA email (Service Header + Production Base)...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <noreply@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} [ACTIE VEREIST]`,
            html: finalEmailHTML,
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

DHgate Monitor - E-commerce Intelligence Platform
Voor technische ondersteuning: support@dhgate-monitor.com
            `
        });

        console.log('Finale QA email succesvol verzonden!');
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Verzonden naar: nathaljanijman@hotmail.com`);
        console.log('');
        console.log('Template eigenschappen:');
        console.log('- Gebaseerd op: production-qa-report.html');
        console.log('- Header van: dhgate-monitor.com/service pagina');
        console.log('- Typography: Raleway font family throughout');
        console.log('- Kleuren: #2563EB primary, #111827 text (brand colors)');
        console.log('- GEEN emojis anywhere in the template');
        console.log('- Volledig responsive voor alle devices');
        console.log('- Actionable buttons voor test management');
        
        return info;
        
    } catch (error) {
        console.error('Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Export and run
if (import.meta.url === `file://${process.argv[1]}`) {
    sendFinalQAEmail().catch(console.error);
}

export { sendFinalQAEmail };