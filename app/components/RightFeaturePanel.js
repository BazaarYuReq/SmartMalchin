"use client";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Bell, ShoppingCart, LogOut, Settings } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("settings");
  const [notifications, setNotifications] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef();

  // Load data
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) setUser(JSON.parse(currentUser));
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedNotifs = localStorage.getItem("notifications");
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  function toggleTheme() {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", newDark ? "dark" : "light");
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setUser(null);
    setOpen(false);
    document.location.reload(); // simple reload to redirect or refresh
  }

  const panelGradient = dark
    ? "linear-gradient(to bottom, #1f2937, #111827)"
    : "linear-gradient(to bottom, #60a5fa, #8b5cf6)";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <img
          src={
            user?.image ||
            `https://i.pravatar.cc/40?u=${user?.email || "guest"}`
          }
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-64 shadow-lg rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 z-50 transition-all"
          style={{
            background: panelGradient,
            transition: "background 0.3s ease",
          }}
        >
          {/* Header */}
          {user && (
            <div className="flex items-center p-3 border-b border-gray-300 dark:border-gray-700">
              <img
                src={user.image || `https://i.pravatar.cc/40?u=${user.email}`}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="text-gray-100 font-semibold">{user.name}</div>
                <div className="text-gray-300 text-sm">{user.email}</div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex justify-around p-2 border-b border-gray-300 dark:border-gray-700">
            <button
              onClick={() => setTab("settings")}
              className={`flex items-center gap-1 text-sm ${
                tab === "settings" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button
              onClick={() => setTab("notifications")}
              className={`relative flex items-center gap-1 text-sm ${
                tab === "notifications" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab("cart")}
              className={`flex items-center gap-1 text-sm ${
                tab === "cart" ? "text-blue-400" : "text-gray-300"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-64 overflow-y-auto p-3 space-y-2">
            {tab === "settings" && (
              <div className="space-y-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-100 transition-colors"
                >
                  {dark ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-200" /> Dark Mode
                    </>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            )}

            {tab === "notifications" && (
              <div className="space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-gray-300 text-sm">No notifications</p>
                ) : (
                  notifications.map((n, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-gray-800 text-gray-100 text-sm"
                    >
                      {n.message}
                      <div className="text-xs text-gray-400">{n.time}</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === "cart" && (
              <div className="space-y-2">
                {cart.length === 0 ? (
                  <p className="text-gray-300 text-sm">Your cart is empty</p>
                ) : (
                  cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2 bg-gray-800 rounded text-gray-100"
                    >
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-400">
                          ${item.price.toFixed(2)} × {item.qty}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const updated = cart.filter((_, idx) => idx !== i);
                          setCart(updated);
                          localStorage.setItem("cart", JSON.stringify(updated));
                        }}
                        className="text-red-400 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
