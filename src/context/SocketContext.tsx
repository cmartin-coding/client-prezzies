// SocketContext.js
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onCreatedRoom,
  onJoinRoom,
  onReadyUp,
  onUpdateRoom,
} from "../socketListeners";
import { socket } from "../socket";
import { NavigateFunction } from "react-router-dom";
import { Socket } from "socket.io-client";
interface ISocketContext {
  socket: Socket | null;
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
    // CREATING AND JOINING ROOMS FROM HOME SCREEN
    const handleCreateRoom = onCreatedRoom(dispatch, navigate);
    const handleJoinRoom = onJoinRoom(dispatch, navigate);

    socket.on("onCreatedRoom", handleCreateRoom);
    socket.on("onJoinedRoom", handleJoinRoom);
    // ###########################

    // UPDATING ROOM AND LOBBY LISTENERS
    const handleUpdateRoom = onUpdateRoom(dispatch);
    const handleReadyUp = onReadyUp(dispatch);

    socket.on("onUpdateRoom", handleUpdateRoom);
    socket.on("onReadyUp", handleReadyUp);
    // ############################

    return () => {
      socket.off("onCreatedRoom", handleCreateRoom);
      socket.off("onJoinedRoom", handleJoinRoom);
      socket.off("onUpdateRoom", handleUpdateRoom);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
