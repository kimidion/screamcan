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
export const layerConfig = writable([
    { name: 'solid layer', type: 'SOLID', r: 245, g: 215, b: 205 },
    { name: 'text 1', type: 'TEXT', posX: 0, posY: 100, textSize: 75, text: 'HELLO' },
    { name: 'text 2', type: 'TEXT', posX: 100, posY: 200, textSize: 90, text: 'WORLD' }
]);
export const layers = writable([]);
export const texture = derived(layers, $layers => {
    let compiled = layerInit();
    compiled.background(255, 255, 255);
    for (let i = 0; i < $layers.length; i += 1) {
        compiled.image($layers[i], 0, 0);
    }
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
    return storeP5.createGraphics(can.circumference, can.height);
}
