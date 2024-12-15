with import ./pkgs.nix;
with (import ./strings.nix);
let
  _traverseDiagonal =
    row: col: grid:
    if (row < 0 || col >= length (elemAt grid row)) then
      [ ]
    else
      [ (elemAt grid row |> (row: elemAt row col)) ] ++ (_traverseDiagonal (row - 1) (col + 1) grid);

  _stringAdapter =
    fn: grid:
    (if (elemAt grid 0 |> isString) then grid |> map toChars else grid)
    |> fn
    |> (
      result: if (elemAt (elemAt result 0) 0 |> isString) then result |> map concatStrings else result
    );

  exports = {
    flip = map reverseList;

    transpose = grid: range 0 (length (head grid) - 1) |> map (i: grid |> map (row: elemAt row i));

    diagonals =
      grid:
      range 0 (length grid + length (head grid) - 2)
      |> map (row: {
        row = min row (length grid - 1);
        col = max 0 (row - (length grid) + 1);
      })
      |> map ({ row, col }: _traverseDiagonal row col grid);

    withCoords = imap0 (
      y: row:
      imap0 (x: val: {
        row = y;
        col = x;
        val = val;
      }) row
    );
  };
in
exports |> mapAttrs (name: val: _stringAdapter val)
