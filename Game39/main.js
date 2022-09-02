'use strict';
// Keyframes
var kfShow = [
  {opacity: 0},
  {opacity: 1}
];
var kfHide = [
  {opacity: 1},
  {opacity: 0}
];
var kfAppend = [
  {transform: 'scale(0)', opacity: 0},
  {transform: 'scale(1)', opacity: 0, offset: .1},
  {transform: 'scale(1)', opacity: 1}
];
var kfRemove = [
  {transform: 'scale(1)', opacity: 1},
  {transform: 'scale(1)', opacity: 0, offset: .1},
  {transform: 'scale(0)', opacity: 0}
];
var kfWindPath2 = [
  {strokeDasharray: '0 450', strokeDashoffset: 0},
  {strokeDasharray: '450 450', strokeDashoffset: -450, offset: .5},
  {strokeDasharray: '450 450', strokeDashoffset: -450}
];
var kfWindPath1 = [
  {strokeDasharray: '0 250', strokeDashoffset: 0},
  {strokeDasharray: '250 250', strokeDashoffset: -250, offset: .5},
  {strokeDasharray: '250 250', strokeDashoffset: -250}
];
var kfBalloonUp = [
  {transform: 'translate(0,0)'},
  {transform: 'translate(0,-600px)'}
];
var kfSeanBodyShake = [
  {transform: 'rotate(0) translate(0,0)'}, 
  {transform: 'rotate(-4deg) translate(4px, -2px)'},
  {transform: 'rotate(3deg) translate(-3px, -1px)'}
];
var kfSeanDrop = [
  {transform: 'translate(0, 0)'}, 
  {transform: 'translate(0, 410px)'}
];
var kfSeanEaten = [
  {transform: 'translate(0, 410px)'},
  {transform: 'translate(-200px, 690px)'}
];
var kfSeanBackMiddle = [
  {transform: 'translate(-200px, 690px)', opacity: 0},
  {transform: 'translate(0, 690px)', opacity: 0, offset: .05},
  {transform: 'translate(0, 390px)', opacity: 0, offset: .1},
  {transform: 'translate(0, 130px)', opacity: .1, offset: .4},
  {transform: 'translate(0, 0px)', opacity: 1, offset: 1}
];
var kfSeanSoulUp = [
  {transform: 'translate(0, 0px)', opacity: 1},
  {transform: 'translate(0, 0px)', opacity: 0, offset: .8},
  {transform: 'translate(0, -600px)', opacity: 0}
];
var kfSeanSoulDown = [
  {transform: 'translate(0, -600px)', opacity: 1},
  {transform: 'translate(0, 0px)', opacity: 1}
];
var kfSeanHairN = [
  {transform: 'rotate(0) skew(0)'},
  {transform: 'rotate(-4deg) skew(8deg)'},
  {transform: 'rotate(0) skew(0)', offset: .5},
  {transform: 'rotate(4deg) skew(-8deg)'},
  {transform: 'rotate(0) skew(0)'}
];
var kfSeanYellNo = [
  {transform: 'scale(0)', opacity: 1},
  {transform: 'scale(1)', opacity: 1, offset: .05},
  {transform: 'scale(1)', opacity: 1, offset: .8},
  {transform: 'scale(1.2)', opacity: 0}
];
var kfBillyUp = [
  {transform: 'translate(0, 0)'}, 
  {transform: 'translate(-20px, 0)'}, 
  {transform: 'translate(-340px, -80px)'}
];
var kfBillyDown = [
  {transform: 'translate(-340px, -80px)'},
  {transform: 'translate(-540px, 200px)'}
];
var kfBillyOut = [
  {transform: 'translate(0, 0)'},
  {transform: 'translate(240px, 100px)'}
];
var kfBillySwimLeft = [
  {transform: 'rotate(0)'},
  {transform: 'rotate(-35deg)', offset: .2},
  {transform: 'rotate(10deg)', offset: .25},
  {transform: 'rotate(-55deg)', offset: .3},
  {transform: 'rotate(-60deg)', offset: .5},
  {transform: 'rotate(0)'}
];
var kfBillySwimRight = [
  {transform: 'rotate(0)'},
  {transform: 'rotate(25deg)', offset: .2},
  {transform: 'rotate(-20deg)', offset: .25},
  {transform: 'rotate(35deg)', offset: .3},
  {transform: 'rotate(40deg)', offset: .5},
  {transform: 'rotate(0)'}
];
var kfBillyHeadRaise = [
  {transform: 'rotate(0)'}, 
  {transform: 'rotate(30deg)'}
];
var kfJamesHeadRaise = [
  {transform: 'rotate(0)'}, 
  {transform: 'rotate(-15deg)'}
];
var kfWaterFlow = [
  {transform: 'translate(0, 0)'},
  {transform: 'translate(1080px, 0)'}
];
var kfBubblesUp = [
  {transform: 'translate(0, 0)', opacity: 1},
  {transform: 'translate(0, -120px)', opacity: 0}
];
var kfSAArmLeftEn = [
  {transform: 'matrix(.75, .7, .7, -.75, -264.5186, 236.5396)', opacity: 0, offset: 0},
  {transform: 'matrix(.75, .7, .7, -.75, -264.5186, 236.5396)', opacity: 1, offset: .01},
  {transform: 'matrix(.75, .7, .7, -.75, 464.5186, 236.5396)'},
  {transform: 'matrix(1, 0, 0, -1, 564.5186, 236.5396)', opacity: 1}
];
var kfSAArmRightEn = [
  {transform: 'matrix(-.75, .7, -.7, -.75, 1339.293, 236.5396)', opacity: 0, offset: 0},
  {transform: 'matrix(-.75, .7, -.7, -.75, 1339.293, 236.5396)', opacity: 1, offset: .01},
  {transform: 'matrix(-.75, .7, -.7, -.75, 739.293, 236.5396)'},
  {transform: 'matrix(-1, .1, -.1, -1, 639.293, 236.5396)', opacity: 1}
];
var kfSAArmLeftRotate = [
  {transform: 'matrix(1, 0, 0, -1, 564.5186, 236.5396)'},
  {transform: 'matrix(1, .2, .2, -1, 563.5186, 238.5396)'}
];
var kfSAArmRightRotate = [
  {transform: 'matrix(-1, .1, -.1, -1, 639.293, 236.5396)'},
  {transform: 'matrix(-1, .2, -.2, -1, 642.293, 236.5396)'}
];
var kfMotionPathBody = [
  {transform: 'scale(.01)', motionOffset: 0, motionRotation: '-30deg', opacity: 0, offset: 0},
  {transform: 'scale(.01)', motionOffset: 0, motionRotation: '-30deg', opacity: 1, offset: .01},
  {transform: 'scale(1)', motionOffset: '98%', motionRotation: '-10deg', offset: .6},
  {transform: 'scale(1)', motionOffset: '100%', motionRotation: '0deg', opacity: 1}
];
var kfMotionPathFoot = [
  {transform: 'scale(.01)', motionOffset: 0, opacity: 0, offset: 0},
  {transform: 'scale(.01)', motionOffset: 0, opacity: 1, offset: .01},
  {transform: 'scale(1)', motionOffset: '98%', offset: .6},
  {transform: 'scale(1)', motionOffset: '100%', opacity: 1}
];
var kfMotionPathHelmet = [
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 0, offset: 0},
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 1, offset: .01},
  {transform: 'scale(1) translate(0,0)', motionOffset: '98%', motionRotation: '-10deg', offset: .3},
  {transform: 'scale(1) translate(0,0)', motionOffset: '100%', motionRotation: '0deg', offset: .6},
  {transform: 'scale(1) translate(0,150px)', motionOffset: '100%', motionRotation: '0deg', opacity: 1}
];
var kfMotionPathBack = [
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 0, offset: 0},
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 1, offset: .01},
  {transform: 'scale(1) translate(0,0)', motionOffset: '98%', motionRotation: '-10deg', offset: .3},
  {transform: 'scale(1) translate(0,0)', motionOffset: '100%', motionRotation: '0deg', offset: .6},
  {transform: 'scale(1) translate(0,176px)', motionOffset: '100%', motionRotation: '0deg', offset: .9},
  {transform: 'scale(1) translate(0, 174.151px)', motionOffset: '100%', motionRotation: '0deg', opacity: 1}
];
var kfMotionPathChest = [
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 0, offset: 0},
  {transform: 'scale(.01) translate(0,0)', motionOffset: 0, motionRotation: '-30deg', opacity: 1, offset: .01},
  {transform: 'scale(1) translate(0,0)', motionOffset: '98%', motionRotation: '-10deg', offset: .3},
  {transform: 'scale(1) translate(0,0)', motionOffset: '100%', motionRotation: '0deg', offset: .6},
  {transform: 'scale(1) translate(0,186px)', motionOffset: '100%', motionRotation: '0deg', offset: .8},
  {transform: 'scale(1) translate(0, 176.469px)',motionOffset: '100%', motionRotation: '0deg', opacity: 1}
];
var kfFireTopFlash = [
  {transform: 'scale(0)', opacity: 0},
  {transform: 'scale(1)', opacity: 1, offset: .05},
  {transform: 'scale(.9)', opacity: .7}
];
var kfFireBtmFlash = [
  {transform: 'scale(0, 0)', opacity: 0},
  {transform: 'scale(1, 0)', opacity: 1, offset: 0.05},
  {transform: 'scale(1, 2)', opacity: 0.5},
  {transform: 'scale(1, 1)', opacity: 1, offset: .5},
  {transform: 'scale(1, 6)', opacity: 1}
];
var kfCanvasUp = [
  {transform: 'translate(0, 0)'},
  {transform: 'translate(0, 600px)'}
];
var kfCanvasDown = [
  {transform: 'translate(0, 600px)'},
  {transform: 'translate(0, 0)'}
];
var kfVictimnUp = [
  {transform: 'translate(0, 0)'},
  {transform: 'translate(0, -5px)'},
  {transform: 'translate(0, 0)'},
  {transform: 'translate(0, 5px)'},
  {transform: 'translate(0, 0)', offset: .3},
  {transform: 'translate(0, -900px)'}
];
var kfVictimnDown = [
  {transform: 'translate(0, -900px)'},
  {transform: 'translate(0, 0)'}
];
var kfAnimationCSSTada = [
  {transform: 'translate(-50%, -50%) scale3d(1,1,1)'},
  {transform: 'translate(-50%, -50%) scale3d(.95,.95,.95) rotate3d(0,0,1,-2deg)', offset: .1},
  {transform: 'translate(-50%, -50%) scale3d(.95,.95,.95) rotate3d(0,0,1,-2deg)', offset: .2},
  {transform: 'translate(-50%, -50%) scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)', offset: .5},
  {transform: 'translate(-50%, -50%) scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)', offset: .6},
  {transform: 'translate(-50%, -50%) scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)', offset: .7},
  {transform: 'translate(-50%, -50%) scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)', offset: .8},
  {transform: 'translate(-50%, -50%) scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)', offset: .9},
  {transform: 'translate(-50%, -50%) scale3d(1,1,1)', offset: 1}
];
var kySeanBodyFly = [
	{transform: 'matrix(1, 0, 0, 1, 0, 0)'},
	{transform: 'matrix(1, 0, 0, 1, 2000, 0)'}
]
var kfNoticeTooLate = [
	{transform: 'matrix(1, 0, 0, 1, -100, 0)', opacity: 0},
	{transform: 'matrix(1, 0, 0, 1, 0, 0)', opacity: 1, offset: .1},
	{transform: 'matrix(1, 0, 0, 1, 0, 0)', opacity: 1, offset: .9},
	{transform: 'matrix(1, 0, 0, 1, 100, 0)', opacity: 0}
]


