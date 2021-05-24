import { useEffect, useRef } from "react";

let delayCount = 0;

function useRequestChainInterval(callback, interval) {
  const DELAY_MS = 2000;
  const savedCallback = useRef();
  const savedInterval = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let intervalId;
    let timeoutId;

    function tick() {
      savedCallback.current();
    }

    function startInterval() {
      intervalId = setInterval(tick, interval);
    }

    if (interval) {
      timeoutId = setTimeout(startInterval, DELAY_MS * delayCount);

      if (!savedInterval.current) {
        // initialization
        delayCount++;
        savedInterval.current = delayCount;
      }
    }

    return () => {
      delayCount = savedInterval.current;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [interval]);
}

export default useRequestChainInterval;
