// Not really using this at the moment
var config = {
    style: 'mapbox://styles/branigan/cjz37rcb003ib1cr3s8rnkt2d',
    accessToken: 'pk.eyJ1IjoibWJ4c29sdXRpb25zIiwiYSI6ImNrMm01aG9hdTBlZGwzbXQ1ZXVrNHNmejAifQ.QHQA0N6XPWddCXtvoODHZg',
    showMarkers: false,
    theme: 'dark',
    use3dTerrain: true,
    title: 'Glaciers of Glacier National Park',
    subtitle: 'Change in coverage from 1998 to 2015',
    byline: '',
    footer: 'Source: Story text from Wikipedia, August 2019. Data from <a href="https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park">USGS</a>',
    layers: [{
            layerName: 'schools',
            button: 'slider',
            state: 'on',
            label: 'Label',
            description: 'This layer is meant to show xyz and this will pop up in a tool tip.',
            studioLayer: false,
            dataType: 'geojson',
            dataPath: './data/civ-schools_merge.geojson',
            layerType: 'circle',
            sourceLayer: '',
            position: '',
            layout: {
                'visibility': 'visible'
            },
            paint: {
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            },
        },
        {
            layerName: 'contours',
            button: 'slider',
            state: 'on',
            label: 'Label',
            description: 'This layer is meant to show xyz and this will pop up in a tool tip.',
            studioLayer: false,
            dataType: 'vector',
            dataPath: 'mapbox://mapbox.mapbox-terrain-v2',
            layerType: 'line',
            sourceLayer: 'contour',
            position: '',
            layout: {
                // Make the layer visible by default.
                'visibility': 'visible',
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#877b59',
                'line-width': 1
            }
        },
    ]
}