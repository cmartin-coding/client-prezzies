import { useEffect, useState } from "react";
import { useCountdownContext } from "../context/CountdownContext";
import { PrezziesHeading } from "./PrezziesHeader";

export function GlobalCountdownOverlay() {
  const countdownCtx = useCountdownContext();

  const [timeLeft, setTimeLeft] = useState(countdownCtx?.countdown?.time || 5);

  useEffect(() => {
    if (countdownCtx?.countdown) {
      if (timeLeft === 0) {
        setTimeLeft(countdownCtx.countdown.time);
      }
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            countdownCtx?.countdown?.onComplete();
            countdownCtx.clearCountdown();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, countdownCtx.countdown]);

  if (!countdownCtx?.countdown) {
    return null;
  }

  return (
    <div
      className={`fixed flex flex-col items-center justify-center inset-0 bg-slate-400/80 backdrop-blur-md z-[100]`}
    >
      <div
        className={`flex flex-col p-4 max-w-2xl items-center justify-center w-full rounded-md bg-white/60 `}
      >
        <PrezziesHeading>{countdownCtx.countdown.title}</PrezziesHeading>
        <p>{timeLeft}</p>
      </div>
    </div>
  );
}
