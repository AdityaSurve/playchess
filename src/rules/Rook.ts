import { Piece, Position, Team } from "../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./General";

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
  for (let i = 1; i < 8; i++) {
    if (rook.position.y + i > 7) break;
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y + i,
    };
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, rook.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rook.position.y - i < 0) break;
    const destination: Position = {
      x: rook.position.x,
      y: rook.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, rook.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rook.position.x - i < 0) break;
    const destination: Position = {
      x: rook.position.x - i,
      y: rook.position.y,
    };
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, rook.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rook.position.x + i > 7) break;
    const destination: Position = {
      x: rook.position.x + i,
      y: rook.position.y,
    };
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, rook.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMoves;
};
