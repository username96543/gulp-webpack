/*

  1. Может стоит переделать на data-event=""
  2. Сделать инициализацию асинхронно, чтобы вытащить из основного потока?

*/

const ClickSelector = (element, className) => {
  try {
    if (element.classList.contains(className)) {
      return element;
    } else {
      let el = element.closest("." + className)
        ? element.closest("." + className)
        : false;
      return el;
    }
  } catch (err) {}
};

export const documentClicks = () => {
  document.addEventListener("click", (e) => {
    // Все действия с этом блоке зависят от element
    let target = e.target,
      element = false;

    // Пример на все случаи
    // if (document.querySelector('.select')) {
    //   element = ClickSelector(target, 'select');
    //   if (element) {
    //     #code...
    //   } else {
    //     selectClose();
    //     document.querySelector('.selector').classList.remove('active');
    //   }
    // }
    console.log(1);

    if (document.querySelector(".header__menu")) {
      element = ClickSelector(target, "e_menu");
      if (element) {
        document.querySelector(".header__menu").classList.toggle("active");
      } else {
        document.querySelector(".header__menu").classList.remove("active");
      }
    }

    if (document.querySelector(".modal-menu")) {
      element = ClickSelector(target, "mobile-menu");
      if (element) {
        modalOpen("modal-menu");
      }
      element = ClickSelector(target, "modal-menu-close");
      if (element) {
        modalClose("modal-menu");
      }
      element = ClickSelector(target, "callback");
      if (element) {
        modalOpen("modal-callback");
      }
      element = ClickSelector(target, "callback-close");
      if (element) {
        modalClose("modal-callback");
      }
    }

    if (document.querySelector(".screen-2__item")) {
      element = ClickSelector(target, "screen-2__item-header");
      if (element) {
        element.classList.toggle("active");
        target
          .closest(".screen-2__item")
          .querySelector(".screen-2__item-body")
          .classList.toggle("active");
      }
    }
  });
};
