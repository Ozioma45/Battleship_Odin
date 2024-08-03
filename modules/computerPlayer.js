import { Player } from './player.js';

export class ComputerPlayer extends Player {
    makeMove(opponent) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (opponent.gameboard.missedShots.some(shot => shot.x === x && shot.y === y));

        return { x, y, result: super.attack(opponent, x, y) };
    }
}
