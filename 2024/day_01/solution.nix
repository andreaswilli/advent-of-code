with (import <nixpkgs> { }).lib;
let
  abs = x: if (x < 0) then -x else x;
  sum = fold add 0;
  lines = readFile ./input.txt |> trim |> splitString "\n" |> map (splitString "   ");
  leftRight = (
    lines: {
      left = lines |> map head;
      right = lines |> map last;
    }
  );
  getCount = counter: el: if (counter ? ${el}) then counter.${el} else 0;
  toCounter = fold (x: acc: acc // { ${x} = (getCount acc x) + 1; }) { };
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
