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
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function updateValidMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = referee.getValidMoves(p, currentPieces);
        return p;
      });
    });
  }

  function grabPiece(e: React.MouseEvent) {
    updateValidMoves();
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
              let promotionRow = piece.team === Team.White ? 7 : 0;
              if (y === promotionRow && piece.type === PieceType.Pawn) {
                modalRef.current?.classList.remove("hidden");
                modalRef.current?.classList.add("flex");
                setPromotionPawn(piece);
              }
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
  function promotePawn(type: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }
    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = type;
        const teamType = piece.team === Team.White ? "w" : "b";
        let image = "";
        switch (type) {
          case PieceType.Bishop:
            image = "bishop";
            break;
          case PieceType.Knight:
            image = "knight";
            break;
          case PieceType.Queen:
            image = "queen";
            break;
          case PieceType.Rook:
            image = "rook";
            break;
        }
        piece.image = `./assets/${image}_${teamType}.png`;
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);
    setPieces(updatedPieces);
    modalRef.current?.classList.add("hidden");
  }
  function promotionTeamType() {
    return promotionPawn?.team === Team.White ? "w" : "b";
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
        className="justify-center items-center h-[640px] w-[640px] screen fixed bg-transparent hidden"
        ref={modalRef}
      >
        <div className="flex flex-row justify-around items-center h-[250px] w-[640px] bg-[#00000080]">
          <div
            onClick={() => promotePawn(PieceType.Rook)}
            className="h-[120px] w-[120px] flex justify-center rounded-full items-center hover:bg-[#ffffff50] hover:cursor-pointer"
          >
            <img
              src={`./assets/rook_${promotionTeamType()}.png`}
              alt=""
              className="h-[80px]"
            />
          </div>
          <div
            onClick={() => promotePawn(PieceType.Bishop)}
            className="h-[120px] w-[120px] flex justify-center rounded-full items-center hover:bg-[#ffffff50] hover:cursor-pointer"
          >
            <img
              src={`./assets/bishop_${promotionTeamType()}.png`}
              alt=""
              className="h-[80px]"
            />
          </div>
          <div
            onClick={() => promotePawn(PieceType.Knight)}
            className="h-[120px] w-[120px] flex justify-center rounded-full items-center hover:bg-[#ffffff50] hover:cursor-pointer"
          >
            <img
              src={`./assets/knight_${promotionTeamType()}.png`}
              alt=""
              className="h-[80px]"
            />
          </div>
          <div
            onClick={() => promotePawn(PieceType.Queen)}
            className="h-[120px] w-[120px] flex justify-center rounded-full items-center hover:bg-[#ffffff50] hover:cursor-pointer"
          >
            <img
              src={`./assets/queen_${promotionTeamType()}.png`}
              alt=""
              className="h-[80px]"
            />
          </div>
        </div>
      </div>
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
