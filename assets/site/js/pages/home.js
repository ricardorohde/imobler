var search_process = false;

$( function() {
  var get_search_url_by_location = function(){
    var url = '';
    var url_filters = {'location':[],'page':1}
    var url_filter = {};

    // Transaction
    url += ( $('#banner-search-main-transaction').val().length ?  $('#banner-search-main-transaction').val() : 'venda');

    // State
    url += '/' + $('#banner-search-main-state').val();
    url_filter['state'] = $('#banner-search-main-state').val();

    // City
    url += '/' + $('#banner-search-main-city').val();
    url_filter['city'] = $('#banner-search-main-city').val();

    // District
    if($('#banner-search-main-district').val().length){
      url += '/' + $('#banner-search-main-district').val();
      url_filter['district'] = $('#banner-search-main-district').val();
    }

    url_filter['label'] = $('.input-search-local').val();

    // Property Type
    var property_type = $('#banner-search-main-type').find('option:selected').val();
    if(property_type !== '0'){
      url += '/' + property_type;
      url_filters['property_type'] = [property_type];
    }

    url_filters.location.push(url_filter);
    // + '#' + JSON.stringify(url_filters)

    // Redirect
    window.location.href = app.base_url(url);
    //console.log(app.base_url(url + '#' + JSON.stringify(url_filters)));
  };

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
    select: function( event, ui ) {
      search_process = true;

      $('#banner-search-main-state').val(ui.item.location.state);
      $('#banner-search-main-city').val(ui.item.location.city);
      $('#banner-search-main-district').val(ui.item.location.district);

      //get_search_url_by_location();
    }
  });

  $('#banner-search-main-form').on('submit', function(event){
    event.preventDefault();
    if(search_process){
      get_search_url_by_location();
    }
  });
});
