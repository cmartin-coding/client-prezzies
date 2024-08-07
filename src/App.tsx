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
import { GlobalModal } from "./components/GlobalModal";
import { CountdownProvider } from "./context/CountdownContext";
import { GlobalCountdownOverlay } from "./components/GlobalCountdownOverlay";

function App() {
  return (
    <Provider store={store}>
      <CountdownProvider>
        <ModalProvider>
          <BrowserRouter>
            <SocketWrapper />
          </BrowserRouter>
          <GlobalModal />
          <GlobalCountdownOverlay />
          <Toaster position="top-right" />
        </ModalProvider>
      </CountdownProvider>
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
