const photos = [
  {
    title: "Mountain Serenity",
    category: "nature",
    description: "A peaceful mountain landscape",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Urban Geometry",
    category: "architecture",
    description: "Modern city architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Coastal Escape",
    category: "travel",
    description: "A beautiful ocean destination",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Golden Horizons",
    category: "nature",
    description: "Warm evening light over nature",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "City Lines",
    category: "architecture",
    description: "The beauty of urban design",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Wander Often",
    category: "travel",
    description: "An unforgettable travel view",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Quiet Moments",
    category: "people",
    description: "A thoughtful everyday moment",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Forest Dreams",
    category: "nature",
    description: "A beautiful forest pathway",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Architectural Wonder",
    category: "architecture",
    description: "An elegant architectural structure",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Ocean Blue",
    category: "travel",
    description: "The calm of the open sea",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Human Stories",
    category: "people",
    description: "Portrait photography",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Into the Wild",
    category: "nature",
    description: "An inspiring natural landscape",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },
];

const galleryGrid = document.getElementById("galleryGrid");
const photoCount = document.getElementById("photoCount");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxCounter = document.getElementById("lightboxCounter");

let activeFilter = "all";
let visiblePhotos = [];
let currentIndex = 0;

function renderGallery() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  visiblePhotos = photos.filter((photo) => {
    const matchesCategory =
      activeFilter === "all" || photo.category === activeFilter;

    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm) ||
      photo.description.toLowerCase().includes(searchTerm) ||
      photo.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  galleryGrid.innerHTML = "";

  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `View ${photo.title}`);

    const imageContainer = document.createElement("div");
    imageContainer.className = "card-image";

    const img = document.createElement("img");
    img.src = photo.image;
    img.alt = photo.title;
    img.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = '<span class="view-button" aria-hidden="true">↗</span>';

    imageContainer.append(img, overlay);

    const info = document.createElement("div");
    info.className = "card-info";

    const details = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = photo.title;

    const description = document.createElement("p");
    description.textContent = photo.description;

    details.append(title, description);

    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");

    info.append(details, number);
    card.append(imageContainer, info);

    card.addEventListener("click", () => openLightbox(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });

  photoCount.textContent = `${visiblePhotos.length} photograph${visiblePhotos.length === 1 ? "" : "s"}`;

  emptyMessage.hidden = visiblePhotos.length !== 0;
}

// Category filtering
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");

    activeFilter = button.dataset.filter;
    renderGallery();
  });
});

// Search
searchInput.addEventListener("input", renderGallery);

// Open image preview
function openLightbox(index) {
  if (!visiblePhotos.length) return;

  currentIndex = index;
  updateLightbox();

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  document.getElementById("closeLightbox").focus();
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];

  lightboxImage.src = photo.image;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.description;
  lightboxCategory.textContent = photo.category;
  lightboxCounter.textContent = `${currentIndex + 1} / ${visiblePhotos.length}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNextImage() {
  if (!visiblePhotos.length) return;
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  updateLightbox();
}

function showPreviousImage() {
  if (!visiblePhotos.length) return;
  currentIndex =
    (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
}

document
  .getElementById("closeLightbox")
  .addEventListener("click", closeLightbox);

document.getElementById("nextImage").addEventListener("click", showNextImage);

document
  .getElementById("previousImage")
  .addEventListener("click", showPreviousImage);

// Close preview by clicking the dark background
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "ArrowLeft") showPreviousImage();
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Start the gallery
renderGallery();
