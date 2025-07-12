export function validateItineraryRequest(body) {
  const errors = [];

  if (typeof body.age !== 'number' || body.age <= 0) {
    errors.push('Invalid or missing "age". It should be a positive number.');
  }

   if (!body.location) {
    errors.push('Location is required');
  }

  if (typeof body.days !== 'number' || body.days <= 0) {
    errors.push('Invalid or missing "days". It should be a positive number.');
  }

  const validTravelTypes = ['leisure', 'adventure', 'business', 'spiritual'];
  if (!body.travelType || !validTravelTypes.includes(body.travelType)) {
    errors.push(`"travelType" must be one of: ${validTravelTypes.join(', ')}.`);
  }

  if (typeof body.travellers !== 'number' || body.travellers <= 0) {
    errors.push('Invalid or missing "travellers". It should be a positive number.');
  }

  const validBudgets = ['low', 'mid', 'high'];
  if (!body.budget || !validBudgets.includes(body.budget)) {
    errors.push(`"budget" must be one of: ${validBudgets.join(', ')}.`);
  }

  if (body.existingPlans && typeof body.existingPlans !== 'string') {
    errors.push('"existingPlans" should be a string if provided.');
  }

  if (typeof body.customization !== 'boolean') {
    errors.push('"customization" must be a boolean.');
  }

  return errors;
}
