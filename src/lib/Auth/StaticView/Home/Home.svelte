<script lang="ts">
	import { staticState } from "$lib/state";
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

	import { auth } from "$lib/Auth/DB/firebaseConfig";
	import { onAuthStateChanged, type User } from "firebase/auth";

	const dsComp = {
		loader: false,
	}

	const checkAuth = () =>
	{
		try {
			onAuthStateChanged(auth, (hasUser: User | null) =>
			{
				hasUser ? $staticState.activeItem = "Shop" : $staticState.activeItem = "Login";
			})
		} catch (error) {
			console.log(error)
		}
	}

</script>

<main class="mx-auto sm:max-w-xl" in:scale>
	<div class="card p-4 shadow-xl shadow-black flex flex-col gap-2">
		<h1 class="h2 text-center p-2">THRIFT.RAREPH</h1>
		<p class="h5 text-center">
			Welcome to our online store , where we offer top-quality, second-hand clothing at unbeatable prices. Our collection of gently used clothing is perfect for those looking for affordable and sustainable fashion options. From trendy tops to classic jeans, we have something for everyone. Shop with us today and discover the joy of finding a great deal on stylish, second-hand clothing!	
		</p>

		<Button title="Shop now!" loader={dsComp.loader} loader_title="checking internet" on:click={checkAuth}/>
	</div>
</main>