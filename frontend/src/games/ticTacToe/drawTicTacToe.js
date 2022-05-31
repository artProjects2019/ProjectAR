import {playerTurn, restart} from './ticTacToe.js'
import {playAudio} from '../../../public/audio/sound'
import * as THREE from 'three';
import {myMark} from "./ticTacToe.js";
import {connectToSocket} from "./ticTacToe.js";
import {sessionKey} from "./ticTacToe.js";
import {isMyTurn} from "./ticTacToe.js";
import {initAR, animate, createMaterial, scene,
    controller, raycaster} from "@/games/ARUtils";

const tempMatrix = new THREE.Matrix4();
let board;
let infoBox;


class ticTacToeBoard {
    boxes = [];

    constructor() {
        const BOX_SIZE = 0.05;

        for(let i = 0 ; i < 9 ; ++i) {

            const texture = new THREE.TextureLoader().load('./textures/white.png' );
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

function updateInfoBoxTexture(mark, isMyTurn) {
    let texture = isMyTurn ? "yourTurn" : "oppTurn";
    infoBox.material = createMaterial(texture + mark);
}

function updateTexture(boxNumber, mark){
    board.boxes[boxNumber].material = createMaterial(mark);
}

function init() {
    initAR();
    controller.addEventListener('select', onSelect);

    board = new ticTacToeBoard();
    board.addToScene();

    createInfoBox();
}

function createInfoBox() {
    const infoBoxTexture = new THREE.TextureLoader().load('./textures/white.png' );
    const infoBoxGeometry = new THREE.BoxBufferGeometry(0.26, 0.1, 0.0125);
    const infoBoxMaterial = new THREE.MeshBasicMaterial({
        map: infoBoxTexture
    });
    infoBox = new THREE.Mesh(infoBoxGeometry, infoBoxMaterial);
    updateInfoBoxTexture(myMark, isMyTurn);
    infoBox.position.set(0, 0.2, -0.5);
    scene.add(infoBox);
}

function onSelect() {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersections = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < board.boxes.length; i++) {
        if (intersections.length > 0 && intersections[0].object === board.boxes[i]) {
            playerTurn(i, myMark);
            playAudio("./audio/click.wav");
        }
    }
}

function start() {
    restart();
    connectToSocket(sessionKey);
    init();
    animate();
}

export {
    updateTexture,
    start,
    updateInfoBoxTexture,
};