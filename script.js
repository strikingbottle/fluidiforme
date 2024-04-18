  // Function to show content based on menu click
  function showContent(content) {
    $('.slide-up-container').removeClass('show');
    $('#' + content + 'Container').addClass('show');
  }

  function showProject(p){
    $('.project-data-container').removeClass('visible');
    $('#' + p + 'Container').addClass('visible');
  }
  function generateImages() {
    const mainContent = document.getElementById('main-content');
    for (let i = 1; i <= 9; i++) {
      const img = document.createElement('img');
      const imageNumber = i.toString().padStart(2, '0');
      img.src = `images/FF_${imageNumber}.png`;
      img.alt = `Image ${i}`;
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