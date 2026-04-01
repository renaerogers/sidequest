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
const mapLibrary = document.getElementById('map-library');

const mapMaze = document.getElementById('map-maze');

const mapGallery = document.getElementById('map-gallery');

// Get 'portals'
// const moveToMaze = document.getElementById('library-top-left-carpet');

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

// Function to change Scrubby's position
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

// Function to change Scrubby's size depending on the map displayed 
// function updateScrubbySize(mapName) {
//     if (mapName === 'library') {
//         const scrubbyChanges = scrubby.filter(([key, value]) => {
//             return key != 'scrubby-block'; 
//         }).map((key) => {
//             return key.value.style.width = '180px'
//         });
//     } else if (mapName === 'maze') {
//         const scrubbyChanges = scrubby.filter(([key, value]) => {
//             return key != 'scrubby-block'; 
//         }).map((key) => {
//             return key.value.style.width = '120px'
//         });
//     }
// }

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

// function updateScrubbyBlock(mapName) {
//     console.log(mapName + "Please finish this function.")

//     const sizes = {
//         'library': '180px',
//         'gallery': '180px',
//         'maze':    '120px',
//     };
//     const newWidth = sizes[mapName]
    
//     if (newWidth) {
//         Object.entries(scrubby)
//             .filter(([key]) => key !== 'scrubby-block')
//             .forEach(([key, element]) => {
//                 if (element) {
//                     element.style.width = newWidth;
//                 }
//             });
//             scrubby.scrubby-block.styles.width - '60'
//             scrubby["scrubby-block"].styles.width - '60'

//     }   
// }

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