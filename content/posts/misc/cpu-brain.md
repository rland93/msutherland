---
title: "Metaphors: Computer Brain"
date: 2022-6-4
tags: ['misc']
draft: False
author: Mike Sutherland
---

My brain is kind of like a computer.

## Algorithms

In my brain, I have a set of algorithms that I "know." These little routines are habits, communication styles, ways of processing information:

I have an algorithm for making a good cup of coffee. I do the same thing every day, from the same input (beans) to get the same output (espresso).

Sometimes, I learn new algorithms. For example, I can roughly calculate the shear in a beam, because I read a book about that one time.

Some algorithms are old and fundamental. I really know how to eat; that was programmed a long time ago. Same with some of the emotional processing algorithms, I think those are pretty much baked into the operating system. They're generally pretty fault-tolerant.

I'm especially happy with my reading and writing algorithm. It's efficient. I can read a lot and my writing is high performance. I don't think I've quite reached state-of-the-art results, although I try to get as close as I can.

## Cache, RAM, and Disk

There are roughly 3 layers of data for my brain. Disk is like a book; it takes a long time to read, I have to skip the head around to find stuff, which takes a long time. It's a big round-trip to find a book and read it.

RAM is like my knowledge. If I read a book, think about it, and take a few quizzes on it, that's like adding data from the book into RAM. Once it's in RAM, an algorithm is much quicker from RAM than from a disk. Most of English is in RAM for me. Only a small part of Spanish is in RAM though, the rest is in disk. This makes the algorithm of real-time spanish speaking very very slow, because I need to break out the dictionary file on Disk while the algorithm is running.

I can get things out of RAM by writing them down.

RAM doesn't have error correction, though. It's susceptible to corruption.

## Cache

Cache is very small, but super fast. I rely on cache a lot when I'm running an algorithm like walking or surfing -- really performance critical stuff. I'm constantly storing and updating a representation of external state in cache. But it gets wiped and re-written very quickly. Couldn't really tell you from RAM what surfing is like.

I also use cache a lot when reading, writing, or programming. I have a stored representation of state in cache. It's also kind of like a ring buffer, because the old stuff gets deleted if I try to store too much into cache.

## Operating System

The operating system is really complicated. I have kind of a weak multithreading; I can do multiple tasks simultaneously, but definitely not with the same fidelity. The texting algorithm (very demanding, since it involves reading and processing a lot of English from RAM) and the driving algorithm (which has hard real-time state representation requirements) cannot really be adequately run at the same time. But, I think maybe I have efficiency cores or something, because sometimes a demanding algorithm can run in the background and produce useful results.

Some of the stuff that my operating system does in the background is really interesting too. I think there's a lot of legacy code; occasionally, the hunger task will move the stack pointer out of a user level executive task for no reason. Occasionally, some OS tasks like anger or fatigue will lock the system, requiring a hard reboot.

Energy efficiency is absolutely fantastic, though. 