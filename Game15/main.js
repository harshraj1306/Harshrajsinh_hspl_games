const randnum = (min, max) => Math.round(Math.random() * (max - min) + min);

//===================================================== scene
var scene = new THREE.Scene();
var playerHeight = 1.25;

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.set( 0, playerHeight, - 2 );
camera.lookAt( scene.position );



renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true; // Shadow
    renderer.shadowMapType = THREE.PCFShadowMap; //Shadow
document.body.appendChild( renderer.domElement );


//===================================================== resize
window.addEventListener("resize", function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});



//===================================================== controls
/*var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.maxPolarAngle = Math.PI / 2.1;
*/


//========================================================== effects
var SCALE = 1;



var hTilt = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
hTilt.enabled = false;
hTilt.uniforms.h.value = 4 / (SCALE * window.innerHeight);

var renderPass = new THREE.RenderPass(scene, camera);
var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
effectCopy.renderToScreen = true;

var composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(hTilt);
composer.addPass(effectCopy);


var controls = new function() {
  this.hTilt = false;
  this.hTiltR = 0.5;
  this.onChange = function() {
    hTilt.enabled = controls.hTilt;
    hTilt.uniforms.r.value = controls.hTiltR;
  }
};

var gui = new dat.GUI();
gui.add(controls, 'hTilt').onChange(controls.onChange);
gui.add(controls, 'hTiltR', 0, 1).onChange(controls.onChange);


//activate tilt effect
document.querySelector('.dg .c input[type="checkbox"]').click();
dat.GUI.toggleHide();




//lights
var distance = 300;
var intensity = 1;



var spotLight2 = new THREE.SpotLight(new THREE.Color('white'), intensity, distance);
spotLight2.position.set(0, 10, 0);
spotLight2.castShadow = true;
scene.add(spotLight2);



//===================================================== model
var geometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
var material = new THREE.MeshNormalMaterial({transparent: true,opacity:0});
mesh = new THREE.Mesh( geometry, material );
mesh.position.y = 0;
scene.add( mesh );












var followCam = new THREE.Object3D();
followCam.position.copy(camera.position);
scene.add(followCam);
followCam.parent = mesh;
var pos = new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z);
function updateCamera(){
  if(followCam){
      camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3(pos)), 1);
      camera.lookAt(mesh.position.x, playerHeight ,mesh.position.z);
  }
}




//===================================================== Cannon
var sphereShape, sphereBody, world, physicsMaterial, walls=[], balls=[], ballMeshes=[], boxes=[], boxMeshes=[];

// Setup our world
world = new CANNON.World();
world.quatNormalizeSkip = 0;
world.quatNormalizeFast = false;

var solver = new CANNON.GSSolver();

world.defaultContactMaterial.contactEquationStiffness = 1e9;
world.defaultContactMaterial.contactEquationRelaxation = 4;

solver.iterations = 7;
solver.tolerance = 0.1;
var split = true;
if(split)
    world.solver = new CANNON.SplitSolver(solver);
else
    world.solver = solver;

world.gravity.set(0,-20,0);
world.broadphase = new CANNON.NaiveBroadphase();

// Create a slippery material (friction coefficient = 0.0)
physicsMaterial = new CANNON.Material("slipperyMaterial");
var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
                                                        physicsMaterial,
                                                        0.0, // friction coefficient
                                                        0.8  // restitution
                                                        );
// We must add the contact materials to the world
world.addContactMaterial(physicsContactMaterial);

// Create a sphere
var mass = 5, radius = 1.3;
sphereShape = new CANNON.Sphere(radius);
sphereBody = new CANNON.Body({ mass: mass });
sphereBody.addShape(sphereShape);
sphereBody.position.set(0,5,0);
sphereBody.linearDamping = 0.9;
world.add(sphereBody);

// Create a plane
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.Body({ mass: 0 });
groundBody.addShape(groundShape);
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
world.add(groundBody);


