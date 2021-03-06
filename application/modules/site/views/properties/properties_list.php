<?php
$listview = trim(str_replace('grid-view-3-col', '', $this->session->userdata('listview_')));
?>
<section id="section-body">
  <div class="container">
    <div class="page-title breadcrumb-top">
      <div class="row">
        <div class="col-sm-12">
          <ol class="breadcrumb"><li ><a href="<?php echo base_url(); ?>"><i class="fa fa-home"></i></a></li><li class="active">Resultado da busca por imóveis</li></ol>
          <div class="page-title-left">
            <h2 id="total-results"><?php echo ($properties['total_rows'] == 1 ? 'Foi encontrado <strong>'. $properties['total_rows'] .'</strong> imóvel' : 'Foram encontrados <strong>'. $properties['total_rows'] .'</strong> imóveis') . ' ' . ($route_params['transaction'] == 'venda' ? 'à venda' : 'para locação'); ?></h2>
          </div>
          <div class="page-title-right">
            <div class="view hidden-xs">
              <div class="table-cell sort-tab">
                <select id="search-orderby" name="orderby" class="selectpicker orderby">
                  <option value="most_recent">Mais recentes</option>
                  <option value="biggest_price">Preço maior</option>
                  <option value="lowest_price">Preço menor</option>
                </select>
              </div>
              <div class="table-cell">
                <span title="Lista" class="view-btn btn-list <?php echo $listview ? ($listview == 'list-view' ? 'active' : '') : 'active'; ?>"><i class="fa fa-th-list"></i></span>
                <span title="Grade" class="view-btn btn-grid <?php echo $listview && $listview == 'grid-view' ? 'active' : ''; ?>"><i class="fa fa-th-large"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 list-grid-area container-contentbar">
        <div id="content-area">
          <div class="property-listing <?php echo $listview ? $listview : 'list-view'; ?>">
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
                <input type="hidden" id="search-page" name="page" value="<?php echo $paging; ?>" />

                <dir class="row">
                  <div class="col-xs-12">
                    <h4>Localização do imóvel</h4>
                    <div class="form-group no-margin">
                      <input type="text" class="input-search-local form-control" name="location" placeholder="Adicione um bairro ou uma cidade">
                    </div>

                    <table class="table">
                      <tbody class="property-location-items">
                        <?php
                        if(isset($filters['property_location']) && !empty($filters['property_location'])){
                          echo $this->site->mustache('properties-list-location-item.mustache', array('location' => array(
                            array_merge(array('label' => $filters['property_location']['label']), $filters['property_location']['location'])
                          )));
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
                      <select id="search-property_type" class="form-control" style="width: 100%" multiple>
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
                      <a href="javascript:void(0);" data-item="bedrooms" data-value="<?php echo $bedrooms; ?>" class="properties-data-item properties-bedrooms btn btn-rounded btn-default"><?php echo $bedrooms; ?>+</a>
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
                      <a href="javascript:void(0);" data-item="garages" data-value="<?php echo $garages; ?>" class="properties-data-item properties-garages btn btn-rounded btn-default"><?php echo $garages; ?>+</a>
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
                      <a href="javascript:void(0);" data-item="bathrooms" data-value="<?php echo $bathrooms; ?>" class="properties-data-item properties-bathrooms btn btn-rounded btn-default"><?php echo $bathrooms; ?>+</a>
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
                      <input id="search-min_area" class="form-control area-mask" name="min_area" placeholder="0 m²" type="text">
                    </div>
                  </div>
                  <div class="properties-search-double-right col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h4>Área Máxima</h4>
                    <div class="form-group">
                      <input id="search-max_area" class="form-control area-mask" name="max_area" placeholder="ilimitado m²" type="text">
                    </div>
                  </div>
                </dir>

                <div class="range-block rang-form-block">
                  <div class="row">

                    <div class="col-sm-12 col-xs-12">
                      <label class="advance-trigger btn-other-features"><i class="fa fa-plus-square"></i> Outras características </label>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <div class="features-list field-expand">
                        <?php
                        if(isset($filters['property_features']) && !empty($filters['property_features'])){
                          foreach($filters['property_features'] as $feature){
                            ?><label class="checkbox-inline"><input name="feature[]" data-search="feature" id="feature-<?php echo $feature['id']; ?>" value="<?php echo $feature['id']; ?>" type="checkbox"><?php echo $feature['nome']; ?></label><?php
                          }
                        }
                        ?>
                      </div>
                    </div>
                    <div class="col-sm-12 col-xs-12">
                      <button type="submit" class="btn btn-secondary btn-block"> Buscar</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </aside>
      </div><!--/.container-sidebar-->
    </div>
  </div>
</section>

<?php $this->site->get_templates(array('properties-list-item','properties-list-location-item','properties-list-no-results')); ?>
