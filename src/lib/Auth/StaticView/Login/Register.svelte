<script lang="ts">
    import { staticState } from "$lib/state";
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

    import { auth, db } from "$lib/Auth/DB/firebaseConfig";
    import { createUserWithEmailAndPassword, updateProfile, type UserCredential } from "firebase/auth";
    import { setDoc, doc, collection, serverTimestamp} from "firebase/firestore";

    type RegisterVar = {
        photoURL: string;
        fullname: string;
        gender: string;
        email: string;
        password: string;
    }

    const dsComp = {
        loader: false,
        domMsg: "",
        fullname: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoURL: "",
    }

    const fbRegister = async (passedVal:  RegisterVar  ) =>
    {
        const {photoURL, fullname, gender, email, password} = passedVal;
        dsComp.loader = true;
        try {
            const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

           
            await updateProfile(userCred.user, {
                    displayName: fullname,
                    photoURL: photoURL,
            })
            
            await setDoc(doc(collection(db, "registeredUsers"), userCred.user.uid),{
                createdAt: serverTimestamp(),
                uid: userCred.user.uid,
                photoURL: userCred.user.photoURL,
                fullname: userCred.user.displayName,
                gender: gender,
            }, {merge:true})

            dsComp.loader = false;
            

        } catch (error: any) {
            dsComp.domMsg = error.code;
            dsComp.loader = false;
        }
        
    }

    const registerHandler = () =>
    {
        if(dsComp.confirmPassword === dsComp.password)
        {
            if(dsComp.gender.trim().length > 3)
            {
                if(dsComp.fullname.trim().length > 5)
                {
                    if(dsComp.gender === "Male")
                    {
                        dsComp.photoURL = "Man image";
                        fbRegister(dsComp);
                    }else
                    {
                        dsComp.photoURL = "Girl image";
                        fbRegister(dsComp);
                    }
                }else
                {
                    dsComp.domMsg = "Invalid fullname";
                }
            }else
            {
                dsComp.domMsg = "Invalid gender";
            }
        }else
        {
            dsComp.domMsg = "password not same";
        }
        
    }


</script>

<main in:scale>
    <div class="card p-4 flex flex-col gap-2 mx-auto sm:max-w-[370px] shadow-lg shadow-black">
        <h1 class="h2 text-center">THRIFT REGISTER</h1>
        <p class="text-center text-red-500 font-semibold">{dsComp.domMsg}</p>


        <label>
            <p class="py-1 font-semibold">Gender:</p>
            <select class="select rounded-none px-2 py-1" bind:value={dsComp.gender}>
                <option>Male</option>
                <option>Female</option>
            </select>
        </label>


        <label>
            <p class="py-1 font-semibold">Fullname:</p>
            <input type="text" class="input w-full px-2 py-1 rounded-none" bind:value={dsComp.fullname}/>
        </label>

        <label>
            <p class="py-1 font-semibold">Email:</p>
            <input type="email" class="input w-full px-2 py-1 rounded-none" bind:value={dsComp.email}/>
        </label>

        <label>
            <p class="py-1 font-semibold">Password:</p>
            <input type="password" class="input w-full px-2 py-1 rounded-none" bind:value={dsComp.password}/>
        </label>

        <label>
            <p class="py-1 font-semibold">Confirm Password:</p>
            <input type="password" class="input w-full px-2 py-1 rounded-none" bind:value={dsComp.confirmPassword}/>
        </label>

        <Button title="Register" on:click={registerHandler}/>

        <div class="flex ">
            <section class="w-full">
                <button class="transition-all hover:scale-105 active:scale-95 hover:underline"
                on:click={() => $staticState.showReg = false}
                >Login here</button>
            </section>
    
            
        </div>
    </div>
</main>