export class GameSettings {
  constructor() {
    this.levels = 1;
  }

  level(id) {
    let level       = [];
    let board       = [];
    let arrangement = [];

    id = parseInt(id);

    switch(id) {      
      default:
        board = [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [4,4,4,4,4,4,4,4,4,4,4,0,0,4,4,4],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ];

        arrangement = [
          [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
          [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
          [0,0,0,2,0,0,0,2,0,0,2,0,0,2,0,0],
          [0,0,3,0,0,3,0,0,0,3,0,0,0,0,3,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
        ];          
      break;
    }

    level = [board, arrangement]; 

    return level;
  } // level


  pieces() {
    return {
      hero: {
        id: 1,
        playable: true,
        solid: true,
        moveable: true,
        enemy: false,
        speed: 0.5,
        position: {
          x: 0,
          y: 192
        },
        width: 32,
        height: 32
      },

      villian: {
        id: 2,
        playable: false,
        solid: true,
        moveable: true,
        enemy: true,
        speed: 0.2,
        position: {
          x: 0,
          y: 0
        },
        width: 32,
        height: 32
      },
      villian2: {
        id: 3,
        playable: false,
        solid: true,
        moveable: true,
        enemy: true,
        speed: 0.2,
        position: {
          x: 0,
          y: 128
        },
        width: 32,
        height: 32
      },
      platform: {
        id: 4,
        playable: false,
        solid: true,
        moveable: false,
        enemy: false,
        speed: 0,
        position: {
          x: 64,
          y: 96
        },
        width: 32,
        height: 32
      },
      missile: {
        id: 5,
        playable: false,
        solid: true,
        moveable: true,
        enemy: false,
        speed: 20,
        position: {
          x: 56,
          y: 64
        },
        width: 8,
        height: 8
      }
    };
  } // peices 
}