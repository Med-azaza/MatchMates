import { IconName } from "@fortawesome/fontawesome-svg-core";
import { createContext, useReducer, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

// Initial game state

interface GameState {
  playing: boolean;
  theme: string;
  gridSize: number;
  players: number;
  currentPlayer: number;
  scores: { [key: number]: number };
  cards: { id: string; value: number | IconName }[];
  selectedCards: { id: string; value: number }[];
  matchedCards: { id: string; value: number }[];
  moves: number;
}

const initialState = {
  playing: false,
  theme: "icons",
  gridSize: 4,
  players: 1,
  currentPlayer: 1,
  scores: { 1: 0, 2: 0, 3: 0, 4: 0 },
  cards: [],
  selectedCards: [],
  matchedCards: [],
  moves: 0,
};

const icons = [
  "web-awesome",
  "gear",
  "bug",
  "mug-saucer",
  "microchip",
  "user-secret",
  "fire-extinguisher",
  "wand-magic-sparkles",
  "scissors",
  "eye",
  "droplet",
  "truck",
  "car",
  "wifi",
  "mountain-sun",
  "snowflake",
  "anchor",
  "flag",
  "truck-medical",
  "skull-crossbones",
  "sack-dollar",
  "radiation",
  "plane-up",
  "person-walking",
  "mobile-screen",
  "money-bills",
  "house-chimney",
  "helicopter",
  "fish-fins",
  "cloud-bolt",
  "biohazard",
  "bucket",
  "gas-pump",
  "rocket",
  "robot",
  "user-astronaut",
  "atom",
  "hand-spock",
  "spider",
  "paw",
  "dove",
  "cat",
  "feather-pointed",
  "moon",
  "shuttle-space",
  "meteor",
  "ghost",
  "skull",
  "hat-wizard",
  "broom",
  "gamepad",
  "dice",
  "dragon",
  "chess-rook",
  "chess-knight",
];

const generateShuffledCards = (gridSize: number, theme: string) => {
  let cardsReady;
  if (theme === "numbers") {
    const totalCards = (gridSize * gridSize) / 2;
    const cardValues = Array.from({ length: totalCards }, (_, i) => i);
    const cards = [...cardValues, ...cardValues].map((value) => ({
      id: uuidv4(),
      value,
    }));

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cardsReady = cards;
  } else {
    const shuffled = [...icons].sort(() => Math.random() - 0.5);
    const selectedIcons = shuffled.slice(0, (gridSize * gridSize) / 2);
    const doubledObjects: {
      id: string;
      value: string;
    }[] = [];
    selectedIcons.forEach((str) => {
      doubledObjects.push(
        { id: uuidv4(), value: str },
        { id: uuidv4(), value: str }
      );
    });
    cardsReady = doubledObjects.sort(() => Math.random() - 0.5);
  }

  return cardsReady;
};

type GameAction =
  | { type: "RESTART_GAME" }
  | { type: "CLEAR_SELECTED_CARDS" }
  | { type: "START_GAME" }
  | { type: "SET_GRID_SIZE"; payload: number }
  | { type: "SET_PLAYERS"; payload: number }
  | { type: "SET_THEME"; payload: string }
  | { type: "FLIP_CARD"; payload: { id: string; value: number } }
  | { type: "NEXT_PLAYER" }
  | { type: "UPDATE_SCORE"; payload: { playerId: number; score: number } };

function gameReducer(state, action: GameAction) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        playing: true,
        cards: generateShuffledCards(state.gridSize, state.theme),
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload,
      };
    case "SET_GRID_SIZE":
      return {
        ...state,
        gridSize: action.payload,
      };
    case "FLIP_CARD":
      if (state.selectedCards.length > 0) {
        if (state.selectedCards[0].value === action.payload.value) {
          return {
            ...state,
            matchedCards: [
              ...state.matchedCards,
              state.selectedCards[0],
              action.payload,
            ],
            selectedCards: [],
            moves: state.moves + 1,
            scores: {
              ...state.scores,
              [state.currentPlayer]: state.scores[state.currentPlayer] + 1,
            },
          };
        } else {
          return {
            ...state,
            selectedCards: [...state.selectedCards, action.payload],
            moves: state.moves + 1,
          };
        }
      }
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload],
      };
    case "CLEAR_SELECTED_CARDS":
      return {
        ...state,
        selectedCards: [],
      };
    case "NEXT_PLAYER":
      // Logic to move to the next player
      return {
        ...state,
        currentPlayer: (state.currentPlayer % state.players) + 1,
      };
    case "UPDATE_SCORE":
      // Increment score for the current player
      return {
        ...state,
        scores: {
          ...state.scores,
          [state.currentPlayer]: state.scores[state.currentPlayer] + 1,
        },
      };
    case "RESTART_GAME":
      // Reset the game state to initial values
      return {
        ...initialState,
        gridSize: state.gridSize,
        theme: state.theme,
        players: state.players,
        playing: true,
        cards: generateShuffledCards(state.gridSize, state.theme),
      };
    default:
      return state;
  }
}
interface GameContextType {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
