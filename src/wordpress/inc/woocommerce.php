<?php

if ( class_exists( 'WooCommerce' ) ) {
/* BEGIN WOOCOMMERCE */

// Файлы шаблонов Woocommerce
// https://skyal-team.com/blog/woocommerce/fajly-shablonov-woosommerce-chto-za-chto-otvechaet/

/*
  Добавить в тему поддержку woocommerce
*/
add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
	add_theme_support( 'woocommerce' );
}
/*
  Добавить в тему поддержку woo с настройками
add_action( 'after_setup_theme', 'mytheme_add_woocommerce_support' );
function mytheme_add_woocommerce_support() {
	add_theme_support('woocommerce', array(
		'thumbnail_image_width' => 260,
		'single_image_width'    => 300,
    'product_grid'          => array(
      'default_rows'    => 3,
      'min_rows'        => 2,
      'max_rows'        => 8,
      'default_columns' => 4,
      'min_columns'     => 2,
      'max_columns'     => 5,
    ),
	));
  //add_theme_support( 'wc-product-gallery-zoom' );  // Зум на стр.продукта
  //add_theme_support( 'wc-product-gallery-lightbox' ); // Лайтбокс на стр.продукта
  //add_theme_support( 'wc-product-gallery-slider' ); // Слайдер на стр.продукта
}


/*
  Убирает ссылку с товара в каталоге на страницу товара

remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );



/*
  Отключить все стили woocommerce, либо через unset отключить что-то из этого:
    woocommerce-general — общие настройки оформления
    woocommerce-layout — разметка макета
    woocommerce-smallscreen — оптимизация под мобильные устройства
*/
//add_filter( 'woocommerce_enqueue_styles', '__return_false' );
//unset( $enqueue_styles['woocommerce-general'] );


/* 

  Корзина в шапке. При добавлении в корзину меняет кол-во и цену без перезагрузки стр.
  https://inprocess.by/blog/kak-vyvesti-korzinu-woocommerce-v-shapke-sajta/

  Для родителя необходим класс woocommerce
  Изучить что ещё даёт глобальная переменная global $woocommerce;

  <div class="header__cart woocommerce">
    <?php global $woocommerce; ?>
<a class="cart-btn" href="<?php echo $woocommerce->cart->get_cart_url() ?>">
  <div class="cart-btn__pic">
    <picture>
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.webp" type="image/webp">
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png">
      <img class="cart-btn__icon" src="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png"
        alt="cart">
    </picture>
    <div class="cart-btn__counter"><?php echo sprintf($woocommerce->cart->cart_contents_count); ?></div>
  </div>
  <div class="cart-btn__txt"><?php echo sprintf($woocommerce->cart->total); ?></div>
</a>
</div>


add_filter( 'woocommerce_add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment' );
function woocommerce_header_add_to_cart_fragment( $fragments ) {
ob_start();
if ( sizeof( WC()->cart->get_cart() ) > 0 ) {
?>
<a class="cart-btn cart-complete" href="<?php echo esc_url( WC()->cart->get_cart_url() ); ?>"
  title="<?php esc_attr_e( 'Перейти в корзину', 'ma' ); ?>">
  <div class="cart-btn__pic">
    <picture>
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.webp" type="image/webp">
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png">
      <img class="cart-btn__icon" src="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png"
        alt="cart">
    </picture>
    <div class="cart-btn__counter">
      <?php echo wp_kses_data( sprintf( _n( '%d', '%d', WC()->cart->get_cart_contents_count(), 'ma' ), WC()->cart->get_cart_contents_count() ) );?>
    </div>
  </div>
  <div class="cart-btn__txt">
    <?php echo wp_kses_data( WC()->cart->get_cart_subtotal() ); ?>
  </div>
</a>
<?php
    } else {
        ?>
<a class="cart-btn cart-complete" href="<?php echo esc_url( WC()->cart->get_cart_url() ); ?>"
  title="<?php esc_attr_e( 'Перейти в корзину', 'ma' ); ?>">
  <div class="cart-btn__pic" style="margin:0">
    <picture>
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.webp" type="image/webp">
      <source srcset="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png">
      <img class="cart-btn__icon" src="<?=esc_url(get_template_directory_uri());?>/assets/img/header/cart.png"
        alt="cart">
    </picture>
  </div>
  <div class="cart-btn__txt"></div>
</a>
<?php
    }
    $fragments['.cart-btn'] = ob_get_clean();
    return $fragments;
}






/*
*  Убирает категории со страницы магазина, если выведены каталоги.
*  http://wordpressinside.ru/tips/skryt-tovary-kategorii/
*
add_filter( 'get_terms', 'organicweb_exclude_category', 10, 3 );
function organicweb_exclude_category( $terms, $taxonomies, $args ) {
  $new_terms = array();
  // if a product category and on a page
  if ( in_array( 'product_cat', $taxonomies ) && ! is_admin() && is_page() ) {
    foreach ( $terms as $key => $term ) {
// Enter the name of the category you want to exclude in place of 'uncategorised'
      if ( ! in_array( $term->slug, array( 'слаг_категории' ) ) ) {
        $new_terms[] = $term;
      }
    }
    $terms = $new_terms;
  }
  return $terms;
}
/*  */

