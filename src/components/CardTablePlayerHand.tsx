import { GiCardPlay, GiCardRandom } from "react-icons/gi";
import { Card } from "../types";
import { PlayerHand } from "./PlayerHand";
import { PrezziesButton } from "./PrezziesButton";
import { AiFillCloseCircle } from "react-icons/ai";
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
          buttonStyle="Primary"
          buttonText="Play Hand"
          icon={<GiCardRandom size={30} />}
          disabled={props.selectedCards.length === 0}
          onClick={props.onPlayHand}
          className={`p-1  rounded-md disabled:bg-gray-400`}
        />

        <PrezziesButton
          buttonStyle="Secondary"
          disabled={props.selectedCards.length === 0}
          className={`p-1  rounded-md`}
          buttonText="Completed It"
          icon={<GiCardPlay size={30} />}
        />
        <PrezziesButton
          buttonStyle="Tertiary"
          icon={<AiFillCloseCircle size={30} />}
          className={`p-1  rounded-md`}
          buttonText="Pass"
        />
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
