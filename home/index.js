// // add a bootstrap button to the dom
// var crazyname = document.createElement('button');
// crazyname.className = 'btn btn-secondary';
// crazyname.innerHTML = 'Click me';
// document.body.appendChild(crazyname);

// // link button to click
// crazyname.addEventListener('click', function() {
//   alert('You clicked me!');
// });

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w5bjYzdXlyMDNyOTNycDh4YnB1dWV5eiJ9.vhIIq0L5So522RkERq7MNQ';
let toggleOff = ['contour-line', 'contour-label'];
let toggleOn = [];
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/highestroad/cld5bfitu000301p96dc9i99q', // style URL
center: [-5.5471, 7.5399], // starting position [lng, lat]
zoom: 9, // starting zoom
});

// on map load make contour-line layer not visible
map.on('load', function() {
    // for item in toggleLayers
    for (let i = 0; i < toggleOff.length; i++) {
        map.setLayoutProperty(toggleOff[i], 'visibility', 'none');
    }
});