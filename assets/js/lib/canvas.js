export class Display {
  constructor(id) {
    this.canvas_id = id;  
    this.canvas    = document.querySelector(this.canvas_id);
    this.surface   = this.canvas.getContext("2d");
  }

  render(sprites) {
    this.surface.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (sprites.length !== 0) {
      for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];

        if (sprite.visible) {
          this.surface.drawImage(
            sprite.image.src,
            sprite.image.dimensions.x, sprite.image.dimensions.y,
            sprite.image.dimensions.width, sprite.image.dimensions.height,
            Math.floor(sprite.position.x), Math.floor(sprite.position.y),
            sprite.image.dimensions.width, sprite.image.dimensions.height
          );
        }
      }
    }
  }

  width() {
    return this.canvas.width;
  }

  height() {
    return this.canvas.height;
  }
}