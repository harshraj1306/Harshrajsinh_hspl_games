Object.defineProperties(THREE.Object3D.prototype, {
    x: {
      get: function() {
        return this.position.x;
      },
      set: function(v) {
        this.position.x = v;
      }
    },
    y: {
      get: function() {
        return this.position.y;
      },
      set: function(v) {
        this.position.y = v;
      }
    },
    z: {
      get: function() {
        return this.position.z;
      },
      set: function(v) {
        this.position.z = v;
      }
    },
    rotationZ: {
      get: function() {
        return this.rotation.x;
      },
      set: function(v) {
        this.rotation.x = v;
      }
    },
    rotationY: {
      get: function() {
        return this.rotation.y;
      },
      set: function(v) {
        this.rotation.y = v;
      }
    },
    rotationX: {
      get: function() {
        return this.rotation.z;
      },
      set: function(v) {
        this.rotation.z = v;
      }
    }
  });
  
  
  //===================================================== scene
  var scene = new THREE.Scene();
  
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 100000 );
  camera.position.set( -5, 0, 0 );
  camera.lookAt( scene.position );
  
  
  renderer = new THREE.WebGLRenderer( { antialias: true, powerPreference: "high-performance" } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true; //Shadow
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
  
  
  
  //=========================================================================================== light
  
  var distance = 200;
  var intensity = 1;
  
  
  
  var pointLight2 = new THREE.PointLight(new THREE.Color('white'), intensity, distance);
  pointLight2.position.set(0, 10, 0);
  pointLight2.castShadow = true;
  scene.add(pointLight2);
  
  
  
  
  //===================================================== physics
  var world, physicsMaterial,boxes=[], boxMeshes=[];
  
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
  
  world.gravity.set(0,-5,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  
  
  
  
  //===================================================== non slippery mterial
  groundMaterial = new CANNON.Material("groundMaterial");                                                        
  var physicsContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
              friction: 0.4,
              restitution: 0.3,
              contactEquationStiffness: 1e8,
              contactEquationRelaxation: 3,
              frictionEquationStiffness: 1e8,
              frictionEquationRegularizationTime: 3,
          });
  
  
  // We must add the contact materials to the world
  world.addContactMaterial(physicsContactMaterial);
  
  
  
  
  
  
  //===================================================== slippery mterial
  // Create a slippery material (friction coefficient = 0.0)
  var slipperyMaterial = new CANNON.Material("slipperyMaterial");
  
  // The ContactMaterial defines what happens when two materials meet.
  // In this case we want friction coefficient = 0.0 when the slippery material touches ground.
  var slippery_ground_cm = new CANNON.ContactMaterial(groundMaterial, slipperyMaterial, {
      friction: 0,
      restitution: 0.3,
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3
  });
  
  // We must add the contact materials to the world
  world.addContactMaterial(slippery_ground_cm);
  
  
  
  
  
  
  // Create player body
  var halfExtents = new CANNON.Vec3(.25,.13,.25);
  var playerShape = new CANNON.Box(halfExtents);
  var playerBody = new CANNON.Body({ mass: 5 });
  playerBody.addShape(playerShape);
  playerBody.linearDamping = 0.9;
  world.add(playerBody);
  
      
  var playeGeo = new THREE.BoxGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
  var playerMesh =  new THREE.Mesh( playeGeo, new THREE.MeshNormalMaterial({transparent: true,opacity:0, visible: false}) );
  scene.add( playerMesh);
  
  
  
  
  
  //===================================================== add Model
    var character;
    loader = new THREE.LegacyJSONLoader();
    loader.load('https://raw.githubusercontent.com/baronwatts/models/master/lego-plane.js', function(geometry, materials) {
      character = new THREE.Mesh(geometry, materials);
      character.position.set(0, 0, 0);
      //character.rotateY(-Math.PI/2);
      character.scale.set(1,1,1);
      character.castShadow = true;
      playerMesh.add(character);
  
    });
  
  
  
  //===================================================== Circle Curve
    var amt = 15;
    var segmentCount = amt;
    var radius = 10;
    var c = new THREE.Geometry();
    var xyzArray = new Array(segmentCount)
      .fill(null)
      .map(
        (d, i) =>
          new THREE.Vector3(
            /* x */ Math.cos(i / segmentCount * Math.PI * 2) * radius,
            /* y */ 0,
            /* z */ Math.sin(i / segmentCount * Math.PI * 2) * radius
          )
      );
    var path = new THREE.CatmullRomCurve3(xyzArray);
    path.closed = true;
    var g = new THREE.Geometry();
    //g.vertices = path.getPoints(3);//triangle
    //g.vertices = path.getPoints(4);//square
    //g.vertices = path.getPoints(5);//pentagon
    //g.vertices = path.getPoints(8);//octogon
    g.vertices = path.getPoints(amt);//circle
    var m = new THREE.LineBasicMaterial({ color: new THREE.Color("skyblue") });
    var pathMesh = new THREE.Line(g, m);
    //scene.add(pathMesh);
  
  
  
  
  
  
  //===================================================== Create a plane
  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  world.add(groundBody);
  
  
  
    //===================================================== add floor
    THREE.ImageUtils.crossOrigin = '';
    var floorMap = THREE.ImageUtils.loadTexture( "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88rbIChdMAfHgM3XTk6MB8OOcsGM_BlJihA&usqp=CAU" );
    floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
    floorMap.repeat.set( 25, 25 );
  
  
    var groundMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color('#111'), specular: new THREE.Color('black'), shininess: 0, /*bumpMap: floorMap*/ } );
    var groundGeo = new THREE.PlaneGeometry( 100,100 );
    var ground = new THREE.Mesh( groundGeo, groundMaterial );
  
  
    ground.rotation.x = ( - Math.PI / 2 );
    ground.receiveShadow  = true;
    scene.add( ground );
  
  
  //===================================================== Add boxes
  var halfExtents = new CANNON.Vec3(.25,.25,.25);
  var boxShape = new CANNON.Box(halfExtents);
  var boxGeometry = new THREE.BoxGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
  var boxMesh;
  
  
  
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = .25;//place just above the ground
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color('#222')}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxBody.position.set(x,y,z);
    boxMesh.position.set(x,y,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh);
  
  });
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = d.y;
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: .5 });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color("hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)")}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxMesh.rotateY(Math.PI/2);
    boxBody.quaternion.copy(boxMesh.quaternion);
    boxBody.position.set(x,y+.75,z);
    boxMesh.position.set(x,y+.75,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh); 
  });
  
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = d.y;
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: .5 });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color("hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)")}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxMesh.rotateY(Math.PI/2);
    boxBody.quaternion.copy(boxMesh.quaternion);
    boxBody.position.set(x,y+1.2,z);
    boxMesh.position.set(x,y+1.2,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh); 
  });
  
  
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = d.y;
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: 0 });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color("#222")}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxMesh.rotateY(Math.PI/2);
    boxBody.quaternion.copy(boxMesh.quaternion);
    boxBody.position.set(x,y+2,z);
    boxMesh.position.set(x,y+2,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh); 
  });
  
  
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = d.y;
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: .5 });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color("hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)")}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxMesh.rotateY(Math.PI/2);
    boxBody.quaternion.copy(boxMesh.quaternion);
    boxBody.position.set(x,y+2.5,z);
    boxMesh.position.set(x,y+2.5,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh); 
  });
  
  
  
  
  xyzArray.map((d,i)=>{
    var x = d.x;
    var y = d.y;
    var z = d.z;
  
    var boxBody = new CANNON.Body({ mass: .5 });
    boxBody.addShape(boxShape);
    boxMesh = new THREE.Mesh( boxGeometry , new THREE.MeshLambertMaterial({transparent: true,opacity:1, visible: true, color: new THREE.Color("hsl(" + Math.floor(Math.random() * 290) + ",50%,50%)")}) );
    world.add(boxBody);
    scene.add(boxMesh);
    boxMesh.rotateY(Math.PI/2);
    boxBody.quaternion.copy(boxMesh.quaternion);
    boxBody.position.set(x,y+2.75,z);
    boxMesh.position.set(x,y+2.75,z);
  
    //boxMesh.scale.set(1,randnum(2,10),1);
    boxMesh.castShadow = true;
    boxes.push(boxBody);
    boxMeshes.push(boxMesh); 
  });
  
  
  
  
  var loader = new THREE.LegacyJSONLoader();
  loader.load('https://raw.githubusercontent.com/baronwatts/models/master/room1.js', function (geometry, materials) {
    var model = new THREE.Mesh(geometry, materials);
    model.rotateY(Math.PI/2);
    model.castShadow = true;
    model.scale.set(1,1,1);
    model.position.set(-10,0,10);
    scene.add(model);
  });
  
  
  
  var loader = new THREE.LegacyJSONLoader();
  loader.load('https://raw.githubusercontent.com/baronwatts/models/master/home.js', function (geometry, materials) {
  
  var model = new THREE.Mesh(geometry, materials);
    model.rotateY(Math.PI);
    model.scale.set(10,10,10);
    model.position.set(0,-.25,0);
    scene.add(model);
  });
  
  
  
  
  
  
  //===================================================== add model
  /*if (window.innerWidth > 768) {
    var leafs = [];
    loader = new THREE.LegacyJSONLoader();
    loader.load('https://raw.githubusercontent.com/baronwatts/models/master/single-leaf.js', function(geometry, materials) {
  
      //create leafs
      new Array(500).fill(null).map( (d, i) => {
        var matt = new THREE.MeshLambertMaterial({
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
          color: new THREE.Color('green')
        });
        var particle = new THREE.Mesh(geometry, matt);
        particle.position.set(randnum(-10, randnum(10, 20)), 20, randnum(-20, 20));
        particle.scale.set(.5, .5, .5);
        particle.rotateY(Math.random() * 180);
        scene.add(particle);5
        leafs.push(particle);
      });
  
      leafs.map((d, i) => {
        //position
        if (i % 2 == 0) {
          leafs[i].position.y = 0;
        } else {
          TweenMax.to(leafs[i].position, 10, {
            y: 0,
            x: randnum(-10, 10),
            ease: Power2.Linear,
            delay: 0.025 * i,
            repeat: -1
          }, 1);
        }
        //rotation
        if (i % 2 == 0) {
          leafs[i].rotation.y = 0;
        } else {
          TweenMax.to(leafs[i], 5, {
            rotationY: '+=25',
            ease: Power2.Linear,
            delay: 0.025 * i,
            repeat: -1
          }, 1);
        }
  
      }); //end leafs
  
    });
  
  } //end if
  */
  
  
  
  
  
  
  
  
  
  
  
  
  
  //===================================================== event
  document.body.addEventListener('click', function (e) {
    var pos = playerBody.position.y > 2.5 ? 0 : 5;
    playerBody.velocity.set(0,pos,0);
  });
  
  
      
  
  var followCam = new THREE.Object3D();
  followCam.position.copy(camera.position);
  scene.add(followCam);
  followCam.parent = playerMesh;
  
  //===================================================== 3rd person view
  function updateCamera(){
   camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()), 0.15);
   camera.lookAt( playerMesh.position); 
  }
  
  
  
  playerBody.position.y = 3;
  
  //collision
      playerBody.addEventListener("collide",function(e){
  
        if(e.contact){
          //console.log(e.contact);
         /* percentage = 0;
          playerBody.position.y = 30;*/
          //scene.add(character);
          //console.log('collide');
        }else{
         
          
        
  
        }
  
      /*// Get relative velocity in the contact point
      var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
        if(Math.abs(relativeVelocity) < 10){
          // More energy
          playerBody.velocity.set(0,10,0);
        } else {
          // Less energy
        }*/
  
      });
  
  
  //===================================================== animate
  var percentage = 0;
  var clock = new THREE.Clock();
  (function animate() {
      requestAnimationFrame( animate );
      updateCamera();
      renderer.render( scene, camera );
  
  
      
  
      //60 FPS
   /*   var delta = clock.getDelta();
      var ticks =  Math.round( delta / ( 1 / 60 ) );
      for ( let i = 0 ; i < ticks ; i++ ) {
        world.step(delta / ticks);
      };*/
    
  
      world.step(1/60);
  
      // Update box positions
      for(var i=0; i<boxes.length; i++){
          boxMeshes[i].position.copy(boxes[i].position);
          boxMeshes[i].quaternion.copy(boxes[i].quaternion);
      }
  
  
      //follow path
      percentage += .00075;
      var p1 = path.getPointAt(percentage%1);
      var p2 = path.getPointAt((percentage + 0.03)%1);
      playerBody.position.x = p1.x;
      playerBody.position.z = p1.z;
      playerMesh.lookAt(p2.x,playerMesh.position.y,p2.z);
  
  
  
  
  
  
       
  
  
      // Update player body positions
      for(var i=0; i<boxes.length; i++){
        playerMesh.position.copy(playerBody.position);
        //playerMesh.quaternion.copy(playerBody.quaternion);
      }
  
  
      
     
  
  })();