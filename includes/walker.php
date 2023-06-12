<?php

class Description_Walker extends Walker_Nav_Menu
{
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item));
        !empty($class_names) and $class_names = ' class="' . esc_attr($class_names) . '"';
        $output .= "";
        $attributes  = '';
        !empty($item->attr_title) and $attributes .= ' title="'  . esc_attr($item->attr_title) . '"';
        !empty($item->target) and $attributes .= ' target="' . esc_attr($item->target) . '"';
        !empty($item->xfn) and $attributes .= ' rel="'    . esc_attr($item->xfn) . '"';
        !empty($item->url) and $attributes .= ' href="'   . esc_attr($item->url) . '"';
        $title = apply_filters('the_title', $item->title, $item->ID);
        $item_output = $args->before
            . "<a $attributes $class_names>"
            . $args->link_before
            . $title
            . '</a>'
            . $args->link_after
            . $args->after;
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}
