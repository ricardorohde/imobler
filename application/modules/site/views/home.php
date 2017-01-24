<div class="header-media">
  <div class="banner-parallax banner-parallax-auto">
    <div class="banner-bg-wrap">
      <div class="banner-inner" style="background-image: url('<?php echo base_url('assets/site/images/home-banner.jpg'); ?>')"></div>
    </div>
  </div>
  <div class="banner-caption">
    <h1>Seu novo imóvel está aqui</h1>
    <h2 class="banner-sub-title">Informe o tipo e o local do imóvel que está procurando.</h2>
    <div class="banner-search-main">
      <form id="banner-search-main-form" method="post" action="<?php echo base_url('sp/sao-paulo/pirituba/apartamento/'); ?>" class="form-inline">
        <input type="hidden" id="banner-search-main-transaction" name="transaction" value="venda" />
        <div class="form-group">
          <select id="banner-search-main-type" class="selectpicker" data-live-search="false" title="Tipo de imóvel">
            <?php
            if(isset($imoveis_tipos)){
              $count_imoveis_tipos = 0;
              foreach($imoveis_tipos as $tipo_segmento){
                ?>
                <optgroup label="<?php echo $tipo_segmento['segmento']; ?>">
                  <?php
                  if(isset($tipo_segmento['tipos'])){
                    foreach ($tipo_segmento['tipos'] as $tipo) {

                      ?>
                      <option <?php echo !$count_imoveis_tipos ? 'selected="true"' : ''; ?> value="<?php echo $tipo['slug']; ?>"><?php echo $tipo['nome']; ?></option>
                      <?php
                      $count_imoveis_tipos++;
                    }
                  }
                  ?>
                </optgroup>
                <?php
              }
            }
            ?>
          </select>

          <div class="search input-search input-icon">
            <input type="hidden" id="banner-search-main-id" name="id" value="0" />
            <input type="hidden" id="banner-search-main-category" name="category" value="0">
            <input type="text" class="form-control input-search-local" placeholder="Bairro, cidade ou referência do imóvel" autocomplete="off" />
          </div>
          <div class="search-btn">
            <button type="submit" class="btn btn-secondary"><i class="fa fa-search"></i> Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div><!--/banner-->

