function add_marker (coords, map) {
  const el = document.createElement('div');

  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(coords)
    .addTo(map);
}

function build_coordinates (base, next) {
  return (base === '' ? '' : base + ';') + next.join(',')
}

function add_steps (steps) {
  let numberSteps = 1;
  const instructions = document.getElementById('map-steps');

  for (_steps of steps) {
    instructions.insertAdjacentHTML('beforeend', '<h2 class="step">Step : ' + numberSteps + '</h2>');
    numberSteps++;

    _steps.steps.forEach(function(step) {
      instructions.insertAdjacentHTML('beforeend', '<p class="step">' + step.maneuver.instruction + '</p>');
    });
  }

}

/**
  * coordinates = une chaîne de caractères des coords.
  * language = language pour les directions.
  */
function get_route (coordinates, language) {
  const directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + coordinates + '?steps=true&language=' + language + '&geometries=geojson&access_token=' + mapboxgl.accessToken;

  $.ajax({
    method: 'GET',
    url: directionsRequest,
  }).done(function(data) {
    const route = data.routes[0].geometry;

    add_steps(data.routes[0].legs);

    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': route
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-width': 4,
        'line-color': '#888',
      }
    });

  });

}
