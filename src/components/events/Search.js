{/*
// has no semester selection
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

const Search = ({ location, setLocation, startDate, setStartDate, endDate, setEndDate, handleSearch }) => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        location: location || '',
        startDate: startDate ? startDate.toISOString() : '',
        endDate: endDate ? endDate.toISOString() : ''
      }
    });
    handleSearch();
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex flex-col sm:flex-row border-2 border-yellow-500 rounded-lg overflow-hidden  max-w-[66rem] sm:max-w-full">
        <div className="flex items-center bg-white p-2 flex-grow">
          <span className="material-icons">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where are you going?"
            className="p-2 outline-none flex-grow"
          />
  </div> 
        <div className="flex items-center border-t-2 border-yellow-500 sm:border-t-0 sm:border-l-2 bg-white p-2 flex-grow">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            placeholderText="Check-in Date"
            className="p-2 outline-none w-full"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            placeholderText="Check-out Date"
            className="p-2 outline-none w-full"
          />
        </div>
        <button onClick={handleSearchClick} className="bg-blue-500 text-white p-2 flex-grow sm:flex-grow-0">Search</button>
      </div>
    </div>
  );
};

export default Search;
*/}







//has semester selection
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import { addDays } from 'date-fns';

const Search = ({ location, setLocation, startDate, setStartDate, endDate, setEndDate, handleSearch }) => {
  const router = useRouter();
  const [semester, setSemester] = useState(1); // Default to 1 Semester

  const handleSemesterChange = (e) => {
    const selectedSemester = parseInt(e.target.value, 10);
    setSemester(selectedSemester);

    if (startDate) {
      const duration = selectedSemester === 1 ? 122 : 244;
      const calculatedEndDate = addDays(startDate, duration);
      setEndDate(calculatedEndDate);
    } else {
      setEndDate(null);
    }
  };

  const handleCheckInDateChange = (date) => {
    setStartDate(date);
    if (semester) {
      const duration = semester === 1 ? 122 : 244;
      const calculatedEndDate = addDays(date, duration);
      setEndDate(calculatedEndDate);
    } else {
      setEndDate(null);
    }
  };

  const handleSearchClick = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        location: location || '',
        startDate: startDate ? startDate.toISOString() : '',
        endDate: endDate ? endDate.toISOString() : '',
        semester: semester || ''
      }
    });
    handleSearch();
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex flex-col sm:flex-row border-2 border-yellow-500 rounded-lg overflow-hidden  max-w-[66rem] sm:max-w-full">
        <div className="flex items-center bg-white p-2 flex-grow">
          <span className="material-icons">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where are you going?"
            className="p-2 outline-none flex-grow"
          />
        </div> 

        <div className="flex items-center bg-white p-2 flex-grow">
          <select
            value={semester}
            onChange={handleSemesterChange}
            className="p-2 outline-none w-full"
          >
            <option>Select semester</option>
            <option value={1}>1 Semester</option>
            <option value={2}>2 Semesters</option>
          </select>
        </div>

        <div className="flex items-center border-t-2 border-yellow-500 sm:border-t-0 sm:border-l-2 bg-white p-2 flex-grow">
          <DatePicker
            selected={startDate}
            onChange={handleCheckInDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            placeholderText="Check-in Date"
            className="p-2 outline-none w-full"
          />
          <DatePicker
            selected={endDate}
            onChange={() => {}}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            placeholderText="Check-out Date"
            className="p-2 outline-none w-full"
            readOnly
          />
        </div>
        <button onClick={handleSearchClick} className="bg-blue-500 text-white p-2 flex-grow sm:flex-grow-0">Search</button>
      </div>
    </div>
  );
};

export default Search;










{/* 

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

const Search = ({ location, setLocation, startDate, setStartDate, endDate, setEndDate, handleSearch }) => {
  const router = useRouter();
  const [semester, setSemester] = useState('1'); // Default to 1 Semester (122 days)

  useEffect(() => {
    // Calculate and set the end date based on the selected start date and semester
    if (startDate) {
      const days = semester === '1' ? 122 : 244;
      const calculatedEndDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
      setEndDate(calculatedEndDate);
      
      // Update the URL with startDate, endDate, and semester
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          location: location || '',
          startDate: startDate.toISOString(),
          endDate: calculatedEndDate.toISOString(),
          semester: semester,
        },
      }, undefined, { shallow: true });
    }
  }, [startDate, semester]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex flex-col sm:flex-row border-2 border-yellow-500 rounded-lg overflow-hidden max-w-[66rem] sm:max-w-full">
        <div className="flex items-center bg-white p-2 flex-grow">
          <span className="material-icons">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
            </svg>
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where are you going?"
            className="p-2 outline-none flex-grow"
          />
        </div>
        <div className="flex items-center border-t-2 border-yellow-500 sm:border-t-0 sm:border-l-2 bg-white p-2 flex-grow">
          <select
            value={semester}
            onChange={handleSemesterChange}
            className="p-2 outline-none w-full"
          >
            <option value="1">1 Semester (122 days)</option>
            <option value="2">2 Semesters (244 days)</option>
          </select>
        </div>
        <div className="flex items-center border-t-2 border-yellow-500 sm:border-t-0 sm:border-l-2 bg-white p-2 flex-grow">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            placeholderText="Check-in Date"
            className="p-2 outline-none w-full"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            placeholderText="Check-out Date"
            className="p-2 outline-none w-full"
            dateFormat="yyyy-MM-dd"
            disabled
          />
        </div>
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 flex-grow sm:flex-grow-0">Search</button>
      </div>
    </div>
  );
};

export default Search;


*/}