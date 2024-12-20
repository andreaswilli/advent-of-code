with import ./pkgs.nix;
rec {
  abs = x: if (x < 0) then -x else x;
  sum = fold add 0;
  mul = builtins.mul;
  prod = fold mul 1;
  mod = n: m: m - n * (m / n);
  pow = base: exp: range 1 exp |> map (i: base) |> prod;

  numDigits = n: if n < 10 then 1 else 1 + numDigits (n / 10);
  concat = a: b: b |> numDigits |> pow 10 |> mul a |> add b;

  getCount = counter: el: if (counter ? ${el}) then counter.${el} else 0;
  toCounter = toCounterBy (id: id);
  toCounterBy = keyFn: l: l |> groupBy keyFn |> mapAttrs (name: val: length val);
}
