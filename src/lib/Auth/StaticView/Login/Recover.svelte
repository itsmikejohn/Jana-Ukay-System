<script lang="ts">
    import { staticState } from "$lib/state";
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

    import { auth } from "$lib/Auth/DB/firebaseConfig";
    import { sendPasswordResetEmail } from "firebase/auth";

    const dsComp = {
        loader: false,
        domMsg: "",
        email: "",
    }

    const recoverHander = async () =>
    {   
        dsComp.loader = true;
        try {
            await sendPasswordResetEmail(auth, dsComp.email);
            dsComp.loader = false;
            dsComp.domMsg = "Success check your email"
        } catch (error: any) {
            dsComp.domMsg = error.code;
            dsComp.loader = false;
        }
    }

</script>

<main in:scale>
    <div class="card p-4 flex flex-col gap-2 mx-auto sm:max-w-[370px] shadow-lg shadow-black">
        <h1 class="h2 text-center">ACC RECOVERY</h1>
        <p class="text-center text-red-500 font-semibold">{dsComp.domMsg}</p>
        <label>
            <p class="py-1 font-semibold">Email:</p>
            <input type="email" class="input w-full px-2 py-1 rounded-none" placeholder="Your email" bind:value={dsComp.email}/>
        </label>

        <Button title="Recover" loader={dsComp.loader} loader_title="Sending Password" on:click={recoverHander}/>

        <div class="flex ">
            <section class="w-full text-right">
                <button class="transition-all hover:scale-105 active:scale-95 hover:underline"
                on:click={() => $staticState.showRec = false}
                >Login here</button>
            </section>
        </div>
    </div>
</main>