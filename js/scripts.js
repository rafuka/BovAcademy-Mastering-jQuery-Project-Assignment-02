(function($){
	'use strict';

	var $board = $('#tic-tac-toe');

    var boxesState = [];  // An array of objects that will contain a reference to each jquery box, 
    					  // state, i.e. selected or not

    var computerBot = true; // True when the match is vs. computer.

    var matchResult = null; // null unless there is a match result (true for win, false for lose). If all boxes
    						// are selected then its a tie.

    // Selects all the boxes that are not crossed nor circled.
    var getEmptyBoxes = function($board) {

    	return $board.find('.box').filter(function(i, elm){
	    	return !$(elm).hasClass('crossed') && !$(elm).hasClass('circled');
	    });
	}

    


	console.log(getEmptyBoxes($board));

	console.log('-----');


	$oneBox = $boxes.eq(3);

	console.log($oneBox);
	console.log($boxes.has($oneBox));


	//$boxes.on('click', boxClicked);

})(jQuery);