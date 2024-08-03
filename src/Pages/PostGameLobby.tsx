import { Container } from "../components/Container";
import { Leaderboard } from "../components/Leaderboard";
import { PlayingCard } from "../components/PlayingCard";
import { PrezziesButton } from "../components/PrezziesButton";

import { useAppSelector } from "../hooks";
import { Card } from "../types";

export function PostGameLobby() {
  const room = useAppSelector((state) => state.room);
  // const player = useAppSelector((state) => state.player);

  // const numberOfPlayersWeAreWaitingOnToJoinPostGameLobby = room.players.reduce(
  //   (prev, acc) => {
  //     if (!acc.isInPostGameLobby) {
  //       return prev + 1;
  //     } else {
  //       return prev;
  //     }
  //   },
  //   0
  // );

  return (
    <Container
      containerStyle={`p-10 flex flex-col justify-center items-center`}
    >
      {/* {numberOfPlayersWeAreWaitingOnToJoinPostGameLobby > 0 && (
        <p>
          Waiting for {numberOfPlayersWeAreWaitingOnToJoinPostGameLobby} more
          player(s) to enter post-game lobby
        </p>
      )} */}
      <div
        className={`flex max-w-5xl w-full bg-white/40 rounded-md p-2 backdrop-blur-lg justify-center items-center flex-col gap-10`}
      >
        <div className={`w-fit`}>
          <Leaderboard
            headerPosition="center"
            header="Standings"
            row
            players={room.players}
          />
        </div>
        <div className={` grid grid-cols-2 gap-6`}>
          {room.handsToChoose.map((hand) => {
            return (
              <div className={`flex flex-col items-center gap-1`}>
                <div className={`flex flex-row-reverse`}>
                  {hand.map((c) => {
                    if (c.card) {
                      return (
                        <PlayingCard
                          className={`tablet:w-32 w-20 cursor-default`}
                          card={c as Card}
                        />
                      );
                    } else {
                      return (
                        <div
                          className={`w-20 -mr-[4.9rem]  h-30 border border-black bg-blue-400`}
                        />
                      );
                    }
                  })}
                </div>
                <PrezziesButton
                  buttonText="Select hand"
                  buttonStyle="Primary"
                  customBtnStyle="w-fit h-min"
                />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
