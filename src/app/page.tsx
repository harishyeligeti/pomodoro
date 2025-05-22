import Image from "next/image";
import TimerDisplay from "./components/TimerDisplay";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col font-mono text-white items-center justify-between p-24 bg-[#38848A]">
      <div>
        <TimerDisplay/>
      </div>
    </main>
  );
}
