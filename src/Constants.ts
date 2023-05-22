export const HORIZONTAL = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRID_SIZE = 80;

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}
export enum Team {
  White,
  Black,
}
export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: Team;
  enPassant?: boolean;
  possibleMoves?: Position[];
}

export const initialBoardState: Piece[] = [
  {
    image: "assets/rook_w.png",
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.Rook,
    team: Team.White,
  },
  {
    image: "assets/rook_w.png",
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.Rook,
    team: Team.White,
  },
  {
    image: "assets/rook_b.png",
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.Rook,
    team: Team.Black,
  },
  {
    image: "assets/rook_b.png",
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.Rook,
    team: Team.Black,
  },
  {
    image: "assets/knight_w.png",
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.Knight,
    team: Team.White,
  },
  {
    image: "assets/knight_w.png",
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.Knight,
    team: Team.White,
  },
  {
    image: "assets/knight_b.png",
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.Knight,
    team: Team.Black,
  },
  {
    image: "assets/knight_b.png",
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.Knight,
    team: Team.Black,
  },
  {
    image: "assets/bishop_w.png",
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.Bishop,
    team: Team.White,
  },
  {
    image: "assets/bishop_w.png",
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.Bishop,
    team: Team.White,
  },
  {
    image: "assets/bishop_b.png",
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.Bishop,
    team: Team.Black,
  },
  {
    image: "assets/bishop_b.png",
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.Bishop,
    team: Team.Black,
  },
  {
    image: "assets/queen_w.png",
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.Queen,
    team: Team.White,
  },
  {
    image: "assets/king_w.png",
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.King,
    team: Team.White,
  },
  {
    image: "assets/queen_b.png",
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.Queen,
    team: Team.Black,
  },
  {
    image: "assets/king_b.png",
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.King,
    team: Team.Black,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_w.png",
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.Pawn,
    team: Team.White,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
  {
    image: "assets/pawn_b.png",
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.Pawn,
    team: Team.Black,
  },
];
