<?php
/**
 * Big Image Slider  Layout
 * 1 column only
 *
 * Fields :
 * title
 * slide : background_image, title, link, button
 */

// Get number of slides
$slides_count = is_array(get_sub_field(('slide'))) ? count(get_sub_field('slide')) : 0;
?>

<h1>Template</h1>

<?php if (have_rows('slide')): ?>
    <div class="f-big-image-slider__slider">
        <?php while (have_rows('slide')): the_row();
            $image = get_sub_field('bg_image');

            $subtitle = get_sub_field('subtitle');
            $description = get_sub_field('description');
            ?>

            <div class="slide carousel-cell">
                <img class="slide__img" src="<?php echo acf_maybe_get($image, 'url') ?>"
                     alt="<?php echo acf_maybe_get($image, 'alt') ?>"/>
                <div class="slide__content">
                    <div class="l-container">
                        <?php if ($subtitle): ?>
                            <div class="slide__subtitle heading9"><?php echo $subtitle ?></div>
                        <?php endif; ?>
                        <div class="slide__title heading1 uppercase weight-bold"><?php echo get_sub_field('title') ?></div>
                        <?php if ($text): ?>
                            <div class="slide__text section-intro"><?php echo $text; ?></div>
                        <?php endif; ?>
                        <?php if ($price): ?>
                            <div class="slide__price body-md text-accent weight-medium">
                                <img src="<?php echo THEME_PATH ?>/assets/icons/price.svg"
                                     alt="<?php _e('Price tag', DOMAIN) ?>'"/>
                                <?php echo $price; ?>
                            </div>
                        <?php endif; ?>
                        <?php if (have_rows('buttons')): ?>
                            <div class="slide__buttons">
                                <?php while (have_rows('buttons')):
                                    the_row();
//                                    $buttonParams = get_sub_field('button');
//                                    $button = $buttonParams ? new Button($buttonParams) : null;
                                    ?>
<!--                                    --><?php //$button->the_html(); ?>
                                <?php endwhile; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
    <?php if ($slides_count > 1): ?>
        <div class="o-slider__controls">
            <div class="o-slider__index">
                <span id="current-index">1</span>&nbsp;/ <?php echo $slides_count ?>
            </div>
            <div class="o-slider__prev f-big-image-slider__prev">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.15458 0.289114C8.00146 0.115288 7.77696 0.0106303 7.53743 0.000890401C7.2979 -0.00975197 7.06496 0.0753859 6.89492 0.235919C6.72584 0.395556 6.63567 0.615503 6.64599 0.841655C6.65726 1.0678 6.7681 1.27977 6.9522 1.42432L13.0871 7.22354H0.810648C0.356016 7.24571 0 7.60046 0 8.03058C0 8.45982 0.356016 8.81457 0.810648 8.83763H13.0871L6.94282 14.6289C6.62158 14.9464 6.62158 15.4466 6.94282 15.7641C7.10157 15.9149 7.31856 16 7.544 16C7.76944 16 7.98548 15.9149 8.14517 15.7641L15.7445 8.58926L15.7436 8.59014C15.907 8.44115 16 8.23628 16 8.02255C16 7.80793 15.907 7.60305 15.7436 7.45496L8.15458 0.289114Z"
                          fill="#FBF9F9"/>
                </svg>
            </div>
            <div class="o-slider__next f-big-image-slider__next">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.15458 0.289114C8.00146 0.115288 7.77696 0.0106303 7.53743 0.000890401C7.2979 -0.00975197 7.06496 0.0753859 6.89492 0.235919C6.72584 0.395556 6.63567 0.615503 6.64599 0.841655C6.65726 1.0678 6.7681 1.27977 6.9522 1.42432L13.0871 7.22354H0.810648C0.356016 7.24571 0 7.60046 0 8.03058C0 8.45982 0.356016 8.81457 0.810648 8.83763H13.0871L6.94282 14.6289C6.62158 14.9464 6.62158 15.4466 6.94282 15.7641C7.10157 15.9149 7.31856 16 7.544 16C7.76944 16 7.98548 15.9149 8.14517 15.7641L15.7445 8.58926L15.7436 8.59014C15.907 8.44115 16 8.23628 16 8.02255C16 7.80793 15.907 7.60305 15.7436 7.45496L8.15458 0.289114Z"
                          fill="#FBF9F9"/>
                </svg>
            </div>
        </div>
    <?php endif; ?>
<?php endif; ?>

