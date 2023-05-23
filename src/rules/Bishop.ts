import { Piece, Position, Team } from "../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./General";

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    Math.abs(desiredPosition.x - initialPosition.x) ===
    Math.abs(desiredPosition.y - initialPosition.y)
  ) {
    const xDirection = desiredPosition.x - initialPosition.x > 0 ? 1 : -1;
    const yDirection = desiredPosition.y - initialPosition.y > 0 ? 1 : -1;
    let x = initialPosition.x + xDirection;
    let y = initialPosition.y + yDirection;
    while (x !== desiredPosition.x && y !== desiredPosition.y) {
      if (isOccupied({ x, y }, boardState)) return false;
      x += xDirection;
      y += yDirection;
    }
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};

export const getPossibleBishopMoves = (
  bishop: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y + i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, bishop.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x + i,
      y: bishop.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, bishop.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, bishop.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: bishop.position.x - i,
      y: bishop.position.y + i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, bishop.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMoves;
};
