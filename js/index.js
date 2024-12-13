import supabase from "/database/database.js";

let cart = {};

function loadCart() {
  const savedCart = localStorage.getItem("products");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    cartBox();
  }
}

async function loadProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .limit(4);

  if (products) {
    const lastProducts = document.getElementById("last--products");
    products.forEach((product) => {
      const box = `
                <div class="box">
                    <img src="${product.image}" alt="${product.name}" />
                    <div class="off" style="${
                      product.off == 0 ? "display: none;" : ""
                    }">
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
    button.onclick = (e) => {
      const productId = e.target.dataset.id;
      cart[productId] = (cart[productId] || 0) + 1;
      localStorage.setItem("products", JSON.stringify(cart));
      updateCartCount();
      cartBox();
    };
  });
}

function updateCartCount() {
  const totalQuantity = Object.values(cart).reduce(
    (acc, count) => acc + count,
    0
  );
  document.getElementById("cart").innerHTML = `${totalQuantity} محصول`;
}

async function cartBox() {
  const ul = document.getElementById("cart--products");
  ul.innerHTML = "";
  const productIds = Object.keys(cart);

  if (productIds.length === 0) return;

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  let totalQuantity = 0;
  let totalPrice = 0;

  products.forEach((product) => {
    const count = cart[product.id];
    const productPrice =
      product.off !== 0
        ? product.price * ((100 - product.off) / 100)
        : product.price;

    totalQuantity += count;
    totalPrice += productPrice * count;

    const li = `
            <li>
                <img src="${product.image}" alt="${product.name}" />
                <h6>${product.name}</h6>
                <p>${
                  product.off !== 0
                    ? `<del>${product.price}</del> ${productPrice}`
                    : productPrice
                } تومان</p>
                <span>${count} عدد</span>
            </li>
        `;
    ul.innerHTML += li;
  });

  const priceElement = document.querySelector("#cart--box .box p");
  priceElement.innerHTML = `${totalPrice.toLocaleString()} تومان`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  loadProducts();
  loadLastOffProducts();
  loadBlogs();
});

async function loadLastOffProducts() {
  const lastOff = document.getElementById("off--box");
  const { data: lastProduct } = await supabase
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
  const { data: blogs } = await supabase
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
                    <p>${blog.text}</p>
                </div>
            `;
      lastBlogs.innerHTML += box;
    });
  }
}

const clear = document.getElementById("clear--cart");
clear.addEventListener("click", () => {
  localStorage.removeItem("products");
  document.getElementById("cart").innerHTML = `0 محصول`;
  document.getElementById("cart--products").innerHTML = "";
  cart = {};
  document.querySelector("#cart--box .box p").innerHTML = "";
});

const login = document.getElementById("login");
login.addEventListener("click", () => {
  location.href = "/login.html";
});
