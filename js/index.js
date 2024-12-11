import supabase from "/database/database.js";

let cart = {};
const lastProducts = document.getElementById("last--products");
const ul = document.getElementById("cart--products");

async function loadProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .limit(4);

  if (products) {
    products.forEach((product) => {
      const box = `
        <div class="box">
          <img src="${product.image}" alt="${product.name}" />
          <div class="off" style="${product.off == 0 ? "display: none;" : ""}">
            <p>${product.off !== 0 ? `${product.off}%` : ""}</p>
          </div>
          <h4>${product.name}</h4>
          <p>${
            product.off !== 0
              ? `<del>${product.price}</del> ${
                  product.price * ((100 - product.off) / 100)
                }`
              : product.price
          } تومان</p>
          <button class="product--btn" data-id="${
            product.id
          }">افزودن به سبد خرید</button>
        </div>
      `;
      lastProducts.innerHTML += box;
    });

    setupEventListeners();
  } else {
    console.error(error);
  }
}

function setupEventListeners() {
  const buttons = document.querySelectorAll(".product--btn");
  buttons.forEach((button) => {
    button.removeEventListener("click", button.clickHandler);
  });

  buttons.forEach((button) => {
    button.clickHandler = (e) => {
      const productId = e.target.dataset.id;
      if (cart[productId]) {
        cart[productId] += 1;
      } else {
        cart[productId] = 1;
      }
      localStorage.setItem("products", JSON.stringify(cart));
      document.getElementById("cart").innerHTML = `${
        Object.keys(cart).length
      } محصول`;
      cartBox();
    };

    button.addEventListener("click", button.clickHandler);
  });
}

async function cartBox() {
  const ul = document.getElementById("cart--products");
  ul.innerHTML = "";

  const productIds = Object.keys(cart);
  if (productIds.length === 0) {
    return;
  }

  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  products.forEach((product) => {
    const count = cart[product.id];
    const li = `
        <li>
          <img src="${product.image}" alt="${product.name}" >
          <h6>${product.name}</h6>
          <p>${product.price} تومان</p>
          <span>${count} عدد</span>
        </li>
      `;
    ul.innerHTML += li;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadLastOffProducts();
  loadBlogs();
});

async function loadLastOffProducts() {
  const lastOff = document.getElementById("off--box");
  let { data: lastProduct } = await supabase
    .from("products")
    .select("*")
    .order("off", { ascending: false })
    .limit(1);

  if (lastProduct) {
    lastProduct.forEach((product) => {
      const box = `
        <div class="box">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${
            product.off !== 0
              ? `<del>${product.price}</del> ${
                  product.price * ((100 - product.off) / 100)
                }`
              : product.price
          } تومان</p>
          <button class="product--btn" data-id="${
            product.id
          }">افزودن به سبد خرید</button>
        </div>
      `;
      lastOff.innerHTML += box;
    });
    setupEventListeners();
  }
}

async function loadBlogs() {
  const lastBlogs = document.getElementById("last--blogs");
  let { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (blogs) {
    blogs.forEach((blog) => {
      const box = `
        <div class="box">
          <img src="${blog.image}" alt="${blog.title}" />
          <h4>${blog.title}</h4>
          <p>${blog.created_at}</p>
        </div>
      `;
      lastBlogs.innerHTML += box;
    });
  }
}

const clear = document.getElementById("clear--cart");

clear.addEventListener("click", () => {
  localStorage.clear();
  document.getElementById(`cart`).innerHTML = `0 محصول`;
   ul.innerHTML = ""
});
