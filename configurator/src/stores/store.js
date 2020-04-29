import { readable, writable, derived } from 'svelte/store';
import p5 from 'p5';

export let storeP5 = new p5();

// can size selection
// button or slider to blend a layer to avoid a texture line

// can selection specs
export const can = readable();
can.diameter = 200;
can.height = 400;
can.radius = can.diameter/2;
can.circumference = 2 * storeP5.PI * can.radius;

// layers
export let layerConfig = writable([
    { name: 'solid layer', type: 'SOLID', r: 245, g: 215, b: 205 },
    { name: 'image layer', type: 'IMAGE', blend: 10, img: 'texture.jpg' },
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
const resetStoreP5 = () => {
    storeP5.remove();
    storeP5 = new p5();
}

export const blendedLayer = (img, overlap) => {
    let blended = layerInit();
    if (overlap === 0) {
        blended.image(img, 0, 0);
        return blended
    }
    const imgfg = img;
    const imgbg = img;
    const offset = can.circumference * (overlap/100);
    // render a bg img starting at the end of the foreground in order to simulate a smooth display when the texture is applied
    blended.image(imgbg, -can.circumference, 0);
    blended.push();
        imgfg.loadPixels()
        // adjust alpha on an offset of pixels incrementally to create a fade
        for (let y = 0; y < can.height; y += 1) {
            let alpha = 0;
            const increment = 255 * (1/offset);
            for (let x = 0; x < offset; x += 1) {
                const index = (x + y * imgfg.width) * 4;
                // alpha pixel is at index + 3;
                imgfg.pixels[index + 3] = alpha;
                alpha += increment;
            }
        }
        imgfg.updatePixels();
        blended.image(imgfg, 0, 0);
    blended.pop();
    return blended;
}

export const canvas = (p5, heightOffset) => {
    p5.createCanvas(can.circumference, can.height*(heightOffset || 1), p5.WEBGL);
}

// use the storeP5 instance to create each layer
export const layerInit = () => {
    return storeP5.createGraphics(can.circumference, can.height);
}