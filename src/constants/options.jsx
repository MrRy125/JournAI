export const SelectTravelLists = [
    {
        id: 1,
        title: 'Solo Adventure',
        description: 'Perfect for solo travelers seeking exploration and self-discovery.',
        icon: '🧍',
        numberOfPeople: '1 Person'
    },
    {
        id: 2,
        title: 'Romantic Getaway',
        description: 'Designed for couples looking for a relaxing or romantic retreat.',
        icon: '💑',
        numberOfPeople: '2 People'
    },
    {
        id: 3,
        title: 'Family Vacation',
        description: 'Ideal for families wanting a fun and adventurous experience together.',
        icon: '👨‍👩‍👧‍👦',
        numberOfPeople: '3-5 People'
    },
    {
        id: 4,
        title: 'Friends Trip',
        description: 'Perfect for a group of friends seeking thrilling and shared experiences.',
        icon: '👫👬👭',
        numberOfPeople: '5-10 People'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget-Friendly',
        description: 'Ideal for keeping costs low without missing out on experiences.',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Mid-Range',
        description: 'A balanced approach to spending for a comfortable experience.',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        description: 'No expense spared for a premium travel experience.',
        icon: '💰',
    },
];

export const AI_PROMPT = 'Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {location} for no of days: {totalDays} with no of People or group: {traveler} with Budget: {budget}; give me list of hotels with hotelName, hotelAddress, price, rating for hotels; also for the same create the itinerary for 4-5 days, day, bestTime, placeLocation, placeName, placeDetails, ticketPricing: adult and child, timeAvailable, timeToTravel: fromAirport; Remember all have to cover in the {budget} level budget. Important: give the result in JSON Format';
