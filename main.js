import * as THREE from 'three';
import Game from './src/game';

const game = new Game();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
game.world.add(cube);

game.mainCamera.instance.position.z = 5;
game.mainCamera.instance.position.y = 1;

game.run();

