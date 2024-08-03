export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedShots = [];
    }

    // Check if a position is within bounds and does not overlap with existing ships
    isValidPlacement(ship, x, y, orientation) {
        if (orientation === 'horizontal') {
            if (x + ship.length > 10) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.ships.some(shipObj =>
                    shipObj.coordinates.some(coord => coord.x === x + i && coord.y === y)
                )) {
                    return false;
                }
            }
        } else {
            if (y + ship.length > 10) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.ships.some(shipObj =>
                    shipObj.coordinates.some(coord => coord.x === x && coord.y === y + i)
                )) {
                    return false;
                }
            }
        }
        return true;
    }

    placeShip(ship, x, y, orientation) {
        if (!this.isValidPlacement(ship, x, y, orientation)) {
            throw new Error('Invalid placement');
        }
        const coordinates = [];
        for (let i = 0; i < ship.length; i++) {
            if (orientation === 'horizontal') {
                coordinates.push({ x: x + i, y });
            } else {
                coordinates.push({ x, y: y + i });
            }
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
