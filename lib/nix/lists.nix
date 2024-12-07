with (import <nixpkgs> { }).lib;
let
  _mergeOrderedLists =
    res: compare: a: b:
    res
    ++ (
      if (length a == 0) then
        b
      else if (length b == 0) then
        a
      else
        let
          compRes = compare (head a) (head b);
        in
        if (compRes < 0) then
          [ (head a) ] ++ (_mergeOrderedLists res compare (tail a) b)
        else
          [ (head b) ] ++ (_mergeOrderedLists res compare a (tail b))
    );
in
rec {
  slidingWindow2 = l: zipLists l (tail l);

  mergeOrderedLists = _mergeOrderedLists [ ];
  mergeAllOrderedLists = compare: lists: lists |> fold (mergeOrderedLists compare) [ ];
}
