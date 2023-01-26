map.addLayer({
    id: "site-pins",
    type: "symbol",
    source: "sites-source",
    minzoom: 10,
    layout: {
      "icon-image": "noun-place-1279258-CCF270",
      "icon-size": ["interpolate", ["exponential", 1.11], ["zoom"], 10, 0.05, 22, 0.7],
      "icon-allow-overlap": true,
    },
  });
  map.addLayer(
    {
      id: "site-glow-1",
      type: "circle",
      source: "sites-source",
      maxzoom: 10,
      paint: {
        "circle-radius": 1,
        "circle-color": "#FFFFFF",
      },
    },
    "mapbox-mapbox-terrain-dem-v1"
  );
  map.addLayer(
    {
      id: "site-glow-5",
      type: "circle",
      source: "sites-source",
      maxzoom: 10,
      paint: {
        "circle-color": glowColorLight,
        "circle-radius": 5,
        "circle-blur": 3,
        "circle-opacity": 0.4,
      },
    },
    "mapbox-mapbox-terrain-dem-v1"
  );
  map.addLayer(
    {
      id: "site-glow-10",
      type: "circle",
      source: "sites-source",
      maxzoom: 10,
      paint: {
        "circle-color": glowColor,
        "circle-radius": 10,
        "circle-blur": 3,
        "circle-opacity": 0.4,
      },
    },
    "mapbox-mapbox-terrain-dem-v1"
  );