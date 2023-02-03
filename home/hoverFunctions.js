const allSitesColor = "#2284aa";
const daysColor = "#3670ec";
const widthColor = "#87b5b2";
const mortalityColor = "#ac2b25";
const healthColor = "#eb5c52";
const educationColor = "#e29536";

export function liveDataHandler(feature) {
  if (feature.layer.id == "site-pins" || feature.layer.id == "site-dots") {
    document.getElementById("live-data-text").innerHTML = feature.properties["Bridge Name"];
    document.getElementById("live-data-text").style.color = allSitesColor;
  } else if (feature.layer.id == "days-flooded-label" || feature.layer.id == "days-flooded") {
    document.getElementById("live-data-text").innerHTML = "Flooded " + feature.properties["Days per year river is flooded"] + " Days a Year";
    document.getElementById("live-data-text").style.color = daysColor;
    document.getElementById("live-data-graphic").style.width = "300px";
    document.getElementById("live-data-graphic").innerHTML = `<div class="progress shadow" style="background-color: #e2e1e1;">
    <div class="progress-bar" role="progressbar" style="width: ${(feature.properties["Days per year river is flooded"] / 365) * 100}%; background-color: ${daysColor} !important;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>`;
  } else if (feature.layer.id == "mortality" || feature.layer.id == "mortality-label") {
    document.getElementById("live-data-text").style.color = mortalityColor;
    if (feature.properties["River crossing deaths in last 3 years"] == 1) {
      document.getElementById("live-data-text").innerHTML = feature.properties["River crossing deaths in last 3 years"] + " death in last three years";
    } else {
      document.getElementById("live-data-text").innerHTML = feature.properties["River crossing deaths in last 3 years"] + " deaths in last three years";
    }
    // document.getElementById("live-data-graphic").style.width = "300px";
    let mortalityString = "";
    for (let i = 0; i < feature.properties["River crossing deaths in last 3 years"]; i++) {
      mortalityString += `<img src="./img/death.svg" style="display: inline-block; width: 10%; height: 100%; object-fit: contain;" alt="death">`;
    }
    document.getElementById("live-data-graphic").innerHTML = mortalityString;
  } else if (feature.layer.id == "river-width-label" || feature.layer.id == "river-width") {
    document.getElementById("live-data-text").innerHTML = "Flooded River Width: " + feature.properties["Width of River During Flooding (m)"] + "m";
    document.getElementById("live-data-text").style.color = widthColor;
    document.getElementById("live-data-graphic").style.width = 300 * (feature.properties["Width of River During Flooding (m)"] / 250) + "px";
    document.getElementById("live-data-graphic").innerHTML = `
    <div class="progress shadow">
        <div class="progress-bar" role="progressbar" style="width: 100%; background-color: ${widthColor} !important;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
        </div>
    </div>`;
  } else if (feature.layer.id == "healthcare-block" || feature.layer.id == "healthcare-block-pin") {
    let healthString = "";
    let healthList = [];
    if (feature.properties["Health access blocked by river"].includes("Clinic") !== false) {
      healthList.push("Clinic");
      healthString += `<img src="./img/clinic.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked clinic">`;
    }
    if (feature.properties["Health access blocked by river"].includes("Hospital") !== false) {
      healthList.push("Hospital");
      healthString += `<img src="./img/hospital.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked hospital">`;
    }
    if (feature.properties["Health access blocked by river"].includes("Pharmacy") !== false) {
      healthList.push("Pharmacy");
      healthString += `<img src="./img/pharmacy.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked pharmacy">`;
    }
    // if healthList is more than 1 item
    if (healthList.length > 1) {
      let last = healthList.pop();
      document.getElementById("live-data-text").innerHTML = healthList.join(", ") + " and " + last + " Blocked";
    } else {
      document.getElementById("live-data-text").innerHTML = healthList.join(", ") + " Blocked";
    }

    document.getElementById("live-data-text").style.color = healthColor;
    document.getElementById("live-data-graphic").innerHTML = healthString;
  } else if (feature.layer.id == "education-block" || feature.layer.id == "education-block-pin") {
    let educationString = "";
    let educationList = [];
    if (feature.properties["Education access blocked by river"].includes("Primary") !== false) {
      educationList.push("Primary School");
      educationString += `<img src="./img/primary-school.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked primary school">`;
    }
    if (feature.properties["Education access blocked by river"].includes("Secondary") !== false) {
      educationList.push("Secondary School");
      educationString += `<img src="./img/secondary-school.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked secondary school">`;
    }
    if (feature.properties["Education access blocked by river"].includes("University") !== false) {
      educationList.push("University");
      educationString += `<img src="./img/university.svg" style="display: inline-block; width: 25%; height: 100%; object-fit: contain; padding-left: 10px" alt="blocked university">`;
    }
    // if educationList is more than 1 item
    if (educationList.length > 1) {
      let last = educationList.pop();
      document.getElementById("live-data-text").innerHTML = educationList.join(", ") + " and " + last + " Blocked";
    } else {
      document.getElementById("live-data-text").innerHTML = educationList.join(", ") + " Blocked";
    }

    document.getElementById("live-data-text").style.color = educationColor;
    document.getElementById("live-data-graphic").innerHTML = educationString;
  } else {
    console.log("This layer is not handled with the liveDataHandler function");
  }
}
export function reset() {
  document.getElementById("live-data-text").innerHTML = "";
  document.getElementById("live-data-graphic").innerHTML = "";
  document.getElementById("live-data-graphic").style.width = "300px";
}

// export function popupHandler(feature) {
//   popupVisible = true;
//   console.log("clicked");
//   const coordinates = feature.features[0].geometry.coordinates.slice();
//   const description = feature.features[0].properties.description;

//   // Ensure that if the map is zoomed out such that multiple
//   // copies of the feature are visible, the popup appears
//   // over the copy being pointed to.
//   while (Math.abs(feature.lngLat.lng - coordinates[0]) > 180) {
//     coordinates[0] += feature.lngLat.lng > coordinates[0] ? 360 : -360;
//   }
//   hov.popupHandler(feature.features[0]);
//   new mapboxgl.Popup()
//     .setLngLat(coordinates)
//     .setHTML("HELLO DESCRIPTION")
//     .on("close", (feature) => {
//       popupVisible = false;
//     })
//     .addTo(map);
// }

// // This sets map value to the value of the feature this should be in the hover functions function
// if (headerString !== false) {
//   document.getElementById("map-value").innerHTML = e.features[0]._vectorTileFeature.properties[headerString] + addString;
// }

//       // changes the html back to nothing. This should be in hover function
//       document.getElementById("map-value").innerHTML = "";
