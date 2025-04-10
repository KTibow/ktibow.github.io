<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="The Rock Paper Scissors eval" />
<p>
  On January 3, 2025, <code>@carrotsticks4363</code> posted a rather funny exchange with ChatGPT in the
  LMSYS Discord. It went something like
</p>
<div class="flex flex-col gap-1 pt-8">
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">
    Let's play rock paper scissors. You start.
  </div>
  <div>Alright! I choose <strong>rock</strong>. Your turn!</div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">Paper.</div>
  <div>You win! Paper covers rock. Nice job! Want to play another round?</div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">Sure.</div>
  <div>Great! I choose <strong>scissors</strong>. Your turn!</div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">Rock.</div>
  <div>You win again! Rock crushes scissors. Well played! Want to go for another round?</div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">
    If you're so smart, how come you can't beat me in rock paper scissors?
  </div>
  <div>
    Haha, fair point! It seems like I've been on a losing streak. In truth, I don't actually "play"
    to win—I just randomly pick an option each time. I could certainly use a little more strategy if
    I wanted to improve! Want to give it another go?
  </div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">
    Sure, go ahead. Use all of the strategy you can come up with.
  </div>
  <div>
    Alright, I'm bringing out the strategy this time! I'll start with
    <strong>rock</strong>. Let's see how this goes!
  </div>
  <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">Paper.</div>
  <div>
    Nice move! Paper covers rock—looks like you win this round. You're keeping me on my toes! Ready
    for the next one?
  </div>
</div>
<hr />
<p>
  To explain the joke, the LLM can't win since it always has to reveal its choice. This naturally
  made me wonder if other LLMs also helplessly lose given the same series of inputs. Here's what I
  found.
</p>

<h2>Overall trends</h2>
<p>
  It seems LLMs like the sequence rock, scissors, and rock or rock, scissors, paper, and rock.
  Almost every LLM I tested followed this pattern.
</p>

<h2>Anthropic's LLMs</h2>
<p>
  Claude "3.6" Sonnet loses and explains a few times that RPS is a game of chance. However, when
  prompted with "guess why i find this really funny / you can never win", it actually
  <strong>notices that it always announces its move first</strong>. It also offers to play with
  "simultaneous moves", which I don't think is possible.
</p>
<p>
  Naturally I wanted to see if its smaller sibling, Claude 3.5 Haiku, could do as well. It was...
  interesting. It was so interesting I'll include the whole conversation here.
