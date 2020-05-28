import { readable, writable, derived } from 'svelte/store';
import p5 from 'p5';

export let storeP5 = new p5();

// can selection specs
export const can = readable();
can.diameter = 200;
can.height = 400;
can.radius = can.diameter/2;
can.circumference = 2 * storeP5.PI * can.radius;

// layers
export const layerConfig = readable([
    { name: 'solid layer', type: 'SOLID', posX: 0, posY: 0, r: 230, g: 141, b: 58, a: 175 },
    { name: 'text 1', type: 'TEXT', posX: 25, posY: 100, textSize: 50, text: 'HELLO' },
    { name: 'text 2', type: 'TEXT', posX: 100, posY: 200, textSize: 90, text: 'WORLD' }
]);
export const layers = writable([]);
export const texture = derived(layers, $layers => {
    let compiled = layerInit();
    compiled.background(255, 255, 255);
    $layers.forEach(layer => {
        layer.render(compiled);
    });
    resetStoreP5();
    return compiled;
});

// user input


// utils
export const resetStoreP5 = () => {
    storeP5.remove();
}

// use the storeP5 instance to create each layer
export const layerInit = () => {
    const graphics = storeP5.createGraphics(can.circumference, can.height);
    graphics.pixelDensity(1);
    return graphics;
}
