var $1 = $('#s1');
var $2 = $('#s2');
var $3 = $('#s3');
var $4 = $('#s4');
var $5 = $('#s5');
var $6 = $('#s6');
var $7 = $('#s7');
var $8 = $('#s8');
var $9 = $('#s9');
var isOver = false;
var moveCount = 0;
var board = [];
function newBoard() {
board = [$1, $2, $3,
				 $4, $5, $6,
				 $7, $8, $9]
}
var player;
var comp;

function adjustBoard() {
	for(var x = 0; x < board.length; x++) {
		if(board[x].html() == comp || board[x].html() == player) {
			board.splice(x,1);
		}
	}
}

//arg1 = space to mark, arg2 = symbol to mark with
function mark(space, sym){
	if (space.html() === "&nbsp;") {
		space.html(sym);
		moveCount++;
		checkStatus();
		adjustBoard();
		console.log(board);
		if(board.length % 2 === 1){
			compMove();
		}
	} else {
		alert("Spot already taken.");
	}
};

//Player chooses side, show board, hide buttons
$('#playerX').click(function(){
	isOver = false;
	player = "X";
	comp = "O";
			newBoard();
	$('.spaceBox').css("display", "flex");
	$('.buttonRow').css("display", "none");
	if(!isOver){
		compMove();
	};
});
$('#playerO').click(function(){
	isOver = false;
	player = "O";
	comp = "X";
			newBoard();
	$('.spaceBox').css("display", "flex");
	$('.buttonRow').css("display", "none");
	if(!isOver){
		compMove();
	};
});

//handle player clicking spot
$('.space').click(function() {
	mark($(this), player);
});

//computer ai
function compMove(){
	//first move
	if (moveCount === 0) {
		var i = Math.floor(Math.random() * 4);
		switch (i) {
			case 0:
				mark($1, comp);
				break;
			case 1:
				mark($3, comp);
				break;
			case 2:
				mark($7, comp);
				break;
			case 3:
				mark($9, comp);
				break;
		};
	} else {
		var i = Math.floor(Math.random() * board.length);
		console.log("i = "+ i);
		$(board[i][0]).html(comp);
		adjustBoard();
		moveCount++;
		checkStatus();
		console.log("board after computer move: " + board);
	}	
};

//checks to see if win, handles win, returns else
function checkStatus(){
	console.log(moveCount);
	if ( ($1.html() === player && $2.html() === player && $3.html() === player) ||
			 ($4.html() === player && $5.html() === player && $6.html() === player) ||
			 ($7.html() === player && $8.html() === player && $9.html() === player) ||
			 ($1.html() === player && $4.html() === player && $7.html() === player) ||
		 	 ($2.html() === player && $5.html() === player && $8.html() === player) ||
			 ($3.html() === player && $6.html() === player && $9.html() === player) ||
			 ($1.html() === player && $5.html() === player && $9.html() === player) ||
			 ($3.html() === player && $5.html() === player && $7.html() === player) ){
		alert("You Win. ");
		isOver = true;
		clearBoard();
	} else if ( ($1.html() === comp && $2.html() === comp && $3.html() === comp) ||
			 ($4.html() === comp && $5.html() === comp && $6.html() === comp) ||
			 ($7.html() === comp && $8.html() === comp && $9.html() === comp) ||
			 ($1.html() === comp && $4.html() === comp && $7.html() === comp) ||
		 	 ($2.html() === comp && $5.html() === comp && $8.html() === comp) ||
			 ($3.html() === comp && $6.html() === comp && $9.html() === comp) ||
			 ($1.html() === comp && $5.html() === comp && $9.html() === comp) ||
			 ($3.html() === comp && $5.html() === comp && $7.html() === comp) ){
		alert("You Lost. ");
		clearBoard();
		isOver = true;
	} else if (moveCount === 9) {
		alert("It's a Draw.");
		clearBoard();
		isOver = true;
	}else {
		return;
	}
};

//clear board, reset to player choice
function clearBoard() {
		$('.space').each(function(){
			$(this).html("&nbsp;");
		});
		moveCount = 0;
		$('.spaceBox').css("display", "none");
		$('.buttonRow').css("display", "");
};