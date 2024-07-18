import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";
import { Suits } from "./types";
import { IconType } from "react-icons";
export const suitIcons: { [key in Suits]: IconType } = {
  Clubs: GiClubs,
  Diamonds: GiDiamonds,
  Hearts: GiHearts,
  Spades: GiSpades,
};
