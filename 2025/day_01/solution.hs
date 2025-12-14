parseSteps :: String -> [Int]
parseSteps s = [(if h == 'L' then -1 else 1) * read t | (h : t) <- lines s]

solvePart1 :: Int -> [Int] -> Int
solvePart1 pos [] = 0
solvePart1 pos (h : t) =
  val + solvePart1 nextPos t
  where
    nextPos = (pos + h) `mod` 100
    val = if nextPos == 0 then 1 else 0

solvePart2 :: Int -> [Int] -> Int
solvePart2 pos [] = 0
solvePart2 pos (h : t) =
  rolls + solvePart2 nextPos t
  where
    nextPos = (pos + h) `mod` 100
    rolls =
      length
        ( filter
            (== 0)
            [ (pos + x) `mod` 100 | x <- [(min 1 h) .. (max (-1) h)]
            ]
        )

main = do
  content <- readFile "2025/day_01/input.txt"
  let steps = parseSteps content
  print (solvePart1 50 steps, solvePart2 50 steps)
