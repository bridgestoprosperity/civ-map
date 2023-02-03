import * as hov from "./hoverFunctions.js";

// FUNCTIONS
function queryFeatures(feature) {
  var features = map.queryRenderedFeatures({ layers: [feature] });
}

function updateVisibilty(hide, show) {
  for (let l in hide) {
    map.setLayoutProperty(hide[l], "visibility", "none");
  }
  for (let l in show) {
    map.setLayoutProperty(show[l], "visibility", "visible");
  }
}

function updateInteractive(layers) {
  for (let l in layers) {
    map.on("mousemove", layers[l], (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (popupVisible != true) {
        hov.liveDataHandler(e.features[0]);
      }
      if (e.features.length > 0) {
        // This sets feature state to hover: false. I think this is a fallback in case there are preset feature states
        if (hoveredFeatureID !== null) {
          map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredFeatureID }, { hover: false });
        }

        hoveredFeatureID = e.features[0].id;
        map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredFeatureID }, { hover: true });
        // Debugging - This logs the feature's feature state
        // console.log(map.getFeatureState({
        //   source: 'civ-assesment',
        //   sourceLayer: 'civ-assessments-v2-4b6mhv',
        //   id: e.features[0].id
        //   }));
      }
    });
    // Popup Code
    map.on("click", showList[l], (e) => {
      popupVisible = false;
      hov.liveDataHandler(e.features[0]);
      popupVisible = true;
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      let properties = e.features[0].properties;
      let blockingList = [];
      let blockingString = "";
      if (properties["Education access blocked by river"].includes("Primary") !== false) {
        blockingList.push("Primary School");
      }
      if (properties["Education access blocked by river"].includes("Secondary") !== false) {
        blockingList.push("Secondary School");
      }
      if (properties["Education access blocked by river"].includes("University") !== false) {
        blockingList.push("University");
      }
      if (properties["Health access blocked by river"].includes("Hospital") !== false) {
        blockingList.push("Hospital");
      }
      if (properties["Health access blocked by river"].includes("Clinic") !== false) {
        blockingList.push("Clinic");
      }
      if (properties["Health access blocked by river"].includes("Pharmacy") !== false) {
        blockingList.push("Pharmacy");
      }

      if (blockingList.length > 1) {
        let last = blockingList.pop();
        blockingString = blockingList.join(", ") + " and " + last + " Blocked";
      } else if (blockingList.length == 1) {
        blockingString = blockingList[0] + " Blocked";
      } else {
        blockingString = "";
      }

      let name = "Name: " + properties["Bridge Name"];
      let village = "Village: " + properties["Bridge Opportunity: Level 4 Government"];
      let days = "Days Flooded: " + properties["Days per year river is flooded"];
      let width = "River Width: " + properties["Width of River During Flooding (m)"] + "m";
      let mortality = "Deaths: " + properties["River crossing deaths in last 3 years"];
      let blocking = "Blocking: " + blockingString;
      let rejected = "Rejected: " + properties["Flag for Rejection"];

      let popupList = [name, village, days, width, mortality, blocking, rejected];

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML("<div class='popup-custom'>" + popupList.join("<br>") + "</div>")
        .on("close", (e) => {
          popupVisible = false;
        })
        .addTo(map);
    });

    map.on("mouseleave", showList[l], () => {
      map.getCanvas().style.cursor = "";
      if (popupVisible != true) {
        hov.reset();
      }
      // This sets feature state to hover: false when the mouse leaves.
      if (hoveredFeatureID !== null) {
        map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredFeatureID }, { hover: false });
      }
      hoveredFeatureID = null;
    });
  }
}

function addClusters(layer) {
  // query map to see if there are any cluster layers visible
  // var visibleClusterLayerIds = map.getStyle().layers.filter(function(layer) {
  //   return layer.type === 'circle' && layer.layout['cluster'] === true;
  // }
  // ).map(function(layer) {
  //   return layer.id;
  // }
  // );
  // add a cluster layer from sites-source
}

// PLACEHOLDER
var idList = ["optionsRadios1", "optionsRadios2", "optionsRadios3", "optionsRadios4", "optionsRadios5", "optionsRadios6", "optionsRadios7", "optionsRadios8", "civ-button", "sp-button", "gbk-button", "switch1", "switch2", "switch3", "map"];

// Buttons
document.getElementById("civ-button").addEventListener("click", () => {
  map.flyTo({
    center: [-7.014, 7.426],
    zoom: [6.37],
    essential: true,
  });
});
document.getElementById("sp-button").addEventListener("click", () => {
  map.flyTo({
    center: [-7.3104, 5.0183],
    zoom: [8.74],
    essential: true,
  });
});
document.getElementById("gbk-button").addEventListener("click", () => {
  map.flyTo({
    center: [-5.4848, 7.6856],
    zoom: [9.0],
    essential: true,
  });
});

