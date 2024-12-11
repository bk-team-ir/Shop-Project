import supabase from "/database/database.js";

const lastProducts = document.getElementById("last--products");
let { data: products, error } = await supabase
  .from("products")
  .select("*")
  .order("id", { ascending: false })
  .limit(4);
if (products) {
  products.forEach((product) => {
    const box = `
      <div class="box">
        <img
          src="${product.image}"
          alt="${product.name}"
        />
        <div class="off" style="${
          product.off == 0 ? "display: none;" : ""
        }"><p>${product.off != 0 ? `${product.off}%` : ""}</p></div>
        <h4>${product.name}</h4>
        <p>${
          product.off != 0
            ? `<del>${product.price}</del> ${
                product.price * ((100 - product.off) / 100)
              }`
            : product.price
        } تومان</p>
        <button>افزودن به سبدخرید</button>
      </div>
    `;
    lastProducts.innerHTML += box;
  });
} else {
  console.error(error);
}

const lastOff = document.getElementById("off--box");
let { data: lastProduct } = await supabase
  .from("products")
  .select("*")
  .order("off", { ascending: false })
  .limit(1);
lastProduct.forEach((product) => {
  const box = `
    <div class="box">
      <img
        src="${product.image}"
        alt="${product.name}"
      />
      <h3>${product.name}</h3>
      <p>${
        product.off != 0
          ? `<del>${product.price}</del> ${
              product.price * ((100 - product.off) / 100)
            }`
          : product.price
      } تومان</p>
      <button>افزودن به سبدخرید</button>
    </div>
  `;
  lastOff.innerHTML += box;
});

const lastBlogs = document.getElementById("last--blogs");
let { data: blogs } = await supabase
  .from("blogs")
  .select("*")
  .order("id", { ascending: false })
  .limit(3);
blogs.forEach((blog) => {
  const box = `
    <div class="box">
      <img
        src="${blog.image}"
        alt="${blog.title}"
      />
      <h4>${blog.title}</h4>
      <p>${blog.created_at}</p>
    </div>
  `;
  lastBlogs.innerHTML += box
});
