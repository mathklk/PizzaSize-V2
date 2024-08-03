class PizzaEntry {
	constructor(diameter, price) {
		this.diameter = diameter;
		this.price = price;
		this.area = diameter * diameter * Math.PI / 4;
		this.pricePerArea = price / this.area;
	}

}
var elements = [];

function sortElements() {
	elements.sort(function(a, b) {
		return a.diameter - b.diameter;
	});
}

function comparisionPercent(a, b) {
	let ratio = a / b;
	return `${(ratio*100).toFixed(0)}%`
}

function updateTable() {
	var table = document.getElementById("table");
	// clear table
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
	// add header
	var header = table.createTHead();
	header.innerHTML = `
        <tr>
            <th>Diameter</th>
            <th>Price</th>
            <th>Area</th>
            <th>Price per area</th>
            <th></th>
        </tr>
    `;

	// add entries
	const body = table.createTBody();
    elements.forEach(element => {
        const row = body.insertRow();
        row.innerHTML = `
            <td>${element.diameter} cm</td>
            <td>${element.price} €</td>
            <td>${element.area.toFixed(2)} cm²</td>
            <td>${element.pricePerArea.toFixed(4)} €/cm²</td>
            <td><span class="material-symbols-outlined" style="cursor: pointer;">delete</span></td>
        `;

        // Add delete functionality
        row.querySelector('span').onclick = function() {
            const rowIndex = this.parentNode.parentNode.rowIndex;
            document.getElementById("table").deleteRow(rowIndex);
            elements.splice(rowIndex - 1, 1);
            updateTable();
        };
    });

	console.log(elements);
	if (elements.length <= 0) {
		const row = body.insertRow();
		row.innerHTML = `
		<td colspan="5">
			<p class="center-horizontally" style="opacity: .38; margin: 5px">
				No pizzas added yet
			</p>
		</td>
		`;
	}
}

// Create a new list item when clicking on the "Add" button
function newElement() {
	var diameter = document.getElementById("diameter-input").value;
	var price    = document.getElementById("price-input").value;
	
	if (diameter === '' || price === '') {
		alert("Please fill in all fields");
		return;
	}
	diameter = parseFloat(diameter);
	price    = parseFloat(price);
	if (isNaN(diameter) || isNaN(price)) {
		alert("Please enter valid numbers");
		return;
	}

	// clear input fields
	document.getElementById("diameter-input").value = '';
	document.getElementById("price-input").value = '';


	const entry = new PizzaEntry(diameter, price);
	elements.push(entry);
	sortElements();
	updateTable();
} 

// When site finished loading
document.addEventListener('DOMContentLoaded', function() {
	// updateTable();
});

