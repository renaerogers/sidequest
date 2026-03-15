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

const teleportPoints = {
    'library-top-left-carpet': document.querySelector('#library-top-left-carpet'),
    'maze-open-chest-left': document.querySelector('#maze-open-chest-left'),
    'maze-open-chest-right': document.querySelector('#maze-open-chest-right'),
    'gallery-nice-ghosts1': document.querySelector('#gallery-nice-ghosts1')
};

let teleportPoint = teleportPoints['library-top-left-carpet']; // Test teleport point
function isPixelCollision(scrubby, teleportPoint) {
    // 1. Check for bounding box overlap first (omitted for brevity, but recommended)

    // 2. Get the overlapping region
    // Calculate the intersection coordinates
    const cropX = Math.max(scrubby.x, teleportPoint.x);
    const cropY = Math.max(scrubby.y, teleportPoint.y);
    const cropWidth = Math.min(scrubby.x + scrubby.width, teleportPoint.x + teleportPoint.width) - cropX;
    const cropHeight = Math.min(scrubby.y + scrubby.height, teleportPoint.y + teleportPoint.height) - cropY;

    if (cropWidth <= 0 || cropHeight <= 0) return false; // No overlap

    // Draw sprites to temporary canvases to get pixel data
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = scrubby.width;
    canvas1.height = scrubby.height;
    ctx1.drawImage(scrubby.image, 0, 0); // Assuming scrubby has an 'image' property

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = teleportPoint.width;
    canvas2.height = teleportPoint.height;
    ctx2.drawImage(teleportPoint.image, 0, 0); 

    // Get image data for the overlapping region (relative to each sprite's canvas)
    const imgData1 = ctx1.getImageData(cropX - scrubby.x, cropY - scrubby.y, cropWidth, cropHeight).data;
    const imgData2 = ctx2.getImageData(cropX - teleportPoint.x, cropY - teleportPoint.y, cropWidth, cropHeight).data;

    // 3. and 4. Check alpha values in the overlap
    for (let i = 0; i < imgData1.length; i += 4) {
        const alpha1 = imgData1[i + 3];
        const alpha2 = imgData2[i + 3];

        // 5. Detect collision if both pixels are not fully transparent
        if (alpha1 > 0 && alpha2 > 0) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

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
let mapName = 'library'; // Initial map

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

function teleportScrubby() {
    if (isPixelCollision(scrubby, teleportPoint) == true) {
        // Handle teleportation logic
        showMap('maze'); // Example: change to maze map on collision
    }
}

function gameLoop() {
    teleportScrubby(); 
    requestAnimationFrame(gameLoop);
}
gameLoop(); // Start checking 