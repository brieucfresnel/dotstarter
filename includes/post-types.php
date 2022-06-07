<?php

if(!class_exists('DOT_PostTypes')) {
    class DOT_PostTypes {
        public function __construct() {
            add_action('init', array($this, 'register_post_types'));
        }

        public function register_post_types() {
            $labels = array(
                'name'                  => _x( 'Events', 'Post type general name', 'dotstarter' ),
                'singular_name'         => _x( 'Event', 'Post type singular name', 'dotstarter' ),
                'menu_name'             => _x( 'Events', 'Admin Menu text', 'dotstarter' ),
                'name_admin_bar'        => _x( 'Event', 'Add New on Toolbar', 'dotstarter' ),
                'add_new'               => __( 'Add New', 'dotstarter' ),
                'add_new_item'          => __( 'Add New Event', 'dotstarter' ),
                'new_item'              => __( 'New Event', 'dotstarter' ),
                'edit_item'             => __( 'Edit Event', 'dotstarter' ),
                'view_item'             => __( 'View Event', 'dotstarter' ),
                'all_items'             => __( 'All Events', 'dotstarter' ),
                'search_items'          => __( 'Search Events', 'dotstarter' ),
                'parent_item_colon'     => __( 'Parent Events:', 'dotstarter' ),
                'not_found'             => __( 'No events found.', 'dotstarter' ),
                'not_found_in_trash'    => __( 'No events found in Trash.', 'dotstarter' ),
                'featured_image'        => _x( 'Event Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'dotstarter' ),
                'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
                'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
                'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
                'archives'              => _x( 'Event archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'dotstarter' ),
                'insert_into_item'      => _x( 'Insert into event', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'dotstarter' ),
                'uploaded_to_this_item' => _x( 'Uploaded to this event', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'dotstarter' ),
                'filter_items_list'     => _x( 'Filter events list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'dotstarter' ),
                'items_list_navigation' => _x( 'Events list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'dotstarter' ),
                'items_list'            => _x( 'Events list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'dotstarter' ),
            );

            $args = array(
                'labels'             => $labels,
                'public'             => true,
                'publicly_queryable' => true,
                'show_ui'            => true,
                'show_in_menu'       => true,
                'query_var'          => true,
                'rewrite'            => array( 'slug' => 'event' ),
                'capability_type'    => 'post',
                'has_archive'        => true,
                'hierarchical'       => false,
                'menu_position'      => null,
                'supports'           => array( 'title', 'thumbnail', 'excerpt' ),
            );

            register_post_type( 'event', $args );

//            Example of Post Type arguments
//
//            $labels = array(
//                'name'                  => _x( 'Books', 'Post type general name', 'dotstarter' ),
//                'singular_name'         => _x( 'Book', 'Post type singular name', 'dotstarter' ),
//                'menu_name'             => _x( 'Books', 'Admin Menu text', 'dotstarter' ),
//                'name_admin_bar'        => _x( 'Book', 'Add New on Toolbar', 'dotstarter' ),
//                'add_new'               => __( 'Add New', 'dotstarter' ),
//                'add_new_item'          => __( 'Add New Book', 'dotstarter' ),
//                'new_item'              => __( 'New Book', 'dotstarter' ),
//                'edit_item'             => __( 'Edit Book', 'dotstarter' ),
//                'view_item'             => __( 'View Book', 'dotstarter' ),
//                'all_items'             => __( 'All Books', 'dotstarter' ),
//                'search_items'          => __( 'Search Books', 'dotstarter' ),
//                'parent_item_colon'     => __( 'Parent Books:', 'dotstarter' ),
//                'not_found'             => __( 'No books found.', 'dotstarter' ),
//                'not_found_in_trash'    => __( 'No books found in Trash.', 'dotstarter' ),
//                'featured_image'        => _x( 'Book Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'dotstarter' ),
//                'archives'              => _x( 'Book archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'dotstarter' ),
//                'insert_into_item'      => _x( 'Insert into book', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'dotstarter' ),
//                'uploaded_to_this_item' => _x( 'Uploaded to this book', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'dotstarter' ),
//                'filter_items_list'     => _x( 'Filter books list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'dotstarter' ),
//                'items_list_navigation' => _x( 'Books list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'dotstarter' ),
//                'items_list'            => _x( 'Books list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'dotstarter' ),
//            );
//
//            $args = array(
//                'labels'             => $labels,
//                'public'             => true,
//                'publicly_queryable' => true,
//                'show_ui'            => true,
//                'show_in_menu'       => true,
//                'query_var'          => true,
//                'rewrite'            => array( 'slug' => 'book' ),
//                'capability_type'    => 'post',
//                'has_archive'        => true,
//                'hierarchical'       => false,
//                'menu_position'      => null,
//                'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
//            );
//
//            register_post_type( 'book', $args );
        }
    }

    new DOT_PostTypes();
}