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
              <div class="table-cell sort-tab">
                Sort by:
                <select class="selectpicker bs-select-hidden" title="Please select" data-live-search-style="begins" data-live-search="true">
                  <option>Relevance</option>
                  <option>Relevance</option>
                  <option>Relevance</option>
                </select>
              </div>
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
          <div class="property-listing grid-view">
            <div class="property-items row">
              <?php
              if(isset($properties['results']) && !empty($properties['results'])) {
                echo $this->site->mustache('properties-list-item.mustache', $properties);
              }
              ?>
            </div>
          </div><!--/.property-listing-->

          <div class="pagination-content">
            <?php echo $properties['pagination']; ?>
          </div>

        </div>
      </div><!--/.container-contentbar-->

      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 col-md-offset-0 col-sm-offset-3 container-sidebar">
        <aside id="sidebar" class="sidebar-white">
          <div class="widget widget-range">
            <div class="widget-body">
              <form id="properties-list-form" method="post">
                <input type="hidden" id="search-transaction" name="transaction" value="venda" />

                <dir class="row">
                  <div class="col-xs-12">
                    <h4>Localização do imóvel</h4>
                    <div class="form-group no-margin">
                      <input type="text" class="input-search-local form-control" name="keyword" placeholder="Adicione um bairro ou uma cidade">
                    </div>

                    <table class="table">
                      <tbody class="property-location-items">
                        <?php
                        if(isset($filters['property_location']) && !empty($filters['property_location'])){
                          ?>
                          <tr class="property-location-item" data-state='<?php echo $filters['property_location']['results']['state_slug']; ?>' data-city='<?php echo $filters['property_location']['results']['city_slug']; ?>' data-district='<?php echo isset($filters['property_location']['results']['district_slug']) ? $filters['property_location']['results']['district_slug'] : ''; ?>'>
                            <td>
                              <?php echo $filters['property_location']['label']; ?>
                            </td>
                            <td>
                              <a href="javascript:void(0);" class="property-location-item-remove pull-right"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                            </td>
                          </tr>
                          <?php
                        }
                        ?>
                      </tbody>
                    </table>
                  </div>
                </dir>

                <div class="row">
                  <div class="col-xs-12">
                    <h4>Tipo de imóvel</h4>
                    <div class="form-group no-margin">
                      <select id="search-property_type" class="form-control" multiple>
                        <?php
                        if(isset($filters['property_types']) && !empty($filters['property_types'])){
                          foreach($filters['property_types'] as $tipo_segmento){
                            ?>
                            <optgroup label="<?php echo $tipo_segmento['segmento']; ?>">
                              <?php
                              if(isset($tipo_segmento['tipos'])){
                                foreach ($tipo_segmento['tipos'] as $tipo) {
                                  ?>
                                  <option <?php echo (isset($tipo['active']) && $tipo['active'] ? 'selected="true"' : ''); ?> value="<?php echo $tipo['slug']; ?>"><?php echo $tipo['nome']; ?></option>
                                  <?php
                                }
                              }
                              ?>
                            </optgroup>
                            <?php
                          }
                        }
                        ?>
                      </select>
                    </div>
                  </div>
                </div>

                <hr>

                <dir class="row">
                  <div class="properties-search-double-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Preço Mínimo</h4>
                    <div class="form-group">
                      <input id="search-min_price" class="form-control price-mask" name="min_price" placeholder="R$ 200.000" type="text">
                    </div>
                  </div>
                  <div class="properties-search-double-right col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Preço Máximo</h4>
                    <div class="form-group">
                      <input id="search-max_price" class="form-control price-mask" name="max_price" placeholder="R$ 2.000.000" type="text">
                    </div>
                  </div>
                </dir>

                <div class="row">
                  <div class="properties-data col-xs-12">
                    <h4>Dormitórios</h4>
                    <?php
                    for($bedrooms = 1 ; $bedrooms <= 5 ; $bedrooms++){
                      ?>
                      <a href="javascript:void(0);" data-value="<?php echo $bedrooms; ?>" class="properties-data-item properties-bedrooms btn btn-rounded btn-default"><?php echo $bedrooms; ?>+</a>
                      <?php
                    }
                    ?>
                  </div>
                </div>

                <hr class="properties-search-hr">

                <div class="row">
                  <div class="properties-data col-xs-12">
                    <h4>Vagas de garagem</h4>
                    <?php
                    for($garages = 1 ; $garages <= 5 ; $garages++){
                      ?>
                      <a href="javascript:void(0);" data-value="<?php echo $garages; ?>" class="properties-data-item properties-garages btn btn-rounded btn-default"><?php echo $garages; ?>+</a>
                      <?php
                    }
                    ?>
                  </div>
                </div>

                <hr class="properties-search-hr">

                <div class="row">
                  <div class="properties-data col-xs-12">
                    <h4>Banheiros</h4>
                    <?php
                    for($bathrooms = 1 ; $bathrooms <= 5 ; $bathrooms++){
                      ?>
                      <a href="javascript:void(0);" data-value="<?php echo $bathrooms; ?>" class="properties-data-item properties-bathrooms btn btn-rounded btn-default"><?php echo $bathrooms; ?>+</a>
                      <?php
                    }
                    ?>
                  </div>
                </div>

                <hr class="properties-search-hr">

                <dir class="row">
                  <div class="properties-search-double-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Área Mínima</h4>
                    <div class="form-group">
                      <input id="search-min_price" class="form-control price" name="min_price" placeholder="R$ 200.000" type="text">
                    </div>
                  </div>
                  <div class="properties-search-double-right col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Área Máxima</h4>
                    <div class="form-group">
                      <input id="search-max_price" class="form-control price" name="max_price" placeholder="R$ 2.000.000" type="text">
                    </div>
                  </div>
                </dir>

                <div class="range-block rang-form-block">
                  <div class="row">

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
<div id="search-mask" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: .5; z-index:5000;">.</div>

<script id="property-item" type="x-tmpl-mustache">
  {{#results}}
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
              <h2 class="property-title"><a href="#">{{imovel_id}} - {{tipo_nome}} à venda em {{bairro_nome}}</a></h2>
              <h4 class="property-location">7601 East Treasure Dr. Miami Beach, FL 33141</h4>
            </div>
            <div class="info-row amenities hide-on-grid">
              <p>
                <span>Dormitórios: {{imovel_dormitorios}}</span><br>
                <span>Banheiros: {{imovel_banheiros}}</span><br>
                <span>Vagas de Garagens: {{imovel_garagens}}</span>
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
                  <span>Dormitórios: {{imovel_dormitorios}}</span><br>
                  <span>Banheiros: {{imovel_banheiros}}</span><br>
                  <span>Vagas de Garagens: {{imovel_garagens}}</span>
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
    </div>
  {{/results}}
</script>

<script id="property-location-item" type="x-tmpl-mustache">
  <tr class="property-location-item" data-state='{{location.state}}' data-city='{{location.city}}' data-district='{{location.district}}'>
    <td>
      {{label}}
    </td>
    <td>
      <a href="javascript:void(0);" class="property-location-item-remove pull-right"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
    </td>
  </tr>
</script>
