import { Piece, Position, Team } from "../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./General";

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

export const getPossibleQueenMoves = (
  queen: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x,
      y: queen.position.y + i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x,
      y: queen.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x - i,
      y: queen.position.y,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x + i,
      y: queen.position.y,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x + i,
      y: queen.position.y + i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x + i,
      y: queen.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x - i,
      y: queen.position.y - i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 8; i++) {
    const destination: Position = {
      x: queen.position.x - i,
      y: queen.position.y + i,
    };

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, queen.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMoves;
};
