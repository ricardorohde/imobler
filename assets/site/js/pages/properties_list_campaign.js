var properties_list_campaign = app['properties_list_campaign'] = {};

$(function(){
  // Init
  properties_list_campaign.init = function(){

    // VIEW TYPE
    var view_type_btn = $('.view-btn');
    var view_type_area = $('.property-listing');

    view_type_btn.on('click', function(){
      var $this = $(this);
      view_type_btn.removeClass('active');
      $this.addClass('active');

      if($this.hasClass('btn-list')) {
        $.post(app.base_url('api/set_listview'), {listview: "list-view"});
        view_type_area.removeClass('grid-view grid-view-3-col').addClass('list-view');
      }

      else if($this.hasClass('btn-grid')) {
        $.post(app.base_url('api/set_listview'), {listview: "grid-view"});
        view_type_area.removeClass('list-view grid-view-3-col').addClass('grid-view');
      }

      else if($this.hasClass('btn-grid-3-col')) {
        $.post(app.base_url('api/set_listview'), {listview: "grid-view grid-view-3-col"});
        view_type_area.removeClass('list-view').addClass('grid-view grid-view-3-col');
      }
    });
  };

  properties_list_campaign.init();

});
