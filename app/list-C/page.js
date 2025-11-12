"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthToggle() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      router.replace("/category"); 
    }
  }, [mounted, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
      const found = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        setMessage(`Welcome back, ${found.name}!`);
        router.replace("/category");
      } else {
        setMessage("Invalid credentials.");
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setMessage("Please fill all required fields.");
        return;
      }
      const newUsers = [...storedUsers, formData];
      localStorage.setItem("users", JSON.stringify(newUsers));
      setMessage("Account created successfully! You can now log in.");
      setFormData({ name: "", email: "", phone: "", password: "" });
      setIsLogin(true);
    }
  };

  if (!mounted) return null; 

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500 to-purple-500 p-6 text-black">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden transition-all duration-500 ease-in-out">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-black mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-black mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="123-456-7890"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-black mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {message && (
            <p className="text-center text-sm text-purple-600 font-medium mt-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-black">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-purple-600 hover:underline font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </main>
  );
}
