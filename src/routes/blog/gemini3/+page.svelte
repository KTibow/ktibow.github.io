<script module>
  export const date = "2025-11-18";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {date} title="Gemini 3: you need to actually make the hype transfer" {bg} />
<p>
  This is a list of grievances written in rage about how I can't use what's been hyped for the last
  month. Not sure if you want to read this.
</p>

<h2>I don't know if I'm using Gemini 3 on the official website</h2>
<p>
  On Gemini 3 day, the day when it should be very clear about how to use it, Google decides to stop
  labeling their models. They just have "Thinking: Thinks through complex topics" now.
</p>
<p>
  You can't even ask it if it's Gemini 3 because they didn't prompt it with context about what it
  is.
</p>

<h2>I can't use Gemini 3 via AI Studio</h2>
<p>
  Google is many times more restrictive with AI Studio than with core products like Google. In fact
  40-50% of humanity can't use AI Studio.
</p>

<h2>I can't use Gemini 3 via the free API</h2>
<p>
  They just decided to not allow this. No reason given. (It's also hard to find this out; see the
  second-last 2 sections)
</p>

<h2>I + most people can't use Gemini 3 via Gemini CLI</h2>
<p>
  I can't log in for the same reason as not being able to use AI Studio, although the error is very
  bad (will get to that in a moment). But even if I could, it sounds like (as of writing) only Ultra
  subscribers can use Gemini 3! For context, Gemini 2.5 was accessible to <em>free</em> users!
</p>

<h2>Other people can't use Gemini 3 via the Antigravity IDE</h2>
<p>
  I haven't downloaded it but it sounds like the limits are so harsh the agent can't even complete
  one task without hitting them.
</p>

<h2>I can't use Gemini 3 via GitHub Copilot</h2>
<p>Is it supposed to be rolling out? Yes. Has it yet? No.</p>

<h2>Server downtime</h2>
<p>Even home pages and doc pages have been erroring.</p>

<h2>Unclear about limitations</h2>
<p>
  It's between hard and impossible to see that you can't use Gemini 3 via the API or via Gemini CLI
  for free from the articles blowing up on HN. They just don't note that.
</p>

<h2>And when those limitations hit, the error messages are bad</h2>
<p>
  When text should be selectable and clickable, it isn't. When Google should be saying "your account
  doesn't let you use Gemini directly", they say "This account requires setting the
  GOOGLE_CLOUD_PROJECT or GOOGLE_CLOUD_PROJECT_ID env var.". When Google should be saying
  "https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/authentication.md#optional-set-your-google-cloud-project",
  they say "https://goo.gle/gemini-cli-auth-docs#workspace-gca". When Google should be saying
  "Gemini 3 Pro isn't available on the free tier", they say "Quota exceeded for metric:
  generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model:
  gemini-3-pro" and "Enter a new quota value between 0 and 0".
</p>

<h2>"It doesn't matter if the product's good"</h2>
<p>
  You can say this about startups where they clearly have room for growth and you can understand
  having a terrible and laggy sign up process. But not Google! The same Google that's been going
  crazy with AI, spinning up incubators and poaching devrel folks! We expect a lot from Google, and
  having to access their models via third party platforms isn't it.
</p>
