<script>
    import { onMount } from 'svelte';
    import { addLayer, deleteLayer, updateLayer, moveLayer, blendLayer } from '../constants/layers';
    import { layers, layerConfig, resetStoreP5 } from '../stores/store.js';

    onMount(() => {
        loadlayers();
        resetStoreP5();
    });

    const loadlayers = () => {
        $layerConfig.forEach((layer, index) => {
            addLayer(layer, index);
        });
    }
</script>

<style>
.layerGroup {
    display: flex;
    flex-direction: column-reverse;
}
.layer {
    text-align: left;
}
.layerid {
    display: inline-block;
    width: 50%;
}
</style>

{#if $layers.length === 0}
    <button on:click={loadlayers}>Load Starter Layers</button>
{/if}
{#if $layers}
    <div class="layerGroup">
    {#each $layers as layer, i}
        <div class="layer">
            <span class="layerid">{i}. {layer.$state.name} {layer.$state.type}</span>
            <button on:click={() => moveLayer(layer, i, true)} disabled={$layers.length - 1 === i}>Up</button>
            <button on:click={() => moveLayer(layer, i, false)} disabled={i === 0}>Down</button>
            <button on:click={() => deleteLayer(i)}>Delete</button>
            {#if layer.$state.type === "IMAGE" && layer.$state.blend === 0}
                <button on:click={() => blendLayer(layer, i, true)}>Blend Edge</button>
            {/if}
            {#if layer.$state.type === "IMAGE" && layer.$state.blend !== 0}
                <button on:click={() => blendLayer(layer, i, false)}>Unblend Edge</button>
            {/if}
            {#if layer.$state.type === "TEXT"}
                <input type="text" bind:value={layer.$state.text} />
                <button on:click={() => updateLayer(layer, i)}>Update</button>
            {/if}
        </div>
    {/each}
    </div>
{/if}
