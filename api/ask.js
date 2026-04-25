// api/ask.js — Vercel serverless function
// Proxies questions to the Anthropic API using a server-side API key.
// The key is stored as an environment variable in Vercel and never exposed
// to the client.

export default async function handler(req, res) {
  // CORS — allow your own domain to call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        messages: [
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: `Anthropic API error: ${response.status}`,
        detail: errText,
      });
    }

    const data = await response.json();
    // Extract the text content from the response
    const answer = data.content
      ?.filter(c => c.type === 'text')
      ?.map(c => c.text)
      ?.join('\n\n')
      || 'No response received';

    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({
      error: 'Server error',
      detail: err.message || String(err),
    });
  }
}
