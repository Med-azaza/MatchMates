import "./assets/styles/main.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GameProvider } from "./context/gameContext";
import StartGame from "./pages/startGame";
import Game from "./pages/game";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/start" replace />} />
          <Route path="/start" element={<StartGame />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
