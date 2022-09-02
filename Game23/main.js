$(document).ready(function () {
	var arr = [], userArr = [], computerArr = [], steps = 1, tileIds = [1,2,3,4], interval, counter = 0, random, kount = 0, mode = 0, score = 0;
	
	function endGame () {
		clearInterval(interval);
		deactivate();
		$(".game-status").html("Simon Game");
		$(".game-controls").addClass('hidden');
		$(".btn-start").removeClass('hidden');
		arr = []; userArr = []; computerArr = []; steps = 1; counter = 0; kount = 0; mode = 0; score = 0;
	}

	function deactivate () {
		$("#tile-" + random).removeClass("tile-" + random + "-activated");
		$(".btn-reset").prop('disabled', false);
	}

	function activate () {
		$("#tile-" + random).addClass("tile-" + random + "-activated");
	}

	function triggerClick () {
		$("#tile-" + random).trigger('click', function (e) {});
	}

	function setMode () {
		mode = 1;
		$(".game-status").html("Your Turn");
	}

	function timeout () {
		if (steps > 20) {
			alert ("Victory! Congratulations");
		}
		$(".btn-reset").prop('disabled', 'disabled');
		$(".game-status").html("Computer's Turn");
		$(".game-steps-no").html(steps);
		$(".game-score-no").html(score);
		mode = 0;
		arr = computerArr;
		computerArr = [];
		userArr = [];

		interval = setInterval(function () {
			kount = 0;
			deactivate();
			random = Math.floor(Math.random() * tileIds.length);
			if (arr[counter] !== undefined) {
				random = arr[counter];
			}
			setTimeout(triggerClick, 500);
			setTimeout(activate, 500);
			counter++;

			if (counter == steps) {
				clearInterval(interval);
				setTimeout(deactivate, 750);
				kount = 0;
				setTimeout(setMode, 1000);
			}
		}, 750);
	}

	$(".tile").click(function (e) {
		var idNum = e.currentTarget.id.substr(5);
		function playAudio () {
			var audio = document.getElementById("sound-" + idNum);		
			audio.play();
		}
		playAudio();
		if (e.isTrigger) {
			computerArr.push(idNum);
		}

		else if (mode == 1) {
			userArr.push(idNum);
			if (computerArr[kount] !== userArr[kount]) {
				alert('Ouch you lose!');
				endGame();
			}
			else {console.log('Success');}
			kount++;
			if (kount == computerArr.length) {
				mode = 0;
				counter = 0;
				steps++;
				score++;
				setTimeout(timeout, 400);
				$(".game-score-no").html(score);
			}
		}
	});

	$(".btn-start").click(function () {
		$(this).addClass('hidden');
		$(".game-controls").removeClass('hidden');
		timeout();
	});

	$(".btn-reset").click(function () {
		setTimeout(endGame, 100);
	});
});