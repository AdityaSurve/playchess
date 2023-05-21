import { Piece, Position, Team } from "../Constants";
import { isEmptyOrOccupiedByOpponent } from "./General";

export const queenMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    Math.abs(desiredPosition.x - initialPosition.x) ===
      Math.abs(desiredPosition.y - initialPosition.y) ||
    desiredPosition.x === initialPosition.x ||
    desiredPosition.y === initialPosition.y
  ) {
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};
