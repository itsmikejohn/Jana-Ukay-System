<script lang="ts">
    import { adminState, staticState } from "$lib/state";
	import Button from "$lib/Components/Button.svelte"; 
    
    import { auth, db, storage } from "$lib/Auth/DB/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
    import { ref, uploadBytesResumable, getDownloadURL, type UploadTaskSnapshot, listAll, type ListResult, type StorageReference } from "firebase/storage";
    import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

    import { FileDropzone } from '@skeletonlabs/skeleton';
	import { scale } from "svelte/transition";
	import { tick } from "svelte";

    let file: FileList;

    const dsComp = {
        showUpload: false,
        showNext: false,
        loaderIcon: 0,

        name: "",
        price: "",
        description: "",
        domMsg: "",
    }
    // read files and display to DOM
    const uploadHandlerOnChange = () =>
    {
        $staticState.uploadArray = [];

        let uploadsArr = [];

        for(let i=0; i<file.length; i++)
        {
           uploadsArr.push({name: file[i].name, size: file[i].size});
        } 

        $staticState.uploadArray = uploadsArr;      
    }

    const uploadHandler = async () =>
    {
        const name = dsComp.name;
        const price = dsComp.price;
        const description = dsComp.description;
       
        try 
        {
            const setD: void = await setDoc(doc(collection(db, "products"), auth.currentUser?.uid + name), {
                createdAt: serverTimestamp(),
                name: name,
                price: price,
                description: description,
                urls: [],
            }, {merge: true});

            for(let i=0; i<file.length; i++)
            {
                const metadata = { contentType: `${auth.currentUser?.uid}/${file[i].type}` };
                const uploadTask = uploadBytesResumable(ref(storage, `${auth.currentUser?.uid + name}/${file[i].name}`), file[i], metadata);

                uploadTask.on("state_changed", async (snapshot: UploadTaskSnapshot) =>
                {
                    let progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    dsComp.loaderIcon = progress;
                    switch(snapshot.state)
                    {
                        case "paused":
                            console.log('Upload is paused');
                            break;
                        case "running":
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) =>
                {
                    switch(error.code)
                    {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                async () =>
                {
                    const downURL: string = await getDownloadURL(uploadTask.snapshot.ref)

                   
                    const updateD: void = await updateDoc(doc(collection(db, "products"), auth.currentUser?.uid + name), {
                        urls: arrayUnion(downURL)
                    })
                }
                )
            }

            resetter();

        } catch (error) 
        {
            console.log(error)
        }
        
    }


    const resetter = () =>
    {
        dsComp.showNext = false;
        dsComp.name = "";
        dsComp.price = "";
        dsComp.description = "";
        dsComp.domMsg = "";
        $staticState.uploadArray = [];
        dsComp.showUpload = false;
    }
   

    const nextHandler = () =>
    {
        if(dsComp.name.trim().length > 3)
        {
            if(dsComp.price.trim().length > 2)
            {   
                if(dsComp.description.trim().length >2)
                {
                    dsComp.showNext = true;   
                }else
                {
                    dsComp.domMsg = "Invalid description";
                }

            }else
            {
                dsComp.domMsg = "Invalid price";
            }

        }else
        {
            dsComp.domMsg = "Invalid name";
        }
    }

    

</script>

<main>
    <div class="card p-2 flex gap-2 rounded-none">
        <Button title="Upload" on:click={() => dsComp.showUpload = true}/>
        <Button hasDark={false} color="bg-red-500" title="Logout" />
    </div>

    {#if dsComp.showUpload}
        <section class="fixed bottom-0 top-0 left-0 right-0 p-4 sm:p-2 z-10 bg-[#00000070]" >
            
            <div class="card mx-auto sm:max-w-2xl mt-[8vh] p-4 shadow-lg shadow-black flex flex-col gap-2" transition:scale>
                <p class="text-center h3 font-semibold">Upload your product here</p>
                
                {#if dsComp.showNext}
                    <FileDropzone name="upload" multiple bind:files={file} on:change={uploadHandlerOnChange}/>

                    <div class="flex flex-col gap-2">
                        {#each $staticState.uploadArray as item}
                            <p class="px-2">{item.name}</p>
                        {/each}
                    </div>

                    <progress value={dsComp.loaderIcon} class="progress rounded-none"></progress>
                {:else}
                    <div class="flex flex-col gap-2" >
                        <p class="text-center text-red-500">{dsComp.domMsg}</p>
                        <div class="">
                            <p class="py-1">Name:</p>
                            <input type="text" class="input w-full rounded-none px-2 py-1" bind:value={dsComp.name}/>
                        </div>

                        <div class="">
                            <p class="py-1">Price:</p>
                            <input type="text" class="input w-full rounded-none px-2 py-1" bind:value={dsComp.price}/>
                        </div>
                        <div class="">
                            <p class="py-1">Description:</p>
                            <textarea class="textarea w-full rounded-none px-2 py-1" bind:value={dsComp.description}/>
                        </div>
                        
                    </div>
                {/if}

                <section class="flex gap-2">
                    
                    {#if dsComp.showNext}
                        <Button  title="Upload" on:click={uploadHandler}/>
                    {:else}
                        <Button  title="Next" on:click={nextHandler}/>
                    {/if}
                   
                    <Button color="bg-red-500" title="Cancel" on:click={resetter}/>
                </section>

            </div>
        </section>
    {/if}
</main>