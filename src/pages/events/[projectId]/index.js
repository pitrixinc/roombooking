import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
const inter = Inter({ subsets: ["latin"] });
import { AiFillHome, AiOutlineClockCircle, AiOutlineInbox, AiOutlineUser } from "react-icons/ai"
import { MdOutlineAddComment, MdOutlineLocationOn, MdOutlineLockClock, MdVerified } from "react-icons/md";
import { RiContactsBook3Line, RiMoneyDollarCircleLine, RiShareBoxLine, RiSkull2Line, RiTeamLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import moment from 'moment';
//import Moment from 'react-moment';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, addDoc, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BsGift } from "react-icons/bs";
import GoogleMapModal from '../../../components/events/GoogleMapModal'; // Import GoogleMapModal component

export default function Projectid() {
  const router = useRouter();
  const { projectId, startDate, endDate } = router.query; // Extract projectId from URL parameters
  const [project, setProject] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showGoogleMapModal, setShowGoogleMapModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({}); // State to store selected hotel details
  const [userHasBooked, setUserHasBooked] = useState(false);

  console.log("checkin date", startDate)
  const days = moment(endDate).diff(moment(startDate), 'days') + 1;
  console.log("days difference", days)
  //    const totalHotelFee = days * hotelFee;


  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        //  console.log("User data", userData)
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectDoc = await getDoc(doc(db, 'events', projectId));
        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() });
        } else {
          toast.error('event not found');
        }
      } catch (error) {
        toast.error('Error fetching event details:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const bookingsQuery = query(collection(db, 'eventbooking'), where('projectId', '==', projectId));
        const bookingsSnapshot = await getDocs(bookingsQuery);

        let total = 0;
        let count = 0;
        let userBookingExists = false;

        bookingsSnapshot.forEach(doc => {
          total += doc.data().amount;
          count += 1;
          if (doc.data().userId === currentUser?.uid) {
            userBookingExists = true;
          }
        });

        setTotalBookings(total);
        setBookingCount(count);
        setUserHasBooked(userBookingExists);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
      fetchBookings();
    }
  }, [projectId, currentUser]);

  
  const handlePackageSelection = (selectedPackage) => {
    let newAmount = project.goal * days; // Start with project.goal as the base amount

    switch (selectedPackage) {
      case 'Silver':
        newAmount += 150;
        setShowGoogleMapModal(true); // Show modal for hotel selection
        break;
      case 'Gold':
        newAmount += 170;
        setShowGoogleMapModal(true); // Show modal for hotel selection
        break;
      case 'Bronze':
      default:
        newAmount += 100;
        break;
    }

    setSelectedPackage(selectedPackage);
    setAmount(newAmount);
  };
  

