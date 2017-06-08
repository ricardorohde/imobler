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
      <form id="banner-search-main-form" method="post" class="form-inline">
        <input type="hidden" id="banner-search-main-transaction" name="transaction" value="venda" />
        <div class="form-group">
          <select id="banner-search-main-type" class="selectpicker" data-live-search="false" title="Tipo de imóvel">
            <option selected="true" value="0">Todos os tipos</option>
            <?php
            if(isset($property_types)){
              foreach($property_types as $property_types_segment){
                ?>
                <optgroup label="<?php echo $property_types_segment['segmento']; ?>">
                  <?php
                  if(isset($property_types_segment['tipos'])){
                    foreach ($property_types_segment['tipos'] as $property_type) {
                      ?>
                      <option value="<?php echo $property_type['slug']; ?>"><?php echo $property_type['nome']; ?></option>
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

          <div class="search input-search input-icon">
            <input type="hidden" id="banner-search-main-state" name="state" value="" />
            <input type="hidden" id="banner-search-main-city" name="city" value="">
            <input type="hidden" id="banner-search-main-district" name="district" value="">

            <input type="text" class="form-control input-search-local" placeholder="Bairro, cidade ou referência do imóvel" autocomplete="off" />
          </div>
          <div class="search-btn">
            <button type="submit" class="btn btn-secondary btn-submit" disabled><i class="fa fa-search"></i> Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div><!--/banner-->

<section id="section-body" class="npb">

  <?php
  if(isset($properties['featured']['results']) && !empty($properties['featured']['results'])){
    ?>
    <div class="houzez-module-main">
      <div class="houzez-module carousel-module">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="module-title-nav clearfix">
                <div>
                  <h2>Imóveis em destaque</h2>
                </div>
                <?php
                if(isset($properties['featured']['total_rows']) && $properties['featured']['total_rows'] > 3){
                  ?>
                  <div class="module-nav">
                    <button class="btn btn-sm btn-crl-pprt-1-prev">Anterior</button>
                    <button class="btn btn-sm btn-crl-pprt-1-next">Próximo</button>
                    <a href="#" class="btn btn-carousel btn-sm">Ver+</a>
                  </div>
                  <?php
                }
                ?>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="row grid-row">
                <div class="carousel properties-carousel-grid-1 slide-animated">
                  <?php
                  foreach ($properties['featured']['results'] as $key => $property) {
                    $property_url = $this->site->get_property_url($property['imovel_id']);
                    ?>
                    <div class="item">
                      <div class="item-wrap">
                        <div class="property-item item-grid">
                          <div class="figure-block">
                            <figure class="item-thumb">
                              <div class="label-wrap hide-on-list">
                                <div class="label-status label label-default">Venda</div>
                              </div>
                              <span class="label-featured label label-success">DESTAQUE</span>
                              <div class="price hide-on-list">
                                <h3>R$ <?php echo $property['negociacao_valor']; ?></h3>
                              </div>
                              <?php
                              $property_image_id = 0;
                              $property_image_arquivo = 'property-image.jpg';
                              if(isset($property['imagens'][0])){
                                $property_image_id = $property['imovel_id'];
                                $property_image_arquivo = $property['imagens'][0]['arquivo'];
                              }
                              ?>
                              <a href="<?php echo $property_url; ?>" class="hover-effect">
                                <img src="<?php echo base_url('imagens/imoveis/' . $property_image_id . '/385/260/100/' . $property_image_arquivo); ?>" width="385" height="260" alt="" />
                              </a>
                              <ul class="actions">
                                <li class="share-items">
                                    <div class="share_tooltip fade">
                                        <a class="share-item" href="http://www.facebook.com/share.php?u=<?php echo isset($property_url) ? $property_url : base_url(); ?>&title=<?php echo $property['tipo_nome']; ?> à venda em <?php echo $property['bairro_nome']; ?>+<?php echo isset($property_url) ? $property_url : base_url(); ?>"><i class="fa fa-facebook"></i></a>
                                        <a class="share-item" href="http://twitter.com/intent/tweet?status=<?php echo $property['tipo_nome']; ?> à venda em <?php echo $property['bairro_nome']; ?>+<?php echo isset($property_url) ? $property_url : base_url(); ?>"><i class="fa fa-twitter"></i></a>
                                        <a class="share-item" href="https://plus.google.com/share?url=<?php echo isset($property_url) ? $property_url : base_url(); ?>"><i class="fa fa-google-plus"></i></a>
                                    </div>
                                    <span class="share-btn" data-placement="bottom" data-toggle="property-tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                                </li>
                                <li>
                                  <span data-property_id="<?php echo $property['imovel_id']; ?>" data-action="<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'unlike' : 'like'; ?>" class="btn-like<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? ' active' : ''; ?>" data-placement="top" data-toggle="property-tooltip" data-original-title="Adicionar aos favoritos">
                                    <i class="fa fa-heart"></i>
                                  </span>
                                </li>
                              </ul>
                            </figure>
                          </div>
                          <div class="item-body">

                            <div class="body-left">
                              <div class="info-row">
                                <h2 class="property-title"><a href="<?php echo $property_url; ?>"><?php echo $property['tipo_nome']; ?> à <?php echo $property['transacao_nome']; ?> em <?php echo $property['bairro_nome']; ?>, <?php echo $property['area_util']; ?>m²</a></h2>
                                <h4 class="property-location"><?php echo $property['breve_descricao']; ?></h4>
                              </div>
                              <div class="table-list full-width info-row">
                                <div class="cell">
                                  <div class="info-row amenities">
                                    <p>
                                      <?php
                                      if(isset($property['imovel_dormitorios']) && $property['imovel_dormitorios']){
                                        ?><span><?php echo $property['imovel_dormitorios']; ?> <?php echo $property['imovel_dormitorios'] == 1 ? 'quarto' : 'quartos'; ?></span><?php
                                      }
                                      ?>
                                      <?php
                                      if(isset($property['imovel_suites']) && $property['imovel_suites']){
                                        ?><span><?php echo $property['imovel_suites']; ?> <?php echo $property['imovel_suites'] == 1 ? 'suíte' : 'suítes'; ?></span><?php
                                      }
                                      ?>
                                      <?php
                                      if(isset($property['imovel_garagens']) && $property['imovel_garagens']){
                                        ?><span><?php echo $property['imovel_garagens']; ?> <?php echo $property['imovel_garagens'] == 1 ? 'vaga' : 'vagas'; ?></span><?php
                                      }
                                      ?>
                                    </p>
                                    <p><?php echo $property['tipo_nome']; ?></p>
                                  </div>
                                </div>
                                <div class="cell">
                                  <div class="phone">
                                    <a href="<?php echo $property_url; ?>" class="btn btn-primary">Detalhes <i class="fa fa-angle-right fa-right"></i></a>
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
      </div>
    </div>
  <?php
}
?>

<?php
if(isset($campaigns) && !empty($campaigns)){
  ?>
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
          <?php
          foreach ($campaigns as $key => $campaign) {
            ?>
            <div class="col-sm-4">
              <div class="location-block">
                <figure>
                  <a href="<?php echo base_url($campaign['permalink']); ?>">

                    <img src="<?php echo base_url('imagens/campanhas/' . $campaign['id'] . '/370/370/100/' . $campaign['imagem_arquivo']); ?>" width="370" height="370" alt="<?php echo $campaign['title']; ?>">
                  </a>
                  <figcaption class="location-fig-caption">
                    <h3 class="heading"><?php echo $campaign['title']; ?></h3>
                    <!-- <p class="sub-heading">30 Properties</p> -->
                  </figcaption>
                </figure>
              </div>
            </div>
            <?php
          }
          ?>
        </div>
      </div>
    </div>
  </div>
  <?php

}
?>



</section><!--/#section-body-->
