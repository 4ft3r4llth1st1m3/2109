document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.flower-container');
    const numberOfFlowers = 30; // Puedes cambiar este número para tener más o menos flores

    for (let i = 0; i < numberOfFlowers; i++) {
        createFlower();
    }

    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        
        // Posición horizontal aleatoria
        flower.style.left = `${Math.random() * 100}vw`;

        // Duración de la animación aleatoria (entre 8 y 15 segundos)
        const duration = Math.random() * 7 + 8;
        flower.style.animationDuration = `${duration}s`;

        // Retraso aleatorio para que no empiecen todas a la vez
        const delay = Math.random() * 5;
        flower.style.animationDelay = `${delay}s`;
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 20; // Tamaño entre 20px y 40px
        flower.style.fontSize = `${size}px`;
        
        flower.innerHTML = '🌼'; // Emoji de la flor amarilla

        container.appendChild(flower);
    }
});
