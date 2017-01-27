var template_property_item = '';
var property_images = [];

var property_images_swiper_init = function(){
  $.each($('.property-images'), function(i, item){
    var $item = $(item);
    var $carousel = $(item).find('.owl-carousel');

    property_images.push($carousel);

    $carousel.owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      items: 1,
      nav: false,
      navContainer: 'ids',
      margin: 2,
      dots: false,
      lazyLoad:true,
    });

    $item.find('.btn-images-next').on('click', function() {
        console.log('next');
        $carousel.trigger('next.owl.carousel');
    });

    $item.find('.btn-images-prev').on('click', function() {
        console.log('prev');
        $carousel.trigger('prev.owl.carousel');
    });
  });
};

var property_images_swiper_destroy = function(){
  for(var loop = 0 ; loop < property_images.length ; loop++){
    property_images[loop].trigger('destroy.owl.carousel');
  }
  property_images = [];
};

$( function() {
  $.get(app.base_url('assets/site/templates/properties-list-item.mustache'), function( template ) {
    template_property_item = template;
    Mustache.parse(template_property_item);
  });

  var get_properties_process = function(){
    var params = {};

    $('#search-mask').fadeIn('fast');
    property_images_swiper_destroy();

    params['transaction'] = $('#search-transaction').val();
    params['property_type'] = $('#search-property_type').val();

    var state = [];
    var city = [];
    var district = [];

    $.each($('.property-location-item'), function(i, item){
      var $item = $(item);

      if($item[0].hasAttribute("data-state") && $item.attr("data-state").length){
        if(jQuery.inArray($item.attr("data-state"), state) === -1){
          state.push($item.attr("data-state"));
        }
      }

      if($item[0].hasAttribute("data-city") && $item.attr("data-city").length){
        if(jQuery.inArray($item.attr("data-city"), city) === -1){
          city.push($item.attr("data-city"));
        }
      }

      if($item[0].hasAttribute("data-district") && $item.attr("data-district").length){
        if(jQuery.inArray($item.attr("data-district"), district) === -1){
          district.push($item.attr("data-district"));
        }
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

    $.ajax({
      url: app.base_url('api/get_properties'),
      method: 'post',
      dataType: 'json',
      data: params
    }).done(function(result) {
      $('#search-mask').fadeOut('fast');

      var template_property_item_rendered = Mustache.render(template_property_item, result);
      $('.property-items').html(template_property_item_rendered);

      $('.pagination-content').html(result.pagination);

      property_images_swiper_init();
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

  $('.price-mask').mask('000.000.000.000.000', {reverse: true});

  $('.properties-data-item').on('click', function(){
    $(this).closest('.properties-data').find('.properties-data-item').removeClass('active btn-info');
    $(this).addClass('active btn-info').blur();
    get_properties();
  });

  property_images_swiper_init();

  var view_changer = $('.view-btn');
  var view_area = $('.property-listing');
  view_changer.on("click",function(){
    property_images_swiper_destroy();

    var view_this = $(this);
    view_changer.removeClass('active');
    view_this.addClass('active');
    if(view_this.hasClass('btn-list')) {
      view_area.removeClass('grid-view grid-view-3-col').addClass('list-view');
    }
    else if(view_this.hasClass('btn-grid')) {
      view_area.removeClass('list-view grid-view-3-col').addClass('grid-view');
    }
    else if(view_this.hasClass('btn-grid-3-col')) {
      view_area.removeClass('list-view grid-view').addClass('grid-view grid-view-3-col');
    }

    property_images_swiper_init();
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

  var property_location_item = $('#property-location-item').html();
  Mustache.parse(property_location_item);

  $(".input-search-local").catcomplete({
    source: app.base_url('api/get_locations'),
    minLength: 2,
    delay: 250,
    select: function( event, ui ) {
      var property_location_item_rendered = Mustache.render(property_location_item, ui.item);
      $('.property-location-items').append(property_location_item_rendered);

      setTimeout(function(){
        $(".input-search-local").val('').focus();
      }, 200);

      get_properties();
    }
  });

  $('#properties-list-form').on('submit', function(event){
    event.preventDefault();
    get_properties_process();
  });
});
