import { createContext, ReactNode, useContext, useState } from "react";

type CountdownContextType = {
  countdown: {
    time: number;
    title: string;
    onComplete: () => void;
  } | null;
  startCountdown: (time: number, title: string, onComplete: () => void) => void;
  clearCountdown: () => void;
};

export const CountdownContext = createContext<CountdownContextType>(
  undefined as any
);

export function CountdownProvider(props: { children: ReactNode }) {
  const [countdown, setCountdown] = useState<null | {
    time: number;
    title: string;
    onComplete: () => void;
  }>(null);

  const startCountdown = (
    time: number,
    title: string,
    onComplete: () => void
  ) => {
    setCountdown({ time, title, onComplete });
  };

  const clearCountdown = () => {
    setCountdown(null);
  };
  return (
    <CountdownContext.Provider
      value={{ clearCountdown, countdown, startCountdown }}
    >
      {props.children}
    </CountdownContext.Provider>
  );
}

export const useCountdownContext = () => useContext(CountdownContext);
