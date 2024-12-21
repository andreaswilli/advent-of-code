with import ./pkgs.nix;
with import ./lists.nix;
with import ./logic.nix;
rec {
  abs = x: if (x < 0) then -x else x;
  const = val: _: val;
  sum = foldl' add 0;
  mul = builtins.mul;
  prod = fold mul 1;
  mod = n: m: m - n * (m / n);
  divisibleBy = divisor: dividend: mod divisor dividend == 0;
  even = divisibleBy 2;
  odd = not even;
  pow = base: exp: listOfLen exp |> map (const base) |> prod;

  numDigits = n: if n < 10 then 1 else 1 + numDigits (n / 10);
  concat = a: b: b |> numDigits |> pow 10 |> mul a |> add b;

  getCount = counter: el: if (counter ? ${el}) then counter.${el} else 0;
  toCounter = toCounterBy (id: id);
  toCounterBy = keyFn: l: l |> groupBy keyFn |> mapAttrs (name: val: length val);
}
