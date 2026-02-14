// Simple server-side API route that calls Google Generative Language REST API
// Uses server-side env `GEMINI_API_KEY` (recommended). Falls back to
// `NEXT_PUBLIC_GEMINI_API_KEY` if needed.

import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

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

    // Use Google Generative Language REST endpoint (v1beta)
    // Endpoint: POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=API_KEY
    // Using gemini-pro model which is currently available and actively maintained

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    // If message contains an @q mention, try to handle it specially (extract id and query Firestore)
    const isMention = /@q\b/i.test(userMessage);
    if (isMention) {
      // try to extract an id like id:123abc or id: 123abc
      const idMatch = userMessage.match(/id\s*[:]\s*([A-Za-z0-9_-]+)/i);
      if (idMatch) {
        const targetId = idMatch[1];
        // try common collection names
        const collectionsToTry = ['inventory', 'items', 'products'];
        for (const col of collectionsToTry) {
          try {
            const docRef = doc(db, col, targetId);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              const reply = `Tìm thấy mục trong bộ sưu tập \"${col}\": ID=${targetId}, tên=` +
                `${data.name || data.title || 'N/A'}, số lượng=${data.quantity ?? data.qty ?? 'N/A'}`;
              return new Response(JSON.stringify({ reply }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            }
          } catch (e) {
            console.error('Firestore lookup error for', col, targetId, e);
          }
        }

        // try to search by a field 'orderId' or 'id' inside collections
        for (const col of collectionsToTry) {
          try {
            const q = query(collection(db, col), where('orderId', '==', targetId));
            const snaps = await getDocs(q);
            if (!snaps.empty) {
              const docSnap = snaps.docs[0];
              const data = docSnap.data();
              const reply = `Tìm thấy mục trong \"${col}\" theo orderId: ID=${docSnap.id}, tên=${data.name || 'N/A'}, số lượng=${data.quantity ?? 'N/A'}`;
              return new Response(JSON.stringify({ reply }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            }
          } catch (e) {
            console.error('Firestore query error for', col, targetId, e);
          }
        }

        // not found locally
        const notFoundReply = `Không tìm thấy mục với ID=${targetId} trong kho. Vui lòng kiểm tra lại ID.`;
        return new Response(JSON.stringify({ reply: notFoundReply }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // if @q but no id provided, fallthrough to Generative API for parsing intent
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: userMessage
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 512,
      }
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
    // Try to extract text from response following Gemini API schema
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      data?.candidates?.[0]?.output || 
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
