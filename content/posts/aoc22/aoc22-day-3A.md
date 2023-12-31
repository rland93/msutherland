---
title: "AoC '23 3A"
date: 2023-02-06
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
math: true
---

## Problem Statement

We have a big list. Each item in the list is a duo of collections. Each of these collections has a single item (only one?) in common. Here's my example puzzle input:

<!--more-->

```plaintext
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

Each line has a bunch of characters. A character is an item. Each line has an even number of these characters; the first half of the line is the first collection and the second half is the second. So this line:

```plaintext
aaaBBB
```

Has a collection with items `aaa` and a collection of items `BBB`.

## First Sketch

What we are going to do is iterate through the list, split the line into its respective collections, and then somehow look at the collections to determine which item they have in common. Then, we'll use a lookup table -- we can probably build the lookup table directly from ASCII character codes -- to calculate that item's score.

Because we are going to check for membership in collections a lot, I am reaching for some kind of hash set datastructure here. We find this in the standard library's [Hash Set](https://doc.rust-lang.org/std/collections/hash_set/struct.HashSet.html).

I assume that in most languages, membership and insertion in hash maps is \\( O(1)\\), or maybe \\( O(\log n) \\) at worst.. From some digging, I find that Rust uses [Sip Hash](https://en.wikipedia.org/wiki/SipHash). You can really dive off the deep end when it comes to hashing, so for me, it's good enough to know that Sip Hash is _very_ fast and fairly secure.

Our algorithm is going to look something like:

```python
def part_one(input):
    sigma = 0
    for line in input:
        A = line[: length(line) // 2]
        B = line[length(line) // 2 :]
        common_member = ( set(A) && set(B) ).next()
        sigma += score_lookup[common_member]
    return sigma
```

Pretty straightforward. We are are going to iterate through the input, split the line into two collections, A and B, convert each of those collections into Hash Sets (in pythonland, that's just a `set`), and then perform AND on A and B. The resulting set has only one member, so we'll grab it and then do a score lookup. The sum of scores (one per line, because each line has one common element) is the total "priority score" that we're looking for.

Runtime will be \\( O(n \log(2m)) \\) at the very worst, where \\(n\\) is the number of lines and \\(m\\) is the number of items in each collection. But really, it'll probably be \\( O(n) \\).

## Solution

We have pulled out the logic for splitting the rucksack into compartments and that for finding the common element between compartments.

For finding one common element:

```rust
pub fn score_common_in_rucksack(rucksack: &str) -> u32 {
    let items = rucksack.as_bytes();
    let rlen = items.len();
    // even odd
    match rlen {
        _odd if rlen % 2 == 1 => {
            panic!("odd no. of items in rucksack!");
        },
        even if rlen % 2 == 0 => {
            let half: usize = even / 2;
            let set_a = HashSet::from_iter(
                items[0..half].iter()
            );
            let set_b: HashSet<&u8> = HashSet::from_iter(
                items[half..items.len()].iter()
            );
            return get_single_common(&set_a, &set_b);
        },
        _ => {panic!();}
    }
}
```

We're going to check the length. Odd means that somehow we have a malformed line; a rucksack always has two compartments of equal length, so must be a multiple of 2! Then, assuming we're even, we'll need to get a HashSet for each compartment. Since we don't care about the characters themselves, only the score, we can get the raw byte values as u8 rather than dealing with strings. Since we have an even number, the division of `even` by 2 on line 10 will always be sensible. Then, we're going to cut items in two pieces.

But here, we aren't assigning values of the array `items` to `a` and `b`; just a reference to some values. `items` was the output of a [`to_bytes()`](https://doc.rust-lang.org/std/primitive.str.html#method.as_bytes) function call. So we cannot alter items. So this means that when we produce the `HashSet`s, we end up with sets of _references_ to some u8's somewhere. My understanding is that u8 has a bunch of traits that HashSet can use for equality, comparison, etc.

Once we have both sets, we just need the common element between them.

```rust
pub fn get_single_common(set_a: &HashSet<&u8>, set_b: &HashSet<&u8>) -> u32 {
    let mut in_both = set_a.intersection(&set_b);
    let common = in_both.next();
    if in_both.next().is_some() {
        panic!("More than one common element!")
    }
    match common.copied() {
        Some(common) => charbyte_to_score(common),
        None => {
            panic!("no common element found! Check your input? {:?}", common)
        }
    }
}
```

This method exploits the lazy evaluation of `intersection` to guard against rucksacks containing more than one common element. We find the intersection of the two, then grab the first element of that intersection. Then we can just check if there's anything else in the intersection; if so, that means that the rucksacks have more than one element in common.

This was actually a pretty cool way of doing that. I tried at first to find the `len()` of `in_both` -- but it turns out intersection produces a lazy iterator. This was just a little coincidence that happened to save me some clock cycles this time around. I wonder what I would have done if I needed to do something with that intersection? Gone through the whole iterator?

Now; calling `next()` produces a _reference_ to the value inside of `in_both.` This makes sense; the result of calling `.intersection()` is an _iterable_ that produces _references_ to the objects inside of sets A and B. If these objects are large we want to avoid moving them around. In this case, they are tiny tiny u8s.

We'll explicitly tell rust to copy `common`, and then we guard again against an empty common which occurs if the two sets share no elements. I'm not too happy with the readability of this function; I think it might be a lot clearer to somehow guard against the `none`-ness of the first element in addition to the `some`ness of the element after the first -- all in one fell swoop. This would improve readability, but it's late and I want to finish.

Now that we have the one common element, we again need to dereference it before doing arithmetic on the true byte values. Why? Because those first `set_a` and `set_b` were produced from `HashSet::from_iter()` -- the thing we passed into that iterator was a `&[u8]`. AKA a reference to some array of u8 in memory. We've been doing _all of this_ with pointers! This wouldn't be impossible in C, but it certainly would have been very difficult to keep the long chain of ownership top of mind.

But now that we've safely guarded our output, we can unpack these and do the final arithmetic on them. In this case, the score table is easy; we just distinguish between the lowercase `abcde...` and the uppercase `ABCDE...`, and apply the [appropriate offsets](https://en.wikipedia.org/wiki/ASCII#Control_code_chart) to get our points:

```rust
pub fn charbyte_to_score(x: &u8) -> u32 {
    if *x >= 65 && *x < 91 {
        return u32::from(*x - 38);
    }
    else if *x >= 97 && *x < 123 {
        return u32::from(*x - 96);
    }
    else {
        panic!("bad char. maybe a non-alphanumeric in input?")
    }
}
```

For arbitrary offsets, we could use a lookup table.

```rust
pub fn part_one(input: &str) -> Option<u32> {
    let res:u32 = input
        .lines()
        .map(|rucksack| score_common_in_rucksack(rucksack)).sum();
    return Some(res);
}
```

So this is how we do part one. Although Python has a variation of `map()`, I haven't used it much, and I'm actually finding it pretty ergonomic.
