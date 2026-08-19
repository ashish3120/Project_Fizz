import React, { useState, useEffect } from "react";

interface IngredientTab {
  id: string;
  label: string;
  badge: string;
  valueDisplay: string;
  statNumber: number;
  statUnit: string;
  statLabel: string;
  progressPercent: number;
  title: string;
  description: string;
  highlights: string[];
}

const ingredientData: IngredientTab[] = [
  {
    id: "fiber",
    label: "Prebiotic Fiber",
    badge: "Gut Health Engine",
    valueDisplay: "9 Grams Plant Fiber",
    statNumber: 9,
    statUnit: "g",
    statLabel: "32% Daily Fiber Intake",
    progressPercent: 88,
    title: "Organic Plant-Based Fiber",
    description:
      "Sourced from organic cassava root and chicory root inulin. Feeds beneficial gut microbes, promotes healthy digestion, and balances blood sugar response.",
    highlights: ["Feeds Microbiome", "Cassava & Chicory Root", "Zero Fiber Bloat"],
  },
  {
    id: "fruit",
    label: "Natural Fruit Extracts",
    badge: "100% Real Taste",
    valueDisplay: "Real Fruit Juices",
    statNumber: 100,
    statUnit: "%",
    statLabel: "Real Cold-Pressed Flavor",
    progressPercent: 100,
    title: "Cold-Pressed Botanical Flavor",
    description:
      "Made with real Meyer lemon, Black cherry puree, and crisp Lime oils. Never synthetic, never artificial, just vibrant pure fruit taste.",
    highlights: ["Real Fruit Juice", "Essential Oils", "No Artificial Dye"],
  },
  {
    id: "sugar",
    label: "Zero Added Sugar",
    badge: "Guilt-Free Refreshment",
    valueDisplay: "3-5g Natural Sugar",
    statNumber: 0,
    statUnit: "g",
    statLabel: "Added Refined Sugars",
    progressPercent: 12,
    title: "Naturally Low Glycemic",
    description:
      "Sweetened naturally with a touch of fruit juice and organic stevia leaf extract. 35 calories per can vs 140g in traditional sodas.",
    highlights: ["Low Glycemic", "Keto Friendly", "No Sugar Crash"],
  },
];

export default function IngredientCard() {
  const [activeTabId, setActiveTabId] = useState("fiber");
  const [animatedStat, setAnimatedStat] = useState(0);

  const activeTab =
    ingredientData.find((t) => t.id === activeTabId) || ingredientData[0];

  // Micro-counter animation effect on tab change
  useEffect(() => {
    let start = 0;
    const end = activeTab.statNumber;
    const duration = 800; // ms
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));

    if (end === 0) {
      setAnimatedStat(0);
      return;
    }

    const timer = setInterval(() => {
      start += 1;
      setAnimatedStat(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [activeTabId]);

  return (
    <section id="ingredients" className="relative z-10 py-16 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 border border-orange-500/20 mb-3">
            Show, Don't Tell
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-sky-950 uppercase">
            Ingredient Inspection
          </h2>
          <p className="mt-2 text-lg text-sky-900/80 max-w-xl mx-auto font-medium">
            Click to inspect what makes Fizzi good for your gut and delicious for your tastebuds.
          </p>
        </div>

        {/* Interactive Card Shell */}
        <div className="rounded-3xl border border-white/60 bg-white/40 p-6 md:p-10 backdrop-blur-xl shadow-2xl shadow-sky-950/10 transition-all">
          {/* Clickable Tabs Navigation */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8 border-b border-sky-950/10 pb-6">
            {ingredientData.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`rounded-2xl px-5 py-3 text-sm md:text-base font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-sky-950 text-white shadow-lg scale-105"
                      : "bg-white/50 text-sky-950 hover:bg-white/80 hover:scale-102"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Card Content */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Animated Stat & Micro Counter */}
            <div className="md:col-span-5 bg-gradient-to-br from-white/80 to-white/30 rounded-2xl p-6 border border-white/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-orange-600/10 px-2.5 py-1 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                  {activeTab.badge}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-6xl font-black tracking-tight text-sky-950">
                    {animatedStat}
                  </span>
                  <span className="text-3xl font-extrabold text-orange-600">
                    {activeTab.statUnit}
                  </span>
                </div>
                <p className="text-sm font-semibold text-sky-900/70 mt-1">
                  {activeTab.statLabel}
                </p>
              </div>

              {/* Animated Stat Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs font-bold text-sky-950 mb-1">
                  <span>Nutritional Density</span>
                  <span>{activeTab.progressPercent}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-sky-950/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700 ease-out"
                    style={{ width: `${activeTab.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Description & Key Highlights */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-sky-950">
                {activeTab.title}
              </h3>
              <p className="text-base text-sky-900/90 leading-relaxed font-normal">
                {activeTab.description}
              </p>

              {/* Highlights Pill Badges */}
              <div className="pt-3 flex flex-wrap gap-2">
                {activeTab.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-bold text-sky-950 border border-white/90 shadow-xs"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
