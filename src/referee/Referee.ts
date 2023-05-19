import { PieceType, Team, Piece } from "../components/ChessBoard";

export default class Referee {
  isOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) return true;
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
      }
    }
    return false;
  }
}
