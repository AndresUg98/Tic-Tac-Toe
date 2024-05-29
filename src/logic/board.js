import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
  //checking all the winner combinatios, to see who won "x" or "o"
  for (const combo of WINNER_COMBOS) {
    //capturing the positions of the array "WINNER_COMBOS"
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && // position [0] has a "x" or an "o"
      boardToCheck[a] == boardToCheck[b] && // ensuring that on the next position is also an "x" or an "o")
      boardToCheck[b] == boardToCheck[c]
    ) {
      return boardToCheck[a]; // returns a "x" or an "o"
    }
  }
  // if there is no winner, return null
  return null;
};

//If there is a draw this function will execute
export const checkEndGame = (newBoard) => {
  //We chechk if there is no more empty spaces on the board
  return newBoard.every((square) => square != null);
};