// Timing Function
var tBase = {
  duration: 1000,
  iterations: 1,
  direction: 'alternate',
  delay: 100,
  fill: 'forwards',
  easing: 'linear'
};

// Objects
var objHTML = document.querySelector('html');
var objBody = document.querySelector('body');
var objCanvas = document.querySelector('cg0-canvas');
var objControl = document.querySelector('cg0-control');
var objControlCaption = document.querySelector('cg0-control h3');
var objContent = document.querySelector('cg0-content');
var objStart = document.querySelector('cg0-click-start');
var objReplayUp = document.querySelector('cg0-click-playagain');
var objReplayDown = document.querySelector('cg0-click-tryagain');
var objClosingCredits = document.querySelector('cg0-closing-credits');
var objClosingCreditsTitle = document.querySelector('cg0-closing-credits h4');
var objGhost = document.querySelector('cg0-ghost');

var objBackground = document.querySelector('[id^=bg]');
var objStage = document.querySelector('[id^=cg-WAAPI-]');
var objCloudGroup = document.querySelector('[id^=cloud-group]');
var objVictim = document.querySelector('#victim');
var objSean = document.querySelector('#bird-sean');
var objSeanBody = document.querySelector('[id^=bird-sean-body]');
var objSeanShadow = document.querySelector('[id^=p-shadow]');
var objSeanHairN = document.querySelector('[id^=p-hair-n]');
var objSeanEyeCool = document.querySelector('[id^=p-eye-cool]');
var objBalloon = document.querySelector('[id^=balloon-group]');
var objWindPath2 = document.querySelector('#wind-path-2');
var objWindPath1 = document.querySelector('#wind-path-1');
var objBalloonRed = document.querySelector('#balloon-r_2_');
var objBalloonYellow = document.querySelector('#balloon-y_2_');
var objBalloonOrange = document.querySelector('#balloon-o_2_');
var objBilly = document.querySelector('#crocodile-billy');
var objBillyHead = document.querySelector('[id^=head-normal_2]');
var objBillyHeadR = document.querySelector('[id^=head-raise_2]');
var objJamesHead = document.querySelector('[id^=head-normal_1]');

