import { Sprite, KeyPad, Display } from './index.js';
import { GameSettings } from './settings.js';

export class Game {
  constructor(canvas_id) {
    let image = './assets/images/shooter.png';

    this.state   = false;
    this.player  = null;
    this.sprites = [];
    this.level   = 1;

    this.icon = {
      image:      image,
      size:       32
    };

    // IDs from the settings file
    this.missile       = 5;

    this.controller = new KeyPad();
    this.display    = new Display(canvas_id);
    this.settings   = new GameSettings();
    this.pieces     = this.settings.pieces();
  }


  /**
   * build
   * mehtod to build the map
   */
  build() {
    this.sprites = [];
    let level    = this.settings.level(this.level);
    let index    = 1;

    for(let i = 0; i < level.length; i++) {
      let data = level[i]; // levels have a board, and an arrangement of characters on the board.

      for (let row = 0; row < data.length; row++) {
        for (let column = 0; column < data[row].length; column++) {
          let tile = data[row][column];

          if (tile == 0) { continue; } // we don't want to capture empty tiles

          let sprite = this.loadImage({
            id: tile, // identifies which piece is on the map; not the sprite id
            position: {
              x: column,
              y: row
            }
          });

          if (sprite.playable) {
            this.player = sprite; // this is our hero.  it is the only playable character.
          }

          sprite.id = index++; // each sprite needs a unique id
          this.sprites.push(sprite);

          sprite.velocity.y = sprite.speed;
        }
      }
    }
  } // build


  /**
   * loadImage
   * method to load in the sprite
   */
  loadImage(params) {
    let obj =  new Sprite();
    
    for (let piece in this.pieces) {
      let icon = this.pieces[piece];

      if (params.id == icon.id) {  
        obj.name     = piece;      
        obj.solid    = icon.solid;
        obj.playable = icon.playable;
        obj.moveable = icon.moveable;
        obj.enemy    = icon.enemy;
        obj.speed    = icon.speed;

        let image  = new Image();
        image.src = this.icon.image; 

        obj.imageDimensions(image, icon.position.x, icon.position.y, icon.width, icon.height);
        obj.position.x = params.position.x * this.icon.size;
        obj.position.y = params.position.y * this.icon.size;        
      }
    }

    return obj;
  } // loadImage

  /**
   * play
   * method that starts to play the game
   */
  play() {
    for(let i = 0; i < this.sprites.length; i++) {
      let sprite = this.sprites[i];

      if (!sprite.moveable) { continue; }
      
      let previous_position = {
        x: sprite.position.x,
        y: sprite.position.y
      };

      let action = sprite.move(
        this.controller, 
        {
          width:   this.display.width(),
          height:  this.display.height()
        },
        this.sprites
      );

      // ---------------------------------------------------------------------
      // has our player fired a missile?
      // ---------------------------------------------------------------------
      if (action.missile) {
        let missile_id = this.sprites.length;
        let missile = this.loadImage({
          id: this.missile, // identifies which piece is on the map; not the sprite id
          position: {
            x: 0,
            y: 0
          }
        });

        missile.isMissile  = true;
        missile.velocity.y = -missile.speed;
        missile.position.x = previous_position.x;
        missile.position.y = previous_position.y - 10;

        this.sprites[missile_id] = missile;
      }

      // ---------------------------------------------------------------------
      // Did the sprite die?
      // ---------------------------------------------------------------------
      if (sprite.dead) {
        // Was it the player that died?
        if (sprite.playable) {
          this.message('You Died a HORRIBLE DEATH.<br /><br />Refresh to restart.', false);
        } else {
          this.sprites[i].visible = false;
          this.sprites.splice(i, 1);          
        }                
      }
      // ---------------------------------------------------------------------

      // ---------------------------------------------------------------------
      // Did the player win this level?
      // ---------------------------------------------------------------------
      if (sprite.playable && sprite.won) {
        this.state = false; // stop gameplay
        this.level++
        if (this.level <= this.settings.levels) {
          this.sprites[i].won = false; // reset win result
          this.message('Excellent. Level ' + this.level + ' is next!', true);
          setTimeout(() => {
            this.state = true;
            this.build(); // proceed to the next level 
            this.play();    
          }, 2100);
        } else {
          this.message('You Won! Wowzers!<br /><br />Refresh to restart.', false);
        }
      }
      // ---------------------------------------------------------------------

      this.sprites[i] = sprite;
    }    
  } // play

  /**
   * message
   * method to display the message to the end user.
   */
  message(text, hide) {
    let message = document.querySelector('#message');
    message.style.display = 'block';
    message.innerHTML = text;

    if (hide) {
      setTimeout(() => {
        message.style.display = 'none'; 
      }, 2000);
    }
  }

  changeSprite(icon_id, params) {
    let sprite = this.loadImage({
      id: icon_id,
      position: {
        x: params.position.x,
        y: params.position.y
      }
    });

    sprite.id = params.id;

    return sprite;
  }

  /**
   * update
   * method to update the canvas with the new values
   */
  update() {
    requestAnimationFrame(this.update.bind(this));

    if (this.state) {
     this.play();
    }

    this.display.render(this.sprites);
  } // update  
}