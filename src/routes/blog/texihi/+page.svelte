<script>
  import latex from "svelte-highlight/languages/latex";
  import BlogHeader from "$lib/BlogHeader.svelte";
  import Snippet from "$lib/Snippet.svelte";
  import bg from "./bg.avif";
  import screenshot from "./screenshot.png";
</script>

<BlogHeader {bg} title="TeXIHI" />
<p>
  Last Sunday, I decided to use real LaTeX for my homework. I spent more hours than I would like to
  admit on it, yet I'm very satisfied with the results.
</p>
<p>
  Why so long? Why is this title "TeX I hate it"? Why didn't I just use a standard template and move
  on? Because I wanted to have clear question-answer separation in the dumbest way possible.
</p>
<img src={screenshot} alt="you know, this kind of thing, the answer is in a different font" />
<p>Here's what I remember of the process.</p>

<h2>Getting to a starting point</h2>
<p>
  I explained to Claude 3.5 Sonnet, my favorite LLM, what I wanted to do. Most of its suggestions
  didn't work in one way or another: the font (Excalifont) carried on past the answer section, or
  some math symbols didn't load, or numbers didn't use the font. However, I got to a starting point:
</p>
<Snippet
  language={latex}
  code={String.raw`\documentclass{article}
\usepackage{fontspec}
\usepackage{unicode-math}

\newenvironment{answer}
  {\begingroup
   \setmainfont{Excalifont.ttf}
   \setmathfont{Excalifont.ttf}
   \setmathfont{Excalifont.ttf}[range=it]
  }
  {\endgroup}

\begin{document}

Math before answer: $x + y = z$

\begin{answer}
Math inside answer: $a + b = c$
\end{answer}

Math after answer: $x + y = z$

\end{document}`}
/>
<h2>Asking for help</h2>
<p>
  The problem with that code is that math following the
  <code>answer</code> block is messed up. I formulated a question that included a minimal demo and took
  to three places:
</p>
<ol>
  <li>
    The <a href="https://tex.stackexchange.com">TeX Stack Exchange</a>, a community of professional
    TeXers.
  </li>
  <li>
    <a href="https://pvq.app">Pvq</a>, an experimental AI-powered forum
  </li>
  <li>Asking Claude many more times</li>
</ol>
<p>
  The TeX community explained how I made numerous errors, including using
  <code>\setmainfont</code> in a group, redundantly importing
  <code>unicode-math</code>, and redundantly declaring a group. The guy from TeX also showed how to
  do it the TeX way. While this helped clean up my code, it didn't fix things.
</p>
<p>Pvq more or less failed. The grader was a bit borked and none of the AIs were helpful.</p>
<p>
  However, when I gave my whole problem statement to Claude, after a bit of refining it came up with
  something that worked. It included some unnecessary stuff but the real change was only calling
  <code>\setmathfont</code> <em>once</em> with a wider
  <code>range</code> (<code>&lbrace;up,it,"0030-"007A,"002B,"00D7&rbrace;</code>)
</p>

<h2>Scaling it up</h2>
<p>
  While that worked, it didn't scale. It had to reload Excalifont every time, making it slow and
  eventually erroring due to too many fonts being loaded.
</p>
<p>
  <code>unicode-math</code> has a solution for this, <code>version</code>. Let's just load the font
  once with <code>version</code>, switch between the versions, and everything will be okay! Right?
</p>
<p>
  Unfortunately, <code>version</code> and <code>range</code> don't work together. If you use them
  both at once, only <code>range</code> applies (the last <code>\mathfontset</code> applies to all
  math). You can't just drop <code>range</code> instead since it'll make
  <code>unicode-math</code> try to use math Unicode for letters and the Greek alphabet, which Excalifont
  doesn't have.
</p>

<h2>Messing around more</h2>
<p>
  Since I had to find something that scaled, I tried a lot of random stuff from there. I even tried
  one approach without <code>unicode-math</code>. But eventually, I figured out that I <em>can</em>
  drop
  <code>range</code>. I just have to:
</p>
<ol>
  <li>
    Set <code>math-style=upright</code> when using
    <code>unicode-math</code>
  </li>
  <li>
    Renew <code>\pi</code> and <code>\theta</code> to their non-italic Unicode equivalents (since step
    1 doesn't fix them for some reason)
  </li>
</ol>
<details>
  <summary class="cursor-pointer">Minimal, fixed preamble</summary>
  <Snippet
    language={latex}
    code={String.raw`\documentclass{article}
\usepackage[math-style=upright]{unicode-math}

\newfontfamily\excalifont{Excalifont.ttf}
\setmathfont{latinmodern-math.otf}
\setmathfont{Excalifont.ttf}[version=ex]
\newenvironment{answer}
  {\excalifont
    \mathversion{ex}
    \renewcommand{\pi}{π}
  }
  {}`}
  />
</details>
<details>
  <summary class="cursor-pointer">My final preamble</summary>
  <Snippet
    language={latex}
    code={String.raw`\documentclass[preview,border=10pt,varwidth=4in]{standalone}
\usepackage[math-style=upright]{unicode-math}
\usepackage{color}
\usepackage{graphicx}
\usepackage{enumerate}

\newfontfamily\excalifont{excalimath.ttf}
\setmathfont{latinmodern-math.otf}
\setmathfont{latinmodern-math.otf}[version=no]
\setmathfont{excalimath.ttf}[version=ex]
\definecolor{blue}{RGB}{25, 113, 194}
\newenvironment{answer}
  {
  \excalifont
  \mathversion{ex}
  \renewcommand{\pi}{π}
  \renewcommand{\theta}{θ}
  \renewcommand{\alpha}{α}
  \renewcommand{\beta}{β}
  }
  {
  \mathversion{no}
  }
\newcommand{\important}[1]{
    \fbox{\parbox{\dimexpr\textwidth-2\fboxsep-2\fboxrule\relax}{#1}}
}
\newcommand{\br}{\vspace{1em}}
\newcommand{\hl}[1]{\textcolor{blue}{#1}}
\newcommand{\degree}{°}

\makeatletter
\def\raiseV#1{\raisebox{%
  \ifx#1\displaystyle0.5ex\else
  \ifx#1\textstyle0.5ex\else
  \ifx#1\scriptstyle0.2ex\else
  0.15ex\fi\fi\fi}{V}}

\newcommand{\sqr}[2][]{%
  {\mathversion{ex}%
    \mathpalette\raiseV{}%
    \mkern-2mu%
    \if\relax\detokenize{#1}\relax\else
      \mkern-7mu^{^{\scriptstyle#1}}%
    \fi
    \mathpalette\overbar{\mkern2mu#2\mkern2mu}%
  }%
}
\def\overbar#1#2{\vbox{\hrule\kern0.8pt\hbox{$#1#2$}}}
\makeatother`}
  />
</details>
