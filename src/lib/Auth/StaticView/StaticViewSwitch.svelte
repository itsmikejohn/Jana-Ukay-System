<script lang="ts">
    import { staticState } from "$lib/state";
    import Home from "./Home/Home.svelte";
    import LoginSwitch from "./Login/LoginSwitch.svelte";
    import ShopSwitch from "./Shop/ShopSwitch.svelte";
</script>

<main>
    {#if $staticState.activeItem === "Home"}
        <Home />
    {:else if $staticState.activeItem === "Login"}
        <LoginSwitch />
    {:else if $staticState.activeItem === "Shop"}
        <ShopSwitch />
    {/if}
</main>