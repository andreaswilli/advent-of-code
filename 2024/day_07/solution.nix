with (import ../../lib/nix);
let
  equations =
    readFile ./input.txt
    |> trim
    |> splitString "\n"
    |> map (
      eq:
      let
        parts = eq |> splitString ": ";
      in
      {
        result = head parts |> toInt;
        operands = last parts |> splitString " " |> map toInt;
      }
    );

  _check =
    res: operators: curRes: operands:
    if (curRes > res) then
      false
    else if (length operands == 0) then
      res == curRes
    else
      operators |> any (op: _check res operators (op curRes (head operands)) (tail operands));
  check = operators: ({ result, operands }: _check result operators (head operands) (tail operands));
  result = equations: equations |> map (getAttr "result") |> sum;
in
{
  part1 =
    equations
    |> filter (check [
      add
      mul
    ])
    |> result;

  part2 =
    equations
    |> filter (check [
      add
      mul
      concat
    ])
    |> result;
}
