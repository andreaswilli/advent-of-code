with import ./pkgs.nix;
rec {
  matchAll =
    pattern: str:
    let
      m = match ".*(${pattern})(.*)" str;
      idxMatch = stringLength str - stringLength (head m) - stringLength (last m);
    in
    if (m == null) then
      [ ]
    else
      matchAll pattern (substring 0 idxMatch str)
      ++ [
        {
          idx = idxMatch;
          val = (sublist 1 (length m - 2) m);
        }
      ];
  matchAllValue = pattern: str: matchAll pattern str |> map (getAttr "val");
  matchAllIndex = pattern: str: matchAll pattern str |> map (getAttr "idx");
}
