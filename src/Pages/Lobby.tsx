import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { PlayersList } from "../components/PlayersList";
import { ShareableCode } from "../components/ShareableCode";
import { useAppSelector } from "../hooks";

import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { PrezziesButton } from "../components/PrezziesButton";

export function Lobby() {
  const room = useAppSelector((state) => state.room);
  const currPlayer = useAppSelector((state) => state.player);
  const navigate = useNavigate();
  return (
    <Container containerStyle={`flex flex-col  `}>
      <div
        className={`flex  flex-col mt-6 m-0  justify-between items-center  flex-1`}
      >
        <div
          className={`flex flex-col bg-white gap-2 border border-black p-2 rounded-md  w-1/3`}
        >
          <p className={`font-bold text-lg text-center`}>
            Players ({room.players.length})
          </p>

          <PlayersList
            onReadyUp={(bool) => {
              socket.emit("readyUp", {
                player: currPlayer,
                readyUpStatus: bool,
                room: room,
              });
            }}
            room={room}
            currPlayer={currPlayer}
          />
          <div className={`flex flex-row justify-between mx-4`}>
            <ShareableCode
              className={``}
              shareableCode={room.shareableRoomCode}
            />

            <PrezziesButton
              buttonStyle="Tertiary"
              buttonText="Leave Room"
              buttonProps={{
                onClick: () => {
                  socket.emit("leaveGameFromLobby", {
                    player: currPlayer,
                    room: room,
                  });
                  navigate("/");
                },
              }}
            />
          </div>
        </div>
        <div
          className={`flex flex-1 p-4   tablet:justify-end items-center flex-col gap-3 my-6`}
        >
          <p className={`font-bold`}>Your hand</p>
          <div className={``}>
            <PlayerHand hand={currPlayer.hand} />
          </div>
        </div>
      </div>
      {/* <PrezziesButton
        buttonText="tESt"
        buttonStyle="Primary"
        buttonProps={{
          onClick: () => {
            socket.emit("test");
          },
        }}
      /> */}
    </Container>
  );
}
