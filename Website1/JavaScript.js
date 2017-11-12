

//Constructor for a cell
function item(title, desc, img, type, instock, ref){
	this.title=title;
	this.desc=desc;
	this.img=img;
	this.type=type;
	this.instock=instock;
	this.ref=ref;
}


//Create and fill storage array
var storage = new Array();
storage[0] = new item("Бабочки", "Настенные часы, оформленные в виде кольца из бабочек", "GridImages/butterflies.png", "wall", true, "example.com");
storage[1] = new item("Коты", "Настенные часы с котами", "GridImages/cats.png", "wall", false, "example.com");
storage[2] = new item("Город", "Наручные часы со стрелками в виде зданий", "GridImages/city.png", "wrist", true, "example.com");
storage[3] = new item("Пирожные", "Наручные часы с пирожными вместо цифр", "GridImages/cupcakes.png", "wall", true, "example.com");
storage[4] = new item("Точки ", "Наручные часы с точечным циферблатом", "GridImages/dots.png", "wrist", true, "example.com");
storage[5] = new item("Портреты", "Настенные часы с семейными портретами", "GridImages/family.png", "wall", false, "example.com");
storage[6] = new item("Шестерни", "Настенные часы с корпусом в виде шестерней", "GridImages/gears.png", "wall", false, "example.com");
storage[7] = new item("Механика золото", "Наручные часы в механическом стиле с отделкой золотого цвета", "GridImages/mechGold.png", "wrist", true, "example.com");
storage[8] = new item("Механика синие", "Наручные часы в механическом стиле с отделкой синего цвета", "GridImages/mechBlue.png", "wrist", true, "example.com");
storage[9] = new item("Гжель", "Наручные часы в стиле гжель", "GridImages/gzhel.png", "wrist", false, "example.com");
storage[10] = new item("Шестиугольники", "Настенные часы с корпусом из шестиугольников", "GridImages/hexagons.png", "wall", false, "example.com");
storage[11] = new item("Картина", "Настенные часы в виде картины", "GridImages/painting.png", "wall", false, "example.com");
storage[12] = new item("Палитра", "Настенные часы с корусом в виде палитры", "GridImages/palette.png", "wall", true, "example.com");
storage[13] = new item("Пластинка", "Настенные часы в виде пластинки и изображением группы Rammstein", "GridImages/record.png", "all", true, "example.com");
storage[14] = new item("Космос", "Часы в виде шлема астронавта", "GridImages/space.png", "wall", true, "example.com");
storage[15] = new item("Лента", "Настенные часы в виде катушки с магнитой лентой", "GridImages/tape.png", "wall", false, "example.com");
storage[16] = new item("Колесо", "Часы в виде колеса велосипеда", "GridImages/wheel.png", "wall", true, "example.com");

var grid = document.getElementsByClassName("gridtable")[0];
var fStorage = new Array();
var rows = new Array();
var menu = new Array();
var fType = "all";
i = 0;


//Get random int from range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Shuffle array
function shuffle (arr) {
	var temp;
	var j;
	for (i=0; i<=arr.length-2; i++){
		j = getRandomInt(i, arr.length-1);
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}


//Filter array by type
function filter(){
	fStorage.length = 0;
	for (i=0; i < storage.length; i++){
		if (storage[i].type == fType || fType == "all") {
			fStorage[fStorage.length] = storage[i];
		}
	}
}


//Update grid
function update(){
	filter();
	shuffle(fStorage);
	grid.innerHTML = "";
	if (fStorage.length !=0) {
		for (i=0; i < fStorage.length; i++){
			if (i%3 == 0) {grid.innerHTML += "<tr></tr>";}; 
			rows = grid.getElementsByTagName("tr");
			rows[rows.length-1].innerHTML += '<td class="gridcell"><a href="https://'+fStorage[i].ref+'"target="_blank"><img src="'+fStorage[i].img+'" width="160px"></a><a href="https://'+fStorage[i].ref+'"target="_blank"><p class="cap">'+fStorage[i].title+'</a></p>	<p data-instock="'+fStorage[i].instock+'"></p>	<p>'+fStorage[i].desc+'</p></td>';
		}
		while (grid.getElementsByTagName("tr").length < 3){
			grid.innerHTML += '<tr></tr>'
		}
	}
	else {
		grid.innerHTML = '<tr></tr><tr><td></td><td id="empty"><div> Результаты не найдены </div></td><td></td></tr><tr></tr>';
	}
}


//Processes button input
function setType(x){
	switch(x){
		case 0 :
			fType = 'all'
			;
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
	update();
	menu = document.getElementsByClassName('tf');
	for (i=0; i < menu.length; i++){
		menu[i].dataset.sel = "0";
	}
	menu[x].dataset.sel = "1";
}


update();
