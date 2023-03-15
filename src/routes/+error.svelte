<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import * as bg from "$lib/background";

  onMount(async () => {
    bg.init(true);
  });
</script>

<div id="container">
  <h2>Error {$page.status}</h2>
  <p>{$page.error?.message}</p>
  <div id="links">
    <a href="/">back to home</a>
  </div>
</div>

<style lang="scss">
  #container {
    color: #fff;
  }
</style>
