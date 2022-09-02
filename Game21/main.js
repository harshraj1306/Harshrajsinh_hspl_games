/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
# Sound Class
  ## playSound()
# Simon Game
  ## Defaults
  ## Diamond Class
    ### Diamond Methods 
    ### Diamond Instances (Blue, Pink, Yellow & White)
  ## Game Elements (HTML)
  ## Sequence Object
  ## Functions
    ### updateRound() 
    ### setMode() 
    ### restart()
    ### checkWin() 
    ### guess()
    ### allGlow()
    ### errorChime() 
    ### showWin()
    ### hideWin()
    ### winOutro()
# toggleFooter()
# keyPress (Play with arrow or WASD keys!)
--------------------------------------------------------------*/


/* Sound class inspired by Greg Hovanesyan's pen:  https://codepen.io/gregh/pen/RKVNgB */
/* Uses the Web Audio API which let's you play a sound from its frequency | Modified to specify time.*/

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


/*--------------------------------------------------------------
 # Sound Class
--------------------------------------------------------------*/
var Sound = function() {
  function Sound(context) {
    _classCallCheck(this, Sound);

    this.context = context;
  }

  Sound.prototype.setup = function setup() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  };

  Sound.prototype.play = function play(value) {
    this.setup();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

    this.oscillator.start(this.context.currentTime);
    this.stop(this.context.currentTime);
  };

  Sound.prototype.stop = function stop(time = 1) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + time);
    this.oscillator.stop(this.context.currentTime + time);
  };

  return Sound;
}();

var context = false;

// Hacky garbage to get around Chrome blocking sound API
// See: https://developer.chrome.com/blog/autoplay/#webaudio
function attemptCreateContext(){
  if ( context ) {
    return context;
  } else {
    context = new (window.AudioContext || window.webkitAudioContext || false)();
  }
  if ( ! context ) { //  Sound Test 
      alert('Sorry, but the Web Audio API is not supported by your browser.'
            + ' Please, consider downloading the latest version of '
            + 'Google Chrome or Mozilla Firefox');
   }
}

/*--------------------------------------------------------------
   ## playSound()
--------------------------------------------------------------*/
function playSound(note, time = 1000) {
  attemptCreateContext();
  var sound = new Sound(context);
  sound.play(note);
  sound.stop(time/1000);
}

/*--------------------------------------------------------------
      # Simon Game
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Simon Game >>    ## Defaults
--------------------------------------------------------------*/

var defaults = {
  "speed"      : 1000, // Time in milliseconds (ms) between each sequence play
  "round"      : 1,    // Current Round is 1;
  "userInputs" : 0     // User hasn't input / guessed anything 
};

var currentGame =  Object.assign({}, defaults); // ES6 Syntax: cloning defaults while keeping them immutable

var strict      = false; // Mode is `forgiving`     
var started     = false;



/*--------------------------------------------------------------
## Diamond Class
--------------------------------------------------------------*/

//  Diamond Constructor function
function Diamond(sound, element){
  this.element = document.getElementById(element); // Element in the HTML with an ID of element
  this.chime   = function(){playSound(sound, currentGame.speed)}; // Add a chime() for the sound (frequency) provided
  this.cover   = this.element.querySelector( '.cover' );
}

/*--------------------------------------------------------------
## Diamond Class >>    ### Diamond Methods
--------------------------------------------------------------*/
// Adding methods to the Diamond prototype that all diamond instances will inherit

Diamond.prototype.hideGlow = function(){ // Removes the 'glowing' class from a particular diamond
  this.element.classList.remove("glowing");
}

Diamond.prototype.glow = function() { // Adds a 'glowing' class to a particular diamond
  var glowDuration = currentGame.speed - 100;
  this.hideGlow(); // Sanity check: make sure it's not glowing first
  this.element.classList.add("glowing");
  this.cover.style.animationDuration = currentGame.speed;
  var glowing = this; // We can't access the current glowing Diamond in the timer sub function as `this`
  //So we're assigning `this` to a variable called `glowing`
  setTimeout(function() {glowing.hideGlow()}, glowDuration); // After some time, remove the glowing class
}

