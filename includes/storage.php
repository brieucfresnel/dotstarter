<?php

function dot_start_session() {
    if (!session_id()) {
        session_start();
    }
}

function dot_set_cookies() {
    // Save user visit for 1 hour and check if first visit
    if (!isset($_COOKIE['_dot_has_visited'])) {
        setcookie('_dot_has_visited', true, [
            'expires' => time() + 3600,
            'path' => COOKIEPATH,
            'domain' => COOKIE_DOMAIN,
            'samesite' => true,
        ]);
        $_SESSION['_dot_is_first_visit'] = true;
    } else {
        $_SESSION['_dot_is_first_visit'] = false;
    }
}

add_action('init', 'dot_start_session');
add_action('init', 'dot_set_cookies');
