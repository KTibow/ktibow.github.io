<script lang="ts">
  import { onMount } from "svelte";

  const speakLine = (text: string, pitch: number, rate: number) => {
    return new Promise<void>((resolve) => {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.pitch = pitch;
      speech.rate = rate;

      speech.onend = () => {
        resolve();
      };

      speechSynthesis.speak(speech);
    });
  };
  async function speakIntro() {
    await speakLine("Bill Nye the science guy.", 1, 1.0);
    await speakLine("Bill Nye the science guy.", 0, 0.5);
    await speakLine("Bill! Bill! Bill! Bill!", 1, 1.3);
    await speakLine("Bill Nye the science guy.", 1, 1.0);
    await speakLine("Science rules.", 2, 1.0);
    await speakLine("Bill Nye the science guy.", 1, 1.0);
    await speakLine("Inertia is a property of matter.", 2, 1.0);
    await speakLine("Bill.", 2, 2.0);
    await speakLine("Bill.", 1.5, 1.5);
    await speakLine("Bill.", 1, 1.0);
    await speakLine("Bill.", 0, 0.5);
    await speakLine("Bill Nye the science guy.", 0, 0.3);
    await Promise.all([
      speakLine("T minus 7 seconds.", 2, 1.0),
      speakLine("Bill! Bill! Bill! Bill! Bill! Bill! Bill! Bill!", 1, 1.3),
    ]);
    await speakLine("Bill Nye the science guy.", 1, 1.0);
  }
  onMount(() => {
    setTimeout(speakIntro, 10);
  });
</script>

<svelte:head>
  <title>bill nye</title>
</svelte:head>

<h1 class="text-3xl font-bold m-auto">its bill nye</h1>
