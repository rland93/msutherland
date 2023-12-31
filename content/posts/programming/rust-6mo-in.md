---
title: "Rust, 6 Months In"
date: 2023-07-03
tags: ['programming','rust']
draft: False
author: Mike Sutherland
---

I've been writing a lot of Rust lately. If you are a programmer, you have probably heard of Rust:

+ it's amazing!
+ it's really hard
+ it's safe. safe safe safe memory safety no memory corruption no use after free safe
+ it's amazing!

Well, yes. These things are true. But that's not all that I like about Rust.


I'm a pretty new programmer. I mean, I've been messing with computers for quite a while now, but I don't have a hefty CS background. I don't know a whole lot about programming languages -- although I am learning. During the day, I write mostly C, with some javascript and some python.

In my free time, I spend all of my free time writing Rust.

## The first 6 months

On this very blog, there's a series of Advent of Code puzzles. I think doing Advent of code is a really good way of learning the ins and outs of a programming language. They are short, digestible, easy (at least, until about day 6 or so, apparently), and often there's a lot of people that have done them.

After I got just a little bit of muscle memory, I ditched toy problems and started to build stuff.

## My first Rust program

My first Rust program was the backend of a real-time websockets application called youhavetype1:

[youhavetype1.com](https://youhavetype1.com)

![youhavetype1.com](/img/yht1.png)

It has a few bugs still and is missing some features. I went with `warp` for the backend, and found it easy to use. Code got messy quickly, and I moved very very fast, so I didn't write very many tests. I would like to refactor this at some point (tm) 

Particular things I noticed about Rust:

The borrow checker is a very powerful way to help think about **concurrency**. I didn't really understand why Rust espoused "fearless" concurrency, but I do understand. If only one thing owns one thing at once, it is very easy to think about concurrency!

There are many different ways to **handle errors** in Rust. I really like the error handling in this language. You can choose, with a lot of granularity, exactly how errors are propagated up the call stack and who gets to handle them. Control over errors is a real luxury. Compiler hints really push you to reason about code paths that "shouldn't happen," which would be very annoying in a language without such good error flow.

It's **fast**. It's very fast. Zoom! I can serve this application on a single ec2 instance *easily*.

Cargo is really nice. Cross compilation is a breeze. Writing and running unit tests is a breeze. **Tooling** is a joy. The compiler is friendly and helpful, and not too verbose.

Traits, strong types, and the borrow checker make it very easy to reason about what an external library is going to do with the data you give it. Will it alter the state of something you pass into it, or just reference? You can *tell*! You can *decide*! You can reason explicitly about the [seams](https://archive.org/details/working-effectively-with-legacy-code/page/n51/mode/2up) in a library!

My favorite part of Rust is how it makes abstraction easy. And that's the reason I think Rust is here to stay, because at the end of the day, programming is about abstraction. Rust has a few things going for it that supercharge the ability of a Rust programmer to perform abstraction:

+ the emphasis on "zero cost" abstractions; little to no performance penalty.
+ the tooling. Cargo makes it easy for interop between higher layers and the layers below them -- and lower layers and the layers above them.
+ a library's explicit interface. How data is passed around must be visible.

I haven't done any metaprogramming yet. Maybe after a year?

## My next Rust program

My next Rust program is an embedded program. For this, I will be emphasizing reliability and robustness. I want to learn some operating systems concepts. I wanted to use [lilos](https://github.com/cbiffle/lilos) here, but it was a bit less documented and a bit more "advanced user," so I went with [embassy-rs](https://github.com/embassy-rs/embassy).

I am relatively a beginner in embedded. Watching it carefully though.

More on the specifics of that project soon, but in the mean time, things that I have noticed:

My god things are moving fast in embedded Rust. Already we have 

+ probe-rs - wicked debugging toolkit that is about as easy as cargo.
+ defmt - very ergonomic embedded logging framework.
+ embassy - async embedded operating system.

I was able to get up and running in about a day and reading data from a sensor in a couple of hours. Easy! This would not have been possible just a year or 2 ago.

## Values 

The other thing that I notice about Rust is that it has the same values that I have. I think it's easy not to think too much about values, but they are very important. 

I think Graydon Hoare said this: Having it called "Rust" kind of implies that the code will grow to be old. It's a shiny piece of metal, but it will be around and stay strong long enough for Rust to grow on it.

I think that was a really pointed observation. Rust takes a little bit of time and a little bit of effort to learn. It demands a bit more from the developer up front. It demands that the developer see things Rust's way, which requires more careful thought.

But the result is that the end product -- the product consumed by an uncountable number of CPU cycles -- will be higher quality, more robust, and more legible.

I find that Rust gets a lot easier over time. And in particular, I bet that a project written in Rust is much easier to reason about as it grows more complex than a project written in another language where the value of this up-front effort is not at the forefront. This is no shade no js or python, but those languages explicitly do not place value on making demands of their users. Anyone can write python! Anyone can write javascript! These are good values. I learned how to program in Python. But those are not the same values. Rust's emphasis on up-front effort necessarily makes it more difficult to learn. (that isn't to say that Rust's community doesn't encourage learners; [The Rust Programming Language](https://doc.rust-lang.org/stable/book/) is the best programming book I have ever read). We know that code is written once and read many times. It's my value, and Rust's value, that you should spend more time thinking about the code you write and less time writing it.

I am coming out of this feeling like I made the right decision to learn Rust. It's clearly the future. Damn you Rust Evanglism Task Force, I'm now joining your ranks!