// Get Scrubby 
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
// Get map content
const mapLibrary = {
    'background' : document.getElementById('map-library'),
    'furnishings': document.querySelector('library-furnishings'),
    'tables': document.getElementById('library-tables'),
    'bookcases': document.getElementById('library-bookcases'),
    'top-left-carpet': document.getElementById('library-top-left-carpet'),
    'top-right-carpet': document.getElementById('library-top-right-carpet'),
    'side-left-carpet': document.getElementById('library-side-left-carpet'),
    'side-right-carpet': document.getElementById('library-side-right-carpet')
};
const mapMaze = {
    'background' : document.getElementById('map-maze'),
    'furnishings': document.querySelector('maze-furnishings'),
    'walls': document.getElementById('maze-walls'),
    'floor': document.getElementById('maze-floor'),
    'top-left-carpet': document.getElementById('maze-top-left-carpet'),
    'top-right-carpet': document.getElementById('maze-top-right-carpet'),
    'side-left-carpet': document.getElementById('maze-side-left-carpet'),
    'side-right-carpet': document.getElementById('maze-side-right-carpet'),
    'open-chest-left': document.getElementById('maze-open-chest-left'),
    'open-chest-right': document.getElementById('maze-open-chest-right'),
};
const mapGallery = {
    'background' : document.getElementById('map-gallery'),
    'furnishings': document.querySelector('gallery-furnishings'),
    'halls': document.getElementById('gallery-halls'),
    'nice-ghosts1': document.getElementById('gallery-nice-ghosts1'),
};

// Get 'portals'
// const moveToMaze = document.getElementById('library-top-left-carpet');

map = 'library'; // Initial map

// Function to change the map displayed
function showMap(mapName) {
    if (mapName === 'library') {
        mapLibrary.style.display = 'block';
        mapMaze.style.display = 'none';
        mapGallery.style.display = 'none';
    } else if (mapName === 'maze') {
        mapLibrary["background"].style.display = 'none';
        mapMaze["background"].style.removeProperty('display');
        mapMaze["furnishings"].style.removeProperty('display');
        mapGallery["background"].style.display = 'none';
    } else if (mapName === 'gallery') {
        mapLibrary["background"].style.display = 'none';
        mapMaze["background"].style.display = 'none';
        mapGallery["background"].style.display = 'block';
    }
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
    const allFrames = [
        scrubbySitting, scrubbyRunL1, scrubbyRunL2, 
        scrubbyRunR1, scrubbyRunR2, scrubbyRunU1, 
        scrubbyRunU2, scrubbyRunD1, scrubbyRunD2, scrubbyBlock
    ];

    allFrames.forEach(scrubby => {
        scrubby.style.transform = transformString;
    });
}

const moveToMaze = document.getElementById('point1');

function checkCollision() {
    const rectOne = scrubby["scrubby-block"].getBoundingClientRect();
    const rectTwo = moveToMaze.getBoundingClientRect();

    if (rectOne.left < rectTwo.right &&
        rectOne.right > rectTwo.left &&
        rectOne.top < rectTwo.bottom &&
        rectOne.bottom > rectTwo.top) {
        scrubby["scrubby-block"].style.backgroundColor = 'black';
        showMap('maze'); 

        const runLeft = keys['a'] || keys['arrowleft'];
        const runRight = keys['d'] || keys['arrowright'];
        const runUp = keys['w'] || keys['arrowup'];
        const runDown = keys['s'] || keys['arrowdown'];

        // updatePositionBounceBack(runLeft, runRight, runUp, runDown);
    } else {
        moveToMaze.style.backgroundColor = 'purple';
    }
}

setInterval(checkCollision, 200);