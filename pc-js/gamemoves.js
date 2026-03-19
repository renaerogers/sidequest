const scrubbySitting = document.getElementById('scrub_sit');
const scrubbyRunL1 = document.getElementById('scrub_run_L1');
const scrubbyRunL2 = document.getElementById('scrub_run_L2');
const scrubbyRunR1 = document.getElementById('scrub_run_R1');
const scrubbyRunR2 = document.getElementById('scrub_run_R2');
const scrubbyRunU1 = document.getElementById('scrub_run_U1');
const scrubbyRunU2 = document.getElementById('scrub_run_U2');
const scrubbyRunD1 = document.getElementById('scrub_run_D1');
const scrubbyRunD2 = document.getElementById('scrub_run_D2');

const scrubbyBlock = document.getElementById('scrubby-block');

const keys = {};
let frame = 0;

document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

let x = 0; // Initial position of Scrubby
let y = 0; // Initial position of Scrubby
const speed = 30; // Speed of movement


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
    const allFrames = [
        scrubbySitting, scrubbyRunL1, scrubbyRunL2, 
        scrubbyRunR1, scrubbyRunR2, scrubbyRunU1, 
        scrubbyRunU2, scrubbyRunD1, scrubbyRunD2, scrubbyBlock
    ];

    allFrames.forEach(scrubby => {
        scrubby.style.transform = transformString;
    });
}

function startRunningLeftAnimation(runLeft) {
    if (runLeft) {
        // Alternate between run frames
        frame++;        
        scrubbySitting.style.display = 'none';
        scrubbyRunU1.style.display = 'none';
        scrubbyRunU2.style.display = 'none';
        scrubbyRunD1.style.display = 'none';
        scrubbyRunD2.style.display = 'none';
        scrubbyRunR1.style.display = 'none';
        scrubbyRunR2.style.display = 'none';

        if (frame % 2 === 0) {
            scrubbyRunL1.style.display = 'inline-block';
            scrubbyRunL2.style.display = 'none'; 
        } else {
            scrubbyRunL1.style.display = 'none';
            scrubbyRunL2.style.display = 'inline-block';
        }
    } else {
        // Reset to sitting
        scrubbySitting.style.display = 'inline-block';
        scrubbyRunL1.style.display = 'none';
        scrubbyRunL2.style.display = 'none';
        frame = 0; // Reset frame counter
    } 
}

function startRunningRightAnimation(runRight) {
    if (runRight) {
        // Alternate between run frames
        frame++;
        scrubbySitting.style.display = 'none';
        scrubbyRunU1.style.display = 'none';
        scrubbyRunU2.style.display = 'none';
        scrubbyRunD1.style.display = 'none';
        scrubbyRunD2.style.display = 'none';
        scrubbyRunL1.style.display = 'none';
        scrubbyRunL2.style.display = 'none';

        if (frame % 2 === 0) {
            scrubbyRunR1.style.display = 'inline-block';
            scrubbyRunR2.style.display = 'none'; 
        } else {
            scrubbyRunR1.style.display = 'none';
            scrubbyRunR2.style.display = 'inline-block';
        }
    } else {
        // Reset to sitting
        scrubbySitting.style.display = 'inline-block';
        scrubbyRunR1.style.display = 'none';
        scrubbyRunR2.style.display = 'none';
        frame = 0; // Reset frame counter
    }
}

function startRunningUpAnimation(runUp) {
    if (runUp) {
        // Alternate between run frames
        frame++;
        scrubbySitting.style.display = 'none';
        scrubbyRunD1.style.display = 'none';
        scrubbyRunD2.style.display = 'none';
        scrubbyRunR1.style.display = 'none';
        scrubbyRunR2.style.display = 'none';
        scrubbyRunL1.style.display = 'none';
        scrubbyRunL2.style.display = 'none';
        
        if (frame % 2 === 0) {
            scrubbyRunU1.style.display = 'inline-block';
            scrubbyRunU2.style.display = 'none'; 
        } else {
            scrubbyRunU1.style.display = 'none';
            scrubbyRunU2.style.display = 'inline-block';
        }
    } else {
        // Reset to sitting
        scrubbySitting.style.display = 'inline-block';
        scrubbyRunU1.style.display = 'none';
        scrubbyRunU2.style.display = 'none';
        frame = 0; // Reset frame counter
    } 
}

function startRunningDownAnimation(runDown) {
    if (runDown) {
        // Alternate between run frames
        frame++;
        scrubbySitting.style.display = 'none';
        scrubbyRunU1.style.display = 'none';
        scrubbyRunU2.style.display = 'none';
        scrubbyRunR1.style.display = 'none';
        scrubbyRunR2.style.display = 'none';
        scrubbyRunL1.style.display = 'none';
        scrubbyRunL2.style.display = 'none';

        if (frame % 2 === 0) {
            scrubbyRunD1.style.display = 'inline-block';
            scrubbyRunD2.style.display = 'none'; 
        } else {
            scrubbyRunD1.style.display = 'none';
            scrubbyRunD2.style.display = 'inline-block';
        }
    } else {
        // Reset to sitting
        scrubbySitting.style.display = 'inline-block';
        scrubbyRunD1.style.display = 'none';
        scrubbyRunD2.style.display = 'none';
        frame = 0; // Reset frame counter
    }
}

function gameLoop() {
    const runLeft = keys['a'] || keys['arrowleft'];
    const runRight = keys['d'] || keys['arrowright'];
    const runUp = keys['w'] || keys['arrowup'];
    const runDown = keys['s'] || keys['arrowdown'];

    updatePosition(runLeft, runRight, runUp, runDown);

    if (runLeft) {
        startRunningLeftAnimation(true);
        scrubbyBlock.style.width = '90px';
        scrubbyBlock.style.height = '50px';
    } else if (runRight) {
        startRunningRightAnimation(true);
        scrubbyBlock.style.width = '90px';
        scrubbyBlock.style.height = '50px';
    } else if (runUp) {
        startRunningUpAnimation(true);
        scrubbyBlock.style.width = '60px';
        scrubbyBlock.style.height = '90px';
    } else if (runDown) {
        startRunningDownAnimation(true);
        scrubbyBlock.style.width = '60px';
        scrubbyBlock.style.height = '90px';

    } else {
        startRunningLeftAnimation(false);
        startRunningRightAnimation(false);
        startRunningUpAnimation(false);
        startRunningDownAnimation(false);
        scrubbyBlock.style.width = '70px';
        scrubbyBlock.style.height = '80px';
    }
}
setInterval(gameLoop, 200); 

