import React from 'react';

// open, closed, tempPath, path, face, visited
// const states = [0, 1, 2, 3, 4,5]

export const COLOR_CLOSED = '#f05454';
export const COLOR_OPEN = '#e8e8e8';
export const COLOR_TEMP_PATH = '#3cc4fe';
export const COLOR_PATH = '#3ccf4e';
export const COLOR_FACE = '#ffff00';
export const COLOR_VISITED='#db34eb';

function getStyle(state, mazeSize) {
	//innerheight property of window returns the interior of the window in pixels , including the height of the horinzontal scroll bar , if present 
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	let cellSize = 0;
	const m = 2.5;//

	if (windowWidth > windowHeight) cellSize = windowHeight / (mazeSize * m);
	else if (windowWidth <= windowHeight) cellSize = windowWidth / (mazeSize * m);

	if (state === 0)
		// state open
		return {
			backgroundColor: COLOR_OPEN,
			width: cellSize,
			height: cellSize,
		};
	else if (state === 1)
		// state close ya barrier
		return {
			backgroundColor: COLOR_CLOSED,
			width: cellSize,
			height: cellSize,
		};
	else if (state === 2)
		// state temp path rat moving 
		return {
			backgroundColor: COLOR_TEMP_PATH,
			border: `1px solid ${COLOR_TEMP_PATH}`,
			width: cellSize,
			height: cellSize,
		};
	else if (state === 3)
		// state path okk  rat shi trh se goal tk pahuch gya hai 
		return {
			backgroundColor: COLOR_PATH,
			border: `1px solid ${COLOR_PATH}`,
			width: cellSize,
			height: cellSize,
		};
	else if (state === 4)
		// state face +  rat finished this game
		return {
			backgroundColor: COLOR_FACE,
			border: `1px solid ${COLOR_FACE}`,
			width: cellSize,
			height: cellSize,
		};
		else if (state===5)
		return {
	    backgroundColor: COLOR_VISITED,
			border: `1px solid ${COLOR_VISITED}`,
			width: cellSize,
			height: cellSize,
	}
}

function getCellDOM(x, y, mazeSize) {
	let cellDom;

	if (y === 0 && x === 0)
		cellDom = (
			<div className="img-container">
				<img src="rat.png" alt="rat" />
			</div>
		);
	else if (y === mazeSize - 1 && x === mazeSize - 1)
		cellDom = (
			<div className="img-container">
				<img src="cheese.png" alt="cheese" />
			</div>
		);

	return cellDom;
}

export default function Cell(props) {
	const { state, y, x, mazeSize, updateMaze } = props;

	const onClickAddBarrier = function (e) {
		if (y === 0 && x === 0) return;
		if (y === mazeSize - 1 && x === mazeSize - 1) return;

		e.target.classList.toggle('barrier');//

		updateMaze(curr => {
			const updatedMaze = curr.slice();//returns a shallow copy of maze

			if (updatedMaze[y][x] === 1) updatedMaze[y][x] = 0;
			else if (updatedMaze[y][x] === 0) updatedMaze[y][x] = 1;

			return updatedMaze;
		});
	};

	return (
		<div
			className="cell"
			style={getStyle(state, mazeSize)}
			onClick={onClickAddBarrier}
		>
			{getCellDOM(x, y, mazeSize)}
		</div>
	);
}
