with (import <nixpkgs> { }).lib;
let
  _matchAll =
    matches: pattern: str:
    let
      m = match ".*(${pattern})(.*)" str;
      idxMatch = stringLength str - stringLength (head m) - stringLength (last m);
    in
    if (m == null) then
      matches
    else
      _matchAll (
        [
          {
            idx = idxMatch;
            val = (sublist 1 (length m - 2) m);
          }
        ]
        ++ matches
      ) pattern (substring 0 idxMatch str);
in
rec {
  matchAll = _matchAll [ ];
  matchAllValue = pattern: str: matchAll pattern str |> map (getAttr "val");
  matchAllIndex = pattern: str: matchAll pattern str |> map (getAttr "idx");
}
