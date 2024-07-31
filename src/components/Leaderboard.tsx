import { AdjustedPlayer } from "../slices/room";

export function Leaderboard(props: { players: AdjustedPlayer[] }) {
  const players = props.players;

  return (
    <div>
      {players.map((p, place) => (
        <div className={` flex flex-col gap-1`}>
          <div key={p.id} className={`flex flex-row gap-1`}>
            <p>{place + 1}.</p>
            <p>{p.name}</p>
          </div>
          <p>{p.position}</p>
        </div>
      ))}
    </div>
  );
}
