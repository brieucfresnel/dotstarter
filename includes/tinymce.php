<?php

/**
 * Add custom buttons to TinyMCE
 *
 * @return void
 */
function dot_add_mce_button() {
    if (!current_user_can('edit_posts') &&  !current_user_can('edit_pages')) {
        return;
    }

    // check if WYSIWYG is enabled
    if ('true' == get_user_option('rich_editing')) {
        add_filter('mce_external_plugins', 'dot_add_tinymce_plugin');
        add_filter('mce_buttons', 'dot_register_mce_buttons');
    }
}
add_action('admin_head', 'dot_add_mce_button');

/**
 * Register custom TinyMCE buttons
 *
 * @param [type] $buttons
 * @return void
 */
function dot_register_mce_buttons($buttons) {
    array_push($buttons, 'dot_tinymce_plugin');
    return $buttons;
}

/**
 * Register custom TinyMCE plugin
 *
 * @param [type] $plugin_array
 * @return void
 */
function dot_add_tinymce_plugin($plugin_array) {
    $plugin_array['dot_tinymce_plugin'] = get_stylesheet_directory_uri() . '/assets/js/tinymce/tinymce.js';
    return $plugin_array;
}
