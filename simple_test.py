#!/usr/bin/env python3
import smtplib
from email.mime.text import MIMEText

def test_gmail():
    print("🧪 Eenvoudige Gmail Test")
    print("=======================")
    
    email = input("Email adres (nathaljanijman@gmail.com): ").strip()
    if not email:
        email = "nathaljanijman@gmail.com"
    
    password = input("App password (16 karakters): ").strip()
    
    try:
        print("📧 Verbinden met Gmail...")
        
        # Simpele email
        msg = MIMEText("🧪 Test email van DHgate Monitor!")
        msg['Subject'] = 'Test Email'
        msg['From'] = email
        msg['To'] = email
        
        # Gmail verbinding
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        
        print("🔐 Inloggen...")
        server.login(email, password)
        
        print("📤 Email versturen...")
        server.send_message(msg)
        server.quit()
        
        print("✅ SUCCESS! Email verzonden!")
        print("📱 Check je inbox voor de test email.")
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Login fout: {e}")
        print("🔑 Controleer:")
        print("   - 2FA is aan")
        print("   - App password is correct (16 karakters)")
        print("   - Email adres is juist")
        
    except Exception as e:
        print(f"❌ Onbekende fout: {e}")

if __name__ == "__main__":
    test_gmail()
