import supabase from "/database/database.js";

const items = document.getElementById("items");
let { data: shopProducts, err } = await supabase
  .from("products")
  .select("*")
  .order("id", { ascending: false });
if (shopProducts) {
  shopProducts.forEach((product) => {
    const box = `
      <div class="box">
        <img
          src="${product.image}"
          alt="${product.name}"
        />
        <div class="off" style="${
          product.off == 0 ? "display: none;" : ""
        }"><p>${product.off != 0 ? `${product.off}%` : ""}</p></div>
        <p>${product.name}</p>
        <h3>${
          product.off != 0
            ? `<del>${product.price}</del> ${
                product.price * ((100 - product.off) / 100)
              }`
            : product.price
        } تومان</h3>
        <button onClick="location.href = '/productDetails.html?id=${product.id}'">توضیحات</button>
      </div>
    `;
    items.innerHTML += box;
  });
}
