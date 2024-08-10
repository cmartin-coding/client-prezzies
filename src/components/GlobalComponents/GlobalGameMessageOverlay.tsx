import { useGameMessagesContext } from "../../context/GameMessagesContext";

export function GlobalGameMessageOverlay() {
  const gameMessageCtx = useGameMessagesContext();
  // const positionStyle =
  //   gameMessageCtx.gameMessage.position === "bottom"
  //     ? "-bottom-[3rem] "
  //     : "-top-[3rem]";

  let animation = "";
  // if (
  //   gameMessageCtx.gameMessage.message !== "" &&
  //   gameMessageCtx.gameMessage.position === "bottom"
  // ) {
  //   animation = "animate-move-up ";
  // } else if (
  //   gameMessageCtx.gameMessage.message !== "" &&
  //   gameMessageCtx.gameMessage.position === "top"
  // ) {
  //   animation = "animate-test ";
  // }

  if (gameMessageCtx.gameMessage.message !== "") {
    animation = "animate-scale";
  }

  return (
    <div
      key={gameMessageCtx.gameMessageKey}
      className={`fixed top-1/4 left-1/2 bg-white rounded-lg transform opacity-0 -translate-x-1/2  -translate-y-1/2 ${animation}  px-3  z-[9999]`}
    >
      <p className={`text-center text-2xl text-violet-800`}>
        {gameMessageCtx.gameMessage.message}
      </p>
    </div>
  );
}
