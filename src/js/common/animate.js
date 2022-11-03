function $(selector) {
  return document.querySelector(selector);
}
function log(string) {
  if (true) console.log('Анимация: "' + string + '"');
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

let selector = document.querySelectorAll(".selector");
screen_1__items.forEach((element) => {
  element.addEventListener("mouseover", function () {
    document.querySelector(".selector").classList.add("hover");
  });
  element.addEventListener("mouseout", function () {
    document.querySelector(".selector").classList.remove("hover");
  });
});

export async function animation() {
  //log('animation start');
  //log('Загрузка');
  await wait(500);
  $(".wrapper").style.opacity = "";
  await wait(2000);
  //log('Появление');
  $(".selector").classList.add("animate");
}
