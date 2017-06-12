var properties_edit = app['properties_edit'] = {};
var properties_edit__init_mapa;

var properties_edit__map;
var properties_edit__markers = [];

$(function(){

  properties_edit__init_mapa = function() {
    var haightAshbury = {lat: -23.501473, lng: -46.736422};

    properties_edit__map = new google.maps.Map(document.getElementById('localizacao_mapa'), {
      zoom: 17,
      center: haightAshbury,
      mapTypeId: 'roadmap'
    });

    // This event listener will call addMarker() when the map is clicked.
    properties_edit__map.addListener('click', function(event) {
      properties_edit__addMarker(event.latLng);
    });

    // Adds a marker at the center of the map.
    properties_edit__addMarker(haightAshbury);
  };

  // Adds a marker to the map and push to the array.
  var properties_edit__addMarker = function(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: properties_edit__map
    });

    properties_edit__markers.push(marker);
  }

  properties_edit.init_cep = function($templates, $callback){

    var cep_loading = $('.form-loading-cep');
    var options =  {
      onComplete: function(cep) {
        cep_loading.addClass('loading-active');

        setTimeout(function(){
            cep_loading.removeClass('loading-active');
        }, 2000);
      },
      onKeyPress: function(cep, event, currentField, options){
        console.log('An key was pressed!:', cep, ' event: ', event,
                    'currentField: ', currentField, ' options: ', options);
      },
      onChange: function(cep){
        console.log('cep changed! ', cep);
      },
      onInvalid: function(val, e, f, invalid, options){
        var error = invalid[0];
        console.log ("Digssssit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
      }
    };

    $('.cep-mask').mask('00000-000', options);

  };

  // Init
  properties_edit.init = function(){
    properties_edit.init_cep();
  };

  properties_edit.init();

}); //$function