<script>
    import P5Canvas from "./P5Canvas.svelte";
    import User from "./components/User.svelte";
    import { layers, texture, layerConfig } from './stores/store.js';
    import { addLayer, deleteLayer, canvas } from './constants/layers.js';

    let layerSketch = (p5) => {
        let cnv;
        let img;
        p5.setup = () => {
            cnv = canvas(p5);
            p5.imageMode(p5.CENTER);
            cnv.drop(p5.addImage);
        };
        p5.draw = () => {
            p5.image($texture, 0, 0);
        };
        p5.addImage = (file) => {
            p5.loadImage(file.data, loadedImg => {
                addLayer({ name: file.name, type: 'IMAGE', blend: 0, img: loadedImg });
            });
        }
    };
</script>

<style>
    #layerConfig {
        float: right;
    }
</style>

<div id="layerConfig">
    <P5Canvas sketch={layerSketch} id="layers" />
    <User />
</div>