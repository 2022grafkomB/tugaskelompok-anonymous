
// import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

function Cube(state, row, column, materialurl, x, y, z) {
  // console.log("x = ", x, y, "      Z = ", z)
  this.state = state; 
  this.row = row; 
  this.column = column; 
  if (state == 1 || state == 2) {
    var cubegeometry = new THREE.BoxGeometry(10, 10, 10); 
    if (materialurl == "crate") {
        const Modelpath = './Crate/';
        const texture = new THREE.TextureLoader();
        texture.setPath(Modelpath);
        const aoMapp = texture.load("Sci_Fi_Floor_Tile_ambientocclusion.png");
        const baseColorMap =  texture.load("Sci_Fi_Floor_Tile_basecolor.png");
        const emissiveMapp = texture.load("Sci_Fi_Floor_Tile_Emissive.png");
        const metallicMap =  texture.load("Sci_Fi_Floor_Tile_metallic.png");
        const normalMap =  texture.load("Sci_Fi_Floor_Tile_normal.png");
        const roughnessMap =  texture.load("Sci_Fi_Floor_Tile_roughness.png");
        var cubematerial = new THREE.MeshStandardMaterial({
          map: baseColorMap, 
          aoMap: aoMapp,
          emissive: 0xffffff,
          emissiveMap: emissiveMapp,
          metalnessMap: metallicMap,
          normalMap: normalMap,
          roughnessMap: roughnessMap
        });
    } else {
      var cubematerial = new THREE.MeshBasicMaterial({
        map: textureloader.loadTexture('img/wall.jpeg')
      });
    }
    var cube = new THREE.Mesh(cubegeometry, cubematerial);
    cube.position.set(x, y, z);
    this.cube = cube; 
    scene.add(cube);
  } 
}

function floorCube(x, z){
  // Geometry
  var floorgeometry = new THREE.BoxGeometry(10, 1, 10);
    
  // Texture
  const Modelpath = './floor/type1/textures/';
  const texture = new THREE.TextureLoader();
  texture.setPath(Modelpath); 
  
  const baseColorMap =  texture.load("Albedo.png");
  const aoMapp = texture.load("AO.png");
  const emissiveMapp = texture.load("Emission.png");
  const normalMap =  texture.load("Normal.png");
  const specularMapp = texture.load("Specular.png");


  // Material
  var floormaterial = new THREE.MeshPhongMaterial({
    map: baseColorMap, 
    aoMap: aoMapp,
    emissive: 0xffffff,
    emissiveMap: emissiveMapp,
    specularMap: specularMapp,
    normalMap: normalMap,
  });

  // Mesh
  var floor = new THREE.Mesh(floorgeometry, floormaterial);
  floor.position.set(x, -0.5, z);
  scene.add(floor);
}

function PersonCube(row, column) {
  this.state = 3; 
  this.row = row;
  this.column = column;
  var loader = new THREE.STLLoader();
  const textureLoad = new THREE.TextureLoader();
  const textureTimmy = textureLoad.load("img/timmy.png");

  var ghostMaterial = new THREE.MeshPhongMaterial({
    map:textureTimmy
  });
  loader.load("img/timmy.stl", function(obj) {
    var cube = new THREE.Mesh(obj, ghostMaterial);
    // cube.rotateX();
    cube.position.set((column - 1) * 10 + 5, 0, (row - 1) * 10 + 5);
    cube.scale.set(0.7, 0.7, 0.7);
    scene.add(cube);
    ghost.cube = cube;
    document.getElementById("white").style.display="none";
  })
  this.isavailable = function(direction) {
    row = this.row;
    column = this.column;
    var availarr = [0, 4]; 
    switch (direction) {
      case "w":
        if (cubes[row - 1] && availarr.includes(cubes[row - 1][column].state)) {
          return true;
        }
        if (cubes[row - 2] && availarr.includes(cubes[row - 2][column].state)) {
          if (cubes[row - 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "s":
        if (availarr.includes(cubes[row + 1] && cubes[row + 1][column].state)) {
          return true;
        }
        if (availarr.includes(cubes[row + 2] && cubes[row + 2][column].state)) {
          if (cubes[row + 1][column].state == 2) {
            return true;
          }
        }
        return false;
      case "a":
        if (availarr.includes(cubes[row][column - 1] && cubes[row][column - 1].state)) {
          return true;
        }
        if (availarr.includes(cubes[row][column - 2] && cubes[row][column - 2].state)) {
          if (cubes[row][column - 1].state == 2) {
            return true;
          }
        }
        return false;
      case "d":
        if (availarr.includes(cubes[row][column + 1] && cubes[row][column + 1].state)) {
          return true;
        }
        if (availarr.includes(cubes[row][column + 2] && cubes[row][column + 2].state)) {
          if (cubes[row][column + 1].state == 2) {
            return true;
          }
        }
        return false;
      default:
        console.log("direction error");
    }
  }
}


function DesCube(i, j) {
  desCubes = new Array();
  var textureloader = new THREE.TextureLoader();
  var loader = new THREE.STLLoader();
  var ghostMaterial = new THREE.MeshBasicMaterial({
    color: 0x2033a4,
  });
  loader.load("img/Base_luz.stl", function(obj) {
    var cube = new THREE.Mesh(obj, ghostMaterial);
    cube.rotateX(Math.PI / 2 * 3);
    cube.position.set((j - 1) * 10 + 5, 0, (i - 1) * 10 + 5);
    cube.scale.set(3, 3, 3);
    scene.add(cube);

    
    desCubes.push({
      state: 0, 
      position: {
        row: i,
        column: j
      }
    });
  });
}
DesCube.prototype.checkcube = function(row, column) {
  for (var i = 0; i < desCubes.length; i++) { 
    if (row == desCubes[i].position.row && column == desCubes[i].position.column) {
      desCubes[i].state = 1;
      return true; 
    }
  }
  return false;
}
DesCube.prototype.checkdes = function() {
  for (var i = 0; i < desCubes.length; i++) {
    if (desCubes[i].position.row == ghost.row && desCubes[i].position.column == ghost.column) { 
      desCubes[i].state = 0;
    }
  }
  for (var i = 0; i < desCubes.length; i++) {
    if (desCubes[i].state == 0) {
      return false;
    }
  }
  return true;
};

// export { Cube, Crate, PersonCube, DesCube }