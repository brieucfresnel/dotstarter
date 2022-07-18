<?php

if (!class_exists('DOT_Taxonomies')) {
    class DOT_Taxonomies {
        public function __construct() {
            add_action('init', array($this, 'register_taxonomies'));
        }

        public function register_taxonomies() {
//            $labels = array(
//                'name' => _x('Product Categories', 'taxonomy general name'),
//                'singular_name' => _x('Category', 'taxonomy singular name'),
//                'search_items' => __('Search Categories'),
//                'all_items' => __('All Categories'),
//                'parent_item' => __('Parent Category'),
//                'parent_item_colon' => __('Parent Category:'),
//                'edit_item' => __('Edit Category'),
//                'update_item' => __('Update Category'),
//                'add_new_item' => __('Add New Category'),
//                'new_item_name' => __('New Category Name'),
//                'menu_name' => __('Categories'),
//            );
//
//            register_taxonomy('product_cat', array('product'), array(
//                'hierarchical' => true,
//                'labels' => $labels,
//                'show_ui' => true,
//                'show_in_rest' => true,
//                'show_admin_column' => true,
//                'query_var' => true,
//                'rewrite' => array('slug' => 'product_cat'),
//            ));
        }
    }

    new DOT_Taxonomies();
}