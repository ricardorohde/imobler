var properties_list = app['properties_list'] = {};
var swiper_images_status = false;
var templates = {'properties-list-item': '', 'properties-list-location-item': ''};

$(function(){
  var search_property_type = $('#search-property_type');

  // Atualiza registros
  properties_list.update = function(){
    var properties_list_url_filters = {};
    var properties_list_url = '';
    var params = {};

    $('.property-items').addClass('processing');


    // TRANSACTION
    var $transaction = params['transaction'] = $('#search-transaction').val();
    properties_list_url += $transaction;


    // LOCATION
    var locations_items = [];
    var locations_items_count = 0;
    $.each($('.property-location-item'), function(i, item){
      var $item = $(item);
      var location_item = {};

      var $location_state = $item.find('.location-item-state');
      if($location_state.length && $location_state.val()){
        location_item['state'] = $location_state.val();
        if(!locations_items_count){
          properties_list_url += '/' + $location_state.val();
        }
      }

      var $location_city = $item.find('.location-item-city');
      if($location_city.length && $location_city.val()){
        location_item['city'] = $location_city.val();
        if(!locations_items_count){
          properties_list_url += '/' + $location_city.val();
        }
      }

      var $location_district = $item.find('.location-item-district');
      if($location_district.length && $location_district.val()){
        location_item['district'] = $location_district.val();
        if(!locations_items_count){
          properties_list_url += '/' + $location_district.val();
        }
      }

      location_item['label'] = $.trim($item.find('.property-location-item-label').text());

      locations_items.push(location_item);
      locations_items_count++;
    });

    params['location'] = locations_items;
    properties_list_url_filters['location'] = locations_items;


    // PROPERTY TYPE
    if(search_property_type.val()){
      params['property_type'] = search_property_type.val();
      properties_list_url += '/' + search_property_type.val()[0];
      properties_list_url_filters['property_types'] = search_property_type.val();
    }


    // PAGE
    var $page = params['page'] = $('#search-page').val();
    if($page > 1) {
      properties_list_url += '/' + $page;
    }

    //MIN-MAX PRICE
    var $min_price = $('#search-min_price');
    var $max_price = $('#search-max_price');
    if($min_price.val()){
      params['min_price'] = $min_price.val();
      properties_list_url_filters['min_price'] = $min_price.val().replace(/[^0-9]/g, '');
    }
    if($max_price.val()){
      params['max_price'] = $max_price.val();
      properties_list_url_filters['max_price'] = $max_price.val().replace(/[^0-9]/g, '');
    }

    // MIN-MAX AREA
    var $min_area = $('#search-min_area');
    var $max_area = $('#search-max_area');
    if($min_area.val()){
      params['min_area'] = $min_area.val();
      properties_list_url_filters['min_area'] = $min_area.val().replace(/[^0-9]/g, '');
    }
    if($max_area.val()){
      params['max_area'] = $max_area.val();
      properties_list_url_filters['max_area'] = $max_area.val().replace(/[^0-9]/g, '');
    }

    // BEDROOMS
    var $bedrooms = $('.properties-bedrooms.active');
    if($bedrooms.length){
      params['bedrooms'] = $bedrooms.attr('data-value');
      properties_list_url_filters['bedrooms'] = $bedrooms.attr('data-value');
    }

    // GARAGES
    var $garages = $('.properties-garages.active');
    if($garages.length){
      params['garages'] = $garages.attr('data-value');
      properties_list_url_filters['garages'] = $garages.attr('data-value');
    }

    // BATHROOMS
    var $bathrooms = $('.properties-bathrooms.active');
    if($bathrooms.length){
      params['bathrooms'] = $bathrooms.attr('data-value');
      properties_list_url_filters['bathrooms'] = $bathrooms.attr('data-value');
    }

    var properties_list_url_filters_json = JSON.stringify(properties_list_url_filters);

    window.history.pushState('page', 'OOOOPS', app.base_url(properties_list_url + '#' + properties_list_url_filters_json));


        // var get_properties_uri = 'api/get_properties';
        // if(typeof $page !== 'undefined' && $page){
        //   get_properties_uri += '/' + $page;
        // }

    console.log(properties_list_url);
    console.log(properties_list_url);
    console.log(params);

    return true;
  };


  // Atualiza filtros
  properties_list.set_filters = function($params, $update){
    console.log('atualiza filtros');
    console.log($params);

    if(typeof $params['page'] !== 'undefined'){
      $('#search-page').val($params['page']);
    }

    if(typeof $params['location'] !== 'undefined' && $params['location'].length){
      var add = true;

      for($location in $params['location']){
        var $location_item = $params['location'][$location];

        $.each($('.property-location-item-label'), function(i,item){
          if($.trim($(item).html()) == $location_item.label){
            add = false;
          }
        });

        if(add){
          var template_properties_list_item = Mustache.render(templates['properties-list-location-item'], json);
          $('.property-location-items').append(template_properties_list_item);
          if(typeof refresh !== 'undefined' && refresh){
            properties_list.properties.process(1, true);
          }
        }
      }





      // setTimeout(function(){
      //   $(".input-search-local").val('').focus();
      // }, 150);
    }




    if(typeof $update !== 'undefined' && $update){
      return properties_list.update();
    }

    return true;
  };

  properties_list.get_url_filters = function($update){
    console.log('pega url filtros');

    var url_filters = jQuery.parseJSON(window.location.hash.substring(1));
    return properties_list.set_filters(url_filters, $update || false);
  };

  // Swiper
  properties_list.swiper = {
    'init': function(){
      this.destroy();

      console.log('swiper init');

      $.each($('.swiper-container'), function(i, item){
        $(item).addClass('images-' + $(item).find('.swiper-slide').length);

        new Swiper(item, {
          spaceBetween: 2,
          preloadImages: false,
          lazyLoading: true,
          slidesPerView: 1,
          resizeReInit: true,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
        });
      });

      return swiper_images_status = true;
    }, //init

    'destroy': function(){
      if(!swiper_images_status) return;

      console.log('swiper init');

      $('.swiper-container').each(function(i, item){
        item.swiper.destroy(true, true);
      });

      return swiper_images_status = false;
    } //destroy
  }; //properties_list.swiper

  properties_list.get_templates = function($template, $callback){
    $.get(app.base_url('assets/site/templates/'+ $template + '.mustache'), function( html ) {
      templates[$template] = html;
      Mustache.parse($template);

      if($callback) $callback();
    });
  };

  // Init
  properties_list.init = function(){

    // SEND FORM
    $('#properties-list-form').on('submit', function(event){
      event.preventDefault();
      properties_list.update();
    });

    // LOCATION AUTOCOMPLETE
    $.widget("custom.catcomplete", $.ui.autocomplete, {
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

    $(".input-search-local").catcomplete({
      source: app.base_url('api/get_locations'),
      minLength: 2,
      delay: 250,
      select: function(event, ui) {
        var filter_item = {
          "page": 1,
          "location": []
        };
        var location_item = ui.item.location;
        location_item.label = ui.item.label;
        filter_item.location.push(location_item);
        properties_list.set_filters(filter_item, true);
      }
    });

    // PROPERTIES TYPES SELECT
    search_property_type.select2({
      theme: "bootstrap",
      placeholder: 'Tipo de imóvel'
    })
    .on('select2:select', function () {
      properties_list.set_filters({"page":1}, true);
    })
    .on('select2:unselect', function(){
      properties_list.set_filters({"page":1}, true);
    });

    properties_list.get_templates('properties-list-item');
    properties_list.get_templates('properties-list-no-results');
    properties_list.get_templates('properties-list-location-item');

    if(window.location.hash) {
      return properties_list.get_url_filters(true);
    }

    $(window).on("popstate", function(e) {
      properties_list.get_url_filters(true);
    });

    properties_list.swiper.init();

  };

  properties_list.init();

}); //$function



/*



var properties_list_get_timeout = 0;

$(function(){
  var search_property_type = $('#search-property_type');

  properties_list.properties = {
    'get': function($page, $refresh){



      // SET PAGE FILTER
      $('#search-page').val($page);

      Pace.track(function(){

        var properties_list_url_filters = {};




















        var $base_url = properties_list_url;


        console.log($base_url);


        //params['url_suffix'] = encodeURIComponent($url_suffix);



        if(typeof $refresh !== 'undefined' && $refresh){
          params['base_url'] = $base_url;

          //Swiper Destroy
          properties_list.swiper.destroy();

          $.ajax({
            url: app.base_url(get_properties_uri),
            method: 'post',
            dataType: 'json',
            data: params
          }).done(function(result) {
            $('html, body').animate({scrollTop: $('#section-body').offset().top}, {duration: 600, easing: 'swing'});



            $('.property-items').removeClass('processing');

            if(result === false){
              var template_properties_list_no_results = Mustache.render(templates['properties-list-no-results'], result);
              $('.property-items').html(template_properties_list_no_results);
              $('.pagination-content').empty();

              return false;
            }

            var template_properties_list_item = Mustache.render(templates['properties-list-item'], result);
            $('.property-items').html(template_properties_list_item);

            $('.pagination-content').html(result.pagination);

            properties_list.swiper.init();
          });
        }else{
          $('.property-items').removeClass('processing');
        }
      });
    }, //get

    'process': function($page, $refresh){
      clearTimeout(properties_list_get_timeout);
      properties_list_get_timeout = setTimeout(function(){
        properties_list.properties.get($page, $refresh);
      }, 500);
    }, //process

    'denovo': function(){
      var params = jQuery.parseJSON(window.location.hash.substring(1));

      if(typeof params['location'] !== 'undefined' && params['location'].length){
        var property_location_items = '';
        for(var item in params['location']) {
          var property_location_item_object = {'label': params['location'][item]['label'], 'location':params['location'][item]};
          properties_list.locations.add(property_location_item_object, false);
        }
      }

      if(typeof params['property_types'] !== 'undefined' && params['property_types'].length){
        search_property_type.val(params['property_types']).trigger("change");
      }

      if(typeof params['min_price'] !== 'undefined' && params['min_price']){
        $('#search-min_price').val(params['min_price']).unmask();
      }

      if(typeof params['max_price'] !== 'undefined' && params['max_price']){
        $('#search-max_price').val(params['max_price']).unmask();
      }

      if(typeof params['bedrooms'] !== 'undefined' && params['bedrooms']){
        $('.properties-data-item.properties-bedrooms[data-value='+ params['bedrooms'] +']').addClass('active btn-info');
      }

      if(typeof params['garages'] !== 'undefined' && params['garages']){
        $('.properties-data-item.properties-garages[data-value='+ params['garages'] +']').addClass('active btn-info');
      }

      if(typeof params['bathrooms'] !== 'undefined' && params['bathrooms']){
        $('.properties-data-item.properties-bathrooms[data-value='+ params['bathrooms'] +']').addClass('active btn-info');
      }

      if(typeof params['min_area'] !== 'undefined' && params['min_area']){
        $('#search-min_area').val(params['min_area']).unmask();
      }

      if(typeof params['max_area'] !== 'undefined' && params['max_area']){
        $('#search-max_area').val(params['max_area']).unmask();
      }

      if(typeof params['page'] !== 'undefined' && params['page']){
        $('#search-page').val(params['page']);
      }

      properties_list.properties.get(params['page'], true);

    },

    'filters': function(){


    }

  }; //properties_list.properties



  properties_list.locations = {
    'add': function(json, refresh){

    },

    'init': function(){


      // REMOVER LOCALIZAÇÃO
      $('.property-location-items').on('click', '.property-location-item-remove', function(){
        if($('.property-location-item').length == 1){
          alert('nao pode');
        }else{
          $(this).closest('.property-location-item').remove();
          setTimeout(function(){
            properties_list.properties.process(1, true);
          }, 200);
        }
      });

      $('#search-min_price, #search-max_price, #search-min_area, #search-min_area').on('blur', function(){
        properties_list.properties.process(1, true);
      });
    }
  };



  properties_list.init = function(){
    properties_list.locations.init();



    // MASK
    $('.price-mask, .area-mask').mask('000.000.000.000.000', {reverse: true});

    // DORMS, BANHEIROS e GARAGENS
    $('.properties-data-item').on('click', function(){
      var $this = $(this);

      if($this.hasClass('active btn-info')){
        $this.removeClass('active btn-info');
      }else{
        $(this).closest('.properties-data').find('.properties-data-item').removeClass('active btn-info');
        $(this).addClass('active btn-info').blur();
      }

      properties_list.properties.process(1, true);
    });

    // PAGINAÇAO JS
    $('.pagination-content').on('click', '.pagination-item', function(event){
      event.preventDefault();
      properties_list.properties.process($(this).attr('data-ci-pagination-page'), true);
    });

    // VIEW TYPE
    var view_type_btn = $('.view-btn');
    var view_type_area = $('.property-listing');
    view_type_btn.on('click', function(){
      var $this = $(this);
      view_type_btn.removeClass('active');
      $this.addClass('active');

      if($this.hasClass('btn-list')) {
        $.post(app.base_url('api/set_listview'), {listview: "list-view"});
        view_type_area.removeClass('grid-view').addClass('list-view');
      }
      else if($this.hasClass('btn-grid')) {
        $.post(app.base_url('api/set_listview'), {listview: "grid-view"});
        view_type_area.removeClass('list-view').addClass('grid-view');
      }

      properties_list.swiper.init();
    });



    properties_list.swiper.init();


  };

  properties_list.init();

}); //$function
*/
