var properties = app['properties'] = {};

$(function(){

  properties.like = function(property_id, action){

    if(!account_user_logged){
      properties_like_property_id = property_id;
      $('#pop-login').modal('toggle');
      return false;
    }

    $.ajax({
      url: app.base_url('api/property_favorite'),
      data: {
        property_id: property_id,
        action: action
      },
      method: 'post',
      dataType: "json"
    }).done(function(result) {
      var property_like = $('.btn-like[data-property_id='+ result.property_id +']');
      if(property_like.length){
        if(result.action == 'liked'){
          property_like.attr('data-action', 'unlike').addClass('active');
        }else if(result.action == 'unliked'){
          property_like.attr('data-action', 'like').removeClass('active');
        }
      }
    });
  };

  $('.property-items').on('click', '.btn-like', function(){
    var $like = $(this);
    app.properties.like($like.attr('data-property_id'), $like.attr('data-action'));
  });

  // property_like: function($property_id){
  //   if(user_is_logged){
  //     $.ajax({
  //       url: app.base_url('api/add_favorite'),
  //       data: {
  //         property_id: $property_id
  //       },
  //       method: 'post',
  //       dataType: "json"
  //     }).done(function(result) {

  //       if(result.action == 'like'){
  //         $('.btn-like[data-property_id='+ result.property_id +']').addClass('active');
  //       }else if(result.action == 'unlike'){
  //         $('.btn-like[data-property_id='+ result.property_id +']').removeClass('active');
  //       }

  //     });
  //   }
  //   user_is_logged = true;
  // },

});
