// SocketContext.js
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onBroadCast,
  onCompletedIt,
  onCreatedRoom,
  onGameOver,
  onJoinRoom,
  onLastPlaceUpdated,
  onPassTurn,
  onPlayedHand,
  onReadyUp,
  onUpdatePlayer,
  onUpdatePlayerAfterGameCompleted,
  onUpdateRoom,
} from "../socketListeners";
import { socket } from "../socket";
import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  // isLoading: boolean;
}
export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);

export const SocketProvider = ({
  children,
  navigate,
}: {
  children: ReactNode;
  navigate: NavigateFunction;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //// -- CREATING AND JOINING ROOMS FROM HOME SCREEN ---
    const handleCreateRoom = onCreatedRoom(dispatch, navigate);
    const handleJoinRoom = onJoinRoom(dispatch, navigate);

    socket.on("onCreatedRoom", handleCreateRoom);
    socket.on("onJoinedRoom", handleJoinRoom);
    // ------------------------------------------------

    //------ UPDATING ROOM AND LOBBY LISTENERS --------
    const handleUpdateRoom = onUpdateRoom(dispatch);
    const handleReadyUp = onReadyUp(dispatch);

    socket.on("onUpdateRoom", handleUpdateRoom);
    socket.on("onReadyUp", handleReadyUp);
    // ------------------------------------------------

    // ------------- HANDLING GAME LOGIC ---------------
    const handleOnPlayedHand = onPlayedHand(dispatch);
    const handleOnPassTurn = onPassTurn(dispatch);
    const handleOnCompletedIt = onCompletedIt(dispatch);
    const handleOnBroadcast = onBroadCast(dispatch);

    socket.on("onPlayedHand", handleOnPlayedHand);
    socket.on("onPassedTurn", handleOnPassTurn);
    socket.on("onBroadcastMessage", handleOnBroadcast);
    socket.on("onCompletedIt", handleOnCompletedIt);
    // ------------------------------------------------

    // ------------ HANDLING GAME OVER LOGIC ------------
    const handleOnGameOver = onGameOver(dispatch);
    const handleUpdateLastPlayerToFinish = onLastPlaceUpdated(dispatch);
    const handleUpdatePlayerAfterGameIsOver =
      onUpdatePlayerAfterGameCompleted(dispatch);

    socket.on("onGameIsOver", handleOnGameOver);
    socket.on("onLastPlaceUpdated", handleUpdateLastPlayerToFinish);
    socket.on(
      "onUpdatePlayerAfterGameCompleted",
      handleUpdatePlayerAfterGameIsOver
    );
    // --------------------------------------------------

    // ------------ HANDLING General Player update ------------
    const handleUpdatePlayer = onUpdatePlayer(dispatch);
    socket.on("onUpdatePlayer", handleUpdatePlayer);
    // --------------------------------------------------

    return () => {
      socket.off("onCreatedRoom", handleCreateRoom);
      socket.off("onJoinedRoom", handleJoinRoom);
      socket.off("onUpdateRoom", handleUpdateRoom);
      socket.off("onBroadcastMessage", handleOnBroadcast);
      socket.off("onPlayedHand", handleOnPlayedHand);
      socket.off("onReadyUp", handleReadyUp);
      socket.off("onPassedTurn", handleOnPassTurn);
      socket.off("onCompletedIt", handleOnCompletedIt);
      socket.off("onGameIsOver", handleOnGameOver);
      socket.off("onLastPlaceUpdated", handleUpdateLastPlayerToFinish);
      socket.off(
        "onUpdatePlayerAfterGameCompleted",
        handleUpdatePlayerAfterGameIsOver
      );
      socket.off("onUpdatePlayer", handleUpdatePlayer);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
