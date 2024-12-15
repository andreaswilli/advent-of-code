(import (builtins.fetchGit {
  # Descriptive name to make the store path easier to identify
  name = "nixos-unstable-2024-12-15";
  url = "https://github.com/nixos/nixpkgs/";
  # Commit hash for nixos-unstable as of 2024-12-15
  # `git ls-remote https://github.com/nixos/nixpkgs nixos-unstable`
  ref = "refs/heads/nixos-unstable";
  rev = "3566ab7246670a43abd2ffa913cc62dad9cdf7d5";
}) { }).lib
