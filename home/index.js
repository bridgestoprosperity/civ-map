import * as hov from "./hoverFunctions.js";

// FUNCTIONS
function queryFeatures(feature) {
  var features = map.queryRenderedFeatures({ layers: [feature] });
  console.log(features);
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
        // This sets feature state to hover: true
        // console.log(e.features[0].id)
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
    // This is where the menu pop up will go
    map.on("click", showList[l], () => {
      console.log("clicked");
    });

    map.on("mouseleave", showList[l], () => {
      map.getCanvas().style.cursor = "";
      if (popupVisible != true) {
        document.getElementById("live-data-text").innerHTML = "";
        document.getElementById("live-data-graphic").innerHTML = "";
      }
      // This sets feature state to hover: false when the mouse leaves.
      if (hoveredFeatureID !== null) {
        map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredFeatureID }, { hover: false });
      }
      hoveredFeatureID = null;
    });
  }
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
  // DELETE this eventually
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #2284aa; font-family: Monaco" >Bridge Site</h4>`;
});
document.getElementById("optionsRadios2").addEventListener("click", () => {
  showList = ["days-flooded-label", "days-flooded"];
  hideList = ["site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #3670ec; font-family: Monaco" >Days Flooded</h4>`;
});
document.getElementById("optionsRadios3").addEventListener("click", () => {
  showList = ["river-width-label", "river-width"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #87b5b2; font-family: Monaco" >Flooded River Width</h4>`;
});
document.getElementById("optionsRadios4").addEventListener("click", () => {
  showList = ["mortality", "mortality-label"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #ac2b25; font-family: Monaco" >Reported Deaths</h4>`;
});
document.getElementById("optionsRadios5").addEventListener("click", () => {
  showList = ["healthcare-block", "healthcare-block-pin"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #eb5c52; font-family: Monaco" >Site Blocking Healthcare Access</h4>`;
});
document.getElementById("optionsRadios6").addEventListener("click", () => {
  showList = ["education-block", "education-block-pin"];
  hideList = ["days-flooded-label", "days-flooded", "site-pins", "site-dots", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  document.getElementById("map-legend").innerHTML = `<h4 style= "color: #e29536; font-family: Monaco" >Blocking Education</h4>`;
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
});

// VARIABLES
let villageRadiusLayers = ["sp-vil-radius-line", "gbk-vil-radius-line", "sp-vil-radius-fill ", "gbk-vil-radius-fill", "sp-vil-radius-line-shadow", "gbk-vil-radius-line-shadow"];

let glowColor = "hsl(78, 83%, 69%)";
let glowColorLight = "hsl(78, 85%, 84%)";
let hoveredFeatureID = null;
var showList = ["site-pins", "site-dots"];
var hideList = ["days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
updateInteractive(showList);
const popupVisible = false;

// ON LOAD
map.on("load", function () {
  // document.getElementById("map-legend").innerHTML = `<h4 style= "color: #2284aa; font-family: Monaco" >Bridge Site</h4>`;
  // ADDING SOURCES
  map.addSource("sites-source", {
    type: "geojson",
    data: "./data/civ-assessment-v1.geojson",
  });
  map.addSource("civ-assesment", {
    type: "vector",
    url: "mapbox://highestroad.6chlwg08",
  });
  //   HOVER STUFF
});
