---
title: "AoC '23 4B"
date: 2023-02-14
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

In part 4 B, just like in part A, we need to find overlaps. But now, rather than a subset, we need to find an intersection.

<!--more-->

## Approach

This is even easier than the last. We have two non empty sets \\(A\\) and \\(B\\). This time, we don't need to find the larger of the two sets. Let's label the largest and smallest elements of each: \\(l_a\\), \\(u_a\\), etc. If the two sets overlap, that means that they share some elements. That means that the lower bound of one set must be smaller than the upper bound of the other set. Let's assume that \\(A\\) is always the set with the smallest minimum element (i.e. \\(l_a \leq l_b\\)). If we order the bounds, an intersection might look like this:

$$
l_a \leq l_b \leq u_a \leq u_b
$$

Or this:

$$
l_a \leq l_b \leq u_b \leq u_a
$$

Whereas, if there is no intersection, the bounds will always look like this:

$$
l_a \leq u_a < l_b \leq u_b
$$

In the no-intersection case, there is always some non-zero "padding" between the upper element of \\(A\\) and the lower element of \\(B\\).

A check for this is pretty easy: compare the lower bounds to establish a "bigger value" and a "smaller value" set. Then, check the upper bound of the "smaller value" set against the lower bound of the "bigger value" set. If there's a gap, we have found a mutually exclusive pair; otherwise, the two pairs intersect.

Such an algorithm looks like this:

```python
def part_one(input):
    count = 0
    for line in input:
        # get elements
        l1, l2 = line[0], line[2]
        l3, l4 = line[4], line[6]
        # bigger value / smaller value
        if l1 < l3:
            u_a, l_a = l2, l1
            u_b, l_b = l4, l3
        else:
            u_a, l_a = l4, l3
            u_b, l_b = l2, l1
        # filter
        if u_a < l_b:
            continue
        else:
            count+=1
    return count
```

## Solution

Very straightforward solution for this challenge. We changed only a couple lines from the first part.

```rust
pub fn part_two(input: &str) -> Option<u32> {
    let res:u32 = input.lines().map(get_digits).map(|d|{
        let l_a:u32;
        let l_b:u32;
        let u_a:u32;
        let u_b:u32;
        if d.0 < d.2 {
            l_a = d.0;
            u_a = d.1;
            l_b = d.2;
            u_b = d.3;
        }
        else {
            l_a = d.2;
            u_a = d.3;
            l_b = d.0;
            u_b = d.1;
        }
        if u_a < l_b {
            return 0;
        }
        else {
            return 1;
        }
    }).sum();
    return Some(res)
}
```

Until next time!
