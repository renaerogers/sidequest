// Get 'portals'
// const moveToMaze = document.getElementById('library-top-left-carpet');

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

