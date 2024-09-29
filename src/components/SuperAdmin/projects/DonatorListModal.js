import React, { useState, useEffect } from 'react';
import { MdOutlineAddComment, MdOutlineLocationOn, MdOutlineLockClock, MdVerified } from "react-icons/md";
import { db } from '../../../firebase.config'; // Ensure Firebase is correctly imported and configured
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const DonatorListModal = ({ isOpen, onClose, donators }) => {
  const [expandedDonator, setExpandedDonator] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  if (!isOpen) return null;

  const toggleExpand = (index) => {
    setExpandedDonator(expandedDonator === index ? null : index);
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const bookingRef = doc(db, 'roombooking', bookingId);
      await updateDoc(bookingRef, { status });
      toast.success(`Room booking ${status === 'Approved' ? 'approved' : 'rejected'} successfully!`);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  // Filter room bookings based on active tab
  const filteredDonators = donators.filter((donator) => {
    if (activeTab === 'All') return true;
    return donator.status === activeTab;
  }).filter(donator => {
    // Apply search filter
    return (
        donator.bookingId.includes(searchQuery) ||
        donator.projectId.includes(searchQuery) ||
        donator.userCheckinDate.includes(searchQuery) ||
        donator.projectTitle.includes(searchQuery) ||
        donator.projectStartDate.includes(searchQuery) ||
        donator.eventLocation.includes(searchQuery) ||
        donator.userId.includes(searchQuery) ||
        donator.userName.includes(searchQuery) ||
        donator.userEmail.includes(searchQuery) ||
        donator.userPhoneNumber.includes(searchQuery) ||
        donator.selectedPackage.includes(searchQuery) ||
        donator.userCheckoutDate.includes(searchQuery)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[96%] md:w-[66%] h-[500px] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Room Bookings</h2>
          <div onClick={onClose} className="text-gray-600 hover:text-gray-900 cursor-pointer">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-5 h-5"
            >
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M368 368L144 144M368 144L144 368" />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <ul className="flex border-b">
            {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer px-4 py-2 border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-blue-500'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by Booking ID, User Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room Booking List */}
        <ul className="space-y-2">
          {filteredDonators.length > 0 ? (
            filteredDonators.map((donator, index) => (
              <li key={index} className="border-b pb-2">
                <div
                  className={`flex items-center space-x-4 cursor-pointer p-2 rounded-md transition-all duration-300 ${expandedDonator === index ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  onClick={() => toggleExpand(index)}
                >
                  <img className="object-cover w-12 h-12 rounded-full" src={donator.userImage} alt={donator.userName} />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-800">{donator.userName}</h3>
                    <p className="text-sm text-gray-500">{donator.bookingId}</p>
                    <p className="text-xs text-gray-400">{donator.status}</p>
                  </div>
                  {expandedDonator === index ? (
                    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" className="w-5 h-5 text-gray-500">
                      <path fillRule="evenodd" d="M8 12a.5.5 0 00.5-.5V5.707l2.146 2.147a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L7.5 5.707V11.5a.5.5 0 00.5.5z" />
                    </svg>
                  ) : (
                    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" className="w-5 h-5 text-gray-500">
                      <path fillRule="evenodd" d="M8 4a.5.5 0 01.5.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5A.5.5 0 018 4z" />
                    </svg>
                  )}
                </div>
                {expandedDonator === index && (
                  <div className="ml-16 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   mt-2  p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                    <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Booking ID</p> 
                            <span>{donator.bookingId}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Amount Paid</p> 
                            <span>GHS{donator.amount}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room Location</p> 
                            <span>{donator.eventLocation}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Selected Package</p> 
                            <span>{donator.selectedPackage}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Package Cost</p> 
                            <span>GHS{donator.packageAmount}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room ID</p> 
                            <span>{donator.projectId}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room Start Date</p> 
                            <span>{donator.projectStartDate}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room End Date</p> 
                            <span>{donator.projectDeadline}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room Title</p> 
                            <span>{donator.projectTitle}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Room Booking Date</p> 
                            <span>{new Date(donator.timestamp).toLocaleString()}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Check-in Date</p> 
                            <span>{donator.userCheckinDate}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Check-out Date</p> 
                            <span>{donator.userCheckoutDate}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Email</p> 
                            <span>{donator.userEmail}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Room Spending Days</p> 
                            <span>{donator.userEventSpendingDays} Days</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User ID</p> 
                            <span>{donator.userId}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Name</p> 
                            <span>{donator.userName}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">User Phone Number</p> 
                            <span>{donator.userPhoneNumber}</span>
                         </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4   mt-2 ml-16 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                        <div className="rounded-md">
                            <div className="lg:flex-1 pb-10 ">
                                <div className="carousel">
                                <div className={` relative w-full`}>
                                    <img
                                    src={donator.projectImage}
                                    className="w-full h-[300px] md:w-[700px] lg:w-[700px] md:h-[250px] lg:h-[250px] rounded-lg"
                                    alt="project image"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white flex justify-between font-semibold tracking-widest">
                                    {donator.projectTitle}
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>

                    {/* Approve / Reject Buttons */}
                  {/*  {donator.status === 'Pending' && ( */}
                      <div className="flex space-x-4 mt-4">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md"
                          onClick={() => handleStatusUpdate(donator.bookingId, 'Approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleStatusUpdate(donator.bookingId, 'Rejected')}
                        >
                          Reject
                        </button>
                      </div>
                   {/* )} */}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No room bookings found for this status.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DonatorListModal;
