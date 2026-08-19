import React, { useEffect, useState } from "react";

export default function AmbientOrbs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 2;
          const y = (e.clientY / innerHeight - 0.5) * 2;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top Left Glowing Orb */}
      <div
        className="absolute -left-20 -top-20 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-lime-300/30 blur-2xl transition-transform duration-700 ease-out"
        style={{
          willChange: "transform",
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 0)`,
        }}
      />

      {/* Center Right Glowing Orb */}
      <div
        className="absolute right-[-10%] top-[35%] h-[550px] w-[550px] rounded-full bg-gradient-to-br from-emerald-400/25 via-teal-300/20 to-yellow-300/30 blur-2xl transition-transform duration-1000 ease-out"
        style={{
          willChange: "transform",
          transform: `translate3d(${mousePos.x * -45}px, ${mousePos.y * -45}px, 0)`,
        }}
      />

      {/* Bottom Left Glowing Orb */}
      <div
        className="absolute -bottom-32 left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-t from-orange-500/20 via-pink-400/20 to-yellow-400/25 blur-2xl transition-transform duration-800 ease-out"
        style={{
          willChange: "transform",
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
        }}
      />
    </div>
  );
}

