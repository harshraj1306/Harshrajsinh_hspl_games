/*global $, console */
$(document).ready(function () {
	'use strict';
	
	$(".play").click(function () {
		
	});
	
	function time(){ 
			s +=1;
			if(s == 60){
				m += 1;
				s = 0;
			}
			if(m == 60){
				h +=1;
				m = 0;
			}
			if (s < 10){
				S = "0" + s;
			} else {
				S = s;
			}
			if (m < 10){
				M = "0" + m;
			} else {
				M = m;
			}
			if (h < 10){
				H = "0" + h;
			} else {
				H = h;
			}
			$(".timer").text(H + " : " + M + " : " + S);
		}
		var tower = [ $('.tower._1'), $('.tower._2'), $('.tower._3') ],
			disc  = [],
			i,
			level = $(".level").val(),
			s = 0,
			S = s,
			m = 0,
			M = m,
			h = 0,
			H = h;
		tower[0].empty();
		tower[1].empty();
		tower[2].empty();
		clearInterval(time);
		$(".won").slideUp();
		for (i = 1; i <= 7; i += 1) {
			tower[0].append('<div class="disc size' + i + '"></div>');
		}
		var timer = setInterval(time, 1000);
			
		if ((tower[1].children().length == 7) || (tower[2].children().length == 7)) {
			$('.won').slideDown();
		}
		$('.tower').click(function () {

			if ($(this).children().first().hasClass('upToMove')) {
				$(this).children().first().removeClass('upToMove');
			} else {
				if ($(this).siblings().children().hasClass('upToMove')) {
				} else {
					$(this).children().first().addClass('upToMove');
				}
			}
			if ($(this).siblings().children().find('.upToMove')) {
				if ($(this).children().first().width() < $(this).siblings().children('.upToMove').width()) {
					$('section').prepend("<p></p>");
					$('section p').text("You Can't Put a Big Disc Up On a smaller one.").delay(4000).fadeOut();
				} else {
					$(this).prepend($(this).siblings().children('.upToMove').removeClass('upToMove'));
					if ((tower[1].children().length == level) || (tower[2].children().length == level)){
						$(".won").slideDown();
					}
				}
			}

		});
		$('.disc').each(function () {
			$(this).css({
				bottom : $(this).nextAll().length * 25
			});
		});

		$(window).click(function () {
			$('.disc').each(function () {
				$(this).css({
					bottom : $(this).nextAll().length * 25
				});
			});
		});
		
	
	
});