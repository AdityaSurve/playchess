import { PieceType, Team, Piece, Position } from "../Constants";

export default class Referee {
  isOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
    if (piece) return true;
    return false;
  }
  isOccupiedByOpponent(
    x: number,
    y: number,
    team: Team,
    boardState: Piece[]
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
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
            !this.isOccupied(
              desiredPosition.x,
              desiredPosition.y,
              boardState
            ) &&
            !this.isOccupied(
              desiredPosition.x,
              desiredPosition.y - pawnDirection,
              boardState
            )
          )
            return true;
        } else if (desiredPosition.y - initialPosition.y === pawnDirection) {
          if (
            !this.isOccupied(desiredPosition.x, desiredPosition.y, boardState)
          )
            return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.isOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            team,
            boardState
          )
        )
          return true;
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.isOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            team,
            boardState
          )
        )
          return true;
      }
    }
    return false;
  }
}
