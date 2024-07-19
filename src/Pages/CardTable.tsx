import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { useAppSelector } from "../hooks";

import { PlayingCard } from "../components/PlayingCard";

export function CardTable() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  const opponents = room.players.filter((p) => p.id !== player.id);
  return (
    <Container containerStyle="flex flex-col">
      <div className={`flex-1 p-4 flex  flex-col`}>
        <div className={`grid grid-flow-col basis-1/5`}>
          {opponents.map((opponent) => {
            return (
              <div
                key={opponent.id}
                className={`flex flex-col border p-2 rounded-lg`}
              >
                <p>{opponent.name}</p>
              </div>
            );
          })}
        </div>
        {/* The card table */}
        <div
          className={`flex-1 flex overflow-hidden flex-col items-center justify-center`}
        >
          <div
            className={`flex flex-col relative  justify-center border-2 border-black  rounded-[90%]  bg-gradient-to-br from-[#562B00] via-[#884400] to-[#562B00] w-[70%] h-[70%]`}
          >
            <div
              className={`flex flex-row -skew-x-[150deg] -rotate-[30deg] justify-center items-center`}
            >
              {player.hand.map((card, ix) => {
                const rotate = `rotate-[${10 * ix}deg]`;
                return (
                  <div key={card.id} className={`absolute ${rotate} `}>
                    <PlayingCard card={card} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The current user */}
        <div className={`flex self-center  flex-col`}>
          <p className={`font-bold text-lg text-green-500`}>{player.name}</p>
          <p>Total wins: {player.wins}</p>
          {!room.isFirstGame && <p>Current position: {player.position}</p>}
          <PlayerHand hand={player.hand} />
        </div>
      </div>
    </Container>
  );
}

// This is some avatar heads we can put around table. Need to work it out
{
  /**
  
   <div
            className={`skew-x-4   absolute top-[6.2rem] left-[5%] -skew-y-12`}
          >
            <IoPersonSharp size={150} className={``} />
            {/* <div className={`absolute bottom-4 left-[40%]    translate-x-8`}>
              <div className={`relative flex flex-row gap-2 -skew-x-12 `}>
                {[1, 2, 3].map((x) => (
                  <div
                    className={` w-[20px] h-[40px] justify-self-center self-center border bg-red-300`}
                  />
                ))}
              </div>
            </div> 
            </div>
            <div
              className={`skew-x-4 absolute top-[4rem] left-[18%] -skew-y-[10deg]`}
            >
              <IoPersonSharp size={150} className={` `} />
              <div className={`absolute bottom-4 left-[40%]    translate-x-2`}>
                <div className={`relative flex flex-row gap-2 -skew-x-12 `}>
                  {[1, 2, 3].map((x) => (
                    <div
                      className={` w-[20px] h-[40px] justify-self-center self-center border bg-red-300`}
                    />
                  ))}
                </div>
              </div>
            </div>
  
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute top-[2rem] left-[31%] -skew-y-[10deg]`}
            />
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute left-[44%] top-0 -skew-y-[10deg]`}
            />
  
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute -top-2 left-[57%] skew-y-[10deg]`}
            />
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute top-[2rem] left-[70%] skew-y-[10deg]`}
            />
            
            */
}
