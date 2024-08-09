import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Provider } from "react-redux";
import { Lobby } from "./Pages/Lobby";
import { store } from "./store";
import { SocketProvider } from "./context/SocketContext";
import { Toaster } from "react-hot-toast";
import { CardTable } from "./Pages/CardTable";
import { PostGameLobby } from "./Pages/PostGameLobby";
import { ModalProvider } from "./context/ModalContext";
import { GlobalModal } from "./components/GlobalComponents/GlobalModal";
import { CountdownProvider } from "./context/CountdownContext";
import { GlobalCountdownOverlay } from "./components/GlobalComponents/GlobalCountdownOverlay";
import { GameMessagesContextProvider } from "./context/GameMessagesContext";
import { GlobalGameMessageOverlay } from "./components/GlobalComponents/GlobalGameMessageOverlay";

function App() {
  return (
    <Provider store={store}>
      <GameMessagesContextProvider>
        <CountdownProvider>
          <ModalProvider>
            <BrowserRouter>
              <SocketWrapper />
            </BrowserRouter>
            <GlobalModal />
            <GlobalCountdownOverlay />
            <GlobalGameMessageOverlay />
            <Toaster position="top-right" />
          </ModalProvider>
        </CountdownProvider>
      </GameMessagesContextProvider>
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
        <Route path="/card-table/:roomID" element={<CardTable />} />
        <Route path="/postgame-lobby/:roomID" element={<PostGameLobby />} />
      </Routes>
    </SocketProvider>
  );
};

export default App;
