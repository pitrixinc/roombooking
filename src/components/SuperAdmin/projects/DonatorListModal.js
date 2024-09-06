import React, { useState } from 'react';
import { MdOutlineAddComment, MdOutlineLocationOn, MdOutlineLockClock, MdVerified } from "react-icons/md";

const DonatorListModal = ({ isOpen, onClose, donators }) => {
    const [expandedDonator, setExpandedDonator] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    const toggleExpand = (index) => {
        setExpandedDonator(expandedDonator === index ? null : index);
    };

    const filteredDonators = donators.filter(donator => {
        return (
            donator.bookingId.includes(searchQuery) ||
            donator.projectId.includes(searchQuery) ||
            donator.userCheckinDate.includes(searchQuery) ||
            donator.projectTitle.includes(searchQuery) ||
            donator.projectStartDate.includes(searchQuery) ||
            donator.eventLocation.includes(searchQuery) ||
            donator.eventPickupLocation.includes(searchQuery) ||
            donator.userId.includes(searchQuery) ||
            donator.userName.includes(searchQuery) ||
            donator.userEmail.includes(searchQuery) ||
            donator.userPhoneNumber.includes(searchQuery) ||
            donator.hotelName.includes(searchQuery) ||
            donator.selectedPackage.includes(searchQuery) ||
            donator.userCheckoutDate.includes(searchQuery)
        );
    });

    return (
<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
<div className="bg-white p-6 rounded-lg shadow-lg w-[96%] md:w-[66%] h-[450px] md:h-[500px] overflow-y-auto no-scrollbar">
    <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">All Tourists</h2>
        <div onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      className="w-5 h-5" 
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
        </div>
    </div>
    <div className="relative mb-4">
        <input
            type="text"
            placeholder="Search by Booking ID, Project ID, Check-in/out Date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className="w-5 h-5 absolute right-3 top-2 text-gray-500" 
                        >
                        <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                        <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 00-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z" />
                    </svg>
    </div>
    <ul className="space-y-2">
        {filteredDonators.length > 0 ?
            (filteredDonators.map((donator, index) => (
                <li key={index} className="border-b pb-2">
                    <div
                        className={`flex items-center space-x-4 cursor-pointer p-2 rounded-md transition-all duration-300 ${expandedDonator === index ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                        onClick={() => toggleExpand(index)}
                    >
                        <img
                            className="object-cover w-12 h-12 rounded-full"
                            src={donator.userImage}
                            alt={donator.userName}
                        />
                        <div className="flex-1">
                            <h3 className="text-md font-semibold text-gray-800">{donator.userName}</h3>
                            <p className="text-sm text-gray-500">GHS{donator.amount} paid</p>
                            <p className="text-xs text-gray-400">{new Date(donator.timestamp).toLocaleString()}</p>
                        </div>
                        {expandedDonator === index ? (
                             <svg
                             fill="currentColor"
                             viewBox="0 0 16 16"
                             height="1em"
                             width="1em"
                             className="w-5 h-5 text-gray-500" 
                           >
                             <path
                               fillRule="evenodd"
                               d="M8 12a.5.5 0 00.5-.5V5.707l2.146 2.147a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L7.5 5.707V11.5a.5.5 0 00.5.5z"
                             />
                           </svg>
                        ) : (
                            <svg
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                            className="w-5 h-5 text-gray-500" 
                                            >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a.5.5 0 01.5.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5A.5.5 0 018 4z"
                                            />
                                            </svg>
                        )}
                    </div>
                    {expandedDonator === index && (
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   mt-2 ml-16 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Booking ID</p> 
                            <span>{donator.bookingId}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Amount Paid</p> 
                            <span>GHS{donator.amount}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event Location</p> 
                            <span>{donator.eventLocation}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event Pick-up Location</p> 
                            <span>{donator.eventPickupLocation}</span>
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
                            <p className="font-semibold text-gray-800">Hotel Name</p> 
                            <span>{donator.hotelName}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Hotel Fee</p> 
                            <span>GHS{donator.hotelFee}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event ID</p> 
                            <span>{donator.projectId}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event Start Date</p> 
                            <span>{donator.projectStartDate}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event End Date</p> 
                            <span>{donator.projectDeadline}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event Title</p> 
                            <span>{donator.projectTitle}</span>
                         </div>
                         <div className='p-1 border border-l-fuchsia-950'>
                            <p className="font-semibold text-gray-800">Event Creation Date</p> 
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
                            <p className="font-semibold text-gray-800">User Event Spending Days</p> 
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
                            {donator.hotelImage && (
                                <div className="rounded-md">
                            <div className="lg:flex-1 pb-10 ">
                                <div className="carousel">
                                <div className={` relative w-full`}>
                                    <img
                                    src={donator?.hotelImage}
                                    className="w-full h-[300px] md:w-[700px] lg:w-[700px] md:h-[250px] lg:h-[250px] rounded-lg"
                                    alt="project image"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white flex justify-between font-semibold tracking-widest">
                                    {donator?.hotelName}
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                            )}
                        </div>
                        </>
                    )}
                </li>
            ))) : (
            <div className="flex items-center justify-center">
                <h3 className="text-sm font-semibold text-gray-800">No donator yet!</h3>
            </div>
        )}
    </ul>
</div>
</div>
    );
};

export default DonatorListModal;
