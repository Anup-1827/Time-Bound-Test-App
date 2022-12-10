import { useEffect, useState } from "react";
import { QuestionList } from "../Data/data";

export default function Timer({ startTimer, timeOut, setTimeOut }) {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  let interval;
  useEffect(() => {
    if (startTimer) {
      startTimerFunc();
    }
  }, [startTimer]);

  const futureTime =
    new Date().getTime() + QuestionList.length * 60 * 1000 + 2000; //Extra 2 Seconds are added for buffer;
  // new Date().getTime() + 1 * 60 * 1000 + 2000; //Extra 2 Seconds are added for buffer;

  function startTimerFunc() {
    // 10 min --> 10 * 60 * 1000

    interval = setInterval(() => {
      const currentTime = new Date().getTime();

      const differnce = futureTime - currentTime;

      if (differnce < 0) {
        clearInterval(interval);
        setTimeOut(true);
      } else {
        const minutes = Math.floor(differnce / (1000 * 60));
        const seconds = Math.floor((differnce % (1000 * 60)) / 1000);

        const stringMinutes =
          minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
        const stringSeconds =
          seconds.toString().length === 1 ? `0${seconds}` : seconds.toString();

        setMinutes(stringMinutes);
        setSeconds(stringSeconds);
      }
    }, 1000);
  }

  return (
    <div className="timer">
      <h1>Test</h1>
      <h1>{`${minutes}:${seconds}`}</h1>
    </div>
  );
}
