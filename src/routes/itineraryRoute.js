import express from 'express';
import { generateItinerary } from '../services/itineraryService.js';
import { validateItineraryRequest } from '../validators/itineraryValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const errors = validateItineraryRequest(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  try {
    const itinerary = await generateItinerary(req.body);
    res.status(200).json({ itinerary });
  } catch (err) {
    console.error('Itinerary generation failed:', err);
    res.status(500).json({ error: 'Failed to generate itinerary', details: err.message });
  }
});

export default router;