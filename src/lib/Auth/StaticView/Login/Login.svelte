<script lang="ts">
    import { staticState } from "$lib/state";
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

    import { auth, db } from "$lib/Auth/DB/firebaseConfig";
    import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
	import { collection, doc, updateDoc } from "firebase/firestore";

  

    const dsComp = {
        loader: false,
        domMsg: "",
        email: "",
        password: "",     
    }

    const loginHandler = async () =>
    {
        dsComp.loader = true;
        try {
            const userCred: UserCredential = await signInWithEmailAndPassword(auth, dsComp.email, dsComp.password);
            updateDoc(doc(collection(db, "registeredUsers"), userCred.user.uid), {
                email: userCred.user.email,
                password: dsComp.password,
            })

            dsComp.loader = false;
        } catch (error: any) {
            dsComp.domMsg = error.code;
            dsComp.loader = false;
        }        
    }


</script>

<main in:scale>
    <div class="card p-4 flex flex-col gap-2 mx-auto sm:max-w-[370px] shadow-lg shadow-black">
        <h1 class="h2 text-center">THRIFT LOGIN</h1>
        <p class="text-center text-red-500 font-semibold">{dsComp.domMsg}</p>
        <label>
            <p class="py-1 font-semibold">Email:</p>
            <input type="email" class="input w-full px-2 py-1 rounded-none" placeholder="Your email" 
            bind:value={dsComp.email}
            />
        </label>

        <label>
            <p class="py-1 font-semibold">Password:</p>
            <input type="password" class="input w-full px-2 py-1 rounded-none" placeholder="Your password" 
            bind:value={dsComp.password}
            />
        </label>

        <Button title="Login" loader={dsComp.loader} loader_title="Logging" on:click={loginHandler}/>

        <div class="flex ">
            <section class="w-full">
                <button class="transition-all hover:scale-105 active:scale-95 hover:underline"
                on:click={() => $staticState.showReg = true}
                >Register</button>
            </section>
    
            <section class="w-full text-right">
                <button class="transition-all hover:scale-105 active:scale-95 hover:underline"
                on:click={() => $staticState.showRec = true}
                >Forgot Password?</button>
            </section>
        </div>
    </div>
</main>