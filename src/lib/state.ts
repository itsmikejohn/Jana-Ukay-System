import { writable } from "svelte/store";

export const staticState = writable({
    //** Navigation */
    activeItem: "Home",
    hasUser: ["Home", "Shop"],
    hasStatic: ["Home", "Shop", "Login"],
    hasAdmin: ["Shop"],

    defaultArray: ["Mikey_Devs"],


    //** Login component */
    showReg: false,
    showRec: false,

    uploadArray:<any> [],
})



export const adminState = writable({
    products:<any[]> [],
})
