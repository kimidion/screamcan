<script>
    import { addLayer, deleteLayer } from '../constants/layers';
    import { layers, layerConfig } from '../stores/store.js';

    const loadlayers = () => {
        $layerConfig.forEach(layer => {
            addLayer(layer);
        });
    }
</script>

<style>
</style>

{#if $layers.length === 0}
    <button on:click={loadlayers}>Load Layers</button>
{/if}
{#if $layers}
    {#each $layers as layer, i}
        <div>{layer.$type} <button on:click={() => deleteLayer(i)}>Delete</button>
        {#if layer.$type === "IMAGE"}
            <button>Blend</button>
        {/if}
        </div>
    {/each}
{/if}
