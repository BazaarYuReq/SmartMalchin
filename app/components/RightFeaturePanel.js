"use client";
import { useState, useEffect } from "react";

export default function RightFeaturePanel() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <div>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white text-xl font-bold transition-all duration-300 hover:bg-purple-700"
          title="Open Settings"
        >
          ⚙️
        </button>
      )}


      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out z-40
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 text-black relative h-full flex flex-col">

          {open && (
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-bold shadow hover:bg-red-600 transition"
              title="Close Settings"
            >
              ×
            </button>
          )}


          {user ? (
            <div className="flex flex-col items-center mb-6 mt-12">
              <img
                src={user.image || "https://i.pravatar.cc/100"}
                alt="Profile"
                className="w-35 h-35 rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-6 mt-12">
              No user logged in
            </p>
          )}


          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <ul className="space-y-3 text-gray-700 flex-1">
            <li className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Profile
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Account
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Notifications
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Privacy
            </li>
            <li className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer text-red-600">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
