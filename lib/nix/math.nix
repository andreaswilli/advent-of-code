with import ./pkgs.nix;
rec {
  abs = x: if (x < 0) then -x else x;
  sum = fold add 0;
  prod = fold builtins.mul 1;
  mod = n: m: m - n * (m / n);

  getCount = counter: el: if (counter ? ${el}) then counter.${el} else 0;
  toCounter = toCounterBy (id: id);
  toCounterBy = keyFn: l: l |> groupBy keyFn |> mapAttrs (name: val: length val);
}
