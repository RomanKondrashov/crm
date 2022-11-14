'use strict';

const goods = [
    {
      "id": 1,
      "title": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "mobile-phone",
      "discont": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 2,
      "title": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "toys",
      "discont": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 3,
      "title": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "tv-box",
      "discont": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 4,
      "title": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "cables",
      "discont": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ]

const createRow = ({id, title, category, units, count, price}) => {
    const placeToInsert = document.querySelector('.goods__table .table__body');
    const numberRow = document.querySelectorAll('.goods__table .table__body tr').length + 1;
    placeToInsert.insertAdjacentHTML(
        'beforeend',
        `
          <tr  data-id="${id}">
                <td class="table__cell">${numberRow}</td>
                <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
                  <span class="table__cell-id">id: ${id}</span>
                  ${title}</td>
                <td class="table__cell table__cell_left">${category}</td>
                <td class="table__cell">${units}</td>
                <td class="table__cell">${count}</td>
                <td class="table__cell">${price}</td>
                <td class="table__cell">${price * count}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>
              </tr>
         `
    );
};


const renderGoods = (arr) => {
    arr.forEach(element => createRow(element));
}

const calculateCrmSum = (goods) => {
  const sum = goods.reduce((accumulator, currentValue) => {
    console.log(typeof currentValue.price);
    return accumulator + currentValue.price*currentValue.count;
    
  }, 0);
  return sum;
}


const btnAdd = document.querySelector('.panel__add-goods');
const formOverlay = document.querySelector('.overlay');
const formClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.overlay__modal');
const table = document.querySelector('.table__body');
const tableRowDel = document.querySelector('.table__btn_del');
const vendor_id = document.querySelector('.vendor-code__id');
const form = document.querySelector('.modal__form');
const cms__total_price = document.querySelector('.cms__total-price');


// form show-hide manipulations start

const toggleForm = () => {
  formOverlay.classList.toggle('active');
  vendor_id.textContent = Math.floor(Math.random() * 10000);
}

btnAdd.addEventListener('click', () => {
  toggleForm();
});

formClose.addEventListener('click', () => {
  toggleForm();
});

formOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === formOverlay){
    toggleForm();
  }
  
});

// form manipulations end

// remove row
table.addEventListener('click', e => {
  if (e.target.closest('.table__btn_del')){
    const elId = e.target.closest('tr').dataset.id;
    const indexToDelete = goods.findIndex(el => el.id == elId);
    goods.splice(indexToDelete , 1);
    console.log(goods);
    e.target.closest('tr').remove();
  }
});

// submit event
form.addEventListener('submit', e =>{
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const newRow = Object.fromEntries(formData);
  const objectToAdd = {
      "id": vendor_id.textContent,
      "title": newRow.name,
      "price": parseFloat(newRow.price),
      "description": newRow.description,
      "category": newRow.category,
      "discont": newRow.discount_count,
      "count": parseInt(newRow.count),
      "units": newRow.units,
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
  };
  createRow(objectToAdd);
  goods.push(objectToAdd);
  console.warn(goods);
  cms__total_price.textContent = `$ ${calculateCrmSum(goods)};`
  toggleForm();
});

// change discount
form.discount.addEventListener('change', e => {
  if (form.discount.checked){
    form.discount_count.disabled = false;
  }else{
    form.discount_count.value = '';
    form.discount_count.disabled = true;
  }
});

// generete sum in modal form
const generateSum = (price, count) => {
  if (price.value && count.value){
    form.total.value = `$ ${price.value*count.value}`;
  }
};

form.count.addEventListener('change', e => {
  generateSum(form.price, form.count);
});
form.price.addEventListener('change', e => {
  generateSum(form.price, form.count);
});

renderGoods(goods);