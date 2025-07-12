import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const callGemini = async (textPrompt) => {
  const payload = {
    contents: [
      {
        parts: [{ text: textPrompt }],
      },
    ],
  };

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json();
    console.error('Gemini API Error:', errData);
    throw new Error(errData.error?.message || 'Unknown Gemini API error');
  }

  return await response.json();
};