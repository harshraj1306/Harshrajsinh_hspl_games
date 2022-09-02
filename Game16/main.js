var keyboard = {};
    var player = { height:75, speed:3, turnSpeed:Math.PI*0.02, canShoot:0 };

    //===================================================== canvas
    var canvas = document.getElementById("container");
    var renderer = new THREE.WebGLRenderer({ canvas:canvas, precision: "mediump", antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true; //Shadow
    renderer.shadowMapSoft = true; // Shadow
    renderer.shadowMapType = THREE.PCFShadowMap; //Shadow

    


    //===================================================== camera
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 200, -350);
    camera.lookAt(scene.position);
    



    //=========================================================================================== add VR
    renderer.setPixelRatio(window.devicePixelRatio); //VR
    var effect = new THREE.StereoEffect(renderer); //VR
    effect.setSize(window.innerWidth, window.innerHeight); //VR
    var VR = false;
    function toggleVR() {
      if (VR) {
        VR = false;
        camera.rotation.reorder( 'ZYX' );
        camera.lookAt(0,0,0);
      } else {
        VR = true;
        controls = new THREE.DeviceOrientationControls(camera);
        requestFullscreen(document.documentElement);
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
    }



    //===================================================== resize
    window.addEventListener("resize", function() {
      let width = window.innerWidth
      let height = window.innerHeight
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });



//=========================================================================================== light


 var light = new THREE.DirectionalLight(new THREE.Color('white'), 1);
 light.position.set(1, 1, 1).normalize();
 scene.add(light);
 var light = new THREE.DirectionalLight(new THREE.Color('white'), 1);
 light.position.set(-1, 0, -1).normalize();
 scene.add(light);


var wireframe = false;
var opacity = 0;
//===================================================== materials
var matSphere = new THREE.MeshPhongMaterial( {color: new THREE.Color('blue'), side: THREE.DoubleSide} );
var matBox = new THREE.MeshPhongMaterial( {color: new THREE.Color('#333'), side: THREE.DoubleSide, transparent: true, opacity: opacity, wireframe: wireframe} );
var matHit = new THREE.MeshPhongMaterial( {color: new THREE.Color('red'), side: THREE.DoubleSide, transparent: true, opacity: opacity, wireframe: wireframe} );




//===================================================== shapes
geoCylinder = new THREE.BufferGeometry();
geoCylinderColor = new THREE.BufferGeometry();
geoCylinder2 = new THREE.BufferGeometry();
geoSphere = new THREE.BufferGeometry();
geoSphere2 = new THREE.BufferGeometry();
geoBox = new THREE.BufferGeometry();

geoCylinder.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 16 ) );
geoCylinderColor.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 16 ) );
geoCylinder2.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 16 ) );
geoSphere.fromGeometry( new THREE.SphereGeometry( 1 , 20, 10 ) );
geoSphere2.fromGeometry(new THREE.SphereGeometry( 0.5 , 10, 6 ) );
geoBox.fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );

var sphere = new THREE.Mesh( geoSphere, matBox );
var cylinder =  new THREE.Mesh( geoCylinder, matBox );
var cylinder2 = new THREE.Mesh( geoCylinder2, matBox );
 geoCylinder2.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI / 2 ) );//rotate the cylinder for the arms






//===================================================== physics
world = new OIMO.World({info:true, worldscale:100});
meshs = [];
bodys = [];
joints = [];
spring = [2, 0.3];
collision = true;
//http://jsdo.it/cx20/rZL6
//https://3dwarehouse.sketchup.com/model/e6a81cb7-3549-48af-a2cd-decaa85f71f3/MSPhysics-Crash-Dummy-%D0%9A%D0%A3%D0%99
//http://lo-th.github.io/Oimo.js/index.html#kinematic3
//https://lo-th.github.io/Oimo.js/examples/test_terrain.html
//https://lo-th.github.io/Oimo.js/examples/test_walker.html
//http://lo-th.github.io/Oimo.js/docs.html#joint


