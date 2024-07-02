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
	var headerRow = header.insertRow(0);
	var j = 0;
	headerRow.insertCell(j++).innerHTML = "Diameter";
	headerRow.insertCell(j++).innerHTML = "Price";
	headerRow.insertCell(j++).innerHTML = "Area";
	headerRow.insertCell(j++).innerHTML = "Price per area";
	headerRow.insertCell(j++).innerHTML = "";

	// Wether to compare entries to previous entry
	var doCompare = document.getElementById("compare-input").selected

	// add entries
	var body = table.createTBody();
	for (var i = 0; i < elements.length; i++) {
		var row = body.insertRow(-1);
		var j = 0;
		var diameter = elements[i].diameter + " cm";
		var price    = elements[i].price + " €";
		var area     = elements[i].area.toFixed(2) + " cm²";
		var ppa      = elements[i].pricePerArea.toFixed(4) + " €/cm²";
		if (doCompare && i > 0) {
			diameter += ` (${comparisionPercent(elements[i].diameter    , elements[i-1].diameter    )})`
			price    += ` (${comparisionPercent(elements[i].price       , elements[i-1].price       )})`
			area     += ` (${comparisionPercent(elements[i].area        , elements[i-1].area        )})`
			ppa      += ` (${comparisionPercent(elements[i].pricePerArea, elements[i-1].pricePerArea)})`
		}

		row.insertCell(j++).innerHTML = diameter;
		row.insertCell(j++).innerHTML = price;
		row.insertCell(j++).innerHTML = area;
		row.insertCell(j++).innerHTML = ppa;

		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.appendChild(txt);
		span.onclick = function() {
			// remove from elements and update table
			var rowIndex = this.parentNode.parentNode.rowIndex;
			document.getElementById("myTable").deleteRow(rowIndex);
			elements.splice(rowIndex-1, 1);
			updateTable();
		}
		row.insertCell(j++).appendChild(span);

		table.appendChild(row);
	}

	// Show the comparison checkbox
	if (elements.length >= 2) {
		document.getElementById("comparisonDiv").style.display = "inline"
	}
}

// Create a new list item when clicking on the "Add" button
function newElement() {
	var diameter = document.getElementById("diameterInput").value;
	var price    = document.getElementById("priceInput").value;
	
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

// Hide the comparison checkbox by default
document.getElementById("compare-div").style.display = "none"

updateTable();