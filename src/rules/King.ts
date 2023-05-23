import { Piece, Position, Team } from "../Constants";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./General";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: Team,
  boardState: Piece[]
) => {
  if (
    Math.abs(desiredPosition.x - initialPosition.x) <= 1 &&
    Math.abs(desiredPosition.y - initialPosition.y) <= 1
  ) {
    if (isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
      return true;
  }
  return false;
};

export const getPossibleKingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x,
      y: king.position.y + i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x,
      y: king.position.y - i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y + i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }

    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x + i,
      y: king.position.y - i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y - i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: king.position.x - i,
      y: king.position.y + i,
    };
    if (
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    ) {
      break;
    }
    if (!isOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, king.team, boardState)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return possibleMoves;
};
