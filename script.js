const characterContainer = document.querySelector('.character-container');
let positionY = 0;
let velocityY = 0;
let positionX = 0;
let direction = 0; // 0 pour s'arrêter, 1 pour droite, -1 pour gauche
const gravity = 0.5;
let timeCounter = 0; // Compteur de temps

function moveLeft(duration, children) {
    console.log('moveLeft');
    // translate to the left
    let counter = 0;
    const interval = setInterval(() => {
        positionX += 2;
        counter += 13;
        characterContainer.style.transform = `translate(${positionX}px, ${positionY}px)`;
        if (positionX >= window.innerWidth) {
            clearInterval(interval);
            removeWalkingAnimation(children);
        }
        if (counter >= duration) {
            clearInterval(interval);
            removeWalkingAnimation(children);
        }
    }
    , 13);
}

function moveRight(duration, children) {
    console.log('moveRight');
    // translate to the right
    let counter = 0;
    const interval = setInterval(() => {
        positionX -= 2;
        counter += 13;
        characterContainer.style.transform = `translate(${positionX}px, ${positionY}px)`;
        if (positionX <= 0) {
            clearInterval(interval);
            removeWalkingAnimation(children);
        }
        if (counter >= duration) {
            clearInterval(interval);
            removeWalkingAnimation(children);
        }
    }
    , 13);
}

function animate() {
    velocityY += gravity;
    positionY += velocityY;
    
    if (positionY + characterContainer.clientHeight > window.innerHeight) {
        positionY = window.innerHeight - characterContainer.clientHeight;
        velocityY *= -0.8;
    }


    // Appliquer la direction du mouvement
    positionX += direction * Math.random() * 5;

    // Assurer que la boîte reste dans les limites de la fenêtre
    if (positionX < 0) {
        positionX = 0;
        direction = 1;
    }
    if (positionX + characterContainer.clientWidth > window.innerWidth) {
        positionX = window.innerWidth - characterContainer.clientWidth;
        direction = -1;
    }

    characterContainer.style.transform = `translate(${positionX}px, ${positionY}px)`;
    
}

function spawnCharacter() {
    let counter = 0;
    const interval = setInterval(() => {
        animate();
        counter += 13;
        if (counter >= 6500) {
            clearInterval(interval);
            moveRandomly();
        }
    }, 13);
}

function spawnCharacterInstance(twitchUser = null) {
    //Create a new character instance (div) and append it to the character container
    const characterInstance = document.createElement('div');
    characterInstance.data.currentDirection = 1;
    characterInstance.classList.add('character');
    //add random horizontal position
    characterInstance.style.left = `${Math.random() * 100}%`;
    characterContainer.appendChild(characterInstance);
}

function animateCharacterInstance(characterInstance) {
    // animate the character instance
    // should move the character instance from left to right, and then from right to left, and so on
    // should call spawnCharacterInstance() every random interval, but between each interval, it should pause for a random duration, between 0 and 3000ms

    let velocityYInstance = 0;
    let positionYInstance = 0;
    let positionXInstance = 0;
    let directionInstance = 0; // 0 pour s'arrêter, 1 pour droite, -1 pour gauche
    const gravityInstance = 0.5;
    let timeCounterInstance = 0; // Compteur de temps
}


function moveLeftInstance(characterInstance, duration) {

    // translate to the left
    let counter = 0;
    const interval = setInterval(() => {
        positionXInstance += 2;
        counter += 13;
        characterInstance.style.transform = `translate(${positionXInstance}px, ${positionYInstance}px)`;
        if (positionXInstance >= window.innerWidth) {
            clearInterval(interval);
            removeWalkingAnimation(characterInstance);
        }
        if (counter >= duration) {
            clearInterval(interval);
            removeWalkingAnimation(characterInstance);
        }
    }
    , 13);

}

function moveRightInstance(characterInstance, duration) {
    
    // translate to the right
    let counter = 0;
    const interval = setInterval(() => {
        positionXInstance -= 2;
        counter += 13;
        characterInstance.style.transform = `translate(${positionXInstance}px, ${positionYInstance}px)`;
        if (positionXInstance <= 0) {
            clearInterval(interval);
            removeWalkingAnimation(characterInstance);
        }
        if (counter >= duration) {
            clearInterval(interval);
            removeWalkingAnimation(characterInstance);
        }
    }
    , 13);

}


function moveRandomly() {

    // should call moveLeft or moveRight every random interval, but between each interval, it should pause for a random duration, between 0 and 3000ms
    let intervalDuration = Math.random() * 3000;
    let elementBoxDOM = characterContainer.children[1];
    const interval = setInterval(() => {
        const randomDuration = Math.random() * 3000;
        const randomDirection = Math.random() > 0.5 ? 1 : -1;
        if (randomDirection === 1) {
            addWalkingAnimation(elementBoxDOM);
            moveRight(randomDuration, elementBoxDOM);

        } else {
            addWalkingAnimation(elementBoxDOM);
            moveLeft(randomDuration, elementBoxDOM);
        }
        clearInterval(interval);
        spawnCharacter();
    }
    , intervalDuration);


}

function addWalkingAnimation(element) {
    // add walking class to the element
    element.classList.add('walking');
}

function removeWalkingAnimation(element) {
    // remove walking class from the element
    element.classList.remove('walking');
}

spawnCharacter();


