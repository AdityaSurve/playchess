import { useEffect, useRef, useState } from "react";
import {
  Piece,
  PieceType,
  Position,
  Team,
  initialBoardState,
  samePosition,
} from "../Constants";
import ChessBoard from "./ChessBoard";
import { getPossiblePawnMoves, pawnMove } from "../rules/Pawn";
import { getPossibleKnightMoves, knightMove } from "../rules/Knight";
import { bishopMove, getPossibleBishopMoves } from "../rules/Bishop";
import { getPossibleRookMoves, rookMove } from "../rules/Rook";
import { getPossibleQueenMoves, queenMove } from "../rules/Queen";
import { getPossibleKingMoves, kingMove } from "../rules/King";

export default function Referee() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    updatePossibleMoves();
  }, []);
  function updatePossibleMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = getValidMoves(p, currentPieces);
        return p;
      });
    });
  }
  function playMove(playedPiece: Piece, destination: Position): boolean {
    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );
    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );
    const pawnDirection = playedPiece.team === Team.White ? 1 : -1;
    if (enPassantMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          piece.enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !samePosition(piece.position, {
            x: destination.x,
            y: destination.y - pawnDirection,
          })
        ) {
          if (piece.type === PieceType.Pawn) {
            piece.enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      updatePossibleMoves();
      setPieces(updatedPieces);
    }
    if (validMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          piece.enPassant =
            Math.abs(playedPiece.position.y - destination.y) === 2 &&
            piece.type === PieceType.Pawn;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          let promotionRow = piece.team === Team.White ? 7 : 0;
          if (destination.y === promotionRow && piece.type === PieceType.Pawn) {
            modalRef.current?.classList.remove("hidden");
            modalRef.current?.classList.add("flex");
            setPromotionPawn(piece);
          }
          results.push(piece);
        } else if (
          !samePosition(piece.position, { x: destination.x, y: destination.y })
        ) {
          if (piece.type === PieceType.Pawn) {
            piece.enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      updatePossibleMoves();
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return true;
  }
  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team
  ) {
    const pawnDirection = team === Team.White ? 1 : -1;

    if (type === PieceType.Pawn) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.Pawn:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.Knight:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.Bishop:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.Rook:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.Queen:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.King:
        return getPossibleKingMoves(piece, boardState);
      default:
        return [];
    }
  }
  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team
  ) {
    let isValid = false;
    switch (type) {
      case PieceType.Pawn:
        isValid = pawnMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.Knight:
        isValid = knightMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.Bishop:
        isValid = bishopMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.Rook:
        isValid = rookMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.Queen:
        isValid = queenMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.King:
        isValid = kingMove(initialPosition, desiredPosition, team, pieces);
    }

    return isValid;
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

  return (
    <div>
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
      <ChessBoard playMove={playMove} pieces={pieces} />
    </div>
  );
}
