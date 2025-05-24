"use client";
import React, { act, useEffect, useRef, useState } from "react";

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

 interface TimerDisplayProps {
  active:string,
  setActive: React.Dispatch<React.SetStateAction<string>>
 }

const TimerDisplay: React.FC<TimerDisplayProps> = ({active, setActive}) => {
  const [secondsLeft, setSecondsLeft] = useState(modes.pomodoro);// for updating timerr seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null); // update timerId without re rendering

  //format time
  const formatTime = (sec: any) => {
    let m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");

    let s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${s}`;
  };

  //timer function
  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    //clean up function 
    return () => {
       clearInterval(intervalRef.current);
       intervalRef.current = null
    };
  }, [isRunning]);

  //handle start button
  const startTimer = () => {
    try {
      if (!isRunning) {
        setIsRunning(true);
      }
      console.log("start");
    } catch (error) {
      console.log(error);
    }
  };

  //reset button
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    intervalRef.current = null;
    setSecondsLeft(modes.pomodoro);
    console.log("reset");
  };

  //dynamically update color of the page
  const getChildColor =
  active === "pomodoro"
    ? "bg-[var(--pomodoro-child)] "
    : active === "shortBreak"
    ? "bg-[var(--shortBreak-child)] "
    : active === "longBreak"
    ? "bg-[var(--longBreak-child)] "
    : ""

  return (
    <>
      <div className= {` items-center rounded-lg text-center ${getChildColor}`}>
        <div className="flex justify-between gap-4 text-xl p-4">
          <button className=" px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700 " onClick={()=>{setActive("pomodoro")}}>pomodoro</button>
          <button className=" px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700  " onClick={()=>{setActive("shortBreak")}}>Short break</button>
          <button className=" px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700  " onClick={()=>{setActive("longBreak")}}>Long break</button>
        </div>
        <div className="p-4 mt-4">
          <span className="text-9xl font-mono font-bold  ">{formatTime(secondsLeft)}</span>
        </div>
        <div className="text-4xl flex justify-around gap-4 p-4">
          <button className="px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700" onClick={startTimer}>
            Start
          </button>
          <button className="px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default TimerDisplay;
