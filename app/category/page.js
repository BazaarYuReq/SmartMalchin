"use client";
import Link from "next/link";

export default function Category() {
  const x = ["makh", "tsagaan-idee", "amid-mal", "maliin-shir"];

  return (
    <main
      className="bg-gradient-to-br from-yellow-500 to-purple-500 min-h-screen grid grid-cols-2 gap-6 place-items-center p-8"
      style={{}}
    >
      {x.map((name, i) => (
        <Link href={`./${name}`} key={i}>
          <div
            style={{
              backgroundImage:
                "url('https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/09/hollow-knight-silksong-rosaries-2.jpg?q=49&fit=crop&w=825&dpr=2')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-[500px] h-[500px] rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold text-white hover:scale-105 transition-transform duration-300 backdrop-blur-sm bg-opacity-40"
          >
            {name.replace("-", " ").toUpperCase()}
          </div>
        </Link>
      ))}
    </main>
  );
}
