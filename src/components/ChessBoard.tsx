import Tiles from "./Tiles";
import React, { useRef, useState } from "react";
import Referee from "../referee/Referee";
import {
  HORIZONTAL,
  VERTICAL,
  GRID_SIZE,
  Piece,
  PieceType,
  Team,
  initialBoardState,
  Position,
  samePosition,
} from "../Constants";

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();
  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabx = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const graby = Math.abs(
        Math.ceil(
          (e.clientY - chessboard.offsetTop - GRID_SIZE * 8) / GRID_SIZE
        )
      );
      setGrabPosition({
        x: grabx,
        y: graby,
      });
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      const minX = chessboard.offsetLeft - GRID_SIZE / 4;
      const maxX =
        chessboard.offsetLeft + chessboard.clientWidth - (3 * GRID_SIZE) / 4;
      const minY = chessboard.offsetTop - GRID_SIZE / 4;
      const maxY =
        chessboard.offsetTop + chessboard.clientHeight - (3 * GRID_SIZE) / 4;
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
      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );
      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        const pawnDirection = currentPiece.team === Team.White ? 1 : -1;
        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.Pawn) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        }
        if (validMove) {
          const undatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.Pawn;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.Pawn) {
                piece.enPassant = false;
              }
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
  for (let j = VERTICAL.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL.length; i++) {
      const num = j + i;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;
      board.push(
        <Tiles
          number={num}
          image={image}
          key={`${HORIZONTAL[i]}${VERTICAL[j]}`}
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
