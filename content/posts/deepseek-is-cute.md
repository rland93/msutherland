---
title: "DeepSeek-R1 is cute"
date: 2025-01-29
tags: ["misc"]
draft: False
author: Mike Sutherland
---

DeepSeek-R1 (the model) is cute.

I have an RTX3090, so I can run fairly large models at home. I have an ollama server set up, so I have direct access to the new models. Of course, when DeepSeek dropped, I downloaded it immediately. So the model is: `deepseek-r1:32b`, this is a distillation of Qwen2.5-32b, which is an LLM developed by the Chinese company Alibaba cloud. So they say: Qwen (通义千问) chat & pre-trained large language model proposed by Alibaba Cloud.

So the pre-training is Qwen. If I'm understanding the deepseek architecture correctly, they "seed" it with some high-quality chain of thought reasoning, and then do RL on some coding, math, etc problems to teach the model to do chain of thought. This lets the model think through its responses, using tokens that it's generated to meander thought the space of possible answers to more confidently arrive at the correct one. More tokens = better answer, which I suppose is intuitively true, for anyone who has spent any amount of time messing with LLMs. Chain of thought is just a structured way at doing that.

Anyway.

It's been very, very cool to use the model and watch it think in real time. It's hard not to anthropomorphize the model: My GPU has coil whine so I can literally hear it "thinking" as it generates tokens. And the chain of thought process is so... intellectually humble. Here's some raw output arising from me asking about analog and digital filtering:

> <think>
> Okay, so I'm trying to wrap my head around how oversampling and an RC filter interact when applied to a noisy signal. Let's break it down step by step. ...

> ... First, I know that an RC filter is an analog low-pass filter. It smooths out the signal by attenuating frequencies ...

> ... So, if I have an RC filter before the ADC, it's acting as a low-pass filter to limit the bandwidth of the signal coming into the ADC ...

> ... maybe the RC filter isn't as critical? Or does it still play a role in shaping the analog signal before digitization?

It's like, you just spell out, in language, exactly what you're thinking! And it actually works!

I think I have a particular resonance to reading this, because I'm a very verbal thinker: I think first and foremost in words. I assign a lot of meaning to words and have an intuitive verbal sensibility about the world. Something innate, or maybe I read a lot.

It's just so interesting how humble the model is. I know it's not _actually_ thinking out loud. But that it spontaneously discovered that the best strategy for thinking well is to ask questions, to spell out what it knows and what it maybe doesn't fully know. The way it questions itself. As its `<think>` discussion evolves it's hard not to empathize with it! It's like a super-verbal version of me. I have the same thoughts, just not spelled out.

But I think there is a lesson here. Intelligence comes from being humble, questioning your assumptions, reasoning through things in a calm and clear manner. The model learned this; I have too.

Amazing, really amazing.
