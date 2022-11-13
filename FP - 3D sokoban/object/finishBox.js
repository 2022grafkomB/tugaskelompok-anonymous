import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

export function createFinishBox(boxSize, boxColor, locX, locZ, scene, finish){
    const geometryWall = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const materialWall = new THREE.MeshPhongMaterial(
        {
            color: boxColor
        });
    const wall = new THREE.Mesh(geometryWall, materialWall);
    wall.position.set(locX, -9.9, locZ);
    scene.add(wall);
    finish.push(wall);
    return wall;
}



