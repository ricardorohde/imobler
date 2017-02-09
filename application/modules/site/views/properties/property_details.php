<section class="detail-top detail-top-full">
  <div class="detail-media">
    <div class="tab-content">
      <div id="gallery" class="tab-pane fade in active" style="background-image: url('http://placehold.it/1423x600')">
        <a href="#" class="popup-trigger popup-trigger-v2"></a>
        <div class="media-tabs-up">
          <div class="container">
            <span class="label-wrap">
              <span class="label label-primary">For Rent</span>
              <span class="label label-danger">Sold</span>
            </span>
          </div>
        </div>
        <div class="media-detail-down">
          <div class="container">
            <div class="header-detail table-list">
              <div class="header-left table-cell">

                <ol class="breadcrumb">
                  <li><a href="#"><i class="fa fa-home"></i></a></li>
                  <li><a href="#">Library</a></li>
                  <li class="active">Data</li>
                </ol>
                <div class="table-cell"><h1>Family home</h1></div>

                <div class="table-cell">
                  <ul class="actions">
                    <li class="share-items">
                      <div class="share_tooltip fade">
                        <a class="share-item" href="http://www.facebook.com/share.php?u={{imovel_permalink}}&title={{tipo_nome}} à venda em {{bairro_nome}}+{{imovel_permalink}}"><i class="fa fa-facebook"></i></a>
                        <a class="share-item" href="http://twitter.com/intent/tweet?status={{tipo_nome}} à venda em {{bairro_nome}}+{{imovel_permalink}}"><i class="fa fa-twitter"></i></a>
                        <a class="share-item" href="https://plus.google.com/share?url={{imovel_permalink}}"><i class="fa fa-google-plus"></i></a>
                      </div>
                      <span class="share-btn" title="Compartilhar" data-placement="top" data-toggle="property-tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                    </li>

                    <li>
                      <span title="Adicionar aos favoritos" data-property_id="<?php echo $property['imovel_id']; ?>" data-action="<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'unlike' : 'like'; ?>" class="btn-like <?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'active' : ''; ?>" data-placement="top" data-toggle="property-tooltip" data-original-title="Adicionar aos favoritos">
                        <i class="fa fa-heart"></i>
                      </span>
                    </li>
                  </ul>
                </div>
                <address class="property-address">S Crandon Ave</address>
              </div>
              <div class="header-right table-cell">
                <h1>$11,500/mo</h1>
                <h4>$21,000/mo</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="map" class="tab-pane fade"></div>
      <div id="street-map" class="tab-pane fade"></div>
    </div>
    <div class="media-tabs-up">
      <div class="container">
        <div class="media-tabs">
          <ul class="media-tabs-list">
            <li class="popup-trigger" data-placement="bottom" data-toggle="tooltip" data-original-title="View Photos">
              <a href="#gallery" data-toggle="tab">
                <i class="fa fa-camera"></i>
              </a>
            </li>
            <li data-placement="bottom" data-toggle="tooltip" data-original-title="Map View">
              <a href="#map" data-toggle="tab">
                <i class="fa fa-map"></i>
              </a>
            </li>
            <li data-placement="bottom" data-toggle="tooltip" data-original-title="Street View">
              <a href="#street-map" data-toggle="tab">
                <i class="fa fa-street-view"></i>
              </a>
            </li>
          </ul>
          <ul class="actions">
            <li class="share-items">
              <div class="share_tooltip fade">
                <a class="share-item" href="http://www.facebook.com/share.php?u={{imovel_permalink}}&title={{tipo_nome}} à venda em {{bairro_nome}}+{{imovel_permalink}}"><i class="fa fa-facebook"></i></a>
                <a class="share-item" href="http://twitter.com/intent/tweet?status={{tipo_nome}} à venda em {{bairro_nome}}+{{imovel_permalink}}"><i class="fa fa-twitter"></i></a>
                <a class="share-item" href="https://plus.google.com/share?url={{imovel_permalink}}"><i class="fa fa-google-plus"></i></a>
              </div>
              <span class="share-btn" title="Compartilhar" data-placement="top" data-toggle="property-tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
            </li>

            <li>
              <span title="Adicionar aos favoritos" data-property_id="<?php echo $property['imovel_id']; ?>" data-action="<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'unlike' : 'like'; ?>" class="btn-like <?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'active' : ''; ?>" data-placement="top" data-toggle="property-tooltip" data-original-title="Adicionar aos favoritos">
                <i class="fa fa-heart"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section><!--/detail-top-->

