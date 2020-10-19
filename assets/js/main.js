
import { Game } from './game.js';

export class Main {
  constructor(canvas_id) {    
    this.game = new Game(canvas_id);
  }

  /**
   * load
   * method to load the game
   */
  load() {
    this.game.build();

    if (typeof this.game.player === 'object') {
      this.game.state = true;
      this.game.update();
    }
  } // load
}

let game = new Main('#canvas');
game.load();