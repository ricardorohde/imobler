$( function() {
  var get_search_url_by_location = function(){
    var params = {
      'id': $('#banner-search-main-id').val(),
      'category': $('#banner-search-main-category').val(),
      'transaction': $('#banner-search-main-transaction').val(),
      'type': $('#banner-search-main-type').find('option:selected').val()
    };

    $.ajax({
      url: app.base_url('api/get_search_url_by_location'),
      method: 'post',
      dataType: 'json',
      data: params
    }).done(function(result) {
      window.location.href = app.base_url(result.url);
    });
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
      $('#banner-search-main-id').val(ui.item.id);
      $('#banner-search-main-category').val(ui.item.category.slug);
      get_search_url_by_location();
    }
  });

  $('#banner-search-main-form').on('submit', function(event){
    event.preventDefault();
    get_search_url_by_location();
  });
});

// $( function() {

//     // var availableTags = [
//     //     {category: "favourite", label: "c#", value: "c#", },
//     //     {category: "favourite", label: "JavaScript", value: "JavaScript"},
//     //     {category: "other", label: "c++", value: "c++"},
//     //     {category: "other", label: "jc", value: "c"},
//     //     {category: "favourite", label: "Java", value: "Java"},
//     //     {category: "favourite", label: "J#", value: "J#"},
//     // ];

//     // var customRenderMenu = function(ul, items){
//     //     var self = this;
//     //     var category = null;

//     //     var sortedItems = items.sort(function(a, b) {
//     //        return a.category.localeCompare(b.category);
//     //     });

//     //     $.each(sortedItems, function (index, item) {
//     //         if (item.category != category) {
//     //             category = item.category;
//     //             ul.append("<li class='ui-autocomplete-group'>" + category + "</li>");
//     //         }
//     //         self._renderItemData(ul, item);
//     //     });
//     // };

//     // $( ".input-search-local" ).autocomplete({
//     //   source: availableTags,
//     //   create: function () {
//     //       //access to jQuery Autocomplete widget differs depending
//     //       //on jQuery UI version - you can also try .data('autocomplete')
//     //       $(this).data('uiAutocomplete')._renderMenu = customRenderMenu;
//     //   }
//     // });

//     var isHoverSelect = false;
//     var customRenderTimeout = 0;
//     var customRenderMenu = function(ul, items){
//         var self = this;
//         var categoryArr = [];

//         clearTimeout(customRenderTimeout);

//         function contain(item, array) {
//             var contains = false;
//             $.each(array, function (index, value) {
//                 if (item == value) {
//                     contains = true;
//                     return false;
//                 }
//             });
//             return contains;
//         }

//         $.each(items, function (index, item) {
//             if (! contain(item.category, categoryArr)) {
//                 categoryArr.push(item.category);
//             }
//             console.log(categoryArr);
//         });

//         $.each(categoryArr, function (index, category) {
//             ul.append("<span class='ui-menu-group'>" + category + "</span>");
//             $.each(items, function (index, item) {
//                 if (item.category == category) {
//                     self._renderItemData(ul, item);
//                 }
//             });
//         });

//         customRenderTimeout = setTimeout(function(){
//           //ul.find('span.ui-menu-group').removeClass('ui-menu-item');
//         }, 250);
//     };

//     $( ".input-search-local" ).autocomplete({
//         source: app.base_url('api/get_locations'),
//         delay: 0,
//         create: function () {
//           $(this).data('uiAutocomplete')._renderMenu = customRenderMenu;
//         },
//         select: function( event, ui ) {
//           console.log( ui );
//         }
//     });
// } );
