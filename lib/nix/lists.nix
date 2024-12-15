with import ./pkgs.nix;
rec {
  slidingWindow2 = l: zipLists l (tail l);

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
