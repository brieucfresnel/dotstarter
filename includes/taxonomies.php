<?php

if (!class_exists('DOT_Taxonomies')) {
    class DOT_Taxonomies {
        public function __construct() {
            add_action('init', array($this, 'register_taxonomies'));
        }

        public function register_taxonomies() {
            // $labels = array(
            //     'name' => 'Taxonomie',
            //     'singular_name' => 'Taxonomie',
            //     'all_items' => 'Toutes les taxonomies',
            //     'edit_item' => 'Modifier la taxonomie',
            //     'add_new_item' => 'Ajouter une taxonomie',
            //     'menu_name' => 'Taxonomies'
            // );

            // register_taxonomy('tax', array('post_type'), array(
            //     'hierarchical' => true,
            //     'labels' => $labels,
            //     'show_ui' => true,
            //     'show_in_rest' => true,
            //     'show_admin_column' => true,
            //     'query_var' => true,
            // ));
        }
    }

    new DOT_Taxonomies();
}
