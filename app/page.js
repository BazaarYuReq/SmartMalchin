import RightFeaturePanel from "./components/RightFeaturePanel";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-yellow-500 w-[100vw] h-[100vh]">
      <main className="w-[100vw] h-[100vh] bg-gradient-to-br from-yellow-500 to-purple-500">
        <div className="flex items-center justify-center h-full flex-col">
          <img
            className="w-[600px] h-[500px] border-2 rounded-lg broder-white"
            src="https://content.ikon.mn/news/2023/4/26/3we68k_Grizzlybear55_x974.jpg"
            alt="logo"
          />
          <Link
            href="/list"
            className="text-7xl bg-purple-500 hover:underline rounded-lg px-[20px] py-[20px]"
          >
            SMART
          </Link>
        </div>
      </main>
    </div>
  );
}
