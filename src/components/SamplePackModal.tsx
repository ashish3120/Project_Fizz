import React, { useState } from "react";

type SamplePackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FlavorItem = {
  id: string;
  name: string;
  price: number;
  bg: string;
  accent: string;
  icon: string;
};

const FLAVORS: FlavorItem[] = [
  { id: "cherry", name: "Black Cherry", price: 2.99, bg: "bg-rose-950/10 border-rose-900/30", accent: "text-rose-900", icon: "🍒" },
  { id: "lime", name: "Lemon Lime", price: 2.99, bg: "bg-emerald-950/10 border-emerald-900/30", accent: "text-emerald-900", icon: "🍋" },
  { id: "grape", name: "Grape Goodness", price: 2.99, bg: "bg-purple-950/10 border-purple-900/30", accent: "text-purple-900", icon: "🍇" },
  { id: "strawberry", name: "Strawberry Lemonade", price: 2.99, bg: "bg-pink-950/10 border-pink-900/30", accent: "text-pink-900", icon: "🍓" },
  { id: "watermelon", name: "Watermelon Crush", price: 2.99, bg: "bg-lime-950/10 border-lime-900/30", accent: "text-lime-900", icon: "🍉" },
];

export default function SamplePackModal({ isOpen, onClose }: SamplePackModalProps) {
  // State for quantities of each flavor (default: 1 can of each)
  const [quantities, setQuantities] = useState<Record<string, number>>({
    cherry: 1,
    lime: 1,
    grape: 1,
    strawberry: 1,
    watermelon: 1,
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "gpay" | "express">("card");
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetToPreset = () => {
    setQuantities({
      cherry: 1,
      lime: 1,
      grape: 1,
      strawberry: 1,
      watermelon: 1,
    });
  };

  const totalCans = Object.values(quantities).reduce((acc, q) => acc + q, 0);
  const rawSubtotal = FLAVORS.reduce((acc, item) => acc + (quantities[item.id] || 0) * item.price, 0);
  const hasDiscount = totalCans >= 5;
  const finalTotal = hasDiscount ? rawSubtotal * 0.9 : rawSubtotal; // 10% discount for 5+ cans

  const handleOrder = () => {
    if (totalCans === 0) return;
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
      const el = document.getElementById("ingredients");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop overlay with blur fade */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Floating Animated Modal Box */}
      <div className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-b from-white/95 via-amber-50/95 to-slate-50 p-5 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-orange-600 mb-2 shadow-inner">
            🍹 Custom Flavor-Wise Order
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-sky-950">
            Build Your Fizzi Bundle
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Select your preferred flavor quantities below for custom checkout:
          </p>
        </div>

        {/* Quick Presets */}
        <div className="my-3 flex justify-center gap-2">
          <button
            onClick={resetToPreset}
            className="rounded-full bg-sky-950/10 px-3 py-1 text-xs font-bold text-sky-950 transition-colors hover:bg-sky-950 hover:text-white"
          >
            🎁 Standard 5-Flavor Variety Pack
          </button>
        </div>

        {/* Flavor-Wise Quantity Selector List */}
        <div className="my-3 space-y-2 max-h-[240px] overflow-y-auto pr-1">
          {FLAVORS.map((flavor) => {
            const qty = quantities[flavor.id] || 0;
            return (
              <div
                key={flavor.id}
                className={`flex items-center justify-between rounded-2xl border p-2.5 sm:p-3 transition-all ${flavor.bg} ${
                  qty > 0 ? "shadow-sm border-orange-400/40" : "opacity-60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl sm:text-2xl">{flavor.icon}</span>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${flavor.accent}`}>{flavor.name}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">${flavor.price.toFixed(2)} / can</span>
                  </div>
                </div>

                {/* Quantity Control Buttons */}
                <div className="flex items-center gap-2 rounded-full bg-white/80 border border-slate-200 px-2 py-1 shadow-sm">
                  <button
                    onClick={() => updateQuantity(flavor.id, -1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs font-black text-slate-900">{qty}</span>
                  <button
                    onClick={() => updateQuantity(flavor.id, 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Method Selector */}
        <div className="my-3">
          <label className="block text-xs font-bold text-sky-950 mb-1.5">Select Payment Method:</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`rounded-xl border py-2 text-center text-xs font-extrabold transition-all ${
                paymentMethod === "card"
                  ? "border-orange-600 bg-orange-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              💳 Card
            </button>
            <button
              onClick={() => setPaymentMethod("gpay")}
              className={`rounded-xl border py-2 text-center text-xs font-extrabold transition-all ${
                paymentMethod === "gpay"
                  ? "border-orange-600 bg-orange-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              🍎 Apple/GPay
            </button>
            <button
              onClick={() => setPaymentMethod("express")}
              className={`rounded-xl border py-2 text-center text-xs font-extrabold transition-all ${
                paymentMethod === "express"
                  ? "border-orange-600 bg-orange-600 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              ⚡ 1-Click
            </button>
          </div>
        </div>

        {/* Pricing & Checkout Summary */}
        <div className="flex items-center justify-between rounded-2xl bg-sky-950 p-3.5 sm:p-4 text-white shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-sky-200 uppercase font-semibold tracking-wider">
                Total ({totalCans} {totalCans === 1 ? "Can" : "Cans"})
              </span>
              {hasDiscount && (
                <span className="rounded bg-emerald-500/30 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  10% OFF
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-300">${finalTotal.toFixed(2)}</span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">${rawSubtotal.toFixed(2)}</span>
              )}
            </div>
          </div>
          <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-400/30">
            🚚 Free Express Shipping
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleOrder}
          disabled={isOrdered || totalCans === 0}
          className={`mt-4 w-full rounded-2xl py-3.5 text-sm sm:text-base font-black tracking-wide text-white shadow-xl transition-all duration-300 ${
            totalCans === 0
              ? "bg-slate-400 cursor-not-allowed opacity-70"
              : isOrdered
              ? "bg-emerald-600 scale-98"
              : "bg-orange-600 hover:bg-orange-500 hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-95 cursor-pointer"
          }`}
        >
          {totalCans === 0
            ? "Please select at least 1 flavor"
            : isOrdered
            ? "🎉 Payment Confirmed! Processing Order..."
            : `Pay $${finalTotal.toFixed(2)} via ${
                paymentMethod === "card"
                  ? "Card"
                  : paymentMethod === "gpay"
                  ? "Apple/GPay"
                  : "Express Checkout"
              }`}
        </button>
      </div>
    </div>
  );
}
