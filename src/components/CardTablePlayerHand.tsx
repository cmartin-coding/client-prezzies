import { Card } from "../types";
import { PlayerHand } from "./PlayerHand";
import { PrezziesButton } from "./PrezziesButton";
type CardTablePlayerHandProps = {
  playerHand: Card[];
  selectedCards: Card[];
  isGoingFirst: boolean;
  onClickCard: (card: Card) => void;
  onPlayHand: () => void;
  onPass: () => void;
  onCompletedIt: () => void;
};
export function CardTablePlayerHand(props: CardTablePlayerHandProps) {
  return (
    <div className={`flex  flex-col  gap-3`}>
      <div className={`flex flex-row gap-2 justify-center md:justify-end`}>
        <PrezziesButton
          disabled={props.selectedCards.length === 0}
          onClick={props.onPlayHand}
          className={`p-1  rounded-md disabled:bg-gray-400`}
        >
          Play Hand
        </PrezziesButton>
        <PrezziesButton
          disabled={props.selectedCards.length === 0}
          className={`p-1  rounded-md`}
        >
          Completed It
        </PrezziesButton>
        <PrezziesButton className={`p-1  rounded-md`}>Pass</PrezziesButton>
      </div>

      <PlayerHand
        hand={props.playerHand}
        isFirstTurn={props.isGoingFirst}
        onClickCard={props.onClickCard}
        selectedCards={props.selectedCards}
      />
    </div>
  );
}
