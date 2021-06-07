
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Milk",
		lactoseFree: false,
		nutFree: true,
		price: 3.99,
		organic: false,
		image: "images/milk.png",
	},
	{
		name: "Bread",
		lactoseFree: true,
		nutFree: true,
		price: 2.35,
		organic: false,
		image: "images/bread.png",
	},
	{
		name: "Salmon",
		lactoseFree: true,
		nutFree: true,
		price: 10.00,
		organic: false,
		image: "images/salmon.jpg",
	},
	{
		name: "Orange Juice",
		lactoseFree: true,
		nutFree: true,
		price: 3.50,
		organic: true,
		image: "images/orange-juice.jpg",
	},
	{
		name: "Yogurt",
		lactoseFree: false,
		nutFree: true,
		price: 5,
		organic: true,
		image: "images/yogurt.jpg",
	},
	{
		name: "Peanut Butter",
		lactoseFree: true,
		nutFree: false,
		price: 8.99,
		organic: true,
		image: "images/peanut-butter.jpg",
	},
	{
		name: "Cheese",
		lactoseFree: false,
		nutFree: true,
		price: 3.25,
		organic: false,
		image: "images/cheese.jpg",
	},
	{
		name: "Rocky Road Ice Cream",
		lactoseFree: false,
		nutFree: false,
		price: 10.00,
		organic: false,
		image: "images/ice-cream.jpg",
	},
	{
		name: "Nutella Cake",
		lactoseFree: false,
		nutFree: false,
		price: 13.50,
		organic: false,
		image: "images/nutella-cake.jpg",
	},
	{
		name: "Butter",
		lactoseFree: false,
		nutFree: true,
		price: 1.50,
		organic: true,
		image: "images/butter.png",
	},
	{
		name: "Cashews",
		lactoseFree: true,
		nutFree: false,
		price: 12.79,
		organic: false,
		image: "images/cashews.jpg",
	},
	{
		name: "Bottled Water",
		lactoseFree: true,
		nutFree: true,
		price: 0.75,
		organic: true,
		image: "images/bottled-water.jpg",
	},
	{
		name: "Peppers",
		lactoseFree: true,
		nutFree: true,
		price: 3.99,
		organic: true,
		image: "images/peppers.jpg"
	},
];

function ableToEat(product, lactoseIntolerant, nutFree, organic) {
	if (!product.nutFree && nutFree) {
		return false;
	} else if (!product.lactoseFree && lactoseIntolerant) {
		return false;
	} else if (!product.organic && organic) {
		return false;
	}
	return true;
}
// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, lactoseIntolerant, nutFree, organic, sorter) {
	let products = [];
	for (let i = 0; i < prods.length; i += 1) {
		if (ableToEat(prods[i], lactoseIntolerant, nutFree, organic)) {
			products.push(prods[i]);
		}
	}
	return products.sort(sorter);
}