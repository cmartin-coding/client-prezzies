import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";
import { Positions, Suits } from "./types";
import { IconType } from "react-icons";
import { BiQuestionMark } from "react-icons/bi";
import {
  FaBiohazard,
  FaCrown,
  FaGem,
  FaHandHoldingUsd,
  FaHome,
  FaTrash,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";

export const suitIcons: { [key in Suits]: IconType } = {
  Clubs: GiClubs,
  Diamonds: GiDiamonds,
  Hearts: GiHearts,
  Spades: GiSpades,
};

export const positionIcons: { [key in Positions]: IconType } = {
  Undecided: BiQuestionMark,
  President: FaCrown,
  "Vice President": FaUserTie,
  "Middle Class": FaUserFriends,
  "Upper Class": FaGem,
  "Lower Class": FaHome,
  Poor: FaHandHoldingUsd,
  Scum: FaTrash,
  "Scummy Scum": FaBiohazard,
};
