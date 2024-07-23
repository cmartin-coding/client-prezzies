import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Card, Deck } from "../types";
// import { Card, Deck } from "../helpers/helpers";
export type PlayerState = {
  id: string;
  name: string;
  hand: Deck;
  isCurrentTurn: boolean;
  wins: number;
  position: string;
  isReady: boolean;
  isHost?: boolean;
};

const initialState: PlayerState = {
  id: "",
  hand: [],
  isCurrentTurn: false,
  isReady: false,
  position: "",
  name: "",
  wins: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    createPlayer: (
      state,
      action: PayloadAction<{
        name: string;
        hand: Deck;
        isCurrentTurn: boolean;
        isReady: boolean;
        isHost?: boolean;
      }>
    ) => {
      return { ...state, ...action.payload };
    },
    addCard: (state, action: PayloadAction<{ card: Card }>) => {
      state.hand.push(action.payload.card);
    },
    readyUp: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    updateHand: (state, action: PayloadAction<Card[]>) => {
      state.hand = action.payload;
    },
    updatePlayerPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    updateWinCounter: (state) => {
      state.wins++;
    },
    updatePlayer: (state, action: PayloadAction<PlayerState>) => {
      return { ...action.payload };
    },
  },
});

export const playerActions = playerSlice.actions;
