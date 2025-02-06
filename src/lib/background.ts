import {
  Application,
  Sprite,
  Filter,
  GlProgram,
  Assets,
  Graphics,
  Ticker,
  Shader,
  Geometry,
  Mesh,
  UniformGroup
} from "pixi.js";
import { AdvancedBloomFilter, AsciiFilter } from "pixi-filters";
import starsFrag from "../shaders/stars.frag?raw";
import defaultVert from "../shaders/default.vert?raw";
import tetra from "../img/dog.webp";

export async function init(error = false) {
  const app = new Application();

  await app.init({
    resizeTo: window,
    antialias: true,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    preference: "webgl"
  });

  document.body.appendChild(app.canvas);

  const bloomFilter = new AdvancedBloomFilter({ threshold: 0.6 });
  const tetraSprite = new Sprite({
    anchor: 0.5,
    scale: 0.17,
    texture: await Assets.load(tetra),
    filters: [bloomFilter]
  });

  let elapsed = 0.0;
  app.ticker.add((ticker) => (elapsed += ticker.deltaTime));

  app.ticker.add(() => {
    // float the dog
    tetraSprite.x = app.screen.width / (3 / 2);
    tetraSprite.y = Math.cos(elapsed / 50) * 20 + app.screen.height / 2;
    bloomFilter.bloomScale = (Math.sin(elapsed / 100) + 1) / 2;
  });

  // stars shader
  const starsFilter = new Filter({
    glProgram: new GlProgram({
      fragment: starsFrag,
      vertex: defaultVert
    }),
    resources: {
      uniforms: new UniformGroup({
        iResolution: { value: [app.screen.width, app.screen.height, 1], type: "vec3<f32>" },
        iTime: { value: 0, type: "f32" } // offset the time to look random
      })
    }
  });
  starsFilter.resources.uniforms.iTime = Math.random() * 1000;

  const bg = new Graphics({
    filters: [starsFilter]
  })
    .rect(0, 0, app.screen.width, app.screen.height)
    .fill(0xabbe00);

  app.ticker.add((ticker) => {
    starsFilter.resources.uniforms.iTime += ticker.elapsedMS / 1000;
    // console.log(starsFilter.resources.uniforms.iTime);
    if (error) starsFilter.resources.uniforms.iTime += Math.random() * 1.5;

    // resize background to screen
    // bg.width = app.screen.width;
    // bg.height = app.screen.height;
  });

  if (error)
    (bg.filters as Filter[]).push(
      new AsciiFilter({
        size: 12
      })
    );

  // add objects to stage
  app.stage.addChild(bg);
  if (!error) app.stage.addChild(tetraSprite);
}
