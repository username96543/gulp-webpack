
function screen_1Resize_1() {

  let
    screen = document.querySelector('.screen_1'),
    background = document.querySelector('.background_1'),

    const_width = 1600,
    const_height = 889,
    const_coefficient = const_width / const_height,
    current_width = window.innerWidth,
    current_height = window.innerHeight,
    current_coefficient = current_width / current_height;

  //console.log(current_coefficient + ' против ' + const_coefficient);
  if (current_coefficient == const_coefficient) {
    //console.log('убираем всё, блок сам встанет как надо')
  } else {
    if (current_coefficient < const_coefficient) {
      //console.log('Текущей высоты окна мало. Увеличиваем высоту по размеру окна, центрируем по ширине');
      let a = current_height / const_height;
      background.style.width = a * const_width + 'px';

      let left_size = (current_width - background.offsetWidth) / 2;
      background.style.left = left_size + 'px';
      background.style.top = '';
    } else {
      //console.log('Текущей высоты окна много. Убираем высоту, центрируем по высоте')
      background.style.width = '';

      let top_size = (current_height - background.offsetHeight) / 2;
      background.style.top = top_size + 'px';
      background.style.left = '';
    }
  }
}