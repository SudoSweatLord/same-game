# Match-3 Puzzle Game

A React clone of classic match-3 puzzle games with responsive design and local storage integration.

## Features

- **Core Game Mechanics**

  - Match 3+ same-colored tiles
  - Dynamic score calculation (n² points per match)
  - Automatic tile dropping animation
  - Game over detection

- **Responsive Design**

  - Works on mobile & desktop
  - Auto-rotation support
  - Adaptive grid layout
  - Orientation-aware UI

- **Score Tracking**

  - Local storage for high scores
  - Top 5 scores leaderboard
  - Live score display
  - Score persistence between sessions

- **Styling**
  - Retro-techno font theme
  - Smooth animations/transitions
  - Custom color scheme
  - CSS variables for easy theming

## Technologies

- React 18
- Pure CSS (No UI libraries)
- create-react-app
- Browser Local Storage

## Installation

1. Clone repo:

````bash
git clone https://github.com/yourusername/match3-game.git

2. **Install dependencies**:
```bash
npm install

3. **Start development server**:
```bash
npm start
````

## How to Play

1. **Tile Matching**  
   Click on adjacent tiles to match 3 or more of the same color  
   Matches can be horizontal or vertical connections

2. **Scoring System**  
   Earn points using formula: `(number of matched tiles)²`  
   Example: 4-tile match = 16 points

3. **Game Flow**  
   Tiles automatically drop down after matches  
   Game ends when no possible matches remain  
   Chain matches for higher scores

4. **High Scores**  
   Top 5 scores saved in local storage  
   Current score shown in orange sidebar  
   Scores persist between browser sessions

5. **Restarting**  
   Click Restart button anytime  
   Game-over modal appears automatically  
   Confirm to start new game
