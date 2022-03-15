let camera;
let scene;
let raycaster;
let renderer;
let mouse;
let board;

class ticTacToeBoard {
    boxes = [];

    constructor() {
        const SIZE = 5;

        for(let i = 0 ; i < 9 ; ++i){
            const texture = new THREE.TextureLoader().load('textures/white.png' ); // Loading a basic texture png
            const geometry = new THREE.PlaneGeometry(SIZE, SIZE);
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

    setBoxesPosition(){
        const POSITION = 6;
        this.boxes[0].position.set(POSITION, POSITION, 0);
        this.boxes[1].position.set(0, POSITION, 0);
        this.boxes[2].position.set(-POSITION, POSITION, 0);
        this.boxes[3].position.set(POSITION, 0, 0);
        this.boxes[4].position.set(0, 0, 0);
        this.boxes[5].position.set(-POSITION, 0, 0);
        this.boxes[6].position.set(POSITION, -POSITION, 0);
        this.boxes[7].position.set(0, -POSITION, 0);
        this.boxes[8].position.set(-POSITION, -POSITION, 0);
    }
}

function initScene() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector3();
    board = new ticTacToeBoard();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(30);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    board.addToScene();
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);

    // check which box has been clicked by the player and make a player's move
    for(let i = 0; i < board.boxes.length; i++) {
        if (intersects.length > 0 && intersects[0].object === board.boxes[i]) {
            playerTurn(i);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function updateTextureX(boxNumber){
    board.boxes[boxNumber].material.map = new THREE.TextureLoader().load('textures/x.png');
}

function updateTextureXWin(boxNumber){
    board.boxes[boxNumber].material.map = new THREE.TextureLoader().load('textures/xWin.png');
}

function updateTextureO(boxNumber){
    board.boxes[boxNumber].material.map = new THREE.TextureLoader().load('textures/o.png');
}

function updateTextureOWin(boxNumber){
    board.boxes[boxNumber].material.map = new THREE.TextureLoader().load('textures/oWin.png');
}

function start() {
    initScene();
    animate();
}
