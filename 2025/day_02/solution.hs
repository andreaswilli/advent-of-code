import Data.List (isPrefixOf)
import Distribution.Utils.String (trim)

split :: Char -> String -> [String]
split c s = case dropWhile (== c) s of
  "" -> []
  s' -> w : split c s''
    where
      (w, s'') = break (== c) s'

parseRanges :: String -> [Int]
parseRanges content =
  let rawRanges = split ',' . trim $ content
      ranges = map (split '-') rawRanges
      intRanges = map (map read) ranges
      fullRanges = map (\[start, end] -> [start .. end]) intRanges
   in concat fullRanges

repeatsHalf :: Int -> Bool
repeatsHalf i
  | odd len = False
  | otherwise = take (len `div` 2) s == drop (len `div` 2) s
  where
    s = show i
    len = length s

repeatsAny :: Int -> Bool
repeatsAny i = _repeatsAny "" (show i)

_repeatsPattern :: String -> String -> Bool
_repeatsPattern "" _ = False
_repeatsPattern p "" = True
_repeatsPattern p s = p `isPrefixOf` s && _repeatsPattern p (drop (length p) s)

_repeatsAny :: String -> String -> Bool
_repeatsAny _ "" = False
_repeatsAny p s@(h : t) = _repeatsPattern p s || _repeatsAny (p ++ [h]) t

main = do
  content <- readFile "2025/day_02/input.txt"
  let ranges = parseRanges content
  let invalidKeys1 = filter repeatsHalf ranges
  let invalidKeys2 = filter repeatsAny ranges
  print (sum invalidKeys1, sum invalidKeys2)
