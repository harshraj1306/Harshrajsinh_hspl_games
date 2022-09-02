$(function() {
    var img_urls = [
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/deer.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/dolphin.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/kangaroo.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/leopard.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/panther.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/penguin.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/rabbit.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/sheep.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/swan.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/wolf.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/zebra.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/duck.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/deer.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/dolphin.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/kangaroo.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/leopard.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/panther.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/penguin.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/rabbit.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/sheep.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/swan.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/wolf.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/zebra.png",
      "https://raw.githubusercontent.com/mburakerman/memorizr/master/img/duck.png"
    ];
  
    //Shuffle js array > http://stackoverflow.com/a/2450976/4991434
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
  
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    }
  
    var arr = img_urls;
    arr = shuffle(arr);
  
    for (i = 0; i < img_urls.length; i++) {
      $(".items").append(
        "<div class='container'><div class='front'>" +
          img_urls[i] +
          "</div><div class='back'><img class='image' src=' " +
          img_urls[i] +
          "'/></div></div>"
      );
    }
  
    var first;
    var second;
  
    var total_clicks = 0;
    var count = 0;
  
    function check_level() {
      if (total_clicks === 10) {
        $(".first-svg").removeClass("level");
      } else if (total_clicks === 15) {
        $(".second-svg").removeClass("level");
      } else if (total_clicks === 20) {
        $(".third-svg").removeClass("level");
      }
    }
  
    function game_over() {
      if ($(".matched").length === 48) {
        setTimeout(function() {
          alert("Congrats. You have finished the game!");
        }, 1200);
  
        setTimeout(function() {
          location.reload();
        }, 1800);
      }
    }
  
    // for mozilla issue, make opacity 0 as default
    $(".image").addClass("noOpacity");
  
    $(".front").click(function(e) {
      // for mozilla issue, play opacity of .image
      var self = this;
      setTimeout(function() {
        $(self).next(".back").find(".image").addClass("yesOpacity");
      }, 300);
  
      count++;
  
      // prevent fast click
      if ($(e.target).data("oneclicked") != "yes") {
        $(e.target).css("pointer-events", "none");
        setTimeout(function() {
          $(e.target).css("pointer-events", "auto");
        }, 400);
      }
  
      if (count === 1) {
        $(this, ".front").addClass("showBack-front").addClass("clicked");
        $(this).next(".back").addClass("showBack-back").addClass("clicked");
  
        first = $(this, ".front").text();
      } else {
        $(this, ".front").addClass("showBack-front").addClass("clicked");
        $(this).next(".back").addClass("showBack-back").addClass("clicked");
  
        second = $(this, ".front").text();
        count = 0;
  
        $(".front").css("pointer-events", "none");
  
        setTimeout(function() {
          if (first === second) {
            total_clicks = total_clicks - 1;
  
            $(".clicked").addClass("animated tada matched no-pointer-events");
  
            //Check if game is over
            game_over();
          } else {
            $(".front").removeClass("showBack-front");
            $(".back").removeClass("showBack-back");
  
            $(".clicked").addClass("animated shake");
  
            setTimeout(function() {
              $(".clicked").removeClass("clicked shake");
  
              // for mozilla issue, play opacity of .image
              $(".image").not("section .matched").removeClass("yesOpacity");
              $(".image").not("section .matched").addClass("noOpacity");
            }, 500);
          }
  
          $(".front").css("pointer-events", "auto");
  
          total_clicks++;
          $(".total_clicks span").text(total_clicks);
          check_level();
        }, 525);
      }
  
      return false;
    });
  
    // hide particles in mozilla
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      document.getElementById("particles-js").style.display = "none";
    }
  });
  
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#e37575"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#e37575"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#e37575",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
  