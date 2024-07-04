// Dichiarazione Variabili

let progetti = null;
let images = [];
const mainContent = document.getElementById('main-content');//importante, non rimuovere


//definizione funzioni

/* funzione per ambiente di test */
async function getJson(){
  const d = await fetch('/progetti.json');
  progetti = await d.json();
}

/* async function getJson(){
  const d = await fetch('https://www.fluidiforme.eu/sito-wp/progetti.json');
  progetti = await d.json();
} */

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
      $('.draggable').each(function() {
        var zIndex = parseInt($(this).css('z-index'));
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
          maxZIndex = zIndex;
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
} //questa funzione non è usata

function getMaxZ() {
  let maxIndex= 0;
  images.forEach(image => {
    if(image.style.zIndex != NaN && image.style.zIndex > maxIndex)
      maxIndex = parseInt(image.style.zIndex) + 1;
  })
  console.log('ActualMax', maxIndex)
  return maxIndex;
}

//add an image every time the user click on main content
function showImages(){
  let index = 1;
  const totalImages = images.length - 1;
  function appendImage() {
    if(index < totalImages){
      
      images[index].style.zIndex = parseInt(getMaxZ()) + 1;
      //images[index].style.opacity = 0;
      mainContent.appendChild(images[index]);
      //fadeImage(images[index]);
      index++;
    }
  }
  $('.main-content').on('click', function() {
    appendImage();
    bringOn();
  });
}

function setImagesDimensions(img, progetto){
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
      setImagesDimensions(img,progetto);
      images.push(img);
      if(n == 0){
        mainContent.appendChild(img);
        n=1;
      }
    });
    showImages();
  }
  popolaProgetti();
  //console.log("fine lettura json e creazione immagini");
}

$(document).ready(function() {
  generaImmagini();
});

function popolaProgetti(){
  const rightColumn = document.querySelector('.right-column');
  progetti.forEach(progetto => {
    const projectDataContainer = document.createElement('div');
    projectDataContainer.classList.add("project-data-container");
    projectDataContainer.id = rimuoviSpazi(progetto.titolo);
    const projectText = document.createElement('div');
    projectText.classList.add('project-text');
    const genericInfo = document.createElement('div');
    genericInfo.classList.add('generic-info');
    genericInfo.style.display = 'grid';
    genericInfo.style.gridTemplateColumns = '1fr 1fr';
    let count = 0;
    progetto.immagini.forEach(immagine => {
      if(count === 1){//qui viene generato il testo
        const t = document.createElement('h1');
        t.textContent = progetto.titolo;
        projectText.appendChild(t);
        projectText.appendChild(genericInfo);
        const client = document.createElement('p');
        client.innerHTML = '<b>Client: </b>' + progetto.cliente;
        genericInfo.appendChild(client);
        const status = document.createElement('p');
        status.innerHTML = '<b>Status: </b>' + progetto.status;
        genericInfo.appendChild(status);
        const program = document.createElement('p');
        program.innerHTML = '<b>Proigram: </b>' + progetto.program;
        genericInfo.appendChild(program);
        const info = document.createElement('p');
        info.innerHTML = '<b>Info: </b>' + progetto.info;
        genericInfo.appendChild(info);
        const pt = document.createElement('p');
        pt.innerHTML = '<b>Project Team: </b>' + progetto.team;
        //projectText.appendChild(pt);
        const testo = document.createElement('p');
        testo.textContent = progetto.testo;
        //projectText.appendChild(testo);
        projectText.append(pt,testo);
        projectDataContainer.appendChild(projectText);
      }
      const img = document.createElement('img');
      img.src = immagine;
      img.alt = progetto.titolo + count;
      projectDataContainer.append(img);
      count++;
    })
    rightColumn.appendChild(projectDataContainer);
  })
}







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
  document.querySelectorAll('.project-data-container').forEach( container => {
    container.scrollTop = 0;
  })
  $('#' + p).addClass('visible');
  if(window.innerWidth < 1000){
    $('.projectsMenu').attr('id', '');
    $('.project-data-container').removeClass('visible');
    $('#' + p).addClass('visible');
  }
}

function rimuoviSpazi(str) {
  // Utilizza un'espressione regolare per sostituire tutti gli spazi con una stringa vuota
  return str.replace(/[^a-zA-Z0-9]/g, '');
}