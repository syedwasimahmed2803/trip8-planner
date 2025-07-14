// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itineraryForm');
    const itineraryDisplay = document.getElementById('itinerary-display');
    const statusMessage = document.getElementById('status-message');
    let currentItinerary = null;

    const API_URL = 'https://trip8-planner.onrender.com/api/itinerary';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        statusMessage.textContent = 'Generating itinerary...';
        
        const formData = new FormData(form);
        const requestBody = {
            age: parseInt(formData.get('age'), 10),
            days: parseInt(formData.get('days'), 10),
            travelType: formData.get('travelType'),
            travellers: parseInt(formData.get('travellers'), 10),
            budget: formData.get('budget'),
            customization: formData.get('customization') === 'on',
            location: formData.get('location'),
            existingPlans: null
        };

        // This is the key change: stringify the existingPlans object
        if (currentItinerary) {
            requestBody.existingPlans = JSON.stringify(currentItinerary);
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            currentItinerary = data.itinerary;
            renderItinerary(currentItinerary);
            statusMessage.textContent = 'Itinerary generated successfully!';

        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = `Error: ${error.message}`;
            itineraryDisplay.innerHTML = `<p>Failed to generate itinerary. Please try again later.</p>`;
        }
    });

    function renderItinerary(itineraryData) {
        itineraryDisplay.innerHTML = '';
        
        if (!itineraryData || !itineraryData.days || itineraryData.days.length === 0) {
            itineraryDisplay.innerHTML = '<p>No itinerary found.</p>';
            return;
        }

        itineraryData.days.forEach((day, dayIndex) => {
            const dayContainer = document.createElement('div');
            dayContainer.className = 'day-container';
            dayContainer.innerHTML = `<h2>Day ${day.day}</h2>`;
            
            day.activities.forEach((activity, activityIndex) => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';

                activityItem.innerHTML = `
                    <div class="activity-header">
                        <span class="time">${activity.time || 'N/A'}</span>
                        <button class="delete-btn">&times;</button>
                    </div>
                    <div class="activity-title editable" contenteditable="true">${activity.title}</div>
                    <div class="activity-description editable" contenteditable="true">${activity.description}</div>
                    <div class="activity-details">
                        <p><strong>Location:</strong> ${activity.location || 'N/A'}</p>
                        <p><strong>Duration:</strong> ${activity.duration || 'N/A'}</p>
                        <p><strong>Budget:</strong> ${activity.budget || 'N/A'}</p>
                    </div>
                `;

                const deleteButton = activityItem.querySelector('.delete-btn');
                deleteButton.addEventListener('click', () => {
                    // Remove from currentItinerary object and UI
                    itineraryData.days[dayIndex].activities.splice(activityIndex, 1);
                    activityItem.remove();
                });

                // Attach event listeners for editing
                const editableTitle = activityItem.querySelector('.activity-title');
                const editableDescription = activityItem.querySelector('.activity-description');
                
                editableTitle.addEventListener('blur', (e) => {
                    itineraryData.days[dayIndex].activities[activityIndex].title = e.target.textContent;
                });
                
                editableDescription.addEventListener('blur', (e) => {
                    itineraryData.days[dayIndex].activities[activityIndex].description = e.target.textContent;
                });

                dayContainer.appendChild(activityItem);
            });

            itineraryDisplay.appendChild(dayContainer);
        });
    }
});