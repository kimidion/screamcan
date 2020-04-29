import { storeP5, layers, layerInit, blendedLayer } from '../stores/store.js';

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

export const addLayer = (layer) => {
    switch (layer.type) {
        case types.text: {
            textLayer(layer)
            break
        }
        case types.solid: {
            solidLayer(layer)
            break
        }
        case types.img: {
            imageLayer(layer)
            break
        }
    }
}

export const textLayer = (state) => {
    const layer = layerInit();
    layer.$type = types.text;
    layer.clear();
    layer.textSize(state.textSize);
    layer.text(state.text, state.posX, state.posY);
    //return layer;
    layers.update(prev => [...prev, layer]);
}

export const solidLayer = (state) => {
    const layer = layerInit();
    layer.$type = types.solid;
    layer.background(state.r || 255, state.g || 255, state.b || 255, state.a || 255);
    //return layer
    layers.update(prev => [...prev, layer]);
}

export const imageLayer = (state) => {
    storeP5.loadImage(state.img, img => {
        let layer = blendedLayer(img, state.blend);
        layer.$type = types.img;
        // return layer;
        layers.update(prev => {
            const newArr = [...prev];
            newArr.splice(1, 0, layer);
            return newArr;
        });
    });
}