import { GiCardPlay, GiCardRandom } from "react-icons/gi";
import { Card } from "../types";
import { PlayerHand } from "./PlayerHand";
import { PrezziesButton } from "./PrezziesButton";
import { AiFillCloseCircle } from "react-icons/ai";
type CardTablePlayerHandProps = {
  playerHand: Card[];
  selectedCards: Card[];
  isGoingFirst: boolean;
  isTurn: boolean;
  onClickCard: (card: Card) => void;
  onPlayHand: () => void;
  onPass: () => void;
  onCompletedIt: () => void;
};
export function CardTablePlayerHand(props: CardTablePlayerHandProps) {
  const noCardsSelected = props.selectedCards.length === 0;
  return (
    <div className={`flex flex-row relative justify-center`}>
      <div
        className={`flex flex-1  flex-col justify-center relative   gap-2  rounded-md`}
      >
        {props.isTurn && (
          <p
            className={`  self-center md:hidden text-lg px-1 rounded-md bg-green-600 w-fit font-bold text-white`}
          >
            It is your turn
          </p>
        )}
        <div
          className={`flex flex-row  relative gap-2 mb-2 items-center justify-center `}
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
            buttonProps={{
              disabled: noCardsSelected,
              onClick: props.onCompletedIt,
            }}
            // className={`w-full`}

            buttonText="Completed It"
            icon={<GiCardPlay size={30} />}
          />
          <PrezziesButton
            buttonStyle="Tertiary"
            icon={<AiFillCloseCircle size={30} />}
            buttonProps={{ onClick: props.onPass }}
            // className={`w-full justify-between`}
            buttonText="Pass"
          />
          {props.isTurn && (
            <p
              className={` absolute bottom-[50%] translate-y-1/2 right-28 hidden md:block text-lg px-1 rounded-md bg-green-600 w-fit font-bold text-white`}
            >
              It is your turn
            </p>
          )}
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
