"use client";
import Link from "next/link";
import { useState } from "react";

export default function List() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-yellow-500 to-purple-500 flex justify-center items-center">
      <div className="flex gap-5">
        <Link href="/list-M">
          <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden relative cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-500/50">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://www.montsame.mn/files/5e68c52a61cd0.jpeg')",
              }}
            ></div>


            <div className="absolute inset-0 bg-black/30 flex justify-center items-start py-10 rounded-3xl">
              <span className="text-white text-6xl font-bold">Merchant</span>
            </div>
          </div>
        </Link>

        <Link href="/list-C">
          <div className="w-[500px] h-[500px] rounded-3xl overflow-hidden relative cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-500/50">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/09/hollow-knight-silksong-rosaries-2.jpg?q=49&fit=crop&w=825&dpr=2')",
              }}
            ></div>

            <div className="absolute inset-0 bg-black/30 flex justify-center items-start py-10 rounded-3xl">
              <span className="text-white text-6xl font-bold">Customer</span>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
