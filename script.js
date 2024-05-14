// Function to show content based on menu click
function showContent(content) {
  $('.slide-up-container').removeClass('show');
  $('#' + content + 'Container').addClass('show');
  if(content === 'projects' && window.innerWidth < 1000){
    $('.projectsMenu').attr('id', 'show');
    $('.project-data-container').removeClass('visible');
  }
}
//Questa funzione mostra il progetto selezionato 
function showProject(p){
  $('.project-data-container').removeClass('visible');
  $('#' + p + '-container').addClass('visible');
  if(window.innerWidth < 1000){
    $('.projectsMenu').attr('id', '');
    $('.project-data-container').removeClass('visible');
    $('#' + p + '-container').addClass('visible');
  }
}

// questa funzione é da rifare, una singola funzione non puó occuparsi di tutto
function generateImages() {
  const mainContent = document.getElementById('main-content');
  const contentWidth = mainContent.offsetWidth;
  const contentHeight = mainContent.offsetHeight;
  
  for (let i = 1; i <= 9; i++) {
    const img = document.createElement('img');
    const imageNumber = i.toString().padStart(2, '0');
    img.src = `images/FF_${imageNumber}.png`;
    img.alt = `Image ${i}`;
    img.classList.add('draggable');
    
    const randomTop = Math.floor(Math.random() * (contentHeight - 100)) + 'px'; // Adjusted for spacing
    const randomLeft = Math.floor(Math.random() * (contentWidth - 100)) + 'px'; // Adjusted for spacing
    
    img.style.position = 'absolute';
    img.style.top = randomTop;
    img.style.left = randomLeft;
    
    let highestZIndex = 1; // Initialize the highest z-index
    img.addEventListener('click', function() {
      // Increment the highest z-index and assign it to the clicked image
      highestZIndex++;
      img.style.zIndex = highestZIndex;
  
      // Lower the z-index of all other images
      document.querySelectorAll('.draggable').forEach(otherImg => {
          if (otherImg !== img) {
                otherImg.style.zIndex = otherImg.style.zIndex > 1 ? otherImg.style.zIndex - 1 : 1;
            }
        });
    });

    mainContent.appendChild(img);
    $(img).draggable({
        containment: 'parent'
    });
    }
}

// Riposizionamento immagini
//questa funzione riposiziona in modo casuale tutte le immagini all'interno del main content
const mainContent = document.getElementById('main-content');
const images =  document.querySelectorAll('.draggable');
$(document).ready(function(){
  const W = mainContent.offsetWidth;
  const H = mainContent.offsetHeight;
  images.forEach(image => {
    const randH = Math.floor(Math.random() * (H - image.height - 100)) + 'px';
    const randW = Math.floor(Math.random() * (W - image.width - 100)) + 'px';
    image.style.position = 'absolute';
    image.style.top = randH;
    image.style.left=  randW;
  })
})
// Re-initialize draggable functionality for new images
// Rende le immagini trascinabili all'interno del loro contenitore
$('.draggable').draggable({
  containment: 'parent'
});

$('.draggable').draggable({
  start: function(event, ui) {
    var maxZIndex = 0;
    $('.draggable').each(function() {
      var zIndex = parseInt($(this).css('z-index'));
      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
    $(this).css('z-index', maxZIndex + 1);
  }
});


  

// Call generateImages function when the document is ready
/*
jQuery(document).ready(function($) {
  generateImages();
});
*/



//A che serve questo
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', function() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
  });
});


//Funzione per slideshow delle immagini nella home
$(document).ready(function() {
  if(window.innerWidth < 1000){
    let currentIndex = 0;
    const images = $('.main-content img');
    const totalImages = images.length - 1;
    
    function changeImage() {
      // Fade out the current image
      $(images[currentIndex]).fadeOut(500, function() {
        // Increment the index. If it's the last image, reset to 0
        currentIndex = (currentIndex + 1) % totalImages; // Move to the next image, loop back to the first at the end
        // Ensure the next image (or first if we've looped around) is shown
        $(images[currentIndex]).fadeIn(500);
      });
    }
    // Change image on tap
    $('.main-content').on('click', function() {
      changeImage();
    });
  }
});
