<script lang="ts">
	import { staticState } from "$lib/state";
	import AuthSwitch from "$lib/Auth/AuthSwitch.svelte";
	import Nav from "$lib/Components/Nav.svelte";

	import { auth } from "$lib/Auth/DB/firebaseConfig";
	import { onAuthStateChanged, type User } from "firebase/auth";

	onAuthStateChanged(auth, (hasAuth: User | null) =>
	{
		if(hasAuth)
		{
			if(hasAuth.uid === "AdminKey")
			{
				$staticState.defaultArray = $staticState.hasAdmin;
				$staticState.activeItem = "Shop";
			}else
			{
				$staticState.defaultArray = $staticState.hasUser;
				$staticState.activeItem = "Home";
			}
		}else
		{
			$staticState.defaultArray = $staticState.hasStatic;
			$staticState.activeItem = "Home";
		}
	})
	
</script>

<main class="p-4 sm:p-2">
	<Nav array_data={$staticState.defaultArray}/>
	<AuthSwitch />
</main>