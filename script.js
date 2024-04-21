// Function to show content based on menu click
function showContent(content) {
  $('.slide-up-container').removeClass('show');
  $('#' + content + 'Container').addClass('show');
  if(content === 'projects' && window.innerWidth < 1000){
    $('.projectsMenu').attr('id', 'show');
    $('.project-data-container').removeClass('visible');
  }
}

function showProject(p){
  $('.project-data-container').removeClass('visible');
  $('#' + p + 'Container').addClass('visible');
  if(window.innerWidth < 1000){
    $('.projectsMenu').attr('id', '');
    $('.project-data-container').removeClass('visible');
    $('#' + p + 'Container').addClass('visible');
  }
}
function generateImages() {
  const mainContent = document.getElementById('main-content');
  //main-content è un div presente in tutti i container, forse bisogna cambiare la selezione o avere main-content con classi/id diverse, tanto lo stile del contenitore viene dato su slide-up-container e content
  for (let i = 1; i <= 9; i++) {
    const img = document.createElement('img');
    const imageNumber = i.toString().padStart(2, '0');
    img.src = `images/FF_${imageNumber}.png`;
    img.alt = `Image ${i}`;
    if(window.innerWidth >= 1000){
      img.classList.add('draggable');
      const randomTop = Math.floor(Math.random() * 500) + 'px';
      const randomLeft = Math.floor(Math.random() * 500) + 'px';
      img.style.position = 'absolute';
      img.style.top = randomTop;
      img.style.left = randomLeft;
      // Remove any styling that might alter the image's original format
      // For example, do not set img.style.width or img.style.height here
      mainContent.appendChild(img);
  
      // Make the newly added image draggable
      $(img).draggable({
        containment: 'parent'
      });
    }else{
      mainContent.classList.add('animate');
      img.classList.add('slideshow');
      mainContent.appendChild(img);
    }

  }
}
// Re-initialize draggable functionality for new images    // Re-initialize draggable functionality for new images
$('.draggable').draggable({
  containment: 'parent'
});
  

// Call generateImages function when the document is ready
jQuery(document).ready(function($) {
    generateImages();
});

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

$(document).ready(function() {
  let currentIndex = 0;
  const images = $('.main-content img');
  const totalImages = images.length - 1;
  console.log(totalImages);
  function changeImage() {
    // Fade out the current image
    $(images[currentIndex]).fadeOut(500, function() {
      // Increment the index. If it's the last image, reset to 0
      currentIndex = (currentIndex + 1) % totalImages; // Move to the next image, loop back to the first at the end
      // Ensure the next image (or first if we've looped around) is shown
      $(images[currentIndex]).fadeIn(500);
    });
  }
  // Change image every 3 seconds
  setInterval(changeImage, 3000);
  
});