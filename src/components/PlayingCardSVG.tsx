import { SVGProps } from "react";
import { Suits } from "../types";

export type SVGPlayingCardType = {
  cardName: string;
  suitName: Suits;
  fillstyle?: string;
} & SVGProps<SVGSVGElement>;
export function PlayingCardSVG(props: SVGPlayingCardType) {
  // Define the colors and symbols for the suits
  const suits: { [key in Suits]: { color: string; symbol: string } } = {
    Hearts: { color: "red", symbol: "♥" },
    Diamonds: { color: "red", symbol: "♦" },
    Clubs: { color: "black", symbol: "♣" },
    Spades: { color: "black", symbol: "♠" },
  };

  const { color, symbol } = suits[props.suitName];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 150"
      {...props}
      width={"100%"}
      height={"100%"}
      className={`border border-black rounded-md`}
    >
      {/* Card background */}
      <rect
        className={`fill-white ${props.fillstyle}`}
        x="0"
        y="0"
        width="100%"
        height="100%"
      />

      {/* Top-left rank and suit */}
      <foreignObject x="0" y="0" width={"100%"} height={"100%"}>
        <div className={`flex flex-col justify-between h-full w-full`}>
          {/* Top left  */}
          <div className={`flex flex-row`}>
            <div className={`flex flex-col items-center m-[4px]`}>
              <span className={`text-sm font-bold`} style={{ color }}>
                {props.cardName}
              </span>
              <span className={`text-xl -mt-1`} style={{ color: color }}>
                {symbol}
              </span>
            </div>
          </div>
          {/* Middle */}
          <span
            className={`flex text-3xl  flex-row justify-center items-center `}
            style={{ color }}
          >
            {symbol}
          </span>
          {/* Bottom Right */}
          <div className={`flex flex-row items-end justify-end `}>
            <div className={`flex flex-col items-center rotate-180  m-[4px]`}>
              <span className={`text-sm font-bold`} style={{ color }}>
                {props.cardName}
              </span>
              <span className={`text-xl -mt-1`} style={{ color: color }}>
                {symbol}
              </span>
            </div>
          </div>
        </div>
      </foreignObject>

      {/* Bottom-right rank and suit (rotated) */}
      {/* <foreignObject x="85" y="135" width={"100%"} height={"100%"}>
        <div className={`flex flex-row `}>
          <div className={`flex flex-col  items-center m-[4px]`}>
            <span className={`text-sm font-bold`} style={{ color }}>
              {props.cardName}
            </span>
            <span className={`text-xl -mt-1`} style={{ color: color }}>
              {symbol}
            </span>
          </div>
        </div>
      </foreignObject> */}
    </svg>
  );
}
