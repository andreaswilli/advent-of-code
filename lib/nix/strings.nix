with import ./pkgs.nix;
rec {
  charAt = str: i: substring i 1 str;
  toChars =
    str:
    let
      l = stringLength str;
    in
    if (l == 0) then [ ] else [ (charAt str 0) ] ++ toChars (substring 1 (l - 1) str);
  reverseString = str: str |> toChars |> reverseList |> concatStrings;
}
