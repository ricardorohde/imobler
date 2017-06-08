<section id="section-body">
    <div class="container">
        <div class="page-title breadcrumb-top">
            <div class="row">
                <div class="col-sm-12">
                    <ol class="breadcrumb"><li ><a href="/"><i class="fa fa-home"></i></a></li><li class="active"><?php echo $campaign['title']; ?></li></ol>
                    <div class="page-title-left">
                        <h2><?php echo $campaign['title']; ?></h2>
                    </div>
                    <div class="page-title-right">
                        <div class="view hidden-xs">
                              <div class="table-cell">
                                <span title="Lista" class="view-btn btn-list <?php echo $this->session->userdata('listview') && $this->session->userdata('listview') == 'list-view' ? 'active' : ''; ?>"><i class="fa fa-th-list"></i></span>
                                <span title="Grade" class="view-btn btn-grid <?php echo $this->session->userdata('listview') && $this->session->userdata('listview') == 'grid-view' ? 'active' : ''; ?>"><i class="fa fa-th-large"></i></span>
                                <span title="Grade 3 colunas" class="view-btn btn-grid-3-col <?php echo $this->session->userdata('listview') ? ($this->session->userdata('listview') == 'grid-view grid-view-3-col' ? 'active' : '') : 'active'; ?>"><i class="fa fa-th"></i></span>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 list-grid-area">
                <div id="content-area">

                    <!--start property items-->
                    <div class="property-listing <?php echo $this->session->userdata('listview') ? $this->session->userdata('listview') : 'grid-view grid-view-3-col'; ?>">
                        <div class="row">
                            <?php
                            if(isset($properties['results'])){
                                foreach ($properties['results'] as $key => $property) {
                                    $property_url = $this->site->get_property_url($property['imovel_id']);
                                    ?>
                                    <div class="item-wrap">
                                        <div class="property-item table-list">
                                            <div class="table-cell">
                                                <div class="figure-block">
                                                    <figure class="item-thumb">
                                                        <?php
                                                        if(isset($property['destaque']) && $property['destaque'] == 1){
                                                            ?>
                                                            <span class="label-featured label label-success">Destaque</span>
                                                            <?php
                                                        }
                                                        ?>
                                                        <div class="label-wrap label-right hide-on-list">
                                                            <span class="label label-default">Venda</span>
                                                        </div>
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
                                            </div>
                                            <div class="item-body table-cell">

                                                <div class="body-left table-cell">
                                                    <div class="info-row">
                                                        <div class="label-wrap hide-on-grid">
                                                            <div class="label-status label label-default">Venda</div>
                                                        </div>
                                                        <h2 class="property-title"><a href="<?php echo $property_url; ?>"><?php echo $property['tipo_nome']; ?> à <?php echo $property['transacao_nome']; ?> em <?php echo $property['bairro_nome']; ?>, <?php echo $property['area_util']; ?>m²</a></h2>
                                                        <h4 class="property-location"><?php echo $property['breve_descricao']; ?></h4>
                                                    </div>
                                                    <div class="info-row amenities hide-on-grid">
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
                                                <div class="body-right table-cell hidden-gird-cell">
                                                    <div class="info-row price">
                                                        <h3>R$ <?php echo $property['negociacao_valor']; ?></h3>
                                                    </div>
                                                    <div class="info-row phone text-right">
                                                        <a href="<?php echo $property_url; ?>" class="btn btn-primary">Detalhes <i class="fa fa-angle-right fa-right"></i></a>
                                                    </div>
                                                </div>
                                                <div class="table-list full-width hide-on-list">
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


                                <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                    <!--end property items-->

                    <?php echo isset($properties['pagination']) ? $properties['pagination'] : ''; ?>

                </div>
            </div>
        </div>
    </div>
</section>