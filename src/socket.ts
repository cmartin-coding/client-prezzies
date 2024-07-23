import { io, Socket } from "socket.io-client";
import { PlayerState } from "./slices/player";
import { Room } from "./slices/room";
import { Card } from "./types";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
// const URL = "http://localhost:3000/";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);

socket.on("connect", () => {
  console.log("connected to server");
});

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  onCreatedRoom: (params: { room: Room; player: PlayerState }) => void;
  onJoinedRoom: (params: { room: Room; player: PlayerState }) => void;
  onUpdateRoom: (params: { updatedRoom: Room }) => void;
  onReadyUp: (params: {
    updatedRoom: Room;
    updatedPlayer: PlayerState;
  }) => void;
  onPlayedHand: (params: {
    updatedRoom: Room;
    updatedPlayer: PlayerState;
  }) => void;
  onSendErrorMessage: (params: { errorMessage: string }) => void;
  onBroadcastMessage: (params: { message: string }) => void;
}

export interface ClientToServerEvents {
  createRoom: (params: {
    roomName: string;
    userName: string;
    numberOfPlayers: number;
  }) => void;
  joinRoom: (params: { roomName: string; userName: string }) => void;
  readyUp: (params: {
    player: PlayerState;
    room: Room;
    readyUpStatus: boolean;
  }) => void;
  playHand: (params: { hand: Card[]; player: PlayerState; room: Room }) => void;
}
