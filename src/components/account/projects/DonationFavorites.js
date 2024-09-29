import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase.config'; // Firebase configuration
import { useRouter } from 'next/router';

const BookedRooms = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        // Query roombooking collection where userId matches the current user id
        const roomsQuery = query(collection(db, 'roombooking'), where('userId', '==', id));
        const roomsSnapshot = await getDocs(roomsQuery);
        const roomsData = roomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setBookedRooms(roomsData);
      } catch (error) {
        console.error('Error fetching booked rooms:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookedRooms();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Booked Rooms</h2>
          <p className="text-gray-600 mt-4">Here are the rooms you&apos;ve booked.</p>
        </div>
      </div>
      
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div>
            <h3 className="text-xl font-bold mb-4">Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bookedRooms.length > 0 ? (
                bookedRooms.map((room) => (
                  <div 
                    key={room.id} 
                    onClick={() => router.push(`/rooms/${room.projectId}/order-details`)} 
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                    <div className="h-38 flex flex-col justify-center items-center bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center rounded-t-xl">
                      <img src={room.projectImage} alt="room image" className='w-full h-38 rounded-md' />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{room.projectTitle.length > 15 ? room.projectTitle.slice(0,15) + '...' : room.projectTitle}</h4>
                    <p className="text-gray-600 mb-2">{room.eventLocation.length > 15 ? room.eventLocation.slice(0,15) + '...' : room.eventLocation}</p>
                    <p className="text-gray-800 font-semibold">Amount: GHS{room.amount}</p>
                    <p className="text-gray-800 font-semibold capitalize">Status: {room.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">You haven&apos;t booked any room yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookedRooms;



{/*
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config'; // Firebase configuration
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const DonationFavorite = () => {
  const router = useRouter();
  const { id } = router.query;
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteDonations = async () => {
      try {
        const donationsQuery = query(collection(db, 'roombooking'), where('userId', '==', id));
        const donationsSnapshot = await getDocs(donationsQuery);
        const donationsData = donationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const projectDonationCounts = donationsData.reduce((acc, donation) => {
          acc[donation.projectId] = (acc[donation.projectId] || 0) + 1;
          return acc;
        }, {});

        const favoriteProjectsIds = Object.keys(projectDonationCounts).filter(
          projectId => projectDonationCounts[projectId] >= 1
        );

        const favoriteProjectsPromises = favoriteProjectsIds.map(async projectId => {
          const projectDocRef = doc(db, 'rooms', projectId);
          const projectDocSnapshot = await getDoc(projectDocRef);
          return { id: projectId, ...projectDocSnapshot.data() };
        });

        const favoriteProjectsData = await Promise.all(favoriteProjectsPromises);
        setFavoriteProjects(favoriteProjectsData);
      } catch (error) {
        console.error('Error fetching favorite donations:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFavoriteDonations();
    }
  }, [id]);

 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Booked Rooms</h2>
          <p className="text-gray-600 mt-4">Here are the rooms you&apos;ve booked.</p>
        </div>
      </div>
      
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div>
            <h3 className="text-xl font-bold mb-4">Rooms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteProjects.length > 0 ? (
                favoriteProjects.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => router.push(`/rooms/${project.id}/order-details`)} 
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                    <div class="h-38 flex flex-col justify-center items-center bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center rounded-t-xl">
                        <img src={project.image} alt="room image" className='w-full h-38 rounded-md' />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{project.projectTitle}</h4>
                    <p className="text-gray-600 mb-2">{project.eventLocation}</p>
                    <p className="text-gray-800 font-semibold">Goal: GHS{project.goal}</p>
                    <p className="text-gray-800 font-semibold">Status: {project.status}</p>
                    <p className="text-gray-600">{project.deadline} left</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">You haven&apos;t booked any room yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default  DonationFavorite;
*/}