<?php

/**
 * Off format <br> <p> CF7
 */
add_filter('wpcf7_autop_or_not', '__return_false');
## Отключаем стили, скрипты плагина везде кроме страницы contacts
add_action('wp_print_styles', 'my_deregister_javascript', 100 );
function my_deregister_javascript(){
	//if( ! is_page ('contacts') ){
		wp_deregister_script( 'contact-form-7' ); // отключаем скрипты плагина
		wp_deregister_style( 'contact-form-7' ); // отключаем стили плагина
	//}
}