import { useState } from "react";
import { Container } from "../components/Container";
import { Leaderboard } from "../components/Leaderboard";
import { PlayerHand } from "../components/PlayerHand";
import { PlayingCard } from "../components/PlayingCard";
import { PrezziesButton } from "../components/PrezziesButton";
import { PrezziesHeading } from "../components/PrezziesHeader";

import { useAppSelector } from "../hooks";
import { Card } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";

export function PostGameLobby() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  const numberOfPlayersWeAreWaitingOnToJoinPostGameLobby = room.players.reduce(
    (prev, acc) => {
      if (!acc.isInPostGameLobby) {
        return prev + 1;
      } else {
        return prev;
      }
    },
    0
  );

  const isGreaterThan5Players = room.players.length > 5;
  const currentPlayerTurn = room.players.find(
    (p) => p.id === room.currentTurnPlayerId
  );
  const currentPlayersTurnStr =
    currentPlayerTurn?.id === player.id
      ? "It is your turn"
      : `It is ${currentPlayerTurn?.name}'s turn`;

  const isTimeToTrade = room.handsToChoose.length === 0;

  const sortedRankings = [...room.players].sort(
    (a, b) => a.position.place - b.position.place
  );

  const playersToTrade = !isGreaterThan5Players
    ? [sortedRankings[0], sortedRankings[sortedRankings.length - 1]]
    : [
        sortedRankings[0],
        sortedRankings[1],
        sortedRankings[sortedRankings.length - 2],
        sortedRankings[sortedRankings.length - 1],
      ];

  const [selectedCardsToTrade, setSelectedCardsToTrade] = useState<Card[]>([]);

  const handleSelectionOfCards = (card: Card) => {
    const updatedSelectedCards = updateSelectedCards(
      selectedCardsToTrade,
      card
    );
    setSelectedCardsToTrade(updatedSelectedCards);
  };

  const isPlayerTrading =
    playersToTrade.findIndex((p) => p.id === player.id) > -1;

  let numberOfCardsToTrade = 1;
  if (
    room.numberOfPlayers &&
    room.numberOfPlayers > 5 &&
    (player.position.title === "President" ||
      player.position.title === "Scummy Scum")
  ) {
    numberOfCardsToTrade = 2;
  }

  const isScum =
    player.position.title === "Scummy Scum" || player.position.title === "Scum";

  return (
    <Container
      containerStyle={`md:p-10 p-4 flex flex-col md:justify-center md:items-center`}
    >
      {/* <PrezziesButton
        buttonStyle="Primary"
        buttonText="TEST"
        buttonProps={{
          onClick: () => {
            socket.emit("test");
          },
        }}
      /> */}
      {numberOfPlayersWeAreWaitingOnToJoinPostGameLobby > 0 && (
        <p>
          Waiting for {numberOfPlayersWeAreWaitingOnToJoinPostGameLobby} more
          player(s) to enter post-game lobby
        </p>
      )}
      <div
        className={`flex max-w-8xl flex-1  w-full bg-white/40 rounded-md p-2 backdrop-blur-lg justify-center items-center flex-col gap-10`}
      >
        {room.handsToChoose.length > 0 && (
          <PrezziesHeading level={1}>{currentPlayersTurnStr}</PrezziesHeading>
        )}
        <div className={`w-full`}>
          <Leaderboard
            headerPosition="center"
            currentTurnPlayerID={room.currentTurnPlayerId}
            // header="Standings"
            row
            players={room.players}
          />
        </div>
        {isTimeToTrade ? (
          <div className={`rounded-md flex flex-col  gap-3`}>
            <PrezziesHeading level={2}>
              All hands have been chosen. Now, the Scum{" "}
              {isGreaterThan5Players && "and Scummy Scum"} must trade with the
              President {isGreaterThan5Players && "and Vice President"}
            </PrezziesHeading>
            {/* <p>
              Scum {isGreaterThan5Players && "and Scummy Scum"}, please give
              your best offering to the new President{" "}
              {isGreaterThan5Players && "and Vice President"}.
            </p>
            <p>
              President {isGreaterThan5Players && "and Vice President"}, please
              graciously give whatever you deem deserving to to the Scum
              {isGreaterThan5Players && "and Scummy Scum"}.
            </p> */}
          </div>
        ) : (
          <div className={`flex flex-row flex-wrap gap-3 justify-center`}>
            {room.handsToChoose.map((hand, ix) => {
              return (
                <div key={ix} className={`flex flex-col items-center gap-1`}>
                  <div className={`flex flex-row-reverse`}>
                    {hand.map((c, ix) => {
                      if (c.card) {
                        return (
                          <PlayingCard
                            key={(c.id as string) + ix}
                            className={`tablet:w-28 w-14 cursor-default`}
                            card={c as Card}
                          />
                        );
                      } else {
                        return (
                          <div
                            key={c.id}
                            className={`w-14 -mr-[4.9rem]  h-30 border border-black bg-blue-400`}
                          />
                        );
                      }
                    })}
                  </div>
                  <PrezziesButton
                    buttonText="Select hand"
                    buttonStyle="Primary"
                    customBtnStyle="w-fit h-min"
                    buttonProps={{
                      onClick: () => {
                        console.log(hand);
                        socket.emit("selectHandInPostGameLobby", {
                          hand: hand as { id: string }[] & Partial<Card>[],
                          player: player,
                          room: room,
                        });
                      },
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        {player.hand.length > 0 &&
          (isPlayerTrading && isTimeToTrade ? (
            <div className={`flex flex-col items-center `}>
              <PlayerHand
                hand={player.hand}
                cardsToBeTradedSelectionDetails={{
                  numberOfCardsAllowed: numberOfCardsToTrade,
                }}
                onClickCard={handleSelectionOfCards}
                selectedCards={selectedCardsToTrade}
              />

              <div className={`flex flex-col items-center mt-4`}>
                <p>Please select your {isScum && "best"} card(s) to trade.</p>
                <PrezziesButton
                  buttonStyle="Primary"
                  buttonText="Send Cards"
                  buttonProps={{
                    onClick: () => {
                      socket.emit("tradeHand", {
                        cardsToTrade: selectedCardsToTrade,
                        player: player,
                        room: room,
                      });
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <PlayerHand hand={player.hand} />
              <p className={`animate-pulse`}>Waiting for trades...</p>
            </>
          ))}
      </div>
    </Container>
  );
}
