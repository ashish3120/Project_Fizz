import React, { useEffect, useState } from "react";
import { FizziLogo } from "@/components/FizziLogo";
import SamplePackModal from "@/components/SamplePackModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPulse, setIsPulse] = useState(false);

  const handleOrderClick = () => {
    setIsPulse(true);
    setTimeout(() => setIsPulse(false), 600);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleCustomOpen = () => {
      handleOrderClick();
    };

    window.addEventListener("open-sample-pack", handleCustomOpen);
    return () => window.removeEventListener("open-sample-pack", handleCustomOpen);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl">
        <nav className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md shadow-lg shadow-sky-950/5 transition-all">
          {/* Brand Mark */}
          <a href="/" className="flex items-center gap-2 group">
            <FizziLogo className="h-8 md:h-10 text-sky-900 group-hover:scale-105 transition-transform" />
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold tracking-tight text-sky-950">
            <a
              href="#flavors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("flavors");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Flavors
            </a>
            <a
              href="#ingredients"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("ingredients");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Ingredients
            </a>
            <a
              href="#gut-health"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("gut-health");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Gut Health
            </a>
          </div>

          {/* High-Contrast Primary CTA Button with Ripple Pulse */}
          <button
            onClick={handleOrderClick}
            className={`relative overflow-hidden rounded-full bg-orange-600 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-bold tracking-tight text-white shadow-md shadow-orange-600/30 transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/50 active:scale-95 cursor-pointer ${
              isPulse ? "ring-4 ring-orange-400 ring-offset-2 scale-110" : ""
            }`}
          >
            {isPulse && (
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
            )}
            Order Sample Pack
          </button>
        </nav>
      </header>

      {/* Animated Interactive Sample Pack Modal */}
      <SamplePackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}