<script lang="ts">
    import { staticState } from "$lib/state";
    import {fly} from "svelte/transition";
    import icon from "$lib/Photos/icon.png";

    import { LightSwitch } from '@skeletonlabs/skeleton';




    export let array_data = ["Home", "Shop", "Login"];

    const dsComp = {
        showMenu: false,
    }

    const showMenu = () => dsComp.showMenu = !dsComp.showMenu;

    const selectionHandler = (selection: string) =>
    {
        $staticState.activeItem = selection;
        dsComp.showMenu = false;
    }
    
</script>

<nav class="fixed w-full bg-blue-500 top-0 left-0 right-0 p-2 flex items-center z-10">

    <section class="w-full">
        <LightSwitch />
    </section>
    

    <section class="hidden md:flex gap-2 mr-5">
        {#each array_data as selection}
            <button class="p-2 px-4 hidden sm:flex hover:border-[0.1rem] active:scale-95"
            class:active={$staticState.activeItem === selection}
            on:click={() => selectionHandler(selection)}
            >
                {selection}
            </button>
        {/each}
    </section>

    <section class="w-full md:hidden">

    </section>

    <button class="flex flex-col gap-1 rounded-full p-2 transition-all active:bg-slate-300 active:opacity-50 hover:scale-105 active:scale-95 md:hidden"
    on:click={() => dsComp.showMenu = true}
    >
        <div class="w-6 border-2 border-black dark:border-white"></div>
        <div class="w-6 border-2 border-black dark:border-white"></div>
        <div class="w-6 border-2 border-black dark:border-white"></div>
    </button>

    
</nav>
{#if dsComp.showMenu}
    <main class="fixed left-0 right-0 top-0 bottom-0 md:hidden z-10" 
    on:keydown={() => {}}
    on:click={() => dsComp.showMenu = false}
    >
        <menu class="fixed bottom-0 top-0 right-0 bg-blue-500 flex flex-col md:hidden" transition:fly={{x:100, duration:300}}>
            <section class="p-2">
                <button class="flex flex-col gap-1 p-2 py-4"
                on:click={() => dsComp.showMenu = false}
                >
                    <div class="w-6 border-2 border-black dark:border-white rotate-45"></div>
                    <div class="w-6 border-2 border-black dark:border-white absolute rotate-[-45deg]"></div>
                </button>
            </section>
    
            <section class="flex flex-col gap-2 items-center m-5">
                <p class="h3 font-semibold">THRIFT.RAREPH</p>
                <img src={icon} alt="loading" class="w-36"/>
            </section>
    
            {#each array_data as selection}
                <button class="p-4 h3"
                class:active={$staticState.activeItem === selection}
                on:click={() => selectionHandler(selection)}
                >
                    {selection}
                </button>
            {/each}
            
        </menu>
    </main>
{/if}


<style>
    .active{
        background-color: grey;
    }
</style>


