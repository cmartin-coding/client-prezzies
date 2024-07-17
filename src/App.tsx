import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/lobby/:roomID" element={<Lobby />} /> */}
        {/* <Route path="/game-board/:roomID" element={<GameBoard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
