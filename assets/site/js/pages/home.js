$( function() {

    // var availableTags = [
    //     {category: "favourite", label: "c#", value: "c#", },
    //     {category: "favourite", label: "JavaScript", value: "JavaScript"},
    //     {category: "other", label: "c++", value: "c++"},
    //     {category: "other", label: "jc", value: "c"},
    //     {category: "favourite", label: "Java", value: "Java"},
    //     {category: "favourite", label: "J#", value: "J#"},
    // ];

    // var customRenderMenu = function(ul, items){
    //     var self = this;
    //     var category = null;

    //     var sortedItems = items.sort(function(a, b) {
    //        return a.category.localeCompare(b.category);
    //     });

    //     $.each(sortedItems, function (index, item) {
    //         if (item.category != category) {
    //             category = item.category;
    //             ul.append("<li class='ui-autocomplete-group'>" + category + "</li>");
    //         }
    //         self._renderItemData(ul, item);
    //     });
    // };

    // $( ".input-search-local" ).autocomplete({
    //   source: availableTags,
    //   create: function () {
    //       //access to jQuery Autocomplete widget differs depending
    //       //on jQuery UI version - you can also try .data('autocomplete')
    //       $(this).data('uiAutocomplete')._renderMenu = customRenderMenu;
    //   }
    // });

    var isHoverSelect = false;
    var customRenderTimeout = 0;
    var customRenderMenu = function(ul, items){
        var self = this;
        var categoryArr = [];

        clearTimeout(customRenderTimeout);

        function contain(item, array) {
            var contains = false;
            $.each(array, function (index, value) {
                if (item == value) {
                    contains = true;
                    return false;
                }
            });
            return contains;
        }

        $.each(items, function (index, item) {
            if (! contain(item.category, categoryArr)) {
                categoryArr.push(item.category);
            }
            console.log(categoryArr);
        });

        $.each(categoryArr, function (index, category) {
            ul.append("<span class='ui-menu-group'>" + category + "</span>");
            $.each(items, function (index, item) {
                if (item.category == category) {
                    self._renderItemData(ul, item);
                }
            });
        });

        customRenderTimeout = setTimeout(function(){
          //ul.find('span.ui-menu-group').removeClass('ui-menu-item');
        }, 250);
    };

    $( ".input-search-local" ).autocomplete({
        source: app.base_url('api/get_locations'),
        delay: 0,
        create: function () {
          $(this).data('uiAutocomplete')._renderMenu = customRenderMenu;
        },
        select: function( event, ui ) {
          console.log( ui );
        }
    });
} );
