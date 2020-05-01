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
    let editing = false;
    return ({
        state,
        editing,
        render: (p5) => {
            const layer = layerInit();
            layer.textSize(state.textSize);
            layer.text(state.text, state.posX, state.posY);
            p5.image(layer, 0, 0);
        }
    });
}

export const solidLayer = (state) => {
    let editing = false;
    return ({
        state,
        editing,
        render: (p5) => {
            p5.background(state.r || 255, state.g || 255, state.b || 255, state.a || 255);
        }
    });
}

export const imageLayer = (state) => {
    let editing = false;
    return ({
        state,
        editing,
        render: (p5) => {
            if (state.blend === 0) {
                p5.image(state.img, 0, 0);
            } else {
                const offset = can.circumference * (state.blend/100);
                const imgfg = state.img.get();
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
                p5.image(state.img, -can.circumference, 0);
                p5.image(imgfg, 0, 0);
            }
        }
    });
}

export const canvas = (p5, heightOffset) => {
    return p5.createCanvas(can.circumference, can.height*(heightOffset || 1), p5.WEBGL);
}