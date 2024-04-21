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