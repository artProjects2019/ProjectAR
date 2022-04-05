import {ARButton} from "three/examples/jsm/webxr/ARButton";
import {playerTurn, restart} from './ticTacToe.js'
import {playAudio} from '../../../public/audio/sound'
import * as THREE from 'three';

const tempMatrix = new THREE.Matrix4();

let camera;
let scene;
let renderer;
let board;
let controller;
let raycaster;

class ticTacToeBoard {
    boxes = [];

    constructor() {
        const BOX_SIZE = 0.05;

        for(let i = 0 ; i < 9 ; ++i) {

            const texture = new THREE.TextureLoader().load('./textures/white.png' ); // Loading a basic texture png
            const geometry = new THREE.BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE * 0.25);
            const material = new THREE.MeshBasicMaterial({
                map: texture
            });
            let box = new THREE.Mesh(geometry, material);
            this.boxes.push(box);
        }
        this.setBoxesPosition();
    }

    addToScene() {
        for(let i = 0 ; i < 9 ; ++i){
            scene.add(this.boxes[i]);
        }
    }

    setBoxesPosition() {
        const POSITION = 0.08;
        this.boxes[0].position.set(POSITION, POSITION, -0.5);
        this.boxes[1].position.set(0, POSITION, -0.5);
        this.boxes[2].position.set(-POSITION, POSITION, -0.5);
        this.boxes[3].position.set(POSITION, 0, -0.5);
        this.boxes[4].position.set(0, 0, -0.5);
        this.boxes[5].position.set(-POSITION, 0, -0.5);
        this.boxes[6].position.set(POSITION, -POSITION, -0.5);
        this.boxes[7].position.set(0, -POSITION, -0.5);
        this.boxes[8].position.set(-POSITION, -POSITION, -0.5);
    }
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

function updateTextureX(boxNumber){
    board.boxes[boxNumber].material = createMaterial('x');
}

function updateTextureXWin(boxNumber){
    board.boxes[boxNumber].material = createMaterial('xWin');
}

function updateTextureO(boxNumber){
    board.boxes[boxNumber].material = createMaterial('o');
}

function updateTextureOWin(boxNumber){
    board.boxes[boxNumber].material = createMaterial('oWin');
}

function init() {
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
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    board = new ticTacToeBoard();
    board.addToScene();

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

function onSelect() {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersections = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < board.boxes.length; i++) {
        if (intersections.length > 0 && intersections[0].object === board.boxes[i]) {
            playerTurn(i);
            playAudio("./audio/click.wav");
        }
    }
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function start() {
    restart();
    init();
    animate();
}

// start();

export {
    updateTextureX,
    updateTextureXWin,
    updateTextureO,
    updateTextureOWin,
    start,
};