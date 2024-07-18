import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";

import { useAppSelector } from "../hooks";

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
  return (
    <Container>
      <p className={`text-lg text-black text-center`}>
        Shareable Code: {room.shareableRoomCode}
      </p>
      {room.players.map((p) => (
        <p
          key={p.id}
          className={`${p.id === currPlayer.id ? "text-green-400" : ""}`}
        >
          {p.name}
        </p>
      ))}
      <PlayerHand hand={sortedHand} />
    </Container>
  );
}
