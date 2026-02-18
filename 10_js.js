// 10_js.js
// DOM Manipulation - Filter + Add Article

document.addEventListener("DOMContentLoaded", () => {
  // Requirement wants menus to appear when buttons are clicked,
  // so start with both hidden.
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (filterForm) filterForm.style.display = "none";
  if (newForm) newForm.style.display = "none";

  // Apply initial filter state (all are checked by default)
  filterArticles();
});

// Show/hide Filter menu
function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // Hide the other form
  if (newForm) newForm.style.display = "none";

  // Toggle this one
  if (filterForm) {
    filterForm.style.display = (filterForm.style.display === "none" || filterForm.style.display === "")
      ? "block"
      : "none";
  }
}

// Show/hide Add New Article form
function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  // Hide the other form
  if (filterForm) filterForm.style.display = "none";

  // Toggle this one (CSS expects flex)
  if (newForm) {
    newForm.style.display = (newForm.style.display === "none" || newForm.style.display === "")
      ? "flex"
      : "none";
  }
}

// Filter articles based on checkboxes
function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox")?.checked ?? true;
  const showRecipe = document.getElementById("recipeCheckbox")?.checked ?? true;
  const showUpdate = document.getElementById("updateCheckbox")?.checked ?? true;

  const articles = document.querySelectorAll("#articleList article");

  articles.forEach(article => {
    const isOpinion = article.classList.contains("opinion");
    const isRecipe = article.classList.contains("recipe");
    const isUpdate = article.classList.contains("update");

    let shouldShow = true;

    if (isOpinion) shouldShow = showOpinion;
    if (isRecipe) shouldShow = showRecipe;
    if (isUpdate) shouldShow = showUpdate;

    article.style.display = shouldShow ? "" : "none";
  });
}

// Add a new article into the list with correct styles
function addNewArticle() {
  const titleEl = document.getElementById("inputHeader");
  const textEl = document.getElementById("inputArticle");

  const opinionRadio = document.getElementById("opinionRadio");
  const recipeRadio = document.getElementById("recipeRadio");
  const lifeRadio = document.getElementById("lifeRadio");

  const title = (titleEl?.value ?? "").trim();
  const text = (textEl?.value ?? "").trim();

  // Basic validation
  if (!title || !text) {
    alert("Please enter both a Title and Text.");
    return;
  }

  let typeClass = "";
  let typeLabel = "";

  if (opinionRadio?.checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (recipeRadio?.checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (lifeRadio?.checked) {
    // Life Update articles use the "update" class my HTML/CSS
    typeClass = "update";
    typeLabel = "Update";
  } else {
    alert("Please select an article type.");
    return;
  }

  const articleList = document.getElementById("articleList");
  if (!articleList) return;

  // Create next id like a11, a12, etc.
  const nextNum = articleList.querySelectorAll("article").length + 1;
  const newId = `a${nextNum}`;

  // Build the article to match the existing structure
  const article = document.createElement("article");
  article.className = typeClass;
  article.id = newId;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  pLink.appendChild(link);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  // Add it to the page
  articleList.appendChild(article);

  // Clear inputs for next entry
  titleEl.value = "";
  textEl.value = "";
  if (opinionRadio) opinionRadio.checked = false;
  if (recipeRadio) recipeRadio.checked = false;
  if (lifeRadio) lifeRadio.checked = false;

  // Keep filters respected after adding
  filterArticles();
}
