import * as THREE from 
import { OrbitControls } from "map/OrbitControl";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1000;
camera.lookAt(0, 0, 0);

// // points
// let geo = new THREE.BufferGeometry();
// const vertex = new THREE.Vector3(1, -10, 0);
// const vertex2 = new THREE.Vector3(1, 10, 0);

// let vertices = []

// vertices.push(vertex);
// vertices.push(vertex2);

// geo.setAttribute('position', new THREE.Float32BufferAttribute(vertex, 2));

// // material
// const material = new THREE.PointsMaterial({ color: 0x888888 });
// let point = new THREE.Points(geo, material);

// //line
// const points = []
// points.push(new THREE.Vector3(-5, 0, 0))
// points.push(new THREE.Vector3(5, 0, 0))
// let geometry = new THREE.BufferGeometry().setFromPoints( points )
// let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x888888 }))
// console.log(line);
// scene.add(line)



// console.log(point);
// scene.add(point);

const vertices = [];

for ( let i = 0; i < 10000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread( 2000 );
	const y = THREE.MathUtils.randFloatSpread( 2000 );
	const z = THREE.MathUtils.randFloatSpread( 2000 );

	vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial( { color: 0x888888 } );

const points = new THREE.Points( geometry, material );

scene.add( points );



//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);



const controls = new OrbitControls(camera, rederer.domElement);

//animation
function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    constroles.update();
    renderer.render(scene, camera);
}


animate();


