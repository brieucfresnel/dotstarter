<div id="main-menu" class="main-menu">
    <div class="l-container">
        <div id="main-menu-toggle" class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <a href="<?php echo home_url() ?>" class="main-menu__logo">
            <img src="<?php the_field('header_logo', 'option') ?>" alt="Logo" />
        </a>
        <div class="main-menu__navigation">
            <?php wp_nav_menu('header-menu') ?>
        </div>
    </div>
</div>
