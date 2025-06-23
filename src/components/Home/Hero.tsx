import React from "react";

const Hero = () => {
  return (
    <section className="relative z-10 py-24 px-6 sm:px-20">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
        Websites That <br /> Truly Drive Results
      </h1>
      <p className="text-lg mt-6 max-w-xl text-white/80">
        We design and develop websites that turn visitors into customers, help
        achieve business goals, and are accessible to everyone.
      </p>

      <div className="flex flex-wrap gap-6 mt-10">
        <button className="bg-[#4D4D8E]  text-white font-bold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition">
          Become a Partner
        </button>
        <button className=" border-0 bg-[#4D4D8E]  text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:scale-105 transition">
          Start a Sprint
        </button>
      </div>
    </section>
  );
};

export default Hero;
