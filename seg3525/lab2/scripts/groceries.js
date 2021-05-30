
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "milk",
		lactoseFree: false,
		nutFree: true,
		price: 3.99
	},
	{
		name: "bread",
		lactoseFree: true,
		nutFree: true,
		price: 2.35
	},
	{
		name: "salmon",
		lactoseFree: true,
		nutFree: true,
		price: 10.00
	},
	{
		name: "orange juice",
		lactoseFree: true,
		nutFree: true,
		price: 3.50
	},
	{
		name: "yogurt",
		lactoseFree: false,
		nutFree: true,
		price: 5
	},
	{
		name: "peanut butter",
		lactoseFree: true,
		nutFree: false,
		price: 8.99
	},
	{
		name: "cheese",
		lactoseFree: false,
		nutFree: true,
		price: 3.25
	},
	{
		name: "rocky road ice cream",
		lactoseFree: false,
		nutFree: false,
		price: 10.00
	},
	{
		name: "nutella cake",
		lactoseFree: false,
		nutFree: false,
		price: 13.50
	},
	{
		name: "butter",
		lactoseFree: false,
		nutFree: true,
		price: 1.50
	},
	{
		name: "cashews",
		lactoseFree: true,
		nutFree: false,
		price: 12.79
	},
	{
		name: "bottled water",
		lactoseFree: true,
		nutFree: true,
		price: 0.75
	}
];


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let products = [];
	for (let i = 0; i < prods.length; i += 1) {
		if ((restriction == "LactoseIntolerant") && (prods[i].lactoseFree == true)) {
			products.push(prods[i]);
		}
		else if ((restriction == "AllergicToNuts") && (prods[i].nutFree == true)) {
			products.push(prods[i]);
		}
		else if (restriction == "None") {
			products.push(prods[i]);
		}
	}
	compareProducts = function (productA, productB) {
		return productA.price > productB.price;
	}
	return products.sort(compareProducts);
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i = 0; i < products.length; i += 1) {
		if (chosenProducts.indexOf(products[i].name) > -1) {
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
