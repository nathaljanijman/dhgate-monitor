#!/usr/bin/env node

/**
 * Gmail QA Email Sender
 * 
 * Voor echte emails heb je nodig:
 * 1. Gmail account met 2FA aan
 * 2. App password gegenereerd 
 * 3. Credentials hieronder invullen
 */

import nodemailer from 'nodemailer';

async function sendQAEmail() {
    console.log('🧪 DHgate Monitor - Gmail QA Email Sender');
    console.log('==========================================');
    console.log(`📅 ${new Date().toLocaleString('nl-NL')}`);
    console.log('');

    // TEST ACCOUNT SETUP - Ethereal Email (werkt altijd)
    console.log('⚙️  Setting up test email account...');
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    // Generate QA report content
    const qaReportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>DHgate Monitor QA Rapport</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #f5f5f5; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #1e40af, #3b82f6); 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
            }
            .content { padding: 20px; }
            .result { 
                margin: 15px 0; 
                padding: 15px; 
                border-radius: 8px; 
                border-left: 4px solid; 
            }
            .pass { 
                border-color: #22c55e; 
                background: linear-gradient(90deg, #f0fdf4, #dcfce7); 
            }
            .fail { 
                border-color: #ef4444; 
                background: linear-gradient(90deg, #fef2f2, #fee2e2); 
            }
            .warn { 
                border-color: #f59e0b; 
                background: linear-gradient(90deg, #fffbeb, #fef3c7); 
            }
            .summary { 
                background: #f8fafc; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
            }
            .footer { 
                text-align: center; 
                padding: 20px; 
                color: #6b7280; 
                font-size: 14px; 
            }
            h1, h2, h3 { margin: 0 0 10px 0; }
            .emoji { font-size: 1.2em; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🧪 DHgate Monitor QA Rapport</h1>
                <p>📅 ${new Date().toLocaleDateString('nl-NL', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
            </div>
            
            <div class="content">
                <h2>🎯 Test Resultaten</h2>
                
                <div class="result pass">
                    <h3><span class="emoji">✅</span> SSL Certificaat</h3>
                    <p><strong>Status:</strong> GESLAAGD</p>
                    <p>SSL certificaat is geldig en veilig. Alle HTTPS verbindingen werken correct.</p>
                </div>
                
                <div class="result pass">
                    <h3><span class="emoji">✅</span> Performance Audit</h3>
                    <p><strong>Status:</strong> GESLAAGD</p>
                    <p>Website laadtijden binnen acceptabele grenzen (&lt; 3 seconden). Core Web Vitals zijn goed.</p>
                </div>
                
                <div class="result pass">
                    <h3><span class="emoji">✅</span> Email Functionaliteit</h3>
                    <p><strong>Status:</strong> GESLAAGD</p>
                    <p>Email registratie en formulieren werken correct. Alle email validaties zijn functioneel.</p>
                </div>
                
                <div class="result warn">
                    <h3><span class="emoji">⚠️</span> GDPR Compliance</h3>
                    <p><strong>Status:</strong> WAARSCHUWING</p>
                    <p>GDPR compliance kan verbeterd worden. Cookie consent banner en privacy policy moeten geüpdatet worden.</p>
                    <p><strong>Actie:</strong> Update privacy policy en verbeter cookie consent voor volledige GDPR compliance.</p>
                </div>
                
                <div class="result fail">
                    <h3><span class="emoji">❌</span> Website Bereikbaarheid</h3>
                    <p><strong>Status:</strong> GEFAALD</p>
                    <p>Website niet bereikbaar tijdens test. Mogelijk server of DNS problemen.</p>
                    <p><strong>Actie:</strong> Controleer hosting provider status, DNS instellingen en server configuratie.</p>
                </div>
                
                <div class="result fail">
                    <h3><span class="emoji">❌</span> Mobile Responsiveness</h3>
                    <p><strong>Status:</strong> GEFAALD</p>
                    <p>Mobile responsiveness issues gedetecteerd op verschillende schermformaten.</p>
                    <p><strong>Actie:</strong> Fix CSS media queries, controleer flexbox/grid layouts en test op verschillende devices.</p>
                </div>

                <div class="summary">
                    <h2>📊 Samenvatting</h2>
                    <ul style="list-style: none; padding: 0;">
                        <li>✅ <strong>3 tests geslaagd</strong> (SSL, Performance, Email)</li>
                        <li>⚠️ <strong>1 waarschuwing</strong> (GDPR compliance)</li>
                        <li>❌ <strong>2 tests gefaald</strong> (Bereikbaarheid, Mobile)</li>
                        <li>📈 <strong>50% slagingspercentage</strong></li>
                        <li>⏱️ <strong>Test duur:</strong> 45 seconden</li>
                    </ul>
                </div>

                <h2>🚀 Volgende Stappen</h2>
                <ol>
                    <li><strong>Kritiek:</strong> Los website bereikbaarheid op (hoogste prioriteit)</li>
                    <li><strong>Belangrijk:</strong> Fix mobile responsiveness issues</li>
                    <li><strong>Verbetering:</strong> Update GDPR compliance en privacy policy</li>
                    <li><strong>Monitor:</strong> Herhaal tests na fixes</li>
                </ol>
            </div>
            
            <div class="footer">
                <p>🤖 Automatisch gegenereerd door DHgate Monitor QA Systeem</p>
                <p>Volgende automatische test: Morgen 06:00 UTC</p>
                <p>Voor vragen: <a href="mailto:support@dhgate-monitor.com">support@dhgate-monitor.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        console.log('📧 Verzenden QA rapport email...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <qa@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `🧪 DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} (TEST)`,
            html: qaReportHTML,
            text: `
DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}

Test Resultaten:
✅ SSL Certificaat - GESLAAGD
✅ Performance Audit - GESLAAGD  
✅ Email Functionaliteit - GESLAAGD
⚠️ GDPR Compliance - WAARSCHUWING
❌ Website Bereikbaarheid - GEFAALD
❌ Mobile Responsiveness - GEFAALD

Samenvatting: 3 geslaagd, 1 waarschuwing, 2 gefaald (50% slagingspercentage)

Voor de volledige rapport, bekijk de HTML versie.
            `
        });

        console.log('✅ QA rapport email succesvol verzonden!');
        console.log(`📬 Message ID: ${info.messageId}`);
        console.log('');
        console.log('🔗 BELANGRIJK: Bekijk je email hier:');
        console.log(`   ${nodemailer.getTestMessageUrl(info)}`);
        console.log('');
        console.log('📧 Deze test email is verzonden naar: nathaljanijman@hotmail.com');
        console.log('💡 Voor echte Gmail verzending, configureer Gmail SMTP credentials');
        
        return info;
        
    } catch (error) {
        console.error('❌ Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Run the email sender
if (import.meta.url === `file://${process.argv[1]}`) {
    sendQAEmail().catch(console.error);
}

export { sendQAEmail };