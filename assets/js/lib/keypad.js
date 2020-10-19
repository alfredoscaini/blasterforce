export class KeyPad {
  constructor() {
    this.key   = 'keyCode';

    this.button = {
      keyCode : {
        up :    38,
        down:   40,
        right:  39,
        left:   37,
        space:  32
      },

      key : {
        up :    'ArrowUp',
        down:   'ArrowDown',
        right:  'ArrowRight',
        left:   'ArrowLeft',
        space:  ''
      }
    };

    this.direction = {
      up:    false,
      down:  false,
      right: false,
      left:  false
      
    };

    this.action = {
      fire:  false
    };

    this.addListeners();
  }

  /**
   * getKeyCode
   * Identifies which key code was selcted
   */
  getKeyCode(event) {
    let key = null;

    if (event.keyCode !== undefined) {
      this.key = 'keyCode';
      key      = event.keyCode;
    } else if (event.key !== undefined) {
      this.key = 'key';
      key      = event.key;  
    }

    return key;    
  }

  /**
   * addListeners
   * Allows us to capture if the user is pressing/depressing a button.
   */
  addListeners() {
    window.addEventListener('keydown', (event) => {

      let key = this.getKeyCode(event);

      switch(key) {
        case this.button[this.key].up:
          this.direction.up = true;
        break;

        case this.button[this.key].down:
          this.direction.down = true;
        break;

        case this.button[this.key].left:
          this.direction.left = true;
        break;

        case this.button[this.key].right:
          this.direction.right = true;
        break;

        case this.button[this.key].space:
          this.action.fire = true;
        break;
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      
      let key = this.getKeyCode(event);    
      
      switch(key) {
        case this.button[this.key].up:
          this.direction.up = false;
        break;

        case this.button[this.key].down:
          this.direction.down = false;
        break;

        case this.button[this.key].left:
          this.direction.left = false;
        break;

        case this.button[this.key].right:
          this.direction.right = false;
        break;

        case this.button[this.key].space:
          this.action.fire = false;
        break;
      }
    }, false);

  } // addListenter

}