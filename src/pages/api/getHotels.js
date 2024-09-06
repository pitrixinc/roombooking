// pages/api/getHotels.js
export default async function handler(req, res) {
    const { location } = req.query;
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${location}&key=${apiKey}`);
      const data = await response.json();
      res.status(200).json({ hotels: data.results });
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ error: 'Failed to fetch hotels' });
    }
  }
  