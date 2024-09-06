import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Layout from '../../../components/layout';
import Head from 'next/head';

export default function ThankYouPage() {
  const router = useRouter();
  const { projectId } = router.query;
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const bookingsQuery = query(
            collection(db, 'eventbooking'),
            where('projectId', '==', projectId),
            where('userId', '==', user.uid)
          );

          const bookingsSnapshot = await getDocs(bookingsQuery);
          if (!bookingsSnapshot.empty) {
            const bookingData = bookingsSnapshot.docs[0].data();
            setBookingDetails(bookingData);
          }
          setLoading(false);
        } else {
          router.push('/signin');
        }
      });
    };

    if (projectId) {
      fetchBookingDetails();
    }
  }, [projectId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  return (
    <Layout>
       <>
      <Head>
        <title>Order Details</title>
      </Head>
      <div className="min-h-screen bg-gray-100 md:p-6">
        <div className="md:max-w-5xl md:mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className='flex justify-between'>
          <h1 className="text-lg md:text-3xl font-bold mb-4">Your Order Details</h1>
          <button 
            className="mb-4 py-2 px-4 bg-[rgb(240,240,6)] text-sm text-green-700 font-semibold rounded-md hover:text-white hover:bg-blue-600"
            onClick={handlePrint}
          >
            Print Receipt
          </button>
          </div>
          <p className="text-md text-green-700 mb-8">Congratulations! Your booking for the <span className="font-semibold">{bookingDetails.projectTitle}</span> on <span className="font-semibold">{new Date(bookingDetails.timestamp).toLocaleString()} </span> has been successfully confirmed. We are thrilled to have you join us for this exciting event. Please find your order details below. If you have any questions or need further assistance, do not hesitate to contact us. Thank you for choosing us, and we look forward to seeing you soon!</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h2 className="font-semibold text-md md:text-xl mb-4">Order Info</h2>
              <p className="text-gray-700 mb-1"><span className="font-medium">Order Date:</span> {new Date(bookingDetails.timestamp).toLocaleString()}</p>              
              <p className="text-gray-700 mb-1"><span className="font-medium">Status:</span> Positive</p>
              <p className="text-gray-700 mb-1"><span className="font-medium">Payment Status:</span> Paid</p>
              <p className="text-gray-700 mb-1"><span className="font-medium">Payment Method:</span> Online Payement</p>
              <p className="text-gray-700 mb-1"><span className="font-medium">Order ID:</span> {bookingDetails.bookingId}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h2 className="font-semibold text-md md:text-xl mb-4">Customer</h2>
              <p className="text-gray-700 mb-1"><span className="font-medium">Name:</span> {bookingDetails.userName}</p>
              <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> {bookingDetails.userEmail}</p>
              <p className="text-gray-700 mb-1"><span className="font-medium">Phone number:</span> {bookingDetails.userPhoneNumber}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h2 className="font-semibold text-md md:text-xl mb-4">Event Address</h2>
              <p className="text-gray-700 mb-1"><span className="font-medium">Address:</span> {bookingDetails.eventLocation}</p>
              <p className="text-gray-700 mt-2 mb-1"><span className="font-medium">Pickup Point:</span> {bookingDetails.eventPickupLocation}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm mb-4">
              <img src={bookingDetails.projectImage} alt="Smart Watch" className="w-20 h-20 object-cover mr-6 rounded-md" />
              <div>
                <h3 className="font-semibold text-md md:text-xl">{bookingDetails.projectTitle}</h3>
                <p className="text-gray-600">{bookingDetails.selectedPackage} Package</p>
                <p className="font-bold text-sm mt-2">GHS{bookingDetails.packageAmount}</p>
              </div>
            </div>
            {bookingDetails.hotelFee && (
            <div className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm">
              <img src={bookingDetails?.hotelImage && bookingDetails?.hotelImage} alt="hotel" className="w-20 h-20 object-cover mr-6 rounded-md" />
              <div>
               {bookingDetails?.hotelName && ( <h3 className="font-semibold text-md md:text-xl">{bookingDetails.hotelName}</h3> )}
                <p className="text-gray-600">{bookingDetails.eventLocation} - GHS{bookingDetails.userEventSpendingDays * bookingDetails.hotelFee}</p> 
               {bookingDetails?.hotelFee && ( <p className="font-semibold text-sm mt-2">GHS{bookingDetails.hotelFee} per day - You booked for {bookingDetails.userEventSpendingDays} days</p> )}
              </div>
            </div>
            )}
          </div>

          <div className="p-6 border rounded-lg bg-gray-50 shadow-sm">
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span>{bookingDetails.selectedPackage} Package Fee:</span>
              <span>GHS{bookingDetails.packageAmount}.00</span>
            </div>
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span>Hotel Reservation</span>
              <span>GHS{bookingDetails.userEventSpendingDays * bookingDetails.hotelFee}.00</span>
            </div>
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span>Taxes</span>
              <span>GHS0.00</span>
            </div>
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span>Discount</span>
              <span>GHS0.00</span>
            </div>
            <div className="flex justify-between font-bold text-md md:text-xl">
              <span>Total</span>
              <span>GHS{bookingDetails.amount}.00</span>
            </div>
          </div>
        </div>
      </div>




{/*
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Booking!</h1>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
          <p><strong>Event:</strong> {bookingDetails.projectTitle}</p>
          <p><strong>Amount Paid:</strong> GHS {bookingDetails.amount}</p>
          <p><strong>Hotel Name:</strong> {bookingDetails.hotelName}</p>
          <p><strong>Hotel Fee:</strong> GHS {bookingDetails.hotelFee}</p>
          <p><strong>Date:</strong> {new Date(bookingDetails.timestamp).toLocaleString()}</p>
          <button 
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handlePrint}
          >
            Print Receipt
          </button>
        </div>
      </div>
            */}
      </>
    </Layout>
  );
}
