<script lang="ts">
  import { onMount } from "svelte";

  import * as bg from "$lib/background";
  // import * as hover from "../ts/hover";
  import { links, song } from "$lib/stores";

  onMount(() => {
    bg.init();
    // hover.init();
  });
</script>

<svelte:head>
  <title>tetra</title>
</svelte:head>

<div id="container">
  <span id="logo" title="logo by evie atarax" data-hover />
  <span id="nowplaying" title="what i'm currently listening to" class:visible={$song.playing}
    >{$song.artist.toLowerCase()} - {$song.title.toLowerCase()}</span>
  <div id="links">
    {#each $links as link}
      <a data-hover rel="me" href={link.url}>{link.name.toLowerCase()}</a>
    {/each}
  </div>
</div>
