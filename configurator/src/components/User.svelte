<script>
    import { onMount } from 'svelte';
    import { types, addLayer, deleteLayer, moveLayer } from '../layers/layers';
    import { layers, layerConfig, storeP5 } from '../stores/store.js';
    import LayerView from './LayerView.svelte';

    onMount(() => {
        const scconfig = localStorage.getItem('scconfig');
        loadlayers(scconfig && JSON.parse(scconfig).length ? JSON.parse(scconfig) : $layerConfig);
    });

    const loadlayers = (layersToLoad) => {
        layersToLoad.forEach((layer, index) => {
            if (layer.type === types.img) {
                storeP5.loadImage(layer.file.data, loadedImg => {
                    addLayer({ 
                        name: layer.file.name,
                        file: layer.file,
                        type: 'IMAGE',
                        blend: layer.blend,
                        posX: layer.posX,
                        posY: layer.posY,
                        img: loadedImg
                    }, index);
                });
            } else {
                addLayer(layer, index);
            }
        });
    }
    const saveSession = () => {
        const scconfig = [];
        $layers.forEach((layer, i) => {
            scconfig.push(layer.state);
            delete scconfig[i].img;
        });
        localStorage.setItem('scconfig', JSON.stringify(scconfig));
    }
</script>

<style>
.layerGroup {
    display: flex;
    flex-direction: column-reverse;
}
</style>

{#if $layers.length === 0}
    <button on:click={() => loadlayers($layerConfig)}>Load Starter Layers</button>
{/if}
{#if $layers}
    <div class="layerGroup">
    {#each $layers as layer, i}
        <LayerView bind:layer={layer} i={i} total={$layers.length} />
    {/each}
    </div>
    <button on:click={saveSession}>Save</button>
{/if}
