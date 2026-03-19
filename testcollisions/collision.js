const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

let x = 0; // Initial position of Scrubby
let y = 0; // Initial position of Scrubby
const speed = 20; // Speed of movement

function updatePosition(runLeft, runRight, runUp, runDown) {
    if (runLeft) {
        x -= speed;
    }
    if (runRight) {
        x += speed;
    }
    if (runUp) {
        y -= speed;
    }
    if (runDown) {
        y += speed;
    }

    const transformString = `translate(${x}px, ${y}px)`;
    const blockOne = document.getElementById('one-container');

    blockOne.style.transform = transformString;
}

function updatePositionBounceBack(runLeft, runRight, runUp, runDown) {
    const bounceBackSpeed = speed * 2; 
    if (runLeft) {
        x += bounceBackSpeed;
    }
    if (runRight) {
        x -= bounceBackSpeed;
    }
    if (runUp) {
        y += bounceBackSpeed;
    }
    if (runDown) {
        y -= bounceBackSpeed;
    }

    const transformString = `translate(${x}px, ${y}px)`;
    const blockOne = document.getElementById('one-container');

    blockOne.style.transform = transformString;
}

function gameLoop() {
    const runLeft = keys['a'] || keys['arrowleft'];
    const runRight = keys['d'] || keys['arrowright'];
    const runUp = keys['w'] || keys['arrowup'];
    const runDown = keys['s'] || keys['arrowdown'];

    updatePosition(runLeft, runRight, runUp, runDown);
}
setInterval(gameLoop, 200); 

// function checkCollision() {
//     const blockOne = document.getElementById('one');
//     const blockTwo = document.getElementById('two');

//     const rectOne = blockOne.getBoundingClientRect();
//     const rectTwo = blockTwo.getBoundingClientRect();

//     if (rectOne.left < rectTwo.right &&
//         rectOne.right > rectTwo.left &&
//         rectOne.top < rectTwo.bottom &&
//         rectOne.bottom > rectTwo.top) {
//         blockOne.style.backgroundColor = 'black';

//         const runLeft = keys['a'] || keys['arrowleft'];
//         const runRight = keys['d'] || keys['arrowright'];
//         const runUp = keys['w'] || keys['arrowup'];
//         const runDown = keys['s'] || keys['arrowdown'];

//         updatePositionBounceBack(runLeft, runRight, runUp, runDown);
//     } else {
//         blockOne.style.backgroundColor = 'red';
//     }
// }

function checkRectCircleCollision(rectElement, circleElement) {
    const r = rectElement.getBoundingClientRect();
    const c = circleElement.getBoundingClientRect();

    const blockOne = document.getElementById('one');
    const blockTwo = document.getElementById('two');

    // 1. Get circle radius and center
    const radius = c.width / 2;
    const cx = c.left + radius;
    const cy = c.top + radius;

    // 2. Find the closest point on the rectangle to the circle center
    // Math.max(min, Math.min(value, max)) is the "clamping" formula
    const closestX = Math.max(r.left, Math.min(cx, r.right));
    const closestY = Math.max(r.top, Math.min(cy, r.bottom));

    // 3. Calculate the distance between the circle's center and this closest point
    const dx = cx - closestX;
    const dy = cy - closestY;

    // 4. Use distance squared for performance (avoiding Math.sqrt)
    const distanceSquared = (dx * dx) + (dy * dy);
    
    return distanceSquared < (radius * radius);
}

setInterval(checkCollision, 200);