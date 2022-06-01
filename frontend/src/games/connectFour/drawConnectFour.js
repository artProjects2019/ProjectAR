import {checkWin, playerTurn, boardY, boardX, player1, player2} from './connectFour.js'
import {playAudio} from '../../../public/audio/sound'
import * as THREE from 'three';
import {actualPlayer, restart, sessionKey, checkDraw, isMyTurn} from "@/games/gameUtils";
import {connectToSocket} from "@/games/socketUtils";

import {initAR, animate, createMaterial, scene,
        controller, raycaster} from "@/games/arUtils";

const tempMatrix = new THREE.Matrix4();
let board;
let infoBox;


class connectFourBoard {
        boxes = [];

        constructor() {
                const BOX_SIZE = 0.05;

                for(let i = 0 ; i < 42 ; ++i) {
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
                for(let i = 0 ; i < 42 ; ++i){
                        scene.add(this.boxes[i]);
                }
        }

        setBoxesPosition() {
                const POSITION = 0.06;

                for(let i = 0; i < 6; i++) {
                        this.boxes[i*7].position.set((-3) * POSITION, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 1].position.set((-2) * POSITION, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 2].position.set((-1) * POSITION, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 3].position.set(0, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 4].position.set(POSITION, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 5].position.set(2 * POSITION, (-3) * POSITION + i * POSITION, -0.65);
                        this.boxes[i*7 + 6].position.set(3 * POSITION, (-3) * POSITION + i * POSITION, -0.65);
                }
        }
}

function updateInfoBoxTexture(player, isMyTurn) {
        let texture = isMyTurn ? "yourTurn" : "oppTurn";
        infoBox.material = createMaterial(texture + player);
}

function updateTexture(boxNumber, player){
        board.boxes[boxNumber].material = createMaterial(player);
}

function init() {
        initAR();
        controller.addEventListener('select', onSelect);

        board = new connectFourBoard();
        board.addToScene();

        createInfoBox();
}

function createInfoBox() {
        const infoBoxTexture = new THREE.TextureLoader().load('./textures/white.png' );
        const infoBoxGeometry = new THREE.BoxBufferGeometry(0.35, 0.1, 0.0125);
        const infoBoxMaterial = new THREE.MeshBasicMaterial({
                map: infoBoxTexture
        });
        infoBox = new THREE.Mesh(infoBoxGeometry, infoBoxMaterial);
        updateInfoBoxTexture(actualPlayer, isMyTurn);
        infoBox.position.set(0, 0.25, -0.65);
        scene.add(infoBox);
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
        restart(boardX, boardY, player1, player2);
        connectToSocket(sessionKey, checkWin, checkDraw, boardX, boardY, updateTexture, updateInfoBoxTexture);
        init();
        animate();
}

export {
        updateTexture,
        start,
        updateInfoBoxTexture,
};