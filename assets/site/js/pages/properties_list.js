var properties_list = app['properties_list'] = {};
var swiper_images_status = false;
var templates = {'properties-list-item': '', 'properties-list-location-item': ''};
var properties_list_get_timeout = 0;

$(function(){



  properties_list.properties = {
    'get': function($page){

      $('.property-items').addClass('processing');

      // SET PAGE FILTER
      $('#search-page').val($page || 1);

      Pace.track(function(){
        var properties_list_url = '';
        var properties_list_url_params = {};
        var params = {};

        params['transaction'] = $('#search-transaction').val();
        properties_list_url += params['transaction'];

        var state = [];
        var city = [];
        var district = [];

        var properties_list_url_location = [];

        $.each($('.property-location-item'), function(i, item){
          var $item = $(item);

          var location_item = {};

          location_item['label'] = $.trim($item.find('.property-location-item-label').text());

          if($item[0].hasAttribute("data-state") && $item.attr("data-state").length){
            location_item['state'] = $item.attr("data-state");

            if(state.length === 0){
              properties_list_url += '/' + $item.attr("data-state");
            }

            if(jQuery.inArray($item.attr("data-state"), state) === -1){
              state.push($item.attr("data-state"));
            }
          }

          if($item[0].hasAttribute("data-city") && $item.attr("data-city").length){
            location_item['city'] = $item.attr("data-city");

            if(city.length === 0){
              properties_list_url += '/' + $item.attr("data-city");
            }

            if(jQuery.inArray($item.attr("data-city"), city) === -1){
              city.push($item.attr("data-city"));
            }
          }

          if($item[0].hasAttribute("data-district") && $item.attr("data-district").length){
            location_item['district'] = $item.attr("data-district");

            if(district.length === 0){
              properties_list_url += '/' + $item.attr("data-district");
            }

            if(jQuery.inArray($item.attr("data-district"), district) === -1){
              district.push($item.attr("data-district"));
            }
          }

          properties_list_url_location.push(location_item);
        });

        properties_list_url_params['location'] = properties_list_url_location;

        params['state'] = state;
        params['city'] = city;
        params['district'] = district;

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
          var bedrooms = $('.properties-bedrooms.active').data('value');
          params['bedrooms'] = bedrooms;
          properties_list_url_params['bedrooms'] = bedrooms;
        }

        if($('.properties-garages.active').length){
          var garages = $('.properties-garages.active').data('value');
          params['garages'] = garages;
          properties_list_url_params['garages'] = bedrooms;
        }

        if($('.properties-bathrooms.active').length){
          var bathrooms = $('.properties-bathrooms.active').data('value');
          params['bathrooms'] = bathrooms;
          properties_list_url_params['bathrooms'] = bedrooms;
        }

        var get_properties_uri = 'api/get_properties';
        if(typeof $page !== 'undefined' && $page){
          get_properties_uri += '/' + $page;
        }

        //Swiper Destroy
        properties_list.swiper.destroy();

        $.ajax({
          url: app.base_url(get_properties_uri),
          method: 'post',
          dataType: 'json',
          data: params
        }).done(function(result) {
          $('.property-items').removeClass('processing');
          window.history.pushState('page', 'OOOOPS', app.base_url(properties_list_url + '#' + JSON.stringify(properties_list_url_params)));

          var template_properties_list_item = Mustache.render(templates['properties-list-item'], result);
          $('.property-items').html(template_properties_list_item);

          $('.pagination-content').html(result.pagination);

          $('html, body').animate({scrollTop: $('#section-body').offset().top}, {duration: 600, easing: 'swing'}).promise().then(function(){
              console.log('aaa');
          });

          properties_list.swiper.init();
        });
      });
    }, //get

    'process': function($page){
      clearTimeout(properties_list_get_timeout);
      properties_list_get_timeout = setTimeout(function(){
        properties_list.properties.get($page);
      }, 500);
    }, //process

    'filters': function(){
      if(window.location.hash) {
        var params = jQuery.parseJSON(window.location.hash.substring(1));
        console.log(params);

        if(typeof params['location'] !== 'undefined' && params['location'].length){
          var property_location_items = '';
          for(var item in params['location']) {
            var property_location_item_object = {'label': params['location'][item]['label'], 'location':params['location'][item]};
            properties_list.locations.add(property_location_item_object, false);
          }
        }
      }
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
          properties_list.properties.process(1);
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
            properties_list.properties.process(1);
          }, 200);
        }
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
    $('#search-property_type').select2({
      theme: "bootstrap",
      placeholder: 'Tipo de imóvel'
    })
    .on('select2:select', function () {
      properties_list.properties.process(1);
    })
    .on('select2:unselect', function(){
      properties_list.properties.process(1);
    });

    // MASK
    $('.price-mask, .area-mask').mask('000.000.000.000.000', {reverse: true});

    // DORMS, BANHEIROS e GARAGENS
    $('.properties-data-item').on('click', function(){
      $(this).closest('.properties-data').find('.properties-data-item').removeClass('active btn-info');
      $(this).addClass('active btn-info').blur();
      properties_list.properties.process(1);
    });

    // PAGINAÇAO JS
    $('.pagination-content').on('click', '.pagination-item', function(event){
      event.preventDefault();
      properties_list.properties.process($(this).attr('data-ci-pagination-page'));
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

      // SEND FORM
      $('#properties-list-form').on('submit', function(event){
        event.preventDefault();
        properties_list.properties.get(1);
      });

      properties_list.swiper.init();
    });

    properties_list.templates.get('properties-list-item');
    properties_list.templates.get('properties-list-location-item', function(){
      properties_list.properties.filters();
    });
  };

  properties_list.init();

}); //$function