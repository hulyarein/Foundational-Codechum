let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

// Configuration parameters
let countItem = items.length;
let itemActive = 0;

// Handle click event on the "next" button
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider(); // Update the slider to reflect the active item
};

// Handle click event on the "prev" button
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider(); // Update the slider to reflect the active item
};

// Automatically move the slider to the next item every 5 seconds
let refreshInterval = setInterval(() => {
  next.click();
}, 5000);

// Update the slider display to reflect the currently active item
function showSlider() {
  // Remove the "active" class from the previously active slider item
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // Add the "active" class to the new active slider item and its corresponding thumbnail
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");

  // Adjust the position of the thumbnails if necessary
  setPositionThumbnail();

  // Restart the automatic slider timer
  clearInterval(refreshInterval); // Clear the existing interval
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}

// Adjust the position of the active thumbnail to ensure it's visible in the viewport
function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(".thumbnail .item.active");
  let rect = thumbnailActive.getBoundingClientRect();
  // If the active thumbnail is outside the viewport, scroll it into view
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}

// Add click event listeners to each thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});
