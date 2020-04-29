<script>
    import P5Canvas from "./P5Canvas.svelte";
    import User from "./components/User.svelte";
    import { texture, canvas } from './stores/store.js';

    texture.subscribe(updated => {
        //
    })

    let layerSketch = (p5) => {
        p5.setup = () => {
            canvas(p5);
            p5.imageMode(p5.CENTER);
        };
        p5.draw = () => {
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
    <User />
</div>