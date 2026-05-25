# Portfolio Othmen Mzeh — Next.js

## Stack
- **Next.js 14** (React)
- **Groq API** (gratuit) — llama-3.1-8b-instant
- **API Route** `/pages/api/chat.js` — clé sécurisée côté serveur
- **Vercel** pour le déploiement
- **@vercel/analytics** — suivi des pages vues
- **@vercel/speed-insights** — mesure des Core Web Vitals

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
5. Deploy ✓

## Structure

```
portfolio-othmen/
├── pages/
│   ├── index.js            # Page principale
│   ├── _app.js
│   └── api/chat.js         # Route serverless Groq (clé sécurisée)
├── components/
│   ├── Nav.js              # Navigation + toggle dark/light
│   ├── Hero.js             # Hero + terminal JSON + photo
│   ├── Skills.js
│   ├── Experience.js
│   ├── Certifications.js
│   ├── AIChat.js           # Assistant IA
│   └── Contact.js
├── styles/globals.css      # Variables CSS dark/light + responsive
├── public/othmen.png       # Photo de profil
├── .env.local.example
└── .gitignore
```
