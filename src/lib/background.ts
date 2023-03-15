import * as PIXI from "pixi.js";
import { AdvancedBloomFilter, GlitchFilter, AsciiFilter } from "pixi-filters";
import stars from "../shaders/stars.frag?raw";
import tetra from "../img/dog.webp";

export function init(error = false) {
  const app = new PIXI.Application({ resizeTo: window });
  document.body.appendChild(app.view as HTMLCanvasElement);

  const tetraSprite = PIXI.Sprite.from(tetra, {
    mipmap: PIXI.MIPMAP_MODES.ON
  });

  tetraSprite.anchor.set(0.5);

  const bloomFilter = new AdvancedBloomFilter({ threshold: 0.6 });
  const glitchFilter = new GlitchFilter();
  tetraSprite.filters = [bloomFilter, glitchFilter];
  tetraSprite.scale.set(0.17);

  let elapsed = 0.0;
  app.ticker.add((delta) => (elapsed += delta));

  app.ticker.add(() => {
    // float the dog
    tetraSprite.x = app.screen.width / (3 / 2);
    tetraSprite.y = Math.cos(elapsed / 50) * 20 + app.screen.height / 2;
    bloomFilter.bloomScale = (Math.sin(elapsed / 100) + 1) / 2;

    // glitch, 1 / 100 chance
    if (Math.random() < 1 / 100) {
      glitchFilter.offset = 10;
      glitchFilter.red = [Math.random() * 10, Math.random() * 10];
      glitchFilter.blue = [Math.random() * 10, Math.random() * 10];
      glitchFilter.green = [Math.random() * 10, Math.random() * 10];
      glitchFilter.shuffle();
    } else {
      glitchFilter.red = glitchFilter.blue = glitchFilter.green = [0, 0];
      glitchFilter.offset = 0;
    }
    glitchFilter.refresh();
  });

  // stars shader

  const color = error ? [0.8, 0.0, 0.2] : [0.3, 0.1, 0.2];
  const uniforms = { time: 0, color };

  const starsFilter = new PIXI.Filter(undefined, stars, uniforms);

  const bg = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawRect(0, 0, app.screen.width, app.screen.height);

  const seed = Math.random() * 1000;

  app.ticker.add(() => {
    uniforms.time = elapsed / 60 + seed;
    if (error) uniforms.time += Math.random() * 1.5 + seed;

    // resize background to screen
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
  });

  bg.filters = [starsFilter, glitchFilter];
  if (error) bg.filters.push(new AsciiFilter(12));

  // add objects to stage
  app.stage.addChild(bg);
  if (!error) app.stage.addChild(tetraSprite);
}
