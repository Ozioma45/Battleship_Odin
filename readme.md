# Battleship Game

## Overview

This project is a simple implementation of the classic Battleship game using JavaScript, HTML, and CSS. The game allows a player to play against a computer. Ships are placed randomly on a 10x10 gameboard, and the objective is to sink all of the opponent's ships.

## Features

- Two players: a human player and a computer player.
- Random ship placement.
- Ships with different lengths: one with 3 boxes, one with 2 boxes, and one with 1 box.
- Basic drag-and-drop functionality for future implementation of manual ship placement.
- Game state management and turn-based play.
- End game condition when all ships of one player are sunk.

## File Structure

```
battleship/
│
├── index.html
├── styles.css
├── scripts/
│   ├── ui.js
│   ├── gameController.js
│   ├── player.js
│   ├── computerPlayer.js
│   ├── gameboard.js
│   ├── ship.js
└── README.md
```

## Getting Started

### Prerequisites

To run this project locally, you need a web browser. No additional software or libraries are required.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Ozioma45/Battleship_Odin.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd battleship
   ```

3. **Open the `index.html` file in your web browser:**
   ```sh
   open index.html
   ```

### Running the Game

To start the game, open the `index.html` file in your web browser. You should see two gameboards: one for the player and one for the computer. Ships are placed randomly on both boards. Click on the cells in the computer's board to attack. The game will notify you of hits, misses, and when a ship is sunk.

## Usage

### UI Components

- **Player's Board:** Displays the player's ships. Currently, ships are placed randomly.
- **Computer's Board:** Click on the cells to attack. Hits and misses are tracked.

### Game Logic

- **Ship Placement:** Ships are placed randomly on the gameboard without overlapping.
- **Attacking:** Click on the cells of the computer's board to attack. The game will indicate whether the attack was a hit or a miss.
- **Game End:** The game ends when all of the ships of one player are sunk.

### Future Improvements

- Implement manual ship placement using drag-and-drop.
- Improve the AI for the computer player.
- Add a two-player mode.
- Enhance the UI for better user experience.

## Code Explanation

### `ui.js`

Handles the UI interactions, setting up the game, and managing user inputs.

### `gameController.js`

Manages the game state, turn-based play, and win conditions.

### `player.js`

Defines the Player class and its gameboard.

### `computerPlayer.js`

Extends the Player class to include basic AI for the computer player.

### `gameboard.js`

Manages the placement of ships, handling attacks, and checking for all ships sunk.

### `ship.js`

Defines the Ship class, managing ship length, hits, and sunk status.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Preview

Check out the live preview [here](https://ozioma45.github.io/Battleship_Odin/).

## Contact

If you have any questions or suggestions, feel free to contact me at [oziomaegole@gmail.com].