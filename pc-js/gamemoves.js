// Get Scrubby elements
const scrubby = {
    'sitting': document.getElementById('scrub_sit'),
    'runL1': document.getElementById('scrub_run_L1'),
    'runL2': document.getElementById('scrub_run_L2'),
    'runR1': document.getElementById('scrub_run_R1'),
    'runR2': document.getElementById('scrub_run_R2'),
    'runU1': document.getElementById('scrub_run_U1'),
    'runU2': document.getElementById('scrub_run_U2'),
    'runD1': document.getElementById('scrub_run_D1'),
    'runD2': document.getElementById('scrub_run_D2'),
    'scrubby-block': document.getElementById('scrubby-block')
};

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

// Get map content
const mapLibrary = document.getElementById('map-library');
const mapMaze = document.getElementById('map-maze');
const mapGallery = document.getElementById('map-gallery');

let map = 'library'; // Initial map

// Function to change the map displayed
function showMap(mapName) {
    if (mapName === 'library') {
        mapLibrary.style.display = 'block';
        mapMaze.style.display = 'none';
        mapGallery.style.display = 'none';
    } else if (mapName === 'maze') {
        mapLibrary.style.display = 'none';
        mapMaze.style.display = 'block';
        mapGallery.style.display = 'none';
    } else if (mapName === 'gallery') {
        mapLibrary.style.display = 'none';
        mapMaze.style.display = 'none';
        mapGallery.style.display = 'block';
    }
}

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

// Function to change Scrubby's position (post hitting a portal)
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
    const allFrames = [
        scrubbySitting, scrubbyRunL1, scrubbyRunL2, 
        scrubbyRunR1, scrubbyRunR2, scrubbyRunU1, 
        scrubbyRunU2, scrubbyRunD1, scrubbyRunD2, scrubbyBlock
    ];

    allFrames.forEach(scrubby => {
        scrubby.style.transform = transformString;
    });
}

function updateScrubbyBlock(mapName, direction) {
    // Use showMap function to check current map and adjust block size accordingly
    if (mapName == 'maze') {
        if (direction == 'runLeft') {
            scrubbyBlock.style.width = '45px';
            scrubbyBlock.style.height = '25px';
        } else if (direction == 'right') {
            scrubbyBlock.style.width = '45px';
            scrubbyBlock.style.height = '25px';
        } else if (direction == 'runUp') {
            scrubbyBlock.style.width = '30px';
            scrubbyBlock.style.height = '45px';
        } else if (direction == 'runDown') {
            scrubbyBlock.style.width = '30px';
            scrubbyBlock.style.height = '45px';
        } else {
            scrubbyBlock.style.width = '35px';
            scrubbyBlock.style.height = '40px';
        }
    } else {
        if (direction == 'runLeft') {
            scrubbyBlock.style.width = '90px';
            scrubbyBlock.style.height = '50px';
        } else if (direction == 'runRight') {
            scrubbyBlock.style.width = '90px';
            scrubbyBlock.style.height = '50px';
        } else if (direction == 'runUp') {
            scrubbyBlock.style.width = '60px';
            scrubbyBlock.style.height = '90px';
        } else if (direction == 'runDown') {
            scrubbyBlock.style.width = '60px';
            scrubbyBlock.style.height = '90px';
        } else {
            scrubbyBlock.style.width = '70px';
            scrubbyBlock.style.height = '80px';
        }
    }
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

function updateScrubbySize(mapName) {
    // Determine the width based on the mapName
    const sizes = {
        'library': '180px',
        'gallery': '180px',
        'maze':    '120px',
    };
    const newWidth = sizes[mapName]
    
    if (newWidth) {
        Object.entries(scrubby)
            .filter(([key]) => key !== 'scrubby-block')
            .forEach(([key, element]) => {
                if (element) {
                    element.style.width = newWidth;
                }
            });
            scrubby.scrubby-block.styles.width - '60'
            scrubby["scrubby-block"].styles.width - '60'

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
        updateScrubbyBlock(map, runLeft);
    } else if (runRight) {
        startRunningRightAnimation(true);
        updateScrubbyBlock(map,runRight);
    } else if (runUp) {
        startRunningUpAnimation(true);
        updateScrubbyBlock(map, runUp);
    } else if (runDown) {
        startRunningDownAnimation(true);
        updateScrubbyBlock(map, runDown);
    } else {
        startRunningLeftAnimation(false);
        startRunningRightAnimation(false);
        startRunningUpAnimation(false);
        startRunningDownAnimation(false);
        updateScrubbyBlock(map, false);
    }
}
setInterval(gameLoop, 200); 

const moveToMaze = document.getElementById('point1');

function checkCollision() {
    const rectOne = scrubby["scrubby-block"].getBoundingClientRect();
    const rectTwo = moveToMaze.getBoundingClientRect();

    if (rectOne.left < rectTwo.right &&
        rectOne.right > rectTwo.left &&
        rectOne.top < rectTwo.bottom &&
        rectOne.bottom > rectTwo.top && map == 'library') {
        scrubby["scrubby-block"].style.backgroundColor = 'black';
        showMap('maze'); 
        updateScrubbySize('maze')

        let map = 'maze'
        
        // const runLeft = keys['a'] || keys['arrowleft'];
        // const runRight = keys['d'] || keys['arrowright'];
        // const runUp = keys['w'] || keys['arrowup'];
        // const runDown = keys['s'] || keys['arrowdown'];

        // updatePositionBounceBack(runLeft, runRight, runUp, runDown);
    } else if (rectOne.left < rectTwo.right &&
        rectOne.right > rectTwo.left &&
        rectOne.top < rectTwo.bottom &&
        rectOne.bottom > rectTwo.top && map == 'library'){
        moveToMaze.style.backgroundColor = 'purple';
        showMap('library')
        updateScrubbySize('library')

        scrubby["scrubby-block"].style.backgroundColor = 'yellow';
    } else {
        moveToMaze.style.backgroundColor = 'purple';
    }
}

setInterval(checkCollision, 500);