with (import <nixpkgs> { }).lib;
with (import ../../lib/nix);
let
  reports =
    readFile ./input.txt |> trim |> splitString "\n" |> map (splitString " ") |> map (map toInt);
  dist1To3 = dist: dist >= 1 && dist <= 3;
  increasing = { fst, snd }: snd - fst |> dist1To3;
  decreasing = { fst, snd }: fst - snd |> dist1To3;
  safe = report: report |> slidingWindow2 |> (line: all increasing line || all decreasing line);
  dampen = report: range 0 (length report - 1) |> map (idx: ifilter0 (i: v: i != idx) report);
in
{
  part1 = reports |> count safe;
  part2 = reports |> map dampen |> count (any safe);
}
