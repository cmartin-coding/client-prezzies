// SocketContext.js
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onCreatedRoom } from "../socketListeners";
import { socket } from "../socket";
import { NavigateFunction } from "react-router-dom";

const SocketContext = createContext(null as any);

const SocketProvider = ({
  children,
  navigate,
}: {
  children: ReactNode;
  navigate: NavigateFunction;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCreateRoom = onCreatedRoom(dispatch, navigate);

    socket.on("onCreatedRoom", handleCreateRoom);

    return () => {
      socket.off("onCreatedRoom", handleCreateRoom);
    };
  }, [dispatch, navigate]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
