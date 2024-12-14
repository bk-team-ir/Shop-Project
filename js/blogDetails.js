import supabase from "/database/database.js"

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

async function loadBlogDetails() {
  let { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blogId)
    .single();

  if (blog) {
    document.title = blog.title
    const box = `
      <div class="title">
        <h1>${blog.title}</h1>
      </div>
      <img src="${blog.image}" alt="${blog.title}" />
      <p>${blog.text}</p>
    `;
    document.getElementById("blog").innerHTML = box
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadBlogDetails();
});
