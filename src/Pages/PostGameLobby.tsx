import { Container } from "../components/Container";
import { Leaderboard } from "../components/Leaderboard";
import { useAppSelector } from "../hooks";

export function PostGameLobby() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  return (
    <Container>
      {/* <p> {JSON.stringify(player, null, 2)}</p> */}
      {/* <p> {JSON.stringify(room.handsToChoose, null, 2)}</p> */}
      <Leaderboard players={room.players} />
    </Container>
  );
}
