const generateGrid = (col, row, node) => {
	const containerWidth = 420;

	node.style.width = `${containerWidth}px`;
	node.style.height = `${containerWidth}px`;

	for (let i = 1; i <= row; i++) {
		let row = document.createElement('tr');
		row.id = `x${i}`;
		row.style.height = `${containerWidth / row}px`;
		row.style.width = `${containerWidth / row}px`;

		console.log(row.style.width);

		node.append(row);

		for (let j = 1; j <= col; j++) {
			let col = document.createElement('td');
			col.id = `x${i}y${j}`;
			col.classList = 'column  collapse';

			row.append(col);
		}
	}
};

export default generateGrid;
