export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedShots = [];
    }

    placeShip(ship, x, y) {
        // Simple placement logic: place ship at (x, y)
        // Assuming vertical placement for simplicity
        const coordinates = [];
        for (let i = 0; i < ship.length; i++) {
            coordinates.push({ x, y: y + i });
        }
        this.ships.push({ ship, coordinates });
    }

    renderBoard(boardId) {
        const board = document.getElementById(boardId);
        if (!board) return;

        board.querySelectorAll('.cell').forEach(cell => {
            const x = cell.dataset.index % 10;
            const y = Math.floor(cell.dataset.index / 10);

            const hit = this.ships.some(({ coordinates }) =>
                coordinates.some(coord => coord.x === x && coord.y === y)
            );

            if (hit) {
                cell.classList.add('ship');
            }
        });
    }

    receiveAttack(x, y) {
        for (const shipObj of this.ships) {
            const { ship, coordinates } = shipObj;
            for (const coord of coordinates) {
                if (coord.x === x && coord.y === y) {
                    ship.hit();
                    return 'hit';
                }
            }
        }
        this.missedShots.push({ x, y });
        return 'miss';
    }

    allShipsSunk() {
        return this.ships.every(shipObj => shipObj.ship.isSunk());
    }
}
