with (import <nixpkgs> { }).lib;
with (import ../../lib/nix);
let
  lines = readFile ./input.txt |> trim |> splitString "\n" |> map (splitString "   ");
  leftRight = (
    lines: {
      left = lines |> map head;
      right = lines |> map last;
    }
  );
in
{
  part1 =
    lines
    |> map (map toInt)
    |> leftRight
    |> ({ left, right }: zipLists (sort lessThan left) (sort lessThan right))
    |> map ({ fst, snd }: fst - snd)
    |> map abs
    |> sum;

  part2 =
    lines
    |> leftRight
    |> (
      { left, right }:
      let
        counter = toCounter right;
      in
      left |> map (x: (toInt x) * (getCount counter x))
    )
    |> sum;
}
