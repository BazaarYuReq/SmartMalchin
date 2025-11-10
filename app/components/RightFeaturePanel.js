"use client";
import { useState } from "react";

export default function RightFeaturePanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        {open ? "Close ▶" : "Open ◀"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out z-40
        ${open ? "translate-x-0" : "translate-x-full"}`}
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
    </>
  );
}
