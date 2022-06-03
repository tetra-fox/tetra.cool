import * as PIXI from "pixi.js";
import {AdvancedBloomFilter, GlitchFilter} from "pixi-filters";

export function init() {
  const app = new PIXI.Application({resizeTo: window});
  document.body.appendChild(app.view);
  
  const tetraSprite = PIXI.Sprite.from(require("../../img/dog.webp"), {
    mipmap: PIXI.MIPMAP_MODES.ON
  });
  
  tetraSprite.anchor.set(0.5);

  const bloomFilter = new AdvancedBloomFilter({threshold: 0.6});
  const glitchFilter = new GlitchFilter();
  tetraSprite.filters = [bloomFilter, glitchFilter];
  tetraSprite.scale.set(0.17);

  let elapsed = 0.0;
  app.ticker.add(delta => (elapsed += delta));

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

  let uniforms = {time: 0};

  const starsFilter = new PIXI.Filter(undefined, require("../../shaders/stars.frag"), uniforms);
  const bg = new PIXI.Graphics().drawRect(
    0,
    0,
    app.renderer.screen.width,
    app.renderer.screen.height
  );

  app.ticker.add(() => {
    // resize background to screen
    uniforms.time = elapsed / 60;

    bg.width = app.renderer.screen.width;
    bg.height = app.renderer.screen.height;
  });

  bg.filters = [starsFilter, glitchFilter];

  // add objects to stage
  app.stage.addChild(bg);
  app.stage.addChild(tetraSprite);
}
