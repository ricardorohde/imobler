    <section id="section-body"
        data-property_latitude="<?php echo $property['endereco_latitude_site']; ?>"
        data-property_longitude="<?php echo $property['endereco_longitude_site']; ?>">

        <!--start detail top-->
        <div class="detail-top detail-top-grid no-margin">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <div class="header-detail table-list">
                            <div class="header-left">
                                <ol class="breadcrumb">
                                    <li>&nbsp;</li>
                                </ol>
                                <h1>
                                    <?php echo $property['tipo_nome']; ?> à <?php echo $property['transacao_nome']; ?> em <?php echo $property['bairro_nome']; ?>, <?php echo $property['area_util']; ?>m²

                                    <!--span class="label-wrap hidden-sm hidden-xs">
                                        <span class="label label-primary">For Sale</span>
                                        <span class="label label-danger">Sold</span>
                                    </span-->
                                </h1>
                                <div class="property-address"><?php echo $property['negociacao_referencia']; ?></div>
                            </div>
                            <div class="header-right">
                                <ul class="actions">
                                    <li class="share-items">
                                        <div class="share_tooltip fade">
                                            <a class="share-item" href="http://www.facebook.com/share.php?u=<?php echo isset($property_permalink) ? $property_permalink : base_url(); ?>&title={{tipo_nome}} à venda em {{bairro_nome}}+<?php echo isset($property_permalink) ? $property_permalink : base_url(); ?>"><i class="fa fa-facebook"></i></a>
                                            <a class="share-item" href="http://twitter.com/intent/tweet?status={{tipo_nome}} à venda em {{bairro_nome}}+<?php echo isset($property_permalink) ? $property_permalink : base_url(); ?>"><i class="fa fa-twitter"></i></a>
                                            <a class="share-item" href="https://plus.google.com/share?url=<?php echo isset($property_permalink) ? $property_permalink : base_url(); ?>"><i class="fa fa-google-plus"></i></a>
                                        </div>
                                        <span class="share-btn" title="Compartilhar" data-placement="bottom" data-toggle="property-tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                                    </li>



