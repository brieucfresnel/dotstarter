<?php

if(!class_exists('DOT_PostTypes')) {
    class DOT_PostTypes {
        public function __construct() {
            add_action('init', array($this, 'register_post_types'));
        }

        public function register_post_types() {
//            $labels = array(
//                'name'                  => _x( 'Products', 'Post type general name', 'dotstarter' ),
//                'singular_name'         => _x( 'Product', 'Post type singular name', 'dotstarter' ),
//                'menu_name'             => _x( 'Products', 'Admin Menu text', 'dotstarter' ),
//                'name_admin_bar'        => _x( 'Product', 'Add New on Toolbar', 'dotstarter' ),
//                'add_new'               => __( 'Add New', 'dotstarter' ),
//                'add_new_item'          => __( 'Add New Product', 'dotstarter' ),
//                'new_item'              => __( 'New Product', 'dotstarter' ),
//                'edit_item'             => __( 'Edit Product', 'dotstarter' ),
//                'view_item'             => __( 'View Product', 'dotstarter' ),
//                'all_items'             => __( 'All Products', 'dotstarter' ),
//                'search_items'          => __( 'Search Products', 'dotstarter' ),
//                'parent_item_colon'     => __( 'Parent Products:', 'dotstarter' ),
//                'not_found'             => __( 'No products found.', 'dotstarter' ),
//                'not_found_in_trash'    => __( 'No products found in Trash.', 'dotstarter' ),
//                'featured_image'        => _x( 'Product Thumbnail', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'set_featured_image'    => _x( 'Set thumbnail', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'remove_featured_image' => _x( 'Remove thumbnail', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'use_featured_image'    => _x( 'Use as thumbnail', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'archives'              => _x( 'Product archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'dotstarter' ),
//                'insert_into_item'      => _x( 'Insert into product', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'dotstarter' ),
//                'uploaded_to_this_item' => _x( 'Uploaded to this product', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'dotstarter' ),
//                'filter_items_list'     => _x( 'Filter products list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'dotstarter' ),
//                'items_list_navigation' => _x( 'Products list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'dotstarter' ),
//                'items_list'            => _x( 'Products list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'dotstarter' ),
//            );
//
//            $args = array(
//                'labels'             => $labels,
//                'public'             => true,
//                'publicly_queryable' => true,
//                'show_ui'            => true,
//                'show_in_menu'       => true,
//                'query_var'          => true,
//                'rewrite'            => array( 'slug' => 'produit' ),
//                'capability_type'    => 'post',
//                'has_archive'        => true,
//                'hierarchical'       => false,
//                'menu_position'      => null,
//                'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
//            );
//
//            register_post_type( 'product', $args );
        }
    }

    new DOT_PostTypes();
}