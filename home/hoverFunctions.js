const allSitesColor = "#2284aa";
const daysColor = "#3670ec";
const widthColor = "#87b5b2"
const mortalityColor = "#ac2b25";
const healthColor = "#eb5c52";
const educationColor = "#e29536";

export function testing(headerString, addString) {
  for (l in showList) {
    map.on("mousemove", showList[l], (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        // console.log(showList[l]);
        if (hoveredStateId !== null) {
          map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredStateId }, { hover: false });
        }
        if (headerString !== false) {
          document.getElementById("map-value").innerHTML = e.features[0]._vectorTileFeature.properties[headerString] + addString;
        }
        // console.log(e.features[0]._vectorTileFeature.properties[headerString]);
        map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredStateId }, { hover: true });
      }
    });
    map.on("click", showList[l], () => {
      console.log("clicked");
    });

    map.on("mouseleave", showList[l], () => {
      map.getCanvas().style.cursor = "";
      document.getElementById("map-value").innerHTML = "";
      if (hoveredStateId !== null) {
        map.setFeatureState({ source: "civ-assesment", sourceLayer: "civ-assessments-v2-4b6mhv", id: hoveredStateId }, { hover: false });
        console.log("left");
      }
      hoveredStateId = null;
    });
  }
}
// add ```<div class="progress shadow" style="background-color: #e2e1e1"> <div class="progress-bar bg-info" role="progressbar" style="width: 50%; " aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>``` to "live-data-graphic" div

export function liveDataHandler(feature) {
  // console.log(feature);
  if (feature.layer.id == "site-pins" || feature.layer.id == "site-dots") {
    document.getElementById("live-data-text").innerHTML = feature.properties["Bridge Name"];
    document.getElementById("live-data-text").style.color = allSitesColor;
  } else if (feature.layer.id == "days-flooded-label" || feature.layer.id == "days-flooded") {
    document.getElementById("live-data-text").innerHTML = "Flooded "+ feature.properties["Days per year river is flooded"] + " Days a Year";
    document.getElementById("live-data-text").style.color = daysColor;
    document.getElementById("live-data-graphic").style.width = "300px";
    document.getElementById("live-data-graphic").innerHTML = `<div class="progress shadow" style="background-color: #e2e1e1;">
    <div class="progress-bar" role="progressbar" style="width: ${(feature.properties["Days per year river is flooded"]/365)*100}%; background-color: ${daysColor} !important;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>`
  } else if (feature.layer.id == "mortality" || feature.layer.id == "mortality-label") {
    console.log(feature.layer.id);
  } else if (feature.layer.id == "river-width-label" || feature.layer.id == "river-width") {
    document.getElementById("live-data-text").innerHTML = "Flooded River Width: " +feature.properties["Width of River During Flooding (m)"] + "m";
    document.getElementById("live-data-text").style.color = widthColor;
    document.getElementById("live-data-graphic").style.width = 300*(feature.properties["Width of River During Flooding (m)"]/250) + "px";
    document.getElementById("live-data-graphic").innerHTML = `
    <div class="progress shadow">
        <div class="progress-bar" role="progressbar" style="width: 100%; background-color: ${widthColor} !important;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
        </div>
    </div>`
    console.log(feature.layer.id);
  } else if (feature.layer.id == "healthcare-block" || feature.layer.id == "healthcare-block-pin") {
    console.log(feature.layer.id);
  } else if (feature.layer.id == "education-block" || feature.layer.id == "education-block-pin") {
    console.log(feature.layer.id);
  } else {
    console.log("This layer is not handled with the liveDataHandler function");
  }
}

// // This sets map value to the value of the feature this should be in the hover functions function
// if (headerString !== false) {
//   document.getElementById("map-value").innerHTML = e.features[0]._vectorTileFeature.properties[headerString] + addString;
// }

//       // changes the html back to nothing. This should be in hover function
//       document.getElementById("map-value").innerHTML = "";
