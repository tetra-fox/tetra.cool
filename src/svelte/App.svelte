<script lang="ts">
  export let title: string;
  import {links, song} from "../ts/stores";
  import * as hover from "../ts/components/hover";
  import * as bg from "../ts/components/background";
</script>

<svelte:window on:load={bg.init} on:load={hover.init} />

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div id="container">
  <span id="logo" title="logo by evie atarax" data-hover/>
  <span
    id="nowplaying"
    title="what i'm currently listening to"
    class:visible={$song.playing}
    >{$song.artist.toLowerCase()} - {$song.title.toLowerCase()}</span
  >
  <div id="links">
    {#each $links as link}
      <a data-hover href={link.url}>{link.name.toLowerCase()}</a>
    {/each}
  </div>
</div>
