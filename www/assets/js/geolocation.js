function geo_success (data) {
  console.log('geo_success', data);
}
function geo_error (data) {
  console.log('geo_error', data);
}

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
