import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import { Room, roomActions } from "./slices/room";
import { playerActions, PlayerState } from "./slices/player";
import { NavigateFunction } from "react-router-dom";

export const onCreatedRoom =
  (dispatch: Dispatch<UnknownAction>, nav: NavigateFunction) =>
  (params: { room: Room; player: PlayerState }) => {
    console.log("Setting up room");
    dispatch(playerActions.createPlayer(params.player));
    dispatch(roomActions.updateRoom(params.room));
    nav(`/lobby/${params.room.id}`);
  };
export const onJoinRoom =
  (dispatch: Dispatch<UnknownAction>, nav: NavigateFunction) =>
  (params: { room: Room; player: PlayerState }) => {
    console.log("Joining the room");
    dispatch(playerActions.createPlayer(params.player));
    dispatch(roomActions.updateRoom(params.room));
    nav(`/lobby/${params.room.id}`);
  };
export const onUpdateRoom =
  (dispatch: Dispatch<UnknownAction>) => (params: { updatedRoom: Room }) => {
    console.log("WOWOWOW");
    dispatch(roomActions.updateRoom(params.updatedRoom));
  };
// export const onUpdateRoom =
//   (dispatch: Dispatch<UnknownAction>) => (params: { updatedRoom: Room }) => {
//     dispatch(roomActions.updateRoom(params.updatedRoom));
//   };