var objWaterFront = document.querySelector('[id^=water-bg-front]');
var objWaterBack = document.querySelector('[id^=water-bg-back]');

var objSeanHandUpLeft = document.querySelector('[id^=bird-sean-body] [id^=p-hand-up-left]');
var objSeanHandUpRight = document.querySelector('[id^=bird-sean-body] [id^=p-hand-up-right]');
var objSeanHandDownLeft = document.querySelector('[id^=bird-sean-body] [id^=p-hand-down-left]');
var objSeanHandDownRight = document.querySelector('[id^=bird-sean-body] [id^=p-hand-down-right]');
var objSeanBackground = document.querySelector('[id^=sean-bg-over]');
var objSeanYellNo = document.querySelector('[id^=sean-yell-no]');
var objSeanYellHelp = document.querySelector('[id^=sean-yell-help]');
var objNoticeTooLate = document.querySelector('[id^=notice-too-late]');

var objSeanArmourArmLeft = document.querySelector('[id^=sa-arm-left]');
var objSeanArmourArmRight = document.querySelector('[id^=sa-arm-right]');
var objSeanArmourFootLeft = document.querySelector('[id^=sa-foot-left]');
var objSeanArmourFootRight = document.querySelector('[id^=sa-foot-right]');
var objSeanArmourBody = document.querySelector('[id^=sa-body]');
var objSeanArmourPant = document.querySelector('[id^=sa-pant]');
var objSeanArmourHelmet = document.querySelector('[id^=sa-helmet]');
var objSeanArmourChest = document.querySelector('[id^=sa-chest]');
var objSeanArmourBack = document.querySelector('[id^=sa-back]');
var objSeanNoseOver = document.querySelector('[id^=sa-p-nose-n-over]');
var objGroupWAAPI = document.querySelector('[id^=stage-group-waapi]');
var objGroupCloud = document.querySelector('[id^=stage-group-cloud]');
var objSeanBodyFly = document.querySelector('[id^=side-bird-sean-body]');

// Slice the object array
var objBubblesAll = document.querySelectorAll('[id^="water-bubbles"] circle');
objBubblesAll = Array.prototype.slice.call(objBubblesAll);

