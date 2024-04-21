---
title: "Building a Flight Computer from Scratch"
date: 2024-02-01
tags: ["flight computer"]
draft: true
author: Mike Sutherland
math: false
series: "ollyfc"
---

I am building a flight computer (for an RC plane, *not* a real plane!) from scratch! This is the first post in a series of posts where I am going to walk through, in as much detail as I possibly can, how to do this.

The flight computer is called "ollyfc." Olly (or Ollie) is my dog:

![Olly](/img/olly_sm.jpg)

She embodies the spirit of the project, because she is curious, playful, and gets tired easily.

# The Customer and the Goal

It's helpful, when designing something, to have a customer. So, my customer is me, and I'm saying I want to build a flight computer with the following characteristics:

> when user enables the flight computer, the airplane should safely transition to "assisted flight," which means that the flight computer will guide the airplane to level flight at a steady altitude. 

This is what I want for v1.0 of the flight computer. As far as timelines are concerned, I'm pretty flexible, but I want this done by the end of the year.

That is the goal for 2024...

Well, one of them. Actually, I have a few more goals for this project:

+ actually deliver what is promised to the customer. Video evidence of successful flight testing in december.
+ learn a learning in embedded Rust. Sharpen my software architecture skills, pick up electrical engineering and PCB design as a hobby, build some cool shit, crash a few planes, fry some boards, use a debugger, etc. LEARN.
+ communicate the process to the internet (you!) over blog posts and youtube videos. Actually learn to use youtube and develop an audience larger than a tiny handful.

Those last two, of course, are the important ones for me. I chose this project because I wanted to do more embedded things, and I wanted it to be embedded Rust, and I miss doing the type of stuff I did in college as a MechE student.

# Design Requirements 

So, this is a lofty goal. I am going to try to follow the Engineering Design Process as much as I can here. So we can go a little further with this customer statement we have. I dug out my old textbook [<a href="#1">1</a>] to figure out how to design things.

> + **objective n:** a feature or behavior that the design should have or exhibit. Objectives are normally expressed as adjectives that capture what the design should be, as opposed to what the design should do. For example, saying that a ladder should be portable or lightweight expresses an attribute that the client wants the ladder to have. These features and behaviors, expressed in the natural languages of the client and of potential users, make the object “look good” in the eyes of the client or user.
> + **constraint n:** a limit or restriction on the design’s behaviors or attributes. Constraints are clearly defined limits whose satisfaction can be framed into a binary choice (e.g., a ladder material is a conductor or it is not). Any designs that violate these limits are unacceptable. For example, when we say a ladder must meet OSHA standards, we are stating a constraint.
> + **function n:** a specific thing a designed device or system is expected to do. Functions are typically expressed as “doing” terms in a verb–noun pairing. Often they refer to engineering functions. Note that this function is also a constraint. 
> + **means n:** a way or method to make a function happen. Means or implementations are often expressed in very specific terms that, by their nature, are solution-specific. Means often come up because clients or others think of examples of things they’ve seen that they think are relevant. 

I think by far the most important two here are objectives and constraints. They've tried to systematize this, as textbook authors do, but it can be more loosely stated that you have some envelope of things that you can build (constraints), and you want to build the best (objectives) thing that you can inside of that envelope.

For a company things like BOM cost, manufacturability, regulatory environment often act as obvious constraints; objectives are basically "things that delight the customer." 

We are not really going to do a fully rigorous analysis here. Just enough to get the vibes.

# Narrowing Scope

This is actually a very big goal. Almost the whole system is described in that customer statement. So, loosely, I want to break this up even further based on project stages. You software guys are thinking "*waterfall*" but hey, this is hardware. The plane is not agile if it crashes.

We are not fucking around here. The reason I chose "flight computer" and not some other pure-software thing is that the airplane control rabbit hole can go as deep as you want it to. I want this product to eventually be my playground for exploring feedback control.

Our project is going to be done in a few phases:

1. **hardware/software prototyping/bringup** Just getting the hardware (electronics) in place to build out some rudimentary software. In the embedded world this is called "board bring up." Airframe construction is part of this.
2. **system identification** We're going to talk a lot about system identification later -- it's closely intertwined with the control part of this task. System identification is where you try to build a mathematical model of your system: the wings have some lift, some drag, some lift moment; what is it *exactly*? We need to know such parameters, so we need to have a method for collecting them. System ID.
3. **design** Finally, design. Making things reliable, ironing out bugs, creating a controller, starting with PID.

In phase 1, we'll design the board with phase 2/3 in mind. Let's sketch out some **objectives** and **constraints**. 

## Phase 1 Objectives:



## Phase 1 Constraints:



[<a id="1">1</a>] Author(s): Clive L. Dym, Patrick Little, Elizabeth Orwin. *Engineering Design, A Project-Based Introduction*