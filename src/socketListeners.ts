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
    dispatch(roomActions.updateRoom(params.updatedRoom));
  };

export const onReadyUp =
  (dispatch: Dispatch<UnknownAction>) =>
  (params: { updatedRoom: Room; updatedPlayer: PlayerState }) => {
    dispatch(roomActions.updateRoom(params.updatedRoom));
    dispatch(playerActions.updateHand(params.updatedPlayer.hand));
    dispatch(playerActions.readyUp(params.updatedPlayer.isReady));
  };

export const onPlayedHand =
  (dispatch: Dispatch<UnknownAction>) =>
  (params: { updatedRoom: Room; updatedPlayer: PlayerState }) => {
    dispatch(roomActions.updateRoom(params.updatedRoom));
    dispatch(playerActions.updatePlayer(params.updatedPlayer));
  };

export const onBroadCast =
  (dispatch: Dispatch<UnknownAction>) => (params: { message: string }) => {
    console.log(params.message);
    dispatch(roomActions.addMessage(params.message));
  };

export const onPassTurn =
  (dispatch: Dispatch<UnknownAction>) => (params: { updatedRoom: Room }) => {
    dispatch(roomActions.updateRoom(params.updatedRoom));
  };
export const onCompletedIt =
  (dispatch: Dispatch<UnknownAction>) =>
  (params: { updatedRoom: Room; updatedPlayer: PlayerState }) => {
    dispatch(roomActions.updateRoom(params.updatedRoom));
    dispatch(playerActions.updatePlayer(params.updatedPlayer));
  };
