// SocketContext.js
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onCreatedRoom, onJoinRoom, onUpdateRoom } from "../socketListeners";
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
    const handleCreateRoom = onCreatedRoom(dispatch, navigate);
    const handleJoinRoom = onJoinRoom(dispatch, navigate);
    const handleUpdateRoom = onUpdateRoom(dispatch);

    socket.on("onCreatedRoom", handleCreateRoom);
    socket.on("onJoinedRoom", handleJoinRoom);
    socket.on("onUpdateRoom", handleUpdateRoom);

    return () => {
      socket.off("onCreatedRoom", handleCreateRoom);
      socket.off("onJoinedRoom", handleJoinRoom);
      socket.off("onUpdateRoom", handleUpdateRoom);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
