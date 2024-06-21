// Dichiarazione Variabili

let progetti = null;
let images = [];
const mainContent = document.getElementById('main-content');//importante, non rimuovere


//definizione funzioni
async function getJson(){
  const d = await fetch('/progetti.json');
  progetti = await d.json();
}

//change image on tap for mobile
function mobileVersion(){
  let index = 0;
  const totalImages = images.length - 1;
  function changeImage() {
    $(images[index]).fadeOut(1, function() {
      index = (index + 1) % totalImages;
      $(images[index]).fadeIn(1);
    });
  }
  $('.main-content').on('click', function() {
    changeImage();
  });
}

//Porta in cima l'ultima immagine cliccata
// questa funzione è da rivedere
function bringOn(){
  $('.draggable').draggable({
    start: function(event, ui) {
      var maxZIndex = 0;
      console.log('la funzione inizia')
      $('.draggable').each(function() {
        var zIndex = parseInt($(this).css('z-index'));
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
          console.log("cambiando indice")
          maxZIndex = zIndex;
          console.log(maxZIndex);
        }
      });
      $(this).css('z-index', maxZIndex + 1);
    }
  });
}


function fadeImage(img) {
  let opacity = 0;
  function updateOpacity() {
    opacity += 0.05;
    if (opacity >= 1) {
      opacity = 1;
    }
    img.style.opacity = opacity;
    if (opacity < 1) {
      requestAnimationFrame(updateOpacity);
    }
  }
  updateOpacity();
}


//add an image every time the user click on main content
function showImages(){
  let index = 1;
  const totalImages = images.length - 1;
  function appendImage() {
    if(index < totalImages){
      console.log(images[index]);
      images[index].style.zIndex = index;
      //images[index].style.opacity = 0;
      mainContent.appendChild(images[index]);
      //fadeImage(images[index]);
      index++;
    }
  }
  $('.main-content').on('click', function() {
    appendImage();
  });
}


//questa funzione gestisce tutta la parte delle immagini
async function generaImmagini(){
  await getJson();

  if(window.innerWidth < 1000){
    progetti.forEach(progetto => {
      //tutta questa parte può essere incapsulata in delle funzioni per rendere lo script più leggibile
      const img = document.createElement('img');
      img.src = progetto.copertina;
      img.alt = progetto.titolo;
      mainContent.appendChild(img);
      images.push(img);
    });
    mobileVersion();
  }else{
    let n = 0;
    progetti.forEach(progetto => {
      //tutta questa parte può essere incapsulata in delle funzioni per rendere lo script più leggibile
      const img = document.createElement('img');
      img.src = progetto.copertina;
      img.alt = progetto.titolo;
      img.classList.add('draggable');
      
      $(img).draggable({
        containment: 'parent'
      });
      img.style.top = 0;
      img.style.left = 0;
      img.width = mainContent.offsetWidth * 0.28;
      const randH = Math.floor(Math.random() * 100000 % (mainContent.offsetHeight - 2*img.width)) + 'px';
      const randW = Math.floor(Math.random() * (mainContent.offsetWidth - img.width - 100)) + 'px';
      img.style.position = 'absolute';
      img.style.top = randH;
      img.style.left = randW;
      images.push(img);
      if(n == 0){
        mainContent.appendChild(img);
        n=1;
      }
    });
    showImages();

  }
  console.log("fine lettura json e creazione immagini");
}

$(document).ready(function() {
  generaImmagini();
  bringOn();

});












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