// RADIOS

document.getElementById("optionsRadios1").addEventListener("click", () => {
  showList = ["site-pins", "site-dots"];
  hideList = ["days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
  // DELETE this eventually
});
document.getElementById("optionsRadios2").addEventListener("click", () => {
  showList = ["days-flooded-label", "days-flooded"];
  hideList = ["site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
});
document.getElementById("optionsRadios3").addEventListener("click", () => {
  showList = ["river-width-label", "river-width"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
});
document.getElementById("optionsRadios4").addEventListener("click", () => {
  showList = ["mortality", "mortality-label"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
});
document.getElementById("optionsRadios5").addEventListener("click", () => {
  showList = ["healthcare-block", "healthcare-block-pin"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
});
document.getElementById("optionsRadios6").addEventListener("click", () => {
  showList = ["education-block", "education-block-pin"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  hov.reset();
});

// FILTERS
// when switch1 is checked print hello world
document.getElementById("switch1").addEventListener("click", () => {
  if (document.getElementById("switch1").checked) {
    updateVisibilty(null, ["gbk-village-radius-fill", "sp-village-radius-fill", "gbk-village-radius-line", "sp-village-radius-line"]);
  } else {
    updateVisibilty(["gbk-village-radius-fill", "sp-village-radius-fill", "gbk-village-radius-line", "sp-village-radius-line"], null);
  }
});

// BASIC MAPBOX STUFF
mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w5bjYzdXlyMDNyOTNycDh4YnB1dWV5eiJ9.vhIIq0L5So522RkERq7MNQ";
// let toggleOff = ['contour-line', 'contour-label'];
// let toggleOn = [];

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/cldcajdxm000201qe1r6nt7j2", // style URL
  center: [-7.014, 7.426], // starting position [lng, lat]
  zoom: 6.37, // starting zoom
  minZoom: 6,
  hash: true,
});

// VARIABLES
let villageRadiusLayers = ["sp-vil-radius-line", "gbk-vil-radius-line", "sp-vil-radius-fill ", "gbk-vil-radius-fill", "sp-vil-radius-line-shadow", "gbk-vil-radius-line-shadow"];

let glowColor = "hsl(78, 83%, 69%)";
let glowColorLight = "hsl(78, 85%, 84%)";
let hoveredFeatureID = null;
var showList = ["site-pins", "site-dots"];
var hideList = ["days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
updateInteractive(showList);
var popupVisible = false;

// ON LOAD
map.on("load", function () {
  // document.getElementById("map-legend").innerHTML = `<h4 style= "color: #2284aa; font-family: Monaco" >Bridge Site</h4>`;
  // ADDING SOURCES
  updateVisibilty(hideList, showList);
  map.addSource("sites-source", {
    type: "geojson",
    data: "./data/civ-assessments-v5.geojson",
    cluster: true,
    clusterMaxZoom: 9,
    clusterRadius: 70,
    maxzoom: 11,
    clusterMinPoints: 5,

  });
  map.addSource("civ-assesment", {
    type: "vector",
    url: "mapbox://highestroad.6chlwg08",
  });
  
  map.addLayer({
    id: "sites-cluster",
    type: "circle",
    source: "sites-source",
    filter: ["has", "point_count"],
    layout: {
      visibility: "visible",
      
    },
    paint: {
      "circle-color": ["step", ["get", "point_count"], "white", 5, "#F7FCFD", 20, "#D6EFED", 35, "#91D2C1", 50, "#4EB080", 110, "#1D7E3F", 175, "#04431D"],
      "circle-radius": ["step", ["get", "point_count"], 8, 5, 20, 20, 23, 35, 25, 50, 29, 110, 32, 175, 35],
      "circle-opacity": 0.7,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#137876",
    },
  }, "waterway-label");
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'sites-source',
    filter: ['has', 'point_count'],
    layout: {
    'text-field': ["concat",["to-string",["get","point_count_abbreviated"]]," \n Sites"],
    'text-font': ['Kumbh Sans Regular'],
    'text-size': 12
    },
    paint: {
    'text-color': '#083030',
    'text-halo-color': 'white',
    'text-halo-width': .6,
    'text-halo-blur': 2,
  }
    });
});

[
  "concat",
  [
    "to-string",
    [
      "get",
      "point_count_abbreviated"
    ]
  ],
  "hi"
]