/*
*  Убирает товары категории со страницы магазина, если выведены товары.
*  http://wordpressinside.ru/tips/skryt-tovary-kategorii/

add_action( 'woocommerce_product_query', 'custom_pre_get_posts_query' );
function custom_pre_get_posts_query( $q ) {
  if ( is_shop() && !is_admin() ) {
    $tax_query = (array) $q->get( 'tax_query' );
    $tax_query[] = array(
      'taxonomy' => 'product_cat',
      'field' => 'slug',
      'terms' => array( 'ingredienty' ), // Don't display products in the clothing category on the shop page.
      'operator' => 'NOT IN'
    );
    $q->set( 'tax_query', $tax_query );
  }
}
/*  */


















/*
  Кастомная цена и кнопка. Не стоит так делать по причине нарушения совместимости с другими плагинами
  https://qna.habr.com/q/508389
  <span class="product_price"><?php echo $price_html; ?></span>
*/
// add_filter( 'woocommerce_get_price_html', 'override_default_price_html', 100, 2 );
// function dw_change_default_price_html( $price,$product ){
// if ( $product->price > 0 ) {
// if ( $product->price && isset( $product->regular_price ) ) {
// $from = $product->regular_price;
// $to = $product->price;
// return ( ( is_numeric( $to ) ) ? woocommerce_price( $to ) : $to ) .'<span>'. ( ( is_numeric( $from ) ) ?
  // woocommerce_price( $from ) : $from ) .' </span>';
// } else {
// $to = $product->price;
// return '<span>' . ( ( is_numeric( $to ) ) ? woocommerce_price( $to ) : $to ) . '</span>';
// }
// } else {
// return __( 'Free!', 'woocommerce' );
// }
// }


/*
Автоматическое обновление корзины при смене кол-ва товаров без перезагрузки стр.
Сделать через подключение в php
function quantity_upd() {
jQuery(".woocommerce-cart-form").on("change", ".qty", function () {
jQuery("[name='update_cart']").removeAttr('disabled');
jQuery("[name='update_cart']").trigger("click");
});
}

jQuery(function ($) {
$(document).ready(function () {

$('body').on('change', '.qty', function () { // поле с количеством имеет класс .qty
$('[name="update_cart"]').trigger('click');
});

$(document).on('updated_cart_totals', function () {
quantity_upd();
});

});
});
*/


