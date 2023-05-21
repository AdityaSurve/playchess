import { Piece, Position, Team } from "../Constants";
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