/*--------------------------------------------------------------
## Diamond Class >>    ### Diamond Instances (Blue, Pink, Yellow & White)
--------------------------------------------------------------*/
// Let's make diamonds with our Diamond constructor function!
// For our first diamond, the note is D5, element refers to the #blue-diamond element on the page
var blueDiamond   = new Diamond(587.33, "blue-diamond"  ); // Note is D5
var pinkDiamond   = new Diamond(659.25, "pink-diamond"  ); // Note is E5
var yellowDiamond = new Diamond(739.99, "yellow-diamond"); // Note is F#5
var whiteDiamond  = new Diamond(880.00, "white-diamond" ); // Note is A5

/* Array of all diamond instances */
var diamonds = [pinkDiamond, yellowDiamond, whiteDiamond, blueDiamond];


/*--------------------------------------------------------------
## Game Elements (HTML)
--------------------------------------------------------------*/

var gameElements = { // A object containing commonly accessed HTML elements
  "round"     : document.getElementById("round"),     // Current Round number text
  "diamonds"  : document.getElementById("diamonds"),  // Big diamond shaped box which contains all 4 diamonds
  "winMsg"    : document.getElementById("winMessage"),// The (normally) hidden 'You Win' message
  "forgiving" : document.getElementById("forgiving"), // The `forgiving` mode button
  "strict"    : document.getElementById("strict")     // The `strict` mode button
}

/*--------------------------------------------------------------
 ## Sequence Object
--------------------------------------------------------------*/
var sequence  = { // An object containing all the properties and methods to play & generate a sequence
  "current" : [], // The current sequence (Start off as nothing)
  "playing" : false,         // Is the sequence currently playing? (Start off as false)
  "index"   : 0,             // Current step for playing the sequence (Start at the beginning)
  "play"    : function(){  // Play the current sequence
                this.playing = true;        // The sequence currently playing
                currentGame.userInputs = 0; // Reset the user's input to the start of the sequence
                var _this =  this; // 'this' will be undefined in the timer function so we're storing it in "_this" 
    
                setTimeout(function() {// Wait a second then loop again, going through the sequence
                  var currentDiamond = _this.current[_this.index];
                  currentDiamond.glow();
                  currentDiamond.chime();
                  _this.index++;             //  increment the counter
                  if (_this.index < currentGame.round) { //  if the counter < the current round, call the loop function
                    _this.play();           //  again which will trigger another sequence play
                  } else {
                    _this.playing = false; // Otherwise the sequence isn't playing the the user can guess
                  }                   
                }, currentGame.speed) // The speed of the timer is the same as the currentGame.speed (default 1s)
              },
  
  "generate": function(){ // Generate a random sequence
                this.index = 0;   // Reset the sequence to play from the beginning
                this.current = [];// Empty the old sequence
                var currentSequence = this.current; // Temp var because of undefined 'this' in sub function
                var easyCheatin = []; // Not necessary, making it easy to cheat.
                  for(var j=0; j < 20; j++){ // Loop over 20 times
                    var randomDiamond = diamonds[Math.floor(Math.random()*diamonds.length)]; // randomly select a diamond
                    currentSequence.push(randomDiamond); // And add it to the current sequence
                    easyCheatin.push(randomDiamond.element.id);
                  }
                console.log(easyCheatin); // Log the sequence to the console cuz we're cheaters
              }
};


