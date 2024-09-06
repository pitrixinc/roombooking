import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useRouter } from 'next/router';
import { Typography, Card, CardBody, CardHeader, Button} from "@material-tailwind/react";
import CourseCard from "./course-card";
import Image from 'next/image';

const COURSES = [
  {
    img: "/image/blogs/blog4.svg",
    tag: "Beginner • 25 Classes • 200 Students",
    title: "Unlock the Web Foundation",
    label: "from $99",
    desc: "Dive into HTML to structure your content and CSS to style it. By the end, you'll be crafting beautiful web pages from scratch.",
  },
  {
    img: "/image/blogs/blog3.svg",
    tag: "Medium • 10 Classes • 150 Students",
    title: "Craft Websites That Adapt",
    label: "from $199",
    desc: "Our Responsive Design course teaches you the art of creating websites that seamlessly adapt to different devices and screen sizes.",
  },
  {
    img: "/image/blogs/blog2.svg",
    tag: "Medium • 23 Classes • 590 Students",
    title: "Master the Power of React",
    label: "from $499",
    desc: "Take your frontend development to the next level with our React Development course. Learn how to build interactive, dynamic web applications.",
  },
  {
    img: "/image/blogs/blog5.svg",
    tag: "Beginner • 35 Classes • 400 Students",
    title: "Frontend Essentials Course",
    label: "from $49",
    desc: "For aspiring web developers, the Frontend Essentials course is a must. Dive into the core technologies - HTML, CSS, and JavaScript.",
  },
  {
    img: "/image/blogs/blog6.svg",
    tag: "Medium • 10 Classes • 150 Students",
    title: "Streamline Your CSS Workflow",
    label: "from $99",
    desc: "Our Tailwind CSS Introduction course teaches you how to use this utility-first CSS framework to streamline your workflow, saving you time.",
  },
  {
    img: "/image/blogs/blog4.svg",
    tag: "Medium • 33 Classes • 690 Students",
    title: "Master Backend Development",
    label: "from $299",
    desc: "Dream of becoming a backend developer? Our intensive one-month Node.js course is your fast track to achieving that goal.",
  },
];

export function ExploreCourses({ filters, sortOption }) {
  const router = useRouter()
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter approved projects
      const approvedProjects = projectsList.filter(project => project.status === "Approved");

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
    <section className="px-8">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray">
          Explore Events
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Experience top events: vibrant festivals, unique local fairs, historical tours, and exciting food & wine expos.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
      {currentProjects.map(project => (
          <Card key={project.id} className="border" onClick={() => router.push(`/events/${project.id}?startDate=${project?.startDate}&endDate=${project?.deadline}`)}  >
          <CardHeader className="h-64">
            <Image
              width={768}
              height={768}
              src={project?.image}
              alt={project?.title}
              className="h-full w-full object-cover scale-[1.1]"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-2">
              <Typography
                variant="small"
                color="blue"
                className="mb-2 font-normal text-gray-500"
              >
                {project?.category}
              </Typography>
            </div>
            <a
              href="#"
              className="text-blue-gray-900 transition-colors hover:text-gray-900"
            >
              <Typography variant="h5" className="mb-2 normal-case">
                {project?.title}
              </Typography>
            </a>
            <Typography className="mb-6 font-normal !text-gray-500">
              {project?.description.slice(0,150)}...
            </Typography>
            <Button variant="outlined">{project?.location}</Button>
          </CardBody>
        </Card>
        ))}
      </div>
    </section>
  );
}

export default ExploreCourses;
