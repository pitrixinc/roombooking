import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, StandaloneSearchBox } from '@react-google-maps/api';

const GoogleMapModal = ({ onClose, onHotelSelect, project }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 5.6037, lng: -0.1870 });
  const searchBoxRef = useRef(null);

  const handleSearch = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const newCenter = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    setCenter(newCenter);
    setHotels([]); // Clear previous hotel results
    fetchHotels(newCenter);
  };

  const fetchHotels = (location) => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: '5000', // 5km radius
        type: ['lodging'] // Type of places to search for (hotels)
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const hotelResults = results.map(result => ({
            id: result.place_id,
            name: result.name,
            location: result.geometry.location,
            fee: Math.floor(Math.random() * 100) + 50, // Random fee for demo purposes
            photo: result.photos && result.photos.length > 0 
              ? result.photos[0].getUrl() 
              : null // Get the photo URL if available
          }));
          setHotels(hotelResults);
        }
      });
    }
  };

  useEffect(() => {
    fetchHotels(center);
  }, [map]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-[95%] md:w-[80%] lg:w-[80%] h-[450px] md:h-auto overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Select a Hotel</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-96">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              libraries={['places']}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={12}
                onLoad={map => setMap(map)}
              >
                <StandaloneSearchBox
                  onLoad={ref => (searchBoxRef.current = ref)}
                  onPlacesChanged={handleSearch}
                >
                  <input
                    type="text"
                    placeholder="Search for locations"
                    className="w-full p-2 border rounded"
                    value={project.location}
                    style={{ boxSizing: 'border-box', position: 'absolute', top: '10px', left: '10px', zIndex: '10' }}
                  />
                </StandaloneSearchBox>
                {hotels.map((hotel) => (
                  <Marker
                    key={hotel.id}
                    position={hotel.location}
                    onClick={() => setSelectedHotel(hotel)}
                  />
                ))}

                {selectedHotel && (
                  <InfoWindow
                    position={selectedHotel.location}
                    onCloseClick={() => setSelectedHotel(null)}
                  >
                    <div>
                      <h3>{selectedHotel.name}</h3>
                      <p>Fee: GHS {selectedHotel.fee}</p>
                      <button
                        className="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
                        onClick={() => {
                          onHotelSelect(selectedHotel.fee, selectedHotel);
                          onClose();
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="overflow-y-auto h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Available Hotels</h3>
            <ul>
              {hotels.map((hotel) => (
                <li
                  key={hotel.id}
                  className="border rounded p-2 mb-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSelectedHotel(hotel);
                    onHotelSelect(hotel.fee, hotel);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {hotel.photo && (
                      <img 
                        src={hotel.photo} 
                        alt={hotel.name} 
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{hotel.name}</h4>
                      <p>Fee: GHS {hotel.fee}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GoogleMapModal;
