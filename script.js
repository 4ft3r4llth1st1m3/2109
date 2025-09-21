document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para las flores de fondo ---
    const container = document.querySelector('.flower-container');
    const numberOfFlowers = 30;

    for (let i = 0; i < numberOfFlowers; i++) {
        createBackgroundFlower();
    }

    function createBackgroundFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        
        flower.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 7 + 8;
        flower.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 5;
        flower.style.animationDelay = `${delay}s`;
        
        const size = Math.random() * 20 + 20;
        flower.style.fontSize = `${size}px`;
        
        flower.innerHTML = '🌼';

        container.appendChild(flower);
    }

    // --- Lógica para la flor 3D con Three.js ---
    const flower3DContainer = document.getElementById('flower-3d-container');
    if (flower3DContainer) {
        // 1. Escena
        const scene = new THREE.Scene();
        scene.background = null; // Fondo transparente

        // 2. Cámara
        const camera = new THREE.PerspectiveCamera(75, flower3DContainer.offsetWidth / flower3DContainer.offsetHeight, 0.1, 1000);
        camera.position.z = 2; // Acercamos la cámara

        // 3. Renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true para fondo transparente
        renderer.setSize(flower3DContainer.offsetWidth, flower3DContainer.offsetHeight);
        flower3DContainer.appendChild(renderer.domElement);

        // Ajustar el tamaño del renderizador si el contenedor cambia de tamaño
        window.addEventListener('resize', () => {
            camera.aspect = flower3DContainer.offsetWidth / flower3DContainer.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(flower3DContainer.offsetWidth, flower3DContainer.offsetHeight);
        });

        // 4. Crear la Flor 3D (pétalos y centro)
        const flowerGroup = new THREE.Group();

        // Material amarillo brillante para los pétalos
        const petalMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFF00, emissive: 0x999900 });

        // Pétalos (usaremos formas planas y las rotaremos)
        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.quadraticCurveTo(0.1, 0.2, 0, 0.5);
        petalShape.quadraticCurveTo(-0.1, 0.2, 0, 0);

        const extrudeSettings = {
            steps: 1,
            depth: 0.05,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 1
        };
        const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);

        const numPetals = 8;
        for (let i = 0; i < numPetals; i++) {
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            petal.position.y = 0.25; // Posicionar el pétalo desde el centro
            petal.rotation.z = (Math.PI * 2 / numPetals) * i; // Rotar alrededor del centro
            petal.position.x = 0.1; // Alejar un poco del centro
            flowerGroup.add(petal);
        }

        // Centro de la flor
        const centerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const centerMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 }); // Dorado
        const flowerCenter = new THREE.Mesh(centerGeometry, centerMaterial);
        flowerGroup.add(flowerCenter);

        scene.add(flowerGroup);

        // 5. Luces (para que se vea el 3D)
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Luz ambiental suave
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1); // Luz desde la cámara
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // 6. Controles de órbita para interactividad (arrastrar y girar)
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Efecto de suavizado al girar
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.enableZoom = false; // Deshabilitar el zoom
        controls.enablePan = false; // Deshabilitar el paneo
        
        // 7. Animación
        function animate() {
            requestAnimationFrame(animate);

            // Rotación automática de la flor si no se está interactuando
            if (!controls.enabled || !controls.isRotating) { // Solo rota si los controles no están activos o no se está arrastrando
                flowerGroup.rotation.y += 0.005;
                flowerGroup.rotation.x += 0.002;
            }
            
            controls.update(); // Actualiza los controles si el usuario está interactuando
            renderer.render(scene, camera);
        }
        animate();
    }
});
