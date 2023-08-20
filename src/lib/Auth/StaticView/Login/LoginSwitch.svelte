<script lang="ts">
    import { staticState } from "$lib/state";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Recover from "./Recover.svelte";
</script>

<main>
    {#if $staticState.showReg}
        <Register />
    {:else if $staticState.showRec}
        <Recover />
    {:else}
        <Login />
    {/if}
</main>