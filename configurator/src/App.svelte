<script>
    import LayerRender from "./LayerRender.svelte";
    // import CanRender from "./CanRender.svelte";
</script>

<style>
    :global(body) {
        margin: 0;
    }
    main {
        font-family: sans-serif;
        text-align: center;
    }
</style>

<svelte:head>
    <title>Screamcan Design Studio</title>
</svelte:head>

<main>
    <h1>Screamcan Design Studio</h1>
    <!-- <CanRender /> -->
    <LayerRender />
</main>