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
