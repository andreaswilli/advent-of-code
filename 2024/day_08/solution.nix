with (import ../../lib/nix);
let
  grid = readFile ./input.txt |> trim |> splitString "\n" |> map toChars;
  h = grid |> length;
  w = elemAt grid 0 |> length;

  antinodes =
    { fst, snd }:
    [
      {
        row = 2 * fst.row - snd.row;
        col = 2 * fst.col - snd.col;
      }
      {
        row = 2 * snd.row - fst.row;
        col = 2 * snd.col - fst.col;
      }
    ];

  allAntinodes =
    { fst, snd }:
    {
      rows = intervalInRange 0 (h - 1) fst.row snd.row;
      cols = intervalInRange 0 (w - 1) fst.col snd.col;
    }
    |> zipListsAlignAt fst;

  zipListsAlignAt =
    { row, col, ... }:
    { rows, cols }:
    let
      rowIdx = indexOf row rows;
      colIdx = indexOf col cols;
    in
    (
      if (rowIdx > colIdx) then
        zipLists (rows |> sublist (rowIdx - colIdx) (length rows)) cols
      else
        zipLists rows (cols |> sublist (colIdx - rowIdx) (length cols))
    )
    |> map (
      { fst, snd }:
      {
        row = fst;
        col = snd;
      }
    );

  intervalInRange =
    min: max: a: b:
    let
      dist = a - b;
      span = max - min + 1;
    in
    (
      if (dist == 0) then
        listOfLen span |> map (const a)
      else
        range 0 (span - 1) |> filter (i: i - (mod dist a) |> divisibleBy dist)
    )
    |> (l: if (dist < 0) then reverseList l else l);

  antennaPairs =
    grid
    |> withCoords
    |> map (filter ({ val, ... }: val != "."))
    |> flatten
    |> groupBy (getAttr "val")
    |> attrValues
    |> map distinctPairs
    |> flatten;

  calculateImpact = antinodes: antinodes |> flatten |> unique |> filter (inBoundsOf grid) |> length;
in
{
  part1 = antennaPairs |> map antinodes |> calculateImpact;
  part2 = antennaPairs |> map allAntinodes |> calculateImpact;
}
