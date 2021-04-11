import generateGrid from './generateGrid.js';

/* 

    Follow the instructions atop Odin’s Google Homepage project to setup a git repository for this project.
    
    Create a webpage with a 16x16 grid of square divs
        Create the divs using JavaScript… don’t try making them by hand with copy and pasting in your html file!
        Best to put your grid squares inside another “container” div (that one can go directly in your html)
        There are several different ways to make the divs appear as a grid (versus just one on each line) feel free to use any or play with each of them:
            float/clear
            inline-block
            flexbox
            CSS Grid
        Be careful with borders and margins, they can adjust the size of the squares!
        “OMG, Why isn’t my grid being created???”
            Did you link your CSS stylesheet?
            Open your browser’s developer tools
            Check if there are any errors in the JavaScript console
            Check your “elements” pane to see if the elements have actually shown up but are somehow hidden.
            Go willy-nilly and add console.log statements in your JavaScript to see if it’s actually being loaded.
    
    Set up a “hover” effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through your grid like a pen would.
        Hint: “hovering” is what happens when your mouse enters a div and ends when your mouse leaves it.. you can set up event listeners for either of those events as a starting point.
        There are multiple ways to change the color of the divs, including:
            adding a new class to the div
            changing the div’s background color using JavaScript.
    Add a button to the top of the screen which will clear the current grid and send the user a popup asking for how many squares per side to make the new grid. Once entered the new grid should be generated in the same total space as before (e.g. 960px wide) and now you’ve got a new sketch pad. Tip: Set the limit for the user input to a maximum of 100. A larger number of squares results in more computer resources being used, resulting in possible delays, freezing, or crashing that we want to prevent.
        Research button tags in HTML and how you can make a JavaScript function run when one is clicked.
        Also check out prompts
        You should be able to enter 64 and have a brand new 64x64 grid pop up without changing the total amount of pixels used
    (Optional): Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.
    Push your project to GitHub!

 */

//#random number generator
const randomNum = function (max, min = 1) {
	return Math.floor(Math.random() * (max - min) + min);
};

//#variables
const container = document.querySelector('.grid-container');
const colorModifier = 0.9;
let gridSize = 16;

//#mouse hover function declaration
const mouseOverCB = (e) => {
	let bg = e.target.style.backgroundColor;
	const isCell = e.target.classList.contains('cell');
	const isTitle = e.target.classList.contains('letter');
	const isChanged = e.target.classList.contains('changed');
	const bnwSelected = document.getElementById('option-bnw').checked;

	//change title size on hover
	if (isTitle && !isChanged) {
		e.target.style.fontSize = `${randomNum(42, 28)}px`;
		e.target.classList.add('changed');
	} else {
		e.target.style.fontSize = '24px';
		e.target.classList.remove('changed');
	}

	if (!bg) {
		if (bnwSelected && isCell) {
			//triggers if black and white is selected
			e.target.style.backgroundColor = `hsl(0, 0%, ${randomNum(85, 1)}%)`;
		} else {
			e.target.style.backgroundColor = `hsl(${randomNum(360)}, 70%, 50%)`;
		}
	} else if (isCell) {
		let rgb = bg.split('').slice(4, -1).join('').split(', ');
		e.target.style.backgroundColor = `rgb(${rgb[0] * colorModifier}, ${
			rgb[1] * colorModifier
		}, ${rgb[2] * colorModifier})`;
		//e.target.style.backgroundColor
	}

	//#gray or white
	//e.target.style.background = bg === 'gray' ? 'white' : 'gray';

	//#colorful
	//e.target.style.background = `rgb(${randomNum()},${randomNum()},${randomNum()}`; */
};

//#touch over function declaration
const touchOver = (e) => {
	const touch = e.touches[0];
	const onTouch = document.elementFromPoint(touch.clientX, touch.clientY);
	const isCell = e.target.classList.contains('cell');
	const isTitle = e.target.classList.contains('letter');
	const isChanged = e.target.classList.contains('changed');

	let bg = element === null ? '' : element.style.backgroundColor;

	if (isTitle && !isChanged) {
		e.target.style.fontSize = `${randomNum(42, 28)}px`;
		e.target.classList.add('changed');
	} else {
		e.target.style.fontSize = '24px';
		e.target.classList.remove('changed');
	}

	if (onTouch && !bg) {
		element.style.backgroundColor = `hsl(${randomNum(360)}, 70%, 50%)`;
	} else if (onTouch && isCell) {
		let rgb = bg.split('').slice(4, -1).join('').split(', ');

		element.style.backgroundColor = `rgb(${rgb[0] * colorModifier}, ${
			rgb[1] * colorModifier
		}, ${rgb[2] * colorModifier})`;
		//e.target.style.backgroundColor
	}
};

const removeCellListeners = () => {
	document.querySelectorAll('td').forEach((cell) => {
		cell.removeEventListener('mouseover', mouseOverCB);
		cell.removeEventListener('touchmove', touchOver);
	});
};

const addCellListeners = () => {
	document.querySelectorAll('td').forEach((cell) => {
		cell.addEventListener('mouseover', mouseOverCB);
		cell.addEventListener('touchmove', touchOver);
	});
};

const removeCells = () => {
	document.querySelectorAll('tr').forEach((cell) => {
		cell.remove();
	});
};

const resetGrid = (col, row, node) => {
	removeCells();
	setTimeout(() => {
		generateGrid(col, row, node);
		addCellListeners();
	}, 500);
};

const toggleMenu = () => {
	const menu = document.getElementById('menu');
	const grid = document.querySelector('.grid-container');

	menu.classList.toggle('hide');
	grid.classList.toggle('blur');
};

generateGrid(gridSize, gridSize, container);

//event listener for cells
addCellListeners();

//event listener for title
document.querySelectorAll('.letter').forEach((letter) => {
	letter.addEventListener('mouseover', mouseOverCB);
	letter.addEventListener('touchmove', touchOver);
});

window.addEventListener('click', (e) => {
	console.log(e.target);
});

//event listener for logo
document.getElementById('pen').addEventListener('click', toggleMenu);

//prevent refresh on form submit
document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
});

//listen on reset button
document.getElementById('reload-btn').addEventListener('click', (e) => {
	const entry = document.getElementById('size');
	const size = entry.value;

	if (size > 100 || isNaN(size) || size < 2) {
		entry.style.outline = 'none';
		entry.style.borderColor = 'hsl(1, 50%, 50%)';
		entry.style.boxShadow = '0 0 20px hsl(1, 50%, 50%)';
	} else {
		entry.style.outline = 'none';
		entry.style.border = 'black solid 1px';
		entry.style.boxShadow = 'none';
		resetGrid(size, size, container);

		toggleMenu();
	}
	console.log(entry);
});
