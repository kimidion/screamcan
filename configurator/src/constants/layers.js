import { can, layers, layerInit } from '../stores/store.js';

export const types = {
    text: 'TEXT',
    solid: 'SOLID',
    img: 'IMAGE'
}

export const deleteLayer = (index) => {
    layers.update(prev => {
        const newArr = [...prev];
        newArr.splice(index, 1);
        return newArr;
    });
}

export const moveLayer = (layer, index, dir) => {
    layers.update(prev => {
        const newArr = [...prev];
        newArr.splice(index, 1);
        newArr.splice(dir ? index + 1 : index -1, 0, layer);
        return newArr;
    });
}

export const updateLayer = (layer, index) => {
    const state = layer.$state;
    deleteLayer(index);
    addLayer(state, index);
}

export const blendLayer = (layer, index, blend) => {
    const state = layer.$state;
    deleteLayer(index);
    state.blend = blend ? 10 : 0;
    addLayer(state, index);
}

export const addLayer = (layer, index) => {
    let adding;
    switch (layer.type) {
        case types.text: {
            adding = textLayer(layer)
            break
        }
        case types.solid: {
            adding = solidLayer(layer)
            break
        }
        case types.img: {
            adding = imageLayer(layer)
            break
        }
    }
    layers.update(prev => {
        const newArr = [...prev];
        if (typeof index === 'undefined') {
            index = newArr.length;
        }
        newArr.splice(index, 0, adding);
        return newArr;
    });
}

export const textLayer = (state) => {
    const layer = layerInit();
    layer.$state = state;
    layer.clear();
    layer.textSize(state.textSize);
    layer.text(state.text, state.posX, state.posY);
    return layer;
}

export const solidLayer = (state) => {
    const layer = layerInit();
    layer.$state = state;
    layer.background(state.r || 255, state.g || 255, state.b || 255, state.a || 255);
    return layer;
}

export const imageLayer = (state) => {
    const layer = blendedLayer(state.img, state.blend);
    layer.$state = state;
    return layer;
}

export const blendedLayer = (img, overlap) => {
    let blended = layerInit();
    if (overlap === 0) {
        blended.image(img, 0, 0);
        return blended
    }
    const offset = can.circumference * (overlap/100);
    const imgfg = img.get();
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
    // render a bg img starting at the end of the foreground in order to simulate a smooth display when the texture is applied
    // this will only work well when the original image size is larger than the can circumference
    blended.image(img, -can.circumference, 0);
    blended.image(imgfg, 0, 0);
    return blended;
}

export const canvas = (p5, heightOffset) => {
    return p5.createCanvas(can.circumference, can.height*(heightOffset || 1), p5.WEBGL);
}