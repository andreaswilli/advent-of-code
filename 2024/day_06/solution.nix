with (import ../../lib/nix);
let
  grid = readFile ./input.txt |> trim |> splitString "\n";
  h = grid |> length;
  w = elemAt grid 0 |> stringLength;

  obstacles =
    grid
    |> map (matchAllIndex "#")
    |> imap0 (
      i: matches:
      map (m: {
        name = toKey {
          row = i;
          col = m;
        };
        value = true;
      }) matches
    )
    |> flatten
    |> listToAttrs;

  startPos =
    grid
    |> lists.findFirstIndex (row: match ".*\\^.*" row != null) null
    |> (row: {
      row = row;
      col = elemAt grid row |> matchAllIndex "\\^" |> head;
    });

  dirs = [
    "N"
    "E"
    "S"
    "W"
  ];

  turnRight =
    dir:
    dirs |> lists.findFirstIndex (d: d == dir) null |> add 1 |> mod (length dirs) |> (i: elemAt dirs i);

  toKey =
    {
      row,
      col,
      dir ? null,
    }:
    "${toString row},${toString col}" + (if dir == null then "" else ",${dir}");
  toPos =
    str:
    str
    |> splitString ","
    |> (
      parts:
      {
        row = elemAt parts 0;
        col = elemAt parts 1;
      }
      // (if (length parts == 3) then { dir = elemAt parts 2; } else { })
    );

  isObstacle = pos: obstacles ? ${toKey pos};
  isOutOfBounds = { row, col }: row < 0 || row >= h || col < 0 || col >= w;

  move =
    dir: pos:
    let
      nextPos = moveOneInDir dir pos;
      posAttr = {
        "${toKey pos}" = true;
      };
    in
    if (isOutOfBounds nextPos) then
      posAttr
    else if (isObstacle nextPos) then
      posAttr // move (turnRight dir) pos
    else
      posAttr // move dir nextPos;

  isLoop =
    dir: pos: obstacles: visited:
    let
      isObstacle = pos: obstacles ? ${toKey pos};
      nextPos = moveOneInDir dir pos;
    in
    if (isOutOfBounds nextPos) then
      false
    else if (visited ? ${toKey (pos // { dir = dir; })}) then
      true
    else if (isObstacle nextPos) then
      isLoop (turnRight dir) pos obstacles visited
    else
      isLoop dir nextPos obstacles (visited // { "${toKey (pos // { dir = dir; })}" = true; });

  path = move "N" startPos |> attrNames;
in
{
  part1 = path |> length;
  part2 =
    path
    |> map toPos
    |> remove startPos
    |> map toKey
    |> filter (newObstacle: isLoop "N" startPos (obstacles // { ${newObstacle} = true; }) { })
    |> length;
}
