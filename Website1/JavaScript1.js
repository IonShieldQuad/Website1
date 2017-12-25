

//Constructor for a cell
function Item(title, desc, img, type, instock, ref){
	this.title=title;
	this.desc=desc;
	this.img=img;
	this.type=type;
	this.instock=instock;
	this.ref=ref;
}


//Create and fill storage array
var storage = [];
storage[0] = new Item("Бабочки", "Настенные часы, оформленные в виде кольца из бабочек", "GridImages/butterflies.png", "wall", true, "example.com");
storage[1] = new Item("Коты", "Настенные часы с котами", "GridImages/cats.png", "wall", false, "example.com");
storage[2] = new Item("Город", "Наручные часы со стрелками в виде зданий", "GridImages/city.png", "wrist", true, "example.com");
storage[3] = new Item("Пирожные", "Наручные часы с пирожными вместо цифр", "GridImages/cupcakes.png", "wall", true, "example.com");
storage[4] = new Item("Точки ", "Наручные часы с точечным циферблатом", "GridImages/dots.png", "wrist", true, "example.com");
storage[5] = new Item("Портреты", "Настенные часы с семейными портретами", "GridImages/family.png", "wall", false, "example.com");
storage[6] = new Item("Шестерни", "Настенные часы с корпусом в виде шестерней", "GridImages/gears.png", "wall", false, "example.com");
storage[7] = new Item("Механика золото", "Наручные часы в механическом стиле с отделкой золотого цвета", "GridImages/mechGold.png", "wrist", true, "example.com");
storage[8] = new Item("Механика синие", "Наручные часы в механическом стиле с отделкой синего цвета", "GridImages/mechBlue.png", "wrist", true, "example.com");
storage[9] = new Item("Гжель", "Наручные часы в стиле гжель", "GridImages/gzhel.png", "wrist", false, "example.com");
storage[10] = new Item("Шестиугольники", "Настенные часы с корпусом из шестиугольников", "GridImages/hexagons.png", "wall", false, "example.com");
storage[11] = new Item("Картина", "Настенные часы в виде картины", "GridImages/painting.png", "wall", false, "example.com");
storage[12] = new Item("Палитра", "Настенные часы с корусом в виде палитры", "GridImages/palette.png", "wall", true, "example.com");
storage[13] = new Item("Пластинка", "Настенные часы в виде пластинки и изображением группы Rammstein", "GridImages/record.png", "all", true, "example.com");
storage[14] = new Item("Космос", "Часы в виде шлема астронавта", "GridImages/space.png", "wall", true, "example.com");
storage[15] = new Item("Лента", "Настенные часы в виде катушки с магнитой лентой", "GridImages/tape.png", "wall", false, "example.com");
storage[16] = new Item("Колесо", "Часы в виде колеса велосипеда", "GridImages/wheel.png", "wall", true, "example.com");

var itemBox = document.getElementById('itemBox');
var itemIndex = 0;
var fStorage = [];
var rows = [];
var menu = [];
var fType = "all";
var menuOpen = false;
var menuRef = document.getElementById('menu');


//Get random int from range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Shuffle array
function shuffle (arr) {
	var temp;
	var j;
	for (let i = 0; i <= arr.length - 2; i++){
		j = getRandomInt(i, arr.length - 1);
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}

//Toggle menu
function menuToggle(){
	if (menuOpen){
		menuOpen = false;
		menuRef.style.visibility = 'collapse';
	}
	else {
		menuOpen = true;
		menuRef.style.visibility = 'visible';
	}
}

//Move to another list item
function listMove(steps = 0){
	if (filter().length > 0)
	itemIndex += steps;
	if (itemIndex < 0){
		itemIndex = filter().length - 1
	}
	itemIndex %= fStorage.length - 1;
	update();
}

//Filter array by type
function filter(){
	fStorage.length = 0;
	for (let i = 0; i < storage.length; i++){
		if (storage[i].type == fType || fType == "all") {
			fStorage[fStorage.length] = storage[i];
		}
	}
	return fStorage;
}


//Update grid
function update(){
	filter();
	shuffle(fStorage);
	itemBox.innerHTML = "";
	if (fStorage.length != 0) {
		let i = itemIndex;
		itemBox.innerHTML = `<div class="item"><a href="https://${fStorage[i].ref}" target="_blank"><img src="${fStorage[i].img}" width="160px"></a><a href="https://${fStorage[i].ref}"target="_blank"><p class="cap">${fStorage[i].title}</a></p>	<p data-instock="${fStorage[i].instock}"></p>	<p>${fStorage[i].desc}</p></div>`;
	}
	else {
		itemBox.innerHTML = '<div id="empty"> Результаты не найдены </div>';
	}
}


//Processes button input
function setType(x){
	switch(x){
		case 0 :
			fType = 'all';
			break;
		case 1 :
			fType = 'wall';
			break;
		case 2 :
			fType = 'wrist';
			break;
		case 3 :
			fType = 'pocket';
			break;
		default :
			fType = 'all';
			break;
	}
	itemIndex = 0;
	update();
	menu = document.getElementsByClassName('tf');
	for (let i = 0; i < menu.length; i++){
		menu[i].dataset.sel = "0";
	}
	menu[x].dataset.sel = "1";
}


update();