const handlePayment = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!userData) {
    router.push('/signin');
    toast.error('Please sign in before you donate!');
    return;
  }

  if (!startDate || !endDate) {
    router.push('/events')
    toast.error('Check in date and check out date is required')
    return;
  } 

  if (!amount || isNaN(amount) || amount <= 0) {
    toast.error('Please enter a valid amount.');
    setLoading(false);
    return;
  }

  const email = currentUser.email
  

  const bookingAmountNumber = parseFloat(amount);

  if (typeof window !== "undefined") {
    const PaystackPop = (await import('@paystack/inline-js')).default;

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100, // Amount in kobo (100 kobo = 1 GHS)
      currency: 'GHS',
      callback: async (response) => {
        if (response.status === 'success') {
          await handleBooking();
        //  router.push(`/events/${projectId}/thank-you`);
        } else {
          toast.error('Payment was not successful. Please try again.');
          setLoading(false);
        }
      },
      onClose: () => {
        toast.error('Payment was not completed.');
        setLoading(false);
      },
    });
  }
};


  
const handleBooking = async () => {
  // Handle payment logic here, e.g., integrate with a payment gateway
  // Assuming payment is successful

  const bookingAmountNumber = parseFloat(amount);

  let packageAmount = 0;
  switch (selectedPackage) {
    case 'Silver':
      packageAmount = 150;
      break;
    case 'Gold':
      packageAmount = 170;
      break;
    case 'Bronze':
    default:
      packageAmount = 100;
      break;
  }

  try {
    const newBookingRef = doc(collection(db, 'eventbooking'));
    const bookingId = newBookingRef.id;

    await setDoc(newBookingRef, {
      bookingId, // Include the booking ID here
      projectId,
      projectTitle: project.title,
      projectImage: project.image,
      projectStartDate: project.startDate,
      projectDeadline: project.deadline,
      eventLocation: project.location,
      eventPickupLocation: project.eventPickupLocation,
      userCheckinDate: startDate,
      userCheckoutDate: endDate,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      userPhoneNumber: userData.phoneNumber,
      userImage: currentUser.photoURL,
      userEventSpendingDays: days,
      amount: bookingAmountNumber,
      hotelImage: selectedPackage !== 'Bronze' ? selectedHotel.photo : '', // Handle hotel info only if not Bronze
      hotelName: selectedPackage !== 'Bronze' ? selectedHotel.name : '',
      hotelFee: selectedPackage !== 'Bronze' ? selectedHotel.fee : 0,
      selectedPackage,
      packageAmount,
      timestamp: new Date().toISOString(),
    });

    toast.success(`Thank you for booking $${bookingAmountNumber}!`);
    router.push(`/events/${projectId}/thank-you`);
    setErrorMessage('');
    setAmount(0);
    setLoading(false);
  } catch (error) {
    toast.error('Error making booking:', error);
    console.log("error making booking: ", error);
    setErrorMessage('An error occurred while making your booking. Please try again.');
    setLoading(false);
  }
};


  const handleHotelSelection = (hotelFee, hotelDetails) => {
    const totalHotelFee = days * hotelFee;
    const newAmount = amount + totalHotelFee;
    setAmount(newAmount);
    setShowGoogleMapModal(false);
    setSelectedHotel({ ...hotelDetails, feePerDay: hotelFee, totalFee: totalHotelFee }); // Store hotel details with fee info
    // Add hotel details to booking information here
    // For simplicity, you can store it in a state variable and include it in the booking submission
  };


  if (!project) {
    return (
     <div className='flex justify-center items-center min-h-screen'>
        <div className=" flex">
          <span className="sr-only">Home</span>
          <img src="/image/logo1.png" alt="logo" className="h-8" />
          </div>
     </div>); // Display loading indicator while fetching project details
  }


  return (
    <Layout className={` ${inter.className}`}>
      <div className="lg:flex m-0 md:m-10 lg:m-10 lg:space-x-5 items-center justify-center">
        <div className="md:w-[700px]">
          <div className="lg:flex-1 border-t-8 border-rose-600 bg-white pb-10">
            <div className="carousel">
              <div className={` relative w-full`}>
                <img
                  src={project.image}
                  className="w-full h-[300px] md:w-[700px] lg:w-[700px] md:h-[400px] lg:h-[400px]"
                  alt="project image"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white flex justify-between font-semibold tracking-widest">
                {/**   {project.displayName} */}
                  <span className="flex">
                    <span className="p-1"><MdOutlineLocationOn className="text-lg" /></span>   {project.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="m-5 h-[310px] overflow-y-auto ">
            <div className="flex">
              <p className="text-2xl text-gray-700 font-bold">{project.title}</p>
              {project.isVerified && (
                <span className="text-rose-600 p-3"><MdVerified /></span>
              )}
            </div>
            <p className="my-5 flex justify-between mr-2 font-normal">
              <div className="flex">
                <span className="text-gray-400 p-1"><AiOutlineClockCircle className="" />
                </span>
                <span className="text-gray-400">Starts on {project.startDate}</span>
              </div> -
              <div className="flex">
                <span className="text-rose-600 p-1"><MdOutlineLockClock className="text-lg" /></span>
                <span className="text-rose-600">Ends on {project.deadline && project.deadline}</span>
              </div>
            </p>
            <div className="mt-5 flex text-rose-600 font-semibold">
              <span className="p-1"><BiCategoryAlt /></span> <span>{project.category}</span>
            </div>
            <div className="divider"></div>
            <p className="my-5">{project.description}</p>
            <div className="divider"></div>
            
            
            {/*
            <div>
              <div className="mt-5 flex font-semibold">
                <span className="p-1"><RiContactsBook3Line /></span> <span>Contact Info</span>
              </div>
              <p className="my-1">{project.contactInfo}</p>
            </div>
              */}
            <div className="divider"></div>
            <div>
              <div className="mt-5 flex font-semibold">
                <span className="p-1"><RiShareBoxLine /></span> <span>Social Links</span>
              </div>
              <p className="my-1">{project.socialLinks}</p>
            </div>
            
            <div>
              <div className="mt-5 flex font-semibold">
                <span className="p-1"><MdOutlineAddComment /></span> <span>FAQs</span>
              </div>
              <p className="my-1">{project.faqs}</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%]  lg:inline">
          <div className="bg-gray-200">
            <div className="bg-white p-5 text-sm border-double border rounded-lg">
              <div className="font-bold text-lg text-black">GHS{project.goal} {project.isVerified && (
                <span className="text-rose-600">Negotiable</span>
              )}</div>
              
              <button className="flex items-center text-rose-500 justify-center w-full p-2 font-semibold bg-white border border-rose-500 hover:bg-green-100 hover:border-green-600">
              <span className="p-1"><RiTeamLine /></span> <span>{bookingCount} Tourists</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-200 mt-4">
            <div className="bg-white p-5 text-sm border-double border rounded-lg">
              <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={project.addedByImage} alt="profile" />
                <div className="font-medium dark:text-black mb-2">
                  <div className="text-black">{project.displayName && project.displayName.slice(0, 15)}</div>
                  <div className="text-[8px] flex text-black bg-gray-100 rounded-lg"><AiFillHome className="text-[12px] text-yellow-600 mt-1 mr-1" /> Typically replies within a few hours</div>
                  <div className="text-[8px] flex text-black bg-gray-100 rounded-lg"><AiFillHome className="text-[12px] mt-1 mr-1" /><span className="text-[10px]"> Creator since {userData && userData.createdAt}</span></div> 
                </div>
              </div>
              
              {!userHasBooked ? (<>
                <p className="mb-4 mt-3 text-gray-600">You will be spending <span className="font-semibold">{days} days</span> at {project.location} </p>

            <div className="mb-4 overflow-x-auto w-full">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="package">
                Select a Package:
              </label>
              <div className="flex space-x-4">
               {/* <button
                  className={`py-2 px-4 rounded ${selectedPackage === 'Bronze' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handlePackageSelection('Bronze')}
                >
                  Bronze (GHS 100)
              </button>  */}
              <button 
                  className={`py-2 px-4 rounded ${selectedPackage === 'Silver' ? 'bg-rose-500 text-white font-semibold' : 'bg-gray-100 text-rose-700 font-semibold border border-dashed border-rose-500'}`}
                  onClick={() => handlePackageSelection('Silver')}
                >
                  Silver (GHS 150 + Hotel Fee)
                </button>
                <button
                  className={`py-2 px-4 rounded ${selectedPackage === 'Gold' ? 'bg-rose-500 text-white font-semibold' : 'bg-gray-100 text-rose-700 font-semibold border border-dashed border-rose-500'}`}
                  onClick={() => handlePackageSelection('Gold')}
                >
                  Gold (GHS 170 + Hotel Fee)
                </button>
              </div>
             
              <div className=" p-6 rounded-lg shadow-md">
              <div className="bg-gray-100 flex justify-between border-b pb-2 mb-6 mt-3 text-sm">
                <i className="font-semibold text-gray-700">
                  Event Cost for {days} Days:
                </i>
                <i className="font-bold text-gray-900">GHS{project.goal * days}</i>
              </div>

              <div className="flex justify-between border-b pb-2 mb-6 text-sm">
                <i className="font-semibold text-gray-700">
                  Event Package Cost:
                </i>
                <i className="font-bold text-gray-900">
                  {/* selectedPackage === 'Gold' ? 'GHS170' : */ selectedPackage === 'Silver' ? 'GHS150' : selectedPackage === 'Bronze' ? 'GHS100' : 'GHS0'}
                </i>
              </div>

              {['Silver', 'Gold'].includes(selectedPackage) && (
                <div className="bg-gray-100 flex justify-between border-b pb-2 mb-6 text-sm">
                  <i className="font-semibold text-gray-700">
                    Hotel Fee (GHS{selectedHotel.feePerDay} per {days} Days):
                  </i>
                  <i className="font-bold text-gray-900">GHS{selectedHotel.totalFee}</i>
                </div>
              )}

              <div className="flex justify-between border-b pb-2 mb-6 ">
                <p className="font-bold text-gray-700 text-sm">
                  Total Fee:
                </p>
                <span className="font-bold text-gray-900 text-md text-ellipsis">GHS{amount}</span>
              </div>
            </div>


              

            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
                Amount to Pay (GHS):
              </label>
              <input
                type="text"
                id="amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                disabled
              />
            </div>

            <button
              className={`w-full py-2 px-4 rounded bg-rose-600 text-white font-bold ${!selectedPackage ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePayment}
              disabled={!selectedPackage || loading}
            >
              {loading ? 'Processing...' : 'Book Now'}
            </button>
              {errorMessage && <p className="text-red-600 text-center font-semibold">{errorMessage}</p>}
              </>) : (<>
                <button
              className='w-full py-2 px-4 rounded bg-[#ff0] text-sm text-neutral-900 font-bold opacity-50 cursor-not-allowed'
              disabled
            >
              You Have Already Booked
            </button>
              </>)}
            </div>
          </div>

          {/*
          <div className="bg-gray-200 mt-4">
            <div className="bg-white p-5 text-sm border rounded-lg">
              <div className="flex justify-between mt-3">
                <button className="text-blue-500 hover:bg-blue-600 hover:text-white bg-white px-4 py-2 rounded text-[10px] border border-blue-500">
                  Mark Unavailable
                </button>
                <button className="text-red-500 hover:bg-red-500 hover:text-white bg-white px-4 py-2 rounded text-[10px] border border-red-500">
                  <AiFillHome className="text-[12px] text-red-600" /> Report Abuse
                </button>
              </div>
            </div>
          </div>
          */}
          <div className="bg-gray-200 mt-4">
            <div className="bg-white p-5 text-sm border rounded-lg">
              <button  onClick={() => router.push(`/events`)} className="items-center text-rose-500 justify-center font-semibold w-full p-2 bg-white border border-rose-500 hover:bg-green-100 hover:border-green-600">
                Search Events Like This
              </button>
            </div>
          </div> 
          
        </div> 
       </div>
      {showGoogleMapModal && (
        <GoogleMapModal onClose={() => setShowGoogleMapModal(false)} onHotelSelect={handleHotelSelection} project={project} />
      )}
    </Layout>
  );
}