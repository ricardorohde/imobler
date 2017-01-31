/*
var properties_list = app['properties_list'] = {};
var swiper_images_status = false;
var templates = {'properties-list-item': '', 'properties-list-location-item': ''};
var properties_list_get_timeout = 0;

$(function(){
  var search_property_type = $('#search-property_type');

  properties_list.properties = {
    'get': function($page, $refresh){

      $('.property-items').addClass('processing');

      // SET PAGE FILTER
      $('#search-page').val($page);

      Pace.track(function(){
        var properties_list_url = '';
        var properties_list_url_params = {};
        var params = {};

        params['transaction'] = $('#search-transaction').val();
        properties_list_url += params['transaction'];

        // LOCATION
        var locations_items = [];
        var locations_items_count = 0;
        $.each($('.property-location-item'), function(i, item){
          var $item = $(item);
          var location_item = {};

          if($item.find('.location-item-state').val()){
            location_item['state'] = $item.find('.location-item-state').val();

            if(!locations_items_count){
              properties_list_url += '/' + $item.find('.location-item-state').val();
            }
          }

          if($item.find('.location-item-city').val()){
            location_item['city'] = $item.find('.location-item-city').val();

            if(!locations_items_count){
              properties_list_url += '/' + $item.find('.location-item-city').val();
            }
          }

          if($item.find('.location-item-district').val()){
            location_item['district'] = $item.find('.location-item-district').val();

            if(!locations_items_count){
              properties_list_url += '/' + $item.find('.location-item-district').val();
            }
          }

          location_item['label'] = $.trim($item.find('.property-location-item-label').text());

          locations_items.push(location_item);
          locations_items_count++;
        });

        params['location'] = locations_items;
        properties_list_url_params['location'] = locations_items;

        if($('#search-property_type').val()){
          var property_types = $('#search-property_type');
          params['property_type'] = property_types.val();
          properties_list_url += '/' + property_types.val()[0];

          properties_list_url_params['property_types'] = property_types.val();
        }

        if($page != 1){
          properties_list_url += '/' + $page;
        }

        if($('#search-min_price').val().length){
          var min_price = $('#search-min_price');
          params['min_price'] = min_price.val();
          properties_list_url_params['min_price'] = min_price.val().replace(/[^0-9]/g, '');
        }

        if($('#search-max_price').val().length){
          var max_price = $('#search-max_price');
          params['max_price'] = max_price.val();
          properties_list_url_params['max_price'] = max_price.val().replace(/[^0-9]/g, '');
        }

        if($('#search-min_area').val().length){
          var min_area = $('#search-min_area');
          params['min_area'] = min_area.val();
          properties_list_url_params['min_area'] = min_area.val().replace(/[^0-9]/g, '');
        }

        if($('#search-max_area').val().length){
          var max_area = $('#search-max_area');
          params['max_area'] = max_area.val();
          properties_list_url_params['max_area'] = max_area.val().replace(/[^0-9]/g, '');
        }

        if($('.properties-bedrooms.active').length){
          var bedrooms = $('.properties-bedrooms.active').attr('data-value');
          params['bedrooms'] = bedrooms;
          properties_list_url_params['bedrooms'] = bedrooms;
        }

        if($('.properties-garages.active').length){
          var garages = $('.properties-garages.active').attr('data-value');
          params['garages'] = garages;
          properties_list_url_params['garages'] = garages;
        }

        if($('.properties-bathrooms.active').length){
          var bathrooms = $('.properties-bathrooms.active').attr('data-value');
          params['bathrooms'] = bathrooms;
          properties_list_url_params['bathrooms'] = bathrooms;
        }

        var get_properties_uri = 'api/get_properties';
        if(typeof $page !== 'undefined' && $page){
          get_properties_uri += '/' + $page;
        }

        properties_list_url_params['page'] = $page;

        var $base_url = properties_list_url;
        var $url_suffix = JSON.stringify(properties_list_url_params);

        console.log($base_url);


        //params['url_suffix'] = encodeURIComponent($url_suffix);

        window.history.pushState('page', 'OOOOPS', app.base_url($base_url += '#' + $url_suffix));

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

      if(window.location.hash) {
        properties_list.properties.denovo();
      }

      $(window).on("popstate", function(e) {
          properties_list.properties.denovo();
      });
    }

  }; //properties_list.properties

  // Swiper
  properties_list.swiper = {
    'init': function(){
      this.destroy();

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

      $('.swiper-container').each(function(i, item){
        item.swiper.destroy(true, true);
      });

      return swiper_images_status = false;
    } //destroy
  }; //properties_list.swiper

  properties_list.locations = {
    'add': function(json, refresh){
      var add = true;

      $.each($('.property-location-item-label'), function(i,item){
        if($.trim($('.property-location-item-label').html()) == json.label){
          add = false;
        }
      });

      if(add){
        var template_properties_list_item = Mustache.render(templates['properties-list-location-item'], json);
        //console.log('>>>' + templates['properties-list-location-item']);
        $('.property-location-items').append(template_properties_list_item);
        if(typeof refresh !== 'undefined' && refresh){
          properties_list.properties.process(1, true);
        }
      }

      setTimeout(function(){
        $(".input-search-local").val('').focus();
      }, 150);
    },

    'init': function(){
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

      $(".input-search-local").catcomplete({
        source: app.base_url('api/get_locations'),
        minLength: 2,
        delay: 250,
        select: function(event, ui) {
          properties_list.locations.add(ui.item, true);
        }
      });

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

  properties_list.templates = {
    'get': function($template, $callback){
      $.get(app.base_url('assets/site/templates/'+ $template + '.mustache'), function( html ) {
        templates[$template] = html;
        Mustache.parse($template);

        if($callback) $callback();
      });
    }
  };

  properties_list.init = function(){
    properties_list.locations.init();

    // PROPERTIES TYPES SELECT
    search_property_type.select2({
      theme: "bootstrap",
      placeholder: 'Tipo de imóvel'
    })
    .on('select2:select', function () {
      properties_list.properties.process(1, true);
    })
    .on('select2:unselect', function(){
      properties_list.properties.process(1, true);
    });

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

    // SEND FORM
    $('#properties-list-form').on('submit', function(event){
      event.preventDefault();
      properties_list.properties.get(1, true);
    });

    properties_list.swiper.init();

    properties_list.templates.get('properties-list-item');
    properties_list.templates.get('properties-list-no-results');
    properties_list.templates.get('properties-list-location-item', function(){
      //properties_list.properties.process(1, false);
      properties_list.properties.filters();
    });
  };

  properties_list.init();

}); //$function
*/
