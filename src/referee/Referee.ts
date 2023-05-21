import { PieceType, Team, Piece, Position, samePosition } from "../Constants";

export default class Referee {
  isEmptyOrOccupiedByOpponent(
    position: Position,
    team: Team,
    boardState: Piece[]
  ) {
    return (
      !this.isOccupied(position, boardState) ||
      this.isOccupiedByOpponent(position, team, boardState)
    );
  }
  isOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));
    if (piece) return true;
    return false;
  }
  isOccupiedByOpponent(
    position: Position,
    team: Team,
    boardState: Piece[]
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    );
    if (piece) return true;
    return false;
  }
  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    const pawnDirection = team === Team.White ? 1 : -1;

    if (type === PieceType.Pawn) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }
  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    if (type === PieceType.Pawn) {
      const specialRow = team === Team.White ? 1 : 6;
      const pawnDirection = team === Team.White ? 1 : -1;
      if (initialPosition.x === desiredPosition.x) {
        if (
          initialPosition.y === specialRow &&
          desiredPosition.y - initialPosition.y === 2 * pawnDirection
        ) {
          if (
            !this.isOccupied(desiredPosition, boardState) &&
            !this.isOccupied(
              { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
              boardState
            )
          )
            return true;
        } else if (desiredPosition.y - initialPosition.y === pawnDirection) {
          if (!this.isOccupied(desiredPosition, boardState)) return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (this.isOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (this.isOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      }
    } else if (type === PieceType.Knight) {
      if (
        (Math.abs(desiredPosition.x - initialPosition.x) === 2 &&
          Math.abs(desiredPosition.y - initialPosition.y) === 1) ||
        (Math.abs(desiredPosition.x - initialPosition.x) === 1 &&
          Math.abs(desiredPosition.y - initialPosition.y) === 2)
      ) {
        if (this.isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      }
    } else if (type === PieceType.Bishop) {
      if (
        Math.abs(desiredPosition.x - initialPosition.x) ===
        Math.abs(desiredPosition.y - initialPosition.y)
      ) {
        const xDirection = desiredPosition.x - initialPosition.x > 0 ? 1 : -1;
        const yDirection = desiredPosition.y - initialPosition.y > 0 ? 1 : -1;
        let x = initialPosition.x + xDirection;
        let y = initialPosition.y + yDirection;
        while (x !== desiredPosition.x && y !== desiredPosition.y) {
          if (this.isOccupied({ x, y }, boardState)) return false;
          x += xDirection;
          y += yDirection;
        }
        if (this.isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      }
    } else if (type === PieceType.Rook) {
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
          if (this.isOccupied({ x, y }, boardState)) return false;
          x += xDirection;
          y += yDirection;
        }
        if (this.isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      }
    } else if (type === PieceType.Queen) {
      if (
        Math.abs(desiredPosition.x - initialPosition.x) ===
          Math.abs(desiredPosition.y - initialPosition.y) ||
        desiredPosition.x === initialPosition.x ||
        desiredPosition.y === initialPosition.y
      ) {
        if (this.isEmptyOrOccupiedByOpponent(desiredPosition, team, boardState))
          return true;
      }
    }
    return false;
  }
}
