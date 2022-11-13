import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

export function makeBox(boxSize, textureUrl) {
    // box object
    const boxGeometry = boxSize;
    var boxMat = new THREE.MeshBasicMaterial({
        color: '#FFF'
    });
    if(textureUrl != ''){
        const loader = new THREE.TextureLoader();
        boxMat = new THREE.MeshPhongMaterial({
            map: loader.load(textureUrl)
        });
    }
    
    const box = new THREE.Mesh(boxGeometry, boxMat);
    box.castShadow = true;
    box.receiveShadow = true;
    box.position.y = 3;
    return box;
}