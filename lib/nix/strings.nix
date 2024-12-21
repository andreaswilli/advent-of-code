with import ./pkgs.nix;
with import ./lists.nix;
rec {
  charAt = str: i: substring i 1 str;
  toChars =
    str:
    let
      len = stringLength str;
    in
    genericClosure {
      startSet =
        if (len > 0) then
          [
            {
              key = len - 1;
              val = charAt str 0;
            }
          ]
        else
          [ ];
      operator =
        { key, val }:
        if (key > 0) then
          [
            {
              key = key - 1;
              val = charAt (substring (len - key) key str) 0;
            }
          ]
        else
          [ ];
    }
    |> map (getAttr "val");

  reverseString = str: str |> toChars |> reverseList |> concatStrings;
  repeatString = n: str: listOfLen n |> map (const str) |> concatStrings;
}
