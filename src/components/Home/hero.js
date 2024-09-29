import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Button, Typography, Card } from "@material-tailwind/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { addDays } from 'date-fns';

const images = [
  "https://images.pexels.com/photos/6758238/pexels-photo-6758238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  "https://images.pexels.com/photos/1755288/pexels-photo-1755288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3457292/pexels-photo-3457292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3773572/pexels-photo-3773572.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const Hero = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);


  
  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates.');
      return;
    } 

    const query = {
     startDate: moment(startDate).format('YYYY-MM-DD'),
     endDate: moment(endDate).format('YYYY-MM-DD')
    };

    if (location) {
      query.location = location;
    }

    router.push({
      pathname: '/rooms',
      query
    });
  };


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
        semester: semester || 0
      }
    });
    handleSearch();
  };
 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<div>
  {/*
    <div className="!flex h-[55vh] w-full items-center justify-between px-0 md:px-10">

  <div className="absolute inset-0 transition-transform duration-1000">
        <Image
          width={1200}
          height={1200}
          src={images[currentImageIndex]}
          alt={`bg-img-${currentImageIndex}`}
          className="ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
        />
      </div>
       

      <div className="container mx-auto mt-[360px] md:mt-28">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/90 rounded-bl-[100px] py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-2xl lg:max-w-3xl"
            >
              Discover Ghana: Book Unique Local Events and Festivals Now!
            </Typography>
            <Typography variant="lead" className="mb-2 mt-6 !text-gray-900">
            Experience the vibrant culture of Ghana. Book exclusive local events, festivals, 
            and tourist site visits for an unforgettable adventure. 
            Join us in exploring the heart of Ghana&apos;s rich heritage.
            </Typography>


            
            <div className="flex items-center justify-center mt-8">
      <div className="flex flex-col sm:flex-row border-2 border-yellow-500 rounded-lg overflow-hidden w-full max-w-md sm:max-w-full">
       
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
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 flex-grow sm:flex-grow-0">Search</button>
      </div>
    </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 lg:justify-start mt-8">
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-pinterest.svg"
                alt="pinterest"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-netflix.svg"
                alt="netflix"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-coinbase.svg"
                alt="coinbase"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-google.svg"
                alt="google"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
*/}

    
    

  


    <section className="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      

      <div className="container px-6 py-16 mx-auto text-center ">
        <div className="md:max-w-[700px] max-w-lg mx-auto md:mt-[100px] bg-white/30 backdrop-blur-md md:p-4 p-2 rounded-lg shadow-md ">
          <h1 className="text-3xl font-semibold text-white dark:text-white lg:text-4xl">Find Your Perfect Getaway: Book Rooms Effortlessly and Instantly!</h1>
          <p className="mt-6 text-white dark:text-gray-300">
          Discover top-rated rooms in your favorite destinations with ease. Quick booking, seamless experience, unforgettable stays.
          </p>
{/*
          <div className="w-full mx-auto mt-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-md dark:border-gray-700 dark:bg-gray-800/30">
  <form className="flex flex-col md:flex-row">
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Search a location"
      className="flex-1 h-10 px-4 py-2 m-1 text-white placeholder-gray-100 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
    />
    
    <div className="flex items-center border-t-2 border-yellow-500 sm:border-t-0 sm:border-l-2 bg-transparent p-2 flex-grow">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        placeholderText="Check-in Date"
        className="p-2 outline-none w-full bg-transparent text-white placeholder-white"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        placeholderText="Check-out Date"
        className="p-2 outline-none w-full bg-transparent text-white placeholder-white"
      />
    </div>
    <button
      type="button"
      onClick={handleSearch}
      className="h-10 px-4 py-2 m-2 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
    >
      Search
    </button>
  </form>
</div>
*/}

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
            placeholder="Search room location"
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
        </div>

        <div class="max-w-screen-xl mx-auto mt-20">
            <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-pinterest.svg"
                alt="pinterest"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-netflix.svg"
                alt="netflix"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-coinbase.svg"
                alt="coinbase"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-google.svg"
                alt="google"
              />
              </div>
            </div>
        
    </div>
</section>
    </div>
  );
};

export default Hero;
