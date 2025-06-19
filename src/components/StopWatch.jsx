
import { useState, useEffect, useRef } from "react"
function StopWatch() {
    const [isRuning, setIsruning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    useEffect(() => {
        if (isRuning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }
        , [isRuning]);

    function stop() {
        setIsruning(false);
    }
    function start() {
        setIsruning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function reset() {
        setIsruning(false);
        setElapsedTime(0);
    }
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let millisecondes = Math.floor((elapsedTime % (1000)) / 10);
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        millisecondes = String(millisecondes).padStart(2, "0");
        return `${hours}: ${minutes}: ${seconds} : ${millisecondes}`;
    }
    return (<div class="stopWatch">
        <div class="display">
            {formatTime()}
        </div>
        <div >
            <button onClick={start} class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">start</button>
            <button onClick={stop} class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">stop</button>
            <button onClick={reset} class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">reset</button>

        </div>
    </div>)
}
export default StopWatch