<script>
    import Header from "./components/Header.svelte";
    import LayerRender from "./LayerRender.svelte";
    import CanRender from "./CanRender.svelte";
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
    main {
        font-family: sans-serif;
        margin-top: 15px;
    }
</style>

<svelte:head>
    <title>Screamcan Design Studio</title>
</svelte:head>

<Header />
<main>
    <CanRender />
    <LayerRender />
</main>