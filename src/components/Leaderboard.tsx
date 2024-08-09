import { IconType } from "react-icons";
import { AdjustedPlayer } from "../slices/room";
import { Positions } from "../types";
import { PrezziesHeading } from "./PrezziesHeader";

const POSITION_STYLES: {
  [key in Positions]: {
    containerStyle: string;
    textStyle: string;
    icon?: IconType;
  };
} = {
  President: {
    containerStyle: "border-[4px] border-gold bg-gold",
    textStyle: "text-white",
  },
  "Lower Class": {
    containerStyle: "",
    textStyle: "",
  },
  "Middle Class": {
    containerStyle: "border-[4px] bg-bronze border-bronze",
    textStyle: "",
  },
  "Scummy Scum": {
    containerStyle: "",
    textStyle: "",
  },
  "Upper Class": {
    containerStyle: "border-[4px] bg-bronze border-bronze",
    textStyle: "",
  },
  "Vice President": {
    containerStyle: " bg-black/30 ",
    textStyle: "",
  },
  Poor: {
    containerStyle: "",
    textStyle: "",
  },
  Scum: {
    containerStyle: "",
    textStyle: "",
  },
  Undecided: {
    containerStyle: "",
    textStyle: "",
  },
};
export function Leaderboard(props: {
  players: AdjustedPlayer[];
  className?: string;
  row?: boolean;
  currentTurnPlayerID?: string;
  header?: string;
  headerPosition?: "center" | "right" | "left";
}) {
  const players = [...props.players];

  const sortedPlayers = players.sort((a, b) => {
    return a.position.place - b.position.place;
  });

  const headerPosition = {
    center: "text-center",
    right: "text-right",
    left: "text-left",
  };

  return (
    <div className={`flex flex-col gap-1`}>
      {props.header && (
        <PrezziesHeading
          level={1}
          className={`${
            props.headerPosition && headerPosition[props.headerPosition]
          }`}
        >
          {props.header}
        </PrezziesHeading>
      )}
      <div className={`flex flex-row gap-2 flex-wrap`}>
        {sortedPlayers.map((p) => {
          const containerStyle =
            POSITION_STYLES[p.position.title as Positions].containerStyle;
          const textStyle =
            POSITION_STYLES[p.position.title as Positions].textStyle;
          const isCurrentTurn =
            props.currentTurnPlayerID && p.id === props.currentTurnPlayerID;
          return (
            <div
              key={p.id}
              className={`flex ${
                isCurrentTurn && "border-green-400 border-2"
              } flex-col relative backdrop-blur-md gap-1 flex-1   rounded-md p-2 ${
                containerStyle ? containerStyle : "bg-amber-800"
              } `}
            >
              {/* <div key={p.id} className={`flex flex-row gap-1`}> */}
              {/* <p>{place + 1}.</p> */}
              <p className={`text-center text-white`}>{p.name}</p>
              {/* </div> */}
              <p
                className={`font-bold    text-lg text-center text-white ${textStyle}`}
              >
                {p.position.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
