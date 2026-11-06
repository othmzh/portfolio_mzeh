# Portfolio Othmen Mzeh — Next.js

## Stack

| Dépendance | Version | Rôle |
|---|---|---|
| **Next.js** | ^15.5.29 | Framework React (SSR + API routes) |
| **React** | ^19.2.6 | UI |
| **react-dom** | ^19.2.6 | DOM renderer |
| **framer-motion** | ^12.40.0 | Animations UI (tree-shaking optimisé) |
| **react-markdown** | ^10.1.0 | Rendu Markdown dans l'assistant IA |
| **qrcode.react** | ^4.2.0 | Génération QR code |
| **@vercel/analytics** | ^2.0.1 | Suivi des pages vues |
| **@vercel/speed-insights** | ^2.0.0 | Mesure des Core Web Vitals |
| **@redis/client** | ^6.3.1 | Compteurs de quota via REDIS_URL |

**Groq API** — modèle `openai/gpt-oss-120b` (gratuit, clé sécurisée côté serveur)

## Fonctionnalités

- **Bilingue FR/EN** — routing i18n Next.js + hook `useTranslation` personnalisé
- **Interface Admin locale** — édition du contenu JSON et upload ; page et API bloquées en production
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
   - `REDIS_URL` : conserver la chaîne de connexion fournie par votre base Redis (`redis://` ou `rediss://` avec TLS). Aucune variable REST supplémentaire n'est nécessaire.
   - Alternative si `REDIS_URL` n'est pas définie : `KV_REST_API_URL` / `KV_REST_API_TOKEN`, ou `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
   - `ADMIN_PASSWORD` est réservé au développement local ; inutile sur Vercel
5. Deploy ✓

### Protection du chatbot

`REDIS_URL` est prioritaire et utilise le client officiel Redis côté serveur (Node.js 20.9 minimum pour le projet). La connexion est réutilisée par chaque instance chaude, sans reconnexion automatique ni file d'attente hors ligne ; une requête ultérieure peut rouvrir une connexion après une panne. La connexion et chaque transaction ont un délai total de 2 secondes. Redis doit autoriser `MULTI`, `EXEC`, `INCR` et `EXPIRE`. En mode REST alternatif, il doit autoriser `INCR` et `EXPIRE` via pipeline avec un token d'écriture. Les variables ci-dessus sont exclusivement serveur.

Les compteurs atomiques sont communs à toutes les instances : 4 tentatives globales par fenêtre de 15 secondes, 5 par minute et par adresse, puis 200 admissions par jour UTC. Le compteur global est vérifié avant la création de clés par adresse. Le plan gratuit de 30 Mo convient au faible volume attendu d'un portfolio : seules des clés de compteurs sont conservées, avec expiration automatique (30 secondes, 120 secondes ou 48 heures selon le compteur), jamais les conversations. Préférer la politique mémoire `noeviction` pour qu'une saturation refuse les écritures au lieu d'effacer les quotas actifs. Le nombre total de connexions dépend du nombre d'instances Vercel simultanées et reste soumis à la limite du plan.

Les fenêtres sont fixes ; un passage de frontière peut admettre deux lots rapprochés. Les tentatives sont comptées à chaque contrôle atteint et les appels en erreur ne sont pas remboursés. La combinaison du budget court et du délai serveur de 10 secondes borne les appels simultanés. Le message est limité à 2 000 unités UTF-16 et le corps HTTP à 16 Ko.

La clé de quota `portfolio-chat:v1` doit rester commune aux déploiements utilisant le même quota Groq. Vercel fournit `x-vercel-forwarded-for` pour l'adresse client ; en accès Node direct, seule l'adresse de socket est utilisée. Les budgets globaux restent actifs même en cas de changement d'adresse.

En production, une configuration Redis absente, partielle ou indisponible suspend les appels Groq (503 avec un message public générique). Hors production seulement, l'absence complète de Redis utilise un compteur en mémoire. La clé Groq reste côté serveur et les erreurs techniques du fournisseur ne sont pas exposées au visiteur.

### Sessions locales et publication

Les nouvelles sessions sont stockées séparément dans `.admin-sessions/`, avec une expiration propre à chaque jeton contrôlée à chaque requête. Les anciennes sessions `.sessions.json` sont invalidées : reconnectez-vous une fois après cette mise à jour. Ne publiez pas le serveur de développement sur Internet. La production rejette `/admin` avec 404 et les API admin avec 403.

L'accueil et l'article sont générés au build, avec uniquement les traductions/contenus de la langue demandée. Après une modification de contenu, reconstruisez et redéployez. Maintenez la date éditoriale de `ProfilePage` et les `lastmod` du sitemap lors de véritables modifications. Le chatbot et Markdown se chargent à l'approche de leur section ; le contenu principal reste lisible sans JavaScript.

### Vérification

Le lockfile inclut les correctifs de sécurité de Next.js 15. PostCSS est remplacé par une version 8.5 corrigée via `overrides`, afin de conserver Next.js 15 sans migration majeure.

`npm test` exécute les tests de quotas, sessions et API avec des fournisseurs simulés, sans consommation Groq. `npm run build` vérifie les routes et la génération statique. Les réponses FR/EN et API doivent réellement contenir les headers définis dans `next.config.js` après déploiement. Les tests locaux n'attestent pas des variables, ACL ou quotas de la base Redis distante.

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
