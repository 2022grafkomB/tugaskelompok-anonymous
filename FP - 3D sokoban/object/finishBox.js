import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
export function createFinishBox(boxSize, textureUrl, locX, locZ, scene, finish){
    const loader = new THREE.TextureLoader();
    const texture = loader.load(textureUrl)
    
    
    const geometryWall = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const materialWall = new THREE.MeshPhongMaterial(
        {
            map: texture
        });
    const wall = new THREE.Mesh(geometryWall, materialWall);
    wall.position.set(locX, 50, locZ);
    scene.add(wall);
    finish.push(wall);
    return wall;
}