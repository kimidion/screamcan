<script>
    import P5Canvas from "./P5Canvas.svelte";
    import { can, layers, texture, canvas, layerInit, blendedLayer } from './store.js';

    let img;
    let layerSketch = (p5) => {
        p5.setup = () => {
            canvas(p5);
            let layer0 = layerInit();
            layer0.background(255,255,255);
            layers.update(prev => [...prev, layer0]);
            p5.loadImage('texture.jpg', img => {
                let layer1 = blendedLayer(img, 0);
                layers.update(prev => {
                    const newArr = [...prev];
                    newArr.splice(1, 0, layer1);
                    return newArr;
                });
            });
            let layer2 = layerInit();
            layer2.clear();
            layer2.textSize(75);
            layer2.text('hello', 0, 100);
            layers.update(prev => [...prev, layer2]);
            let layer3 = layerInit();
            layer3.clear();
            layer3.textSize(90);
            layer3.text('world!', 100, 300);
            layers.update(prev => [...prev, layer3]);
        };
        p5.draw = () => {
            p5.imageMode(p5.CENTER);
            p5.image($texture, 0, 0);
        };
    };
</script>

<style>
    #layerConfig {
        float: right;
    }
</style>

<div id="layerConfig">
    <P5Canvas sketch={layerSketch} id="layers" />
</div>