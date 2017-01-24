<section id="section-body">
  <div class="container">
    <div class="page-title breadcrumb-top">
      <div class="row">
        <div class="col-sm-12">
          <ol class="breadcrumb"><li ><a href="/"><i class="fa fa-home"></i></a></li><li class="active">Simple Listing – List View</li></ol>
          <div class="page-title-left">
            <h2>Simple Listing – List View</h2>
          </div>
          <div class="page-title-right">
            <div class="view hidden-xs">
              <div class="table-cell">
                <span class="view-btn btn-list"><i class="fa fa-th-list"></i></span>
                <span class="view-btn btn-grid active"><i class="fa fa-th-large"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 list-grid-area container-contentbar">
        <div id="content-area">
          <div class="list-tabs table-list full-width">
            <div class="tabs table-cell">
              <ul>
                <li>
                  <a href="#" class="active">ALL</a>
                </li>
                <li>
                  <a href="#">FOR SALE</a>
                </li>
                <li>
                  <a href="#">FOR RENT</a>
                </li>
              </ul>
            </div>
            <div class="sort-tab table-cell text-right">
              Sort by:
              <select class="selectpicker bs-select-hidden" title="Please select" data-live-search-style="begins" data-live-search="true">
                <option>Relevance</option>
                <option>Relevance</option>
                <option>Relevance</option>
              </select>
            </div>
          </div><!--/.list-tabs-->

          <div class="property-listing grid-view">
            <div class="row">
              <?php
              for($loop = 1 ; $loop <= 10 ; $loop++){
                ?>
                <div class="item-wrap">
                  <div class="property-item table-list">
                    <div class="table-cell">
                      <div class="figure-block">
                        <figure class="item-thumb">
                          <span class="label-featured label label-success">Featured</span>
                          <div class="label-wrap label-right hide-on-list">
                            <span class="label label-default">For Sale</span>
                            <span class="label label-danger">Sold</span>
                          </div>
                          <div class="price hide-on-list">
                            <p class="price-start">Start from</p>
                            <h3>$350,000</h3>
                            <p class="rant">$21,000/mo</p>
                          </div>
                          <a href="#">
                            <img src="http://placehold.it/364x244" alt="thumb">
                          </a>
                          <ul class="actions">
                            <li>
                              <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Favorite">
                                <i class="fa fa-heart"></i>
                              </span>
                            </li>
                            <li class="share-btn">
                              <div class="share_tooltip fade">
                                <a target="_blank" href="#"><i class="fa fa-facebook"></i></a>
                                <a target="_blank" href="#"><i class="fa fa-twitter"></i></a>
                                <a target="_blank" href="#"><i class="fa fa-google-plus"></i></a>
                                <a target="_blank" href="#"><i class="fa fa-pinterest"></i></a>
                              </div>
                              <span title="" data-placement="top" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                            </li>
                            <li>
                              <span data-toggle="tooltip" data-placement="top" title="Photos (12)">
                                <i class="fa fa-camera"></i>
                              </span>
                            </li>
                          </ul>
                        </figure>
                      </div>
                    </div>
                    <div class="item-body table-cell">

                      <div class="body-left table-cell">
                        <div class="info-row">
                          <div class="label-wrap hide-on-grid">
                            <div class="label-status label label-default">For Sale</div>
                            <span class="label label-danger">Sold</span>
                          </div>
                          <h2 class="property-title"><a href="#">Apartment Oceanview</a></h2>
                          <h4 class="property-location">7601 East Treasure Dr. Miami Beach, FL 33141</h4>
                        </div>
                        <div class="info-row amenities hide-on-grid">
                          <p>
                            <span>Beds: 3</span>
                            <span>Baths: 2</span>
                            <span>Sqft: 1,965</span>
                          </p>
                          <p>Single Family Home</p>
                        </div>
                        <div class="info-row date hide-on-grid">
                          <p><i class="fa fa-user"></i> <a href="#">Elite Ocean View Realty LLC</a></p>
                          <p><i class="fa fa-calendar"></i> 12 Days ago </p>
                        </div>
                      </div>
                      <div class="body-right table-cell hidden-gird-cell">
                        <div class="info-row price">
                          <p class="price-start">Start from</p>
                          <h3>$350,000</h3>
                          <p class="rant">$21,000/mo</p>
                        </div>
                        <div class="info-row phone text-right">
                          <a href="#" class="btn btn-primary">Details <i class="fa fa-angle-right fa-right"></i></a>
                          <p><a href="#">+1 (786) 225-0199</a></p>
                        </div>
                      </div>
                      <div class="table-list full-width hide-on-list">
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
                            <a href="#" class="btn btn-primary">Details <i class="fa fa-angle-right fa-right"></i></a>
                            <p><a href="#">+1 (786) 225-0199</a></p>
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
                <?php
              }
              ?>
            </div>
          </div><!--/.property-listing-->

          <hr>

          <div class="pagination-main">
            <ul class="pagination">
              <li class="disabled"><a aria-label="Previous" href="#"><span aria-hidden="true"><i class="fa fa-angle-left"></i></span></a></li>
              <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a aria-label="Next" href="#"><span aria-hidden="true"><i class="fa fa-angle-right"></i></span></a></li>
            </ul>
          </div><!--/.pagination-main-->

        </div>
      </div><!--/.container-contentbar-->

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-md-offset-0 col-sm-offset-3 container-sidebar">
        <aside id="sidebar" class="sidebar-white">
          <div class="widget widget-range">
            <div class="widget-body">
              <form>

                <dir class="row">
                  <div class="col-xs-12">
                    <h4>Localização</h4>
                    <div class="form-group">
                      <input class="form-control" name="keyword" placeholder="Adicione um bairro ou uma cidade" type="text">
                    </div>
                  </div>
                </dir>

                <div class="row">
                  <div class="col-xs-12">
                    <h4>Tipo de imóvel</h4>
                    <div class="form-group">
                      <select class="selectpicker" data-live-search="false" data-live-search-style="begins" title="Property Type">
                        <option>Property Type 1</option>
                        <option>Property Type 2</option>
                        <option>Property Type 3</option>
                        <option>Property Type 4</option>
                        <option>Property Type 5</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr class="no-margin">

                <dir class="row">
                  <div class="properties-search-double-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Preço Mínimo</h4>
                    <div class="form-group">
                      <input class="form-control" name="keyword" placeholder="R$ 200.000" type="text">
                    </div>
                  </div>
                  <div class="properties-search-double-right col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Preço Máximo</h4>
                    <div class="form-group">
                      <input class="form-control" name="keyword" placeholder="R$ 2.000.000" type="text">
                    </div>
                  </div>
                </dir>

                <div class="row">
                  <div class="col-xs-12">
                    <h4>Dormitórios</h4>
                    <a href="" class="btn btn-rounded btn-default">1+</a>
                    <a href="" class="btn btn-rounded btn-default">2+</a>
                    <a href="" class="btn btn-rounded btn-default">3+</a>
                    <a href="" class="btn btn-rounded btn-default">4+</a>
                    <a href="" class="btn btn-rounded btn-default">5+</a>
                  </div>
                </div>

                <hr class="properties-search-hr">

                <div class="row">
                  <div class="col-xs-12">
                    <h4>Vagas de garagem</h4>
                    <a href="" class="btn btn-rounded btn-default">1+</a>
                    <a href="" class="btn btn-rounded btn-default">2+</a>
                    <a href="" class="btn btn-rounded btn-default">3+</a>
                    <a href="" class="btn btn-rounded btn-default">4+</a>
                    <a href="" class="btn btn-rounded btn-default">5+</a>
                  </div>
                </div>

                <hr class="properties-search-hr">

                <div class="row">
                  <div class="col-xs-12">
                    <h4>Banheiros</h4>
                    <a href="" class="btn btn-rounded btn-default">1+</a>
                    <a href="" class="btn btn-rounded btn-default">2+</a>
                    <a href="" class="btn btn-rounded btn-default">3+</a>
                    <a href="" class="btn btn-rounded btn-default">4+</a>
                    <a href="" class="btn btn-rounded btn-default">5+</a>
                  </div>
                </div>


                <div class="range-block">
                  <h4>Price range</h4>
                  <div id="slider-price"></div>
                  <div class="clearfix range-text">
                    <input type="text" class="pull-left range-input text-left" id="min-price" readonly >
                    <input type="text" class="pull-right range-input text-right" id="max-price" readonly >
                  </div>
                </div>
                <div class="range-block">
                  <h4>Area Size</h4>
                  <div id="slider-size"></div>
                  <div class="clearfix range-text">
                    <input type="text" class="pull-left range-input text-left" id="min-size" readonly >
                    <input type="text" class="pull-right range-input text-right" id="max-size" readonly >
                  </div>
                </div>
                <div class="range-block rang-form-block">
                  <div class="row">
                    <div class="col-sm-12 col-xs-12">
                      <div class="form-group">
                        <input class="form-control" name="keyword" placeholder="Search" type="text">
                      </div>
                    </div>

                    <div class="col-sm-6 col-xs-12">
                      <div class="form-group">
                        <select class="selectpicker" data-live-search="false" data-live-search-style="begins" title="Beds">
                          <option>Beds 1</option>
                          <option>Beds 2</option>
                          <option>Beds 3</option>
                          <option>Beds 4</option>
                          <option>Beds 5</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6 col-xs-12">
                      <div class="form-group">
                        <select class="selectpicker" data-live-search="false" data-live-search-style="begins" title="Baths">
                          <option>Baths 1</option>
                          <option>Baths 2</option>
                          <option>Baths 3</option>
                          <option>Baths 4</option>
                          <option>Baths 5</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <div class="form-group">
                        <select class="selectpicker" data-live-search="false" data-live-search-style="begins" title="Property type">
                          <option>Type 1</option>
                          <option>Type 2</option>
                          <option>Type 3</option>
                          <option>Type 4</option>
                          <option>Type 5</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <div class="form-group">
                        <select class="selectpicker" data-live-search="false" data-live-search-style="begins" title="Status">
                          <option>Status 1</option>
                          <option>Status 2</option>
                          <option>Status 3</option>
                          <option>Status 4</option>
                          <option>Status 5</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <label class="advance-trigger"><i class="fa fa-plus-square"></i> Other Features </label>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <div class="features-list field-expand">
                        <label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-air-conditioning" value="air-conditioning" type="checkbox">Air Conditioning</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-barbeque" value="barbeque" type="checkbox">Barbeque</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-dryer" value="dryer" type="checkbox">Dryer</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-gym" value="gym" type="checkbox">Gym</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-laundry" value="laundry" type="checkbox">Laundry</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-lawn" value="lawn" type="checkbox">Lawn</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-microwave" value="microwave" type="checkbox">Microwave</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-outdoor-shower" value="outdoor-shower" type="checkbox">Outdoor Shower</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-refrigerator" value="refrigerator" type="checkbox">Refrigerator</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-sauna" value="sauna" type="checkbox">Sauna</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-swimming-pool" value="swimming-pool" type="checkbox">Swimming Pool</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-tv-cable" value="tv-cable" type="checkbox">TV Cable</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-washer" value="washer" type="checkbox">Washer</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-wifi" value="wifi" type="checkbox">WiFi</label><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-window-coverings" value="window-coverings" type="checkbox">Window Coverings</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <button type="submit" class="btn btn-secondary btn-block"> Search</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="widget widget-featured">
            <div class="widget-top">
              <h3 class="widget-title">Featured Properties</h3>
            </div>
            <div class="widget-body">
              <div class="figure-block">
                <figure class="item-thumb">
                  <span class="label-featured label label-success">Featured</span>
                  <a class="hover-effect" href="#">
                    <img src="http://placehold.it/290x194" width="290" height="194" alt="thumb">
                  </a>
                  <div class="price">
                    <span class="item-price">$350,000</span>
                  </div>
                </figure>
              </div>
              <div class="figure-block">
                <figure class="item-thumb">
                  <span class="label-featured label label-success">Featured</span>
                  <a class="hover-effect" href="#">
                    <img src="http://placehold.it/290x194" width="290" height="194" alt="thumb">
                  </a>
                  <div class="price">
                    <span class="item-price">$350,000</span>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div class="widget widget-slider">
            <div class="widget-top">
              <h3 class="widget-title">Featured Properties Slider</h3>
            </div>
            <div class="widget-body">
              <div class="property-widget-slider">
                <div class="item">
                  <div class="figure-block">
                    <figure class="item-thumb">
                      <span class="label-featured label label-success">Featured</span>
                      <div class="label-wrap label-right">
                        <span class="label-status label label-default">For Rent</span>

                        <span class="label label-danger">Hot Offer</span>
                      </div>
                      <a href="#" class="hover-effect">
                        <img src="http://placehold.it/370x202" alt="thumb">
                      </a>
                      <div class="price">
                        <span class="item-price">$350,000</span>
                      </div>
                      <ul class="actions">
                        <li>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Favorite">
                            <i class="fa fa-heart-o"></i>
                          </span>
                        </li>
                        <li class="share-btn">
                          <div class="share_tooltip fade">
                            <a target="_blank" href="#"><i class="fa fa-facebook"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-twitter"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-google-plus"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-pinterest"></i></a>
                          </div>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                        </li>
                      </ul>
                    </figure>
                  </div>
                </div>
                <div class="item">
                  <div class="figure-block">
                    <figure class="item-thumb">
                      <span class="label-featured label label-success">Featured</span>
                      <div class="label-wrap label-right">
                        <span class="label-status label label-default">For Rent</span>

                        <span class="label label-danger">Hot Offer</span>
                      </div>
                      <a href="#" class="hover-effect">
                        <img src="http://placehold.it/370x202" alt="thumb">
                      </a>
                      <div class="price">
                        <span class="item-price">$350,000</span>
                      </div>
                      <ul class="actions">
                        <li>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Favorite">
                            <i class="fa fa-heart-o"></i>
                          </span>
                        </li>
                        <li class="share-btn">
                          <div class="share_tooltip fade">
                            <a target="_blank" href="#"><i class="fa fa-facebook"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-twitter"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-google-plus"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-pinterest"></i></a>
                          </div>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                        </li>
                      </ul>
                    </figure>
                  </div>
                </div>
                <div class="item">
                  <div class="figure-block">
                    <figure class="item-thumb">
                      <span class="label-featured label label-success">Featured</span>
                      <div class="label-wrap label-right">
                        <span class="label-status label label-default">For Rent</span>

                        <span class="label label-danger">Hot Offer</span>
                      </div>
                      <a href="#" class="hover-effect">
                        <img src="http://placehold.it/370x202" alt="thumb">
                      </a>
                      <div class="price">
                        <span class="item-price">$350,000</span>
                      </div>
                      <ul class="actions">
                        <li>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Favorite">
                            <i class="fa fa-heart-o"></i>
                          </span>
                        </li>
                        <li class="share-btn">
                          <div class="share_tooltip fade">
                            <a target="_blank" href="#"><i class="fa fa-facebook"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-twitter"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-google-plus"></i></a>
                            <a target="_blank" href="#"><i class="fa fa-pinterest"></i></a>
                          </div>
                          <span title="" data-placement="top" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                        </li>
                      </ul>
                    </figure>
                  </div>
                </div>
              </div>
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
      </div><!--/.container-sidebar-->
    </div>
  </div>
</section>
