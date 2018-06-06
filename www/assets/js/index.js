const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidG5nLXN5IiwiYSI6ImNqaTFpeWg4bzFlcHEza255eHJpcm4xcXoifQ.rRg9X6S07XFWBjzIEUrsLw';
const BASE_COORDS = [2.363486, 48.843325];

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v10",
  center: BASE_COORDS,
  zoom: 15
});


/**
  * On attend que la map est chargée.
  */
map.on('load', function() {

  map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }));

  let paramsCoordinates = '';

  /**
    * Ajout d'un Marker.
    */

  for (let item of interests) {
    const coords = [item.geoloc.longitude, item.geoloc.latitude];
    paramsCoordinates = build_coordinates(paramsCoordinates, coords);
    add_marker(coords, map);
  }

  get_route(paramsCoordinates, 'fr');

});
