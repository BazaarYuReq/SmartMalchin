import RightFeaturePanel from "./components/RightFeaturePanel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-[100vw] h-[100vh] bg-white">
      <Link href="/list">
        <div className="flex items-center justify-center h-full flex-col">
          <img
            className="w-[500px] h-[500px] rounded-lg broder-none"
            src="Smart Malchin.jpg"
            alt="logo"
          />
        </div>
      </Link>
    </main>
  );
}
