---
title: "What is ChatGPT Good For?"
date: 2023-07-15
tags: ["chatGPT"]
draft: False
author: Mike Sutherland
math: false
hide: False
series: "chatGPT"
---

+ [What Can I Use It For?](#what-can-i-use-it-for)
+ [The Golden Rules](#golden-rules)

# What is ChatGPT?

ChatGPT is a large language model (LLM). Basically, it's a giant neural network that, in short, *predicts the next word.* That means, roughly, that it can communicate in writing. Its rules for which "next word" to choose are determined by reading trillions and trillions of words. And, it happens that if you read trillions and trillions of words, you can get pretty good at synthesizing new words. And you can even develop a sort of "understanding" of phenomena, processes, models, thoughts, and concepts that are legible to ASCII text. Whether this means you're "intelligent" is the subject of an ongoing, vigorous, and extremely interesting philosophical debate.

It's the coolest piece of technology I have ever seen, aside from like, computers. It's a deeply fascinating piece of tech. It's also a very useful tool. I have been using ChatGPT personally a lot, and I have been following the development of this technology for quite a while (since around when GPT-2 was released). I think this tech is very, very powerful – but it can be difficult to determine: 

+ *what's it useful for?*
+ *how do I use it?*
+ *what do I need to watch out for?*

I use ChatGPT mostly to help me with programming, as a sort of "learning assistant." So let's dive in. Hopefully this article helps answer some of the questions above.

# What can I use it for?

You can use it for a lot of things. In fact, what you use it for is really only limited to how clever you are. People are using it to come up with recipes, control robots, handle their ADHD...

Most people use it as an assistant for information-based tasks. It's a very good collaborative **editor**. So, it is can:

+ editing, to make writing clearer, grammatically correct, shorter, or longer;
+ summarizing long text;
+ revising, to point out mistakes or places where writing is not clear;
+ idea-making, as a sounding board to explore new ideas.

The model also "knows" a lot about the world, so it is a good **researcher**. It is good at:

+ outlining, to get a quick summary of a topic, and you can drill down with pointed questions;
+ hinting, to tell you phrases that will help you find the information you're looking for faster;
+ describing, to decompose a broad subject or concept into smaller parts.

The model has read a lot of text, but it can also generate new text; it's a good **writer**. This means:

+ re-writing text with a different style or voice;
+ filling out a provided outline;
+ telling stories or jokes;
+ coming up with fictional places or people;

It has ingested a lot of code, so it is familiar with many common computer programming languages; it's a good **programmer**. This means that it can:

+ reason about and explain code snippets
+ spot logical or syntax errors in code snippets
+ give explanations for compile or runtime errors
+ create high-level software designs
+ port logic from one programming language to another

It also can do some things that may not be immediately obvious. I have discovered a few:

+ read a code snippet and generate a UML sequence diagram
+ generate nice-looking CSS color schemes
+ come up with domain name ideas

Really, anything textual.

## How good is it?

It's uhhh, it's very very good. This thing is *smart*. Smart enough to be scary, smart enough to change the way you do your job, smart enough to be transformatively helpful to humanity, smart enough to create billions of dollars in value. Web3 this is not!

There is a reason Microsoft just gave these guys 10 billion dollars. It's becuase this thing is *smart*.

# Golden Rules

ChatGPT is a powerful tool. Like any tool, it can help or hurt you. There is a tornado of lawyers trying to draft legal policies about LLM's right now. So until we all collectively develop rules, I humbly offer my own personal "golden rules" for using ChatGPT:

Rule 1:  

**Never, EVER paste code or documents that contain ANY information that could REMOTELY, POSSIBLY contain proprietary, protected, or private information.** Your data is used, in ways that are difficult even for the inventors of this tech to understand, to train the model. Talking to ChatGPT is sort of like talking to a person in this regard. My conservative rule is to pretend like *whatever I am putting in the chat box will be posted, with my name on it, publicly to Twitter, where anyone – my boss, competitors, or mortal enemies – can see it.*

Rule 2:

**What goes into the model may come out.** ChatGPT answers other users using information it is trained on. The answers you give it are part of the training process. If I put `bcdd0b0af290` into that text box, someone else might ask it a question and the model may include in its answer `bcdd0b0af290`! Although they're trying to mitigate this, it can and has happened with these models. API keys, passwords, company secrets, bitcoin wallets... *This is an unsafe text box!*

Rule 3:

**Tell others that you have used chatGPT.** Don't be dishonest! Always disclose. Don't ask it to draft an email and hit send – and fool the recipient into believing that you wrote the email. This protects you just as much as it protects others. Students are being caught cheating because their professors CTRL-F "As a Language Model" and find it in their essays! Don't let this happen to you! *Honesty is the best policy*.

Rule 4:

**Audit**. Things that come out of ChatGPT sometimes don't make sense. Code snippets don't work or have subtle bugs. If you're talking to someone, do you blindly take at face value everything they say without thinking critically about it? Would you, a lemming, jump off a cliff if you saw the person in front of you do it? NO! Of course not! You need to audit what ChatGPT says. Make sure it makes sense! If you do this a lot, you will get better at it, and you'll start to sense what its limitations are. And, if you treat ChatGPT as a tool that can help you learn, auditing is a very effective way of thinking deeply and critically about whatever it is you want to understand. *Trust, but verify.*

Rule 5:

**It's an Alien**.  ChatGPT has a deeply strange and unintuitive intelligence. You, a human, need to treat it as if you are talking to an alien that has read all of the internet. And you need to remember that when you are interacting with it. Thinking of it as an alien helps you to get better at understanding its weaknesses and strengths, and looking at it in an un-biased way, and ultimately helps you avoid frustration. *Although it speaks our language, ChatGPT is not human.*

## Misc Info:

### Tokens

I said above that GPT can predict the next word. But that's not entirely accurate. GPT predicts the next *token*. Tokens are not quite words. A token is sort of a sub-word. Here's how tokens are made: you take each letter, `A`, `a`, `B`, `3` and assign it a code. You search through the text and find the most common combination of codes. You assign that combination of codes to a new code. Then you look at all the text again and see which codes most commonly go together. And again...

If you have 1024 different codes, and you repeat this process over and over again, you will eventually fill out your list with 1024 common groupings of text. This process is called byte pair encoding. It produces tokens. The model does not predict words -- it predicts tokens. 

[See for yourself what tokens are.](https://platform.openai.com/tokenizer)

### API vs ChatGPT vs Other Models

OpenAI has a product, ChatGPT, that is a web frontend for their model, ChatGPT (internally, it's called InstructGPT). OpenAI also has a product, which is an API. You can send requests to their API in the programming language of your choice. On the API, you can do extra things like choosing from a wider variety of models, setting additional parameters, enhancing the prompt, and so on. I have heard that the API produces a higher-quality output than the ChatGPT frontend, but that's unconfirmed and probably denied by openAI. 

ChatGPT also does use all conversations as training data. Even paid user conversations. API users' interactions are not used to train the models.

There are a handful of models from Anthropic AI, Google (Bing) and several others. None are anywhere near the quality of OpenAI's offering.

### How do these guys make money?

They probably don't. Paid GPT+ and API access helps offset their bills. They could aggressively commercialize and probably make billions. Microsoft certainly will. But I think, at the moment, the gals and guys at openAI probably are not thinking about money too hard. They are at the cutting edge of a decade-defining piece of technology. 

And, what would another few billion actually get them? GPUs? Nvidia doesn't make enough. Smart programmers? There aren't enough NLP PhDs for $100 million -- let alone 10 bil.

Rest assured, they will make money.