//===================================================== ground
  THREE.ImageUtils.crossOrigin = '';
  var floorMap = THREE.ImageUtils.loadTexture( " data:image/jpeg;base64,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" );
  floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
  floorMap.repeat.set( 25, 25 );


  var groundMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color('#111'), specular: new THREE.Color('black'), shininess: 0, bumpMap: floorMap } );
  var groundGeo = new THREE.PlaneGeometry( 50,50 );
  var ground = new THREE.Mesh( groundGeo, groundMaterial );


  ground.rotation.x = ( - Math.PI / 2 );
  ground.receiveShadow  = true;
  scene.add( ground );





 // Add boxes
var loader = new THREE.LegacyJSONLoader();
var halfExtents = new CANNON.Vec3(.15,.5,.15);
var boxShape = new CANNON.Box(halfExtents);
var boxGeometry = new THREE.BoxGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);



    loader.load('https://raw.githubusercontent.com/baronwatts/models/master/bowling-pin.js', function(geometry, materials) {


       var spacing = .75;
      var spread = spacing/2;
      [1,2,3,4].map( (d,i)=>{
        new Array(d).fill(null).map( (k,ind)=>{
          var z = (i * spacing) + 5;
          var x = (ind * spacing) - (i*spread);
          var y = 1;
          var boxBody = new CANNON.Body({ mass: 5 });
          boxBody.addShape(boxShape);
          var boxMesh = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( { color: new THREE.Color("hsl("+Math.floor(Math.random()*290)+",50%,50%)"), specular: new THREE.Color('black'), shininess: 0, wireframe: true, opacity:0, transparent:true } ) );
          world.add(boxBody);
          scene.add(boxMesh);
          boxBody.position.set(x,y,z);
          boxMesh.position.set(x,y,z);
          boxMesh.castShadow = true;
          boxMesh.receiveShadow = true;
          boxes.push(boxBody);
          boxMeshes.push(boxMesh);

          var model = new THREE.Mesh(geometry, materials);
          model.geometry.center();
          model.scale.set(1.6, 1.6, 1.6);
          model.castShadow = true;
          model.rotateY(Math.PI/2);
      /*    model.material.shading = THREE.SmoothShading;
          model.geometry.computeVertexNormals(true);*/
          boxMesh.add(model);
        });
      })



 

    });//end loader





var ballShape = new CANNON.Sphere(0.2);
var ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
var shootDirection = new THREE.Vector3();
var shootVelo = 50;
var projector = new THREE.Projector();

function getShootDir(targetVec){
  var vector = targetVec;
  targetVec.set(0,0,1);
  projector.unprojectVector(vector, camera);
  var ray = new THREE.Ray(sphereBody.position, vector.sub(sphereBody.position).normalize() );
  targetVec.copy(ray.direction);
}

function shoot(){
 var x = mesh.position.x;
  var y = mesh.position.y;
  var z = mesh.position.z;
  var ballBody = new CANNON.Body({ mass: 2.5 });
  ballBody.addShape(ballShape);
  var ballMesh = new THREE.Mesh( ballGeometry, new THREE.MeshPhongMaterial( { color: new THREE.Color('#111'), specular: new THREE.Color('black'), shininess: 0 } ) );
  world.add(ballBody);
  scene.add(ballMesh);
  ballMesh.castShadow = true;
  ballMesh.receiveShadow = true;
  balls.push(ballBody);
  ballMeshes.push(ballMesh);
  getShootDir(shootDirection);
  ballBody.velocity.set(  shootDirection.x * shootVelo,
                          shootDirection.y * shootVelo,
                          shootDirection.z * shootVelo);

  // Move the ball outside the player sphere
  x += shootDirection.x * (sphereShape.radius*1.02 + ballShape.radius);
  y += (shootDirection.y) * (sphereShape.radius*1.02 + ballShape.radius); //how high you want ball to go
  z += shootDirection.z * (sphereShape.radius*1.02 + ballShape.radius);
  ballBody.position.set(x,y+.25,z);
  ballMesh.position.set(x,y+.25,z);

  ballBody.addEventListener("collide",function(e){
    console.log("The sphere just collided with the ground!");
    console.log("Collided with body:",e.body);
    console.log("Contact between bodies:",e.contact);
    setTimeout(function(){ 
      world.remove(ballBody);
      scene.remove(ballMesh);
    }, 6000);
  });

}//end shoot

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
     shoot();
  }
}







