with (import <nixpkgs> { }).lib;
with (import ../../lib/nix);
let
  memory = readFile ./input.txt;
  mulPattern = "mul\\(([0-9]{1,3}),([0-9]{1,3})\\)";
  doPattern = "do\\(\\)";
  dontPattern = "don't\\(\\)";
  process = ops: ops |> map (map toInt) |> map prod |> sum;
  enabledOps =
    enabled: ops:
    if (length ops == 0) then
      [ ]
    else if (isBool (head ops)) then
      enabledOps (head ops) (tail ops)
    else
      (if (enabled) then [ (head ops) ] else [ ]) ++ enabledOps enabled (tail ops);
in
{
  part1 = matchAllValue mulPattern memory |> process;

  part2 =
    [
      (matchAll mulPattern memory)
      (matchAll doPattern memory |> map (m: m // { val = true; }))
      (matchAll dontPattern memory |> map (m: m // { val = false; }))
    ]
    |> mergeAllOrderedLists (a: b: a.idx - b.idx)
    |> map (getAttr "val")
    |> enabledOps true
    |> process;
}
