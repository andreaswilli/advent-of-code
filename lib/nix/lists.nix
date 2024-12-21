with import ./pkgs.nix;
with import ./logic.nix;
with import ./math.nix;
rec {
  indexOf = x: l: lists.findFirstIndex (el: el == x) null l;
  includes = x: l: indexOf x l != null;
  listOfLen = n: range 1 n |> map (const null);
  slidingWindow2 = l: zipLists l (tail l);
  distinctPairs =
    l:
    cartesianProduct {
      fst = l;
      snd = l;
    }
    |> (filter ({ fst, snd }: if (fst.row != snd.row) then fst.row < snd.row else fst.col < snd.col));

  mergeOrderedLists =
    compare: a: b:
    if (length a == 0) then
      b
    else if (length b == 0) then
      a
    else
      let
        compRes = compare (head a) (head b);
      in
      if (compRes < 0) then
        [ (head a) ] ++ (mergeOrderedLists compare (tail a) b)
      else
        [ (head b) ] ++ (mergeOrderedLists compare a (tail b));
  mergeAllOrderedLists = compare: lists: lists |> fold (mergeOrderedLists compare) [ ];
}
