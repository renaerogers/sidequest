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
    'runD2': document.getElementById('scrub_run_D2')
};
// Get map content
const mapLibrary = {
    'background' : document.getElementById('map-library'),
    'tables': document.getElementById('library-tables'),
    'bookcases': document.getElementById('library-bookcases'),
    'top-left-carpet': document.getElementById('library-top-left-carpet'),
    'top-right-carpet': document.getElementById('library-top-right-carpet'),
    'side-left-carpet': document.getElementById('library-side-left-carpet'),
    'side-right-carpet': document.getElementById('library-side-right-carpet')
};
const mapMaze = {
    'background' : document.getElementById('map-maze'),
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
    'halls': document.getElementById('gallery-halls'),
    'nice-ghosts1': document.getElementById('gallery-nice-ghosts1'),
};

// Get 'portals'
const moveToMaze = document.getElementById('library-top-left-carpet');

map = 'library'; // Initial map

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

function checkPortalCollision() {
    const scrubbyRect = scrubbySitting.getBoundingClientRect();
    const portalRect = moveToMaze.getBoundingClientRect();

    if (scrubbyRect.left < portalRect.right &&
        scrubbyRect.right > portalRect.left &&
        scrubbyRect.top < portalRect.bottom &&
        scrubbyRect.bottom > portalRect.top) {
        changeMap('maze');
    }
}

// Map changes when Scrubby touches certain points  
function changeMap (mapName) {
        showMap(mapName);
    }
