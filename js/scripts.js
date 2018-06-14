(function($, TM){
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
    				boxesState[i] = 'crossed';
    			}
    			else boxesState[i] = 'circled';
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
    		(boxesState[0] === 'crossed' && boxesState[4] === 'crossed' && boxesState[8] === 'crossed') ||
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
    		(boxesState[0] === 'circled' && boxesState[4] === 'circled' && boxesState[8] === 'circled') ||
    		(boxesState[2] === 'circled' && boxesState[4] === 'circled' && boxesState[6] === 'circled') ||
    		(boxesState[0] === 'circled' && boxesState[3] === 'circled' && boxesState[6] === 'circled') ||
    		(boxesState[1] === 'circled' && boxesState[4] === 'circled' && boxesState[7] === 'circled') ||
    		(boxesState[2] === 'circled' && boxesState[5] === 'circled' && boxesState[8] === 'circled')) 
    	{

    		this.matchResult = 'lose';
    		return this.matchResult;
    	}

    	// Check if it's a tie
    	else if (this.getCheckedBoxes().length === this.boxes.length) 
    	{
    		this.matchResult = 'tie';
    		return this.matchResult;
    	}

    	else return null;
    };

    $game.manageResults = function(results) {

        var mask = $('.mask');
        mask.css('z-index', '1');
        mask.css('opacity', '1');

        var resultText = $('<h2>').addClass('result-text');
        var playAgainBtn = $('<button>').addClass('play-again-btn').text('Play Again');

        playAgainBtn.on('click', function(e) {
            window.location.reload();
        });

        if (results === 'win') {
            resultText.addClass('win');
            resultText.text('You Win!');
        }
        else if (results === 'lose') {
            resultText.addClass('lose');
            resultText.text('You Lose!');
        }
        else {
            resultText.addClass('tie');
            resultText.text('It\'s a Tie!');
        }

        mask.append(resultText);
        mask.append(playAgainBtn);
                
    }

    $game.board.on('click', '.box', function(event) {
    	if (!$(this).hasClass('checked')) {
    		if (playerTurn) {

    			$(this).addClass('checked');
    			var $crossElm = $('<div>').addClass('cross');
    			$(this).append($crossElm);
    			
                TM.to($crossElm[0], 1.5, {opacity: 1, ease: Back.easeOut, rotationX: 180, rotationY: 180});

    			playerTurn = false;

    			var results = $game.getResults();

                if (results) {
                    $game.manageResults(results);
                }
    			

    			if ($game.computerBot) {
    				$(this).trigger('computer-turn');
    			}

	    	}
	    	else {
	    		
	    		console.log('not your turn!');
	    	}
    	}
    	else {
  			
            TM.from($(this).children().eq(0), 1.5, {scale: .9, ease: Elastic.easeOut.config(1, 0.1)});
    	}
    	
    });

    $game.board.on('computer-turn', function(event) {

    	if (!$game.matchResult) {

    		setTimeout(function(){

    			var $emptyBoxes = $game.getEmptyBoxes();
		    	var randNum = Math.floor(Math.random() * $emptyBoxes.length);
		    	var $box = $emptyBoxes.eq(randNum).addClass('checked');
		    	var $circleElm = $('<div>').addClass('circle');

		    	$box.append($circleElm);

                TM.to($circleElm[0], 1.5, {opacity: 1, ease: Back.easeOut, rotationX: 180, rotationY: -180});

		    	var results = $game.getResults();
	    			
	    		if (results) {

	    			$game.manageResults(results);
	    		}
	    		else {
	    			playerTurn = true;
	    		}

    		}, (Math.random() * 3000) + 1000);	
    	}
    });

})(jQuery, TweenMax);