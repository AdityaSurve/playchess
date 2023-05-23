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
  for (let i = -1; i <= 2; i += 2) {
    for (let j = -1; j <= 2; j += 2) {
      const verticalMoves: Position = {
        x: knight.position.x + j,
        y: knight.position.y + i * 2,
      };
      const horizontalMoves: Position = {
        x: knight.position.x + i * 2,
        y: knight.position.y + j,
      };
      if (isEmptyOrOccupiedByOpponent(verticalMoves, knight.team, boardState))
        possibleMoves.push(verticalMoves);
      if (isEmptyOrOccupiedByOpponent(horizontalMoves, knight.team, boardState))
        possibleMoves.push(horizontalMoves);
    }
  }
  return possibleMoves;
};
