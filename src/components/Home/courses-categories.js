import React from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { useRouter } from 'next/router';

import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import CategoryCard from "./category-card";


const CATEGORIES = [
  {
    img: "https://media.femalemag.com.sg/public/2016/07/sziget.jpg",
    icon: HeartIcon,
    title: "Deluxe Suite",
    desc: "Spacious and luxurious, ideal for those seeking premium comfort with high-end amenities and beautiful views.",
  },
  {
    img: "https://www.washingtonian.com/wp-content/uploads/2016/11/NPR-ACC.jpg",
    icon: PuzzlePieceIcon,
    title: "Executive Room",
    desc: "Designed for business travelers, offering a comfortable work environment, high-speed internet, and additional conveniences.",
  },
  {
    img: "https://foodandroad.com/wp-content/uploads/2021/04/free-walking-tour-group-meeting-point-2.jpg",
    icon: GlobeEuropeAfricaIcon,
    title: "Family Suite",
    desc: "Accommodates larger groups or families with extra beds, kid-friendly amenities, and ample space for everyone.",
  },
  {
    img: "https://jacksonvillefreepress.com/wp-content/uploads/2024/07/VLFWF_Bar-Fight_Photo-Credit_-Visit-Lauderdale-Food-Wine-Festival_2024-678x381.jpeg",
    icon: MicrophoneIcon,
    title: "Standard Room",
    desc: " A well-appointed and budget-friendly option for travelers seeking comfort and functionality without extra frills.",
  },
];

export function CoursesCategories() {
  const router = useRouter();

  return (
    <section className="container mx-auto px-8 py-36">
      <div className="mb-20 mt-10 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3 text-2xl">
          Room Categories
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
        Discover and secure your perfect stay with ease. Our platform offers a seamless booking experience, 
        detailed property descriptions, real-time availability, and competitive rates to ensure your ideal accommodation choice.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          color="gray"
          className="relative grid h-full w-full place-items-center overflow-hidden text-center"
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <CardBody className="relative w-full">
            <Typography color="white" className="text-xs font-bold opacity-50">
              Browse through all rooms
            </Typography>
            <Typography variant="h4" className="mt-9" color="white">
              Popular Categories
            </Typography>
            <Typography
              color="white"
              className="mt-4 mb-14 font-normal opacity-50"
            >
              Ready to book an room today?
            </Typography>
            <Button size="sm" color="white" className="text-gray-900/75" onClick={() => router.push(`/rooms`)}>
              Book Room Now
            </Button>
          </CardBody>
        </Card>
        <div className="col-span-1 flex flex-col gap-6 cursor-pointer" onClick={() => router.push(`/rooms`)}>
          {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6 cursor-pointer" onClick={() => router.push(`/rooms`)} >
          {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesCategories;