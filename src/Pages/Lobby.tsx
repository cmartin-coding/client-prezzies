import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { PlayersList } from "../components/PlayersList";
import { ShareableCode } from "../components/ShareableCode";
import { useAppSelector } from "../hooks";

import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { getSortedHandByPoints } from "../helpers";

export function Lobby() {
  const room = useAppSelector((state) => state.room);
  const currPlayer = useAppSelector((state) => state.player);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  const totalReadyPlayers = room.players.reduce((prev, acc) => {
    if (acc.isReady) {
      return prev + 1;
    } else {
      return 0;
    }
  }, 0);

  // const allPlayersReady = totalReadyPlayers === room.numberOfPlayers;
  const allPlayersReady = totalReadyPlayers === room.players.length;

  useEffect(() => {
    // Once all players ready start a timer that counts down and starts the game sending each player to gameboard
    if (allPlayersReady) {
      setShowCountdown(true);
      if (seconds > 0) {
        const interval = setInterval(
          () => setSeconds((prev) => prev - 1),
          1000
        );
        return () => clearInterval(interval);
      } else {
        navigate(`/card-table/${room.id}`);
        setShowCountdown(false);
      }
    } else {
      setSeconds(5);
    }
  }, [allPlayersReady, seconds]);

  return (
    <Container containerStyle={`flex flex-col  `}>
      <div
        className={`flex border flex-col mt-6 m-0  justify-between items-center  flex-1`}
      >
        <div
          className={`flex flex-col bg-white gap-2 border border-black p-2 rounded-md  w-1/3`}
        >
          <p className={`font-bold text-lg text-center`}>
            Players ({room.players.length})
          </p>
          {showCountdown && (
            <div
              className={`absolute flex flex-row justify-center items-center top-0  z-20 left-0 right-0 bottom-0 `}
            >
              <p className={`text-white z-20`}>
                Game starting in {seconds} seconds
              </p>
              <div
                className={`bg-black/70 absolute top-0 z-10 left-0 right-0 bottom-0`}
              />
            </div>
          )}

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
          <ShareableCode
            className={``}
            shareableCode={room.shareableRoomCode}
          />
        </div>
        <div
          className={`flex flex-1 p-4   justify-end items-center flex-col gap-3 my-6`}
        >
          <p className={`font-bold`}>Your hand</p>
          <div className={``}>
            <PlayerHand hand={currPlayer.hand} />
          </div>
        </div>
      </div>
    </Container>
  );
}
