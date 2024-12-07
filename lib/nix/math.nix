with (import <nixpkgs> { }).lib;
rec {
  abs = x: if (x < 0) then -x else x;
  sum = fold add 0;

  getCount = counter: el: if (counter ? ${el}) then counter.${el} else 0;
  toCounter = fold (x: acc: acc // { ${x} = (getCount acc x) + 1; }) { };
}
