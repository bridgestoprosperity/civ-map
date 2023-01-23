// console.log(points)
mapboxgl.accessToken =
  "pk.eyJ1IjoiYjJwIiwiYSI6ImNqeDhkY3NkMDBhaGY0MHQ4MW9xbHhkYWwifQ.xoxPf-dEtQW5CKf6AKf4fw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/b2p/cl37xak8m000115nx7jmv453u",
  zoom: 9,
  center: [-5.199118, 7.661786],
});
let toggle1 = document.getElementById("toggle1");
let toggle2 = document.getElementById("toggle2");
let toggle3 = document.getElementById("toggle3");
let toggle4 = document.getElementById("toggle4");
let toggle5 = document.getElementById("toggle5");
let toggle6 = document.getElementById("toggle6");
let toggle6a = document.getElementById("toggle6a");
let toggle7 = document.getElementById("toggle7");
let siteFinder = false;

// TOGGLE LOGIC
toggle1.addEventListener("change", function (e) {
  console.log(toggle1.checked);
  if (toggle1.checked === false) {
    map.setLayoutProperty("new_school_sites_poly", "visibility", "none");
    map.setLayoutProperty("new_school_sites", "visibility", "none");
    map.setLayoutProperty("new_school_sites_label", "visibility", "none");
  } else {
    map.setLayoutProperty("new_school_sites_poly", "visibility", "visible");
    map.setLayoutProperty("new_school_sites", "visibility", "visible");
    map.setLayoutProperty("new_school_sites_label", "visibility", "visible");
  }
});
toggle2.addEventListener("change", function (e) {
  console.log(toggle2.checked);
  if (toggle2.checked === false) {
    map.setLayoutProperty("osm_schools_poly", "visibility", "none");
    map.setLayoutProperty("osm_schools_polyicon", "visibility", "none");
    map.setLayoutProperty("osm_schools", "visibility", "none");
  } else {
    map.setLayoutProperty("osm_schools_poly", "visibility", "visible");
    map.setLayoutProperty("osm_schools_polyicon", "visibility", "visible");
    map.setLayoutProperty("osm_schools", "visibility", "visible");
  }
});
toggle3.addEventListener("change", function (e) {
  console.log(toggle3.checked);
  if (toggle3.checked === false) {
    map.setLayoutProperty("new_sp_roads", "visibility", "none");
    map.setLayoutProperty("new_bouake_roads", "visibility", "none");
    map.setLayoutProperty("new_bouake_roads copy", "visibility", "none");
    map.setLayoutProperty("new_sp_roads copy", "visibility", "none");
  } else {
    map.setLayoutProperty("new_sp_roads", "visibility", "visible");
    map.setLayoutProperty("new_bouake_roads", "visibility", "visible");
    map.setLayoutProperty("new_bouake_roads copy", "visibility", "visible");
    map.setLayoutProperty("new_sp_roads copy", "visibility", "visible");
  }
});
toggle4.addEventListener("change", function (e) {
  console.log(toggle4.checked);
  if (toggle4.checked === false) {
    map.setLayoutProperty("electric_lines", "visibility", "none");
    map.setLayoutProperty("electric_stations", "visibility", "none");
  } else {
    map.setLayoutProperty("electric_lines", "visibility", "visible");
    map.setLayoutProperty("electric_stations", "visibility", "visible");
  }
});
toggle5.addEventListener("change", function (e) {
  console.log(toggle5.checked);
  if (toggle5.checked === false) {
    map.setLayoutProperty("satellite", "visibility", "none");
  } else {
    map.setLayoutProperty("satellite", "visibility", "visible");
  }
});
toggle6.addEventListener("change", function (e) {
  console.log(toggle6.checked);
  if (toggle6.checked === false) {
    map.setLayoutProperty("contour-line", "visibility", "none");
  } else {
    map.setLayoutProperty("contour-line", "visibility", "visible");
  }
});
toggle6a.addEventListener("change", function (e) {
  console.log(toggle6a.checked);
  if (toggle6a.checked === false) {
    map.setLayoutProperty("population", "visibility", "none");
  } else {
    map.setLayoutProperty("population", "visibility", "visible");
    if (map.getZoom() < 10.5) {
      map.flyTo({
        zoom: 10.5,
      });
    }
  }
});
toggle7.addEventListener("change", function (e) {
  console.log(toggle7.checked);
  if (toggle7.checked === false) {
    siteFinder = false;
  } else {
    siteFinder = true;
  }
});

