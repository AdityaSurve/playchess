import { Piece, Position, Team } from "../Constants";
import { isEmptyOrOccupiedByOpponent } from "./General";

export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    (Math.abs(desiredPosition.x - initialPosition.x) === 2 &&
      Math.abs(desiredPosition.y - initialPosition.y) === 1) ||
    (Math.abs(desiredPosition.x - initialPosition.x) === 1 &&
      Math.abs(desiredPosition.y - initialPosition.y) === 2)
  ) {
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};

export const getPossibleKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const possiblePositions: Position[] = [
    { x: knight.position.x + 2, y: knight.position.y + 1 },
    { x: knight.position.x + 2, y: knight.position.y - 1 },
    { x: knight.position.x - 2, y: knight.position.y + 1 },
    { x: knight.position.x - 2, y: knight.position.y - 1 },
    { x: knight.position.x + 1, y: knight.position.y + 2 },
    { x: knight.position.x + 1, y: knight.position.y - 2 },
    { x: knight.position.x - 1, y: knight.position.y + 2 },
    { x: knight.position.x - 1, y: knight.position.y - 2 },
  ];
  possiblePositions.forEach((position) => {
    if (knightMove(knight.position, position, knight.team, boardState))
      possibleMoves.push(position);
  });
  return possibleMoves;
};
