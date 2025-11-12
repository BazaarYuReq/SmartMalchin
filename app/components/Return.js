"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 w-22 h-22 flex items-center justify-center rounded-full bg-opacity-99 text-gray-800 text-2xl hover:bg-opacity-80 transition"
      title="Go Back"
    >
      ←
    </button>
  );
}
