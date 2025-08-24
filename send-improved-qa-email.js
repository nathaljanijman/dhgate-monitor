#!/usr/bin/env node

/**
 * Send Improved QA Email with Large Service Header
 * Uses the improved-qa-email-clickable.html template
 */

import nodemailer from 'nodemailer';
import fs from 'fs/promises';

async function sendImprovedQAEmail() {
    console.log('DHgate Monitor - Send Improved QA Email');
    console.log('======================================');
    console.log(`${new Date().toLocaleString('nl-NL')}`);
    console.log('');

    try {
        // Read the improved HTML template
        const htmlTemplate = await fs.readFile('/Users/Nathalja/dhgate-monitor/improved-qa-email-clickable.html', 'utf-8');
        
        // Replace placeholders with current date
        const emailHTML = htmlTemplate.replace(
            /\$\{new Date\(\)\.toLocaleDateString\('nl-NL'[^}]+\)\}/g, 
            new Date().toLocaleDateString('nl-NL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        );

        // Setup Gmail SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply@dhgate-monitor.com',
                pass: 'lmku psea ugao ztjb'
            }
        });

        console.log('Verzenden verbeterde QA email met grote service header...');
        
        const info = await transporter.sendMail({
            from: '"DHgate Monitor QA" <noreply@dhgate-monitor.com>',
            to: 'nathaljanijman@hotmail.com',
            subject: `DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')} [INTERACTIEF]`,
            html: emailHTML,
            text: `
DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}

VERBETERDE FEATURES:
- Grote service header met DHGate gradient
- Clickbare test tiles voor details
- Oplossingsvoorstellen met copy prompts
- Volledig responsive design

SAMENVATTING:
- 6 totaal tests uitgevoerd
- 4 tests GESLAAGD 
- 1 test GEFAALD (Mobile responsiveness)
- 1 WAARSCHUWING (Kleurcontrast)
- 67% slagingspercentage

INTERACTIEF:
Klik op elke test tile in de HTML email voor gedetailleerde informatie en oplossingsvoorstellen!

QA Dashboard: https://dhgate-monitor.com/qa/dashboard
Fix All Issues: https://dhgate-monitor.com/qa/fix-all

DHgate Monitor - E-commerce Intelligence Platform
Voor technische ondersteuning: support@dhgate-monitor.com
            `
        });

        console.log('✅ Verbeterde QA email succesvol verzonden!');
        console.log(`📬 Message ID: ${info.messageId}`);
        console.log(`📧 Verzonden naar: nathaljanijman@hotmail.com`);
        console.log('');
        console.log('🎉 Nieuwe features:');
        console.log('   - Grote service header (120px hoogte)');
        console.log('   - DHGate gradient zoals service pagina');
        console.log('   - Clickbare test tiles met details');
        console.log('   - Oplossingsvoorstellen per test');
        console.log('   - Copy prompt buttons voor Claude');
        console.log('   - Volledig responsive design');
        console.log('');
        console.log('📱 Test de interactiviteit in je email client!');
        
        return info;
        
    } catch (error) {
        console.error('❌ Fout bij verzenden email:', error.message);
        throw error;
    }
}

// Export and run
if (import.meta.url === `file://${process.argv[1]}`) {
    sendImprovedQAEmail().catch(console.error);
}

export { sendImprovedQAEmail };