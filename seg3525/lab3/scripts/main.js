
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	document.getElementsByTagName("title")[0].innerHTML = "Orange Grocer - " + tabName;
}

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
	document.getElementById(grid).style.height = newHeight;
	document.getElementById(sidebar).style.height = newHeight.replace("00", "50");
}

// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

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
		tile.style.height = "250px";
		tile.style.width = "230px";
		tile.style.border = "2px solid black";
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
		name.appendChild(document.createTextNode(`${optionArray[i].name} `));
		if (optionArray[i].organic) {
			let organicSpan = document.createElement('span');
			organicSpan.style.color = "green";
			organicSpan.appendChild(document.createTextNode("(organic)"));
			name.appendChild(organicSpan);
		}
		tile.appendChild(name);

		let price = document.createElement("p");
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
		qty.id = "quantity";
		qty.min = "0";
		qty.max = "200";
		qty.value = "0";
		qty.style.height = "20px";
		qty.style.width = "50px";
		select.appendChild(qty);

		tile.appendChild(select);

		display.appendChild(tile);
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

	var ele = document.getElementsByName("product");
	var chosenProducts = [];

	var c = document.getElementById('displayCart');
	c.innerHTML = "";

	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			var text = document.createTextNode(ele[i].value + "\t ");
			text.id = ele[i].value;
			para.appendChild(text);
			var remove = document.createElement("button")
			remove.onclick = function (event) {
				console.log(event.target.previousSibling.id);
				removeItem(event.target.previousSibling.id);
			};
			remove.innerHTML = "remove";
			para.appendChild(remove);
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}

	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Your total price is $" + getTotalPrice(chosenProducts)));
	c.appendChild(document.createElement("br"));
	c.appendChild(document.createTextNode("Thank you for shopping at Orange Grocery!"));
}

function removeItem(name) {
	var checkbox = document.getElementById(name);
	checkbox.checked = false;
	selectedItems();
}

