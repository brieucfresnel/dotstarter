<?php

if (!class_exists('DOT_Starter')) {
	class DOT_Starter {
		/**
		 * @throws Exception
		 */
		public function __construct() {
			require_once(get_stylesheet_directory() . '/vendor/tgmpa/tgm-plugin-activation/class-tgm-plugin-activation.php');
			add_action('tgmpa_register', array($this, 'register_required_plugins'));

			if (!class_exists('\DOT\Core\DOT_Core') || !defined('ACF_PRO') || !defined('ACFE')) {
				return;
			}

			require_once(DOT_THEME_INCLUDES_PATH . 'helpers.php');
			require_once(DOT_THEME_INCLUDES_PATH . 'post-types.php');
			require_once(DOT_THEME_INCLUDES_PATH . 'taxonomies.php');

			add_action('after_setup_theme', array($this, 'theme_setup'));
			add_action('after_setup_theme', array($this, 'register_nav_menus'));
			add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
			add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'), 1);
			add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));

			add_action('upload_mimes', array($this, 'add_mime_types_to_upload_whitelist'));
			add_filter('nav_menu_css_class', array($this, 'add_special_nav_class'), 10, 2);

			add_filter('script_loader_tag', array($this, 'set_scripts_type_module_attribute'), 99, 3);
		}

		/**
		 * @return void
		 */
		public function theme_setup() {
			add_theme_support('post-thumbnails');
			add_theme_support('title-tag');
			add_theme_support('custom-logo', array(
				'height' => 60,
				'width' => 400,
				'flex-height' => true,
				'flex-width' => true,
				'header-text' => array('site-title', 'site-description'),
			));
			add_theme_support('woocommerce');

			add_image_size('2xlarge', 2560, 1440);
		}

		public function register_nav_menus() {
			register_nav_menus(array(
				'header-menu' => __('Header Menu', 'dotstarter')
			));
		}

		/**
		 * @return void
		 */
		public function enqueue_styles() {
			wp_enqueue_style('frontend', DOT_THEME_URI . '/dist/css/frontend.css');
			wp_enqueue_style('slick', DOT_THEME_URI . '/node_modules/slick-carousel/slick/slick.css');
			wp_enqueue_style('gfonts', 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap');

			if (is_admin()) {
				wp_enqueue_style('admin', DOT_THEME_URI . '/dist/css/admin.css');
			}
		}

		/**
		 * @return void
		 */
		public function enqueue_scripts() {
			wp_enqueue_script('jquery');
			wp_enqueue_script('slick', DOT_THEME_URI . '/node_modules/slick-carousel/slick/slick.min.js', array(), null, true);
			wp_enqueue_script('dotstarter-frontend', DOT_THEME_URI . '/dist/js/frontend.js', array('jquery'), 1.0, true);

			if (get_field('gmaps_api_key', 'option')) {
				wp_enqueue_script('google-map', 'https://maps.googleapis.com/maps/api/js?key=' . get_field('gmaps_api_key', 'option'), array(), '3', true);
			}

			// Inject PHP variables to main.js
			$args = array(
				'ajaxUrl' => admin_url('admin-ajax.php'),
				'homeUrl' => home_url(),
				'isLoggedIn' => is_user_logged_in(),
				'isSinglePost' => is_single(),
				'nonce' => wp_create_nonce('dot_nonce'),
				'debug' => WP_DEBUG
			);

			if(get_field('barba', 'option'))
				$args['barbaActive'] = true;

			wp_localize_script('dotstarter-frontend', 'ajaxConfig', $args);
		}

		public function enqueue_admin_scripts() {
			if (!is_edit_page_type_page())
				return;

			wp_enqueue_style('dotstarter-admin-css', DOT_THEME_URI . '/dist/css/admin.css');
			wp_enqueue_script('dotstarter-admin-js', DOT_THEME_URI . '/dist/js/admin.js', array('jquery'), 1.0, true);
		}

		/**
		 * adds new MIME types to file upload whitelist
		 *
		 * @param $file_types
		 * @return array
		 */
		public function add_mime_types_to_upload_whitelist($file_types): array {
			$new_filetypes = array();
			$new_filetypes['svg'] = 'image/svg+xml';
			$new_filetypes['webp'] = 'image/webp';

			return array_merge($file_types, $new_filetypes);
		}

		/**
		 * adds "active" CSS class to current menu item.
		 *
		 * @param $classes
		 * @param $item
		 * @return mixed
		 */
		public function add_special_nav_class($classes, $item) {
			if (in_array('current-menu-item', $classes)) {
				$classes[] = 'active';
			}
			return $classes;
		}

		public function set_scripts_type_module_attribute($tag, $handle, $src) {
			// if not your script, do nothing and return original $tag

			if (
				!str_contains($handle, 'dotstarter-frontend') &&
				!str_contains($handle, 'layout')
			) {
				return $tag;
			}
			// change the script tag by adding type="module" and return it.
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';

			return $tag;
		}

		/**
		 * @return void
		 * @throws Exception
		 */
		public function register_required_plugins() {
			$plugins = array(

				// Plug-ins that need licence key
				array(
					'name' => 'Advanced Custom Fields Pro',
					'slug' => 'advanced-custom-fields-pro',
					'required' => true,
				),
				array(
					'name' => 'WP Migrate DB Pro',
					'slug' => 'wp-migrate-db-pro',
					'required' => true,
				),

				// Plug-ins from WordPress repository
				array(
					'name' => 'Classic Editor',
					'slug' => 'classic-editor',
					'required' => true,
				),
				array(
					'name' => 'Advanced Custom Fields : Extended',
					'slug' => 'acf-extended',
					'required' => true,
				),
				array(
					'name' => 'Yoast SEO',
					'slug' => 'wordpress-seo',
					'required' => true,
				),
				array(
					'name' => 'Better Search Replace',
					'slug' => 'better-search-replace',
					'required' => false,
				),
				array(
					'name' => 'What The File',
					'slug' => 'what-the-file',
					'required' => false,
				),

				// DotCore
				array(
					'name' => 'DOT Core',
					'slug' => 'dotcore',
					'required' => true,
				),
			);

			$config = array(
				'id' => 'dotstarter',
				// Unique ID for hashing notices for multiple instances of TGMPA.
				'default_path' => '',
				// Default absolute path to bundled plugins.
				'menu' => 'tgmpa-install-plugins',
				// Menu slug.
				'parent_slug' => 'themes.php',
				// Parent menu slug.
				'capability' => 'edit_theme_options',
				// Capability needed to view plugin install page, should be a capability associated with the parent menu used.
				'has_notices' => true,
				// Show admin notices or not.
				'dismissable' => true,
				// If false, a user cannot dismiss the nag message.
				'dismiss_msg' => '',
				// If 'dismissable' is false, this message will be output at top of nag.
				'is_automatic' => true,
				// Automatically activate plugins after installation or not.
				'message' => '',
				// Message to output right before the plugins table.
			);

			tgmpa($plugins, $config);
		}
	}
}