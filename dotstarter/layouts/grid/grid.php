<?php

$component_id = get_sub_field('component');
$component_post_type = get_field('post_type', $component_id);

$query = new \WP_Query(array(
    'post_type' => $component_post_type
));

?>

<div class="grid grid--4">
    <?php if($query->have_posts()): while($query->have_posts()): $query->the_post(); ?>
        <?php the_component($component_id); ?>
    <?php endwhile; endif; ?>
</div>

<?php the_layout_part('button', 'button'); ?>

