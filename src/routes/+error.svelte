<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  import * as bg from "$lib/background";

  onMount(() => {
    bg.init(true);
  });
</script>

<div id="container">
  <h2>Error {page.status}</h2>
  <p>{page.error?.message}</p>
  <br />
  <div id="links">
    <a href={resolve("/")}>back to home</a>
  </div>
</div>

<style>
  #container {
    color: #fff;
  }
</style>
