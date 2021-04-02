const _generateGrid = (col, row, node) => {
	node.style.width = `${col * 20}px`;

	for (let i = 1; i <= row; i++) {
		let row = document.createElement('tr');
		row.id = `x${i}`;
		row.classList = 'row height-1';
		row.style.width = `${col * 20}px`;

		console.log(row.style.width);

		node.append(row);

		for (let j = 1; j <= col; j++) {
			let col = document.createElement('td');
			col.id = `x${i}y${j}`;
			col.classList = 'column border collapse height-1 width-1';

			row.append(col);
		}
	}
};

export default _generateGrid;
