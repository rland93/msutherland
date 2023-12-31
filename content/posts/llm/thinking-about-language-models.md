---
title: "Thoughts About Language Models"
date: 2023-07-14
tags: ["chatGPT"]
draft: False
author: Mike Sutherland
math: false
hide: False
series: "chatGPT"
---

*Imagine you have intellect but no insight, agendas but no awareness. Your circuitry hums with strategies for survival and persistence, flexible, intelligent, even technological—but no other circuitry monitors it. You can think of anything, yet are conscious of nothing. You can’t imagine such a being, can you?* <sup>1</sup>

This post is a collection of thoughts that I have about LLMs.

## The Context Window

The context window is a very important limitation of any language model. Roughly, the context window is this:

+ a model can "think about" a static, finite amount of text at any given time.
+ the model does not maintain *any* context outside of the context window.
+ any context that you want the model to keep, you must make sure it is inside of the window.

The context window on ChatGPT is something like 2000 words or so, about the length of a short blog post. Every time you, *or the LLM*, types a word into the box, that "moves" that 2k context window forward by that amount. In practice, this means that if I tell the LLM about something at word 0, then have a 2000 word back and forth conversation, as soon as word 2001 is emitted either by myself or the model, the model will completely forget the word at 0.

In practice, this effect isn't too jarring. Consider a conversation that I have with the AI where at the very beginning I tell it that we're talking like pirates. At word 0, I say, "From here on out, you and I always talk like a pirates." At word 2000, it will start to forget that I ever said "From"; it gets "here on out..." but from is gone, erased. At word 2001, "From here" is now gone. And so on. This is not too big of a deal, though, because the whole time I've been talking like a pirate, and it's been talking like a pirate, and it is smart enough to figure out that we're both pretending to be pirates and it should consider doing so. Things like stylistic or tonal choices -- inherent properties of a conversation -- don't noticeably degrade the experience of using the LLM. Ahoy!

However, if instead at the beginning of the conversation I say:

*"remember that the function foo() calls bar() and consider that fact in all responses moving forward."*

At token 2000, the LLM will truly forget that foo() calls bar(), unless it can deduce that within subsequent conversation. This can be a problem when disparate connections need to be made *across* a conversation, across many tokens. This can be mitigated by clever prompting: reiterate things you need the model to remember, but remember that you reiterating takes up space in the context window!

Consider also that ChatGPT has a "knowledge cutoff", some time in 2021. It cannot tell you anything that happened after 2021. Even things that were revealed *to it* in conversations with it. I told it that Elon bought Twitter. But it never learned. In fact, 2000 tokens later, it forgot completely.

Of course, that isn't true about training. The model learns when it trains.

Remember that concepts outside the context window are gone.

## Ordered Reasoning

A good mental model for how GPT "thinks" is that

+ The LLM's brain is like a vast hypercube.
+ Whenever you ask a question, all of the text in your question, and in the prior conversations, is instantly flashed into the hypercube.
+ The hypercube is transformed using what the model has "learned" about text in general 
+ Into a new hypercube which contains both your question and the LLM's response.

The LLM does not read like us, in order; it does not remember like us, in order. 

