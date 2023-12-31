---
title: "AoC '23 2A"
date: 2023-01-25
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

Once again, we have a text file (I'm noticing a pattern). Day 2 is a rock-paper-scissors game. We are given a "strategy guide":

<!--more-->

```plaintext
A Y
B X
C Z
```

_The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors._ The second column is what I play: X for Rock, Y for Paper, and Z for Scissors.

So, each line of our file is a single round: what the opponent plays, and then what I play. _The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)._

We need the total score for many rounds in a row, as described by the textfile.

## Sketch

This is very straightforward. What we are going to do is iterate through the
textfile, then calculate the score for each line. Calculating score is one
switch and a couple additions: \\(O(1)\\). Iterating through each line is
\\(O(1)\\).

Here is the pseudocode:

```python
def rps_score(input):
    score = 0
    for line in input:
        theirs = line[0]
        mine = line[2] # skip space between
        switch (mine, theirs):
            "A", "X" => score += 3 + 1
            "B", "X" => score += 0 + 1
            "C", "X" => score += 6 + 1
            "A", "Y" => score += 6 + 2
            "B", "Y" => score += 3 + 2
            "C", "Y" => score += 0 + 2
            "A", "Z" => score += 0 + 3
            "B", "Z" => score += 6 + 3
            "C", "Z" => score += 3 + 3
    return score
```

Because there are 3 options and 2 players, it's simple enough to just cover \\( (P_1 \times P_2) \\) in our switch statement directly. If I were dealing with many more cases than that, I would probably reach for a map, something like this

```python
MY_SCORE {
    "A" : 1,
    "B" : 2,
    "C" : 3,
    "D" : 4,
        ...
}

GAME_SCORE {
    "WIN" : 7,
    "LOSS" : 3,
    "DRAW" : 5,
}

def calc_score(mine, theirs):
    winloss = determine_win(mine, theirs)
    return MY_SCORE[mine] + GAME_SCORE[winloss]
```

With something like this, we can abstract out the game logic and scoring -- which would save us the effort of writing a super-complex switch statement.

Let's keep it simple for now, but we'll have this in our back pocket for part B.

## Solution

Now, obviously, I don't know Rust. My natural intuition is to reach for an imperative paradigm:

```python
for line in file.readlines():
    processed = do_something_with_line(line)
```

Or maybe

```python
my_list = []
for line in file.readlines():
    my_list.append(line_fn(line))

for element in my_list:
    ...
```

I looked at a lot of Rust code, and I noticed that this [functional paradigm](https://en.wikipedia.org/wiki/Functional_programming) is used a lot more -- my guess is that Rust's borrow checker forces programmers to think more carefully about managing state, and FP famously makes that a lot easier. I am beginning to warm up to it. So I am using this time to also practice the functional paradigm.

The code is below: the first `.map` extracts the moves from each line; the second `.map` calculates the score; and the final `.sum` accumulates the score.
We can see the functional advantage clearly here: we don't need to make `score` a mutable, because all we are composing functions. This is in contrast to the imperative approach where we might make a mutable score and then add to it in a loop. <sub>Maybe Clojure or Haskell is next?</sub>

```rust
pub fn part_one(input: &str) -> Option<u32> {
    let score: u32 = input
        .lines()
        .map(|l: &str| {
            let moves = l.as_bytes();
            return (moves[0], moves[2]);
        })
        .map(|(left, right)| match (left, right) {
            // Rock
            (b'A', b'X') => 3 + 1,
            (b'B', b'X') => 0 + 1,
            (b'C', b'X') => 6 + 1,
            // Paper
            (b'A', b'Y') => 6 + 2,
            (b'B', b'Y') => 3 + 2,
            (b'C', b'Y') => 0 + 2,
            // Scissors
            (b'A', b'Z') => 0 + 3,
            (b'B', b'Z') => 6 + 3,
            (b'C', b'Z') => 3 + 3,
            _ => unreachable!("Bad input: {:?}", (left, right)),
        })
        .sum();
    return Some(score);
}
```

And that's the halfway point for Day 2!
