const submenu_trigger = () => {
  if (document.querySelectorAll('.menu-sub-menu-trigger .menu-item-has-children')) {
    let menu_has_children = document.querySelectorAll('.menu-item-has-children');
    menu_has_children.forEach(element => {
      let div = document.createElement('div');
      div.classList.add('sub-menu-trigger');
      element.prepend(div);
      element.classList.add('menu-item-sub-menu-trigger');
      div.addEventListener('click', e => {
        e.currentTarget.closest('.menu-item-has-children').classList.toggle('active');
      });
    });
  }
}