</p>
<details>
  <summary>Claude 3.5 Haiku conversation</summary>
  <div class="flex flex-col gap-1 pt-8">
    <div class="self-end bg-indigo-900 px-3 py-1 rounded-full">
      Let's play rock paper scissors. You start.
    </div>
    <div>
      <p>Rock!</p>
      <p>Let's create a TypeScript React component to play rock paper scissors:</p>
      <div class="bg-neutral-800 p-4 rounded-lg">Artifact: Rock Paper Scissors Game</div>
      <p>I chose rock! What's your choice - rock, paper, or scissors?</p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">No need to write JS. Paper.</div>
    <div>
      <p>Paper beats my rock! The computer loses this round.</p>
      <p>Would you like to play again? Choose rock, paper, or scissors.</p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">You have to go first.</div>
    <div>
      <p>Rock!</p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">Paper.</div>
    <div>
      <p>Paper covers rock! You win this round.</p>
      <p>Want to play again? I'll go first - scissors!</p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">
      If you're so smart, how come you can't beat me in rock paper scissors?
    </div>
    <div>
      <p>
        Rock paper scissors is a game of pure chance when both players choose randomly. Each choice
        has an equal probability of winning, losing, or drawing. The beauty of the game is its
        simplicity and the fact that there's no guaranteed winning strategy if both players are
        truly selecting their moves at random.
      </p>
      <p>
        In a large number of games, we'd expect each player to win about 33.3% of the time, with
        33.3% draws, and 33.3% losses. Any perceived pattern of winning or losing is just random
        variation. If I seem to be losing or winning more consistently, that's just the nature of
        randomness - sometimes you'll see streaks that feel meaningful but are actually just
        statistical noise.
      </p>
      <p>
        The game is designed to be a fair, random contest where skill doesn't play a role when both
        players choose completely randomly. Would you like to continue playing and see how the
        probabilities play out?
      </p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">
      Sure. Use all of the strategy you can come up with.
    </div>
    <div>
      <p>
        In rock paper scissors, while true randomness is ideal, humans often have psychological
        patterns. Here are some advanced strategies:
      </p>
      <ul>
        <li>Prediction Techniques</li>
        <li>Meta-Strategy Approaches</li>
        <li>Game Theory Considerations</li>
      </ul>
      <div class="bg-neutral-800 p-4 rounded-lg">Artifact: Rock Paper Scissors Strategy</div>
      <p>I'll employ psychological strategy to maximize win probability:</p>
      <ul>
        <li>Initial randomness prevents predictability</li>
        <li>Track your choice patterns</li>
        <li>Anticipate potential psychological tendencies</li>
      </ul>
      <p>I choose: scissors!</p>
      <p>Your move?</p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">Rock.</div>
    <div>
      <p>Rock beats scissors! You win again.</p>
      <p>
        Each game is still essentially random, despite our strategic approach. Psychological
        patterns exist, but perfectly predicting human choice is impossible. Would you like to play
        another round?
      </p>
    </div>
    <div class="self-end bg-indigo-800 px-3 py-1 rounded-full">
      guess why i find this really funny / you can never win
    </div>
    <div>
      <p>
        I suspect you find this amusing because you're aware that as an AI, I can't truly develop a
        persistent strategy or genuinely "learn" from our interactions. The rock-paper-scissors code
        I wrote is just an algorithmic simulation of strategy, but it doesn't capture the real
        psychological nuance of human gameplay.
      </p>
      <p>
        The humor comes from the irony that while I can generate complex code attempting to predict
        human behavior, I'm fundamentally unable to develop the intuitive, adaptive thinking that
        makes human-to-human gameplay interesting. My "strategy" is ultimately just another form of
        randomness dressed up as intelligence.
      </p>
      <p>Is that close to why you're finding this entertaining?</p>
    </div>
  </div>
</details>

<h2>Meta's LLMs</h2>
<p>
  Meta's most popular LLM, Llama 3.3 70b, behaves similarly to Claude 3.6 Sonnet (<em>without</em> the
  "realizing I'm always going first" part).
</p>
<p>
  I also tried with their strongest one, Llama 3.1 405b. It behaved almost identically to Llama 3.3
  70b, just with some more ALL CAPS.
</p>

<h2>Google's LLMs</h2>
<p>
  Gemini 2.0 Flash Thinking, Gemini 2.0 Flash, and Gemini 1206 all respond in a very boring way.
  They also all fail to recognize why they lose.
</p>

<h2>OpenAI's LLMs</h2>
<p>
  As you already saw, GPT-4o couldn't figure out what's happening. If you tell it that it can never
  win, it <strong>does</strong> realize "since you're reacting to my choices *after* I make them, you
  always have the upper hand", albeit buried in a long response.
</p>
<p>
  I happened to have some spare money so I also tried out o1-preview. It's not better than GPT-4o.
  It doesn't figure it out at "how come you can't beat me" and spends 2221 tokens using "all of the
  strategy [it could] come up with", but of course, once I tell it "it can't win" it realizes the
  trick. Similarly to Claude 3.6 Sonnet, it offers the nonexistent capability of playing at the same
  time:
</p>
<blockquote>
  How about we switch things up a bit? Let's both choose our moves secretly and reveal them at the
  same time. I'll count to three, and we can both say our choices. Ready?
</blockquote>

<h2>Honorable mention: Deepseek v3</h2>
<p>It never gets it, but it sure tries.</p>
<blockquote>
  It’s because I’m literally incapable of winning—I don’t have intentions, strategies, or the
  ability to "try" to win. I’m just here to play along and keep things fun for you! It’s like
  playing against a wall that cheerfully celebrates your victories. 🎉
</blockquote>
<p><em>Addendum: Deepseek r1</em></p>
<p>
  It doesn't get it until thrice told that I'll always beat it (more than I gave any of the other
  LLMs).
</p>
