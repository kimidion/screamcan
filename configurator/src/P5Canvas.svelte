<script>
    export let id;
    import p5 from "p5";
    export let sketch;

    import { onMount } from "svelte";

    onMount(() => {
        let myp5 = new p5(sketch, id);
    });
</script>

<style>
</style>

<div {id}></div>