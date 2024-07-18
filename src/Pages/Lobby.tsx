import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { PlayersList } from "../components/PlayersList";
import { ShareableCode } from "../components/ShareableCode";
import { useAppSelector } from "../hooks";

import { socket } from "../socket";

export function Lobby() {
  const room = useAppSelector((state) => state.room);
  const currPlayer = useAppSelector((state) => state.player);
  const sortedHand = [...currPlayer.hand].sort((a, b) => {
    if (a.suitPoints !== b.suitPoints) {
      return a.suitPoints - b.suitPoints;
    } else {
      return a.points - b.points;
    }
  });

  const totalReadyPlayers = room.players.reduce((prev, acc) => {
    if (acc.isReady) {
      return prev + 1;
    } else {
      return 0;
    }
  }, 0);
  console.log(totalReadyPlayers);
  return (
    <Container containerStyle={`flex flex-col  m-8`}>
      <div className={`flex flex-col mt-6 justify-between items-center flex-1`}>
        <div
          className={`flex flex-col bg-white gap-2 border border-black p-2 rounded-md  w-1/3`}
        >
          <p className={`font-bold text-lg text-center`}>
            Players ({room.players.length})
          </p>
          <PlayersList
            onReadyUp={(bool) => {
              console.log(bool);
              socket.emit("readyUp", {
                player: currPlayer,
                readyUpStatus: bool,
                room: room,
              });
              // dispatch(playerActions.readyUp(bool));
            }}
            room={room}
            currPlayer={currPlayer}
          />
          <ShareableCode
            className={``}
            shareableCode={room.shareableRoomCode}
          />
        </div>
        <div className={`flex items-center flex-col gap-3 my-6`}>
          <p className={`font-bold`}>Your hand</p>
          <PlayerHand hand={sortedHand} />
        </div>
      </div>
    </Container>
  );
}
