"use client";
import Image from "next/image";
import TimerDisplay from "./components/TimerDisplay";
import { useState } from "react";

// const modes = {
//   pomodoro: 25 * 60,
//   shortBreak: 5 * 60,
//   longBreak: 15 * 60,
// };

export default function Home() {
  const [active, setActive] = useState("pomodoro");
  // const [mode, setMode] = useState(modes.pomodoro);



  const getHomeColor =
    active === "pomodoro"
      ? "bg-[var(--pomodoro-parent)]"
      : active === "shortBreak"
      ? "bg-[var(--shortBreak-parent)] "
      : active === "longBreak"
      ? "bg-[var(--longBreak-parent)] "
      : ""
  return (
    <main
      className={`flex min-h-screen flex-col font-mono text-white items-center justify-between p-24 ${getHomeColor}`}
    >
      <div>
        <TimerDisplay active={active} setActive={setActive} />
      </div>
    </main>
  );
}
