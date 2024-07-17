import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Provider } from "react-redux";
import { Lobby } from "./Pages/Lobby";
import { store } from "./store";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SocketWrapper />
      </BrowserRouter>
    </Provider>
  );
}

const SocketWrapper = () => {
  const navigate = useNavigate();

  return (
    <SocketProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby/:roomID" element={<Lobby />} />
        {/* <Route path="/game-board/:roomID" element={<GameBoard />} /> */}
      </Routes>
    </SocketProvider>
  );
};

export default App;
