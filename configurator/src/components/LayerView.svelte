<script>
    export let total;
    export let layer;
    export let i;
    import { deleteLayer, moveLayer } from '../layers/layers';
    import { can } from '../stores/store';
</script>

<style>
.layer {
    text-align: left;
}
.layerid {
    display: inline-block;
    width: 50%;
}
</style>

<div class="layer">
    <span class="layerid">{i + 1}. {layer.state.name} {layer.state.type}</span>
    <button on:click={() => moveLayer(layer, i, true)} disabled={total - 1 === i}>Up</button>
    <button on:click={() => moveLayer(layer, i, false)} disabled={i === 0}>Down</button>
    <button on:click={() => deleteLayer(i)}>Delete</button>
    <input type="checkbox" bind:checked={layer.editing} /> Edit
    {#if layer.state.type === "IMAGE" && layer.editing}
        <br/><input type="range" min="0" max="20" bind:value={layer.state.blend} />
    {/if}
    {#if layer.state.type === "TEXT" && layer.editing}
        <br/><input type="text" bind:value={layer.state.text} />
        <br/><input type="range" min="-50" max={can.circumference} bind:value={layer.state.posX} /> move x
        <br/><input type="range" min="0" max={can.height + layer.state.textSize} bind:value={layer.state.posY} /> move y
        <br/><input type="range" min="0" max="300" bind:value={layer.state.textSize} /> text size
    {/if}
</div>
