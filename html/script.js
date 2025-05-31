// Toggle Menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("show");
});

// Overlay
overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("show");
});

// Menutup Jika Ukuran Layar Berubah
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});

// Toggle Home dan Shopping Cart
const path = window.location.pathname;
const desktopNavAction = document.getElementById("desktopNavAction");
const mobileNavAction = document.getElementById("mobileNavAction");

if (desktopNavAction) {
  desktopNavAction.innerHTML = path.includes("penjualan.html")
    ? '<a href="./index.html"><i data-feather="home"></i></a>'
    : '<a href="./penjualan.html"><i data-feather="shopping-cart"></i></a>';
}

if (mobileNavAction) {
  mobileNavAction.innerHTML = path.includes("penjualan.html")
    ? '<a href="./index.html"><i data-feather="home"></i></a>'
    : '<a href="./penjualan.html"><i data-feather="shopping-cart"></i></a>';
}

//Prev and Next Button di Highlight Menu
const highlightContainer = document.getElementById("highlightContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let groupIndex = 0;
const groupCount = highlightContainer.children.length;

nextBtn.addEventListener("click", () => {
  groupIndex = (groupIndex + 1) % groupCount;
  scrollToGroup(groupIndex);
});

prevBtn.addEventListener("click", () => {
  groupIndex = (groupIndex - 1 + groupCount) % groupCount;
  scrollToGroup(groupIndex);
});

function scrollToGroup(index) {
  const groupWidth = highlightContainer.children[0].offsetWidth;
  highlightContainer.scrollTo({
    left: groupWidth * index,
    behavior: "smooth",
  });
}

// Feather Icon
feather.replace();
