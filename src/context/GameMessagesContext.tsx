import { createContext, ReactNode, useContext, useState } from "react";

export type GameMessagesContextType = {
  showGameMessage: (message: string, position: "top" | "bottom") => void;
  gameMessage: { message: string; position: "top" | "bottom" };
  gameMessageKey: number;
};
export const GameMessagesContext = createContext<GameMessagesContextType>(
  undefined as any
);

export function GameMessagesContextProvider(props: { children: ReactNode }) {
  const [gameMessage, setGameMessage] = useState<{
    message: string;
    position: "top" | "bottom";
  }>({ message: "", position: "top" });
  const [gameMessageKey, setGameMessageKey] = useState(0);

  const showGameMessage = (message: string, position: "top" | "bottom") => {
    setGameMessage({ message, position });
    setGameMessageKey((prev) => prev + 1);
  };
  return (
    <GameMessagesContext.Provider
      value={{
        showGameMessage,
        gameMessage,
        gameMessageKey,
      }}
    >
      {props.children}
    </GameMessagesContext.Provider>
  );
}

export const useGameMessagesContext = () => useContext(GameMessagesContext);
