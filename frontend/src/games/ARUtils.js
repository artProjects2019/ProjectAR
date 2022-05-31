import * as THREE from "three";
import {ARButton} from "three/examples/jsm/webxr/ARButton";

let camera;
let scene;
let renderer;
let controller;
let raycaster;

function initAR() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.01, 20);

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, autoClear: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;

    document.body.appendChild(ARButton.createButton(renderer, {}));

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    controller = renderer.xr.getController(0);
    scene.add(controller);

    const geometry = new THREE.BufferGeometry().setFromPoints(
        [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);

    const line = new THREE.Line(geometry);
    line.name = 'line';
    line.scale.z = 5;

    controller.add(line.clone());

    window.addEventListener('resize', ()=> {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function createMaterial(texture) {
    return [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/white.png')}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/white.png')}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/white.png')}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/white.png')}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/' + texture + '.png')}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./textures/' + texture + '.png')})
    ];
}

export {initAR, animate, render, createMaterial, camera, scene, renderer, controller, raycaster };

