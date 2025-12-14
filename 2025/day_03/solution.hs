parseBanks :: String -> [[Int]]
parseBanks content = map (map (read . (: []))) (lines content)

joltage :: Int -> [Int] -> Int
joltage 1 bank = maximum bank
joltage n bank =
  let indexedBank = zip bank [0, -1 ..]
      (firstVal, i) = maximum (take (length bank - (n - 1)) indexedBank)
   in firstVal * 10 ^ (n - 1) + joltage (n - 1) (drop (abs i + 1) bank)

main = do
  content <- readFile "2025/day_03/input.txt"
  let banks = parseBanks content
  let joltages2 = map (joltage 2) banks
  let joltages12 = map (joltage 12) banks
  print (sum joltages2, sum joltages12)
