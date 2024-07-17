import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Card, Deck } from "../types";
// import { Card, Deck } from "../helpers/helpers";

export type AdjustedPlayer = {
  id: string;
  name: string;
  numberOfCardsInHand: number;
  position: string;
  wins: number;
  isReady: boolean;
};
export type Room = {
  id: string;
  room: string;
  shareableRoomCode: string;
  players: AdjustedPlayer[];
  handsToChoose: Deck[];
  isFirstGame: boolean;
  numberOfPlayers: number | null;
  turnCounter: number;
  cardsPlayed: Card[];
  gameIsOver: boolean;
  lastHand: Card[];
};

const initialState: Room = {
  id: "",
  room: "",
  shareableRoomCode: "",
  players: [],
  handsToChoose: [],
  isFirstGame: true,
  numberOfPlayers: null,
  turnCounter: 0,
  cardsPlayed: [],
  gameIsOver: false,
  lastHand: [],
};

export const roomSlice = createSlice({
  name: "Room",
  initialState: initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<Room>) => {
      return { ...state, ...action.payload };
    },
    addPlayerToRoom: (state, action: PayloadAction<AdjustedPlayer>) => {
      state.players.push(action.payload);
    },
  },
});

export const roomActions = roomSlice.actions;
