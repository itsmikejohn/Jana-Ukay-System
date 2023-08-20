<script lang="ts">
    import { adminState } from "$lib/state";

    import { auth, db, storage } from "$lib/Auth/DB/firebaseConfig";
    import { onSnapshot, collection, orderBy, query, getDocs, deleteDoc, doc} from "firebase/firestore";
    import type {QuerySnapshot, DocumentData, QueryDocumentSnapshot} from "firebase/firestore";
    import { getDownloadURL, ref, listAll, deleteObject } from "firebase/storage";
    import type { ListResult, StorageReference } from "firebase/storage";

    import { Splide, SplideSlide, } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';

	import Button from "$lib/Components/Button.svelte";


    type Products = {
        id: string
        date: string
        description: string
        name: string
        price: string
        urls: string[]
    }


    onSnapshot(query(collection(db, "products"), orderBy("createdAt", "asc")), (snaps: QuerySnapshot<DocumentData, DocumentData>) =>
    {
        let fbData: any[] = [];
        snaps.docs.forEach( async (docRef: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
        {
            
            
            let mutatedDate = new Date(Number(JSON.stringify(docRef.data().createdAt).slice(11,21)) * 1000);
            const date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();

            let data = {...docRef.data(), id: docRef.id, date: date}

            fbData = [data, ...fbData];

        })
        $adminState.products = fbData;
    })


    const deleteHandler = async (products: Products) =>
    {
        try {
            const listRes: ListResult = await listAll(ref(storage, products.id));
            listRes.items.forEach( async(item: StorageReference) => {
                const deleteStorage: void = await deleteObject(ref(storage, item.fullPath));
            })
            const deleteD: void = await deleteDoc(doc(collection(db, "products"), products.id));
        } catch (error) {
            console.log(error);
        }
        
    }
</script>

<main class="flex flex-col gap-2 mt-2">
   
    {#each $adminState.products as item, index}
        <section class=" p-5 card bg-slate-200 flex flex-col gap-2 shadow-md shadow-black">
            <Splide aria-label="My Favorite Images" options={{rewind:true, arrows:true, height: 300,}} class="" >
                {#each item.urls as src}
                    <SplideSlide>
                        <button class="h-full w-full ">
                            <img {src} alt="loading" class="h-full w-full"/>
                        </button>
                    </SplideSlide>
               {/each}
                    
        
            </Splide>
            <section class="flex flex-col gap-2">
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Description: {item.description}</p>
            </section>
            
            <section class="flex gap-1">
                <Button color="bg-green-500" title="Buy"/>
                <Button color="bg-blue-500" title="Edit"/>
                <Button color="bg-red-500" title="Delete" on:click={() => deleteHandler(item)}/>
            </section>
        
        </section>   
    {/each}
    
</main>