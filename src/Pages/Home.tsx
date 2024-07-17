import { motion } from "framer-motion";
import { useState } from "react";
import { RulesModal } from "../components/RulesModal";
import { socket } from "../socket";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export function Home() {
  const [isCreatingGame, setIsCreatingGame] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [detail, setDetail] = useState<{
    roomName: string;
    userName: string;
    numberOfPlayers: number;
  }>({ numberOfPlayers: 2, roomName: "", userName: "" });

  const createRoom = () => {
    socket.emit("createRoom", detail);
  };
  const joinRoom = () => {
    socket.emit("joinRoom", {
      userName: detail.userName,
      roomName: detail.roomName,
    });
  };
  return (
    <div className="bg-gradient-to-br from-red-300 via-white to-blue-300 flex flex-col items-center h-screen">
      <div className="flex flex-row gap-10 mt-16 ">
        <div className="flex flex-col bg-slate-200 border-black p-5 rounded-lg shadow-2xl border-2 flex-1 items-center">
          <header className=" ">
            <h1 className="text-3xl">President's Card Game</h1>
            <p className="text-center">
              Fill out the information below to play!
            </p>
          </header>

          <div className=" gap-4 flex flex-row  transition-colors  my-3 relative  ">
            <button
              onClick={() => {
                setIsCreatingGame(true);
              }}
              className={`${TOGGLE_CLASSES} relative `}
            >
              Create Game
            </button>
            <button
              onClick={() => {
                setIsCreatingGame(false);
              }}
              className={`${TOGGLE_CLASSES}  relative `}
            >
              Join Game
            </button>
            <div
              className={`absolute inset-0 z-0   flex ${
                isCreatingGame ? "justify-start" : "justify-end"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", damping: 15, stiffness: 250 }}
                className={`h-full border  ${
                  isCreatingGame ? "w-1/2" : "w-[100px]"
                } rounded-full bg-blue-300 `}
              />
            </div>
          </div>
          <form className="w-full">
            <div>
              <p>Username</p>
              <input
                className="border p-1 w-full rounded-md"
                value={detail.userName}
                placeholder="Enter a username"
                onChange={(ev) => {
                  setDetail((prev) => ({
                    ...prev,
                    userName: ev.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <p>Room</p>
              <input
                placeholder="Enter a room"
                className="border w-full p-1 rounded-md"
                value={detail.roomName}
                onChange={(ev) => {
                  setDetail((prev) => ({ ...prev, roomName: ev.target.value }));
                }}
              />
            </div>
            {isCreatingGame && (
              <div>
                <p>Number of Players</p>
                <input
                  type="number"
                  min={4}
                  max={8}
                  placeholder="Enter number of players"
                  className="border w-full p-1 rounded-md"
                  value={detail.numberOfPlayers}
                  onChange={(ev) => {
                    setDetail((prev) => ({
                      ...prev,
                      numberOfPlayers: +ev.target.value,
                    }));
                  }}
                />
              </div>
            )}
          </form>
          <section className=" p-5 flex flex-col gap-4">
            {isCreatingGame ? (
              <button
                className="border  border-black   p-1 rounded-lg"
                onClick={createRoom}
              >
                Create game!
              </button>
            ) : (
              <button
                className="border p-1 border-black  rounded-lg"
                onClick={joinRoom}
              >
                Join game!
              </button>
            )}
            <button
              className="hover:underline"
              onClick={() => {
                setIsRulesOpen(true);
              }}
            >
              Read the rules
            </button>
            <RulesModal isOpen={isRulesOpen} setIsOpen={setIsRulesOpen} />
          </section>
        </div>
      </div>
    </div>
  );
}
