with (import <nixpkgs> { }).lib;
{
  slidingWindow2 = l: zipLists l (tail l);
}
