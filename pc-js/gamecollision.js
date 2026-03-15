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

function isPixelCollision(scrubby, sprite2) {
    // 1. Check for bounding box overlap first (omitted for brevity, but recommended)

    // 2. Get the overlapping region
    // Calculate the intersection coordinates
    const cropX = Math.max(scrubby.x, sprite2.x);
    const cropY = Math.max(scrubby.y, sprite2.y);
    const cropWidth = Math.min(scrubby.x + scrubby.width, sprite2.x + sprite2.width) - cropX;
    const cropHeight = Math.min(scrubby.y + scrubby.height, sprite2.y + sprite2.height) - cropY;

    if (cropWidth <= 0 || cropHeight <= 0) return false; // No overlap

    // Draw sprites to temporary canvases to get pixel data
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = scrubby.width;
    canvas1.height = scrubby.height;
    ctx1.drawImage(scrubby.image, 0, 0); // Assuming scrubby has an 'image' property

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = sprite2.width;
    canvas2.height = sprite2.height;
    ctx2.drawImage(sprite2.image, 0, 0);

    // Get image data for the overlapping region (relative to each sprite's canvas)
    const imgData1 = ctx1.getImageData(cropX - scrubby.x, cropY - scrubby.y, cropWidth, cropHeight).data;
    const imgData2 = ctx2.getImageData(cropX - sprite2.x, cropY - sprite2.y, cropWidth, cropHeight).data;

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
