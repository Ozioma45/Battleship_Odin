import { GameController } from './gameController.js';
import { Player } from './player.js';
import { ComputerPlayer } from './computerPlayer.js';
import { Ship } from './ship.js';

export function setupUI() {
    const player1 = new Player('Player 1');
    const player2 = new ComputerPlayer('Computer');

    // Randomly place ships for player1
    placeShipsRandomly(player1.gameboard);

    // Randomly place ships for player2
    placeShipsRandomly(player2.gameboard);

    const gameController = new GameController(player1, player2);

    // Create boards if they don't exist
    createBoard('player1Board');
    createBoard('player2Board');

    // Set up click listener for the second player's board
    document.getElementById('player2Board').addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            const index = event.target.dataset.index;
            const x = index % 10;
            const y = Math.floor(index / 10);
            gameController.handlePlayerMove(x, y);
        }
    });

    // Set up drag-and-drop functionality
    setupDragAndDrop();
}

function createBoard(boardId) {
    const board = document.getElementById(boardId);
    if (!board) return;

    board.innerHTML = ''; // Clear existing cells if any
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        board.appendChild(cell);
    }
}

function placeShipsRandomly(gameboard) {
    const ships = [
        new Ship(3),
        new Ship(2),
        new Ship(1)
    ];

    ships.forEach(ship => {
        let placed = false;
        while (!placed) {
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            try {
                gameboard.placeShip(ship, x, y, orientation);
                placed = true;
            } catch (error) {
                // Ship placement failed, try a different location
            }
        }
    });
}

function setupDragAndDrop() {
    const shipElements = document.querySelectorAll('.ship');
    const boardCells = document.querySelectorAll('.cell');

    shipElements.forEach(ship => {
        ship.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.target.classList.add('dragging');
        });

        ship.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });
    });

    boardCells.forEach(cell => {
        cell.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        cell.addEventListener('drop', (event) => {
            event.preventDefault();
            const shipId = event.dataTransfer.getData('text/plain');
            const ship = document.getElementById(shipId);
            const x = cell.dataset.index % 10;
            const y = Math.floor(cell.dataset.index / 10);
            // Place the ship on the board at (x, y)
            console.log(`Placing ship ${shipId} at (${x}, ${y})`);
        });
    });
}
