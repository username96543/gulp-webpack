"use strict";

import * as flsFunc from "./common/isWebp.js";
//import * as animation from './common/animate.js';
import * as documentClicks from "./common/clicks.js";
//import * as wordpress from "./common/wp/wp-config.js";

flsFunc.isWebp();

/* BEGIN BASE FUNCTIONS */

const postEdit = (data) => {
  fetch("/wp-admin/admin-ajax.php", {
    headers: {
      accept: "*/*",
      //"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundaryJCl1BxY2gSkBvATz",
      "x-requested-with": "XMLHttpRequest",
    },
    //"referrer": "http://daybyday.local/addplace/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: data,
    method: "POST",
    //"mode": "cors",
    credentials: "include",
  });
};

// Модальные окна.
const modalOpen = (eID) => {
  document.querySelector("body").classList.add("overflow-hidden");
  let element = document.getElementById(eID);
  element.classList.remove("hidden");
};
const modalClose = (eID) => {
  document.querySelector("body").classList.remove("overflow-hidden");
  let element = document.getElementById(eID);
  element.classList.add("hidden");
};

// Ленивая загрузка карты в iframe
// const lazyMap = () => {
//   // Запрет скролла на все iframe с классом map до клика.
//   if (document.querySelector('.map')) {
//     let maps = document.querySelectorAll('.map');
//     for (let i = 0; i < maps.length; i++) {
//       maps[i].querySelector('iframe').style.pointerEvents = 'none';
//       maps[i].onclick = function () {
//         this.querySelector('iframe').style.pointerEvents = 'all';
//         // Если есть класс .img, то из data-src вставляем ссылку в src фрейма и скрываем изображение.
//         if (this.querySelector('.img')) {
//           let data_src = this.querySelector('iframe').getAttribute('data-src');
//           this.querySelector('iframe').setAttribute('src', data_src);
//           this.querySelector('.img').classList.add('hidden');
//         }
//       }
//     }
//   }
// }

// Циклические ссылки
// const circularReference = () => {
//   // Против циклических ссылок на главной
//   if (document.querySelector('.home-link')) {
//     document.querySelectorAll('.home-link').forEach(element => {
//       element.addEventListener('click', function () {
//         window.location.pathname = '/';
//       });
//     });
//   }
//   // Против циклических ссылок на других страницах
//   if (document.querySelector('.self-link')) {
//     document.querySelectorAll('.self-link').forEach(element => {
//       element.addEventListener('click', function () {
//         window.location = window.location;
//       });
//     });
//   }
// }

// Футер абсолютно позиционирован, чтобы прижать его к нижней границе, если контента мало и футер задирается вверх. Под него в обратном случае нужен padding у родителя, чтобы если контента много, то футер не скрывал контент. Инициализируется при load и resize.
const footer = () => {
  if (document.querySelector(".wrapper.fix-footer .background")) {
    document.querySelector(
      ".wrapper.fix-footer .background"
    ).style.paddingBottom =
      document.querySelector(".footer").clientHeight + "px";
  }
};

const header = () => {
  if (document.querySelector(".header")) {
    let top = document.querySelector(".header").offsetTop,
      height = document.querySelector(".header").offsetHeight;
    document.querySelector(".screen-1__box").style.paddingTop =
      top + height + "px";
  }
};

/* END BASE FUNCTIONS */

// Основной код после загрузки страницы.
document.addEventListener("DOMContentLoaded", (e) => {
  //@include('common/fullpage-settings.js')

  // Баннер
  if (document.querySelector(".banner__slider")) {
    var banner = new Swiper(".banner__slider", {
      loop: true,
      mousewheel: false,
      effect: "fade",
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  Fancybox.bind('a[data-album="page_home"]', {
    groupAll: true,
  });

  Fancybox.bind('a[data-album="page_gallery"]', {
    groupAll: true,
  });

  let place_data = new FormData();
  place_data.append("x", "");
  postEdit(place_data);

  (function () {
    // Базовые функции
    documentClicks();
    console.log(1);
    //circularReference();
    //lazyMap();
    header();
    footer();
  })();
});

window.addEventListener("resize", () => {
  header();
  footer();
});

window.addEventListener("scroll", (e) => {
  if (document.querySelector(".header")) {
    if (document.querySelector("html").scrollTop > 10) {
      document.querySelector(".header").classList.add("active");
    } else {
      document.querySelector(".header").classList.remove("active");
    }
  }
});