var objSplashAfterAll = document.querySelectorAll('[id="splash-after"] circle');
objSplashAfterAll = Array.prototype.slice.call(objSplashAfterAll);

var objSplashBeforeAll = document.querySelectorAll('[id="splash-before"] circle');
objSplashBeforeAll = Array.prototype.slice.call(objSplashBeforeAll);

var objJamesEyeLids = document.querySelectorAll('#crocodile-james [id^="hn-eyelid-"]');
objJamesEyeLids = Array.prototype.slice.call(objJamesEyeLids);

var objSeanFeetDown = document.querySelectorAll('[id^=bird-sean-body] [id^="p-foot-down-"]');
objSeanFeetDown = Array.prototype.slice.call(objSeanFeetDown);

var objSeanFeetOut = document.querySelectorAll('[id^=bird-sean-body] [id^="p-foot-out-"]');
objSeanFeetOut = Array.prototype.slice.call(objSeanFeetOut);

var objSeanFeetIn = document.querySelectorAll('[id^=bird-sean-body] [id^="p-foot-in-"]');
objSeanFeetIn = Array.prototype.slice.call(objSeanFeetIn);

var objBillyFeetOne = document.querySelectorAll('[id^=crocodile-billy] [id^="foot-1"]');
objBillyFeetOne = Array.prototype.slice.call(objBillyFeetOne);

var objBillyFeetTwo = document.querySelectorAll('[id^=crocodile-billy] [id^="foot-2"]');
objBillyFeetTwo = Array.prototype.slice.call(objBillyFeetTwo);

var objSeanFireTop = document.querySelectorAll('[id^=fire-] [id$=top]');
objSeanFireTop = Array.prototype.slice.call(objSeanFireTop);

var objSeanFireBtm = document.querySelectorAll('[id^=fire-] [id$=btm]');
objSeanFireBtm = Array.prototype.slice.call(objSeanFireBtm);



// Animations
var aniControl = objControl.animate(kfHide, tBase);
var aniNoticeTooLate = objNoticeTooLate.animate(kfNoticeTooLate, tBase);

var timeSeanDrop = 2500;
    tBase.duration = timeSeanDrop;
var aniSean = objSean.animate(kfSeanDrop, tBase);

    tBase.duration = (timeSeanDrop * 0.25);
var aniBillyUp = objBilly.animate(kfBillyUp, tBase);

    tBase.duration = (timeSeanDrop * 0.125);
var aniSeanEaten = objSean.animate(kfSeanEaten, tBase);
var aniBillyDown = objBilly.animate(kfBillyDown, tBase);

    tBase.duration = (timeSeanDrop * 0.1);
    tBase.delay = (timeSeanDrop * 0.15);
var aniBillyHeadRaise = objBillyHead.animate(kfBillyHeadRaise, tBase);

    tBase.duration = (timeSeanDrop * 0.8);
var aniSeanBackMiddle = objSean.animate(kfSeanBackMiddle, tBase);
    tBase.delay = 100;
    tBase.duration = 2000;
var aniSeanSoulUp = objSean.animate(kfSeanSoulUp, tBase);
var aniSeanSoulDown = objSean.animate(kfSeanSoulDown, tBase);
    tBase.duration = 1500;
var aniSeanYellNo = objSeanYellNo.animate(kfSeanYellNo, tBase);
var aniSeanYellHelp = objSeanYellHelp.animate(kfSeanYellNo, tBase);

    tBase.delay = 1000;
    tBase.duration = 2000;
var aniJamesHeadRaise = objJamesHead.animate(kfJamesHeadRaise, tBase);

    tBase.delay = 100;
    tBase.duration = 1000;
var aniBillyOut = objBilly.animate(kfBillyOut, tBase);

    tBase.duration = 1500;
var aniBalloonRed = objBalloonRed.animate(kfBalloonUp, tBase);
    tBase.delay = 200;
var aniBalloonYellow = objBalloonYellow.animate(kfBalloonUp, tBase);
    tBase.delay = 250;
var aniBalloonOrange = objBalloonOrange.animate(kfBalloonUp, tBase);

    tBase.delay = 100;
var timeSAChest =  2000;    
    tBase.duration = timeSAChest;
var aniSAChest = objSeanArmourChest.animate(kfMotionPathChest, tBase);
var aniSABack = objSeanArmourBack.animate(kfMotionPathBack, tBase);
    tBase.delay = 800;
    tBase.duration = 2000;
var aniSABody = objSeanArmourBody.animate(kfMotionPathBody, tBase);
    tBase.delay = 1200;
var aniSAPant = objSeanArmourPant.animate(kfMotionPathBody, tBase);
    tBase.delay = 1800;
var aniSAFootLeftEn = objSeanArmourFootLeft.animate(kfMotionPathFoot, tBase);
var aniSAFootRightEn = objSeanArmourFootRight.animate(kfMotionPathFoot, tBase);
    tBase.delay = 2400;
    tBase.duration = 1500;
var aniSAArmLeftEn = objSeanArmourArmLeft.animate(kfSAArmLeftEn, tBase);
var aniSAArmRightEn = objSeanArmourArmRight.animate(kfSAArmRightEn, tBase);
    tBase.delay = 500;
    tBase.duration = 500;
var aniSAArmLeftRotate = objSeanArmourArmLeft.animate(kfSAArmLeftRotate, tBase);
var aniSAArmRightRotate = objSeanArmourArmRight.animate(kfSAArmRightRotate, tBase);
    tBase.delay = 3200;
    tBase.duration = 2500;
