import Tiles from "./Tiles";
import React, { useRef, useState } from "react";
import {
  HORIZONTAL,
  VERTICAL,
  GRID_SIZE,
  Piece,
  Position,
  samePosition,
} from "../Constants";

interface Props {
  playMove: (pieces: Piece, position: Position) => boolean;
  pieces: Piece[];
}

export default function ChessBoard({ playMove, pieces }: Props) {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const chessboardRef = useRef<HTMLDivElement>(null);

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
        var success = playMove(currentPiece, { x, y });
        if (!success) {
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
      let currentPiece =
        activePiece != null
          ? pieces.find((p) => samePosition(p.position, grabPosition))
          : undefined;
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            samePosition(p, { x: i, y: j })
          )
        : false;
      board.push(
        <Tiles
          number={num}
          image={image}
          key={`${HORIZONTAL[i]}${VERTICAL[j]}`}
          highlight={highlight}
        />
      );
    }
  }
  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
}
