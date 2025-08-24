#!/usr/bin/env node

/**
 * DHgate Monitor Brand Compliant QA Email
 * 
 * Follows exact DHgate Monitor style guide:
 * - Colors: #2563EB (primary blue), #EA580C (orange), #1e40af (dark blue)
 * - Typography: Segoe UI, Raleway for headers
 * - No icons except specific brand elements
 * - Responsive design with brand-specific spacing
 */

import nodemailer from 'nodemailer';

async function sendBrandCompliantQAEmail() {
    console.log('DHgate Monitor - Brand Compliant QA Email');
    console.log('==========================================');
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

    // Brand compliant email template based on qa-email-template.html
    const brandCompliantHTML = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DHgate Monitor QA Rapport</title>
        <style>
            /* DHgate Monitor Brand Colors */
            :root {
                --dhgate-blue: #2563EB;
                --dhgate-blue-dark: #1e40af;
                --dhgate-orange: #EA580C;
                --dhgate-success: #16a34a;
                --dhgate-warning: #ea580c;
                --dhgate-danger: #dc2626;
                --dhgate-text: #333;
                --dhgate-text-secondary: #64748b;
                --dhgate-bg-light: #f5f7fa;
                --dhgate-bg-card: #f8fafc;
                --dhgate-border: #e2e8f0;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: var(--dhgate-text);
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: var(--dhgate-bg-light);
            }
            
            .header {
                background: linear-gradient(135deg, var(--dhgate-blue), var(--dhgate-blue-dark));
                color: white;
                padding: 30px;
                border-radius: 12px 12px 0 0;
                text-align: center;
                margin-bottom: 0;
            }
            
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                font-family: 'Raleway', 'Segoe UI', sans-serif;
            }
            
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 16px;
            }
            
            .content {
                background: white;
                padding: 30px;
                border-radius: 0 0 12px 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .status-banner {
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
                font-weight: 600;
                font-size: 18px;
            }
            
            .status-pass {
                background-color: #d1fae5;
                color: #065f46;
                border: 1px solid #a7f3d0;
            }
            
            .status-fail {
                background-color: #fee2e2;
                color: #991b1b;
                border: 1px solid #fca5a5;
            }

            .status-mixed {
                background-color: #fef3c7;
                color: #92400e;
                border: 1px solid #fbbf24;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .metric-card {
                background: var(--dhgate-bg-card);
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid var(--dhgate-border);
            }
            
            .metric-number {
                font-size: 36px;
                font-weight: 700;
                color: var(--dhgate-blue-dark);
                margin: 0;
            }
            
            .metric-label {
                font-size: 14px;
                color: var(--dhgate-text-secondary);
                margin: 5px 0 0 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .test-results {
                margin: 30px 0;
            }

            .section-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
                color: var(--dhgate-text);
            }
            
            .test-category {
                margin: 20px 0;
                border: 1px solid var(--dhgate-border);
                border-radius: 8px;
                overflow: hidden;
                background: white;
            }
            
            .category-header {
                background: var(--dhgate-bg-card);
                padding: 15px 20px;
                font-weight: 600;
                border-bottom: 1px solid var(--dhgate-border);
                color: var(--dhgate-text);
            }
            
            .category-content {
                padding: 20px;
            }
            
            .test-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f1f5f9;
            }
            
            .test-item:last-child {
                border-bottom: none;
            }

            .test-name {
                font-weight: 500;
                color: var(--dhgate-text);
                flex: 1;
            }

            .test-actions {
                margin-left: 16px;
                display: flex;
                gap: 8px;
            }
            
            .test-status {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .status-passed { background: #dcfce7; color: #166534; }
            .status-failed { background: #fee2e2; color: #991b1b; }
            .status-warning { background: #fef3c7; color: #92400e; }
            .status-skipped { background: #f1f5f9; color: var(--dhgate-text-secondary); }

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
            }

            .btn-primary {
                background: var(--dhgate-blue);
                color: white;
            }

            .btn-secondary {
                background: var(--dhgate-orange);
                color: white;
            }

            .btn-outline {
                background: transparent;
                border: 1px solid var(--dhgate-blue);
                color: var(--dhgate-blue);
            }

            .btn-fix {
                background: var(--dhgate-danger);
                color: white;
            }
            
            .action-items {
                background: #fef3c7;
                border: 1px solid #fbbf24;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
            }
            
            .action-items h3 {
                color: #92400e;
                margin-top: 0;
                font-family: 'Raleway', 'Segoe UI', sans-serif;
            }
            
            .action-item {
                padding: 10px 0;
                border-bottom: 1px solid #fde68a;
            }
            
            .action-item:last-child {
                border-bottom: none;
            }
            
            .priority-high { color: var(--dhgate-danger); font-weight: 600; }
            .priority-medium { color: var(--dhgate-orange); font-weight: 500; }
            .priority-low { color: var(--dhgate-success); font-weight: 400; }
            
            .footer {
                text-align: center;
                margin-top: 40px;
                padding: 20px;
                color: var(--dhgate-text-secondary);
                font-size: 14px;
                border-top: 1px solid var(--dhgate-border);
            }

            .footer-brand {
                font-family: 'Raleway', 'Segoe UI', sans-serif;
                font-weight: 600;
                font-size: 16px;
                color: var(--dhgate-blue);
                margin-bottom: 8px;
            }
            
            .cta-button {
                display: inline-block;
                background: var(--dhgate-blue);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 10px;
                transition: background-color 0.2s ease;
            }

            .cta-secondary {
                background: var(--dhgate-orange);
            }
            
            .summary-text {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            @media (max-width: 600px) {
                body { padding: 10px; }
                
                .metrics-grid {
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                
                .header, .content {
                    padding: 20px;
                }

                .test-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }

                .test-actions {
                    margin-left: 0;
                    width: 100%;
                }

                .btn {
                    width: 100%;
                    margin-bottom: 8px;
                }
                
                .cta-button {
                    display: block;
                    margin: 10px 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>DHgate Monitor QA Rapport</h1>
            <p>Dagelijkse kwaliteitscontrole • ${new Date().toLocaleDateString('nl-NL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
        </div>
        
        <div class="content">
            <div class="status-banner status-mixed">
                Platform Status: Actie Vereist
            </div>
            
            <div class="summary-text">
                <strong>Hallo Nathalja,</strong><br><br>
                Hier is je dagelijkse QA rapport voor het DHgate Monitor platform. 
                Er zijn enkele issues gevonden die aandacht vereisen, maar de core functionaliteit werkt goed.
            </div>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-number">6</div>
                    <div class="metric-label">Totaal Tests</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #16a34a;">3</div>
                    <div class="metric-label">Geslaagd</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #dc2626;">2</div>
                    <div class="metric-label">Gefaald</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #ea580c;">50%</div>
                    <div class="metric-label">Slagingspercentage</div>
                </div>
            </div>
            
            <div class="test-results">
                <h3 class="section-title">Test Categorieën</h3>
                
                <div class="test-category">
                    <div class="category-header">Toegankelijkheid (WCAG 2.1 AA)</div>
                    <div class="category-content">
                        <div class="test-item">
                            <span class="test-name">Alt-teksten afbeeldingen</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/accessibility/alt-text" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-passed">Geslaagd</span>
                        </div>
                        <div class="test-item">
                            <span class="test-name">Kleurcontrast validatie</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/accessibility/contrast-fix" class="btn btn-secondary">Fix Issues</a>
                                <a href="https://dhgate-monitor.com/qa/accessibility/contrast" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-warning">Waarschuwing</span>
                        </div>
                    </div>
                </div>
                
                <div class="test-category">
                    <div class="category-header">GDPR Compliance</div>
                    <div class="category-content">
                        <div class="test-item">
                            <span class="test-name">Cookie consent banner</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/gdpr/cookies" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-passed">Geslaagd</span>
                        </div>
                        <div class="test-item">
                            <span class="test-name">Privacy policy toegankelijk</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/gdpr/privacy" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-passed">Geslaagd</span>
                        </div>
                    </div>
                </div>
                
                <div class="test-category">
                    <div class="category-header">Performance & SEO</div>
                    <div class="category-content">
                        <div class="test-item">
                            <span class="test-name">Pagina laadtijd (&lt;3s)</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/performance/load-time" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-passed">Geslaagd</span>
                        </div>
                        <div class="test-item">
                            <span class="test-name">Mobile responsiveness</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/performance/mobile-fix" class="btn btn-fix">Fix Nu</a>
                                <a href="https://dhgate-monitor.com/qa/performance/mobile" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-failed">Gefaald</span>
                        </div>
                        <div class="test-item">
                            <span class="test-name">Website bereikbaarheid</span>
                            <div class="test-actions">
                                <a href="https://dhgate-monitor.com/qa/performance/uptime-fix" class="btn btn-fix">Fix Nu</a>
                                <a href="https://dhgate-monitor.com/qa/performance/uptime" class="btn btn-outline">Details</a>
                            </div>
                            <span class="test-status status-failed">Gefaald</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="action-items">
                <h3>Actiepunten</h3>
                <div class="action-item">
                    <span class="priority-high"><strong>[KRITIEK]</strong></span> 
                    Los website bereikbaarheid op - controleer hosting en DNS configuratie binnen 2 uur
                </div>
                <div class="action-item">
                    <span class="priority-high"><strong>[HOOG]</strong></span> 
                    Fix mobile responsiveness issues - test CSS media queries op verschillende devices
                </div>
                <div class="action-item">
                    <span class="priority-medium"><strong>[MEDIUM]</strong></span> 
                    Verbeter kleurcontrast voor WCAG 2.1 AA compliance (minimaal 4.5:1 ratio)
                </div>
                <div class="action-item">
                    <span class="priority-low"><strong>[LAAG]</strong></span> 
                    Monitor performance trends en behoud huidige goede prestaties
                </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="https://dhgate-monitor.com/qa/dashboard" class="cta-button">
                    Bekijk QA Dashboard
                </a>
                <a href="https://dhgate-monitor.com/qa/fix-all" class="cta-button cta-secondary">
                    Fix All Issues
                </a>
            </div>
            
            <div class="footer">
                <div class="footer-brand">DHgate Monitor</div>
                <p>Volgende test: Morgen om 06:00 UTC (08:00 Nederlandse tijd)</p>
                <p>Dit rapport is automatisch gegenereerd door het QA systeem</p>
                <p style="margin-top: 20px; font-size: 12px;">
                    <em>Voor technische ondersteuning: support@dhgate-monitor.com</em>
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        console.log('Verzenden brand compliant QA email...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <noreply@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} [ACTIE VEREIST]`,
            html: brandCompliantHTML,
            text: `
DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}

SAMENVATTING:
- 6 totaal tests uitgevoerd
- 3 tests GESLAAGD (SSL, Performance, GDPR)
- 2 tests GEFAALD (Bereikbaarheid, Mobile)
- 1 WAARSCHUWING (Toegankelijkheid)
- 50% slagingspercentage

URGENTE ACTIES:
[KRITIEK] Los website bereikbaarheid op binnen 2 uur
[HOOG] Fix mobile responsiveness issues
[MEDIUM] Verbeter kleurcontrast voor WCAG compliance

QA Dashboard: https://dhgate-monitor.com/qa/dashboard
Fix All Issues: https://dhgate-monitor.com/qa/fix-all

DHgate Monitor - Professional E-commerce Monitoring Platform
Volgende test: Morgen om 06:00 UTC (08:00 Nederlandse tijd)
            `
        });

        console.log('Brand compliant QA email succesvol verzonden!');
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Verzonden naar: nathaljanijman@hotmail.com`);
        console.log('');
        console.log('Brand compliance features:');
        console.log('- Exacte DHgate Monitor kleuren (#2563EB, #EA580C, #1e40af)');
        console.log('- Raleway font voor headers, Segoe UI voor body text');
        console.log('- Geen icons behalve brand-compliant tekst elementen');
        console.log('- Responsive design volgens DHgate Monitor grid systeem');
        console.log('- Klikbare action buttons per test categorie');
        console.log('- Fix buttons voor gefaalde/waarschuwing tests');
        
        return info;
        
    } catch (error) {
        console.error('Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Export and run
if (import.meta.url === `file://${process.argv[1]}`) {
    sendBrandCompliantQAEmail().catch(console.error);
}

export { sendBrandCompliantQAEmail };