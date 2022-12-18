
function initthreejs() {

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.lookAt(new THREE.Vector3(50, 0, 50));
  camera.position.set(50.06421484100598,219.95842897735875,-33.78512665221608);

  scene = new THREE.Scene();

  // var axishelper = new THREE.AxisHelper(100);
  // scene.add(axishelper);
  // var boxhelper;

  control = new THREE.OrbitControls(camera);
  control.target.x = 50;
  control.target.z = 50;
  control.enableKeys = false;
  control.autoRotate = true;
  control.autoRotateSpeed = 7;
  control.update();

  light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
}

function initmeshline() {
  console.log("Initmeshline")
  for (var i = 0; i <= 100; i += 10) {

    var lineContainer = new THREE.Geometry();
    lineContainer.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100));

    var line = new THREE.Line(lineContainer, new THREE.LineBasicMaterial());
    scene.add(line);
    line.position.set(i, 0, 0);

    var rotateline = new THREE.Line(lineContainer, new THREE.LineBasicMaterial());
    rotateline.rotateY(Math.PI / 2);
    rotateline.position.set(0, 0, i);
    scene.add(rotateline);
  }
}

function initFloor(){
  console.log("initFloor")
  for (var z = 5; z < 100; z+=10){
    for (var x = 5; x < 100; x+=10){
      floorCube(z, x);
    }
  }
}

temparray = [0, 0, 
             0, 0, 
             0, 0,
             0, 0, 

             0, 0, 
             0, 0, 
             0, 1, 
             1, 1, 

             0, 0,
             0, 0, 
             0, 0, 
             0, 1, 

             4, 1, 
             0, 0, 
             0, 0, 
             0, 0, 
             0, 1, 
             0, 1, 
             1, 1, 
             1, 0, 
             0, 1, 
             1, 1, 
             2, 0, 
             2, 4, 
             1, 0, 
             0, 1, 
             4, 0, 
             2, 3, 
             1, 1, 
             1, 0, 
             0, 1, 
             1, 1, 
             1, 2, 
             1, 0, 
             0, 0, 
             0, 0, 
             0, 0, 
             1, 4, 
             1, 0, 
             0, 0, 
             0, 0, 
             0, 0, 
             1, 1, 
             1, 0, 
             0, 0, 
             0, 0, 
             0, 0, 
             0, 0, 
             0, 0, 
             0, 0];

function initcube(a) {
  scene.visible = true;
  document.body.style.backgroundColor = "url(img/hacker.jpg)"; 
  cubes = new Array(); 
  var tempindex = 0;
  for (var i = 1; i <= 10; i++) {
    cubes[i] = new Array(); 
    for (var j = 1; j <= 10; j++) {
      // var index = parseInt(Math.random() * 3);
      var index = a[tempindex];
      switch (index) {
        //
        // case 5:
        //   descube = new DesCube(i, j);
        //   cubes[i][j] = {
        //     state: 4
        //   };
        //   tempindex++;
        //   break;
        //
        case 4:
          descube = new DesCube(i, j);
          cubes[i][j] = {
            state: 4
          };
          tempindex++;
          break;
        case 3:
          ghost = new PersonCube(i, j);
          cubes[i][j] = {
            state: 3
          }; 
          tempindex++;
          break;
        case 2:
          cubes[i][j] = new Cube(index, i, j, 'crate', (j - 1) * 10 + 5, 5, (i - 1) * 10 + 5);
          // cubes[i][j] = new Crate(index, i, j, (j - 1) * 10 + 5, 5, (i - 1) * 10 + 5);
          // scene.add(cubes[i][j].cube);
          tempindex++;
          break;
        case 1:
          cubes[i][j] = new Cube(index, i, j, 'bricks', (j - 1) * 10 + 5, 5, (i - 1) * 10 + 5);
          // scene.add(cubes[i][j].cube);
          tempindex++;
          break;
        case 0:
          cubes[i][j] = new Cube(0, i, j);
          tempindex++;
        default:
          continue;
      }
    }
  }
}

function statsmonitor() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
}

function gameloop() {
  // if (boxhelper) { 
  //   boxhelper.update();
  // }
  stats.update();
  if (control) {
    control.update();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(gameloop);
}


initthreejs();
statsmonitor();
initmeshline();
initFloor();
initcube(temparray);
gameloop();
