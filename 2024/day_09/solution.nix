with (import ../../lib/nix);
let
  disk =
    readFile ./input.txt
    |> trim
    |> toChars
    |> map toInt
    |> imap0 (
      i: size: {
        inherit size;
        id = i / 2;
        isFile = even i;
      }
    );

  compactBlocks =
    disk:
    genericClosure {
      startSet =
        if (length disk < 2) then
          [ ]
        else
          [
            rec {
              key = "${toString lo}-${toString hi}";
              lo = 0;
              hi = length disk - 1;
              alreadyUsedSpace = 0;
              alreadyMovedSpace = 0;
              result = [ ];
            }
          ];
      operator =
        item:
        if (item.hi < item.lo) then
          [ ]
        else
          let
            freeBlocks = elemAt disk item.lo;
            blocksToMove = elemAt disk item.hi;
            extraFreeSpace =
              freeBlocks.size - item.alreadyUsedSpace - (blocksToMove.size - item.alreadyMovedSpace);
          in
          [
            (
              if (!blocksToMove.isFile) then
                rec {
                  key = "${toString lo}-${toString hi}-${toString alreadyUsedSpace}";
                  lo = item.lo;
                  hi = item.hi - 1;
                  alreadyUsedSpace = item.alreadyUsedSpace;
                  alreadyMovedSpace = 0;
                  result = item.result;
                }
              else if (freeBlocks.isFile) then
                rec {
                  key = "${toString lo}-${toString hi}-${toString alreadyMovedSpace}";
                  lo = item.lo + 1;
                  hi = item.hi;
                  alreadyUsedSpace = 0;
                  alreadyMovedSpace = item.alreadyMovedSpace;
                  result = item.result ++ [
                    (
                      freeBlocks
                      // {
                        size = if (item.lo == item.hi) then freeBlocks.size - item.alreadyMovedSpace else freeBlocks.size;
                      }
                    )
                  ];
                }
              else if (extraFreeSpace > 0) then
                rec {
                  key = "${toString lo}-${toString hi}-${toString alreadyUsedSpace}";
                  lo = item.lo;
                  hi = item.hi - 1;
                  alreadyUsedSpace = item.alreadyUsedSpace + blocksToMove.size - item.alreadyMovedSpace;
                  alreadyMovedSpace = 0;
                  result = item.result ++ [
                    (blocksToMove // { size = blocksToMove.size - item.alreadyMovedSpace; })
                  ];
                }
              else if (extraFreeSpace == 0) then
                rec {
                  key = "${toString lo}-${toString hi}";
                  lo = item.lo + 1;
                  hi = item.hi - 1;
                  alreadyUsedSpace = 0;
                  alreadyMovedSpace = 0;
                  result = item.result ++ [
                    (blocksToMove // { size = blocksToMove.size - item.alreadyMovedSpace; })
                  ];
                }
              else
                rec {
                  key = "${toString lo}-${toString hi}-${toString alreadyMovedSpace}";
                  lo = item.lo + 1;
                  hi = item.hi;
                  alreadyUsedSpace = 0;
                  alreadyMovedSpace = item.alreadyMovedSpace + freeBlocks.size - item.alreadyUsedSpace;
                  result = item.result ++ [
                    (blocksToMove // { size = freeBlocks.size - item.alreadyUsedSpace; })
                  ];
                }
            )
          ];
    }
    |> filter (item: item.lo > item.hi)
    |> map (getAttr "result")
    |> flatten;

  checksum =
    files:
    files |> foldl' (acc: file: acc ++ (repeat file.size file.id)) [ ] |> imap0 (i: id: i * id) |> sum;
in
{
  part1 = disk |> compactBlocks |> checksum;
  part2 = disk |> compactFiles;
}
