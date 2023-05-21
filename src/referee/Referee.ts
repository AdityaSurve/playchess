import { PieceType, Team, Piece } from "../components/ChessBoard";

export default class Referee {
  isOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
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
      (p) => p.x === x && p.y === y && p.team !== team
    );
    if (piece) return true;
    return false;
  }
  isEnPassantMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    const pawnDirection = team === Team.White ? 1 : -1;

    if (type === PieceType.Pawn) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: Team,
    boardState: Piece[]
  ) {
    if (type === PieceType.Pawn) {
      const specialRow = team === Team.White ? 1 : 6;
      const pawnDirection = team === Team.White ? 1 : -1;
      if (px === x) {
        if (py === specialRow && y - py === 2 * pawnDirection) {
          if (
            !this.isOccupied(x, y, boardState) &&
            !this.isOccupied(x, y - pawnDirection, boardState)
          )
            return true;
        } else if (y - py === pawnDirection) {
          if (!this.isOccupied(x, y, boardState)) return true;
        }
      } else if (x - px === -1 && y - py === pawnDirection) {
        if (this.isOccupiedByOpponent(x, y, team, boardState)) return true;
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.isOccupiedByOpponent(x, y, team, boardState)) return true;
      }
    }
    return false;
  }
}
