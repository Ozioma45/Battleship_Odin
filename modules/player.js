import { Gameboard } from './gameboard.js';

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }

    attack(opponent, x, y) {
        return opponent.gameboard.receiveAttack(x, y);
    }
}
