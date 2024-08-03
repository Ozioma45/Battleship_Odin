import { GameController } from './gameController.js';
import { Player } from './player.js';
import { ComputerPlayer } from './computerPlayer.js';
import { Ship } from './ship.js';

export function setupUI() {
    console.log("setup ui is called")
    const player1 = new Player('Player 1');
    const player2 = new ComputerPlayer('Computer');

    // Example ship placements for player1
    placeShips(player1.gameboard, [
        new Ship(3),
        new Ship(2),
        new Ship(1)
    ]);

    // Example ship placements for player2
    placeShips(player2.gameboard, [
        new Ship(3),
        new Ship(2),
        new Ship(1)
    ]);

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

function placeShips(gameboard, ships) {
    // Example placement logic
    let startX = 0;
    let startY = 0;
    ships.forEach(ship => {
        gameboard.placeShip(ship, startX, startY);
        startX += ship.length + 1; // Move start position for next ship (for simplicity)
        if (startX >= 10) {
            startX = 0;
            startY += 1;
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
