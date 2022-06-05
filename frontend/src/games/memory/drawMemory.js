import {
    playerTurn, player1, player2,
    handleMessageFromSocket, boardX, boardY, restartSettings
} from './memory.js'
import {playAudio} from '../../../public/audio/sound'
import * as THREE from 'three';
import {actualPlayer, restart, sessionKey, isMyTurn} from "@/games/gameUtils";
import {connectToSocket} from "@/games/socketUtils";
import {initAR, animate, createMaterial, scene, controller, raycaster} from "@/games/arUtils";

const tempMatrix = new THREE.Matrix4();
let board;
let infoBox;
let yourScoreNumberBox;
let yourScoreBox;
let oppScoreBox;
let oppScoreNumberBox;


class memoryBoard {
    boxes = [];

    constructor() {
        const BOX_SIZE = 0.05;

        for(let i = 0 ; i < 20 ; ++i) {

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
        for(let i = 0 ; i < 20 ; ++i){
            scene.add(this.boxes[i]);
        }
    }

    setBoxesPosition() {
        const POSITION = 0.06;

        for(let i = 0; i < 4; i++) {
            this.boxes[i*5].position.set((-2) * POSITION, (-2) * POSITION + i * POSITION, -0.65);
            this.boxes[i*5 + 1].position.set((-1) * POSITION, (-2) * POSITION + i * POSITION, -0.65);
            this.boxes[i*5 + 2].position.set(0, (-2) * POSITION + i * POSITION, -0.65);
            this.boxes[i*5 + 3].position.set(POSITION, (-2) * POSITION + i * POSITION, -0.65);
            this.boxes[i*5 + 4].position.set(2 * POSITION, (-2) * POSITION + i * POSITION, -0.65);
        }
    }
}

function updateInfoBoxTexture(isMyTurn) {
    let texture = isMyTurn ? "yourTurn" : "oppTurn";
    infoBox.material = createMaterial(texture);
}

function updateTexture(boxNumber, texture){
    board.boxes[boxNumber].material = createMaterial(texture);
}

function updateScoreBoxes(yourScore, oppScore) {
    yourScoreNumberBox.material = createMaterial(yourScore.toString());
    oppScoreNumberBox.material = createMaterial(oppScore.toString());
}

function init() {
    initAR();
    controller.addEventListener('select', onSelect);

    board = new memoryBoard();
    board.addToScene();

    createInfoBoxes();
}

function createInfoBoxes() {
    const infoBoxGeometry = new THREE.BoxBufferGeometry(0.40, 0.1, 0.0125);
    const boxTexture = new THREE.TextureLoader().load('./textures/white.png' );
    const boxMaterial = new THREE.MeshBasicMaterial({
        map: boxTexture
    });

    infoBox = new THREE.Mesh(infoBoxGeometry, boxMaterial);
    updateInfoBoxTexture(isMyTurn);
    infoBox.position.set(0, 0.35, -0.65);
    scene.add(infoBox);

    const yourScoreBoxGeometry = new THREE.BoxBufferGeometry(0.15, 0.1, 0.0125);
    yourScoreBox = new THREE.Mesh(yourScoreBoxGeometry, boxMaterial);
    yourScoreBox.material = createMaterial('yourScore');
    yourScoreBox.position.set(-0.125, 0.25, -0.65);
    scene.add(yourScoreBox);

    const yourScoreNumberBoxGeometry = new THREE.BoxBufferGeometry(0.05, 0.1, 0.0125);
    yourScoreNumberBox = new THREE.Mesh(yourScoreNumberBoxGeometry, boxMaterial);
    yourScoreNumberBox.material = createMaterial('0');
    yourScoreNumberBox.position.set(-0.025, 0.25, -0.65);
    scene.add(yourScoreNumberBox);

    const oppScoreBoxGeometry = new THREE.BoxBufferGeometry(0.15, 0.1, 0.0125);
    oppScoreBox = new THREE.Mesh(oppScoreBoxGeometry, boxMaterial);
    oppScoreBox.material = createMaterial('oppScore');
    oppScoreBox.position.set(0.075, 0.25, -0.65);
    scene.add(oppScoreBox);

    const oppScoreNumberBoxGeometry = new THREE.BoxBufferGeometry(0.05, 0.1, 0.0125);
    oppScoreNumberBox = new THREE.Mesh(oppScoreNumberBoxGeometry, boxMaterial);
    oppScoreNumberBox.material = createMaterial('0');
    oppScoreNumberBox.position.set(0.175, 0.25, -0.65);
    scene.add(oppScoreNumberBox);
}

function onSelect() {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersections = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < board.boxes.length; i++) {
        if (intersections.length > 0 && intersections[0].object === board.boxes[i]) {
            playerTurn(i, actualPlayer);
            playAudio("./audio/click.wav");
        }
    }
}

function start() {
    restart(boardY, boardX, player1, player2);
    restartSettings();
    connectToSocket(sessionKey, handleMessageFromSocket);
    init();
    animate();
}

export {
    updateTexture,
    start,
    updateInfoBoxTexture,
    updateScoreBoxes,
};