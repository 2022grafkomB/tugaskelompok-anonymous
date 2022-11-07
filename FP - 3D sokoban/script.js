import { PointerLockControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/PointerLockControls.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

import { makePlane } from './object/plane.js';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let camera;
{ // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;
}

let scene;
{ // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
}

{ // Light
    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    // light.position.y = 10;
    light.position.set( 0.5, 100, 0.75 );
    scene.add(light);
}

{ // Plane
    let textureUrl = 'floor-texture.jpg';
    let planeSize = 2000;
    let plane = makePlane(planeSize, textureUrl);
    plane.rotateX(- Math.PI / 2);
    scene.add(plane);
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
            if (canJump === true) velocity.y += 250;
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

        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        // const intersections = raycaster.intersectObjects(objects, false);

        // const onObject = intersections.length > 0;

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        // if (onObject === true) {

        //     velocity.y = Math.max(0, velocity.y);
        //     canJump = true;

        // }

        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);

        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 10) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

    }

    prevTime = time;

    renderer.render(scene, camera);

}

animate();