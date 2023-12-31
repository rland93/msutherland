---
title: "AoC '23 2B"
date: 2023-01-25
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
---

## Problem Statement

Still a rock-paper-scissors game. But do we get a new ruleset, no! My
abstracting the ruleset was all for naught. We are given the same "strategy guide":

<!--more-->

```plaintext
A Y
B X
C Z
```

But is X, Y, Z my move? No it is not (we learn that the elf meant to say something different). The X, Y, and Z in part 2 indicates the round result that we _should have gotten_ -- loss, win, or draw.

This turns out to be a very simple change, in part because we _didn't_ abstract away the game logic and instead dealt with game states directly in our switch statement. Saved again by our lack of [premature optimization](https://www.youtube.com/watch?v=74RdET79q40).

## First Sketch

Now. All we are doing is changing the scoring logic. Here's our old logic:

```python
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
```

And here's the new:

```python
    switch (mine, theirs):
        "A", "X" => score += 0 + 3
        "B", "X" => score += 0 + 1
        "C", "X" => score += 0 + 2
        "A", "Y" => score += 3 + 1
        "B", "Y" => score += 3 + 2
        "C", "Y" => score += 3 + 3
        "A", "Z" => score += 6 + 2
        "B", "Z" => score += 6 + 3
        "C", "Z" => score += 6 + 1
```

We can look at the difference on a single line to see how we changed the game
logic. Let's look at "A" and "X". Recall: "A" means that the opponent played
Rock. In the old logic, "X" means I played Rock; in the new logic, "X" means I
lost the game (but we use the game rules to deduce and score what I played!)

```plaintext
     "A",    "X",    Result
Old  rock    rock  we both played rock, so we tied.
New  rock    lost  I lost, so I played scissors.
```

Our new scoring takes into account the result of acquiring the desired win/loss
condition. If my opponent plays rock and I lost, then that must mean I played
scissors and therefore should be scored accordingly.

Why was this such an easy change to make? Well, it's because what we really did
with this `switch` statement (remember, we _could_ have written separate
functions for game logic!) is just list out every possible game state. There are
only 9 of them, which means there are only 9 different ways to score a game,
which means that if we just change those 9 numbers in the right way, we don't
need to write any game logic at all!

At first, I thought it was a little silly that they made such an insignificant change in the game rules -- my solution to part 2 is not much different at all from my solution in part 1! Boring!

Actually, it's interesting to think of the game logic as a [finite state machine](https://en.wikipedia.org/wiki/Finite-state_machine). Rather than write a bunch of game logic, we just wrote out all the states in our FSM. We were able to do this because of the deterministic structure of our game.

## Solution

It's nearly the same.

```rust
pub fn part_two(input: &str) -> Option<u32> {
    let sum: u32 = input
        .lines()
        .map(|l: &str| {
            let moves: &[u8] = l.as_bytes();
            return (moves[0], moves[2]);
        })
        .map(|(left, right)| match (left, right) {
            // lose
            (b'A', b'X') => 0 + 3,
            (b'B', b'X') => 0 + 1,
            (b'C', b'X') => 0 + 2,
            // draw
            (b'A', b'Y') => 3 + 1,
            (b'B', b'Y') => 3 + 2,
            (b'C', b'Y') => 3 + 3,
            // win
            (b'A', b'Z') => 6 + 2,
            (b'B', b'Z') => 6 + 3,
            (b'C', b'Z') => 6 + 1,
            _ => unreachable!("Bad input {:?}", (left, right)),
        })
        .sum();

    return Some(sum);
}
```
