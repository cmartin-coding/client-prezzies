import { useGameMessagesContext } from "../../context/GameMessagesContext";

export function GlobalGameMessageOverlay() {
  const gameMessageCtx = useGameMessagesContext();
  const positionStyle =
    gameMessageCtx.gameMessage.position === "bottom"
      ? "-bottom-[3rem] "
      : "-top-[3rem]";

  let animation = "";
  if (
    gameMessageCtx.gameMessage.message !== "" &&
    gameMessageCtx.gameMessage.position === "bottom"
  ) {
    animation = "animate-move-up ";
  } else if (
    gameMessageCtx.gameMessage.message !== "" &&
    gameMessageCtx.gameMessage.position === "top"
  ) {
    animation = "animate-test ";
  }

  return (
    <div
      key={gameMessageCtx.gameMessageKey}
      className={`w-full fixed ${positionStyle}  ${animation} border  bg-white z-[9999]  min-h-12  
      
      `}
    >
      <p className={`text-center text-4xl text-blue-800`}>
        {gameMessageCtx.gameMessage.message}
      </p>
    </div>
  );
}
