// components/HotelModal.js
import { useEffect, useState } from 'react';

const HotelModal = ({ isOpen, onClose, location }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchHotels(location);
    }
  }, [isOpen, location]);

  const fetchHotels = async (location) => {
    try {
      const response = await fetch(`/api/getHotels?location=${location}`);
      const data = await response.json();
      setHotels(data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Available Hotels in {location}</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">Close</button>
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.place_id} className="border-b py-2">
              <h3 className="font-semibold">{hotel.name}</h3>
              <p>{hotel.formatted_address}</p>
              <p>Rating: {hotel.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotelModal;
