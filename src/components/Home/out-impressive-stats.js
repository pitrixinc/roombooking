import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  DocumentTextIcon,
  PlayCircleIcon,
  PencilSquareIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/solid";

import StatsCard from "./stats-card";


const STATS = [
  {
    icon: DocumentTextIcon,
    count: "10+",
    title: "Festivals",
  },
  {
    icon: PlayCircleIcon,
    count: "15+",
    title: "Local Events",
  },
  {
    icon: PencilSquareIcon,
    count: "11+",
    title: "Tourist Sites",
  },
  {
    icon: PhoneArrowDownLeftIcon,
    count: "24/7",
    title: "Support",
  },
];

export function OutImpressiveStats() {
  return (
    <section className="px-8 pt-60 mt-[230px] md:mt-[100px] lg:md-[100px]">
      <div className="container mx-auto text-center lg:text-left">
        <div className="grid place-items-center text-center">
          <Typography variant="h2" color="blue-gray" className="mb-2 text-2xl md:text-4xl">
            Explore Our Impressive Stats
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 w-full !text-gray-500 lg:w-5/12"
          >
            We take pride in our commitment to excellence and our dedication to
            your success.
          </Typography>
        </div>
        <div className="grid gap-y-16 gap-x-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default OutImpressiveStats;