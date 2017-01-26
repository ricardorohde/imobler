$( function() {
  var property_item = $('#property-item').html();
  Mustache.parse(property_item);

  var get_properties_process = function(){
    var params = {};

    $('#search-mask').fadeIn('fast');

    params['transaction'] = $('#search-transaction').val();
    params['property_type'] = $('#search-property_type').val();

    var state = [];
    var city = [];
    var district = [];
    $.each($('.property-location-item'), function(i, item){
      var location_json = $(item).attr('data-json');
      var location = JSON.parse(location_json);

      if(typeof location.state !== 'undefined'){
        state.push(location.state);
      }

      if(typeof location.city !== 'undefined'){
        city.push(location.city);
      }

      if(typeof location.district !== 'undefined'){
        district.push(location.district);
      }
    });
    params['state'] = state;
    params['city'] = city;
    params['district'] = district;

    if($('#search-min_price').val().length){
      params['min_price'] = $('#search-min_price').val();
    }

    if($('#search-max_price').val().length){
      params['max_price'] = $('#search-max_price').val();
    }

    if($('.properties-bedrooms.active').length){
      params['bedrooms'] = $('.properties-bedrooms.active').data('value');
    }

    if($('.properties-garages.active').length){
      params['garages'] = $('.properties-garages.active').data('value');
    }

    if($('.properties-bathrooms.active').length){
      params['bathrooms'] = $('.properties-bathrooms.active').data('value');
    }

    console.log(params);

    $.ajax({
      url: app.base_url('api/get_properties'),
      method: 'post',
      dataType: 'json',
      data: params
    }).done(function(result) {
      $('#search-mask').fadeOut('fast');

      var property_rendered = Mustache.render(property_item, result);
      $('.property-items').html(property_rendered);

      $('.pagination-content').html(result.pagination);
    });
  };

  var get_properties_timeout = 0;
  var get_properties = function(){
    clearTimeout(get_properties_timeout);
    get_properties_timeout = setTimeout(get_properties_process, 500);
  };

  $('#search-property_type').select2({
    theme: "bootstrap",
    placeholder: 'Tipo de imóvel'
  });
  $('#search-property_type')
    .on('select2:select', function (evt) {
      get_properties();
    })

    .on('select2:unselect', function(){
      get_properties();
    });

  $('.price').mask('000.000.000.000.000', {reverse: true});

  $('.properties-data-item').on('click', function(){
    $(this).closest('.properties-data').find('.properties-data-item').removeClass('active btn-info');
    $(this).addClass('active btn-info').blur();
    get_properties();
  });

  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
      currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category.slug != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category.name + "</li>" );
          currentCategory = item.category.slug;
        }
        li = that._renderItemData( ul, item );
        if ( item.category.slug ) {
          li.attr( "aria-label", item.category.slug + " : " + item.label );
        }
      });
    }
  });

  $('.property-location-items').on('click', '.property-location-item-remove', function(){
    if($('.property-location-item').length == 1){
      alert('nao pode');
    }else{
      $(this).closest('.property-location-item').remove();
      setTimeout(get_properties, 200);
    }
  });

  $(".input-search-local").catcomplete({
    source: app.base_url('api/get_locations'),
    minLength: 2,
    delay: 250,
    select: function( event, ui ) {

      $.ajax({
        url: app.base_url('api/get_full_location'),
        method: 'post',
        dataType: 'json',
        data: {
          'id': ui.item.id,
          'category': ui.item.category.slug
        }
      }).done(function(result) {
        $(".input-search-local").val('').focus();
        $('<div>').attr('data-json', result.json).addClass('property-location-item').html(result.label).append('<a href="javascript:void(0);" class="property-location-item-remove pull-right"><i class="fa fa-times-circle" aria-hidden="true"></i></a>').appendTo('.property-location-items');
      });

      get_properties();
    }
  });

  $('#properties-list-form').on('submit', function(event){
    event.preventDefault();
    get_properties_process();
  });
});