<section id="section-body">
  <div class="houzez-module-main">
    <div class="houzez-module carousel-module">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="module-title-nav clearfix">
              <div>
                <h2>Imóveis em destaque</h2>
              </div>
              <div class="module-nav">
                <button class="btn btn-sm btn-crl-pprt-1-prev">Anterior</button>
                <button class="btn btn-sm btn-crl-pprt-1-next">Próximo</button>
                <a href="#" class="btn btn-carousel btn-sm">Ver+</a>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="row grid-row">
              <div class="carousel properties-carousel-grid-1 slide-animated">
                <?php
                for($loop = 1 ; $loop <= 6 ; $loop++){
                  ?>
                  <div class="item">
                    <div class="item-wrap">
                      <div class="property-item item-grid">
                        <div class="figure-block">
                          <figure class="item-thumb">
                            <div class="label-wrap hide-on-list">
                              <div class="label-status label label-default">For Rent</div>
                            </div>
                            <span class="label-featured label label-success">Featured</span>
                            <div class="price hide-on-list">
                              <h3>$350,000</h3>
                              <p class="rant">$21,000/mo</p>
                            </div>
                            <a href="<?php echo $this->site->get_property_url(0); ?>" class="hover-effect">
                              <img src="https://unsplash.it/385/260/?image=<?php echo rand(1,500); ?>" alt="thumb">
                            </a>
                            <ul class="actions">
                              <li class="share-btn">
                                <div class="share_tooltip fade">
                                  <a href="#" target="_blank"><i class="fa fa-facebook"></i></a>
                                  <a href="#" target="_blank"><i class="fa fa-twitter"></i></a>
                                  <a href="#"  target="_blank"><i class="fa fa-google-plus"></i></a>
                                  <a href="#" target="_blank"><i class="fa fa-pinterest"></i></a>
                                </div>
                                <span data-toggle="tooltip" data-placement="top" title="share"><i class="fa fa-share-alt"></i></span>
                              </li>
                              <li>
                                <span data-toggle="tooltip" data-placement="top" title="Favorite">
                                  <i class="fa fa-heart-o"></i>
                                </span>
                              </li>
                              <li>
                                <span data-toggle="tooltip" data-placement="top" title="Photos (12)">
                                  <i class="fa fa-camera"></i>
                                </span>
                              </li>
                            </ul>
                          </figure>
                        </div>
                        <div class="item-body">

                          <div class="body-left">
                            <div class="info-row">
                              <div class="rating">
                                <span class="bottom-ratings"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                                <span class="star-text-right">15 Ratings</span>
                              </div>
                              <h2 class="property-title"><a href="<?php echo $this->site->get_property_url(0); ?>">Apartment Oceanview</a></h2>
                              <h4 class="property-location">7601 East Treasure Dr. Miami Beach, FL 33141</h4>
                            </div>
                            <div class="table-list full-width info-row">
                              <div class="cell">
                                <div class="info-row amenities">
                                  <p>
                                    <span>Beds: 3</span>
                                    <span>Baths: 2</span>
                                    <span>Sqft: 1,965</span>
                                  </p>
                                  <p>Single Family Home</p>
                                </div>
                              </div>
                              <div class="cell">
                                <div class="phone">
                                  <a href="<?php echo $this->site->get_property_url(0); ?>" class="btn btn-primary">Details <i class="fa fa-angle-right fa-right"></i></a>
                                  <p><a href="#">+1 (786) 225-0199</a></p>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="item-foot date hide-on-list">
                        <div class="item-foot-left">
                          <p><i class="fa fa-user"></i> <a href="#">Elite Ocean View Realty LLC</a></p>
                        </div>
                        <div class="item-foot-right">
                          <p><i class="fa fa-calendar"></i> 12 Days ago </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <?php
                }
                ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!--/.houzez-module-main-->

  <div class="houzez-module-main module-white-bg">
    <div class="houzez-module module-title text-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-xs-12">
            <h2>Our Locations</h2>
            <h3 class="sub-heading">Book space in amazing locations across the world</h3>
          </div>
        </div>
      </div>
    </div>
    <div id="location-modul" class="houzez-module location-module grid">
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Apartment">
                </a>
                <figcaption class="location-fig-caption">
                  <h3 class="heading">Apartment</h3>
                  <p class="sub-heading">30 Properties</p>
                </figcaption>
              </figure>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Loft">
                </a>
                <div class="location-fig-caption">
                  <h3 class="heading">Loft</h3>
                  <p class="sub-heading">1 Property</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Single Family Home">
                </a>
                <div class="location-fig-caption">
                  <h3 class="heading">Single Family Home</h3>
                  <p class="sub-heading">11 Properties</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Single Family Home">
                </a>
                <div class="location-fig-caption">
                  <h3 class="heading">Single Family Home</h3>
                  <p class="sub-heading">11 Properties</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Single Family Home">
                </a>
                <div class="location-fig-caption">
                  <h3 class="heading">Single Family Home</h3>
                  <p class="sub-heading">11 Properties</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="location-block">
              <figure>
                <a href="#">
                  <img src="https://unsplash.it/370/370/?image=<?php echo rand(1,500); ?>" width="370" height="370" alt="Villa">
                </a>
                <div class="location-fig-caption">
                  <h3 class="heading">Villa</h3>
                  <p class="sub-heading">10 Properties</p>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!--/.houzez-module-main-->

  <div class="houzez-module-main module-gray-bg">
    <div class="houzez-module module-title text-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h2>Best Property Value</h2>
            <h3 class="sub-heading">Create Your Real Estate Website or Marketplace</h3>
          </div>
        </div>
      </div>
    </div>
    <div id="property-item-module" class="houzez-module property-item-module">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="row grid-row">
              <?php
              for($loop = 1 ; $loop <= 2 ; $loop++){
                ?>
                <div class="col-sm-6">
                  <div class="item-wrap">
                    <div class="property-item item-grid">
                      <div class="figure-block">
                        <figure class="item-thumb">
                          <div class="label-wrap hide-on-list">
                            <div class="label-status label label-default">For Rent</div>
                          </div>
                          <span class="label-featured label label-success">Featured</span>
                          <div class="price hide-on-list">
                            <h3>$350,000</h3>
                            <p class="rant">$21,000/mo</p>
                          </div>
                          <a href="<?php echo $this->site->get_property_url(0); ?>" class="hover-effect">
                            <img src="https://unsplash.it/434/290/?image=<?php echo rand(1,500); ?>" alt="thumb">
                          </a>
                          <ul class="actions">
                            <li class="share-btn">
                              <div class="share_tooltip fade">
                                <a href="#" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="#" target="_blank"><i class="fa fa-twitter"></i></a>
                                <a href="#"  target="_blank"><i class="fa fa-google-plus"></i></a>
                                <a href="#" target="_blank"><i class="fa fa-pinterest"></i></a>
                              </div>
                              <span data-toggle="tooltip" data-placement="top" title="share"><i class="fa fa-share-alt"></i></span>
                            </li>
                            <li>
                              <span data-toggle="tooltip" data-placement="top" title="Favorite">
                                <i class="fa fa-heart-o"></i>
                              </span>
                            </li>
                            <li>
                              <span data-toggle="tooltip" data-placement="top" title="Photos (12)">
                                <i class="fa fa-camera"></i>
                              </span>
                            </li>
                          </ul>
                        </figure>
                      </div>
                      <div class="item-body">

                        <div class="body-left">
                          <div class="info-row">
                            <div class="rating">
                              <span class="bottom-ratings"><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span style="width: 70%" class="top-ratings"><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></span>
                              <span class="star-text-right">15 Ratings</span>
                            </div>
                            <h2 class="property-title"><a href="<?php echo $this->site->get_property_url(0); ?>">Apartment Oceanview</a></h2>
                            <h4 class="property-location">7601 East Treasure Dr. Miami Beach, FL 33141</h4>
                          </div>
                          <div class="table-list full-width info-row">
                            <div class="cell">
                              <div class="info-row amenities">
                                <p>
                                  <span>Beds: 3</span>
                                  <span>Baths: 2</span>
                                  <span>Sqft: 1,965</span>
                                </p>
                                <p>Single Family Home</p>
                              </div>
                            </div>
                            <div class="cell">
                              <div class="phone">
                                <a href="<?php echo $this->site->get_property_url(0); ?>" class="btn btn-primary">Detalhes <i class="fa fa-angle-right fa-right"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <?php
              }
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><!--/.houzez-module-main-->
</section><!--/#section-body-->
