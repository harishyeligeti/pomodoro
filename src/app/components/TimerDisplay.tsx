"use client";
import React, {  useEffect, useRef, useState } from "react";
import { FormatTime } from "./formatTime";

// const modes = {
//   pomodoro: 25 * 60,
//   shortBreak: 5 * 60,
//   longBreak: 15 * 60,
// };
const modes = {
  pomodoro: 2,
  shortBreak: 2,
  longBreak: 2,
};

interface TimerDisplayProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ active, setActive }) => {
  const [secondsLeft, setSecondsLeft] = useState(modes.pomodoro); // for updating timerr seconds
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0); // handle the cycles of pomodoro
  const [shouldSwitch, setShouldSwitch] = useState(false);
  const intervalRef = useRef<any>(null); // update timerId without re rendering

  //timer function
  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setShouldSwitch(true);
            // return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    //clean up function
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  //another useEffect to handle the cycle count and switching to breaks
  useEffect(() => {
    if (shouldSwitch) {
      if (active === "pomodoro") {
        setCycleCount((prev) => prev + 1);
        const isLongBreak = (cycleCount + 1) % 4 === 0;

        setActive(isLongBreak ? "longBreak" : "shortBreak");
        setSecondsLeft(isLongBreak ? modes.longBreak : modes.shortBreak);
        setIsRunning(false);
      }
      else if(active == "longBreak"){
        setIsRunning(false)
      }
       else {
        setActive("pomodoro");
        setSecondsLeft(modes.pomodoro);
        setIsRunning(false);
        // console.log("stop here")
      }
      setShouldSwitch(false);
    }
  }, [shouldSwitch]);

  //start timer when switched to break
  useEffect(() => {
    if (cycleCount && !isRunning ) {
      if (
        (active === "pomodoro" ) ||
        (active === "shortBreak" ) ||
        (active === "longBreak")
      ) {
        startTimer();
      }
    }
  }, [active]);

  // useEffect(() => {
  //   if (cycleCount && !isRunning && shouldSwitch === false) {
  //     if (
  //       (active === "pomodoro" && secondsLeft === modes.pomodoro) ||
  //       (active === "shortBreak" && secondsLeft === modes.shortBreak) ||
  //       (active === "longBreak" && secondsLeft === modes.longBreak)
  //     ) {
  //       startTimer();
  //     }
  //   }
  // }, [active, secondsLeft]);

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
    setSecondsLeft(
      active === "pomodoro"
        ? modes.pomodoro
        : active === "shortBreak"
        ? modes.shortBreak
        : active === "longBreak"
        ? modes.longBreak
        : modes.pomodoro
    );
    setCycleCount(0);
    console.log("reset");
  };

  //dynamically update color of the timer container
  const getChildColor =
    active === "pomodoro"
      ? "bg-[var(--pomodoro-child)]  "
      : active === "shortBreak"
      ? "bg-[var(--shortBreak-child)] "
      : active === "longBreak"
      ? "bg-[var(--longBreak-child)] "
      : "";

  return (
    <>
      <div className={` items-center rounded-lg text-center ${getChildColor}`}>
        <div className="flex justify-between gap-4 text-xl p-4">
          <button
            className={` px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700 ${
              active === "pomodoro" ? "bg-[var(--buttonActive)]" : ""
            }`}
            onClick={() => {
              setActive("pomodoro");
              setSecondsLeft(modes.pomodoro);
            }}
          >
            Pomodoro
          </button>
          <button
            className={` px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700 ${
              active === "shortBreak" ? "bg-[var(--buttonActive)]" : ""
            } `}
            onClick={() => {
              setActive("shortBreak");
              setSecondsLeft(modes.shortBreak);
            }}
          >
            Short break
          </button>
          <button
            className={` px-4 py-2 hover:bg-[#437C80] rounded-lg duration-700 ${
              active === "longBreak" ? "bg-[var(--buttonActive)]" : ""
            } `}
            onClick={() => {
              setActive("longBreak");
              setSecondsLeft(modes.longBreak);
            }}
          >
            Long break
          </button>
        </div>
        <div className="p-4 mt-4">
          <span className="text-9xl font-mono font-bold  ">
            <FormatTime secondsLeft={secondsLeft} />
          </span>
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