<!--                                     <li class="share-btn">
                                        <div class="share_tooltip tooltip_left fade">
                                            <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-facebook"></i></a>
                                            <a href="#" onclick="if(!document.getElementById('td_social_networks_buttons')){window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;}"><i class="fa fa-twitter"></i></a>

                                            <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-pinterest"></i></a>

                                            <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-linkedin"></i></a>

                                            <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-google-plus"></i></a>
                                            <a href="#"><i class="fa fa-envelope"></i></a>
                                        </div>
                                        <span data-placement="right" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                                    </li> -->
                                    <li>
                                        <span title="Adicionar aos favoritos" data-property_id="<?php echo $property['imovel_id']; ?>" data-action="<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? 'unlike' : 'like'; ?>" class="btn-like<?php echo isset($property['imovel_favorito']) && $property['imovel_favorito'] == 1 ? ' active' : ''; ?>" data-placement="top" data-toggle="property-tooltip" data-original-title="Adicionar aos favoritos">
                                          <i class="fa fa-heart"></i>
                                        </span>
                                    </li>
                                </ul>
                                <span class="item-price">R$ <?php echo $property['negociacao_valor']; ?></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--end detail top-->

        <!--start detail content-->
        <section class="section-detail-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 container-contentbar">
                        <div class="detail-bar">
                            <div class="detail-media detail-top-slideshow">
                                <div class="tab-content">

                                    <div id="gallery" class="tab-pane fade in active">
                                        <span class="label-wrap visible-sm visible-xs">
                                          <span class="label label-primary">For Sale</span>
                                          <span class="label label-danger">Sold</span>
                                        </span>

                                        <div class="slideshow">
                                            <div class="slideshow-main">
                                                <div class="slide">
                                                    <?php
                                                    if(isset($property['imagens'])){
                                                      foreach ($property['imagens'] as $key => $image) {
                                                        ?>
                                                        <div>
                                                            <img src="<?php echo base_url('imagens/imoveis/' . $property['imovel_id'] . '/810/430/100/' . $image['arquivo']); ?>" width="810" height="430" alt="<?php echo $image['legenda']; ?>" />
                                                        </div>
                                                        <?php
                                                      }
                                                    }
                                                    ?>
                                                </div>
                                            </div>
               <!--                              <div class="slideshow-nav-main">
                                                <div class="slideshow-nav">
                                                    <?php
                                                    if(isset($property['imagens'])){
                                                      foreach ($property['imagens'] as $key => $image) {
                                                        ?>
                                                        <div>
                                                            <img src="<?php echo base_url('imagens/imoveis/' . $property['imovel_id'] . '/100/70/80/' . $image['arquivo']); ?>" width="100" height="70" alt="<?php echo $image['legenda']; ?>" />
                                                        </div>
                                                        <?php
                                                      }
                                                    }
                                                    ?>
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>

                                    <div id="map" class="tab-pane fade"></div>
                                    <div id="street-map" class="tab-pane fade"></div>

                                </div>
                                <div class="media-tabs">
                                    <ul class="media-tabs-list">
                                        <li class="popup-trigger active" data-placement="bottom" data-toggle="tooltip" data-original-title="Fotos">
                                            <a href="#gallery" data-toggle="tab">
                                                <i class="fa fa-camera"></i>
                                            </a>
                                        </li>
                                        <li data-placement="bottom" data-toggle="tooltip" data-original-title="Mapa">
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
                                        <li class="share-btn">
                                            <div class="share_tooltip tooltip_left fade">
                                                <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-facebook"></i></a>
                                                <a href="#" onclick="if(!document.getElementById('td_social_networks_buttons')){window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;}"><i class="fa fa-twitter"></i></a>

                                                <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-pinterest"></i></a>

                                                <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-linkedin"></i></a>

                                                <a href="#" onclick="window.open(this.href, 'mywin','left=50,top=50,width=600,height=350,toolbar=0'); return false;"><i class="fa fa-google-plus"></i></a>
                                                <a href="#"><i class="fa fa-envelope"></i></a>
                                            </div>
                                            <span data-placement="right" data-toggle="tooltip" data-original-title="share"><i class="fa fa-share-alt"></i></span>
                                        </li>
                                        <li>
                                            <span><i class="fa fa-heart-o"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="detail-list detail-block">
                                <div class="detail-title">
                                    <h2 class="title-left">Detalhes do imóvel</h2>
                                    <div class="title-right">
                                    </div>
                                </div>
                                    <ul class="list-three-col">
                                        <li><?php echo $property['tipo_nome']; ?></li>

                                        <li>
                                            <?php echo $property['imovel_dormitorios']; ?> <?php echo $property['imovel_dormitorios'] == 1 ? 'quarto' : 'quartos'; ?> <?php echo $property['imovel_suites'] ? '('. $property['imovel_suites'] . ' ' . ($property['imovel_suites'] == 1 ? 'suíte' : 'suítes') .')' : ''; ?>
                                        </li>

                                        <li>
                                            <?php echo $property['imovel_banheiros']; ?> <?php echo $property['imovel_banheiros'] == 1 ? 'banheiro' : 'banheiros'; ?>
                                        </li>

                                        <li>
                                            <?php echo $property['imovel_salas']; ?> <?php echo $property['imovel_salas'] == 1 ? 'sala' : 'salas'; ?>
                                        </li>

                                        <li>
                                            <?php echo $property['imovel_garagens']; ?> <?php echo $property['imovel_garagens'] == 1 ? 'vaga' : 'vagas'; ?>
                                        </li>

                                        <li><strong>Área útil:</strong> <?php echo $property['area_util']; ?></li>
                                        <li><strong>Área total:</strong> <?php echo $property['area_total']; ?></li>
                                    </ul>
                            </div>

                            <?php
                            if(isset($property['features'])){
                                ?>
                                <div class="detail-features detail-block">
                                    <div class="detail-title">
                                        <h2 class="title-left">Características</h2>
                                    </div>
                                    <ul class="list-three-col list-features">
                                        <?php
                                        foreach ($property['features'] as $key => $feature) {
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

                            <div class="property-description detail-block">
                                <div class="detail-title">
                                    <h2 class="title-left">Descrição</h2>
                                    <div class="title-right">
                                    </div>
                                </div>
                                <?php echo $property['descricao']; ?>
                            </div>


                            <div class="detail-contact detail-block">
                                <div class="detail-title">
                                    <h2 class="title-left">Contato</h2>
                                    <div class="title-right">
                                    </div>
                                </div>
                                <div class="media agent-media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img src="<?php echo base_url('assets/site/images/logo-contato.jpg'); ?>" class="media-object" alt="Mediz Imóveis" width="74" height="74">
                                        </a>
                                    </div>
                                    <div class="media-body">

                                        <ul>
                                            <li><i class="fa fa-user"></i> Mediz Imóveis</li>
                                            <li>
                                                <span><i class="fa fa-phone"></i> (11) 3902-7180</span>
                                                <span><i class="fa fa-whatsapp"></i>  (11) 99315-3548</span>
                                            </li>
                                            <li>
                                                <span><a href="https://www.facebook.com/mediz.imoveis/" target="_blank"><i class="fa fa-facebook-square"></i> Facebook</a></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="detail-title-inner">
                                    <h4 class="title-inner">Saiba mais sobre este imóvel</h4>
                                </div>
                                <form>
                                    <div class="row">
                                        <div class="col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Nome" type="text" name="nome">
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Telefone" type="text" name="telefone">
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <input class="form-control" placeholder="E-mail" type="email" name="email">
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <textarea class="form-control" rows="5" placeholder="Mensagem" name="mensagem">Olá, tenho interesse neste imóvel: <?php echo $property['tipo_nome']; ?> à <?php echo $property['transacao_nome']; ?> em <?php echo $property['bairro_nome']; ?>, <?php echo $property['area_util']; ?>m². Aguardo o contato. Obrigado.</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-secondary">Enviar</button>
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
                                    <h3 class="widget-title">Demais despesas</h3>
                                </div>
                                <div class="widget-body">
                                    <ul>
                                        <?php
                                        if(isset($property['despesas'])){
                                            foreach ($property['despesas'] as $key => $despesa) {
                                                ?>
                                                <li>
                                                    <div class="pull-left">
                                                        <?php echo $despesa['tipo']; ?>
                                                    </div>
                                                    <div class="pull-right">
                                                        <strong>R$ <?php echo number_format($despesa['valor'], 2, ',', '.'); ?></strong>
                                                    </div>
                                                </li>
                                                <?php
                                            }
                                        }
                                        ?>
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
        </section>
        <!--end detail content-->

    </section>