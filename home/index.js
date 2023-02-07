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
  map.on("mousemove", "gbk-village", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (popupVisible != true) {
      hov.liveDataHandler(e.features[0]);
    }
  });
  map.on("mouseleave", "gbk-village", () => {
    map.getCanvas().style.cursor = "";
    if (popupVisible != true) {
      hov.reset();
    }
    // This sets feature state to hover: false when the mouse leaves.
  });
  map.on("mousemove", "sp-village", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (popupVisible != true) {
      hov.liveDataHandler(e.features[0]);
    }
  });
  map.on("mouseleave", "sp-village", () => {
    map.getCanvas().style.cursor = "";
    if (popupVisible != true) {
      hov.reset();
    }
    // This sets feature state to hover: false when the mouse leaves.
  });
  map.on("mousemove", "gbk-primary", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (popupVisible != true) {
      hov.liveDataHandler(e.features[0]);
    }
  });
  map.on("mouseleave", "gbk-primary", () => {
    map.getCanvas().style.cursor = "";
    if (popupVisible != true) {
      hov.reset();
    }
    // This sets feature state to hover: false when the mouse leaves.
  });
  map.on("mousemove", "sp-primary", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (popupVisible != true) {
      hov.liveDataHandler(e.features[0]);
    }
  });
  map.on("mouseleave", "sp-primary", () => {
    map.getCanvas().style.cursor = "";
    if (popupVisible != true) {
      hov.reset();
    }
    // This sets feature state to hover: false when the mouse leaves.
  });
  map.on("mousemove", "sp-college", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (popupVisible != true) {
      hov.liveDataHandler(e.features[0]);
    }
  });
  map.on("mouseleave", "sp-primary", () => {
    map.getCanvas().style.cursor = "";
    if (popupVisible != true) {
      hov.reset();
    }
    // This sets feature state to hover: false when the mouse leaves.
  });

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
        blockingString = blockingList.join(", ") + " and " + last;
      } else if (blockingList.length == 1) {
        blockingString = blockingList[0];
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
hideList = ["site-pins", "site-dots", "days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];

function filterFunction() {
  if (showList[0] === "site-pins" || showList[0] === "site-dots" || showList[0] === "cluster-count" || showList[0] === "sites-cluster") {
    radioFilter = ["has", "Bridge Name"];
  } else if (showList[0] == "days-flooded-label" || showList[0] == "days-flooded") {
    radioFilter = ["match", ["get", "Days per year river is flooded"], ["0", "none"], false, true];

  } else if (showList[0] == "mortality" || showList[0] == "mortality-label") {
    radioFilter = ["!=", ["get", "River crossing deaths in last 3 years"], 0];

  } else if (showList[0] == "river-width" || showList[0] == "river-width-label") {
    radioFilter = ["match", ["get", "Width of River During Flooding (m)"], ["0", "none"], false, true];

  } else if (showList[0] == "education-block" || showList[0] == "education-block-pin") {
    radioFilter = ["!=", ["get", "Education access blocked by river"], ""];

  } else if (showList[0] == "healthcare-block" || showList[0] == "healthcare-block-pin") {
    radioFilter = ["!=", ["get", "Health access blocked by river"], ""];

  } else {
    radioFilter = ["has", "Bridge Name"];

  }
  if (document.getElementById("mortality-switch").checked) {
    mortalityFilter = ["!=", ["get", "River crossing deaths in last 3 years"], 0];
  } else {
    mortalityFilter = ["all", ["has", "River crossing deaths in last 3 years"]];
  }
  if (document.getElementById("reject-switch").checked) {
    rejectFilter = ["all", ["has", "Flag for Rejection"]];
  } else {
    rejectFilter = ["match", ["get", "Flag for Rejection"], ["No"], true, false];
  }

  for (let l in showList) {

    if (showList[l] == "sites-cluster" || showList[l] == "cluster-count") {
      if (document.getElementById("mortality-switch").checked) {
        map.setLayoutProperty(showList[l], "visibility", "none");
      } else {
        map.setLayoutProperty(showList[l], "visibility", "visible");
        map.setFilter(showList[l], ["all", ["has", "point_count"]]);
      }
    } else {
      map.setFilter(showList[l], ["all", radioFilter, mortalityFilter, rejectFilter]);
    }
  }
}

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
document.getElementById("all-radio").addEventListener("click", () => {
  showList = ["site-pins", "site-dots", "sites-cluster", "cluster-count"];
  hideList = ["days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
  // DELETE this eventually
});
document.getElementById("flood-radio").addEventListener("click", () => {
  showList = ["days-flooded-label", "days-flooded"];
  hideList = ["sites-cluster", "cluster-count", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
});
document.getElementById("width-radio").addEventListener("click", () => {
  showList = ["river-width-label", "river-width"];
  hideList = ["sites-cluster", "cluster-count", "days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
});
document.getElementById("mortality-radio").addEventListener("click", () => {
  showList = ["mortality", "mortality-label"];
  hideList = ["sites-cluster", "cluster-count", "days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
});
document.getElementById("healthcare-radio").addEventListener("click", () => {
  showList = ["healthcare-block", "healthcare-block-pin"];
  hideList = ["sites-cluster", "cluster-count", "days-flooded-label", "days-flooded", "site-pins", "site-dots", "education-block", "education-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
});
document.getElementById("education-radio").addEventListener("click", () => {
  showList = ["education-block", "education-block-pin"];
  hideList = ["sites-cluster", "cluster-count", "days-flooded-label", "days-flooded", "site-pins", "site-dots", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
  filterFunction();
  hov.reset();
});
document.getElementById("host-radio").addEventListener("click", () => {
  // TBD TURF STUFF
  showList = [];
  hideList = ["education-block", "education-block-pin", "sites-cluster", "cluster-count", "days-flooded-label", "days-flooded", "site-pins", "site-dots", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
  updateVisibilty(hideList, showList);
  // gbkPolygon = turf.polygon("./data/GBK_Host_Village_Radius.geojson")
  // spPolygon = turf.polygon("./data/SP_Host_Village_Radius.geojson")
  // spPolygon =
  sitePoints = turf.points("./data/Host_Sites.geojson");
  console.log(sitePoints);
  console.log(gbkPolygon);

  filterFunction();
  hov.reset();
});

// SWITCHES
document.getElementById("village-switch").addEventListener("click", () => {
  if (document.getElementById("village-switch").checked) {
    updateVisibilty(null, ["gbk-village-radius-fill", "sp-village-radius-fill", "gbk-village-radius-line", "sp-village-radius-line"]);
  } else {
    updateVisibilty(["gbk-village-radius-fill", "sp-village-radius-fill", "gbk-village-radius-line", "sp-village-radius-line"], null);
  }
});
document.getElementById("mortality-switch").addEventListener("click", () => {
  filterFunction();
});
document.getElementById("reject-switch").addEventListener("click", () => {
  filterFunction();
});
document.getElementById("sat-switch").addEventListener("click", () => {
  if (document.getElementById("sat-switch").checked) {
    updateVisibilty(null, ["satellite"]);
  } else {
    updateVisibilty(["satellite"], null);
  }
});
document.getElementById("3D-switch").addEventListener("click", () => {
  if (document.getElementById("3D-switch").checked) {
    map.easeTo({ pitch: 70 });
  } else {
    map.easeTo({ pitch: 0 });
  }
});

// BASIC MAPBOX STUFF
mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w5bjYzdXlyMDNyOTNycDh4YnB1dWV5eiJ9.vhIIq0L5So522RkERq7MNQ";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/cldcajdxm000201qe1r6nt7j2", // style URL
  center: [-7.014, 7.426], // starting position [lng, lat]
  zoom: 6.37, // starting zoom
  minZoom: 6,
  hash: true,
  // add map controls
});
map.addControl(new mapboxgl.NavigationControl());

// VARIABLES
let villageRadiusLayers = ["sp-vil-radius-line", "gbk-vil-radius-line", "sp-vil-radius-fill ", "gbk-vil-radius-fill", "sp-vil-radius-line-shadow", "gbk-vil-radius-line-shadow"];

let glowColor = "hsl(78, 83%, 69%)";
let glowColorLight = "hsl(78, 85%, 84%)";
let hoveredFeatureID = null;
var showList = ["site-pins", "site-dots", "sites-cluster", "cluster-count"];
var hideList = ["days-flooded-label", "days-flooded", "education-block", "education-block-pin", "healthcare-block", "healthcare-block-pin", "mortality", "mortality-label", "river-width-label", "river-width"];
var villages = ["gbk-village", "sp-village"];
var schools = ["sp-primary", "gbk-primary"];

var popupVisible = false;
let radioFilter = [];
let rejectFilter = [];
let mortalityFilter = [];

// ON LOAD
map.on("load", function () {
  // document.getElementById("map-legend").innerHTML = `<h4 style= "color: #2284aa; font-family: Monaco" >Bridge Site</h4>`;
  // ADDING SOURCES

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

  map.addLayer(
    {
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
    },
    "site-pins"
  );
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "sites-source",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["concat", ["to-string", ["get", "point_count_abbreviated"]], " \n Sites"],
      "text-font": ["Kumbh Sans Regular"],
      "text-size": 12,
    },
    paint: {
      "text-color": "#083030",
      "text-halo-color": "white",
      "text-halo-width": 0.6,
      "text-halo-blur": 2,
    },
  });
  updateVisibilty(hideList, showList);
  updateInteractive(showList);
});
