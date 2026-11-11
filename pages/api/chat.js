import { getChatProfile } from '../../lib/chat-profile.mjs'
import { admitChat, MAX_MESSAGE_LENGTH, UPSTREAM_TIMEOUT_MS } from '../../lib/chat-admission.mjs'

export const config = { api: { bodyParser: { sizeLimit: '16kb' } } }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, locale } = req.body || {};
  if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: locale === 'en' ? 'Enter a message of 1–2000 characters.' : 'Saisissez un message de 1 à 2000 caractères.' });
  }

  const lang = locale === 'en' ? 'en' : 'fr';
  if (!process.env.GROQ_API_KEY) return res.status(503).json({ error: lang === 'en' ? 'Assistant temporarily unavailable.' : 'Assistant temporairement indisponible.' });
  try {
    const admission = await admitChat(req);
    if (!admission.allowed) {
      res.setHeader('Retry-After', String(admission.retryAfter));
      return res.status(429).json({ error: lang === 'en' ? 'The assistant is busy. Please try again later.' : 'L’assistant est très sollicité. Réessayez un peu plus tard.' });
    }
  } catch {
    return res.status(503).json({ error: lang === 'en' ? 'Assistant temporarily unavailable.' : 'Assistant temporairement indisponible.' });
  }

  const controller = new AbortController();
  if (res.destroyed) return;
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  const onClose = () => { if (!res.writableEnded) controller.abort(); };
  res.on('close', onClose);
  try {
    const profile = await getChatProfile(lang);
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        max_tokens: 1000,
        reasoning_effort: 'low',
        messages: [
          { role: 'system', content: profile },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = lang === 'en'
        ? 'Assistant temporarily unavailable. Please try again later.'
        : 'Assistant temporairement indisponible. Réessayez plus tard.';
      return res.status(502).json({ reply: errMsg });
    }

    const fallback = lang === 'en' ? "Sorry, I couldn't respond." : "Désolé, je n'ai pas pu répondre.";
    const reply = data.choices?.[0]?.message?.content || fallback;
    res.status(200).json({ reply });
  } catch (error) {
    const errMsg = lang === 'en' ? 'Server error. Please try again.' : 'Erreur serveur. Veuillez réessayer.';
    if (!res.destroyed) res.status(controller.signal.aborted ? 504 : 502).json({ reply: errMsg });
  } finally {
    clearTimeout(timeout);
    res.off('close', onClose);
  }
}
