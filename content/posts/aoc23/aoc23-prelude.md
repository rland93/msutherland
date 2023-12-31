---
title: "advent of SIMD"
date: 2023-12-01
tags: ["programming", "rust", "aoc23"]
draft: True
author: Mike Sutherland
series: "advent of code in rust 23"
---

I am doing advent of code in Rust. Again.

It's been a year since I started writing Rust. In that time, I've done a few projects:

- very small backend for [youhavetype1.com](http://youhavetype1.com)
- tauri backend for a video application
- an embedded robotics? UAV? project which is kind of in a holding pattern due to my busyness with other things
- many other small programs in various states of completion

I feel fairly productive in the language, including at the low level. And, this
year, I've done a lot more embedded C. So, I thought maybe I would give AoC another crack. I don't care about competition, it's purely a learning exercise for me. The days are shorter, the nights are longer...

I read this [article](https://mcyoung.xyz/2023/11/27/simd-base64/) by a very smart person about SIMD programming. I've been wanting to learn some kind of accelerated compute -- my two choices come down to SIMD or CUDA. I really admire Nvidia's strategy to encourage GPGPU compute through a formidable software moat. Obviously it has paid off for them, but it just makes me nervous. And -- I will have access to a laptop; not so much a GPU. I think SIMD is a nice medium. It stikes me as more general (but less powerful) than CUDA, but still has a lot from a design standpoint that distinguishes it from standard programming.

So, SIMD it is. Let's see how far we get.

The goal here is going to be to leverage SIMD intrinsics as much as possible and practice designing algorithms for SIMD where possible. I think probably what I will do is just write it the regular way, and then rewrite what I think are hot sections "the simd way" where possible. And hopefully in the process learn a bit more and practice a bit more. Of course, I'm already going to solve the problems so that is a gimme.

My estimation is that I'll get to day 9 before giving up. You never know.