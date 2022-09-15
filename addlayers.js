function addLayers() {
    //  block of code to be executed if the condition is true
    for (l of config['layers']) {
        if (l['studioLayer'] == false) {
            console.log(l['layerName'])

            if (l['dataType'] == 'geojson') {
                map.addSource(l['layerName'], {
                    type: l['dataType'],
                    // Use a URL for the value for the `data` property.
                    data: l['dataPath']
                });
            } else if (l['dataType'] == 'vector') {
                map.addSource(l['layerName'], {
                    type: l['dataType'],
                    // Use a URL for the value for the `data` property.
                    url: l['dataPath']
                });
            }
            map.addLayer({
                'id': l['layerName'] + '-id',
                'type': l['layerType'],
                'source': l['layerName'],
                'source-layer': l['sourceLayer'],
                'layout': l['layout'],
                'paint': l['paint']
            }, l['position']);
        }
    }
}