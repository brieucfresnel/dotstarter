<div class="main-menu<?php echo is_admin_bar_showing() ? ' fix-admin-bar' : '' ?>">
    <div class="container">
        <div class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <a href="<?php echo home_url() ?>" class="main-menu__logo">
            <img src="<?php echo get_field('header_logo', 'option') ?>" alt="Logo"/>
        </a>
        <div class="main-menu__navbar">
            <?php wp_nav_menu('header-menu') ?>
        </div>
        <div></div>
    </div>
</div>
<div class="mobile-menu">
    
</div>
