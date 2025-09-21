// --- Lógica para las flores de fondo que caen ---
document.addEventListener('DOMContentLoaded', () => {
    const backgroundFlowerContainer = document.querySelector('.flower-container');
    const numberOfFlowers = 30;

    for (let i = 0; i < numberOfFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = '🌼';
        
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.animationDuration = `${Math.random() * 7 + 8}s`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flower.style.fontSize = `${Math.random() * 20 + 20}px`;
        
        backgroundFlowerContainer.appendChild(flower);
    }
});


// --- Lógica para la flor 3D interactiva ---
const canvasContainer = document.getElementById('flower-3d-canvas');

// 1. Escena y Cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
camera.position.z = 5;

// 2. Renderizador (con fondo transparente)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

// 3. Controles para girar la flor
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true; // La flor girará sola
controls.autoRotateSpeed = 2.0;

// 4. Luces para que la flor se vea bien
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 5. Creación de la Flor 3D (método más simple y seguro)
const flowerGroup = new THREE.Group();

// Materiales
const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); // Amarillo dorado
const centerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Café para el centro

// Geometría del pétalo (una elipse simple)
const petalGeometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI);
petalGeometry.scale(0.5, 1, 0.1); // Aplastar la esfera para que parezca un pétalo

// Crear y posicionar los pétalos
const petalCount = 8;
for (let i = 0; i < petalCount; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    const angle = (i / petalCount) * Math.PI * 2;
    petal.position.x = Math.cos(angle) * 1.5;
    petal.position.y = Math.sin(angle) * 1.5;
    petal.rotation.z = angle + Math.PI / 2;
    flowerGroup.add(petal);
}

// Centro de la flor
const centerGeometry = new THREE.SphereGeometry(0.8, 32, 16);
const center = new THREE.Mesh(centerGeometry, centerMaterial);
flowerGroup.add(center);

scene.add(flowerGroup);

// 6. Bucle de animación para renderizar todo
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualiza los controles (para la rotación automática)
    renderer.render(scene, camera);
}

animate();

// Ajustar el tamaño si la ventana cambia
window.addEventListener('resize', () => {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
});
