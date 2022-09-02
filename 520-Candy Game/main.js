alert("THANKS A MILLION FOR 2K FOLLOWERS💐🎊🎊🎁\n\nIf you are having any issues while playing, try the github page version:\ jhamadhav.github.io/Color-candy \n\nComment in your high score & level\n\n HAVE FUN & enjoy its FULLSCREEN version too 👍😊")

var canvas, ctx, h, w, game_stop, run, score_keeper;
var angle = 0;
var fps = 60;
var r = 50,
  playerR = r / 4,
  gap = 22;
var obs_width = 20,
  obs_angle_gap,
  bet_gap;
var obstacle = [];
var colors = [
  "#F25652",
  "#3E4E59",
  "#903B42",
  "#00ADA9",
  "#FFC636",
  "darkpink"
];
var bg;
var music, vibration, level;
var hscore = { easy: 0, medium: 0, hard: 0 },
  score = { easy: 0, medium: 0, hard: 0 };

/* event listeners  */

//function to change visual when window is resized and on loading
window.addEventListener("load", init);
window.addEventListener("resize", init);

// control player by mousemovement
window.onmousemove = function(e) {
  e.preventDefault();
  angle = (e.clientY / (h / 3)) * 2 * Math.PI;
};
window.ontouchmove = function(e) {
 // e.preventDefault();
  if(angle != (e.touches[e.touches.length - 1].pageY / (h / 3)) * 2 * Math.PI){
  angle = (e.touches[e.touches.length - 1].pageY / (h / 3)) * 2 * Math.PI;}
};


// initial function
function init() {
        
  //establishing some stuff
  score_keeper = document.getElementById("score_keeper");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  h = canvas.height = window.innerHeight;
  w = canvas.width = window.innerWidth;
  ctx.translate(w / 2, h / 2);

if(h<550){
    let tab = document.getElementsByClassName('tab');
    for(let i=1;i<tab.length;i++){

        tab[i].style.width = '100vw';
        //tab[i].style.top = '0';
        tab[i].style.bottom = '0';
        tab[i].style.height = '100vh';
    }
            tab[0].style.width = '82%';
        tab[0].style.height = '65vh';
        tab[0].style.maxWidth = '400px';
        tab[0].style.maxHeight = '516px';
}else{
       let tab = document.getElementsByClassName('tab');
    for(let i=0;i<tab.length;i++){
            tab[i].style.width = '82%';
        tab[i].style.height = '65vh';
        tab[i].style.maxWidth = '400px';
        tab[i].style.maxHeight = '516px';
        tab[i].style.bottom = '0';

    }

}
  //to set background image and paint the canvas
  ctx.rect(-w / 2, -h / 2, w, h, "#262626");
  ctx.fill();
  bg = new Image();
  bg.src = "https://dl.dropbox.com/s/2i3egbtea94u3n8/game_backdround.jpg?dl=0";
  bg.onload = function() {
    ctx.drawImage(bg, -w / 2, -h / 2, w, h);

    //to cut off the loader once it is loaded
document.getElementById("cont").style.display = "none";
  };


  //game functions
  reset_game();

  //events for animating back button
  let back = document.getElementsByClassName("back_icon");
  for (let i = 0; i < back.length; i++) {
    back[i].addEventListener("click", animate_tabs);
  }
}

//function to draw
function draw() {
  //to paint the whole canvas
  ctx.rect(-w / 2, -h / 2, w, h, "#262626");
  ctx.fill();
  ctx.drawImage(bg, -w / 2, -h / 2, w, h);

  //to update obstacles
  for (let i = 0; i < obstacle.length; i++) {
    if (obstacle[i].r > r - obs_width) {
      obstacle[i].update();
      obstacle[i].draw();
    }
    obstacle[i].coll();
  }
  if (obstacle[0].r < r) {
    switch (level) {
      case "easy":
        score.easy++;
        score_keeper.innerText = score.easy;
        if (score_keeper.value == 40) {
          level = medium;
          game_end();
        }
        break;
      case "medium":
        score.medium++;
        score_keeper.innerText = score.medium;
        if (score_keeper.value == 40) {
          level = hard;
          game_end();
        }
        break;
      case "hard":
        score.hard++;
        score_keeper.innerText = score.hard;
        if (score_keeper.value == 40) {
          level = easy;
          game_end();
          if (score.easy == 40 && score.medium == 40 && score.hard == 40) {
            document.getElementById("msg").innerText =
              "Yay!! Candy land is safe now ! wanna restart ?";
          }
        }
        break;
    }
    create_obs();
    obstacle.shift();
  }
  let x = (r + gap) * Math.cos(angle);
  let y = (r + gap) * Math.sin(angle);
  game_stop = r + gap + 2 * playerR;

  //player circle
  draw_circle(x, y, playerR, 0, 2 * Math.PI, "#262626", "cyan", 0);
}

function create_obs() {
  let obs_r = obstacle[obstacle.length - 1].r + bet_gap;
  let ran = Math.floor(Math.random() * colors.length);
  let v1 = Math.floor(Math.random() * 2 * Math.PI);
  let angle1 = (obs_angle_gap / 2 + v1) % (2 * Math.PI);
  let angle2 = (2 * Math.PI - obs_angle_gap / 2 + v1) % (2 * Math.PI);
  let ob = new Obstacle(obs_r, angle1, angle2, colors[ran]);
  obstacle.push(ob);
}

//to draw circles
function draw_circle(
  x,
  y,
  radius,
  angle_from,
  angle_to,
  fill_color,
  stroke_color,
  line_width
) {
  ctx.beginPath();
  ctx.fillStyle = fill_color;
  ctx.strokeStyle = stroke_color;
  ctx.lineWidth = line_width;
  ctx.lineCap = "round";
  ctx.arc(x, y, radius, angle_from, angle_to, false);
  ctx.fill();
  if (line_width != 0) {
    ctx.stroke();
  }

  ctx.closePath();
}

