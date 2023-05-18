import Tiles from "./Tiles";

const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];

function ChessBoard() {
  let board = [];
  for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
      const num = j + i;
      board.push(<Tiles number={num} />);
    }
  }
  return (
    <div
      id="chessboard"
      className="h-[640px] w-[640px] bg-[#825A34] rounded-xl overflow-hidden grid grid-cols-8 text-center items-center"
    >
      {board}
    </div>
  );
}

export default ChessBoard;
