import { PieceType, Team } from "../components/ChessBoard";

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: Team
  ) {
    if (type === PieceType.Pawn) {
      if (team === Team.White) {
        if (py === 1) {
          if (x === px && (y === py + 2 || y === py + 1)) {
            return true;
          }
        } else if (x === px && y === py - 1) {
          return true;
        }
      } else {
        if (py === 6) {
          if (x === px && (y === py - 2 || y === py - 2)) {
            return true;
          }
        } else if (x === px && y === py - 1) {
          return true;
        }
      }

      return false;
    }
  }
}
