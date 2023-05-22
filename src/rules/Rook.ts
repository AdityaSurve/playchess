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

export const getPossibleRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  const possiblePositions: Position[] = [];
  for (let i = 1; i < 8; i++) {
    possiblePositions.push(
      { x: rook.position.x + i, y: rook.position.y },
      { x: rook.position.x - i, y: rook.position.y },
      { x: rook.position.x, y: rook.position.y + i },
      { x: rook.position.x, y: rook.position.y - i }
    );
  }
  possiblePositions.forEach((position) => {
    if (rookMove(rook.position, position, rook.team, boardState))
      possibleMoves.push(position);
  });
  return possibleMoves;
};
