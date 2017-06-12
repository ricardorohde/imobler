<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu">
            <li>
                <a href="<?php echo base_url('admin'); ?>"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>

            <li>
                <a href="#"><i class="fa fa-home fa-fw"></i> Imóveis<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="<?php echo base_url('admin/imoveis'); ?>">Listar imóveis</a>
                    </li>
                    <li>
                        <a href="<?php echo base_url('admin/imoveis/adicionar'); ?>">Adicionar imóvel</a>
                    </li>
                </ul>
            </li>

           <!--  <li>
                <a href="#"><i class="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Third Level <span class="fa arrow"></span></a>
                        <ul class="nav nav-third-level">
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li> -->
        </ul>
    </div><!-- /.sidebar-collapse -->
</div><!-- /.navbar-static-side -->