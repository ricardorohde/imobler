var properties = app['properties'] = {};

$(function(){

  properties.like = function(property_id, action){
    if(!account_user_logged){
      properties_like_property_id = property_id;
      $('#pop-login').modal('toggle');
      return false;
    }

    var property_like = $('.btn-like[data-property_id='+ property_id +']');
    if(property_like.length){
      if(action == 'like'){
        property_like.attr('data-action', 'unlike').addClass('active').blur();
      }else if(action == 'unlike'){
        property_like.attr('data-action', 'like').removeClass('active').blur();
      }
    }

    $.post(app.base_url('api/property_favorite'), {property_id: property_id, action: action});
  };

  app.body.on('click', '.btn-like', function(){
    var $like = $(this);
    app.properties.like($like.attr('data-property_id'), $like.attr('data-action'));
  });

});
