var initMapa = function(){
  console.log('mapa');
};

jQuery('a[href="#gallery"]').on('shown.bs.tab', function (e) {
  var main_slider = $('.slide');
  var nav_slider = $('.slideshow-nav');
  main_slider.slick("unslick");
  nav_slider.slick("unslick");
  main_slider.slick({
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    asNavFor: '.slideshow-nav'
  });
  nav_slider.slick({
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 10,
    slidesToScroll: 1,
    asNavFor: '.slide',
    arrows: false,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
    {
      breakpoint: 991,
      settings:{
        slidesToShow: 8
      }
    },
    {
      breakpoint: 767,
      settings:{
        slidesToShow: 4
      }
    }
    ]
  });
});