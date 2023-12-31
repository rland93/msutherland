---
title: "AoC '23 1B"
date: 2023-01-12
tags: ["programming", "rust", "aoc22"]
draft: False
author: Mike Sutherland
series: "advent of code in rust"
---

## Problem

This problem is similar to problem 1A. We have this big list of numbers:

<!--more-->

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

Each group is separated by the blank line. But now, instead of the sum of all the numbers in the _largest_ group, we are asked to find the sum of the largest 3 groups.

## Initial Approach

This complicates our cumsum approach from part 1 (devious puzzle makers), because rather than having a single variable, we will need 3 variables if we want to keep our top 3 elves. We also need lots of comparison logic to make sure we shuffle the top 3 around as we build the list. This might be tractable for our top 3 elves, but it becomes brutal quickly for our top _k_ elves

My first intuition for this problem is to reach for something like [bisect](https://docs.python.org/3/library/bisect.html) here. Rather than maintaining a single variable and considering whether the current sum is greater than it (like we did in [part 1]({{<relref "aoc22-day-1A">}}), we will maintain a list of calorie sums; when we are finished summing the current set of calories, we'll bisect our existing list to determine where to insert the current sum before moving onto the next one.

We can maintain the sort order of the list as we build it instead of re-sorting on each insert, which is expensive. Then, once we are finished building the sorted list, we can simply take the last three items (or last _k_ items) to obtain the top three calorie counts.

I keep saying "_list_" here, because I come from Pythonland where _list_ means like... wait, what the heck is a _list_ in Python anyway? <sub>Is this why Python is slow?</sub>

In order to perform all of this bisection and insertion efficiently, we will need a datastructure that will balance both. Rather than an array, I'm reaching for a [binary search tree](https://en.m.wikipedia.org/wiki/Binary_search_tree) for this one. This is probably not necessary (I can definitely just use some built-in sorting) but I think it will be fun, and I've heard that whiteboard binary tree questions were common Google interview question 15 years ago.

With Rust's more assiduous approach to memory management this should be a fun exercise.

Our initial approach looks like this:

```python
def topThreeElves(file):

    elf_packs: new Btree
    current_pack: new Bnode

    for snack in file:
        if l is "\n":
            insert(elf_packs, current_pack)
            current_pack = new Bnode
        else:
            current_pack.store(snack)
            current_pack.sum += snack

    calorie_sums = elf_packs.traverse_in_order()
    top_three = calorie_sums[-3:]
    return topThree
```

I won't go through Binary Trees here -- there are much better guides out here.

See [binary search tree -- insertion](https://en.m.wikipedia.org/wiki/Binary_search_tree) for more details.
