document.addEventListener('DOMContentLoaded', function() {
  var slideUpLinks = document.querySelectorAll('.slide-up-link');

  slideUpLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      sessionStorage.setItem('slideUpRequested', 'true');
      window.location.href = link.href;
    });
  });

  // Check if slide-up effect was requested on the destination page
  var slideUpRequested = sessionStorage.getItem('slideUpRequested');
  if (slideUpRequested === 'true') {
    var aboutContainer = document.getElementById('about');
    if (aboutContainer) {
      aboutContainer.classList.add('show');
      sessionStorage.removeItem('slideUpRequested'); // Clear the flag
    }
  }
});
