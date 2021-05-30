
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



// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(nameOpts, idDiv) {
	var opt1 = document.getElementsByName(nameOpts)[0];
	var opt2 = document.getElementsByName(nameOpts)[1];
	var opt3 = document.getElementsByName(nameOpts)[2];
	var display = document.getElementById(idDiv);

	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
	display.innerHTML = "";

	// obtain a reduced list of products based on restrictions

	var optionArray = restrictListProducts(products, opt1.checked, opt2.checked, opt3.checked);
	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	for (i = 0; i < optionArray.length; i++) {

		var productName = optionArray[i].name;
		var productPrice = optionArray[i].price;
		var organic = optionArray[i].organic ? "(organic)" : "";
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		checkbox.id = productName;
		display.appendChild(checkbox);

		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName + ", $" + productPrice + " "));

		var organicSpan = document.createElement('span');
		organicSpan.style.color = "green";
		organicSpan.appendChild(document.createTextNode(organic));
		label.appendChild(organicSpan);
		display.appendChild(label);

		// create a breakline node and add in HTML DOM
		display.appendChild(document.createElement("br"));
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

