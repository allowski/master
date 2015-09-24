var map = null;
$(document).on("deviceready", function() {
  map = plugin.google.maps.Map.getMap();
  map.on(plugin.google.maps.event.MAP_READY, onMapReady);
});

function onMapReady() {
  loadPage("welcome");
}
