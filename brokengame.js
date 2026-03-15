const scrubbySitting = document.getElementById('scrub_sit');
const scrubbyRunL1 = document.getElementById('scrub_run_L1');
const scrubbyRunL2 = document.getElementById('scrub_run_L2');
const scrubbyRunR1 = document.getElementById('scrub_run_R1');
const scrubbyRunR2 = document.getElementById('scrub_run_R2');
const keys = {};
let frameL = 0;
let frameR = 0;

// function startRunningLeftAnimation() {
//     scrubbySitting.style.display = 'none';
//     scrubbyRun1.style.display = 'inline-block';
//     scrubbyRun2.style.display = 'none';
//     setTimeout(() => {
//         scrubbyRun1.style.display = 'none';
//         scrubbyRun2.style.display = 'inline-block';
//     }, 250);
// }  

// function stopRunningLeftAnimation() {
//     scrubbySitting.style.display = 'inline-block';
//     scrubbyRun1.style.display = 'none';
//     scrubbyRun2.style.display = 'none';
// }

function startRunningLeftAnimation(runLeft) {
    if (runLeft) {
        // Alternate between run frames
        frameL++;
        scrubbySitting.style.display = 'none';
        scrubbyRunR1.style.display = 'none';
        scrubbyRunR2.style.display = 'none';

        if (frameL % 2 === 0) {
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
        frameL = 0; // Reset frame counter
    } 
}

document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

function gameLoopLeft(runLeft) {
    const runLeft = keys['a'] || keys['arrowleft'];

    if (runLeft) {
        startRunningLeftAnimation(true);
        console.log('Running left');
    } else {
        startRunningLeftAnimation(false);
        frame = 0; // Reset frame counter when not running
    }
}
setInterval(gameLoopLeft, 300); 

function startRunningRightAnimation(runRight) {
    if (runRight) {
        // Alternate between run frames
        frameR++;
        scrubbySitting.style.display = 'none';
        scrubbyRunL1.style.display = 'none';
        scrubbyRunL2.style.display = 'none';

        if (frameR % 2 === 0) {
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
        frameR = 0; // Reset frame counter
    }
}

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function gameLoopRight(runRight) {
    const runRight = keys['d'] || keys['arrowright'];

    if (runRight) {
        startRunningRightAnimation(true);
        console.log('Running right');
    } else {
        startRunningRightAnimation(false);
        frameR = 0; // Reset frame counter when not running
    }
}
setInterval(gameLoopRight, 300);