/*
Удаляет поля со страницы деталей заказа.
На самом деле такой подход не решает проблему с проверкой. Лучше вписывать значения по умолчанию.

add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
function custom_override_checkout_fields( $fields ) {
// Удаляет поля со страницы деталей заказа
//unset($fields['billing']['billing_first_name']);
unset($fields['billing']['billing_last_name']);
unset($fields['billing']['billing_company']);
//unset($fields['billing']['billing_address_1']);
//unset($fields['billing']['billing_address_2']);
//unset($fields['billing']['billing_phone']);
unset($fields['billing']['billing_email']);
//unset($fields['billing']['billing_country']);
//unset($fields['billing']['billing_state']);
//unset($fields['billing']['billing_city']);
unset($fields['billing']['billing_postcode']);

//unset($fields['shipping']['shipping_first_name']);
unset($fields['shipping']['shipping_last_name']);
unset($fields['shipping']['shipping_company']);
//unset($fields['shipping']['shipping_address_1']);
//unset($fields['shipping']['shipping_address_2']);
//unset($fields['shipping']['shipping_phone']);
unset($fields['shipping']['shipping_email']);
//unset($fields['shipping']['shipping_country']);
//unset($fields['shipping']['shipping_state']);
//unset($fields['shipping']['shipping_city']);
unset($fields['shipping']['shipping_postcode']);

return $fields;
}




/*
Добавляем поле на страницу оформления заказа
https://wpincode.com/kak-dobavit-novoe-pole-na-stranicu-oformleniya-zakaza-v-woocommerce/

add_filter('woocommerce_checkout_fields', 'custom_woocommerce_billing_fields');
function custom_woocommerce_billing_fields( $fields ) {
$fields['billing']['billing_birthday'] = array(
'label' => __('Дата рождения', 'woocommerce'), // Add custom field label
'placeholder' => __('', 'woocommerce'), // Add custom field placeholder
'required' => true, // if field is required or not
'clear' => false, // add clear or not
'type' => 'text', // add field type
'class' => array('billing_patronymic'), // add class name
'priority' => 10, // Priority sorting option
);
$fields['billing']['billing_birthday'] = array(
'label' => __('Дата рождения', 'woocommerce'), // Add custom field label
'placeholder' => __('', 'woocommerce'), // Add custom field placeholder
'required' => true, // if field is required or not
'clear' => false, // add clear or not
'type' => 'text', // add field type
'class' => array('billing_patronymic'), // add class name
'priority' => 10, // Priority sorting option
);
$fields['billing']['delivery_date'] = array(
'label' => __('Дата доставки', 'woocommerce'), // Add custom field label
'placeholder' => __('', 'woocommerce'), // Add custom field placeholder
'required' => true, // if field is required or not
'clear' => false, // add clear or not
'type' => 'text', // add field type
'class' => array('delivery_date'), // add class name
'priority' => 10, // Priority sorting option
);
$fields['billing']['delivery_time'] = array(
'label' => __('Время доставки', 'woocommerce'), // Add custom field label
'placeholder' => __('', 'woocommerce'), // Add custom field placeholder
'required' => true, // if field is required or not
'clear' => false, // add clear or not
'type' => 'text', // add field type
'class' => array('delivery_time'), // add class name
'priority' => 10, // Priority sorting option
);
$fields['billing']['delivery_type'] = array(
'label' => __('Способ доставки', 'woocommerce'), // Add custom field label
'placeholder' => __('', 'woocommerce'), // Add custom field placeholder
'required' => false, // if field is required or not
'clear' => false, // add clear or not
'type' => 'text', // add field type
'class' => array('delivery_time'), // add class name
'priority' => 10, // Priority sorting option
);

return $fields;
}

/*
Выполнение формы заказа

add_action('woocommerce_checkout_process', 'my_custom_checkout_field_process');
function my_custom_checkout_field_process() {
// Проверяем, заполнено ли поле, если же нет, добавляем ошибку.
if ( ! $_POST['billing_birthday'] ) {
wc_add_notice( __( 'Заполните ваш день рождения. Вы можете выбрать любую дату, но для получения скидки в день рождения,
придётся подтвердить эту информацию!' ), 'error' );
}
if ( ! $_POST['delivery_date'] ) {
wc_add_notice( __( 'Заполните дату доставки' ), 'error' );
}
if ( ! $_POST['delivery_time'] ) {
wc_add_notice( __( 'Заполните время доставки' ), 'error' );
}
}

/*
Обновляем метаданные заказа со значением поля

// Сохраняем метаданные заказа со значением поля
add_action('woocommerce_checkout_update_order_meta', 'shipping_apartment_update_order_meta' );
function shipping_apartment_update_order_meta( $order_id ) {
if ( ! empty( $_POST['shipping_apartment'] ) ) {
update_post_meta( $order_id, 'shipping_apartment', sanitize_text_field( $_POST['shipping_apartment'] ) );
}
}

/*
Выводим значение поля на странице редактирования заказа

add_action( 'woocommerce_admin_order_data_after_billing_address', 'my_custom_checkout_field_display_admin_order_meta',
10, 1 );
function my_custom_checkout_field_display_admin_order_meta($order){
echo '<p><strong>'.__('Дата доставки').':</strong> ' . get_post_meta( $order->id, 'delivery_date', true ) . '</p>';
echo '<p><strong>'.__('Время доставки').':</strong> ' . get_post_meta( $order->id, 'delivery_time', true ) . '</p>';
echo '<p><strong>'.__('Способ доставки').':</strong> ' . get_post_meta( $order->id, 'delivery_type', true ) . '</p>';
}
// add_action( 'woocommerce_admin_order_data_after_billing_address',
'my_custom_checkout_field_display_admin_order_meta', 10, 1 );
// function my_custom_checkout_field_display_admin_order_meta($order){
// }
// add_action( 'woocommerce_admin_order_data_after_billing_address',
'my_custom_checkout_field_display_admin_order_meta', 10, 1 );
// function my_custom_checkout_field_display_admin_order_meta($order){
// }

/*
Добавляем поле в письма заказа

add_filter('woocommerce_email_order_meta_keys', 'my_custom_checkout_field_order_meta_keys');
function my_custom_checkout_field_order_meta_keys( $keys ) {
$keys['День рождения'] = '_billing_birthday';
$keys['Дата доставки'] = '_delivery_date';
$keys['Время доставки г-м-д'] = '_delivery_time';
$keys['Способ доставки г-м-д'] = '_delivery_type';
return $keys;
}






/* BEGIN MODAL
* Быстрый просмотр товара без плагина.
* https://opttour.ru/scripts-and-jquery/otkryivat-zapis-vo-vsplyivayushhem-okne/
* https://opttour.ru/scripts-and-jquery/byistryiy-prosmotr-tovara-bez-plagina/
*/
/* Регистрация скрипта functions.js

add_action( 'wp_enqueue_scripts', 'theme_register_scripts', 1 );
function theme_register_scripts() {
// Register JavaScript Functions File
wp_register_script( 'functions-js', esc_url( trailingslashit( get_template_directory_uri() ) . 'functions.js' ), array(
'jquery' ), '1.0', true );

// Localize Scripts
$php_array = array( 'admin_ajax' => admin_url( 'admin-ajax.php' ) );
wp_localize_script( 'functions-js', 'php_array', $php_array );
}

// Enqueue Scripts
add_action( 'wp_enqueue_scripts', 'theme_enqueue_scripts' );
function theme_enqueue_scripts() {
wp_enqueue_script( 'functions-js' );
}
/* Ajax Post */

