<script>
    import P5Canvas from "./P5Canvas.svelte";
    import { can, texture, canvas } from './stores/store.js';

    let canSketch = (p5) => {
        let rotation = 0;
        let goingRight = true;
        p5.preload = () => {
            //img = p5.loadImage('place.png');
        };
        p5.setup = () => {
            canvas(p5, 1.5);
        };
        p5.draw = () => {
            p5.background(255, 255, 255);
            //p5.directionalLight(255, 255, 255, 0, 0, -1);
            p5.noStroke();
            rotation = p5.frameCount * -0.006;
            p5.rotateY(rotation);
            // p5.rotateZ(rotation);
            // p5.rotateX(rotation);
            // if (p5.mouseIsPressed) {
            //     rotation = goingRight ? p5.frameCount * -0.01 : p5.frameCount * 0.01;
            // }
            p5.fill(218, 218, 218);
            p5.cylinder(can.radius - 0.9, can.height + 20, 50, 1, true, true);
            p5.texture($texture);
            p5.cylinder(can.radius, can.height, 50, 1, false, false);
        };
        // p5.mouseDragged = (event) => {
        //     if (event.movementX > 0) {
        //         // right movement
        //         goingRight = true;
        //         rotation = p5.frameCount * -0.01;
        //     } else if (event.movementX < 0) {
        //         // left movement
        //         goingRight = false;
        //         rotation = p5.frameCount * 0.01;
        //     }
        // };
    };
</script>

<style>
    #canRender {
        float: left;
    }
</style>

<div id="canRender">
    <P5Canvas sketch={canSketch} id="canStage" />
</div>