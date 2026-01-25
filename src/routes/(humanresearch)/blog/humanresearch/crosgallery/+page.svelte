<script module>
  export const date = "2025-12-08";
</script>

<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
</script>

<BlogHeader {date} title="Internals of the CrOS gallery" />
<p>
  The gallery is internally called "media app". You can open it by typing in "chrome://media-app".
</p>
<p>
  The gallery lives in <code>chrome/browser/ash/system_web_apps/apps/media_app/</code> and
  <code>ash/webui/media_app_ui/</code>. You can download <code>chrome/</code> and <code>ash/</code>
  with the URL format
  <code>https://chromium.googlesource.com/chromium/src/+archive/main/[name].tar.gz</code>
</p>
<p>
  The innermost internals aren't public, instead mocked by <code
    >ash/webui/media_app_ui/resources/mock/js/app_main.ts</code
  >.
</p>
