"use client";
import Link from "next/link";
import { useState } from "react"; // ✅ You must import useState

export default function AccountCustomer() {
  const [open, setOpen] = useState(false); // ✅ Define open state for toggle

  return (
    <main className="bg-gradient-to-br from-yellow-500 to-purple-500">
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

      {/* --- LOGIN FORM --- */}
      <div className="p-6 text-center bg-yellow-500 h-screen w-screen flex justify-center flex-col items-center">
        <h1 className="font-bold text-5xl mb-6">LOGIN</h1>

        <div className="flex flex-col w-64 space-y-4">
          <div>
            <p className="text-left">Email</p>
            <input
              type="text"
              placeholder="email"
              className="bg-white border-2 rounded w-full px-2 py-1"
            />
          </div>

          <div>
            <p className="text-left">Username</p>
            <input
              type="text"
              placeholder="username"
              className="bg-white border-2 rounded w-full px-2 py-1"
            />
          </div>

          <Link href="./market">
            <button className="bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
