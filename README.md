# Same Game

SameGame (さめがめ) is a tile-matching puzzle video game originally released under the name CHAIN SHOT in 1985 by Kuniaki "Morisuke" Moribe. It has since been ported to numerous computer platforms, handheld devices, and even TiVo, with new versions as of 2016.

## Description

The App component uses React's useState, useEffect, and useCallback hooks to manage state and handle side effects. It also imports several images representing different colored tiles and two other components, Header and Background.

The useState hook is used to initialize a state variable grid with an empty array. grid represents the game grid and each element in the array represents a tile in the grid. The setGrid function is used to update this state.

The useCallback hook is used to define two functions, removeLinkedTiles and moveTilesDown, that are memoized for performance optimization. These functions only change if one of their dependencies has changed. In this case, the dependencies are grid and setGrid.

The removeLinkedTiles function takes a position as an argument, which represents the position of a tile in the grid. It uses a breadth-first search algorithm to find all tiles that have the same color and are connected. If it finds at least 3 tiles that have the same color and are connected, it removes these tiles from the grid by setting their values to an empty string.

The moveTilesDown function moves the tiles down to fill the empty spaces left by the removed tiles. It creates a new grid where each column is filled from bottom to top with the tiles from the corresponding column in the old grid, leaving any empty spaces at the top of the column.

The createGrid function creates a new grid with random colored tiles.

The handleClick function is called when a tile is clicked. It removes the clicked tile and any connected tiles of the same color, and then moves the remaining tiles down to fill the empty spaces.

The useEffect hook is used to call the createGrid function when the component is first rendered, and to periodically call the moveTilesDown function every 200 milliseconds.

In the returned JSX, the grid array is mapped to a list of img elements, each representing a tile in the grid. When a tile is clicked, the handleClick function is called with the position of the clicked tile.

## This project wouldn't have been possible without:

-Kuniaki Moribe who invented the game in 1985
-Ania K. for the starting template
-gaborbata for code snippets and ideas
-greweb for code snippets and ideas
-University of Texas at Austin for code Snippets and ideas
-Carsten K. for helping me with the breadth-first algorithm
-Klaus S. for beliving in me
-My partner for the support
-The entire team of Spiced Academy
-The entire team of ChatGPT

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
