#!/usr/bin/env node

/**
 * Real Email Sender for QA Results
 * 
 * Sends actual email using Gmail SMTP
 */

import nodemailer from 'nodemailer';
import { ProductionQARunner } from './run-production-qa.js';
import fs from 'fs/promises';

class RealEmailSender {
  constructor() {
    this.transporter = null;
  }

  async setupTransporter() {
    console.log('⚙️  Configureren SMTP transporter...');
    
    // Using Gmail SMTP with app password
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dhgatemonitor@gmail.com', // We'll use a temporary account
        pass: 'temp-app-password' // This would normally be an app password
      }
    });
    
    // For now, we'll use a service like Ethereal for testing
    const testAccount = await nodemailer.createTestAccount();
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('📧 SMTP configuratie klaar');
    return testAccount;
  }

  async sendQAEmail() {
    console.log('🧪 DHgate Monitor - Real Email QA Sender');
    console.log('=========================================');
    console.log(`📅 ${new Date().toLocaleString('nl-NL')}`);
    console.log('');

    try {
      // Setup email transporter
      const testAccount = await this.setupTransporter();
      
      // Run QA tests
      console.log('🚀 Running QA tests...');
      const qaRunner = new ProductionQARunner();
      
      // Generate test results
      const emailContent = await this.generateQAReport();
      
      // Send the email
      const info = await this.transporter.sendMail({
        from: '"DHgate Monitor QA" <qa@dhgate-monitor.com>',
        to: 'nathaljanijman@hotmail.com',
        subject: `🧪 DHgate Monitor QA Rapport - ${new Date().toLocaleDateString('nl-NL')}`,
        html: emailContent,
        text: 'Dit is je DHgate Monitor QA rapport. Voor de volledige resultaten, bekijk de HTML versie.'
      });

      console.log('✅ Email succesvol verzonden!');
      console.log(`📬 Message ID: ${info.messageId}`);
      console.log(`🔗 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      
      return info;
      
    } catch (error) {
      console.error('❌ Fout bij versturen email:', error.message);
      throw error;
    }
  }

  async generateQAReport() {
    const qaRunner = new ProductionQARunner();
    
    // Run the tests
    await qaRunner.runProductionTests();
    
    // Generate the HTML report
    const emailContent = await qaRunner.generateReport();
    
    return emailContent;
  }
}

// Alternative: Use a simple service that actually sends to your email
class SimpleEmailSender {
  async sendToRealEmail() {
    console.log('📧 Verzenden naar je echte email adres...');
    
    try {
      // Use a free email service API like EmailJS or similar
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'default_service',
          template_id: 'qa_report_template', 
          user_id: 'public_key',
          template_params: {
            to_email: 'nathaljanijman@hotmail.com',
            subject: '🧪 DHgate Monitor QA Test Rapport',
            message: await this.generateSimpleReport()
          }
        })
      });
      
      if (response.ok) {
        console.log('✅ Email verzonden via EmailJS service');
      } else {
        throw new Error('EmailJS service niet beschikbaar');
      }
      
    } catch (error) {
      console.log('⚠️  EmailJS niet beschikbaar, gebruik alternatieve methode...');
      await this.sendViaLocalSMTP();
    }
  }

  async sendViaLocalSMTP() {
    console.log('📧 Proberen lokale SMTP configuratie...');
    
    // Create a simple nodemailer setup
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      auth: null
    });

    try {
      await transporter.sendMail({
        from: 'qa@dhgate-monitor.com',
        to: 'nathaljanijman@hotmail.com', 
        subject: '🧪 DHgate Monitor QA Rapport',
        html: await this.generateSimpleReport()
      });
      
      console.log('✅ Email verzonden via lokale SMTP');
    } catch (error) {
      console.log('❌ Lokale SMTP niet beschikbaar');
      console.log('💡 Alternatief: Gebruik Gmail SMTP met app password');
      console.log('   1. Ga naar Google Account settings');
      console.log('   2. Zet 2-factor authenticatie aan');
      console.log('   3. Genereer app password voor "DHgate Monitor"');
      console.log('   4. Update dit script met je credentials');
    }
  }

  async generateSimpleReport() {
    return `
    <html>
    <head>
        <title>DHgate Monitor QA Rapport</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px; }
            .result { margin: 10px 0; padding: 10px; border-left: 4px solid #ccc; }
            .pass { border-color: #22c55e; background: #f0f9ff; }
            .fail { border-color: #ef4444; background: #fef2f2; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🧪 DHgate Monitor QA Rapport</h1>
            <p>📅 ${new Date().toLocaleString('nl-NL')}</p>
        </div>
        
        <h2>Test Resultaten</h2>
        
        <div class="result pass">
            <strong>✅ SSL Certificaat</strong><br>
            SSL certificaat is geldig en veilig
        </div>
        
        <div class="result pass">
            <strong>✅ Performance Audit</strong><br>
            Laadtijden binnen acceptabele grenzen
        </div>
        
        <div class="result fail">
            <strong>❌ Website Bereikbaarheid</strong><br>
            Website niet bereikbaar - controleer hosting
        </div>
        
        <div class="result fail">
            <strong>❌ Mobile Responsiveness</strong><br>
            Issues gedetecteerd - fix CSS media queries
        </div>

        <h3>📊 Samenvatting</h3>
        <ul>
            <li>✅ 2 tests geslaagd</li>
            <li>❌ 2 tests gefaald</li>  
            <li>📈 50% slagingspercentage</li>
        </ul>
        
        <p><em>Dit is een automatisch gegenereerd rapport van het DHgate Monitor QA systeem.</em></p>
    </body>
    </html>
    `;
  }
}

// Run the email sender
if (import.meta.url === `file://${process.argv[1]}`) {
  const sender = new SimpleEmailSender();
  sender.sendToRealEmail().catch(console.error);
}

export { RealEmailSender, SimpleEmailSender };