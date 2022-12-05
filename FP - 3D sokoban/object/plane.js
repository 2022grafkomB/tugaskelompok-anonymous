import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

export function makePlane(planeSize, textureUrl, repeat) {
    const loader = new THREE.TextureLoader();
    let texture = loader.load(textureUrl);

    if(repeat){
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 4;
        texture.repeat.set(repeats, repeats);
    }

    let material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });

    let geometry = new THREE.PlaneGeometry(planeSize, planeSize);

    let obj = new THREE.Mesh(geometry, material);
    obj.receiveShadow = true;
    return obj;
}