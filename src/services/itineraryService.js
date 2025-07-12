import { callGemini } from '../utils/geminiClient.js';
import { extractTextFromGemini, formatPromptFromPayload } from '../utils/formatters.js';

export const generateItinerary = async (userData) => {
    // Build the prompt using the formatter method
    const prompt = formatPromptFromPayload(userData);

    // Send to Gemini
      const response = await callGemini(prompt);

//     const response = {
//         itinerary: {
//             candidates: [
//                 {
//                     content: {
//                         parts: [
//                             {
//                                 text: `\`\`\`json
// {
//   "location": "Pondicherry",
//   "days": [
//     {
//       "day": 1,
//       "activities": [
//         {
//           "time": "09:00 AM",
//           "title": "Explore White Town",
//           "location": "White Town",
//           "description": "Wander through the French Quarter's charming streets, admiring the colonial architecture and vibrant buildings.",
//           "duration": "2 hours",
//           "budget": "₹0",
//           "tags": ["walking", "architecture", "photography", "heritage"]
//         },
//         {
//           "time": "11:00 AM",
//           "title": "Visit Aurobindo Ashram",
//           "location": "Sri Aurobindo Ashram",
//           "description": "Experience the serene atmosphere of the Ashram, a spiritual community founded by Sri Aurobindo.",
//           "duration": "1.5 hours",
//           "budget": "₹0",
//           "tags": ["spiritual", "meditation", "history", "culture"]
//         },
//         {
//           "time": "12:30 PM",
//           "title": "Lunch at Le Dupleix",
//           "location": "Le Dupleix",
//           "description": "Enjoy a delicious lunch at the historic Le Dupleix hotel, savoring French-Indian fusion cuisine.",
//           "duration": "1.5 hours",
//           "budget": "₹1500-2500",
//           "tags": ["food", "french", "indian", "fine dining"]
//         },
//         {
//           "time": "02:00 PM",
//           "title": "Paradise Beach Visit",
//           "location": "Paradise Beach (Chunnambar Boat House)",
//           "description": "Take a boat ride to Paradise Beach, relax on the pristine sands, and enjoy the tranquil sea.",
//           "duration": "3 hours",
//           "budget": "₹500-800",
//           "tags": ["beach", "boat ride", "relaxation", "water activities"]
//         },
//         {
//           "time": "05:00 PM",
//           "title": "Promenade Stroll",
//           "location": "Rock Beach (Promenade)",
//           "description": "Take a leisurely stroll along the Promenade, enjoying the sea breeze and street performers.",
//           "duration": "1 hour",
//           "budget": "₹0",
//           "tags": ["walking", "sea view", "street performance", "evening"]
//         },
//         {
//           "time": "06:00 PM",
//           "title": "Shopping at Kalki",
//           "location": "Kalki",
//           "description": "Browse through the unique collection of incense, candles, essential oils, and other aromatherapy products.",
//           "duration": "1 hour",
//           "budget": "₹500-1000",
//           "tags": ["shopping", "aromatherapy", "souvenirs", "gifts"]
//         },
//         {
//           "time": "07:00 PM",
//           "title": "Dinner at Tanto Pizzeria",
//           "location": "Tanto Pizzeria",
//           "description": "Enjoy authentic Italian pizza and pasta in a casual setting.",
//           "duration": "1.5 hours",
//           "budget": "₹800-1200",
//           "tags": ["food", "italian", "pizza", "casual dining"]
//         }
//       ]
//     }
//   ]
// }
// \`\`\``
//                             }
//                         ],
//                         role: "model"
//                     },
//                     finishReason: "STOP",
//                     avgLogprobs: -0.11978094574782767
//                 }
//             ],
//             usageMetadata: {
//                 promptTokenCount: 205,
//                 candidatesTokenCount: 793,
//                 totalTokenCount: 998,
//                 promptTokensDetails: [
//                     {
//                         modality: "TEXT",
//                         tokenCount: 205
//                     }
//                 ],
//                 candidatesTokensDetails: [
//                     {
//                         modality: "TEXT",
//                         tokenCount: 793
//                     }
//                 ]
//             },
//             modelVersion: "gemini-2.0-flash",
//             responseId: "ZEpyaOzqEYWpzgHvk4rwBg"
//         }
//     };


    // Clean / extract text if needed
    const formattedItinerary = extractTextFromGemini(response);

    return formattedItinerary;
};
