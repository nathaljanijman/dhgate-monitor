# 🚀 DHgate Monitor - Deployment Guidelines

## 📋 Overview

Deze guidelines zorgen ervoor dat alle changes eerst in development worden getest voordat ze naar production gaan. Dit voorkomt problemen en zorgt voor een stabiele productie omgeving.

## 🌍 Environmenten

### Development Environment
- **URL**: `https://dev.dhgate-monitor.com`
- **Database**: `dhgate-monitor-dev` (D1)
- **KV Store**: Development namespace
- **Environment**: `ENVIRONMENT = "development"`
- **Security**: Password-protected access (dev2024!)
- **SEO**: No-index, no-follow meta tags
- **Login**: Required for all non-API routes

### Production Environment  
- **URL**: `https://dhgate-monitor.com`
- **Database**: `dhgate-monitor` (D1)
- **KV Store**: Production namespace
- **Environment**: `ENVIRONMENT = "production"`

## 🔄 Deployment Workflow

### 1. Development First (Verplicht)
```bash
# 1. Test lokaal
npm run dev

# 2. Deploy naar development
npm run deploy:dev

# 3. Test op dev.dhgate-monitor.com
# - Login met development password: dev2024!
# - Controleer alle functionaliteiten
# - Test email workflows
# - Verificeer database operaties
# - Check performance
# - Verificeer no-index no-follow meta tags

# 4. Monitor development logs
npm run tail:dev
```

### 2. Production Deployment (Alleen na dev testing)
```bash
# 1. Alleen deployen als development tests succesvol zijn
npm run deploy

# 2. Monitor production logs
npm run tail

# 3. Verificeer productie functionaliteit
```

## 🧪 Testing Requirements

### Voor elke deployment naar development:
- [ ] **Development Login**: Toegang met password dev2024!
- [ ] **No-Index No-Follow**: Meta tags correct ingesteld
- [ ] **Functionaliteit**: Alle features werken correct
- [ ] **Email system**: Emails worden correct verzonden
- [ ] **Database**: CRUD operaties werken
- [ ] **Performance**: Pagina's laden snel (<3s)
- [ ] **Responsive**: Werkt op mobile en desktop
- [ ] **Cross-browser**: Test in Chrome, Firefox, Safari

### Voor deployment naar production:
- [ ] **Development testing**: Alle bovenstaande tests geslaagd
- [ ] **QA tests**: `npm run test:qa` geslaagd
- [ ] **No critical errors**: Geen errors in development logs
- [ ] **Performance check**: `npm run perf:check` geslaagd

## 🔒 Development Security

### Access Control
- **Password**: `dev2024!` (wijzig dit in productie)
- **Session**: 24 uur geldig
- **Storage**: Tokens opgeslagen in KV store
- **Protection**: Alle routes behalve `/dev-login` en `/api/*` zijn beschermd

### SEO Protection
- **Meta Tags**: `noindex, nofollow` voor alle development pagina's
- **HTTP Headers**: `X-Robots-Tag: noindex, nofollow`
- **Search Engines**: Development site wordt niet geïndexeerd


### Password Management
```bash
# Wijzig development password met script
npm run dev:password "yourNewPassword123!"

# Of handmatig in cloudflare_app.js
# Zoek naar: const devPassword = 'dev2024!';
# Vervang met je eigen sterke password
```

## 📊 Monitoring & Logs

### Development Monitoring
```bash
# Real-time logs
npm run tail:dev

# Check development status (na login)
curl https://dev.dhgate-monitor.com/health
```

### Production Monitoring
```bash
# Real-time logs  
npm run tail

# Check production status
curl https://dhgate-monitor.com/health
```

## 🚨 Emergency Procedures

### Als er problemen zijn in production:

1. **Immediate Rollback**
   ```bash
   # Deploy vorige versie
   git checkout HEAD~1
   npm run deploy
   ```

2. **Investigate in Development**
   ```bash
   # Reproduceer probleem in dev
   npm run deploy:dev
   # Test en fix in development
   ```

3. **Fix & Re-deploy**
   ```bash
   # Fix in development first
   npm run deploy:dev
   # Test thoroughly
   npm run deploy
   ```

## 🔧 Database Migrations

### Development Database
```bash
# Run migrations in development first
npm run db:migrate:dev
```

### Production Database
```bash
# Only after testing in development
npm run db:migrate:prod
```

## 📧 Email Testing

### Development Email Testing
- Alle emails worden verzonden naar test adressen
- Geen emails naar echte klanten
- Test alle email templates

### Production Email
- Alleen na volledige testing in development
- Monitor email delivery rates
- Check spam scores

## 🎯 Best Practices

### Code Changes
1. **Always test in development first**
2. **Use feature branches** voor nieuwe features
3. **Write tests** voor nieuwe functionaliteit
4. **Document changes** in commit messages

### Deployment Timing
- **Development**: Kan altijd (24/7)
- **Production**: Bij voorkeur tijdens daluren (Nederlandse tijd: 02:00-06:00)

### Communication
- **Development deployments**: Informeer team via Slack
- **Production deployments**: Informeer team + stakeholders
- **Issues**: Direct communicatie bij problemen

## 📋 Pre-Deployment Checklist

### Development Deployment
- [ ] Code changes getest lokaal
- [ ] Geen console errors
- [ ] Database migrations getest
- [ ] Email templates getest
- [ ] Performance acceptable

### Production Deployment
- [ ] Development deployment succesvol
- [ ] Alle QA tests geslaagd
- [ ] Team geïnformeerd
- [ ] Rollback plan klaar
- [ ] Monitoring actief

## 🔍 Post-Deployment Verification

### Development
- [ ] Homepage laadt correct
- [ ] Alle functionaliteiten werken
- [ ] Database operaties succesvol
- [ ] Email delivery werkt
- [ ] No errors in logs

### Production
- [ ] Homepage laadt correct
- [ ] Alle functionaliteiten werken
- [ ] Database operaties succesvol
- [ ] Email delivery werkt
- [ ] No errors in logs
- [ ] Performance metrics OK
- [ ] User feedback positief

## 📞 Support & Escalation

### Development Issues
- **Level 1**: Check logs en reproduceer lokaal
- **Level 2**: Team lead contact
- **Level 3**: Technical lead escalatie

### Production Issues
- **Critical**: Direct rollback + team alert
- **Major**: Fix in development + hotfix deployment
- **Minor**: Plan fix voor volgende deployment

---

## 🎯 Success Metrics

- **Zero production incidents** door development testing
- **<5 minuten** deployment tijd
- **100% uptime** tijdens deployments
- **<24 uur** issue resolution tijd

---

*Deze guidelines worden regelmatig geüpdatet op basis van ervaringen en feedback.*
