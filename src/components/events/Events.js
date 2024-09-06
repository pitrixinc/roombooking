import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Typography, Card, CardBody, CardHeader, Button } from "@material-tailwind/react";
import moment from 'moment';
import Search from './Search';

const Events = () => {
  const router = useRouter();
  const { startDate, endDate, location } = router.query;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = ['all', 'Festival', 'Local Event', 'Tourist Site'];
  const eventsPerPage = 9;

  const handleSearch = () => {
    setCurrentPage(1);
    setHasSearched(true); // Mark that the user has searched
    fetchEvents();
  };

  /*
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsRef = collection(db, 'events');
      const querySnapshot = await getDocs(eventsRef);
      let eventsList = [];

      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const eventStartDate = new Date(eventData.startDate.seconds * 1000 || eventData.startDate);
        const eventDeadline = new Date(eventData.deadline.seconds * 1000 || eventData.deadline);
        const checkInDate = moment(startDate);
        const checkOutDate = moment(endDate);

        if (
          moment(eventDeadline).isAfter(moment()) &&
          moment(eventStartDate).isBetween(checkInDate, checkOutDate, null, '[]') &&
          (!location || eventData.location.toLowerCase() === location.toLowerCase()) &&
          (selectedCategory === 'all' || eventData.category === selectedCategory)
        ) {
          eventsList.push({ id: doc.id, ...eventData });
        }
      });

      eventsList = eventsList.sort(() => 0.5 - Math.random());
      setTotalPages(Math.ceil(eventsList.length / eventsPerPage));
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsRef = collection(db, 'events');
      const querySnapshot = await getDocs(eventsRef);
      let eventsList = [];
  
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const eventStartDate = new Date(eventData.startDate.seconds * 1000 || eventData.startDate);
        const eventDeadline = new Date(eventData.deadline.seconds * 1000 || eventData.deadline);
        const checkInDate = moment(startDate);
        const checkOutDate = moment(endDate);
  
        // Check if there's any overlap between the user's date range and the event's date range
        const isEventInRange = 
          moment(eventStartDate).isBefore(checkOutDate) && moment(eventDeadline).isAfter(checkInDate);
  
        if (
          isEventInRange &&
          (!location || eventData.location.toLowerCase() === location.toLowerCase()) &&
          (selectedCategory === 'all' || eventData.category === selectedCategory)
        ) {
          eventsList.push({ id: doc.id, ...eventData });
        }
      });
  
      eventsList = eventsList.sort(() => 0.5 - Math.random());
      setTotalPages(Math.ceil(eventsList.length / eventsPerPage));
      setEvents(eventsList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (startDate && endDate) {
      fetchEvents();
    }
  }, [startDate, endDate, location, selectedCategory]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const selectedEvents = events.slice(startIndex, startIndex + eventsPerPage);

  

  return (
    <div className="container mx-auto p-4">
    {/*  <Typography variant="h2" className="mb-6">Events</Typography> */}

      <Search
        location={location}
        setLocation={(loc) => router.push({ query: { ...router.query, location: loc } })}
        startDate={startDate ? new Date(startDate) : null}
        setStartDate={(date) => router.push({ query: { ...router.query, startDate: date.toISOString() } })}
        endDate={endDate ? new Date(endDate) : null}
        setEndDate={(date) => router.push({ query: { ...router.query, endDate: date.toISOString() } })}
        handleSearch={handleSearch}
      />

      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to the first page when category changes
            }}
            className="mx-2 p-2 mt-1"
          >
            {category}
          </Button>
        ))}
      </div>
      {!hasSearched ? (
          // Display a message if the user has not yet searched
          <Typography variant="body1" className="text-center text-gray-600">
            Please search for events using the search bar above.
          </Typography>
        ) : (
        <>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className='text-r font-semibold flex items-center justify-center p-5'>Loading ...</div>
          </div>
        ): selectedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedEvents.map(event => (
                <Card key={event.id} onClick={() => router.push(`/events/${event.id}?startDate=${startDate}&endDate=${endDate}`)}  className="p-2 border cursor-pointer">
                  <CardHeader className="h-64">
                    <img
                    //  width={768}
                    //  height={768}
                      src={event.image}
                      alt="image"
                      className="h-full w-full object-cover scale-[1.1]"
                    />
                  </CardHeader>
                  <CardBody>
                  <div className="flex justify-between gap-2">
                    <Typography
                      variant="small"
                      color="blue"
                      className="mb-2 font-normal text-gray-500"
                    >
                      Start on {event.startDate}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue"
                      className="mb-2 font-normal text-rose-500"
                    >
                      Ends on {event.deadline}
                    </Typography>
                  </div>
                  <Typography variant="h5" className="mb-2 normal-case">{event.title}</Typography>
                  <Typography variant="body2" className="mb-2 font-semibold">Location: {event.location}</Typography>
                 {/* <Typography variant="body2" className="mb-2">Start Date: {moment(event.startDate.seconds * 1000 || event.startDate).format('MMMM Do YYYY')}</Typography> */}
                  <Typography variant="body2" className="mb-2">Description: {event.description.slice(0,120)}...</Typography>
                  <Button variant="outlined" className="mt-4">Category: {event.category}</Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Typography variant="body1" className='text-r font-semibold flex items-center justify-center p-5 text-white bg-blue-500 rounded-full'>No events available</Typography>
          )}

          {/* Pagination */}
          <div className="mt-6 sm:flex sm:items-center sm:justify-between">
            <div className="text-sm text-gray-500">
              Page <span className="font-medium text-gray-700">{currentPage}</span> of <span className="font-medium text-gray-700">{totalPages}</span>
            </div>
            <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Previous</span>
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <span>Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