var aniSAHelmet = objSeanArmourHelmet.animate(kfMotionPathHelmet, tBase);
    tBase.delay = 2000;
    tBase.duration = 4000;
var aniGroupWAAPIUp = objGroupWAAPI.animate(kfCanvasUp, tBase);
var aniGroupCloudUp = objGroupCloud.animate(kfCanvasUp, tBase);
var aniBackgroundUp = objBackground.animate(kfCanvasUp, tBase);
    tBase.duration = 5000;
var aniVictimUp = objVictim.animate(kfVictimnUp, tBase);
    tBase.delay = 300;
    tBase.duration = 1000;
var aniCanvasShaking = objCanvas.animate(kfAnimationCSSTada, tBase);
    tBase.delay = 1000;
    tBase.duration = 1000;
var aniSeanBodyFly = objSeanBodyFly.animate(kySeanBodyFly, tBase);


// Infinity loop below
    tBase.delay = 100;
    tBase.duration = 3000;
    tBase.iterations = 1;
    tBase.iterations = Infinity;
var aniSeanHairN = objSeanHairN.animate(kfSeanHairN, tBase);
var aniSeanBodyShake = objSeanBody.animate(kfSeanBodyShake, tBase);
    tBase.delay = 100;
    tBase.duration = 60000;
    tBase.iterations = Infinity;
    tBase.direction = 'normal';   
var aniWaterFlowFront = objWaterFront.animate(kfWaterFlow, tBase);
    tBase.duration = 240000;
var aniWaterFlowBack = objWaterBack.animate(kfWaterFlow, tBase);
    tBase.duration = 2000;
    tBase.delay = 100;
var aniWindPath2 = objWindPath2.animate(kfWindPath2, tBase);
    tBase.delay = 500;
var aniWindPath1 = objWindPath1.animate(kfWindPath1, tBase);


objBubblesAll.forEach(function(el, i, ra) {
    tBase.delay = i * 1000;
    tBase.duration = 2500;
  el.animate(kfBubblesUp, tBase);  
});

// Array animations
var aniAllBalloon = [
  aniBalloonRed,
  aniBalloonYellow,
  aniBalloonOrange
];
var aniAllSeanArmour = [
  aniSAChest,
  aniSABack,
  aniSABody,
  aniSAPant,
  aniSAArmLeftEn,
  aniSAArmRightEn,
  aniSAFootLeftEn,
  aniSAFootRightEn,
  aniSAHelmet
];

// Pause them first
aniBalloonRed.pause();
aniBalloonYellow.pause();
aniBalloonOrange.pause();
aniSean.pause();
aniSeanEaten.pause();
aniBillyUp.pause();
aniBillyDown.pause();
aniBillyOut.pause();
aniBillyHeadRaise.pause();
aniJamesHeadRaise.pause();
aniSeanBackMiddle.pause();
aniSeanSoulUp.pause();
aniSeanSoulDown.pause();
aniSeanYellNo.pause();
aniSeanYellHelp.pause();
aniNoticeTooLate.pause();

aniWindPath2.pause();
aniWindPath1.pause();

aniSABody.pause();
aniSAPant.pause();
aniSAArmLeftEn.pause();
aniSAArmRightEn.pause();
aniSAArmLeftRotate.pause();
aniSAArmRightRotate.pause();
aniSAFootLeftEn.pause();
aniSAFootRightEn.pause();
aniSAChest.pause();
aniSABack.pause();
aniSAHelmet.pause();

aniGroupWAAPIUp.pause();
aniGroupCloudUp.pause();
aniBackgroundUp.pause();
aniVictimUp.pause();
aniCanvasShaking.pause();
aniControl.pause();
aniSeanBodyFly.pause();


//FUNCTIONS
var seanDown = true;
var seanRearchBtm = false;
var seanRearchTop = false;
var seanReadyTop = false;
var seanBodyShaking = false;
var seanLive = false;
var controlRestart = false;
var btnClickCount = 0;
var movingForwards;

function fnTimeLine() {
  requestAnimationFrame(fnTimeLine);
  var cTSean = aniSean.currentTime;
  var cTSAChest = aniSAChest.currentTime;
  var cTSeanBackMiddle = aniSeanBackMiddle.currentTime;
  var cTVictimUp = aniVictimUp.currentTime;  
  var cTSeanBodyShake = aniSeanBodyShake.currentTime;
  if (cTSeanBodyShake > (timeSeanDrop * 0.89) && !seanBodyShaking) {
    seanBodyShaking = true;
  }  
  if (seanDown && cTSean > (timeSeanDrop * 0.72) && !seanRearchBtm) {     
    fnBillyUp();
    seanRearchBtm = true;
  }
  if (cTSAChest > (timeSAChest * 0.8) && !seanReadyTop) {
    tBase.delay = 100;
    tBase.duration = 100;
    tBase.iterations = 1;
    objSeanNoseOver.animate(kfShow, tBase);
    seanReadyTop = true;      
  }
  if (cTSean < (timeSeanDrop * 0.7)  && !seanLive && objSean.classList.contains('died')) {
    //console.info(cTSeanBackMiddle);
    objSean.classList.remove('invisible');
    objCanvas.classList.add('ready-to-tryagain');
    objControlCaption.textContent = 'Try Again?';
    tBase.delay = 100;
    tBase.duration = 1500;
    tBase.iterations = 1;
    objSean.animate(kfShow, tBase);
    seanLive = true;      
  }
  if (cTVictimUp < 3500 && aniVictimUp.playbackRate < 0 && !controlRestart) {
		console.info('aniVictimUp.currentTime < 2s');
		// objCanvas.classList.add('click-to-start');
		if (btnClickCount >= 3) {
			objControlCaption.innerHTML = 'Illustrated and animated with love and passion <br/> <a href=\"https://www.linkedin.com/in/chunguo/\">Drop me a line</a>';  
		} else {
			objControlCaption.textContent = 'Let\'s roll again';        
		}
		controlRestart = true;
  }
}