// Wait until the map has finished loading.

// TURFNEAREST METHOD
map.on("click", (e) => {
  if (toggle7.checked === true) {
    var targetPoint = turf.point([e.lngLat.lng, e.lngLat.lat]);
    console.log(e);
    console.log("target point is");
    console.log(targetPoint.geometry.coordinates);
    var from = targetPoint;
    var nearest = turf.nearestPoint(targetPoint.geometry, allosms);
    console.log(nearest);
    map.getSource("schoolPoints").setData(nearest, e.lngLat);
    // var to = nearest;
    // var options = {
    //     units: 'miles'
    // }; // var distance = turf.distance(from, to, options);
    // map.getSource('nearest').setData(nearest);
  }
});

// TILEQUERY ONLY
// map.on('click', async(e) => {
//     if (toggle7.checked === true) {

//         const longitude = e.lngLat.lng;
//         const latitude = e.lngLat.lat;
//         const tilesetid = 'b2p.03p97p0i';
//         const layer = 'civ_osm_schools-53jnzh';
//         const radius = 100000;
//         const limit = 50;
//         const query = await fetch(
//             `https://api.mapbox.com/v4/${tilesetid}/tilequery/${longitude},${latitude}.json?radius=${radius}&limit=${limit}&layers=${layer}&access_token=${mapboxgl.accessToken}`, { method: 'GET' }
//         );
//         const json = await query.json();
//         console.log(json)
//         map.getSource('tqschools').setData(json);
//     }
// });
// TOGGLE LOGIC END

map.on("load", () => {
  map.addSource("schoolPoints", {
    // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  map.addSource("schoolLine", {
    // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  map.addLayer({
    id: "nearestSchools",
    // References a source that's already been defined
    source: "schoolPoints",
    type: "circle",
    paint: {
      // Mapbox Style Specification paint properties
      // "circle-color": [
      //     'match', ['get', 'type'],
      //     'Beach',
      //     '#FFBF00',
      //     "#ADD8E6"
      // ],
      "circle-radius": 10,
      "circle-color": "#FFBF00",
      "circle-opacity": 0.5,
    },
    layout: {
      visibility: "visible",
    },
  });
  map.addLayer({
    id: "nearestSchoolsLine",
    // References a source that's already been defined
    source: "schoolLine",
    type: "circle",
    paint: {
      // Mapbox Style Specification paint properties
      // "circle-color": [
      //     'match', ['get', 'type'],
      //     'Beach',
      //     '#FFBF00',
      //     "#ADD8E6"
      // ],
      "circle-radius": 10,
      "circle-color": "#FFBF00",
      "circle-opacity": 1,
    },
    layout: {
      visibility: "visible",
    },
  });
  // FEATURE STATE EXAMPLE
  // paint: {
  //     'circle-color': [
  //         'case', ['!=', ['feature-state', 'nearby'], null],
  //         '#FFBF00',
  //         'cornflowerblue'
  //     ],
  //     'circle-opacity': [
  //         'case', ['!=', ['feature-state', 'nearby'], null],
  //         1,
  //         0
  //     ],

  //     'circle-radius': 10
  // },

  // TODO:
  // On load add both school layers and style them accordingly
  // change turf function to find nearest school and change styling
  // add line between clicked point and nearest school with distance number
  // add population data viz
  // map.addSource('osmschools_civ.js', {
  //     type: 'geojson',
  //     data: beachespoi
  // });
  // map.addLayer({
  //     'id': 'beachespoi',
  //     'type': 'circle',
  //     'source': 'beachespoi',
  //     'paint': {

  //         'circle-radius': 3,
  //         'circle-color': 'blue',
  //         'circle-stroke-color': 'white',
  //         'circle-stroke-width': 1
  //     },
  //     layout: {
  //         // Mapbox Style Specification layout properties
  //         "visibility": "none"
  //     }
  // });
  map.setLayoutProperty("electric_lines", "visibility", "none");
  map.setLayoutProperty("electric_stations", "visibility", "none");
  map.setLayoutProperty("contour-line", "visibility", "none");
  map.setLayoutProperty("satellite", "visibility", "none");

  map.on("click", "population", (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates[0][0].slice();
    const description = e.features[0].properties.vectorpop;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup().setLngLat(coordinates).setHTML("Population: " + description).addTo(map);
  });
  map.on("mouseenter", "population", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "population", () => {
    map.getCanvas().style.cursor = "";
  });
});
