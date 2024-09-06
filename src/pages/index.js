import React from "react";
import Navbar from "@/components/Home/navbar";
import Hero from "@/components/Home/hero";
import OutImpressiveStats from "@/components/Home/out-impressive-stats";
import CoursesCategories from "@/components/Home/courses-categories";
import ExploreCourses from "@/components/Home/explore-courses";
import TESTIMONIAL from "@/components/Home/testimonial";
import Events from "@/components/Home/events";
import StudentsFeedback from "@/components/Home/students-feedback";
import TrustedCompany from "@/components/Home/trusted-companies";
import Footer from "@/components/Home/footer";

export default function Home() {

  return (
    <main>
      <Navbar/>
      <Hero/>
      <OutImpressiveStats/>
      <CoursesCategories />
      <ExploreCourses/>
      {/** <TESTIMONIAL/> **/}
      <Events/>
      <StudentsFeedback/>
      <TrustedCompany/>
      <Footer/>
    </main>
  );
}