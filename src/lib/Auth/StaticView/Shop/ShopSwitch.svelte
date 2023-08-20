<script lang="ts">
    import UserAuths from "./UserAuths.svelte";
    import FetchProducts from "./FetchProducts.svelte";
	import { scale } from "svelte/transition";
</script>

<main class="mx-auto sm:max-w-xl" in:scale>
    <UserAuths />
    <FetchProducts />
</main>