fnTimeLine();

function fnBillyUp() {
  if (aniSean.currentTime != 0) {
    objBillyFeetOne.forEach(function(el, i, ra) {
      tBase.iterations = 1;
      tBase.delay = 100;
      tBase.duration = 3000;
      el.animate(kfBillySwimLeft, tBase);     
    });
    
    objBillyFeetTwo.forEach(function(el, i, ra) {
      tBase.iterations = 1;
      tBase.delay = 100;
      tBase.duration = 3000;
      el.animate(kfBillySwimRight, tBase);      
    });
        
    aniBillyUp.play();
    aniBillyHeadRaise.play();
    
    objSplashBeforeAll.forEach(function(el, i, ra) {
        tBase.iterations = 1;
        tBase.delay = 850;
        tBase.direction = 'alternate';    
        tBase.duration = 650;
      var splashBeforeTo = {
        axisY: Math.random() * (i % 2 === 0 ? -80 : -60),
        timeTop: (i % 2 === 0) ? 0.5 : 0.7    
      }
      var kfSplashAll = el.animate([
        {transform: 'translate(0,0)', opacity: 0 },
        {opacity: 1, offset: .1 },
        {transform: 'translate(0,'+splashBeforeTo.axisY+'px)', opacity: 1, offset: splashBeforeTo.timeTop },
        {opacity: 1, offset: .9 },
        {transform: 'translate(0,0)', opacity: 0 }
      ], tBase);      
    });
  }
}

function fnAllSeanArmour() {  
  if (aniAllSeanArmour && aniAllSeanArmour.length) {
    var action = (movingForwards === 1) ? 'play' : 'reverse';
    aniAllSeanArmour.forEach(function(player, i, ra) {
      player.effect.timing.playbackRate = movingForwards;
      player[action]();      
    });
  }
}

function fnPlayOrReverse(e) {
  var action = (e.playState === 'paused') ? 'play' : 'reverse';
  e[action]();
}

function fnRevertAll(e) {
  e.currentTime = 0;
  e.pause();
  e.playbackRate = 1;
}

//CONTROLS
objStart.addEventListener('click', function(e) {
  btnClickCount++;
  if (aniSean.playState === 'paused') {
    if (objCanvas.classList.contains('opening-scene')) {
      objCanvas.classList.remove('opening-scene');
    }
    objCanvas.classList.remove('click-to-start');
		seanDown = true;
		aniAllBalloon.forEach(function(player, i, ra) {
			player.playbackRate = 1;
			player.play();
		});
		tBase.delay = 0;
		tBase.duration = 100;
		tBase.iterations = 1;
		objSeanEyeCool.animate(kfHide, tBase);
					aniSeanYellHelp.play();
		fnRevertAll(aniBillyOut);
  } 
});

aniBalloonRed.onfinish = function() { 
  if (aniBalloonRed.currentTime != 0) {
    aniSean.play();
    aniSeanHairN.pause();
    aniSeanBodyShake.currentTime = 0; 
    aniSeanBodyShake.pause(); 
    objSeanHandUpRight.animate(kfShow, tBase);
    objSeanHandDownRight.animate(kfHide, tBase);
  }
}

objSean.addEventListener('mouseenter', function(e) {
  if (aniSean.playState == 'running' && !objSean.classList.contains('died') && !seanRearchBtm) {
    aniSean.playbackRate = -.3;
    //console.info('Victim Mouse Entered!');
    aniWindPath2.play();
    aniWindPath1.play();
    
    objSeanFeetIn.forEach(function(el, i, ra) {       
      el.animate(kfShow, tBase);      
    });   
    objSeanFeetDown.forEach(function(el, i, ra) {     
      el.animate(kfHide, tBase);      
    }); 
    
    objSeanHandUpRight.animate(kfHide, tBase);
    objSeanHandUpLeft.animate(kfHide, tBase);
    objSeanHandDownRight.animate(kfShow, tBase);
    objSeanHandDownLeft.animate(kfShow, tBase);
    objSeanEyeCool.animate(kfShow, tBase);
    objSeanBackground.classList.add('visible');   
  } else if (aniSean.playState == 'running' && !objSean.classList.contains('died') && seanRearchBtm) {
      aniNoticeTooLate.play();
  }
});

objSean.addEventListener('mouseleave', function(e) {
  if (aniSean.playState == 'running' && !objSean.classList.contains('died') && !seanRearchBtm) {
    objSeanBackground.classList.remove('visible');    
    //seanDown = true;
    aniSean.playbackRate = 1;
    objSeanFeetIn.forEach(function(el, i, ra) {
        tBase.delay = 0;
        tBase.duration = 100;
      el.animate(kfHide, tBase);      
    });
    objSeanFeetDown.forEach(function(el, i, ra) {     
      el.animate(kfShow, tBase);      
    });
    objSeanHandUpRight.animate(kfShow, tBase);
    objSeanHandUpLeft.animate(kfShow, tBase);
    objSeanHandDownRight.animate(kfHide, tBase);
    objSeanHandDownLeft.animate(kfHide, tBase);
    objSeanEyeCool.animate(kfHide, tBase);
    aniWindPath2.cancel();
    aniWindPath1.cancel();
  }
});

