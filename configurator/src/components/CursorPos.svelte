<script>
    import { can, layers } from '../stores/store.js';
    export let x;
    export let y;

    const deselectLayers = () => {
        $layers.forEach(layer => {
            layer.state.editing = false;
        });
    }
</script>

<style>
.cursor {
    position: absolute;
    padding: 2px;
    text-align: left;
    z-index: 10;
    border: 1px solid;
    width: 50px;
    background-color: rgba(255,255,255,0.7);
    pointer-events: none;
}
.posline {
    pointer-events: none;
    position: absolute;
    background-color: rgba(255,255,255,0.4);
}
.posline.x {
    top:0px;
    bottom:0px;
    width:1px;
}
.posline.y {
    right:0px;
    left:0px;
    height:1px;
}
.bbox {
    display: block;
    position: absolute;
    z-index: 9;
    border: 1px solid rgba(255,255,255,0);
}
.bbox.selected {
    border: 1px solid rgba(255,255,255,0.7);
}
</style>

{#if 0 < x && x <= can.circumference && 0 < y && y <= can.height}
    <div class="cursor" style="top:{y}px;left:{x}px;">x: {x}<br />y: {y}</div>
    <div class="posline x" style="left:{x}px;height:{can.height}px;" />
    <div class="posline y" style="top:{y}px;width:{can.circumference}px;" />
{/if}
{#each $layers as layer, i}
    {#if layer.state.bounds}
        <div
            class="bbox layer{i}"
            class:selected={layer.state.editing}
            style={`top:${layer.state.bounds.top - 2}px;left:${layer.state.bounds.left - 1}px;width:${layer.state.bounds.right - layer.state.bounds.left + 2}px;height:${layer.state.bounds.bottom - layer.state.bounds.top + 2}px`}
            on:click={() => {
                deselectLayers();
                layer.state.editing = true;
            }}
        />
    {:else}
        <div
            class="bbox layer{i}"
            style={`top:0px;left:0px;width:${can.circumference}px;height:${can.height}px`}
            on:click={() => {
                deselectLayers();
                layer.state.editing = true;
            }}
        />
    {/if} 
{/each}
