---
title: "AoC '23 1A"
date: 2023-01-11
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
math: true
series: "advent of code in rust"
---

## Problem

We have a bunch of numbers, separated by blank lines.

<!--more-->

https://adventofcode.com/2022/day/1

We are given a list:

```python
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

Each group is delineated by the blank line. We need to find the sum of all the numbers in the largest group.

## Initial Approach

For this one, we only need to iterate through the list once. We can collect a cumulative sum and compare it at the end of each group. Since we only need to find a single largest sum, we can discard any that aren't larger.

```python
def get_largest_group(lines)
    cumsum = 0
    largest = 0
    for line in lines:
        if line is "":
            if cumsum < largest:
                largest = cumsum
            cumsum = 0
        else:
            cumsum += line
    return largest
```

Expected runtime: $$O(n)$$ for \\(n\\) lines in the file.

## Solution

```rust
pub fn part_one(input: &str) -> Option<u32> {
    let mut calsum: u32 = 0;
    let mut largest: u32 = 0;

    for val in input.lines() {
        if val.eq("") {
            if calsum > largest {
                largest = calsum;
            }
            calsum = 0;
        } else {
            calsum += val.parse::<u32>().unwrap();
        }
    }
    return Some(largest);
}
```

I abstracted away the file reading part, because I am using the (excellent) [advent-of-code-rust](https://github.com/fspoettel/advent-of-code-rust) template. Although I want to learn the system stuff eventually, for now I'm focused on solving the puzzles in the language.

This first puzzle was very easy, which is great! I didn't even need to fight the borrow checker.

I think what I am really appreciating about Rust so far, especially coming from a C programming background, is the emphasis on "covering your bases." This is a simple example, but we can see hints of what Rust is doing to protect us, because we specify `Option` as the return type. If we were to use this function, we would need to catch both the None and the u32 type that this function could return. Alternatively, we can write u32 as the return type, but in that case we would need to ensure that either every branch returns a u32 or panics.
