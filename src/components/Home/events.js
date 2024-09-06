import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRouter } from 'next/router';
import { Typography, Card, CardBody, CardHeader, Button } from "@material-tailwind/react";
import EventCard from "./event-card";
import Image from 'next/image';

const EVENTS = [
  {
    img: "/image/blogs/blog-1.svg",
    title: "Future of Web Development: Trends and Innovations",
    desc: "Discover the latest trends and innovations shaping the future of web development.",
    buttonLabel: "register for free",
  },
  {
    img: "/image/blogs/blog2.svg",
    title: "WebDev Pro Code-a-Thon: Build a Responsive Website",
    desc: "Participants will have 48 hours to create a responsive website from scratch using HTML, CSS, and JavaScript.",
    buttonLabel: "register for free",
  },
  {
    img: "/image/blogs/blog3.svg",
    title: "Ask the Experts: Frontend Web Development",
    desc: "Join our live Q&A session with our experienced instructors. Get answers to your queries, insights into best practices.",
    buttonLabel: "get ticket",
  },
  {
    img: "/image/blogs/blog4.svg",
    title: "Web Accessibility: Building Inclusive Websites",
    desc: "Industry experts will discuss the importance of inclusive design and share strategies for creating websites.",
    buttonLabel: "get ticket",
  },
];

export function Events({ filters, sortOption }) {
  const router = useRouter()
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      
      // Filter projects based on status and category
      const approvedProjects = projectsList.filter(project => 
        project.status === "Approved" && project.category === "Festival"
      );


      // Randomize the approved projects
      const randomizedProjects = shuffleArray(approvedProjects);

      setProjects(randomizedProjects);
      applyFiltersAndSorting(randomizedProjects);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting(projects);
  }, [filters, sortOption, projects, currentPage]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const applyFiltersAndSorting = (projectsList) => {
    let filtered = projectsList;

    setFilteredProjects(filtered);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  return (
    <section className="py-20 px-8">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Upcoming Events
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
        >
          Explore approved festivals: vibrant celebrations, exciting performances, 
          and unique cultural experiences in one place.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
      {currentProjects.map(project => (
          <Card key={project.id} color="transparent" shadow={false}  onClick={() => router.push(`/events/${project.id}?startDate=${project?.startDate}&endDate=${project?.deadline}`)}>
          <CardHeader floated={false} className="mx-0 mt-0 mb-6 h-48">
            <Image
              width={768}
              height={768}
              src={project?.image}
              alt={project?.title}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="p-0">
            <a
              href="#"
              className="text-blue-gray-900 transition-colors hover:text-gray-800"
            >
              <Typography variant="h5" className="mb-2">
                {project?.title}
              </Typography>
            </a>
            <Typography className="mb-6 font-normal !text-gray-500">
              {project?.description.slice(0,100)}...
            </Typography>
            <Button color="gray" size="sm">
               View Festival
            </Button>
          </CardBody>
        </Card>
        ))}
      </div>
    </section>
  );
}


export default Events;
