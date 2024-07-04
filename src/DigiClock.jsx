import { useState } from "react";
import { useEffect, useRef } from "react";
const padZero = (number) => (number < 10 ? `0${number}` : number);

function DigiClock() {
  const [isRun, setRun] = useState(false);
  const [isElap, setElap] = useState(0);
  const intervalId = useRef(null);
  const timenow = useRef(0);
  useEffect(() => {
    if (isRun) {
      intervalId.current = setInterval(() => {
        setElap(Date.now() - timenow.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isRun]);
  function start() {
    setRun(true);
    timenow.current = Date.now();
  }
  function stop() {
    setRun(false);
  }
  function reset() {
    setElap(0);
    isRun(false);
  }
  function formatTime() {
    let h = Math.floor(isElap / (1000 * 60 * 60));
    let m = Math.floor((isElap / (1000 * 60)) % 60);
    let s = Math.floor((isElap / 1000) % 60);
    let ms = Math.floor((isElap % 1000) / 10);
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}:${padZero(ms)}`;
  }
  return (
    <>
      <div className="mainn">
        <div className="clock">
          <div className="time">
            <p>{formatTime()}</p>
          </div>
          <div className="controls">
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DigiClock;
