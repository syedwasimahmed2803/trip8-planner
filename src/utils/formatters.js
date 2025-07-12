/**
 * Format prompt from user input for itinerary generation.
 * @param {Object} data - Validated user input.
 * @returns {string} Prompt string for Gemini.
 */
export function formatPromptFromPayload(data) {
  const {
    age,
    days,
    travellers,
    travelType,
    budget,
    existingPlans,
    customization,
    location
  } = data;

  const preferences = [];

  if (age) preferences.push(`age group: ${age}`);
  if (travellers) preferences.push(`travellers: ${travellers}`);
  if (travelType) preferences.push(`travel type: ${travelType}`);
  if (budget) preferences.push(`budget: ₹${budget}`);
  if (existingPlans && existingPlans.length > 0) {
    preferences.push(`existing plans: ${existingPlans}`);
  }
  if (customization && customization.length > 0) {
    preferences.push(`customization: ${customization}`);
  }

  return `
Generate a ${days}-day ${travelType} itinerary for ${location}, considering these preferences: ${preferences.join(', ')}.

Please return the output in the following strict JSON format (no markdown, no explanation):

{
  "location": "<string>",
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "time": "<HH:MM AM/PM>",
          "title": "<short title>",
          "location": "<place name>",
          "description": "<summary>",
          "duration": "<X hours or X mins>",
          "budget": "<₹XXX-XXX>",
          "tags": ["<tag1>", "<tag2>"]
        }
      ]
    }
  ]
}
`.trim();
}

/**
 * Extract plain text from Gemini response.
 * @param {Object} response - Gemini API response.
 * @returns {string|null}
 */
export function extractTextFromGemini(response) {

  let rawText = response.candidates[0].content.parts[0].text.trim();

  // Remove leading and trailing ```json or ``` code fences
  rawText = rawText.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '');

  try {
    const parsed = JSON.parse(rawText);

    // Handle double-encoded JSON
    if (typeof parsed === 'string') {
      return JSON.parse(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini response:', err);
    return null;
  }
}