//add ground
var ground = world.add({size:[100, 40, 1000], pos:[0,-10,-300]});
var cube = new THREE.Mesh( new THREE.BoxGeometry( 100, 1, 1000 ), new THREE.MeshPhongMaterial( {color: new THREE.Color('#111'), side: THREE.DoubleSide} ) );
cube.receiveShadow = true;
scene.add( cube );




const randnum = (min, max) => Math.round(Math.random() * (max - min) + min);
var py = randnum(150,250);//start how far from the ground



/*var ik_head = world.add({ size:[10,10,10], pos:[0,py+40,0], move:true,  name:'ik_head'});
var mesh = new THREE.Mesh( geoSphere, matBox );
mesh.scale.set(10,10,10);
meshs.push(mesh);
bodys.push(ik_head);
scene.add(mesh);
*/


var bod;
var rightleg;
var leftleg;
var leftarm;
var rightarm;

var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/body.js", function(geometry, materials) {
  bod = new THREE.Mesh(geometry, materials);
  bod.scale.set(2,2,2);
  bod.castShadow = true;
  bod.rotateY(Math.PI);
  bod.geometry.center();
  scene.add(bod);
});



var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/right-leg.js", function(geometry, materials) {
  rightleg = new THREE.Mesh(geometry, materials);
  rightleg.scale.set(4,1.5,4);
  rightleg.castShadow = true;
  rightleg.rotateY(Math.PI);
  rightleg.geometry.center();
  scene.add(rightleg);
});



var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/left-leg.js", function(geometry, materials) {
  leftleg = new THREE.Mesh(geometry, materials);
  leftleg.scale.set(4,1.5,4);
  leftleg.castShadow = true;
  leftleg.rotateY(Math.PI);
  leftleg.geometry.center();
  scene.add(leftleg);
});




var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/left-arm.js", function(geometry, materials) {
  leftarm = new THREE.Mesh(geometry, materials);
  leftarm.scale.set(4,1.5,4);
  leftarm.castShadow = true;
  leftarm.rotateY(Math.PI);

  leftarm.geometry.center();
  leftarm.position.z = -.65;
  leftarm.position.x = .35;
  leftarm.position.y = -.05;
  scene.add(leftarm);
});




var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/right-arm.js", function(geometry, materials) {
  rightarm = new THREE.Mesh(geometry, materials);
  rightarm.scale.set(4,1.5,4);
  rightarm.castShadow = true;
  rightarm.rotateY(Math.PI);
  
  rightarm.geometry.center();
  rightarm.position.z = -1.5;
  rightarm.position.x = -.25;
  rightarm.position.y = .1;
  scene.add(rightarm);
});


