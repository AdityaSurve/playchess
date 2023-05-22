import { PieceType, Team, Piece, Position } from "../Constants";
import { bishopMove } from "../rules/Bishop";
import { kingMove } from "../rules/King";
import { knightMove } from "../rules/Knight";
import { getPossiblePawnMoves, pawnMove } from "../rules/Pawn";
import { queenMove } from "../rules/Queen";
import { rookMove } from "../rules/Rook";

export default class Referee {
  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    const pawnDirection = team === Team.White ? 1 : -1;

    if (type === PieceType.Pawn) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
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

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    let isValid = false;
    switch (type) {
      case PieceType.Pawn:
        isValid = pawnMove(initialPosition, desiredPosition, team, boardState);
        break;
      case PieceType.Knight:
        isValid = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.Bishop:
        isValid = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.Rook:
        isValid = rookMove(initialPosition, desiredPosition, team, boardState);
        break;
      case PieceType.Queen:
        isValid = queenMove(initialPosition, desiredPosition, team, boardState);
        break;
      case PieceType.King:
        isValid = kingMove(initialPosition, desiredPosition, team, boardState);
    }

    return isValid;
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.Pawn:
        return getPossiblePawnMoves(piece, boardState);
      default:
        return [];
    }
  }
}
