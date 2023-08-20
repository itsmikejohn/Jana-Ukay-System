<script lang="ts">
    export let title = "btn";
    export let loader = false;
    export let loader_title = "loader btn";
    export let rounding = "rounded-none";
    export let color = "bg-blue-500";
    export let hasDark = true;
    
</script>

<button class="w-full px-2 py-1 {color} text-white {hasDark ? "dark:bg-green-500" : `dark:${color}`} transition-all active:scale-95 hover:opacity-40 {rounding}" disabled={loader} 
on:click>
    {#if loader}
        <section class="flex gap-2 items-center justify-center">
            <p>{loader_title}</p>
            <div class="w-4 h-4 border-2 border-b-black animate-spin rounded-full"></div>
        </section>
    {:else}
        <p>{title}</p>
    {/if}
</button>