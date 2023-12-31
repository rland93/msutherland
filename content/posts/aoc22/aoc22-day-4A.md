---
title: "AoC '23 4A"
date: 2023-02-12
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

Each pair of numbers in the list indicates a range, so 6-8 indicates 6, 7, and 8. There are two pairs per list item. We want to distinguish pairs like `5-7,4-8` -- in those cases, 5-7 entirely overlaps 4-8, from a pair like `5-7` and `6-8`, for which `5` and `8` do not overlap. Our end result should be a final count of every completely overlapping set.

<!--more-->

Here is the example puzzle input:

```plaintext
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
```

## Approach

So here, there are a couple of ways to go: I could use `HashSet` again, and check if one set is a subset of another. So, assuming we have `A` and `B`, we can check: `(A is a subset of B OR B is a subset of A).` This would filter matches properly.

However, it might be inefficient to create two HashSets for every comparison. While using HashSets would be useful as a general strategy, our problem has a more specific structure: the elements are already sorted; we know the upper and lower bounds for each pair! This extra structure allows us to do what we need only with some clever arithmetic.

We'll start by noticing that we can easily obtain the size of the two sets by subtracting the upper element from the lower element of each. If we say that set \\(A\\) is the larger set and set \\(B\\) is the smaller set, then we can determine the necessary and sufficient conditions for a valid pair. We'll also say that each has an upper and lower bound, \\(u\\) and \\(l\\). So \\(u_A\\) is the upper bound of A, and so on.

Let's establish a proposition. Given that \\(A \\) is larger (has more elements) than \\(B\\):

$$ u_A \geq u_B \land l_A \leq l_B \implies B \subseteq A $$

To prove this:

- assume that \\( B \subseteq A \\) but \\( u_A < u_B \lor l_A > l_B \\) (the opposite of our proposition)
- If \\( u_A < u_B \\), that means that there is some element, \\( u_B \\), that is not contained in \\(A\\), because \\(u_B\\) is greater than \\(A\\)'s largest element.
- This is a contradiction, because we said that \\( B \subseteq A \\).
- Or, if \\( l_A > l_B \\), that means that there is some element \\(l_B\\) that is not in \\(A\\).
- Again, a contradiction, because we said that \\( B \subseteq A \\).

With this proof in our pocket, we are ready to devise an algorithm:

```python
def part_one(input):
    count = 0
    for line in input:
        # get elements
        l1, l2 = line[0], line[2]
        l3, l4 = line[4], line[6]
        # find which set has more elements
        if l2-l1 >= l4-l3:
            u_a, l_a = l2, l1
            u_b, l_b = l4, l3
        else:
            u_a, l_a = l4, l3
            u_b, l_b = l2, l1
        # filter
        if l_a <= l_b and u_a >= u_b:
            count += 1
        else:
            continue
    return count
```

Since we're only doing some basic arithmetic for each line, this algorithm runs in \\(O(n)\\) time. Assuming we've done our proof correctly, this will get us the count that we need!

## Solution

Unlike extracting characters, like we did in the rock-paper-scissors game before, we actually need to match digits, because digits can be 1+ characters: like 5, or 50, or 500. For this, then, we use the `regex` crate. I really like Rust's packaging system. All it took was `cargo add regex` and we're off to the races.

Now, `regex` compiles its patterns when the program is run. Here's the code to extract the digits from a line of text from our puzzle input (remember that a line looks like `3-15,6-10`):

```rust
use lazy_static::lazy_static;
use regex::Regex;

fn get_digits(text: &str) -> (u32, u32, u32, u32) {
    lazy_static! {
        static ref RE: Regex = Regex::new(r"(\d+)").unwrap();
    }
    let mut matches = RE.find_iter(text);
    let a: u32 = matches.next().unwrap().as_str().parse().unwrap();
    let b: u32 = matches.next().unwrap().as_str().parse().unwrap();
    let c: u32 = matches.next().unwrap().as_str().parse().unwrap();
    let d: u32 = matches.next().unwrap().as_str().parse().unwrap();
    return (a, b, c, d)
}
```

We use the `lazy_static` crate to ensure that the compilation that occurs on line 6 only occurs once -- even though `Regex::new()` is called many times in a loop when our program reads each line from the input.

We can trust that the input will have exactly 4 digits and no more, so we can use `.unwrap()` to shorten the code. But in a general case -- like if we were parsing text, we would need to catch all of the potential degenerate lines. What if one of our inputs was `4-5,mike-10`?

The rest follows from the proof we sketched above. We again use the functional notation to just sum everything into `res`.

```rust
pub fn part_one(input: &str) -> Option<u32> {
    let res:u32 = input.lines().map(get_digits).map(|d|{
        let l_a:u32;
        let l_b:u32;
        let u_a:u32;
        let u_b:u32;
        if d.1 - d.0 > d.3 - d.2 {
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
        if l_a <= l_b && u_a >= u_b {
            return 1;
        }
        else {
            return 0;
        }
    }).sum();
    return Some(res)
}
```

Onto the next!
