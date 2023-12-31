---
title: "AoC '23 5A"
date: 2023-03-02
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

We are given an initial state and an ordered set of moves. The state are items in "crates" -- `[P]` is a crate, for example.

We are then asked to make the moves on the initial state; e.g. `move 1 from 2 to 1` calculate the next state. We repeat this process until we reach the terminal state. When we have the terminal stat

```plaintext
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
```

<!--more-->

## Approach

My first thought is to do this in the obvious way, which is to explicitly calculate the full state and the transitions between the states. There are a few aspects to the problem.

One of these is parsing. We need to take this plain-text representation and turn it into a state. This might be a little bit complex, because there are multiple lines, and blank areas (no crate), and the number of lines depends on the state. Finally, we have a number of stacks, probably more than the 3 in the example. Lucky for us, we have regex.

Second, our datastructure. This one seems fairly easy -- it's in the name; we are dealing with stacks, so I'm going to use a FIFO queue. To move an item from one stack to another, we will pop the element from one and push to another. Let's unpack our state transition statements:

`move 1 from 2 to 1`

Let's re-write this a bit. Given a stack \\(Q\\) and a stack \\(P\\) we are going to make a move \\(n\\) times from \\(Q\\) to \\(P\\), by popping from \\(Q\\) and pushing to \\(P\\). Our state transition function looks like this then:

```python
def move(n: int, q: Stack, p: Stack):
    for i in range(0, n):
        element = q.pop()
        p.push(element)
```

With this, we can scaffold our program:

```python
def partA(input: str):
    stacks = parse_state(input)
    for n, src, dst in parse_moves(input):
        move(n, &src, &dst)
    return top_of_stacks(stacks)
```

We have a `parse_state`, that gets the stacks from lines in the input. We have a `parse_moves` that gets the series of moves from lines in the raw input. Finally, we are asked to output only the top items on each stack after the final moves, so we have a helper `top_of_stacks` that will do that.

## Solution
