# Portfolio Othmen Mzeh — Next.js

## Stack

| Dépendance | Version | Rôle |
|---|---|---|
| **Next.js** | ^15.5.18 | Framework React (SSR + API routes) |
| **React** | ^19.2.6 | UI |
| **react-dom** | ^19.2.6 | DOM renderer |
| **framer-motion** | ^12.40.0 | Animations UI (tree-shaking optimisé) |
| **react-markdown** | ^10.1.0 | Rendu Markdown dans l'assistant IA |
| **qrcode.react** | ^4.2.0 | Génération QR code |
| **@vercel/analytics** | ^2.0.1 | Suivi des pages vues |
| **@vercel/speed-insights** | ^2.0.0 | Mesure des Core Web Vitals |

**Groq API** — modèle `openai/gpt-oss-120b` (gratuit, clé sécurisée côté serveur)

## Fonctionnalités

- **Bilingue FR/EN** — routing i18n Next.js + hook `useTranslation` personnalisé
- **Interface Admin** — édition du contenu JSON, upload photo de profil
- **Assistant IA** — chatbot propulsé par Groq (clé sécurisée côté serveur)
- **Bouton WhatsApp** — floating button de contact direct
- **PWA** — manifest + icônes pour installation mobile
- **SEO avancé** — structured data, OG image dynamique, sitemap avec hreflang FR/EN, Google Search Console
- **Sécurité** — headers HTTP (CSP, HSTS, X-Frame-Options…), rate limiting, auth admin

## Démarrage local

```bash
npm install
cp .env.local.example .env.local
# Ajoutez votre clé Groq dans .env.local
npm run dev
```

## Déploiement Vercel

1. Pushez ce repo sur GitHub
2. Importez sur vercel.com → Import Git Repository
3. Framework : **Next.js** (détecté automatiquement)
4. Environment Variables → ajoutez :
   - `GROQ_API_KEY` = `gsk_xxxx`  ← Gratuit sur console.groq.com
   - `ADMIN_PASSWORD` = `votre_mot_de_passe_admin`
5. Deploy ✓

## Structure

```
portfolio-othmen/
├── pages/
│   ├── index.js                # Page principale
│   ├── admin.js                # Interface d'administration
│   ├── 404.js                  # Page d'erreur personnalisée
│   ├── _app.js
│   ├── _document.js
│   └── api/
│       ├── chat.js             # Route serverless Groq (clé sécurisée)
│       ├── admin-auth.js       # Authentification admin
│       ├── admin-save.js       # Sauvegarde des données JSON
│       ├── admin-upload.js     # Upload photo de profil
│       └── og.js               # Génération OG image dynamique
├── components/
│   ├── Nav.js                  # Navigation + toggle dark/light
│   ├── Hero.js                 # Hero + terminal JSON + photo
│   ├── Skills.js
│   ├── Experience.js
│   ├── Certifications.js
│   ├── AIChat.js               # Assistant IA
│   ├── Contact.js
│   ├── Footer.js
│   ├── LangSwitcher.js         # Sélecteur FR/EN
│   ├── WhatsAppButton.js       # Bouton flottant WhatsApp
│   ├── QRCard.js
│   ├── TerminalCard.js
│   └── ErrorBoundary.js
├── locales/                    # Fichiers de traduction FR/EN
├── styles/globals.css          # Variables CSS dark/light + responsive
├── public/
│   ├── othmen.png              # Photo de profil
│   ├── manifest.json           # PWA manifest
│   └── sitemap.xml             # Sitemap avec hreflang
├── next.config.js              # i18n, headers sécurité, optimisations
├── .env.local.example
└── .gitignore
```
