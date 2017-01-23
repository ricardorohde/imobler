<ul class="profile-menu-tabs">
  <li class="<?php echo isset($page['one']) && $page['one'] == 'minha-conta' && !isset($page['two']) ? 'active' : ''; ?>">
    <a href="<?php echo base_url('minha-conta'); ?>">Minha conta</a>
  </li>

  <li class="<?php echo isset($page['one']) && $page['one'] == 'minha-conta' && isset($page['two']) && $page['two'] == 'favoritos' ? 'active' : ''; ?>">
    <a href="<?php echo base_url('minha-conta/favoritos'); ?>">Favoritos</a>
  </li>

  <li> <a href="add-new-property.html"> Add a new property </a></li>
  <li> <a href="my-favourite-properties.html"> Favourite properties </a></li>
  <li> <a href="my-saved-search.html"> Saved searches </a></li>
  <li> <a href="my-invoices.html"> Invoices </a></li>
</ul>