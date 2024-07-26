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
  const noCardsSelected = props.selectedCards.length === 0;
  return (
    <div className={`flex flex-row justify-center`}>
      <div
        className={`flex  flex-col justify-center md:w-[80%] relative   gap-5  rounded-md`}
      >
        <div
          className={`flex flex-row gap-2 mb-2 items-center justify-center `}
        >
          <PrezziesButton
            buttonStyle="Primary"
            buttonText="Play Hand"
            customBtnStyle="disabled:bg-gray-500 transform-all duration-300 ease-in-out disabled:opacity-[.7]"
            icon={<GiCardRandom size={30} />}
            buttonProps={{
              disabled: noCardsSelected,
              onClick: props.onPlayHand,
            }}
          />

          <PrezziesButton
            buttonStyle="Secondary"
            customBtnStyle="disabled:bg-gray-500 disabled:opacity-[.7] transform-all duration-300 ease-in-out disabled:ring-0"
            buttonProps={{ disabled: noCardsSelected }}
            // className={`w-full`}

            buttonText="Completed It"
            icon={<GiCardPlay size={30} />}
          />
          <PrezziesButton
            buttonStyle="Tertiary"
            icon={<AiFillCloseCircle size={30} />}
            // className={`w-full justify-between`}
            buttonText="Pass"
          />
        </div>
        <div className={``}>
          <PlayerHand
            hand={props.playerHand}
            isFirstTurn={props.isGoingFirst}
            onClickCard={props.onClickCard}
            selectedCards={props.selectedCards}
          />
        </div>
      </div>
    </div>
  );
}
