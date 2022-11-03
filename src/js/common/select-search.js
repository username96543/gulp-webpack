const selectClose = () => {
  document.querySelectorAll('.select').forEach(element => {
    element.classList.remove('active');
  });
}

const selectList = (e) => {
  let element = e.target;
  let select = element.classList.contains('select') ? element : element.closest('.select');
  if (!select.classList.contains('active')) {
    select.classList.add('active');
  } else {
    if (element.tagName == 'li' || element.closest('li')) {
      select.querySelector('input').value = element.innerText;
    }
    if (!select.querySelector('input:focus')) {
      select.classList.remove('active');
    }
  }
}

const selectSearch = (e) => {
  let find = e.target.value.toLowerCase();
  let list = e.target.closest('.select').querySelectorAll('.select-list li')
  let arr_list = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].innerText.toLowerCase().indexOf(find) === 0) {
      list[i].classList.remove('hidden');
    } else {
      list[i].classList.add('hidden');
    }
  }
}

if (document.querySelector('.select')) {
  document.querySelectorAll('.select').forEach(element => {
    element.addEventListener('click', selectList);
    element.querySelector('.select-input').addEventListener('keyup', selectSearch);
    element.querySelector('.select-input').addEventListener('change', selectSearch);
  });
}