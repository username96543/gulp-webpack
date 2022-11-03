<?php
/* 
  Template Name: Home
  Template Post Type: page
*/

get_header();
?>

<?php	while ( have_posts() ) : the_post(); ?>



<?php endwhile; ?>

<?php
get_sidebar();
get_footer();