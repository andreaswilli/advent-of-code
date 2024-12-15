with (import ../../lib/nix);
let
  input = readFile ./input.txt |> trim |> splitString "\n\n";
  rules =
    elemAt input 0
    |> splitString "\n"
    |> map (splitString "|")
    |> groupBy' (acc: cur: acc ++ [ (last cur) ]) [ ] (el: head el);
  updates = elemAt input 1 |> splitString "\n" |> map (splitString ",");

  relevantRules = curr: if (rules ? ${curr}) then rules.${curr} else [ ];
  violatedRules = update: i: intersectLists (sublist 0 i update) (relevantRules (elemAt update i));
  isInCorrectOrder =
    update: range 1 (length update - 1) |> all (i: (violatedRules update i |> length) == 0);
  middleElement = l: elemAt l (length l / 2);
  result = updates: updates |> map middleElement |> map toInt |> sum;
  _order =
    l:
    if (length l == 0) then
      [ ]
    else
      let
        next = findFirst (el: length el.rules == 0) null l;
      in
      (l |> remove next |> map (el: el // { rules = remove next.val el.rules; }) |> _order) ++ [ next ];
  order =
    l:
    l
    |> imap0 (
      i: el: {
        val = el;
        rules = relevantRules el |> intersectLists l;
      }
    )
    |> _order
    |> map (el: el.val);
in
{
  part1 = updates |> filter isInCorrectOrder |> result;
  part2 = updates |> filter (update: !isInCorrectOrder update) |> map order |> result;
}
