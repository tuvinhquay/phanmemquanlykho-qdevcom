// Simple server-side API route that calls Google Generative Language REST API
// Uses server-side env `GEMINI_API_KEY` (recommended). Falls back to
// `NEXT_PUBLIC_GEMINI_API_KEY` if needed.

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const userMessage = String(message || '').trim();

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'Empty message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY');
      return new Response(JSON.stringify({ error: 'Server not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use Google Generative Language REST endpoint (v1beta2)
    // Endpoint: POST https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=API_KEY
    // If you want to use Gemini models, replace model name accordingly and ensure your project has access.

    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${encodeURIComponent(
      apiKey
    )}`;

    const payload = {
      prompt: { text: userMessage },
      temperature: 0.2,
      maxOutputTokens: 512,
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Generative API error', res.status, text);
      return new Response(JSON.stringify({ error: 'Generative API error', details: text }), {
        status: res.status === 401 ? 401 : 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    // Try to extract text from response following Generative Language schema
    const reply =
      data?.candidates?.[0]?.output || data?.candidates?.[0]?.content?.[0]?.text || data?.output?.[0]?.content?.[0]?.text ||
      JSON.stringify(data);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat route error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
