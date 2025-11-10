"use client";
import Link from "next/link";
import { useState } from "react";

export default function List() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-yellow-500 flex justify-center items-center">
      {/* --- RIGHT FEATURE PANEL TOGGLE BUTTON --- */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        {open ? "Close ▶" : "Open ◀"}
      </button>

      {/* --- RIGHT FEATURE PANEL --- */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex gap-5">
        <Link href="/list-M">
          <div className="w-[500px] h-[500px] bg-white text-black text-6xl flex justify-center items-center rounded-3xl">
            Merchant
          </div>
        </Link>
        <Link href="/list-C">
          <div className="w-[500px] h-[500px] bg-white text-black text-6xl flex justify-center items-center rounded-3xl">
            Customer
          </div>
        </Link>
      </div>
    </main>
  );
}
