---
title: "Read the datasheet"
date: 2023-12-05
tags: ['programming']
draft: False
author: Mike Sutherland
math: False
---

We are working on new hardware. New hardware comes with new peripherals, which is very exciting, and also sometimes very frustrating. Anyone who is familiar with computer hardware (or electrical components, or test equipment and other such EE ajacent things) is going to be familiar with a datasheet.

Datasheets are actually amazing. A datasheet is something that basically describes a microchip for someone who wants to use that microchip. Often they are targeted at people who are integrating a chip into a whole system. So the datasheet for the chip has information about physical characteristics (dimensions, operating temperature, etc), electrical characteristics (power usage, current, voltage, etc), and, relevant to me, software characteristics, such as the names and functions of various registers on the chip.

I really like datasheets, because they give me useful information about the chip. But not only that. They are written in a way that respects me, the reader. I often feel like written things don't necessarily respect the reader. News articles, for example: in a news article, it's not a given that the author respects the reader; often, news articles are written to be sensational, or one-sided, or authoritative (always authoritative) even when the author has no clue what they're talking about! In the case of a datasheet, the author knows what they are talking about -- they made the chip [1].

So that's one reason I like datasheets. They're written for me, a technical person, who wants to build something useful out of the chip -- not just buy it like some other consumer product. The same class of documentation for a standard consumer product is a product manual (which are rarely great, because usually it's an afterthought) or an advertisement. Some datasheets occasionally have advertisements in them (look at how little power our chip uses!) but it's usually only the first page and even then, it's at least factual. A datasheet understands its place -- it's there to make my life easier. Good datasheets and documentation sell chips.

There's another reason I like datasheets. And that is that it makes the power of computers very legible. I wasn't alive when such things were actually printed out and mailed, but there is something about a 3,000 page datasheet that makes you really *think* about how much power is in that tiny silicon die. It's a dense 3,000 pages. If you wanted to write a book that was 3,000 pages long, you would spend quite a long time. To make a chip with a datasheet 3,000 pages long, not only do you need to write the datasheet -- you also have to make the chip!

In my early use of using computers, I knew they held within much complexity. But there is nothing like reading a long datasheet to really step back and internalize just how much complexity is there.

That doesn't even cover software complexity, of course. A datasheet doesn't even capture the programs that can run on a chip -- just what you can do with the chip and its registers!

---

[1] *usually* they know what they are talking about. With hardware one thing you really need to keep in mind that the datasheet can be wrong! 