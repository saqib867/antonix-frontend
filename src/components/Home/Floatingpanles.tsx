// components/FloatingPanels.jsx
import React from "react";
import { animate } from "motion";

const tiles = [
  { label: "Services", delay: 0.1 },
  { label: "Benefits", delay: 0.2 },
  { label: "Partnership?", delay: 0.3 },
  { label: "Questions?", delay: 0.4 },
];

const FloatingPanels = () => {
  //   React.useEffect(() => {
  //     tiles.forEach((_, i) => {
  //       const tile = document.getElementById(`tile-${i}`);
  //       animate(
  //         tile!,
  //         { opacity: [0, 1], transform: ["translateY(50px)", "translateY(0px)"] },
  //         { delay: tiles[i].delay, duration: 0.6, easing: "ease-out" }
  //       );
  //     });
  //   }, []);

  return (
    <div className="absolute right-10 top-40 z-0 hidden md:block">
      <div className="grid grid-cols-2 gap-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            id={`tile-${index}`}
            className="w-40 h-24 bg-gradient-to-b from-indigo-600/70 to-indigo-900/70 rounded-xl shadow-lg flex items-center justify-center text-white text-sm font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            {tile.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingPanels;
