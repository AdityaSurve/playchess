import Tiles from "./Tiles";
import React, { useRef, useState } from "react";
import Referee from "../referee/Referee";

const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h"];
const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: Team;
}

export enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}
export enum Team {
  White,
  Black,
}

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.Pawn,
    team: Team.White,
  });
  initialBoardState.push({
    image: "assets/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.Pawn,
    team: Team.Black,
  });
}

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "w" : "b";
  const y = p === 0 ? 0 : 7;
  initialBoardState.push({
    image: `assets/rook_${type}.png`,
    x: 0,
    y,
    type: PieceType.Rook,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/knight_${type}.png`,
    x: 1,
    y,
    type: PieceType.Knight,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/bishop_${type}.png`,
    x: 2,
    y,
    type: PieceType.Bishop,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/queen_${type}.png`,
    x: 3,
    y,
    type: PieceType.Queen,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/king_${type}.png`,
    x: 4,
    y,
    type: PieceType.King,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/bishop_${type}.png`,
    x: 5,
    y,
    type: PieceType.Bishop,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/knight_${type}.png`,
    x: 6,
    y,
    type: PieceType.Knight,
    team: p === 0 ? Team.White : Team.Black,
  });
  initialBoardState.push({
    image: `assets/rook_${type}.png`,
    x: 7,
    y,
    type: PieceType.Rook,
    team: p === 0 ? Team.White : Team.Black,
  });
}

function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridx, setX] = useState(0);
  const [gridy, setY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();
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
      const currentPiece = pieces.find((p) => p.x === gridx && p.y === gridy);
      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridx,
          gridy,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        if (validMove) {
          const undatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(undatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("left");
          activePiece.style.removeProperty("top");
        }
      }
    }
    setActivePiece(null);
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
