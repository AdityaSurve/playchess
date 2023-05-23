import { Piece, Position, Team, samePosition } from "../Constants";
import { isOccupied, isOccupiedByOpponent } from "./General";
export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
): boolean => {
  const specialRow = team === Team.White ? 1 : 6;
  const pawnDirection = team === Team.White ? 1 : -1;
  if (initialPosition.x === desiredPosition.x) {
    if (
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !isOccupied(desiredPosition, boardState) &&
        !isOccupied(
          { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
          boardState
        )
      )
        return true;
    } else if (desiredPosition.y - initialPosition.y === pawnDirection) {
      if (!isOccupied(desiredPosition, boardState)) return true;
    }
  } else if (
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (isOccupiedByOpponent(desiredPosition, team, boardState)) return true;
  } else if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (isOccupiedByOpponent(desiredPosition, team, boardState)) return true;
  }
  return false;
};
export const getPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  const pawnDirection = pawn.team === Team.White ? 1 : -1;
  const specialRow = pawn.team === Team.White ? 1 : 6;

  const normalMove: Position = {
    x: pawn.position.x,
    y: pawn.position.y + pawnDirection,
  };
  const specialMove: Position = {
    x: normalMove.x,
    y: normalMove.y + pawnDirection,
  };
  const upperLeftAttack: Position = {
    x: pawn.position.x - 1,
    y: pawn.position.y + pawnDirection,
  };
  const upperRightAttack: Position = {
    x: pawn.position.x + 1,
    y: pawn.position.y + pawnDirection,
  };
  const leftPosition: Position = {
    x: pawn.position.x - 1,
    y: pawn.position.y,
  };
  const rightPosition: Position = {
    x: pawn.position.x + 1,
    y: pawn.position.y,
  };

  if (!isOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);
    if (
      pawn.position.y === specialRow &&
      !isOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }
  if (isOccupiedByOpponent(upperLeftAttack, pawn.team, boardState)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!isOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) =>
      samePosition(p.position, leftPosition)
    );
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }
  if (isOccupiedByOpponent(upperRightAttack, pawn.team, boardState)) {
    possibleMoves.push(upperRightAttack);
  } else if (!isOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) =>
      samePosition(p.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMoves.push(upperRightAttack);
    }
  }
  return possibleMoves;
};
