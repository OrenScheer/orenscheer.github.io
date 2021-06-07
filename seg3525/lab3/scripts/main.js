function priceLowToHigh(productA, productB) {
	if (productA.price > productB.price) {
		return 1;
	} else if (productB.price > productA.price) {
		return -1;
	}
	return 0;
}

function priceHighToLow(productA, productB) {
	if (productB.price > productA.price) {
		return 1;
	} else if (productA.price > productB.price) {
		return -1;
	}
	return 0;
}

function alphabetical(productA, productB) {
	if (productA.name > productB.name) {
		return 1;
	} else if (productB.name > productA.name) {
		return -1;
	}
	return 0;
}

function setDivHeights(length, grid, sidebar) {
	let newHeight;
	if (length / 5 >= 0 && length / 5 <= 1) {
		document.getElementById(grid).style.paddingBottom = "0px";
		document.getElementById(grid).style.height = "400px";
		document.getElementById(sidebar).style.height = "550px";
		return;
	} else if (length / 5 >= 1 && length / 5 <= 2) {
		newHeight = "600px";
	} else {
		newHeight = "800px";
	}
	document.getElementById(grid).style.paddingBottom = "80px";
	document.getElementById(grid).style.height = newHeight;
	document.getElementById(sidebar).style.height = newHeight.replace("00", "50");
}

function populateListProductChoices(nameOpts, idDiv, sorterName) {
	var opt1 = document.getElementsByName(nameOpts)[0];
	var opt2 = document.getElementsByName(nameOpts)[1];
	var opt3 = document.getElementsByName(nameOpts)[2];
	var display = document.getElementById(idDiv);

	display.innerHTML = "";
	sorter = window[sorterName];

	var optionArray = restrictListProducts(products, opt1.checked, opt2.checked, opt3.checked, sorter);

	setDivHeights(optionArray.length, idDiv, "sidebar");

	for (i = 0; i < optionArray.length; i++) {
		let tile = document.createElement("div");
		tile.className = "item";
		tile.style.height = "250px";
		tile.style.width = "230px";
		tile.style.border = "2px solid orange";
		tile.style.display = "flex";
		tile.style.flexDirection = "column";
		tile.style.justifyContent = "flex-start";
		tile.style.alignItems = "center";

		let image = document.createElement("img");
		image.src = optionArray[i].image;
		image.height = 150;
		image.width = 230;
		tile.appendChild(image);

		let name = document.createElement("p");
		name.style.marginTop = "0px";
		name.style.marginBottom = "10px";
		name.style.fontSize = "20px";
		name.style.fontWeight = "bold";
		name.className = "name";
		name.appendChild(document.createTextNode(`${optionArray[i].name} `));
		if (optionArray[i].organic) {
			let organicSpan = document.createElement('span');
			organicSpan.style.color = "green";
			organicSpan.appendChild(document.createTextNode("(organic)"));
			name.appendChild(organicSpan);
		}
		tile.appendChild(name);

		let price = document.createElement("p");
		price.className = "price";
		price.style.marginTop = "0px";
		price.style.marginBottom = "10px";
		price.style.fontSize = "20px";
		price.appendChild(document.createTextNode(`$${optionArray[i].price}`));
		tile.appendChild(price);

		let select = document.createElement("div");
		select.style.marginTop = "0px";

		let label = document.createElement("label");
		label.htmlFor = "quantity";
		label.innerHTML = "Quantity:";
		select.appendChild(label);

		let qty = document.createElement("input");
		qty.type = "number";
		qty.className = "quantity";
		qty.min = "0";
		qty.max = "200";
		if (sessionStorage.getItem(name.firstChild.nodeValue) === null) {
			qty.value = "0";
		} else {
			qty.value = sessionStorage.getItem(name.firstChild.nodeValue);
		}
		qty.style.height = "20px";
		qty.style.width = "50px";
		qty.onchange = recalculatePrice;
		select.appendChild(qty);

		tile.appendChild(select);

		display.appendChild(tile);
	}

	recalculatePrice();
}

function recalculatePrice() {
	let items = document.getElementsByClassName("item");
	let totalPrice = 0;
	for (i = 0; i < items.length; i++) {
		let qty = Number.parseFloat(items[i].getElementsByClassName("quantity")[0].value);
		sessionStorage.setItem(items[i].getElementsByClassName("name")[0].firstChild.nodeValue, qty);

		let price = Number.parseFloat(items[i].getElementsByClassName("price")[0].firstChild.nodeValue.replace("$", ""));
		totalPrice += qty * price;
	}
	totalPrice = Number.parseFloat(totalPrice.toFixed(2));
	document.getElementById("total-price").innerHTML = `Total price: $${totalPrice}`;
}

function toggleDatePicker() {
	let picker = document.getElementById("date-picker");
	if (picker.style.display == "none" || !picker.style.display) {
		picker.style.display = "flex";
	} else {
		picker.style.display = "none";
	}
}

function hideDatePicker(event) {
	picker.style.display = "none";
}

let picker = document.getElementById("date-picker");
let calendar = document.getElementById("calendar");
picker.addEventListener("click", (event) => {
	event.stopPropagation();
})
calendar.addEventListener("click", (event) => {
	event.stopPropagation();
})

let date = document.getElementById("date");
date.value = new Date().toISOString().slice(0, 10);
date.min = new Date().toISOString().slice(0, 10);