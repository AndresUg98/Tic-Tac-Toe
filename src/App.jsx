import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  //Board helps us to update the values that are being displayed on the board
  //If there is a previus initialized game -> continue with that game
  //if it is not, load an empty board
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  //Help us to know whos the turn
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null = no winner, false = draw, true = there is a winner

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updatedBoard = (index) => {
    //If there is already a value on that position (index), don't overwrite it
    if (board[index] || winner) return;
    //updating the board,storing what the user stored on the board
    //Never change the state, it is better to make a copy and work on that copy
    const newBoard = [...board];
    newBoard[index] = turn; // X u O
    setBoard(newBoard);

    //Changing the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Saving game with the local storage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    // Saving the turn
    window.localStorage.setItem("turn", newTurn);

    //Checking if there is a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // draw
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      {/* Creating the board */}
      <section className="game">
        {
          // Rendering the board
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updatedBoard={updatedBoard}>
                {square}
              </Square>
            );
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
