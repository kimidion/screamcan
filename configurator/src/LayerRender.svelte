<script>
    import P5Canvas from "./P5Canvas.svelte";
    import User from "./components/User.svelte";
    import CursorPos from "./components/CursorPos.svelte";
    import { layers, texture, layerConfig } from './stores/store.js';
    import { addLayer, deleteLayer, wglcanvas } from './layers/layers.js';
    
    let posX = 0;
    let posY = 0;
    let mouseIsPressed;

    let layerSketch = (p5) => {
        let cnv;
        let img;
        const toggleMouseDown = () => {
            mouseIsPressed = !mouseIsPressed;
        }
        p5.setup = () => {
            cnv = wglcanvas(p5);
            p5.imageMode(p5.CENTER);
            cnv.drop(p5.addImage);
            cnv.mousePressed(toggleMouseDown);
            cnv.mouseReleased(toggleMouseDown);
        };
        p5.draw = () => {
            p5.background(255,255,255)
            p5.image($texture, 0, 0);
            // using this render of each layer to the canvas causes the app to crash!!
            // $layers.forEach(layer => {
            //     layer.render(p5);
            // });
            posX = Math.floor(p5.mouseX);
            posY = Math.floor(p5.mouseY);
        };
        p5.addImage = (file) => {
            p5.loadImage(file.data, loadedImg => {
                addLayer({ name: file.name, file, type: 'IMAGE', blend: 0, posX: 0, posY: 0, img: loadedImg });
            });
        }
    };
</script>

<style>
    #layerConfig {
        float: right;
        position: relative;
    }
</style>

<div id="layerConfig">
    <P5Canvas sketch={layerSketch} id="layers" />
    <CursorPos x={posX} y={posY} mouse={mouseIsPressed} />
    <User />
</div>