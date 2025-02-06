import { Application, Sprite, Filter, GlProgram, Assets, UniformGroup } from "pixi.js";
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
    preference: "webgl" // maybe i'll learn webgpu one day
  });

  let elapsed = 0.0;
  app.ticker.add((ticker) => (elapsed += ticker.deltaTime));

  // stars shader
  const starsUniforms = new UniformGroup({
    iResolution: { value: [app.renderer.width, app.renderer.height, 1], type: "vec3<f32>" },
    iTime: { value: Math.random() * 1000, type: "f32" },
    iColor: { value: error ? [1.0, 0.0, 0.2] : [0.3, 0.1, 0.2], type: "vec3<f32>" }
  });
  const starsFilter = new Filter({
    glProgram: new GlProgram({
      fragment: starsFrag,
      vertex: defaultVert
    }),
    resources: {
      uniforms: starsUniforms
    }
  });

  app.ticker.add((ticker) => {
    starsUniforms.uniforms.iTime += ticker.elapsedMS / 2000;
    if (error && Math.random() > 0.97) starsUniforms.uniforms.iTime += Math.random() * 10;
  });

  // init bg
  const bg = new Sprite({
    width: app.renderer.width,
    height: app.renderer.height,
    filters: [starsFilter]
  });

  app.ticker.add(() => {
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
  });

  if (error)
    // typescript moment
    bg.filters = [
      ...(bg.filters as Filter[]),
      new AsciiFilter({
        size: 10
      })
    ];

  app.stage.addChild(bg);

  // init tetra
  const bloomFilter = new AdvancedBloomFilter({ threshold: 0.6 });
  const tetraSprite = new Sprite({
    anchor: 0.5,
    scale: 0.17,
    texture: await Assets.load(tetra),
    filters: [bloomFilter]
  });

  app.ticker.add(() => {
    tetraSprite.x = app.renderer.width / (3 / 2);
    tetraSprite.y = Math.cos(elapsed / 50) * 20 + app.renderer.height / 2;
    bloomFilter.bloomScale = (Math.sin(elapsed / 100) + 1) / 2;
  });

  if (!error) app.stage.addChild(tetraSprite);

  // finally, add pixi to the DOM
  document.body.appendChild(app.canvas);
}
