import Hero from "@/components/Home/Hero";
import ProjectShowcase from "@/components/Home/Sliders";
import WhoWeAre from "@/components/Home/Whoweare";
import React from "react";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#31317D] text-white overflow-hidden">
      {/* <div className=" w-screen h-screen  overflow-hidden absolute mt-7 border-0 bg-none">
        <div className=" w-[800px] h-[800px]  rounded-full bg-[rgb(240,240,240)] transform -translate-y-1/2 blur-3xl opacity-15  animate-moveAround "></div>
      </div> */}
      {/* Background vertical stripes */}
      <div className="absolute inset-0 flex z-0"></div>

      {/* Content */}
      <Hero />
      <ProjectShowcase />
      <WhoWeAre />
      {/* <FloatingPanels /> */}
    </div>
  );
};

export default Home;
