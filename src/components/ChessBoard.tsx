import Tiles from "./Tiles";

const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/pawn_w.png",
    x: i,
    y: 1,
  });
  pieces.push({
    image: "assets/pawn_b.png",
    x: i,
    y: 6,
  });
}

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "w" : "b";
  const y = p === 0 ? 0 : 7;
  pieces.push({
    image: `assets/rook_${type}.png`,
    x: 0,
    y,
  });
  pieces.push({
    image: `assets/knight_${type}.png`,
    x: 1,
    y,
  });
  pieces.push({
    image: `assets/bishop_${type}.png`,
    x: 2,
    y,
  });
  pieces.push({
    image: `assets/queen_${type}.png`,
    x: 3,
    y,
  });
  pieces.push({
    image: `assets/king_${type}.png`,
    x: 4,
    y,
  });
  pieces.push({
    image: `assets/bishop_${type}.png`,
    x: 5,
    y,
  });
  pieces.push({
    image: `assets/knight_${type}.png`,
    x: 6,
    y,
  });
  pieces.push({
    image: `assets/rook_${type}.png`,
    x: 7,
    y,
  });
}

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {
  const element = e.target as HTMLElement;
  if (element.classList.contains("chess-piece")) {
    const x = e.clientX - 40;
    const y = e.clientY - 40;
    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    activePiece = element;
  }
}
function movePiece(e: React.MouseEvent) {
  if (activePiece) {
    const x = e.clientX - 40;
    const y = e.clientY - 40;
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
  }
}

function dropPiece(e: React.MouseEvent) {
  if (activePiece) {
    activePiece = null;
  }
}

function ChessBoard() {
  let board = [];
  for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
      const num = j + i;
      let image = undefined;
      pieces.forEach((piece) => {
        if (piece.x === i && piece.y === j) {
          image = piece.image;
        }
      });
      board.push(
        <Tiles
          number={num}
          image={image}
          key={`${horizontal[i]}${vertical[j]}`}
        />
      );
    }
  }
  return (
    <div
      id="chessboard"
      className="h-[640px] w-[640px] bg-[#825A34] rounded-xl overflow-hidden grid grid-cols-8 text-center items-center"
      onMouseDown={(e) => {
        grabPiece(e);
      }}
      onMouseMove={(e) => {
        movePiece(e);
      }}
      onMouseUp={(e) => {
        dropPiece(e);
      }}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
