import { Piece, Position, Team, samePosition } from "../Constants";
export const isEmptyOrOccupiedByOpponent = (
  position: Position,
  team: Team,
  boardState: Piece[]
) => {
  return (
    !isOccupied(position, boardState) ||
    isOccupiedByOpponent(position, team, boardState)
  );
};
export const isOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position));
  if (piece) return true;
  return false;
};
export const isOccupiedByOpponent = (
  position: Position,
  team: Team,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find(
    (p) => samePosition(p.position, position) && p.team !== team
  );
  if (piece) return true;
  return false;
};