//=========================================================================================== Gamepad API
//Modified from: https://gist.github.com/videlais/8110000
// Modified by Xander Luciano
class GamePad {
  constructor() {
    this.supported =
      (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
      !!navigator.webkitGamepads ||
      !!navigator.mozGamepads ||
      !!navigator.msGamepads ||
      !!navigator.gamepads ||
      (navigator.getGamepads && navigator.getGamepads());

    this.ticking = false;

    this.pan = new THREE.Vector3(0, 0, 0);
    this.roll = new THREE.Vector3(0, 0, 0);

    // Recommended deadzones for Xbox One controller
    this.RIGHT_AXIS_THRESHOLD = 7849 / 32767.0;
    this.LEFT_AXIS_THRESHOLD = 8689 / 32767.0;
    this.TRIGGER_AXIS_THRESHOLD = 30 / 32767.0;

    this.SPACEMOUSE_THRESHOLD = 5 / 32767.0;

    this.gamepads = [];
    this.prevRawGamepadTypes = [];
    this.prevTimestamps = [];

    this.init();
  }

  init() {
    if (this.supported) {
      // Older Firefox
      window.addEventListener(
        "MozGamepadConnected",
        e => this.onGamepadConnect(e),
        false
      );
      window.addEventListener(
        "MozGamepadDisconnected",
        e => this.onGamepadDisconnect(e),
        false
      );

      //W3C Specification
      window.addEventListener(
        "gamepadconnected",
        e => this.onGamepadConnect(e),
        false
      );
      window.addEventListener(
        "gamepaddisconnected",
        e => this.onGamepadDisconnect(e),
        false
      );

      // Chrome
      if (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) {
        this.startPolling();
      }

      //CocoonJS
      if (navigator.getGamepads && navigator.getGamepads()) {
        this.startPolling();
      }
    } else {
      console.log("Gamepad API not supported or not detected!");
    }
  }

  startPolling() {
    console.log("Gamepad Controller Connected!");
    if (!this.ticking) {
      this.ticking = true;
      this.update();
    }
  }

  stopPolling() {
    alert("Gamepad Controller Disconnected!");
    this.ticking = false;
  }

  // Called externally
  update() {
    this.pollStatus();
    if (this.ticking) {
      this.pollJoysticks();
      //requestAnimationFrame(() => this.tick());
    }
  }

  pollStatus() {
    this.pollGamepads();
    for (let i in this.gamepads) {
      let gamepad = this.gamepads[i];
      if (gamepad.timestamp && gamepad.timestamp === this.prevTimestamps[i]) {
        continue;
      }
      this.prevTimestamps[i] = gamepad.timestamp;
    }
  }

  pollGamepads() {
    let rawGamepads =
      (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
      navigator.webkitGamepads ||
      navigator.mozGamepads ||
      navigator.msGamepads ||
      navigator.gamepads ||
      (navigator.getGamepads && navigator.getGamepads());
    if (rawGamepads) {
      this.gamepads = [];
      for (let i = 0, max = rawGamepads.length; i < max; i++) {
        if (typeof rawGamepads[i] !== this.prevRawGamepadTypes[i]) {
          this.prevRawGamepadTypes[i] = typeof rawGamepads[i];
        }
        if (rawGamepads[i]) {
          this.gamepads.push(rawGamepads[i]);
        }
      }
    }
  }

  pollJoysticks() {
    let pad = 0;

    // Reset all input to 0
    this.pan = new THREE.Vector3(0, 0, 0);
    this.roll = new THREE.Vector3(0, 0, 0);
    this.btn = new THREE.Vector3(0, 0, 0); //button

    if (this.gamepads[pad]) {
      let panX = this.gamepads[pad].axes[0]; // Pan  X || Left X
      let panY = this.gamepads[pad].axes[1]; // Pan  Y || Left Y
      let panZ = this.gamepads[pad].axes[2]; // Pan  Z || Right X

      let rollX = this.gamepads[pad].axes[3]; // Roll X || Right Y
      let rollY = this.gamepads[pad].axes[4]; // Roll Y || Trigger Left
      let rollZ = this.gamepads[pad].axes[5]; // Roll Z || Trigger Right


      this.btn.y = this.gamepads[pad].buttons[0]; // A button
      this.btn.x = this.gamepads[pad].buttons[2]; // X button



      if (
        panX < -this.SPACEMOUSE_THRESHOLD ||
        panX > this.SPACEMOUSE_THRESHOLD
      ) {
        this.pan.x = panX;
      }

      if (
        panY < -this.SPACEMOUSE_THRESHOLD ||
        panY > this.SPACEMOUSE_THRESHOLD
      ) {
        this.pan.y = panY;
      }

      if (
        panZ < -this.SPACEMOUSE_THRESHOLD ||
        panZ > this.SPACEMOUSE_THRESHOLD
      ) {
        this.pan.z = panZ;
      }

      if (
        rollX < -this.SPACEMOUSE_THRESHOLD ||
        rollX > this.SPACEMOUSE_THRESHOLD
      ) {
        this.roll.x = rollX;
      }

      if (
        rollY < -this.SPACEMOUSE_THRESHOLD ||
        rollY > this.SPACEMOUSE_THRESHOLD
      ) {
        this.roll.y = rollY;
      }

      if (
        rollZ < -this.SPACEMOUSE_THRESHOLD ||
        rollZ > this.SPACEMOUSE_THRESHOLD
      ) {
        this.roll.z = rollZ;
      }
    }
  }

  onGamepadConnect(event) {
    console.log(event);
    let gamepad = event.gamepad;
    this.gamepads[event.gamepad.id] = gamepad;
    this.startPolling();
  }

  onGamepadDisconnect(event) {
    this.gamepads[event.gamepad.id] = null;
    if (this.gamepads.length === 0) {
      this.stopPolling();
    }
  }
}

// Create controller with Gamepad API
let controller = new GamePad();
console.log(controller);



//===================================================== Joystick
class JoyStick{
  constructor(options){
    const circle = document.createElement("div");
    circle.style.cssText = "position:absolute; bottom:35px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#444 solid medium; border-radius:50%; left:50%; transform:translateX(-50%);";
    const thumb = document.createElement("div");
    thumb.style.cssText = "position: absolute; left: 20px; top: 20px; width: 40px; height: 40px; border-radius: 50%; background: #fff;";
    circle.appendChild(thumb);
    document.body.appendChild(circle);
    this.domElement = thumb;
    this.maxRadius = options.maxRadius || 40;
    this.maxRadiusSquared = this.maxRadius * this.maxRadius;
    this.onMove = options.onMove;
    this.game = options.game;
    this.origin = { left:this.domElement.offsetLeft, top:this.domElement.offsetTop };
    this.rotationDamping = options.rotationDamping || 0.06;
    this.moveDamping = options.moveDamping || 0.01;
    if (this.domElement!=undefined){
      const joystick = this;
      if ('ontouchstart' in window){
        this.domElement.addEventListener('touchstart', function(evt){ joystick.tap(evt); });
      }else{
        this.domElement.addEventListener('mousedown', function(evt){ joystick.tap(evt); });
      }
    }
  }
  
  getMousePosition(evt){
    let clientX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.clientX;
    let clientY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.clientY;
    return { x:clientX, y:clientY };
  }
  
  tap(evt){
    evt = evt || window.event;
    // get the mouse cursor position at startup:
    this.offset = this.getMousePosition(evt);
    const joystick = this;
    if ('ontouchstart' in window){
      document.ontouchmove = function(evt){ joystick.move(evt); };
      document.ontouchend =  function(evt){ joystick.up(evt); };
    }else{
      document.onmousemove = function(evt){ joystick.move(evt); };
      document.onmouseup = function(evt){ joystick.up(evt); };
    }
  }
  
  move(evt){
    evt = evt || window.event;
    const mouse = this.getMousePosition(evt);
    // calculate the new cursor position:
    let left = mouse.x - this.offset.x;
    let top = mouse.y - this.offset.y;
    //this.offset = mouse;
    
    const sqMag = left*left + top*top;
    if (sqMag>this.maxRadiusSquared){
      //Only use sqrt if essential
      const magnitude = Math.sqrt(sqMag);
      left /= magnitude;
      top /= magnitude;
      left *= this.maxRadius;
      top *= this.maxRadius;
    }
    // set the element's new position:
    this.domElement.style.top = `${top + this.domElement.clientHeight/2}px`;
    this.domElement.style.left = `${left + this.domElement.clientWidth/2}px`;
    
    //@TODO use nipple,js
    const forward = -(top - this.origin.top + this.domElement.clientHeight/2)/this.maxRadius;
    const turn = (left - this.origin.left + this.domElement.clientWidth/2)/this.maxRadius;
    
    if (this.onMove!=undefined) this.onMove.call(this.game, forward, turn);
  }
  
  up(evt){
    if ('ontouchstart' in window){
      document.ontouchmove = null;
      document.touchend = null;
    }else{
      document.onmousemove = null;
      document.onmouseup = null;
    }
    this.domElement.style.top = `${this.origin.top}px`;
    this.domElement.style.left = `${this.origin.left}px`;
    
    this.onMove.call(this.game, 0, 0);
  }
}
    


var js = { forward:0, turn:0 };

var joystick = new JoyStick({
    game:this,
    onMove: joystickCallback
  });

function joystickCallback( forward, turn ){
    js.forward = forward;
    js.turn = -turn;
  }

//forward=-controller.pan.y, turn=-controller.pan.x
function updateDrive(forward=js.forward, turn=js.turn){ 
  const maxSteerVal = 0.05;
  const maxForce = .1;
  const brakeForce = 10;

  const force = maxForce * forward;
  const steer = maxSteerVal * turn;

  
  if (forward!=0){
    mesh.translateZ(force);//move cube @TODO multiply force with the delta time for different moile devices
    
  }else{
    
  }
    mesh.rotateY(steer);
}

    


var pointLight = new THREE.PointLight(new THREE.Color('white'), 7, .5);
scene.add(pointLight);


//===================================================== animate
var dt = 1/60;
var canShoot = 0;
var clock = new THREE.Clock();
/*function Gamepad(){
   //WTF!!!!!!
  if (Math.round(controller.pan.y)!=0){
    clip1.play();
    clip2.stop();
  }else{
    clip1.stop();
    clip2.play();
  }
   mesh.translateZ(controller.pan.y * -.05);//move cube
   mesh.rotateY(controller.pan.x * -.01);
    if(controller.btn.y.pressed && canShoot <= 0){
      canShoot = 10;
      shoot();
    }
    info.innerHTML = controller.pan.y;
}*/


//touch event
//shoot
document.body.addEventListener('dblclick', function (e) {
  if(canShoot <= 0){
      canShoot = 10;
      shoot();
    }
     


});






(function animate() {
    requestAnimationFrame( animate );
    updateCamera();
    updateDrive();
    renderer.render( scene, camera );
    //composer.render();


     world.step(dt);

    // Update ball positions
    for(var i=0; i<balls.length; i++){
        ballMeshes[i].position.copy(balls[i].position);
        ballMeshes[i].quaternion.copy(balls[i].quaternion);
    }

    // Update box positions
    for(var i=0; i<boxes.length; i++){
        boxMeshes[i].position.copy(boxes[i].position);
        boxMeshes[i].quaternion.copy(boxes[i].quaternion);
    }


    controller.update();
    //Gamepad();

    //reset back to 0 to limit the number of bullets to shoot
    if(canShoot > 0){
      canShoot -= 1;
    }



    //position light on the mesh
    pointLight.position.x = mesh.position.x;
    pointLight.position.y = 0;
    pointLight.position.z = mesh.position.z;

})();