/*--------------------------------------------------------------
# Simon Game >>   ## Functions
--------------------------------------------------------------*/    

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### updateRound() 
--------------------------------------------------------------*/   
function updateRound() { // Update the round counter text on the page
    gameElements.round.innerHTML = currentGame.round; 
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### setMode() 
--------------------------------------------------------------*/  
function setMode(mode){ // Sets the game mode to the mode passed (Either strict or forgiving)
  var other  = (mode === "strict") ? 'forgiving' : 'strict'; // Ternary: Other = not the current mode
      strict = (mode === "strict") ? true        : false;
  gameElements[other].classList.remove("active"); // remove active (glowing) from the other element
  gameElements[mode].classList.add("active"); // Add active class to current mode
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### restart() 
--------------------------------------------------------------*/  
function restart (){ // Starts a new game
  if (started === false ) { // If this is the first game played
    started = true; // then it's been started
    document.getElementById("playMsg").innerHTML = "RESTART?"; // Change text from 'PLAY?' to 'RESTART?'
    document.getElementById("playIcon").innerHTML = "&#8635;"; // Change the icon from '►' to '↻'
    document.getElementById("replay").classList.remove("playMe"); // Get rid of playMe (glowing) class
  } // Do the rest of this stuff always
  currentGame =  Object.assign({}, defaults); // Reset to game defaults
  updateRound();       // Update the round counter to 1
  sequence.generate(); // Generate a new sequence
  sequence.play();     // Play the new sequence
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### checkWin() 
--------------------------------------------------------------*/  
function checkWin(){ // Check to see if the user won
  if ( currentGame.userInputs >= sequence.current.length ) { 
    // If the user's correct guesses are the same as the length of the whole sequence
    showWin(); // They've won.  Show the winning animation
    setTimeout(function() {restart()}, 7000); // Wait 7 seconds and restart the game
  } else if(currentGame.userInputs >= currentGame.round){ // Else if the has cleared the current round (but not won the whole game)
      currentGame.round++; // Increase the round
      updateRound();       // Update the round text on screen
      currentGame.speed -= 25; // Shave off 25ms from time (Slowly gets faster each round)
      sequence.index = 0;  // Reset the sequence index to the beginning
      sequence.play();     // And play the sequence again
  }
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### guess() 
--------------------------------------------------------------*/  
function guess(diamond){ // Checks a users guess (diamond clicked on)
  if(sequence.current.length === 0){ 
    diamond.chime(); // If the game hasn't started it acts like a music instrument!
  }
  if(sequence.playing || !started){ return;} // If the sequence is playing, return (do nothing)
  if(sequence.current[currentGame.userInputs] === diamond){ // If the user guessed correctly
    currentGame.userInputs++; // Increase the user's input (steps)
    diamond.chime(); // Chime!
    checkWin(); // And check to see if they won
    
  } else { // Otherwise they guessed incorrectly
    errorChime(); // Play the error music
      if(strict === true){ // If the game mode is strict
        setTimeout(function(){ restart(); }, 1100); // Wait for the error chime to finish (1100ms) then restart the game
      } else { // Otherwise the mode is forgiving
        currentGame.userInputs = 0; // Reset the user's guess
        sequence.index = 0;         // Start from the beginning of the sequence
        
        // Wait for the error chime to finish (1100ms) then replay the sequence
        setTimeout(function(){ sequence.playing = false; sequence.play(); }, 1100);
      }
  }
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### allGlow() 
--------------------------------------------------------------*/  
function allGlow(){ // Make all the diamonds glow!
    pinkDiamond.glow();
    blueDiamond.glow();
  yellowDiamond.glow();
   whiteDiamond.glow();
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### errorChime() 
--------------------------------------------------------------*/  
function errorChime(){ // Let the user know they guessed incorrectly
  sequence.playing = true; // We don't want the user to guess while the error music is playing
  allGlow(); // Light all the diamonds up
  playSound(261.63); // Play a C4
  setTimeout(function(){ playSound(246.94);}, 500); // Wait half a sec, then play a B3
  setTimeout(function(){ playSound(220.00);}, 1000);// Wait a sec, then play an A3
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### showWin() 
--------------------------------------------------------------*/  
function showWin(){ // Show the user they won!
  hideWin(); // Sanity check: Make sure the winning class isn't already active
  allGlow(); // Make all the diamonds glow!
  gameElements.diamonds.classList.add("winner");// Add "winning" class to diamonds (They shrink out of view)
  document.getElementById("info").classList.add("winner");
  gameElements.winMsg.classList.add("winner");  // Add "winning" class to winMsg ("You Win" fades in)
  setTimeout(function() {winOutro()}, 3000);    // Wait three seconds then play the outro
}

/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### hideWin() 
--------------------------------------------------------------*/  
function hideWin(){ // Remove all classes pertaining to showing the 'You Win' message
  gameElements.diamonds.classList.remove("winner");
  gameElements.winMsg.classList.remove("winner");
  gameElements.winMsg.classList.remove("outro");
  gameElements.diamonds.classList.remove("outro");
  document.getElementById("info").classList.remove("winner");
  document.getElementById("info").classList.remove("outro");
}
/*--------------------------------------------------------------
# Simon Game >>   ## Functions >>     ### winOutro() 
--------------------------------------------------------------*/  
function winOutro(){  // Return to the game's default appearance
  gameElements.winMsg.classList.add("outro");  // Add "outro" class to winMsg ("You Win" fades back out)
  document.getElementById("info").classList.add("outro");
  gameElements.diamonds.classList.add("outro");// Add "outro" class to diamonds (They scale back into view)
  setTimeout(function() {allGlow()}, 500); // Wait half a second, then have all the diamonds glow
  setTimeout(function() {hideWin()}, 3000);// When the animation is complete (3s) we can remove all the classes
}

/*--------------------------------------------------------------
 # toggleFooter()
--------------------------------------------------------------*/
var footerHidden = true;
function toggleFooter(){
  footerHidden = !footerHidden;
  var message = (footerHidden) ? 'More' : 'Hide';
  document.getElementById("footer").classList.toggle("visible");
  document.getElementById("info").childNodes[1].innerHTML = message +" <br> Info";
}

/*--------------------------------------------------------------
 # keyPress (Play with arrow or WASD keys!)
--------------------------------------------------------------*/

document.onkeydown = function (e) {
    e = e || window.event;
     if(sequence.playing){return;}
    if (e.keyCode == 38 || e.keyCode == 87) { // Up keycode || W keycode
        guess(whiteDiamond);
        whiteDiamond.glow();
    } else if (e.keyCode == 37 || e.keyCode == 65) { // left keycode || A
        guess(blueDiamond);
        blueDiamond.glow();
    } else if (e.keyCode == 39 || e.keyCode == 68) { // right keycode || D
        guess(yellowDiamond);
        yellowDiamond.glow();
    } else if (e.keyCode == 40 || e.keyCode == 83) { // down keycode || S
        guess(pinkDiamond);
        pinkDiamond.glow();
    }
};

/*--------------------------------------------------------------
 # 2022 Update | Wait for DOM Content loaded; Add event handlers.
--------------------------------------------------------------*/
/**
 * I noticed the whole thing was broken recently as I had onclick
 * attrs on the the HTML elements, updating to fix it;
 */

document.addEventListener("DOMContentLoaded", function () {
  const replayButton = document.getElementById( 'replay' );
  replayButton.addEventListener( 'click', restart );
  
  const toggleFooterButton = document.getElementById( 'info' );
  toggleFooterButton.addEventListener( 'click', toggleFooter );
  
  const diamondElems = document.querySelectorAll( '.diamond' );
  const diamondObj = {
    'white-diamond' : whiteDiamond,
    'yellow-diamond' : yellowDiamond,
    'blue-diamond' : blueDiamond,
    'pink-diamond' : pinkDiamond,
  }
  
   Array.from( diamondElems ).forEach( diamondElem => {
      diamondElem.addEventListener( 'click', function() {
          guess( diamondObj[ diamondElem.id ] );
      } );
  } );
  
  Array.from( document.querySelectorAll( '#strict, #forgiving' ) ).forEach( option => {
      option.addEventListener( 'click', function() {
          setMode( option.id );
      } );
  } );
  
  
} );