aniSean.onfinish = function() {
  objSeanBackground.classList.remove('visible');  
  if (aniSean.currentTime === 0 && !objSean.classList.contains('died')) {
    //console.info('Victim back to top');
    aniAllSeanArmour.forEach(function(player, i, ra) {
      player.play();
    });
    aniWindPath2.cancel();
    aniWindPath1.cancel();
  } else if (aniSean.currentTime === 0 && objSean.classList.contains('died')) {
    //console.info('Victim back to top after died');
		objCanvas.classList.add('click-to-tryagain');
    fnRevertAll(aniSeanEaten);    
    aniBillyOut.play();
  } else {
    //console.info('Victim down to bottom');
    fnRevertAll(aniVictimUp);
  }
}

aniBillyUp.onfinish = function() {
  if (aniBillyUp.currentTime != 0) {
    aniCanvasShaking.play();
    aniSeanYellNo.play();
  }
}
aniCanvasShaking.onfinish = function() {
  aniBillyDown.play();  
  aniSeanEaten.play();
  aniBillyHeadRaise.reverse();
  
  objSplashAfterAll.forEach(function(el, i, ra) {
      tBase.delay = 300;
      tBase.duration = 600;
    var splashAfterTo = {
      axisY: Math.random() * (i % 2 === 0 ? -120 : -100),
      timeTop: (i % 2 === 0) ? 0.5 : 0.7    
    }
    var kfSplashAll = el.animate([
      {transform: 'translate(0,0)', opacity: 0 },
      {opacity: 1, offset: .1 },
      {transform: 'translate(0,'+splashAfterTo.axisY+'px)', opacity: 1, offset: splashAfterTo.timeTop },
      {opacity: 1, offset: .9 },
      {transform: 'translate(0,0)', opacity: 0 }
    ], tBase);      
  });
  
  objJamesEyeLids.forEach(function(el, i, ra) {
      tBase.duration = 100;
    el.animate(kfHide, tBase);      
  });
}

aniBillyDown.onfinish = function() {
  if (aniBillyDown.currentTime != 0) {
    aniJamesHeadRaise.play();
    //aniSeanBackMiddle.play();
    objSean.classList.add('died');
    objSean.classList.add('invisible');
    tBase.delay = 100;
    tBase.duration = 100;
    tBase.iterations = 1;
    objSean.animate(kfHide, tBase);
    objSeanHandUpRight.animate(kfHide, tBase);
    objSeanHandUpLeft.animate(kfHide, tBase);
    objSeanHandDownRight.animate(kfShow, tBase);
    objSeanHandDownLeft.animate(kfShow, tBase);
    //console.info(aniSean.playState);
    aniSeanEaten.reverse();
  }
}

aniSeanEaten.onfinish = function() {
  // aniSeanEaten.pause();
  if (aniSeanEaten.currentTime === 0) {   
    aniSean.reverse();
    
    objBalloon.classList.add('invisible');
    aniAllBalloon.forEach(function(player, i, ra) {
      player.reverse();
      player.playbackRate = -1;
    });
    
    objBilly.classList.add('invisible');
    aniBillyDown.reverse();
    aniBillyUp.reverse();
  }
}

aniSABody.onfinish = function() {
  objSeanFeetIn.forEach(function(el, i, ra) {
      tBase.delay = 0;
      tBase.duration = 100;
    el.animate(kfHide, tBase);      
  });
  objSeanFeetDown.forEach(function(el, i, ra) {     
    el.animate(kfShow, tBase);      
  });
}

aniSAArmRightEn.onfinish = function() {
  if (aniSAArmRightEn.currentTime != 0) {
      tBase.delay = 500;
    objSeanHandDownRight.animate(kfHide, tBase);
    objSeanHandDownLeft.animate(kfHide, tBase);
  } else {
    objSeanHandDownRight.animate(kfShow, tBase);
    objSeanHandDownLeft.animate(kfShow, tBase); 
  }
}

aniSAHelmet.onfinish = function() {
  if (aniSAHelmet.currentTime != 0) {
    fnPlayOrReverse(aniSAArmLeftRotate);
    fnPlayOrReverse(aniSAArmRightRotate);
    fnPlayOrReverse(aniVictimUp);
    fnPlayOrReverse(aniGroupWAAPIUp);
    fnPlayOrReverse(aniGroupCloudUp);
    fnPlayOrReverse(aniBackgroundUp);
    
    objSeanFireTop.forEach(function(el, i, ra) {
        tBase.delay = 1000;
        tBase.duration = 333;
        tBase.direction = 'alternate';
        tBase.iterations = Infinity;  
      el.animate(kfFireTopFlash, tBase);
    });
    objSeanFireBtm.forEach(function(el, i, ra) {
        tBase.delay = 1000;
        tBase.duration = 2000;
        tBase.direction = 'alternate';
        tBase.iterations = 1; 
      el.animate(kfFireBtmFlash, tBase);
    });
  }
}

