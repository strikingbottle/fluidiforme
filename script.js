// Function to show content based on menu click
function showContent(content) {
  $('.slide-up-container').removeClass('show');
  $('#' + content + 'Container').addClass('show');
  if(content === 'projects'){
    $('.project-data-container').removeClass('visible');
    $('#' + 'default-project').addClass('visible');
    if(window.innerWidth < 1000){
      $('.project-data-container').removeClass('visible');
      $('.projectsMenu').attr('id', 'show');
    }
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

//Riposizionamento immagini
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
    let index = 0;
    const images = $('.main-content img');
    const totalImages = images.length - 1;
    
    function changeImage() {
      // Fade out the current image
      $(images[index]).fadeOut(1, function() {
        // Increment the index. If it's the last image, reset to 0
        index = (index + 1) % totalImages; // Move to the next image, loop back to the first at the end
        // Ensure the next image (or first if we've looped around) is shown
        $(images[index]).fadeIn(1);
      });
    }
    // Change image on tap
    $('.main-content').on('click', function() {
      changeImage();
    });
  }
});