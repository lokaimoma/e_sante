
// just a temporary file for the moment , can be deleted at any moment

// Get references to the DOM elements
const carousel = document.querySelector('.carousel')
const carouselInner = carousel.querySelector('.carousel-inner')
const carouselItems = carousel.querySelectorAll('.carousel-item')
const prevBtn = carousel.querySelector('.carousel-control-prev')
const nextBtn = carousel.querySelector('.carousel-control-next')

// Define variables to keep track of the current index and the total number of items
let currentItemIndex = 0
const totalItems = carouselItems.length

// Add event listeners to the control buttons to advance the carousel
prevBtn.addEventListener('click', handlePrevClick)
nextBtn.addEventListener('click', handleNextClick)

function handlePrevClick() {
  // Move to the previous item
  currentItemIndex--
  if (currentItemIndex < 0) {
    currentItemIndex = totalItems - 1
  }
  updateCarousel()
}

function handleNextClick() {
  // Move to the next item
  currentItemIndex++
  if (currentItemIndex >= totalItems) {
    currentItemIndex = 0
  }
  updateCarousel()
}

function updateCarousel() {
  // Update the active item and slide to it
  carouselItems.forEach((item, index) => {
    if (index === currentItemIndex) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
  carouselInner.style.transform = `translateX(-${currentItemIndex * 100}%)`
}

// Initialize the carousel
updateCarousel()