function createRagdoll(){


var head = world.add({ size:[18,15,18], pos:[0,py+30,0], move:true,  name:'head'});
var headmesh = new THREE.Mesh( geoBox, matHit );
headmesh.scale.set(18,15,18);
meshs.push(headmesh);
bodys.push(head);
scene.add(headmesh);

var chest = world.add({ size:[25,20,20], pos:[0,py+20,0], move:true,  name:'chest'});
var chestmesh = new THREE.Mesh( geoBox, matBox );
chestmesh.scale.set(25,20,20);
meshs.push(chestmesh);
bodys.push(chest);
scene.add(chestmesh);



var joint = world.add({type:"joint", body1:'ik_head', body2:'head', pos1:[0,-5,0], pos2:[0,7.5,0], min:2, max:20, collision:collision, spring:spring});
joints.push(joint);

var joint = world.add({type:"joint", body1:'head', body2:'chest', pos1:[0,-7.5,0], pos2:[0,10,0], min:2, max:20, collision:collision, spring:spring});
joints.push(joint);





 //legs
var l_leg = world.add({ size:[12,30,10], pos:[12.5,py,0],  rot:[0,0,0], move:true,  name:'L_leg'});
var l_legmesh = new THREE.Mesh( geoBox, matBox );
l_legmesh.scale.set(12,30,10);
meshs.push(l_legmesh);
bodys.push(l_leg);
scene.add(l_legmesh);




var r_leg = world.add({ size:[12,30,10], pos:[-12.5,py,0],  rot:[0,0,0], move:true,  name:'R_leg'});
var r_legmesh = new THREE.Mesh( geoBox, matBox );
r_legmesh.scale.set(12,30,10);
meshs.push(r_legmesh);
bodys.push(r_leg);
scene.add(r_legmesh);




var joint = world.add({type:"joint", body1:'L_leg', body2:'chest', pos1:[-6,15,0], pos2:[0,-10,0], min:-60, max:60,collision:false});
joints.push(joint);


var joint = world.add({type:"joint", body1:'R_leg', body2:'chest', pos1:[6,15,0], pos2:[0,-10,0], min:-60, max:60,collision:false});
joints.push(joint);






 //arms
var l_arm = world.add({ size:[12,20,10], pos:[-25,py+20,0],  rot:[0,0,0], move:true,  name:'L_arm'});
var l_armmesh = new THREE.Mesh( geoBox, matHit );
l_armmesh.scale.set(12,20,10);
meshs.push(l_armmesh);
bodys.push(l_arm);
scene.add(l_armmesh);


var r_arm = world.add({ size:[12,20,10], pos:[25,py+20,0],  rot:[0,0,0], move:true,  name:'R_arm'});
var r_armmesh = new THREE.Mesh( geoBox, matBox );
r_armmesh.scale.set(12,20,10);
meshs.push(r_armmesh);
bodys.push(r_arm);
scene.add(r_armmesh);






var joint = world.add({type:"joint", body1:'R_arm', body2:'chest', pos1:[-6,0,0], pos2:[12.5,0,0], min:-60, max:60,collision:false});
joints.push(joint);


var joint = world.add({type:"joint", body1:'L_arm', body2:'chest', pos1:[6,0,0], pos2:[-12.5,0,0], min:-60, max:60,collision:false});
joints.push(joint);



//add 3d models inside the shapes
if(bod) chestmesh.add(bod.clone());
if(rightleg) r_legmesh.add(rightleg.clone());
if(leftleg) l_legmesh.add(leftleg.clone());
if(leftarm) l_armmesh.add(leftarm.clone());
if(rightarm) r_armmesh.add(rightarm.clone());





}//end ragdoll



setTimeout(function(){
  createRagdoll();
},3000);


document.body.addEventListener('dblclick', function(){
  createRagdoll();
});



/*var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/lego.js", function(geometry, materials) {
  var obj = new THREE.Mesh(geometry, materials);
  obj.scale.set(5,5,5);
  obj.castShadow = true;
  obj.position.set(0, 0, 0);
  obj.geometry.center();
  obj.rotateY(Math.PI/2);
  scene.add(obj);
});
*/















var bball =new THREE.Group();
bball.position.z = -5;
//scene.add(bball);

