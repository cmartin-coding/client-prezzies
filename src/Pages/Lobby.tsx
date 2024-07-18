import { Container } from "../components/Container";
import { PlayingCard } from "../components/PlayingCard";
import { useAppSelector } from "../hooks";

export function Lobby() {
  const room = useAppSelector((state) => state.room);
  const currPlayer = useAppSelector((state) => state.player);

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
      {currPlayer.hand.map((card) => (
        <PlayingCard card={card} key={card.points + card.suitPoints} />
      ))}
    </Container>
  );
}
