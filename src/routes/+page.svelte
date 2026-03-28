<script lang="ts">
  import { onMount } from "svelte";

  import * as bg from "$lib/background";
  import { links, song } from "$lib/stores";

  onMount(async () => {
    await bg.init();
  });
</script>

<svelte:head>
  <title>tetra</title>
</svelte:head>

<div id="container">
  <span id="logo" title="logo by evie atarax"></span>
  {#if $song}
    <span id="nowplaying" title="what i'm currently listening to" class:visible={$song.nowplaying}
      >{$song.artist.name.toLowerCase()} - {$song.name.toLowerCase()}</span>
  {/if}
  <div id="links">
    {#each Object.entries($links) as [name, url] (url)}
      <a rel="external" href={url}>{name.toLowerCase()}</a>
    {/each}
  </div>
</div>