var loader = new THREE.LegacyJSONLoader();
loader.load("https://raw.githubusercontent.com/baronwatts/models/master/bowling-ball.js", function(geometry, materials) {
  var obj = new THREE.Mesh(geometry, materials);
  obj.scale.set(5,5,5);
  obj.castShadow = true;
  obj.position.set(0, 0, 0);
  obj.geometry.center();
  obj.rotateY(Math.PI/2);
  bball.add(obj);
});






    //===================================================== update physics
    var phase = 0;
    function updateOimoPhysics() {
        if(world == null) return;
        world.step();

        var i = bodys.length;
        var x = -150;
        var z = -100 + Math.random()*200;
        var y = 0;

        //console.log(k);



  
        while (i--){
            var body = bodys[i];
            var mesh = meshs[i];


            //links three.js meshes with oimi shapes
            mesh.position.copy(body.getPosition());
            mesh.quaternion.copy(body.getQuaternion());


            /*if( bodys[0]){
               phase += 0.001;
              bodys[0].resetPosition(0, 200, 0 );//https://github.com/lo-th/Oimo.js/issues/10
              bodys[0].resetRotation(Math.cos(phase) * 150, 150, 0 );//https://github.com/lo-th/Oimo.js/issues/10
              //body.setPosition({x: pos.x, y: pos.y, z: -50});
              
            }*/


         /*   if( body.position < - 1){
               world.removeRigidBody(body);
              scene.remove(mesh);
              
            }*/


         

            // reset oimi shapes position.
            if(mesh.position.y<-100){
                //body.name == "box" ? body.resetPosition(x,y,z) : body.resetPosition(camera.position.x + 25, camera.position.y+5, camera.position.z);
                /*if( body.name == "box"){
                   //body.resetPosition(x,y,z) 
               }else{
                    world.removeRigidBody(body);
                    scene.remove(mesh);
               }*/
                world.removeRigidBody(body);
                scene.remove(mesh);
                
            }
            
        }

        // contact test
       /* if(world.checkContact('box', 'sphere')) meshs[bodys.length-1].material = matHit;
        else meshs[bodys.length-1].material = matBox;*/
       /* if(world.checkContact('L_leg', 'sphere')) {
          world.removeRigidBody(bodys[5]);
          scene.remove(meshs[5]);
        }*/
    }




    //===================================================== shoot
    var shootDirection = new THREE.Vector3();
    var projector = new THREE.Projector();
    var shootVelo = 20;
    function getShootDir(targetVec){
        var vector = targetVec;
        targetVec.set(0,0,1);
        vector.unproject(camera);
        var ray = new THREE.Ray(mesh.position, vector.sub(mesh.position).normalize() );
        targetVec.copy(ray.direction);
    }
    function shoot(){
        //create sphere
        var body = world.add({type:'sphere', size:[10], pos:[camera.position.x, 1, camera.position.z], move:true, name:'sphere'});
        var mesh = bball.clone();
        mesh.scale.set( 10, 10, 10 );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
            
            
        bodys.push(body);
        meshs.push(mesh);
        scene.add( mesh );

        var x = mesh.position.x;
        var y = mesh.position.y;
        var z = mesh.position.z;

        getShootDir(shootDirection);
        body.linearVelocity.x  = shootDirection.x * shootVelo;
        body.linearVelocity.y  = shootDirection.y * shootVelo + 2.5;
        body.linearVelocity.z  = shootDirection.z * shootVelo;
        body.angularVelocity.x = -Math.PI*2;

        x += shootDirection.x;
        y += shootDirection.y;
        z += shootDirection.z;
        mesh.position.set(x,y,z);
    }



    //=========================================================================================== full screen
var requestFullscreen = function(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
}
var exitFullscreen = function(ele) {
  if (ele.exitFullscreen) {
    ele.exitFullscreen();
  } else if (ele.webkitExitFullscreen) {
    ele.webkitExitFullscreen();
  } else if (ele.mozCancelFullScreen) {
    ele.mozCancelFullScreen();
  } else if (ele.msExitFullscreen) {
    ele.msExitFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
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



//=========================================================================================== gamepad controls
function Gamepad() {
  camera.rotation.y += 0.075 * controller.pan.x;//left/right 
  camera.position.x += (Math.sin(camera.rotation.y) * player.speed) * controller.pan.y;
  camera.position.z += (-Math.cos(camera.rotation.y) * player.speed) * controller.pan.y;
}

function VRGamepad() {
  camera.position.x -= (-Math.sin(camera.rotation.y) * player.speed) * controller.pan.y;
  camera.position.z -= (-Math.cos(camera.rotation.y) * player.speed) * controller.pan.y;
}


//=========================================================================================== keyboard controls
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);


function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

function keypadControls() {
  if (keyboard[37]) { // left arrow key
    camera.rotation.y -= player.turnSpeed;
  }
  if (keyboard[39]) { // right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  if (keyboard[38]) { // up arrow key
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyboard[40]) { // down arrow key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyboard[32] && player.canShoot <= 0  || controller.btn.y.pressed && player.canShoot <= 0 ) { // spacebar
    player.canShoot = 10;
    shoot();

  }
}






(function loop() {
    updateOimoPhysics();
    renderer.render( scene, camera );
    requestAnimationFrame( loop );
    keypadControls();

    controller.update();
    

     //reset back to 0 to limit the number of bullets to shoot
    if(player.canShoot > 0) player.canShoot -= 1;

    //VR Mode
    if(VR){
         effect.render(scene, camera);
         VRGamepad();
         controls.update();
         
    }else{
        renderer.render(scene, camera);
        Gamepad();
    }
})()