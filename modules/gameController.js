import { Player } from './player.js';
import { ComputerPlayer } from './computerPlayer.js';

export class GameController {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        this.gameOver = false;
    }

    switchTurn() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    checkGameOver() {
        if (this.player1.gameboard.allShipsSunk()) {
            this.gameOver = true;
            alert(`${this.player2.name} wins!`);
        } else if (this.player2.gameboard.allShipsSunk()) {
            this.gameOver = true;
            alert(`${this.player1.name} wins!`);
        }
    }

    handlePlayerMove(x, y) {
        if (this.gameOver) return;
        const result = this.currentPlayer.attack(this.getOpponent(), x, y);
        this.updateUI(x, y, result);
        this.checkGameOver();
        if (!this.gameOver) {
            this.switchTurn();
            if (this.currentPlayer instanceof ComputerPlayer) {
                this.handleComputerMove();
            }
        }
    }

    getOpponent() {
        return this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    handleComputerMove() {
        const { x, y, result } = this.currentPlayer.makeMove(this.getOpponent());
        this.updateUI(x, y, result);
        this.checkGameOver();
        if (!this.gameOver) {
            this.switchTurn();
        }
    }

    updateUI(x, y, result) {
        const cell = document.querySelector(`#player${this.currentPlayer === this.player1 ? 2 : 1}Board .cell[data-index="${y * 10 + x}"]`);
        if (result === 'hit') {
            cell.classList.add('hit');
        } else if (result === 'miss') {
            cell.classList.add('miss');
        }
    }
}
