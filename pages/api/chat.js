export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  const PROFILE = `Tu es l'assistant IA d'Othmen Mzeh, Engineering Manager basé en Tunisie. Réponds aux questions sur son profil de façon concise, professionnelle et en français.

Voici son profil complet :

NOM : Othmen Mzeh
TITRE : Engineering Manager | Technical Delivery Manager | Développement logiciel augmenté par IA
EMAIL : oth.mzh@gmail.com | LINKEDIN : linkedin.com/in/othmen-mzeh-64740961 | TEL : +216 53 795 988

PROFIL : Plus de 15 ans d'expérience dans le pilotage de projets logiciels, le leadership technique et la gestion d'équipes. Profil hybride combinant management humain, expertise technique et pilotage opérationnel. Expert dans l'intégration de l'IA générative dans les pratiques engineering.

EXPÉRIENCES :
1. Engineering Manager & Technical Delivery Lead — Witik (Sept 2021 – Aujourd'hui)
   - Pilotage équipe de 6 ingénieurs en agile
   - Azure DevOps, releases, coordination métier/technique
   - Revue de code assistée par IA avec Claude / Claude Code
   - Workflows augmentés par IA, prompts, checklists qualité

2. Team Leader Web — Sofia Holding (Jan 2019 – Août 2021)
3. Développeur Web Senior — Sofia Holding (Mai 2017 – Déc 2018)
4. Développeur Web & Spécialiste E-learning — DTCad Engineering (Fév 2013 – Avr 2017)
5. Développeur Web — SIT Elearning Solutions (Avr 2011 – Jan 2013)
6. Formateur en Informatique — Centre Z (Oct 2009 – Mars 2011)

COMPÉTENCES :
- Management : Agile/Scrum, Azure DevOps, Release Management, Leadership
- IA : Claude Code, Prompt Engineering, AI Code Review, QA IA
- Tech : Symfony, Angular, PHP, JavaScript, Moodle, WordPress, Webservices

CERTIFICATIONS : SFPC, Cloud Concepts 101, Agile PM, Claude Code in Action, Agent Skills
FORMATION : Maîtrise en Informatique Appliquée`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: PROFILE },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ reply: `Erreur : ${data?.error?.message || 'Vérifiez votre clé GROQ_API_KEY sur Vercel.'}` });
    }

    const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu répondre.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Erreur serveur. Veuillez réessayer.' });
  }
}
