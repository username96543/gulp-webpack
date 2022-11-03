// Проверка поддержки webp и добавление классов webp/no-webp
export function isWebp() {
  // Проверка поддержки webp
  function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    }
    webP.src = "noimage";
  }
  // Добавление класса _webp или _no-webp
  testWebp(function (support) {
    let className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className);
  });
}