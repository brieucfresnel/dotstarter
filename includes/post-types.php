<?php

if (!class_exists('DOT_PostTypes')) {
    class DOT_PostTypes
    {
        public function __construct()
        {
            add_action('init', array($this, 'register_post_types'));
        }

        public function register_post_types()
        {
        }
    }

    new DOT_PostTypes();
}
