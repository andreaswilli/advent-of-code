with import ./pkgs.nix;
let
  delta =
    dir:
    let
      containsDir = singleDir: (match ".*${singleDir}.*" dir) != null;
    in
    {
      row =
        if (containsDir "N") then
          -1
        else if (containsDir "S") then
          1
        else
          0;
      col =
        if (containsDir "W") then
          -1
        else if (containsDir "E") then
          1
        else
          0;
    };
in
{
  moveOneInDir =
    dir:
    { row, col }:
    let
      d = delta dir;
    in
    {
      row = row + d.row;
      col = col + d.col;
    };

  inBoundsOf =
    grid:
    { row, col, ... }:
    row >= 0 && row < (length grid) && col >= 0 && col < (length (elemAt grid row));
}
