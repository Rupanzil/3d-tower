import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Node } from './nodes.js';
import { createLine } from './lineUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
cube.translateY(0.5)
// scene.add( cube );

// add sphere to the scene
const sphereGeometry = new THREE.SphereGeometry(2.5, 30, 30)
const sphereMaterial = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe:false
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.translateY(3)
// scene.add( sphere )

// adding a plane geometry as a grid
const planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const planeMaterial = new THREE.MeshBasicMaterial( {
	color: 0xffff00ff, 
	side: THREE.DoubleSide,
	wireframe: true
} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// scene.add( plane );

// adding axes helper
const axes = new THREE.AxesHelper(3)
scene.add( axes )

//adding gridHelper
const gridHelper = new THREE.GridHelper(20, 20)
scene.add(gridHelper)

const controls = new OrbitControls( camera, renderer.domElement)

camera.position.set( 10 , 10, 10)

//+++++++++++++++++++++++++++++++++++
// logic for tower geometry

let nodes = [];
nodes.push(new Node(2, 0, 2))
nodes.push(new Node(2, 0, -2))
nodes.push(new Node(-2, 0, -2))
nodes.push(new Node(-2, 0, 2))

nodes.push(new Node(1.5, 3, 1.5))
nodes.push(new Node(1.5, 3, -1.5))
nodes.push(new Node(-1.5, 3, -1.5))
nodes.push(new Node(-1.5, 3, 1.5))


let members = []
members.push(createLine(nodes[0], nodes[1]))
members.push(createLine(nodes[1], nodes[2]))
members.push(createLine(nodes[2], nodes[3]))
members.push(createLine(nodes[3], nodes[0]))

members.push(createLine(nodes[4], nodes[5]))
members.push(createLine(nodes[5], nodes[6]))
members.push(createLine(nodes[6], nodes[7]))
members.push(createLine(nodes[7], nodes[4]))

members.push(createLine(nodes[0], nodes[4]))
members.push(createLine(nodes[1], nodes[5]))
members.push(createLine(nodes[2], nodes[6]))
members.push(createLine(nodes[3], nodes[7]))

// making DL face
for ( let i = 0; i < 4; i++ ) {
	if ( i !== 0) {
		members.push(createLine(nodes[i], nodes[i + 3]))
	} else {
		members.push(createLine(nodes[i], nodes[7]))
	}
}



scene.add(...members)

// Function to create a text sprite
function createTextSprite(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 20px Arial';
    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 20; // Adjust as needed
    canvas.width = textWidth;
    canvas.height = textHeight;
    context.font = 'Bold 10px Arial'; // Reset font after resizing canvas
    context.fillStyle = 'white';
    context.fillText(text, 0, 20);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    sprite.position.copy(position);
    // sprite.position.y -= textHeight / 2; // Offset position by half of text height

    return sprite;
}


// Create text sprites for each node
const nodeSprites = [];
for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const text = `${i + 1}`;
    const sprite = createTextSprite(text, node.position);
    scene.add(sprite);
    nodeSprites.push(sprite);
}

//+++++++++++++++++++++++++++++++++++

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

    controls.update();

	renderer.render( scene, camera );
}

animate();