import { PlayerState } from "../slices/player";
import { Room } from "../slices/room";

export function PlayersList(props: {
  room: Room;
  currPlayer: PlayerState;
  onReadyUp: (bool: boolean) => void;
}) {
  const isPlayerReady = props.currPlayer.isReady;
  return (
    <div className={`flex flex-col mx-4 border-b pb-3 gap-2`}>
      {props.room.players.map((p) => {
        const isCurrPlayer = p.id === props.currPlayer.id;
        return (
          <div key={p.id} className={`flex flex-row justify-between`}>
            <p
              key={p.id}
              className={`text-lg ${
                p.id === props.currPlayer.id ? "text-green-400 font-bold" : ""
              }`}
            >
              {p.name}
            </p>
            {!isCurrPlayer && <p>{p.isReady ? "Ready" : "Not Ready"}</p>}
            {isCurrPlayer && (
              <button
                onClick={() => {
                  props.onReadyUp(!isPlayerReady);
                }}
                className={` rounded-md border p-1 transform transition-colors duration-1000 ease-out ${
                  isPlayerReady ? "bg-green-400 " : "bg-white"
                }  `}
              >
                Ready up
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
