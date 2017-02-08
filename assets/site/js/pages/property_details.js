var property_detail = app['property_detail'] = {};
var property_detail_map = null;
var property_detail_panorama = null;
var property_detail_coordinates = null;
var property_detail_map_options = {};
var property_detail_panorama_options = {};


$(function(){
  property_detail.mapa = function(){
    property_detail_coordinates = new google.maps.LatLng(-23.487584, -46.738088);

    property_detail_map_options = {
      center: property_detail_coordinates,
      zoom: 12
    };

    property_detail_panorama_options = {
      position: property_detail_coordinates,
      pov: {
        heading: 34,
        pitch: 10
      }
    };

    property_detail_map = new google.maps.Map(document.getElementById('map'), property_detail_map_options);
    property_detail_panorama = new google.maps.StreetViewPanorama(document.getElementById('street-map'), property_detail_panorama_options);

    property_detail_map.setStreetView(property_detail_panorama);

    console.log('apareceu');
  };

  $('a[href="#map"]').on('shown.bs.tab', function (e) {
    var center = property_detail_panorama.getPosition();
    google.maps.event.trigger(property_detail_map, "resize");
    property_detail_map.setCenter(center);
  });

  $('a[href="#street-map"]').on('shown.bs.tab', function (e) {
    property_detail_coordinates = property_detail_panorama.getPosition();
    property_detail_panorama_options.position = property_detail_coordinates;
    property_detail_panorama = new google.maps.StreetViewPanorama(document.getElementById('street-map'), property_detail_panorama_options);
    property_detail_map.setStreetView(property_detail_panorama);
  });

  $(window).resize(function(){
    $("#map, #street-map").css('min-height', $(".detail-media #gallery").innerHeight());
  }).resize();

}); //$function
