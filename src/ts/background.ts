import * as PIXI from "pixi.js";
import { AdvancedBloomFilter, GlitchFilter } from "pixi-filters";
import * as Dog from "../img/dog.png";

let app = new PIXI.Application({ resizeTo: window, backgroundAlpha: 0.4 });
document.body.appendChild(app.view);

const tetraSprite = PIXI.Sprite.from(Dog, {
  mipmap: PIXI.MIPMAP_MODES.ON
});

tetraSprite.anchor.set(0.5);

const bloomFilter = new AdvancedBloomFilter({threshold: 0.6});
const glitchFilter = new GlitchFilter();
tetraSprite.filters = [bloomFilter, glitchFilter];
tetraSprite.scale.set(0.17);

app.stage.addChild(tetraSprite);

let elapsed = 0.0;
app.ticker.add(delta => (elapsed += delta));

// dog events
app.ticker.add(() => {
  tetraSprite.x = app.screen.width / (3 / 2);
  tetraSprite.y = Math.cos(elapsed / 50) * 20 + app.screen.height / 2;
  bloomFilter.bloomScale = (Math.sin(elapsed / 100) + 1) / 2;
  
  if (Math.random() < 1 / 125) {
    glitchFilter.offset = 10;
    glitchFilter.red = [Math.random() * 10, Math.random() * 10];
    glitchFilter.blue = [Math.random() * 10, Math.random() * 10];
    glitchFilter.green = [Math.random() * 10, Math.random() * 10];
    glitchFilter.shuffle();
  } else {
    glitchFilter.red = glitchFilter.blue = glitchFilter.green = [0, 0];
    glitchFilter.offset = 0;
  }
  glitchFilter.refresh();2

});