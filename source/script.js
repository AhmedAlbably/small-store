let shop = document.querySelector(".shop");

let cart = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((e) => {
      let { id, name, price, des, img } = e;
      let search = cart.find((e) => e.id === id) || [];
      return `
    <div class="item" id="product${id}">
      <img src="${img}" alt="">
      <div class="details">
        <h2>${name}</h2>
        <p>${des}</p>
        <div class="price-quantity">
          <h3>${price}</h3>
          <div class="buttons">
            <i class="fa-solid fa-circle-minus" onclick = "decrement(${id})"></i>
            <div class="quantity" id="${id}">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i class="fa-solid fa-circle-plus" onclick = "increment(${id})"></i>
          </div>
        </div>
      </div>
    </div>
    `;
    })
    .join(""));
};

generateShop();

// increment and decrement and update and sum
let increment = (id) => {
  let search = cart.find((e) => e.id === id);
  if (search === undefined) {
    cart.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
  let search = cart.find((e) => e.id === id);
  if (search?.item === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(id);
  cart = cart.filter((e) => e.item !== 0);
  localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((e) => e.id === id);
  document.getElementById(id).innerHTML = search.item;
  total();
};

let total = () => {
  let number = document.getElementById("number");
  number.innerHTML = cart.map((e) => e.item).reduce((acc, e) => acc + e, 0);
};

total();
