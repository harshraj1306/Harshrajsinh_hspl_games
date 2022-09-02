function hide(elem) {
    switch(elem) {
      case 1:
        document.getElementById("tdd1").style.opacity = 0;
        document.getElementById("tdd2").style.opacity = 0;
        document.getElementById("tdd5").style.opacity = 0;
        break;
      case 2:
        document.getElementById("tdd6").style.opacity = 0;
        break;
      case 5:
        document.getElementById("tdd9").style.opacity = 0;
        break;
      case 6:
        document.getElementById("tdd4").style.opacity = 0;
        document.getElementById("tdd8").style.opacity = 0;
        break;
      case 9:
        document.getElementById("tdd3").style.opacity = 0;
        document.getElementById("tdd7").style.opacity = 0;
        break;
    }
  }
  
  function resett() {
    document.getElementById("tdd1").style.opacity = 1;
    document.getElementById("tdd2").style.opacity = 1;
    document.getElementById("tdd3").style.opacity = 1;
    document.getElementById("tdd4").style.opacity = 1;
    document.getElementById("tdd5").style.opacity = 1;
    document.getElementById("tdd6").style.opacity = 1;
    document.getElementById("tdd7").style.opacity = 1;
    document.getElementById("tdd8").style.opacity = 1;
    document.getElementById("tdd9").style.opacity = 1;
  }