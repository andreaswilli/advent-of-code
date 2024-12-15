with (import ../../lib/nix);
let
  grid = readFile ./input.txt |> trim |> splitString "\n";
  wrongSearch = "XMAS";
  search = "MAS";
  matchForwardAndBackwardInGrid =
    s: grid:
    [
      s
      (reverseString s)
    ]
    |> map (
      s:
      imap0 (
        i: row:
        map (match: {
          row = i;
          col = match;
        }) (matchAllIndex s row)
      ) grid
    )
    |> flatten;

  matchInDiagonals =
    grid: getDiagonals:
    grid
    |> getDiagonals
    |> matchForwardAndBackwardInGrid search
    |> map (originalCoords (grid |> withCoords |> getDiagonals));

  originalCoords =
    origGrid:
    { row, col }:
    let
      orig = origGrid |> (diag: elemAt diag row) |> (diagRow: elemAt diagRow col);
    in
    {
      inherit (orig) row col;
    };
in
{
  part1 =
    [
      grid
      (grid |> transpose)
      (grid |> diagonals)
      (grid |> flip |> diagonals)
    ]
    |> map (matchForwardAndBackwardInGrid wrongSearch)
    |> flatten
    |> length;

  part2 =
    [
      (matchInDiagonals grid diagonals |> map (moveOneInDir "NE"))
      (matchInDiagonals grid (grid: grid |> flip |> diagonals) |> map (moveOneInDir "NW"))
    ]
    |> concatLists
    |> toCounterBy ({ row, col }: "${toString row},${toString col}")
    |> filterAttrs (name: val: val > 1)
    |> attrNames
    |> length;
}
