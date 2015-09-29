var memory_array = ['A','B','C','D','E','F','G','H','I','J','K','L','A','B','C','D','E','F','G','H','I','J','K','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
//--------------------------
var result = 0;
var resultCounter = document.getElementById('counter');

function newBoard(){
	tiles_flipped = 0;
	result = 0;
	var output = '';
	memory_array.memory_tile_shuffle();
	for(var i=0;i<memory_array.length;i++){
		output += '<div id="tile'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
	counter.innerHTML="Counter: "+result;
}

function memoryFlipTile(tile,value){
	if(tile.innerHTML=="" && memory_values.length<2){
		tile.style.background = '#FFF';
		tile.innerHTML=value;
		if(memory_values.length==0){
			memory_values.push(value);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length==1){
			memory_values.push(value);
			memory_tile_ids.push(tile.id);
			if(memory_values[0]==memory_values[1]){
				function hideTiles(){
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.style.visibility="hidden";
					tile_2.style.visibility="hidden";
					tiles_flipped+=2;
					memory_values=[];
					memory_tile_ids=[];
					result++;
					counter.innerHTML="Counter: "+result;
					if(tiles_flipped==memory_array.length){
						alert("You won in "+result+" tries!");
						newBoard();
					}
				}
				setTimeout(hideTiles,300);			
			} else {
				function flipBack(){
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.style.background='blue';
					tile_2.style.background='blue';
					tile_1.innerHTML="";
					tile_2.innerHTML="";
					memory_values=[];
					memory_tile_ids=[];
					result++;
					counter.innerHTML="Counter: "+result;
				}
				setTimeout(flipBack,500);
			}
		}
	}
}

memory_array.memory_tile_shuffle = function(){
	var i = this.length;
	var j;
	var temp;

	while(--i > 0){
		j=Math.floor(Math.random()*(i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}