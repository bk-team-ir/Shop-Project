import supabase from "/database/database.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function loadBlogDetails() {
  let { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (product) {
    document.title = product.title;
    const box = `
      <div class="box">
          <img
            src="${product.image}"
            alt="${product.name}"
          />
          <div class="info">
            <h1>${product.name}</h1>
            <p>${product.text}</p>
          </div>
          <div class="prices">
            <div class="price">
              <p>قیمت:</p>
              <p>${
                product.off !== 0 ? `<del>${product.price}</del> ${(product.price * (100 - product.off)) / 100}`: product.price} تومان</p>
            </div>
            <button>افزودن به سبدخرید</button>
          </div>
        </div>
    `;
    document.getElementById("product").innerHTML = box;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadBlogDetails();
});
