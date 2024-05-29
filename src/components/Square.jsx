export const Square = ({ children, isSelected, updatedBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    // passing the value were from the board (array) the user did click
    updatedBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
