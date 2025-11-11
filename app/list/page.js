"use client";
import Link from "next/link";
import { useState } from "react";

export default function List() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-yellow-500 to-purple-500 flex justify-center items-center">
      {/* --- RIGHT FEATURE PANEL TOGGLE BUTTON --- */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-purple-700 transition"
      >
        {open ? "Close ▶" : "Open ◀"}
      </button>

      {/* --- RIGHT FEATURE PANEL --- */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 text-black">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <Link href="./">Return</Link>
            </li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex gap-5">
        <Link href="/list-M">
          <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden relative cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-500/50">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://www.montsame.mn/files/5e68c52a61cd0.jpeg')",
              }}
            ></div>

            {/* Overlay for text */}
            <div className="absolute inset-0 bg-black/30 flex justify-center items-start py-10 rounded-3xl">
              <span className="text-white text-6xl font-bold">Merchant</span>
            </div>
          </div>
        </Link>

        <Link href="/list-C">
          <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden relative cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-500/50">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/09/hollow-knight-silksong-rosaries-2.jpg?q=49&fit=crop&w=825&dpr=2')",
              }}
            ></div>

            {/* Overlay for text */}
            <div className="absolute inset-0 bg-black/30 flex justify-center items-start py-10 rounded-3xl">
              <span className="text-white text-6xl font-bold">Customer</span>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