/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (document.fullscreenElement == null) {
    // it's  not fullscreen so make it
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  } else {
    // if fullscreen then exit it!
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}


// animation
function nav(x) {
  let tab = document.getElementsByClassName("tab");
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.visibility = "hidden";
  }

  tab[0].style.left = "0";
  tab[0].style.visibility = "hidden";
  tab[x].style.left = 0;
  tab[x].style.visibility = "visible";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}

function animate_tabs() {
  let tab = document.getElementsByClassName("tab");
  for (let i = 1; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.visibility = "hidden";
  }
  tab[0].style.left = "0";
  tab[0].style.visibility = "visible";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}

//obstacles
function Obstacle(r, a1, a2, color) {
  this.r = r;
  this.a1 = a1;
  this.a2 = a2;
  this.color = color;

  this.draw = function() {
    draw_circle(
      0,
      0,
      this.r,
      this.a1,
      this.a2,
      "transparent",
      this.color,
      obs_width
    );
  };

  this.update = function() {
    if (this.r > 0) {
      this.r -= 3.3;
    }
  };

  this.coll = function() {
    if (this.r <= game_stop) {
      let p = {
        x: game_stop * Math.cos(angle),
        y: game_stop * Math.sin(angle)
      };
      let a = {
        x: game_stop * Math.cos(this.a1),
        y: game_stop * Math.sin(this.a1)
      };
      let b = {
        x: game_stop * Math.cos(this.a2),
        y: game_stop * Math.sin(this.a2)
      };
      //console.log(get_dis(p, a) + get_dis(p, b));
      if (get_dis(a, b) < get_dis(p, a) + get_dis(p, b) - 15) {
        clearInterval(run);
        game_end(level);
      }
    }
  };
}

function get_dis(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

//game
function play_game() {
  let home = document.getElementsByClassName("home");
  home[0].style.display = "none";
  let tab = document.getElementsByClassName("tab");
  tab[0].style.display = "none";
  let game = document.getElementsByClassName("container");
  game[0].style.display = "block";
     
  play_again();
}

function set_param() {
  music = document.getElementById("sound").checked;
  vibration = document.getElementById("vibra").checked;
  level = document.getElementById("level").value;

  switch (level) {
    case "easy":
      fps = 15;
      obs_angle_gap = Math.PI / 2;
      bet_gap = 120;

      break;

    case "medium":
      fps = 20;
      obs_angle_gap = Math.floor(Math.PI / 2 - Math.PI / 10);
      bet_gap = 100;
      break;

    case "hard":
      fps = 30;
      obs_angle_gap = Math.floor(Math.PI / 3);
      bet_gap = 100;
      break;
  }
}
function play_again() {
  document.getElementById("end_card").style.display = "none";
  canvas.style.filter = "blur(0)";
  reset_game();
  run = setInterval(draw, 1000 / fps);

  //music and vibration on click

  if (music) {
    let click = document.getElementById("click");
    let game_music = document.getElementById(level);


    game_music.currentTime = 0;
    game_music.play();
    click.currentTime = 0;
    click.play();
  }
}
function reset_game() {
  obstacle = [];
  set_param();
  score.easy = 0;
  score.medium = 0;
  score.hard = 0;
  score_keeper.innerText = 0;

  //making of initial obstacles
  obstacle[0] = new Obstacle(
    r + playerR + gap + 140,
    obs_angle_gap / 2,
    2 * Math.PI - obs_angle_gap / 2,
    "cyan"
  );
  while ((h > w ? h : w) > obstacle[obstacle.length - 1].r) {
    create_obs();
  }

  draw();
}

function game_end(level) {
  canvas.style.filter = "blur(5px)";
  document.getElementById("end_card").style.display = "flex";
  let level_show = document.getElementById("level_show");
  level_show.innerText = level;
  let hscore_show = document.getElementById("hscore_show");
  let score_show = document.getElementById("score_show");
  let msg = document.getElementById("msg");
  let temp;
  switch (level) {
    case "easy":
      if (score.easy >= hscore.easy) {
        hscore.easy = score.easy;
      }
      hscore_show.innerText = hscore.easy;
      score_show.innerText = score.easy;
      temp = score.easy;
      break;
    case "medium":
      if (score.medium >= hscore.medium) {
        hscore.medium = score.medium;
      }
      hscore_show.innerText = hscore.medium;
      score_show.innerText = score.medium;
      temp = score.medium;
      break;
    case "hard":
      if (score.hard >= hscore.hard) {
        hscore.hard = score.hard;
      }
      hscore_show.innerText = hscore.hard;
      score_show.innerText = score.hard;
      temp = score.hard;
      break;
  }
  if (temp < 40) {
    msg.innerText = "Try again !";
  } else {
    msg.innerText = "Play next level !";
    //music and vibration on winning
    if (music) {
    if(w>800){
        let win = document.getElementById("win");
      win.currentTime = 0;
      win.play();
    }
      
      let game_music = document.getElementById(level);
      game_music.pause();
    }
  }

  //music and vibration
  if (music) {
  if(w>700){
          let lose = document.getElementById("lose");
    lose.currentTime = 0;
    lose.play();
  }


    let game_music = document.getElementById(level);
    game_music.pause();
  }
  if (vibration) {
    window.navigator.vibrate(400);
  }
}
function main_menu() {
  let game = document.getElementsByClassName("container");

  document.getElementById("end_card").style.display = "none";
  game[0].style.display = "none";
  let home = document.getElementsByClassName("home");
  home[0].style.display = "flex";
  let tab = document.getElementsByClassName("tab");
  tab[0].style.display = "flex";

  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}

