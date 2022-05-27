<?php

if (!class_exists('DotStarter')) {
    class DotStarter {
        /**
         * @throws Exception
         */
        public function __construct() {
            if (!class_exists('DotCore')) {
                throw new Exception('Le plugin DOT Core doit être installé et activé pour que ce thème fonctionne correctement.');
            }

            require_once(DOT_THEME_INCLUDES_PATH . 'helpers.php');

            add_action('after_setup_theme', array($this, 'theme_setup'));
            add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
            add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        }

        /**
         * Theme setup
         */
        function theme_setup() {
            add_theme_support('post-thumbnails');
            add_theme_support('title-tag');
            add_theme_support('custom-logo', array(
                'height' => 60,
                'width' => 400,
                'flex-height' => true,
                'flex-width' => true,
                'header-text' => array('site-title', 'site-description'),
            ));

            add_image_size('2xlarge', 2560, 1440);
        }

        public function enqueue_styles() {
            wp_enqueue_style('frontend', DOT_THEME_PATH . '/dist/css/frontend.css');
            wp_enqueue_style('slick', DOT_THEME_PATH . '/node_modules/slick-carousel/slick/slick.css');

            if (is_admin()) {
                wp_enqueue_style('admin', DOT_THEME_PATH . '/dist/css/admin.css');
            }
        }

        public function enqueue_scripts() {
            if (get_field('gmaps_api_key', 'option')) {
                wp_enqueue_script('google-map', 'https://maps.googleapis.com/maps/api/js?key=' . get_field('gmaps_api_key', 'option'), array(), '3', true);
            }

            wp_enqueue_script('jquery');
            wp_enqueue_script('dotstarter-frontend', DOT_THEME_PATH . '/dist/js/frontend.js', array('jquery'), 1.0, true);

            // Inject PHP variables to main.js
            wp_localize_script('dotstarter-frontend', 'ajaxConfig', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'homeUrl' => home_url(),
                'isLoggedIn' => is_user_logged_in(),
                'isSinglePost' => is_single(),
                'nonce' => wp_create_nonce('dot_nonce')
            ));
        }

        public function enqueue_admin_scripts() {
            if(!is_edit_page_type_page())
                return;

            wp_enqueue_style('dotstarter-admin-css', DOT_THEME_PATH . '/dist/css/admin.css');
            wp_enqueue_script('dotstarter-admin-js', DOT_THEME_PATH . '/dist/js/admin.js', array('jquery'), 1.0, true);

        }
    }
}