objReplayUp.addEventListener('click', function(e) {
  fnPlayOrReverse(aniVictimUp);
  fnPlayOrReverse(aniGroupWAAPIUp);
  fnPlayOrReverse(aniGroupCloudUp);
  fnPlayOrReverse(aniBackgroundUp);
  
  aniSeanBodyShake.play();  
  fnRevertAll(aniSean);
  
  objCanvas.classList.remove('ready-to-playagain');
  objCanvas.classList.remove('click-to-playagain');
});

objReplayDown.addEventListener('click', function(e) {
  objCanvas.classList.remove('ready-to-tryagain');
  objCanvas.classList.remove('click-to-tryagain');
  
  tBase.delay = 100;
  tBase.duration = 600;
  objSean.animate(kfHide, tBase);
  
  aniVictimUp.playbackRate = 3;
  fnPlayOrReverse(aniVictimUp);

  aniJamesHeadRaise.reverse();
  
  objBilly.classList.remove('invisible');
  aniBillyOut.reverse();
  aniBillyOut.playbackRate = -.3;
  
  objBillyFeetOne.forEach(function(el, i, ra) {
    tBase.iterations = 1;
    tBase.delay = 100;
    tBase.duration = 4000;
    el.animate(kfBillySwimLeft, tBase);     
  });
  
  objBillyFeetTwo.forEach(function(el, i, ra) {
    tBase.iterations = 1;
    tBase.delay = 100;
    tBase.duration = 4000;
    el.animate(kfBillySwimRight, tBase);      
  });
  
});


    
aniVictimUp.onfinish = function() {
  if (aniVictimUp.currentTime !== 0 && objSean.classList.contains('died')) {
    objSean.classList.remove('died');
    objSean.classList.remove('invisible');
    fnPlayOrReverse(aniVictimUp);
    
    tBase.delay = 100;
    tBase.duration = 100;
    objSean.animate(kfShow, tBase);
    seanRearchBtm = false;
    controlRestart = false;
    
    aniSeanHairN.play();
    aniSeanBodyShake.play();  
    objSeanHandUpLeft.animate(kfShow, tBase);
    objSeanHandDownRight.animate(kfShow, tBase);
    objSeanHandDownLeft.animate(kfHide, tBase);
    objSeanEyeCool.animate(kfShow, tBase);
    
    objBalloon.classList.remove('invisible');
    
  } else if (aniVictimUp.currentTime !== 0 && !objSean.classList.contains('died')) {
    console.info('sean flyout with Armour');
    objCanvas.classList.add('ready-to-playagain');
    objControlCaption.textContent = 'Play Again?';
    
    aniSeanBodyFly.play();
    controlRestart = false;
    
    fnPlayOrReverse(aniSAArmLeftRotate);
    fnPlayOrReverse(aniSAArmRightRotate);
    
    aniAllBalloon.forEach(function(player, i, ra) {
      player.reverse();
    });
    
    aniAllSeanArmour.forEach(function(player, i, ra) {
      player.cancel();
    });
        
    objSeanFeetIn.forEach(function(el, i, ra) {
        tBase.delay = 0;
        tBase.duration = 100;
      el.animate(kfHide, tBase);      
    });
    objSeanFeetDown.forEach(function(el, i, ra) {     
      el.animate(kfShow, tBase);      
    });
    
    objSeanHandDownRight.animate(kfShow, tBase);
    objSeanHandUpLeft.animate(kfShow, tBase); 
    
    objSeanFireTop.forEach(function(el, i, ra) {
      el.animate(kfHide, tBase);
    });
    objSeanFireBtm.forEach(function(el, i, ra) {
      el.animate(kfHide, tBase);
    });
    objSeanNoseOver.animate(kfHide, tBase);
    seanReadyTop = false;
    
  } else if (aniVictimUp.currentTime == 0) {
		objCanvas.classList.add('click-to-start');
    fnRevertAll(aniVictimUp);
    fnRevertAll(aniSean);
    fnRevertAll(aniBillyUp);
    fnRevertAll(aniBillyDown);
    fnRevertAll(aniBillyHeadRaise);
    fnRevertAll(aniJamesHeadRaise);
    seanLive = false;
  }
}

aniSeanSoulUp.onfinish = function() {
  objSean.classList.remove('invisible');
  objSean.classList.remove('died');
  aniSeanSoulDown.play();
  objSeanHandUpLeft.animate(kfShow, tBase);
  objSeanHandDownLeft.animate(kfHide, tBase);
  aniSeanHairN.play();
  aniSeanBodyShake.play();
  objSeanEyeCool.animate(kfShow, tBase);
  aniAllBalloon.forEach(function(player, i, ra) {
    player.reverse();
    player.playbackRate = -1;
  });
  aniSeanSoulUp.pause();
}

aniSeanSoulDown.onfinish = function() {
  aniSeanSoulDown.pause();
  aniAllBalloon.forEach(function(player, i, ra) {
    player.pause();
    player.playbackRate = 1;
  });
  fnRevertAll(aniSean);
}

aniJamesHeadRaise.onfinish = function() {
  if (this.currentTime == 0) {
    objJamesEyeLids.forEach(function(el, i, ra) {
        tBase.duration = 100;
      el.animate(kfShow, tBase);      
    }); 
  }
}

aniSeanBodyFly.onfinish = function() {
	objCanvas.classList.add('click-to-playagain');
}

objClosingCreditsTitle.addEventListener('click', function(e) {
  objCanvas.classList.toggle('credit-showing');
  objClosingCredits.classList.toggle('credit-showing');
});