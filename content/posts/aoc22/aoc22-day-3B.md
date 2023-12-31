---
title: "AoC '23 3B"
date: 2023-02-07
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

This is a similar problem to 3A.

Now, rather than compare between slices for each line, we are comparing between lines. We are comparing groupings of 3 lines. What we aim to do is find the score of the common item for each 3 lines and add it to the accumulator, just like in the previous problem.

<!--more-->

```plaintext
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

For the above input, we have two groupings of 3, for a total of 6 lines. The top 3 lines share the letter 'r'; the bottom group shares 'Z'. Therefore, the sum is score(r) + score(Z), which is 18 + 52.

Given many of these groups, we are to find their total score.

## Approach

For this, we are again going to turn to `HashSet`. But this time, we're comparing 3 separate HashTypes to get the common elements between them. This makes it a little bit more difficult, because most set membershi methods for HashSet can compare only one set to one other set. Here, we need to compare 3 sets (A similar problem for groups of \\(k\\) would need to do membership checks on \\(k\\) HashSets).

So let's say we have a group of lines A, B, C that has a bunch of stuff in it. Some things are shared between members, but only one thing, Q -- a set with only one element -- is shared by all three members. That is what we are looking for, the value of that single element in Q.

<img class="pct40 centered" src="/img/aoc_rs/common_3.svg">

HashSet can only look at intersections between two elements at once. So our algorithm will do something like this:

```python
def part_two(input):
    groups = chunk(input, 3)
    accumulator = 0
    for linegroup in groups:
        A, B, C = linegroup
        AB = set(A).intersect(set(B))
        element = set(C).intersect(AB).next()
        accumulator += score(element)
    return accumulator
```

We'll assume that chunk will iterate 3 elements at a time (e.g. linegroup is a tuple of 3 lines that we unpack into A, B, and C).

Now, this algorithm works for three items, but I would like to generalize it to \\(k\\) elements. We can alter the algorithm slightly:

```python
def part_two(input):
    groups = chunk(input, k)
    accumulator = 0
    for linegroup in groups:
        Q = set()
        for i, line in enumerate(linegroup):
            if i == 0:
                Q = set(line)
            else:
                Q = Q.intersect(set(line))
        element = Q.next()
        accumulator += score(element)
```

With this algorithm, we exploit the fact that the result of any intersection of a set A and B will always produce a subset of _both_ A and B. Thus, every time we do the step `Q.intersect(set(line))`, we know that intersect will reduce the size of Q, because we cannot add elements by intersection; the largest subset of a set is simply the set itself! So `intersect` cannot ever give us a bigger set.

A smarter version of this algorithm may finish early, if we check the length of Q at line 11 and bail early if len==1.

Now, let's look at time complexity.

All Chunk does is grab parts of the list at a time, so chunking through an array is the same as iterating through an array, so the runtime is \\(O(n)\\). Transforming each line into a set will take \\(O(m)\\) for line length \\(m\\). But for us, our line is going to be very short, so we can assume making a set our of each line is \\(O(1)\\).

Now, `intersect` is \\(O(n)\\) where \\(n\\) is the smaller of the two sets (this makes sense; the largest possible intersection of two sets is just the smaller set). Again: \\(O(1)\\), we're dealing with very small sets here.

These are the two important operations of our time-complexity analysis, so the time complexity in total is \\(O(n)\\) for \\(n\\) lines.

## Solution

```rust
pub fn part_two(input: &str) -> Option<u32> {
    // lines -> byte arrays
    let barr: Vec<&[u8]> = input.lines()
        .map(
            |x| x.as_bytes()
        ).collect();

    // sum we will accumulate over
    let mut sigma: u32 = 0;
    // chunk size 3 -> groups of 3
    for group in barr.chunks(3) {
        let mut group_common: HashSet<&u8> = HashSet::new();
        for (i, member) in group.iter().enumerate() {
            let member_items: HashSet<&u8> = HashSet::from_iter(*member);
            // we'll compare other members to the first member. So we put him
            // into group_common
            if i == 0 {
                group_common = member_items;
            }
            // subsequent members, we'll do the actual compare
            else {
                group_common.retain(|x| member_items.contains(*x));
            }
        }
        // now we need to actually score and accumulate
        let mut group_common_iter = group_common.iter();
        match group_common_iter.next() {
            Some(x) => {
                sigma += charbyte_to_score(*x);
            },
            None => {panic!("Group had no elements in common!");}
        }
        // finally, let's just make sure we don't have any common sets
        // with length > 1.
        if group_common_iter.next().is_some() {
            panic!("Group has more than one element in common!");
        }
    }
    return Some(sigma);
}
```
