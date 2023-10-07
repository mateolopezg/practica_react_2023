import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./utils/constants";
import { checkWinnerFrom, checkEndGame } from "./utils/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameToStorage } from "./utils/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null); // estado inicial vacío 
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board];
    newBoard[index] = turn;
    console.log(newBoard[index]);
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }

/*   useEffect(() => {
    saveGameToStorage({ board: newBoard, turn: newTurn });
  }, [turn, board]) */

  return (
    <main className="board">
      <h1>El gato</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>)
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
