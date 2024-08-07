import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Card } from "../types";
// import { Card, Deck } from "../helpers/helpers";

export type AdjustedPlayer = {
  id: string;
  name: string;
  numberOfCardsInHand: number;
  position: { place: number; title: string };
  wins: number;
  isReady: boolean;
  isInPostGameLobby: boolean;
};
export type Room = {
  id: string;
  room: string;
  shareableRoomCode: string;
  players: AdjustedPlayer[];
  lastPlayerPlayedId: string;
  handsToChoose: Partial<Card>[][] | ({ id: string }[] & Partial<Card>[])[];
  isFirstGame: boolean;
  numberOfPlayers: number | null;
  turnCounter: number;
  cardsPlayed: Card[];
  gameIsOver: boolean;
  currentTurnIndex: number;
  currentTurnPlayerId: string;
  lastHand: Card[];
  messages: string[];
  numberOfGames: number;
  opportunityForCompletedIt: {
    basePoints: number;
    numberOfCardsNeeded: number;
    card: string;
  };
};

const initialState: Room = {
  id: "",
  room: "",
  currentTurnIndex: 0,
  currentTurnPlayerId: "",
  shareableRoomCode: "",
  players: [],
  handsToChoose: [],
  isFirstGame: true,
  numberOfPlayers: null,
  turnCounter: 0,
  cardsPlayed: [],
  gameIsOver: false,
  lastHand: [],
  messages: [],
  numberOfGames: 1,
  lastPlayerPlayedId: "",
  opportunityForCompletedIt: {
    basePoints: 0,
    numberOfCardsNeeded: 0,
    card: "Any",
  },
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
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
});

export const roomActions = roomSlice.actions;
