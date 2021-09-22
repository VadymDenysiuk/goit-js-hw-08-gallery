const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery')
const lightboxRef = document.querySelector('.js-lightbox')
const lightboxImageRef = lightboxRef.querySelector('.lightbox__image')
const galleryMarkup = createGalleryMarkup(galleryItems)
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup)

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link" onclick="return false"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
</a>
</li>
`
  }).join('')
}
galleryRef.addEventListener('click', onGalleryRefClick)

function onGalleryRefClick(e) {
  const imageEl = e.target;
  const isImageEl = e.target.classList.contains('gallery__image')
  if (!isImageEl) { return }
  addOpenClassOnlightbox()
  lightboxImageRef.src = imageEl.dataset.source;
}

function addOpenClassOnlightbox() {
lightboxRef.classList.add('is-open')
}

/* close modal function */

function removeClassFromLightbox() {
  lightboxRef.classList.remove('is-open')
  lightboxImageRef.src = ''
}

/* close modal with click on close modal btn */

const closeModalBtnRef = document.querySelector('.lightbox__button')
closeModalBtnRef.addEventListener('click', onCloseModalBtn)

function onCloseModalBtn() {
  removeClassFromLightbox()
}


/* close modal with click on lightbox overlay */

const lightboxOverlay = document.querySelector('.lightbox__overlay')
lightboxOverlay.addEventListener('click', onLightboxOverlay)

function onLightboxOverlay() {
  removeClassFromLightbox()
}

/* close modal and switch images with press on btns */

document.addEventListener('keydown', onBtnsPress)

const srcArray = []
galleryItems.forEach(item => srcArray.push(item.original))

function onBtnsPress(e) {
  const currentIndex = srcArray.indexOf(lightboxImageRef.src)
  if (e.key === 'Escape') {
    removeClassFromLightbox()
  } else if (e.key === 'ArrowLeft') {
    leftClick(currentIndex)
  }
  else if (e.key === 'ArrowRight') {
    rightClick(currentIndex)
  }
}

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = srcArray.length - 1;
  }
  lightboxImageRef.src = srcArray[nextIndex]
}
function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === srcArray.length) {
    nextIndex = 0;
  }
  lightboxImageRef.src = srcArray[nextIndex]
}

/* switch images with click on image */
lightboxImageRef.addEventListener('click', onlightboxImageRef) 

function onlightboxImageRef() {
  const currentIndex = srcArray.indexOf(lightboxImageRef.src)
   let nextIndex = currentIndex + 1;
  if (nextIndex === srcArray.length) {
    nextIndex = 0;
  }
  lightboxImageRef.src = srcArray[nextIndex]
}
