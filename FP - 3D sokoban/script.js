import { PointerLockControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/PointerLockControls.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/MTLLoader.js'

import { makePlane } from './object/plane.js';
import { createWall } from './object/wall.js';
import { makeBox } from './object/box.js';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let tempX = [];
let tempZ = [];
let horPos = 0;
let verPos = 0;
let posIndex = 0;

const box = [];

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let camera;
{ // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 4;
}

let scene;
{ // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xB7CEEB);
}

{ // Light
    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    // light.position.y = 10;
    light.position.set( 0.5, 100, 0.75 );
    scene.add(light);
}


let planeSize = 100;
{ // Plane
    let textureUrl = 'plane-texture.jpg';
    let plane = makePlane(planeSize, textureUrl);
    plane.rotateX(- Math.PI / 2);
    scene.add(plane);
}

{ // Wall
    let finish = [];
    var wallSize = 100
    var wallTxtr = 'wall-texture.jpg'
    let f1 = createWall(wallSize, wallTxtr, wallSize, 0, scene, finish);
    let f2 = createWall(wallSize, wallTxtr, 0, -wallSize, scene, finish);
    let f3 = createWall(wallSize, wallTxtr, -wallSize, 0, scene, finish);
    let f4 = createWall(wallSize, wallTxtr, 0, wallSize, scene, finish);
}

{ // Boxes
    let boxTexture = 'box-texture.jpg';
    let arrPos = [-20, 20];
    let i = 0;
    arrPos.forEach(function(e){
        box[i] = makeBox(new THREE.BoxGeometry(10, 10, 10), boxTexture);
        box[i].position.x = e;
        box[i].position.y = 5;
        scene.add(box[i]);
        i++;
    });
}

let controls;
const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');
{ // Pointer Lock Control
controls = new PointerLockControls(camera, document.body)

    instructions.addEventListener('click', function () {
        controls.lock();
    });

    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());
}

// On Key Up Event
const onKeyUp = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
};


// On Key Down Event
const onKeyDown = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':
            if (canJump === true) velocity.y += 100;
            canJump = false;
            break;
    }
};


{ // Add Event to EventListener on Page
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

let renderer;
{ // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

// Resize Window Event
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
window.addEventListener('resize', onWindowResize);


let raycaster;
{ // Raycaster
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
}

function animate() {


    requestAnimationFrame(animate);

    const time = performance.now();

    if (controls.isLocked === true) {
        let push = false;
        
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 40.0 * delta;
        velocity.z -= velocity.z * 40.0 * delta;

        velocity.y -= 9.8 * 50.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        console.log(direction.z)
        direction.normalize(); // this ensures consistent movements in all directions
        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
        
        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);

        // controls to stay in the environment
        if(controls.getObject().position.x < -48) controls.getObject().position.x = -48;
        if(controls.getObject().position.x > 48) controls.getObject().position.x = 48;
        if(controls.getObject().position.z < -48) controls.getObject().position.z = -48;
        if(controls.getObject().position.z > 48) controls.getObject().position.z = 48;

        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 4) {

            velocity.y = 0;
            controls.getObject().position.y = 4;

            canJump = true;
        }
        

        tempX = [box[1].position.x , box[0].position.x];
        tempZ = [box[1].position.z , box[0].position.z];

        verPos = 0;
        horPos = 0;
        posIndex = 0;
        if(tempX[1] > tempX[0]) horPos = 1;
        if(tempZ[1] > tempZ[0]) verPos = 1;

        box.forEach(function(e){
            //Horizontal
            if(controls.getObject().position.z < e.position.z+5 && controls.getObject().position.z > e.position.z-5 ){
                //Barat
                if(controls.getObject().position.x > e.position.x && controls.getObject().position.x < e.position.x + 7){
                    if(horPos == posIndex) e.position.x = controls.getObject().position.x - 7;
                    else {
                        if(tempZ[posIndex] - e.position.z > 10 || tempZ[posIndex] - e.position.z < -10) e.position.x = controls.getObject().position.x - 7;
                        else{
                            if(tempX[posIndex] - e.position.x < -10) e.position.x = controls.getObject().position.x - 7;
                            else controls.getObject().position.x = e.position.x + 7; 
                        }
                    }
                    if(e.position.x < -45) {
                        e.position.x = -45;
                        controls.getObject().position.x = e.position.x+7;
                    }
                }

                //Timur
                else if (controls.getObject().position.x < e.position.x && controls.getObject().position.x > e.position.x - 7){
                    if(horPos != posIndex) e.position.x = controls.getObject().position.x + 7;
                    else {
                        if(tempZ[posIndex] - e.position.z > 10 || tempZ[posIndex] - e.position.z < -10) e.position.x = controls.getObject().position.x = 7;
                        else{
                            if(tempX[posIndex] - e.position.x > 10) e.position.x = controls.getObject().position.x + 7;
                            else controls.getObject().position.x = e.position.x-7; 
                        }
                    }
                    if(e.position.x > 45) {
                        e.position.x = 45;
                        controls.getObject().position.x = e.position.x-7;
                    }
                }
            } 
            
            
            //Vertikal
            else if(controls.getObject().position.x < e.position.x + 5 && controls.getObject().position.x > e.position.x-5 ){
                //Utara
                if(controls.getObject().position.z > e.position.z && controls.getObject().position.z < e.position.z - 7){
                    if(verPos == posIndex) e.position.z = controls.getObject().position.z - 7;
                    else {
                        if(tempX[posIndex] - e.position.x > 10 || tempX[posIndex] - e.position.x < -10) e.position.z = controls.getObject().position.z - 7;
                        else{
                            if(tempZ[posIndex] - e.position.z < -10) e.position.z = controls.getObject().position.z - 7;
                            else controls.getObject().position.z = e.position.z+7; 
                        }
                    }
                    if(e.position.z < -45) {
                        e.position.z = -45;
                        controls.getObject().position.z = e.position.z+7;
                    }
                }

                //Selatan
                else if (controls.getObject().position.z < e.position.z && controls.getObject().position.z > e.position.z - 7){
                    if(verPos != posIndex) e.position.z = controls.getObject().position.z + 7;
                    else {
                        if(tempX[posIndex] - e.position.x > 10 || tempX[posIndex] - e.position.x < -10) e.position.z = controls.getObject().position.z + 7;
                        else{
                            if(tempZ[posIndex] - e.position.z > 10) e.position.z = controls.getObject().position.z + 7;
                            else controls.getObject().position.z = e.position.z-7; 
                        }
                    }
                    if(e.position.z > 45) {
                        e.position.z = 45;
                        controls.getObject().position.z = e.position.z-7;
                    }
                }
            }
            posIndex++;
        });
        // console.log(controls.getObject().position.z)

    }

    prevTime = time;

    renderer.render(scene, camera);

}

animate();