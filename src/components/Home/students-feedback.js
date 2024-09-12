import React from "react";
import FeedbackCard from "./feedback-card";
import { Typography } from "@material-tailwind/react";


const FEEDBACKS = [
  {
    feedback:
      "Exceptional service and comfort! The room was spotless, and the booking process was seamless. Highly recommend for a stress-free stay.",
    client: "John Fosu",
    title: "Ghanaian, Tenant",
    img: "/image/avatar1.jpg",
  },
  {
    feedback:
      "A fantastic experience from start to finish. The room was exactly as described, and the staff made everything easy and enjoyable.",
    client: "Brignt Ansah",
    title: "Ghanaian, Tenant",
    img: "/image/avatar3.jpg",
  },
  {
    feedback:
      "Great value for money with excellent amenities. The room was cozy and well-maintained, and the customer support was outstanding.",
    client: "Frank Twum",
    title: "Ghanaian, Tenant",
    img: "/image/avatar2.jpg",
  },
];

export function StudentsFeedback() {
  return (
    <section className="px-8 py-36">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center w-full">
          <Typography variant="h2" color="blue-gray" className="mb-2">
          What Our Tenants Are Saying
          </Typography>
          <Typography
            variant="lead"
            className="mb-10 max-w-3xl lg:text-center !text-gray-500"
          >
           See what our Tenants are saying about their stays. 
           Their reviews reflect our commitment to comfort and exceptional service, helping you make an informed choice for your next booking.
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
