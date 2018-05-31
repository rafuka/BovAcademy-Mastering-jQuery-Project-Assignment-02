(function($){
	'use strict';

	var playerTurn = true;
	
	var $game = {};
	
	$game.board = $('#tic-tac-toe');
    $game.boxes = $game.board.find('.box'); 
    $game.matchResult = null; // null unless there is a match result ('win', 'lose', or 'tie').   
    $game.computerBot = true; // True when the match is vs. computer.

    
    $game.getEmptyBoxes = function() {

    	return this.board.find('.box').filter(function(i, elm) {
	    	return !$(elm).hasClass('checked');
	    });
	};

    $game.getCheckedBoxes = function() {

    	return this.board.find('.box.checked');
    };

    // Returns an array with 'cross' or 'circle' for checked boxes and null for unchecked boxes
    $game.getBoxesState = function() {

    	var boxesState = [];

    	for (var i = 0, len = this.boxes.length; i < len; i++) {
    		
    		var box = this.boxes.eq(i);

    		if (box.hasClass('checked')) {

    			if (box.children().first().hasClass('cross')) {
    				boxesState[i] = 'cross';
    			}
    			else boxesState[i] = 'circle';
    		}

    		else boxesState[i] = null;
    	}

    	return boxesState;
    };

    // Returns 'win', 'lose', 'tie', or null.
    $game.getResults = function() {

    	var boxesState = this.getBoxesState();

    	// Check for crosses' results.
    	if 
    		((boxesState[0] === 'crossed' && boxesState[1] === 'crossed' && boxesState[2] === 'crossed') ||
    		(boxesState[3] === 'crossed' && boxesState[4] === 'crossed' && boxesState[5] === 'crossed') ||
    		(boxesState[6] === 'crossed' && boxesState[7] === 'crossed' && boxesState[8] === 'crossed') ||
    		(boxesState[0] === 'crossed' && boxesState[4] === 'crossed' && boxesState[7] === 'crossed') ||
    		(boxesState[2] === 'crossed' && boxesState[4] === 'crossed' && boxesState[6] === 'crossed') ||
    		(boxesState[0] === 'crossed' && boxesState[3] === 'crossed' && boxesState[6] === 'crossed') ||
    		(boxesState[1] === 'crossed' && boxesState[4] === 'crossed' && boxesState[7] === 'crossed') ||
    		(boxesState[2] === 'crossed' && boxesState[5] === 'crossed' && boxesState[8] === 'crossed')) 
    	{
    		
    		this.matchResult = 'win';
    		return this.matchResult;
    	}

    	// Check for circles's results.
    	else if 
    		((boxesState[0] === 'circled' && boxesState[1] === 'circled' && boxesState[2] === 'circled') ||
    		(boxesState[3] === 'circled' && boxesState[4] === 'circled' && boxesState[5] === 'circled') ||
    		(boxesState[6] === 'circled' && boxesState[7] === 'circled' && boxesState[8] === 'circled') ||
    		(boxesState[0] === 'circled' && boxesState[4] === 'circled' && boxesState[7] === 'circled') ||
    		(boxesState[2] === 'circled' && boxesState[4] === 'circled' && boxesState[6] === 'circled') ||
    		(boxesState[0] === 'circled' && boxesState[3] === 'circled' && boxesState[6] === 'circled') ||
    		(boxesState[1] === 'circled' && boxesState[4] === 'circled' && boxesState[7] === 'circled') ||
    		(boxesState[2] === 'circled' && boxesState[5] === 'circled' && boxesState[8] === 'circled')) 
    	{

    		this.matchResult = 'lose';
    		return this.matchResult;
    	}

    	// Check if it's a match
    	else if (this.getCheckedBoxes().length === this.boxes.length) 
    	{
    		this.matchResult = 'tie';
    		return this.matchResult;
    	}

    	else return null;
    };

    $game.board.on('click', '.box', function() {
    	if (playerTurn) {
    		$(this)
    	}
    	else {
    		// TODO: display 'its not your turn' message.
    	}
    });


	console.log($game.getEmptyBoxes());

	console.log('-----');

	console.log($game.getCheckedBoxes());

	console.log($game.getBoxesState());


})(jQuery);