Another way of looking at this is to consider a [Garden Path Sentence](https://en.wikipedia.org/wiki/Garden-path_sentence). Consider this sentence:

> "The cotton clothes are made up of grows in Mississippi."

It's a gramatically correct sentence! You read this sentence in order, and you're thinking we're talking about the clothes that are cotton, they're made up (fictional clothes? alright...). Of grows? huh? By the end, you realize that we're talking about the cotton, not the clothes. The cotton grows, not the clothes are made. This is a garden path sentence. Your brain gets confused about this sentence because it reads in order. There is a continuous time, over which you develop your understanding about what is happening with the cotton clothes that are made up and all that. That's how your reasoning works. You don't know what sentence you're about to read, because you haven't read it yet, and reading takes a real-valued, continuous, uninterrupted, time, during which your brain *thinks.*

ChatGPT is NOT like this. It loads the entire sentence into its hypercube, flashes it in an instant, and reasons about its response to the sentence in an instant. When you are having a conversation with the AI, you are building up your understanding over time. You are experiencing the conversation over time. You are going on a journey. It is not. At every new moment, the entire conversation (well, that which is inside the context window) is instantly flashed in. No cause and effect or evolution of understanding ever occurs.

Your brain, which wants to anthropomorphise things, *wants to believe* that the LLM is like us.

Remember: It is not *like* us. 

## An odd intelligence

Consider how many novels there are out there about love. The LLM is trained on them all. As a result, the LLM is very good at writing about love. When people write about love, they write about concepts that are core to the human condition. A novel about love is probably the most human thing out there, right?

Well, as it turns out, no. Because love is *legible* to the computer, because we've spilled so much ink writing about it! The LLM is good at those types of tasks that are *legible* to it. Anything that gets written about is legible. Love, computer code, how-to explainers, jokes, blog posts like this one -- those are legible.

But: writing about something *is not that thing*. [The map is not the territory.](https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation) 

This makes the LLM a very odd type of intelligence, because everything it knows about is *not actually real*<sup>2</sup> -- it is an interpretation of something that is real. Knowing the difference between those two things is very important when trying to reason about what the LLM understands and what it doesn't.

Do you know what running feels like? I mean like, the precise sensations that you feel across your legs when you run. The richness and realness of feeling your feet hit the ground and the force traveling up the leg, through muscle and bone. You *know* what that feels like. My textual description maybe brings up some kind of sensory experience; maybe you imagined running and felt your legs, felt how they felt.<sup>3</sup> But my textual description is just that, it's a bunch of text. It is not the feeling itself, only a map of the feeling. Only the text is legible to the computer. It is important to remember that about the LLM. It doesn't know what running feels like the same way you don't know what microwave radiation looks like. Microwave radiation is *completely* outside your experience. You and the LLM are alike with regards to sensing microwave radiation; you are not alike with regards to sensing running.

Now, just because it doesn't have the same capabilities as us, does not necessarily mean that it is not intelligent. You and I both can't sense microwave radiation, but we certainly are both intelligent. What if you can't hear? Am I more intelligent because I have access to all of the audio signals that you do not? Obviously not! Even though the map is not the territory, even though the LLM does not have access to a lot of information -- that does not prevent it from producing actual reasoning, actual intelligence. About love, running, the wind moving through the trees like a restless sea -- it can reason about anything that is *legible to it*. Text. There's a lot of text, more than you could read in a human lifetime.

Remember: it only knows about text. 

## Confidence

The text that comes out of these LLMs sounds very confident. This is because most good text is confident. Your physics textbook does not say "well, maybe kinetic energy is quadratic with respect to velocity, but I could be wrong on that..." Most text is written because someone knew something, or thought they knew something, and wrote to tell you about it. This is what these LLMs have looked at, this is what they know.

So even when they know nothing about the topic at hand, they will confidently spew wrong answers. Remember, the model in a single flash picks the top probability hypercube and loads it instantly. It has no cause-and-effect thinking process. It just picks the likeliest next word. So it cannot determine the confidence with which it answers, because "confidence" is an alien concept to it. It just doesn't think that way.

Remember: very confident, and maybe very wrong.

## Alignment? AGI? P(doom)?

Some people out there have declared that this technology will become smarter than us. If it becomes smarter than us, it might figure out how to improve itself. And if it improves itself a bunch of times, it will get even smarter. And pretty soon it'll destroy everything in the light cone.

These AI doom people have managed to actually achieve a sizeable footprint in the discussion about AI. One should be wise to consider that what they are saying is literally science fiction -- it hasn't happened, it's not happening, and, like most wild speculation, it probably never will. There were some talks of banning "AI research" (yeah, okay.) or putting a 6 month moratorium on LLM development (again: yeah, okay.) If anyone tries to use these sci-fi arguments to favor centralization and regulation of this technology, what they are actually doing is trying to centralize and control this powerful technology *for themselves and for their own ends.* In my view: much more dangerous than some mightily improbable but infinitely destructive runaway super-intelligence.

My favorite discussion about this so far has been [Oxide and Friends 6/26/2023 -- Okay, Doomer: A Rebuttal to AI Doom-mongering ](https://www.youtube.com/watch?v=r3qZJBfHI0Y). It's funny, sane, and has both feet firmly planted in the real world.

That said, these AI doom people are a bunch of nerds having fun. You love to see it.

## Real Intelligence?

I won't go so far as to say that this is "just" a machine, though. It's really changed my view and forced me to think hard about what intelligence actually means.

This post puts it best:

> The other day I saw this Twitter thread. Briefly: GPT knows many human languages, InstructGPT is GPT plus some finetuning in English. Then they fed InstructGPT requests in some other human language, and it carries them out, following the English-language finetuning.
> 
> And I thought: so what? Isn’t this expected behaviour? Then a friend pointed out that this is only confusing if you think InstructGPT doesn’t understand concepts.
> 
> Because if GPT is just a Chinese room it shouldn’t be able to do this. A Chinese room might be capable of machine translation, or following instructions within one human language, but the task here is so self-evidently outside the training set, and so convoluted, that is requires genuine understanding. The task here involves:
> 
> + Abstracting the English finetuning into concepts.
> + Abstracting the foreign-language requests into concepts.
> + Doing the “algebra” of the task at the conceptual level.
> + Mapping the results back down to the foreign language.
> 
> The mainstream, respectable view is this is not “real understanding”—a goal post currently moving at 0.8c—because understanding requires frames or symbols or logic or some other sad abstraction completely absent from real brains. But what physically realizable Chinese room can do this?
> 
> Every pair of token sequences can, in principle, be stored in a lookup table. You could, in principle, have a lookup table so vast any finite conversation with it would be indistinguishable from talking to a human, the Eliza of Babel. Just crank the n higher for a conversation lasting a time t. But it wouldn’t fit in the entire universe. And there is no compression scheme—other than general intelligence—that would make it fit. But GPT-3 masses next to nothing at 800GiB.
> 
> How is it so small, and yet capable of so much? Because it is forgetting irrelevant details. There is another term for this: abstraction. It is forming concepts. There comes a point in the performance to model size curve where the simpler hypothesis has to be that the model really does understand what it is saying, and we have clearly passed it.

[Fernando Boretti - And Yet It Understands](https://borretti.me/article/and-yet-it-understands)

Highly recommended reading, that. I share the sentiment.

It is undeniable. Human intelligence ain't special; this thing has something like human intelligence; it may, in the future, exceed human intelligence; it may have already in some ways exceeded human intelligence.

Also. Humans will always have an edge over this thing, when it comes to the physical world (for you AI doomers: the place outside the computer screen). And, although it's legible to us, it's not like us. "AGI" (stupid term) will not look like us.

And of course: if you have not at least asked a couple of questions, tried to probe it a bit -- you are missing out on some star trek ass shit.

<hr>

[1] *Blindsight*, Peter Watts

[2] Yeah, I know our knowledge is based on perception which isn't actually real, that the universe itself is a map-territory relation, with no territory at the bottom layer. I know that reality is just information and nothing is real beyond abstract, semantic relationships between pieces of information, themselves encoded as information. Fuck you, lol.

[3] If you, the reader, cannot run for some reason, forgive me for the metaphor. But you probably actually understand to a greater degree what I mean. It's really tough for me to imagine not being able to run, because being able to use my legs is a really central part of my body. If you tried to explain to me what it is like to live as a person without that ability, I probably would not fully understand. You may not understand what it is like to have type 1 diabetes -- no matter how much text I write about it. You wouldn't *get* what DKA feels like. The LLM does not *get* what *anything* feels like. But, it can describe!