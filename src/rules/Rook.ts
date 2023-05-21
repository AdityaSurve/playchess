import { Piece, Position, Team } from "../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./General";

export const rookMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    desiredPosition.x === initialPosition.x ||
    desiredPosition.y === initialPosition.y
  ) {
    const xDirection =
      desiredPosition.x - initialPosition.x === 0
        ? 0
        : desiredPosition.x - initialPosition.x > 0
        ? 1
        : -1;
    const yDirection =
      desiredPosition.y - initialPosition.y === 0
        ? 0
        : desiredPosition.y - initialPosition.y > 0
        ? 1
        : -1;
    let x = initialPosition.x + xDirection;
    let y = initialPosition.y + yDirection;
    while (x !== desiredPosition.x || y !== desiredPosition.y) {
      if (isOccupied({ x, y }, boardState)) return false;
      x += xDirection;
      y += yDirection;
    }
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};
