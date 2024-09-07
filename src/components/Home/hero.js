import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Button, Typography, Card } from "@material-tailwind/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useRouter } from 'next/router';
import Link from 'next/link';

const images = [
  "https://greenviewsresidential.com/wp-content/uploads/2023/09/boti-falls-ghana.jpg",
  "https://www.easytrackghana.com/images/photos2/og/kakum-canopy-walkway-bridges.jpg",
  "https://live.staticflickr.com/65535/53445081299_648f30bc29_b.jpg",
  "https://momaa.org/wp-content/uploads/2023/07/The-Kwame-Nkrumah-Memorial-Park.webp",
  "https://theghcworld.com/wp-content/uploads/2022/06/Mount-Afadja-AFADJATO.jpg",
];

const Hero = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
   {/* if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates.');
      return;
    } */}

    const query = {
    //  startDate: moment(startDate).format('YYYY-MM-DD'),
    //  endDate: moment(endDate).format('YYYY-MM-DD')
    };

    if (location) {
      query.location = location;
    }

    router.push({
      pathname: '/events',
      query
    });
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

    
    

  


    <section className=" object-cover object-center" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      

      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-white dark:text-white lg:text-4xl">Create beautiful website layout with Meraki UI.</h1>
          <p className="mt-6 text-white dark:text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero similique obcaecati illum mollitia.
          </p>

          <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
            <form className="flex flex-col md:flex-row">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search a location"
                className="flex-1 h-10 px-4 py-2 m-1 text-white placeholder-gray-100 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
              >
                Search
              </button>
            </form>
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
