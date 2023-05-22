import { Piece, Position, Team } from "../Constants";
import { isEmptyOrOccupiedByOpponent } from "./General";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    Math.abs(desiredPosition.x - initialPosition.x) <= 1 &&
    Math.abs(desiredPosition.y - initialPosition.y) <= 1
  ) {
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};

export const getPossibleKingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  const possiblePositions: Position[] = [
    { x: king.position.x + 1, y: king.position.y + 1 },
    { x: king.position.x + 1, y: king.position.y - 1 },
    { x: king.position.x - 1, y: king.position.y + 1 },
    { x: king.position.x - 1, y: king.position.y - 1 },
    { x: king.position.x + 1, y: king.position.y },
    { x: king.position.x - 1, y: king.position.y },
    { x: king.position.x, y: king.position.y + 1 },
    { x: king.position.x, y: king.position.y - 1 },
  ];
  possiblePositions.forEach((position) => {
    if (kingMove(king.position, position, king.team, boardState))
      possibleMoves.push(position);
  });
  return possibleMoves;
};
