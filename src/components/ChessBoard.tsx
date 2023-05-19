import Tiles from "./Tiles";
import React, { useRef, useState } from "react";

const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/pawn_w.png",
    x: i,
    y: 1,
  });
  initialBoardState.push({
    image: "assets/pawn_b.png",
    x: i,
    y: 6,
  });
}

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "w" : "b";
  const y = p === 0 ? 0 : 7;
  initialBoardState.push({
    image: `assets/rook_${type}.png`,
    x: 0,
    y,
  });
  initialBoardState.push({
    image: `assets/knight_${type}.png`,
    x: 1,
    y,
  });
  initialBoardState.push({
    image: `assets/bishop_${type}.png`,
    x: 2,
    y,
  });
  initialBoardState.push({
    image: `assets/queen_${type}.png`,
    x: 3,
    y,
  });
  initialBoardState.push({
    image: `assets/king_${type}.png`,
    x: 4,
    y,
  });
  initialBoardState.push({
    image: `assets/bishop_${type}.png`,
    x: 5,
    y,
  });
  initialBoardState.push({
    image: `assets/knight_${type}.png`,
    x: 6,
    y,
  });
  initialBoardState.push({
    image: `assets/rook_${type}.png`,
    x: 7,
    y,
  });
}

function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridx, setX] = useState(0);
  const [gridy, setY] = useState(0);

  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setX(Math.floor((e.clientX - chessboard.offsetLeft) / 80));
      setY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 640) / 80)));
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = e.clientX - 40;
      const y = e.clientY - 40;
      const minX = chessboard.offsetLeft - 15;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 65;
      const minY = chessboard.offsetTop - 15;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 65;
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 80);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / 80)
      );
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridx && p.y === gridy) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  }
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
      ref={chessboardRef}
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