/* END MODAL */

/* BEGIN QUICK VIEWER
* Быстрый просмотр товара без плагина.
* https://opttour.ru/scripts-and-jquery/byistryiy-prosmotr-tovara-bez-plagina/
*/
/*
* Кнопка закрытия окна

add_action( 'popup-windows', 'supernova', 5 );
function supernova() {
echo '<div class="popup supernova">
  <p class="close"><i class="fa fa-times" aria-hidden="true"></i></p>
  <div id="ajax-response"></div>
</div>';
}
/*
* Кнопка открытия окна

add_action( 'woocommerce_after_shop_loop_item', 'ajaxpreviewproductbutton' );
function ajaxpreviewproductbutton () {
$idproduct = get_the_ID();
echo '<a href="#" id="';
  echo $idproduct;
  echo '" class="ajax-post postview"><i class="fa fa-eye"></i></a>';
}
/*
* Вывод шаблона просмотра товара - loading-single-product.php

add_action( 'wp_ajax_theme_post_example', 'theme_post_example_init' );
add_action( 'wp_ajax_nopriv_theme_post_example', 'theme_post_example_init' );
function theme_post_example_init() {
$args = array( 'p' => $_POST['id'],'post_type' => array( 'product' ) );
$theme_post_query = new WP_Query( $args );
while( $theme_post_query->have_posts() ) : $theme_post_query->the_post();
?>
<?php  include(__DIR__."/woocommerce/single-product-ajax.php"); ?>
<?php
  endwhile;
  exit;
}
/* END QUICK VIEWER */




/*
*  Личный кабинет пользователя. Вообще он нативно есть в woo.
*  https://opttour.ru/plugins/lichnyj-kabinet-woocommerce-i-vse-chto-s-etim-svyazano/
*/




/*
*
!  Заметки:
*

*  Вся правда о functions.php
*  https://wpmag.ru/2014/functions-php/

*  Комментарии типов записей и как создать (и задать) шаблон страницы
*  https://wp-kama.ru/id_5177/3-sposoba-sozdat-shablon-stranitsyi.html

*  Кастомные типы постов, чтобы в админ панели можно было сделать каталог
*  товаров в виде обычных записей без интернет-магазина, например. Но при
*  этом они не попадали в раздел "Записи" и не выводились со всеми
*  остальными новостями.
*  https://wordpressify.ru/2019/09/tipy-postov-v-wordpress-dobavlenie-sobstvennyh-proizvolnyh-tipov-postov/

*  Добавить во все боди <body <?php body_class(); ?>>, чтобы не слетали стили
* https://gnatkovsky.com.ua/kak-podklyuchit-woocommerce-k-svoej-teme-wordpress.html

* Принудительно добавить AJAX на button товара
* class="ajax_add_to_cart add_to_cart_button" data-product_id="<?php echo get_the_ID(); ?>"
data-product_sku="<?php echo esc_attr($sku) ?>"



* Кастомные файлы:
* single-product-ajax.php - файл быстрого просмотра товара
*
* Места, до которых пока невозможно добраться:
* 1. attachment-woocommerce_thumbnail - изобр.товара в катег., нельзя добавить класс, только каскад.стили.
* 2. Нельзя перенести инпут купона и обновление корзины вне woocommerce-cart-form, только если JS.
* 3.



ПЛАГИНЫ:

* https://wordpress.org/plugins/password-protect-page/
* https://wordpress.org/plugins/telsender/
*
* Markup by Attribute for WooCommerce - дочерние товары
* https://wordpress.org/plugins/markup-by-attribute-for-woocommerce/
*
* WooCommerce Customer History Plugin - Просмотр истории покупок и анализ ценности клиента
* https://wordpress.org/plugins/ultimate-member/ - по типу майлчимп реализовать свой функционал из списка(то что
возможно)
*
* Сделать сопутствующие товары на основе исходника
* https://wp-kama.ru/plugin/woocommerce/function/woocommerce_upsell_display





Перечень файлов, которые нет смысла трогать вообще:
loop/
*/





/* END WOOCOMMERCE */
}

?>