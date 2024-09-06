import React from "react";
import FeedbackCard from "./feedback-card";
import { Typography } from "@material-tailwind/react";


const FEEDBACKS = [
  {
    feedback:
      "The festival was incredible—vibrant atmosphere, outstanding performances, and seamless organization. An experience I’ll remember for years to come!",
    client: "Jessica Devis",
    title: "Canadian, Tourist",
    img: "/image/avatar1.jpg",
  },
  {
    feedback:
      "The local event exceeded all expectations. Engaging activities, friendly community, and excellent organization made it a truly enjoyable day.",
    client: "Linde Michel",
    title: "Ghanaian, Tourist",
    img: "/image/avatar3.jpg",
  },
  {
    feedback:
      "A must-visit tourist site! Stunning views, informative guides, and well-maintained facilities made the visit both enriching and memorable.",
    client: "Misha Stam",
    title: "British, Tourist",
    img: "/image/avatar2.jpg",
  },
];

export function StudentsFeedback() {
  return (
    <section className="px-8 py-36">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center w-full">
          <Typography variant="h2" color="blue-gray" className="mb-2">
          What Our Guests Are Saying
          </Typography>
          <Typography
            variant="lead"
            className="mb-10 max-w-3xl lg:text-center !text-gray-500"
          >
           Read glowing testimonials from our guests who share their unforgettable experiences. 
           Discover why they rave about our exceptional service, memorable events, and unique atmosphere.
          </Typography>
        </div>
        <div className="grid gap-x-8 gap-y-12 lg:px-32 grid-cols-1 md:grid-cols-3">
          {FEEDBACKS.map((props, key) => (
            <FeedbackCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


export default StudentsFeedback;