<section id="section-body">
  <section class="section-detail-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 container-contentbar">
          <div class="detail-bar">
            <div class="property-description detail-block">
              <div class="detail-title">
                <h2 class="title-left">Description</h2>
                <div class="title-right">
                  <a href="#">Flag this listing <i class="fa fa-flag"></i></a>
                </div>
              </div>
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, condimentum feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. </p>
              <p>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. </p>
            </div>
            <div class="detail-address detail-block">
              <div class="detail-title">
                <h2 class="title-left">Address</h2>
                <div class="title-right">
                  <a href="#">Open on Google Maps <i class="fa fa-map-marker"></i></a>
                </div>
              </div>
              <ul class="list-three-col">
                <li><strong>Address:</strong> 7601 East Treasure Drive</li>
                <li><strong>City:</strong> Miami Beach</li>
                <li><strong>State/Country:</strong> Florida</li>
                <li><strong>Zip:</strong> 33139</li>
                <li><strong>Country:</strong> United States</li>
                <li><strong>Neighbourhood:</strong> Miami</li>
              </ul>
            </div>
            <div class="detail-list detail-block">
              <div class="detail-title">
                <h2 class="title-left">Detail</h2>
                <div class="title-right">
                  <p>Information last updated on 11/29/2015 12:00 AM</p>
                </div>
              </div>
              <div class="alert alert-info">
                <ul class="list-three-col">
                  <?php
                  $detalhes = array('imovel_id' => 'ID do Imóvel', 'imovel_dormitorios' => 'Dormitórios', 'imovel_banheiros' => 'Banheiros');
                  foreach ($detalhes as $detalhe_slug => $detalhe_nome) {
                    if(isset($property[$detalhe_slug]) && $property[$detalhe_slug]){
                      ?>
                      <li><strong><?php echo $detalhe_nome; ?>:</strong> <?php echo $property[$detalhe_slug]; ?></li>
                      <?php
                    }
                  }
                  ?>
                </ul>
              </div>
              <div class="detail-title-inner">
                <h4 class="title-inner">Additional details</h4>
              </div>
              <ul class="detail-amenities-list">
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-1.png'); ?>" width="37" height="50" alt="Icon"></div>
                      <div class="media-body"> Property ID<br> HZ01 </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-2.png'); ?>" width="50" height="30" alt="Icon"></div>
                      <div class="media-body">  8 Full<br> Bedrooms  </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-3.png'); ?>" width="50" height="34" alt="Icon"></div>
                      <div class="media-body"> 4 Full<br> Bathrooms </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-4.png'); ?>" width="50" height="46" alt="Icon"></div>
                      <div class="media-body"> Property Size<br> 2100 Sq Ft </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-5.png'); ?>" width="48" height="48" alt="Icon"></div>
                      <div class="media-body"> Garage Size<br> 200 SqFt </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-6.png'); ?>" width="50" height="34" alt="Icon"></div>
                      <div class="media-body"> 4 Garage<br> Spaces </div>
                  </li>
                  <li class="media">
                      <div class="media-left media-middle"><img src="<?php echo base_url('assets/site/images/icons/icon-7.png'); ?>" width="50" height="50" alt="Icon"></div>
                      <div class="media-body"> Year Built<br> 2016-01-09 </div>
                  </li>
              </ul>
            </div>


            <?php
            if(isset($property['features']) && !empty($property['features'])){
              ?>
              <div class="detail-features detail-block">
                <div class="detail-title">
                  <h2 class="title-left">Características</h2>
                </div>
                <ul class="list-three-col list-features">
                  <?php
                  foreach($property['features'] as $feature){
                    ?>
                    <li><i class="fa fa-check"></i><?php echo $feature['nome']; ?></li>
                    <?php
                  }
                  ?>
                </ul>
              </div>
              <?php
            }
            ?>

            <div class="property-plans detail-block">
              <div class="detail-title">
                <h2 class="title-left">Floor plans</h2>
              </div>
              <div class="accord-block">
                <div class="accord-tab">
                  <h3>Floor Plan A</h3>
                  <ul>
                    <li>Size: <strong>1,234 sqft</strong></li>
                    <li>Beds: <strong>4</strong></li>
                    <li>Baths: <strong>3</strong></li>
                    <li>Price: <strong>$1,200/mo</strong></li>
                  </ul>
                  <div class="expand-icon active"></div>
                </div>
                <div class="accord-content" style="display: block">
                  <img src="<?php echo base_url('assets/site/images/floor-image.png'); ?>" alt="img" width="400" height="436">
                </div>
                <div class="accord-tab">
                  <h3>Floor Plan B</h3>
                  <ul>
                    <li>Size: <strong>1,234 sqft</strong></li>
                    <li>Beds: <strong>4</strong></li>
                    <li>Baths: <strong>3</strong></li>
                    <li>Price: <strong>$1,200/mo</strong></li>
                  </ul>
                  <div class="expand-icon"></div>
                </div>
                <div class="accord-content">
                  <img src="<?php echo base_url('assets/site/images/floor-image.png'); ?>" alt="img" width="400" height="436">
                </div>
                <div class="accord-tab">
                  <h3>Floor Plan C</h3>
                  <ul>
                    <li>Size: <strong>1,234 sqft</strong></li>
                    <li>Beds: <strong>4</strong></li>
                    <li>Baths: <strong>3</strong></li>
                    <li>Price: <strong>$1,200/mo</strong></li>
                  </ul>
                  <div class="expand-icon"></div>
                </div>
                <div class="accord-content">
                  <img src="<?php echo base_url('assets/site/images/floor-image.png'); ?>" alt="img" width="400" height="436">
                </div>
              </div>
              <div class="detail-title-inner">
                <h4 class="title-inner">Property Documents</h4>
              </div>
              <ul class="document-list">
                <li>
                  <div class="pull-left">
                    <i class="fa fa-file-o"></i> Property plan PDF
                  </div>
                  <div class="pull-right">
                    <a href="#">DOWNLOAD</a>
                  </div>
                </li>
                <li>
                  <div class="pull-left">
                    <i class="fa fa-file-o"></i> Brochure PDF
                  </div>
                  <div class="pull-right">
                    <a href="#">DOWNLOAD</a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="property-video detail-block">
              <div class="detail-title">
                <h2 class="title-left">Video</h2>
              </div>
              <div class="video-block">
                <a href="https://www.youtube.com/watch?v=QK66RK7ogKU" data-fancy="property_video" title="YouTube demo">
                  <span class="play-icon"><img src="<?php echo base_url('assets/site/images/icons/video-play-icon.png'); ?>" alt="YouTube demo" width="70" height="50"></span>
                  <img src="http://placehold.it/750x388" alt="thumb" class="video-thumb">
                </a>
              </div>
            </div>
            <div class="detail-contact detail-block">
              <div class="detail-title">
                <h2 class="title-left">Contact info</h2>
                <div class="title-right"><strong><a href="#">View my listing</a></strong></div>
              </div>
              <div class="media agent-media">
                <div class="media-left">
                  <a href="#">
                    <img src="http://placehold.it/74x74" class="media-object" alt="image" width="74" height="74">
                  </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">CONTACT AGENT</h4>
                  <ul>
                    <li><i class="fa fa-user"></i> Kenneth Phllips</li>
                    <li>
                      <span><i class="fa fa-phone"></i> (987) 654 3210</span>
                      <span><i class="fa fa-mobile"></i>  (987) 654 3210</span>
                      <span><a href="#"><i class="fa fa-skype"></i>  kenneth.phllips</a></span>
                    </li>
                    <li>
                      <span><a href="#"><i class="fa fa-facebook-square"></i> Facebook</a></span>
                      <span><a href="#"><i class="fa fa-twitter-square"></i>  Twitter</a></span>
                      <span><a href="#"><i class="fa fa-linkedin-square"></i>  Linkedin</a></span>
                      <span><a href="#"><i class="fa fa-instagram"></i>  Linkedin</a></span>
                      <span><a href="#"><i class="fa fa-pinterest-square"></i>  Linkedin</a></span>
                      <span><a href="#"><i class="fa fa-globe"></i>  Linkedin</a></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="detail-title-inner">
                <h4 class="title-inner">Inquire about this propertys</h4>
              </div>
              <form>
                <div class="row">
                  <div class="col-sm-4 col-xs-12">
                    <div class="form-group">
                      <input class="form-control" placeholder="Your Name" type="text">
                    </div>
                  </div>
                  <div class="col-sm-4 col-xs-12">
                    <div class="form-group">
                      <input class="form-control" placeholder="Phone" type="text">
                    </div>
                  </div>
                  <div class="col-sm-4 col-xs-12">
                    <div class="form-group">
                      <input class="form-control" placeholder="Email" type="email">
                    </div>
                  </div>
                  <div class="col-sm-12 col-xs-12">
                    <div class="form-group">
                      <textarea class="form-control" rows="5" placeholder="Location"></textarea>
                    </div>
                  </div>
                </div>
                <button class="btn btn-secondary">Request info</button>
              </form>
            </div>

            <div class="next-prev-block clearfix">
              <div class="prev-box pull-left">
                <div class="media">
                  <div class="media-left">
                    <a href="#">
                      <img src="http://placehold.it/99x99" class="media-object" alt="image" width="99" height="99">
                    </a>
                  </div>
                  <div class="media-body media-middle">
                    <h3 class="media-heading"><a href="#"><i class="fa fa-angle-left"></i> PREVIOUS PROPERTY</a></h3>
                    <h4>Villa For Sale</h4>
                  </div>
                </div>
              </div>
              <div class="next-box pull-right">
                <div class="media">
                  <div class="media-body media-middle text-right">
                    <h3 class="media-heading"><a href="#">PREVIOUS PROPERTY <i class="fa fa-angle-right"></i></a></h3>
                    <h4>Villa For Sale</h4>
                  </div>
                  <div class="media-right">
                    <a href="#">
                      <img src="http://placehold.it/99x99" class="media-object" alt="image" width="99" height="99">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-md-offset-0 col-sm-offset-3 container-sidebar">
          <aside id="sidebar">
            <div class="widget widget-download">
              <div class="widget-top">
                <h3 class="widget-title">Documents</h3>
              </div>
              <div class="widget-body">
                <ul>
                  <li>
                    <div class="pull-left">
                      Property plan PDF
                    </div>
                    <div class="pull-right">
                      <a href="#">DOWNLOAD</a>
                    </div>
                  </li>
                  <li>
                    <div class="pull-left">
                      Brochure PDF
                    </div>
                    <div class="pull-right">
                      <a href="#">DOWNLOAD</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="widget widget-recommend">
              <div class="widget-top">
                <h3 class="widget-title">We recommend</h3>
              </div>
              <div class="widget-body">
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <h4>$350,000</h4>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <h4>$350,000</h4>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <h4>$350,000</h4>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="widget widget-rated">
              <div class="widget-top">
                <h3 class="widget-title">Most Rated Properties</h3>
              </div>
              <div class="widget-body">
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <div class="rating">
                      <span class="star-text-left">$350,000</span><span data-title="Average Rate: 4.67 / 5" class="bottom-ratings tip"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                    </div>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <div class="rating">
                      <span class="star-text-left">$350,000</span><span data-title="Average Rate: 4.67 / 5" class="bottom-ratings tip"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                    </div>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <figure class="item-thumb">
                      <a class="hover-effect" href="#">
                        <img alt="thumb" src="http://placehold.it/100x75" width="100" height="75">
                      </a>
                    </figure>
                  </div>
                  <div class="media-body">
                    <h3 class="media-heading"><a href="#">Apartment Oceanview</a></h3>
                    <div class="rating">
                      <span class="star-text-left">$350,000</span><span data-title="Average Rate: 4.67 / 5" class="bottom-ratings tip"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                    </div>
                    <div class="amenities">
                      <p>3 beds • 2 baths • 1,238 sqft</p>
                      <p>Single Family Home</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="widget widget-categories">
              <div class="widget-top">
                <h3 class="widget-title">Property Categories</h3>
              </div>
              <div class="widget-body">
                <ul>
                  <li><a href="">Apartment</a> <span class="cat-count">(30)</span></li>
                  <li><a href="">Condo</a> <span class="cat-count">(30)</span></li>
                  <li><a href="">Single Family Home</a> <span class="cat-count">(30)</span></li>
                  <li><a href="">Villa</a> <span class="cat-count">(30)</span></li>
                  <li><a href="">Studio</a> <span class="cat-count">(30)</span></li>
                </ul>
              </div>
            </div>
            <div class="widget widget-pages">
              <div class="widget-top">
                <h3 class="widget-title">Pages</h3>
              </div>
              <ul>
                <li><a href="#">Home</a>
                  <ul class="children">
                    <li><a href="#">Clearing Floats</a></li>
                    <li><a href="#">Page Image Alignment</a></li>
                  </ul>
                </li>
                <li><a href="#">About Houzez</a></li>
                <li><a href="#">Our Agents</a></li>
                <li><a href="#">Create Listing</a></li>
                <li><a href="#">Faq</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div class="widget widget_archive">
              <div class="widget-top">
                <h3 class="widget-title">Archives</h3></div>
                <ul>
                  <li><a href="#">March 2016</a>&nbsp;(10)</li>
                  <li><a href="#">January 2016</a>&nbsp;(1)</li>
                  <li><a href="#">January 2013</a>&nbsp;(5)</li>
                  <li><a href="#">March 2012</a>&nbsp;(5)</li>
                </ul>
              </div>
              <div class="widget widget_meta">
                <div class="widget-top">
                  <h3 class="widget-title">Meta</h3>
                </div>
                <ul>
                  <li><a href="#">Site Admin</a></li>
                  <li><a href="#">Log out</a></li>
                  <li><a href="#">Entries <abbr title="Really Simple Syndication">RSS</abbr></a></li>
                  <li><a href="#">Comments <abbr title="Really Simple Syndication">RSS</abbr></a></li>
                </ul>
              </div>
              <div class="widget widget-reviews">
                <div class="widget-top">
                  <h3 class="widget-title">Latest Reviews</h3>
                </div>
                <div class="widget-body">
                  <div class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="http://placehold.it/50x50" alt="Thumb" width="50" height="50">
                      </a>
                    </div>
                    <div class="media-body">
                      <h3 class="media-heading"><a href="#">Property title</a></h3>
                      <div class="rating">
                        <span class="bottom-ratings"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                      </div>
                      <p>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Etiam
                        risus tortor, accumsan at nisi et,
                      </p>
                    </div>
                  </div>
                  <div class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="http://placehold.it/50x50" alt="Thumb" width="50" height="50">
                      </a>
                    </div>
                    <div class="media-body">
                      <h3 class="media-heading"><a href="#">Property title</a></h3>
                      <div class="rating">
                        <span class="bottom-ratings"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                      </div>
                      <p>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Etiam
                        risus tortor, accumsan at nisi et,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section><!--/.section-detail-content-->
  </section><!--/#section-body-->

  <div id="lightbox-popup-main" class="fade">
    <div class="lightbox-popup">
      <div class="popup-inner">
        <div class="lightbox-left">
          <div class="lightbox-header">
            <div class="header-title">
              <p>
                <span>
                  <img src="<?php echo base_url('assets/site/images/logo-houzez-white.png'); ?>" width="86" height="13" alt="logo">
                </span>
                <span class="hidden-xs">
                  Oceanfront Villa With Pool - 7601 East Treasure Drive, Miami Beach, FL 33141
                </span>
              </p>
            </div>
            <div class="header-actions">
              <ul class="actions">
                <li>
                  <span title="Adicionar aos favoritos" data-property_id="<?php echo $property['imovel_id']; ?>" data-action="<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'unlike' : 'like'; ?>" class="btn-like <?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'active' : ''; ?>" data-placement="top" data-toggle="property-tooltip" data-original-title="Adicionar aos favoritos">
                    <i class="fa fa-heart-o"></i>
                  </span>
                </li>
                <li class="lightbox-expand visible-xs compress">
                  <span><i class="fa fa-envelope-o"></i></span>
                </li>
                <li class="lightbox-close">
                  <span><i class="fa fa-close"></i></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="gallery-area">
            <div class="slider-placeholder">
              <div class="loader-inner">
                <span class="fa fa-spin fa-spinner"></span> Loading Slider...
              </div>
            </div>
            <div class="expand-icon lightbox-expand hidden-xs"></div>
            <div class="gallery-inner">
              <div class="lightbox-slide slide-animated">
                <?php
                if(isset($property['imagens']) && !empty($property['imagens'])){
                  foreach($property['imagens'] as $imagem){
                    ?>
                    <div>
                      <img src="<?php echo base_url('assets/uploads/imoveis/'. $property['imovel_id'] .'/1044x525-' . $imagem['arquivo']); ?>" alt="Lightbox Slider" width="1044" height="525">
                    </div>
                    <?php
                  }
                }
                ?>
              </div>
            </div>
            <div class="lightbox-slide-nav visible-xs">
              <button class="lightbox-arrow-left lightbox-arrow"><i class="fa fa-angle-left"></i></button>
              <p class="lightbox-nav-title">Luxury apartment bay view</p>
              <button class="lightbox-arrow-right lightbox-arrow"><i class="fa fa-angle-right"></i></button>
            </div>
          </div>
        </div>
        <div class="lightbox-right fade in">
          <div class="lightbox-header hidden-xs">
            <div class="header-title">
              <p>$575,000 or $21,000/mo</p>
            </div>
            <div class="header-actions">
              <ul class="actions">
                <li class="lightbox-close">
                  <span><i class="fa fa-close"></i></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="agent-area">
            <div class="form-small">
              <div class="agent-media-head">
                <h4 class="head-left">Contact info</h4>
                <a href="" class="head-right">View my listing</a>
              </div>
              <div class="media agent-media">
                <div class="media-left">
                  <a href="#">
                    <img width="100" height="100" alt="image" class="media-object" src="http://placehold.it/100x100">
                  </a>
                </div>
                <div class="media-body">
                  <dl>
                    <dt>CONTACT AGENT</dt>
                    <dd><i class="fa fa-user"></i> Brittany Watkins</dd>
                    <dd><i class="fa fa-phone"></i> 321 456 9874</dd>
                  </dl>
                  <ul class="profile-social">
                    <li><a class="btn-facebook" href="#" target="_blank"><i class="fa fa-facebook-square"></i></a></li>
                    <li><a class="btn-twitter" href="#" target="_blank"><i class="fa fa-twitter-square"></i></a></li>
                    <li><a class="btn-linkedin" href="#" target="_blank"><i class="fa fa-linkedin-square"></i></a></li>
                    <li><a class="btn-google-plus" href="#" target="_blank"><i class="fa fa-google-plus-square"></i></a></li>
                  </ul>
                </div>
              </div>
              <h4 class="form-small-title"> Inquire about this property </h4>
              <form>
                <div class="form-group">
                  <input type="text" placeholder="Your Name" class="form-control">
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Phone" class="form-control">
                </div>
                <div class="form-group">
                  <input type="email" placeholder="Email" class="form-control">
                </div>
                <div class="form-group">
                  <textarea placeholder="Location" rows="2" class="form-control"></textarea>
                </div>
                <button class="btn btn-secondary btn-block">Request info</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div><!--/#lightbox-popup-main-->