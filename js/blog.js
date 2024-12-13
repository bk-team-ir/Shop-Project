import supabase from "/database/database.js";

const blogsBox = document.getElementById("blogs--box");
async function loadBlogs() {
  let { data: blogs } = await supabase.from("blogs").select("*");
  blogs.forEach((blog) => {
    const box = `
    <div class="box">
        <img
          src="${blog.image}"
          alt="${blog.title}"
        />
        <h1>${blog.title}</h1>
        <p>${blog.text}</p>
      </div>
    `;
    blogsBox.innerHTML += box;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadBlogs();
});
