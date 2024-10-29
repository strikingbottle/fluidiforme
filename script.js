// Dichiarazione Variabili

let progetti = null;
let homeImages = null;
let images = [];
const mainContent = document.getElementById('main-content');//importante, non rimuovere
let home_element_count = 0;
let mobile_image_flag = 0;
let desktop_image_creation_flag = 0;

//definizione funzioni

/* funzione per ambiente di test */
async function getJson(){
  const d = await fetch('/progetti.json');
  const d1 = await d.json();
  progetti = await d1.projects;
  homeImages = await d1.homeImages;
}

// async function getJson(){
//   const d = await fetch('https://www.fluidiforme.eu/sito-wp/progetti.json');
//   const d1 = await d.json();
//   progetti = await d1.projects;
//   homeImages = await d1.homeImages;
// }

//change image on tap for mobile
function mobileVersion(){
  let index = 0;
  const totalImages = images.length;
  function changeImage() {
    $(images[index]).fadeOut(1, function() {
      index = (index + 1) % totalImages;
      $(images[index]).fadeIn(1);
    });
  }
  $('.main-content').on('click', function() {
    changeImage();
    updateFooters();
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

function getMaxZ() {
  let maxIndex= 0;
  images.forEach(image => {
    if(image.style.zIndex != NaN && image.style.zIndex > maxIndex)
      maxIndex = parseInt(image.style.zIndex) + 1;
  })
  return maxIndex;
}



//add an image every time the user click on main content
function showImages(){//da rivedere
  let index = 1;
  const totalImages = images.length;
  function appendImage() {
    if(index < totalImages){
      images[index].style.zIndex = parseInt(getMaxZ()) + 1;
      mainContent.appendChild(images[index]);
      index++;
    }else{
      index = 0;
      desktop_image_creation_flag = 1;
    }
  }
  function displayImage(){
    if(index < totalImages){
      images[index].style.zIndex = parseInt(getMaxZ()) + 1;
      images[index].style.display = '';
      index++;
    }else{
      index = 0;
      desktop_image_creation_flag = 1;
    }
  }
  $('.main-content').on('click', function() {
    if (desktop_image_creation_flag == 0){
      appendImage();
    } else {
      displayImage();
    }
    bringOn();
    updateFooters();
  });
}




function addselected(element){
  document.querySelectorAll('.projectsMenu a').forEach(link =>{
    link.classList.remove('selected');
  })
  element.classList.add('selected');
}

function removeLinkSelected() {
  document.querySelectorAll('.projectsMenu a').forEach(link =>{
    link.classList.remove('selected');
  })
}

function rimuoviSpazi(str) {
  // Utilizza un'espressione regolare per sostituire tutti gli spazi con una stringa vuota
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

function createProjectMenu(){
  progetti.forEach(progetto => {
    const link = document.createElement('a');
    link.classList.add(rimuoviSpazi(progetto.titolo))
    if(!progetto.isLocked){
      link.onclick = function (){
        const classeProgetto = rimuoviSpazi(progetto.titolo);
        showProject(classeProgetto);
        addselected(this);
      };
    }
    link.textContent = progetto.titolo;
    const descr = document.createElement('p');
    descr.textContent = progetto.descrizione;
    link.appendChild(descr);
    const projectMenu = document.querySelector('.projectsMenu');
    projectMenu.append(link);
  })
}

//rimuove immagini e video dal container
function removeMediaFromMainContent() {
  var mainContent = document.getElementById("main-content");
  var mediaElements = mainContent.querySelectorAll('img, video');
   mediaElements.forEach(function(element) {
      element.style.display = 'none';
  });
}

//Aggiorna il contenuto dei footer
function updateFooters(){
  const p1 = document.querySelector('.footer p:first-of-type');
  const p2 = document.querySelector('.footer p:nth-of-type(2)');
  if (home_element_count < homeImages.length){
    if(window.innerWidth > 999){
      p2.innerHTML = homeImages[home_element_count].name;
      //p2.innerHTML = homeImages[home_element_count].name;
    }
    const temp = (home_element_count+1) % (homeImages.length+1)
    home_element_count = ((temp == 0) ? 1 : temp);
    p1.innerHTML = home_element_count + '/' + homeImages.length;    
  }else{
    if(window.innerWidth > 999){
        removeMediaFromMainContent();
        home_element_count = 0;
    } else{
      home_element_count = 1;
    }
    p1.innerHTML = home_element_count + '/' + homeImages.length;
  }
}

//Mostra il contenuto(Home/About/Project) in base alla selezione effettuata
function showContent(content) {
  document.getElementById("edit-nav-style").innerHTML = `
    @media (min-width: 1000px) {
      nav {
        border-radius: 15px;
        overflow: hidden;
        background-color: #0000d4;
        padding: 2px;
        margin: 10px;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 2;
        font-size: 20px;
      }
      nav a {
        color: #fff;
        text-decoration: none;
        padding: 10px 20px 7px;
        display: inline-block;
        border-radius: 10px;
      }
      nav a:hover {
        background-color: #fff;
        color: #0000d4;
      }
    }
  `;
  removeLinkSelected();
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

//Mostra il progetto selezionato 
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

function generaHomeImg(parametro){
  const img = document.createElement('img');
  img.src = parametro.path;
  img.alt = parametro.name;
  img.classList.add('draggable');
  $(img).draggable({
    containment: "parent"
  });
  img.style.top = 0;
  img.style.left = 0;
  let tempwidth = mainContent.offsetWidth * 0.37 * Math.random();
  img.width = (tempwidth > mainContent.offsetWidth/4) ? tempwidth : mainContent.offsetWidth * 0.3;
  const randH = Math.floor(Math.random() * 100000 % (mainContent.offsetHeight - 2*img.width)) + 'px';
  const randW = Math.floor(Math.random() * (mainContent.offsetWidth - img.width - 100)) + 'px';
  img.style.position = 'absolute';
  img.style.top = randH;
  img.style.left = randW;
  return img;
} 

function generaHomeVideo(parametro){
  const video = document.createElement('video');
  if(mobile_image_flag == 0){
    video.style.display = 'block';
    mobile_image_flag = 1;
  }
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.controls = false;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  if(window.innerWidth > 999){
    video.height = mainContent.offsetHeight * 0.3;
    video.classList.add('draggable');
    $(video).draggable({
      containment : "parent"
    })
    video.style.position = 'absolute';
    video.style.top = Math.floor(Math.random() * 100000 % (mainContent.offsetHeight - 2*video.height)) + 'px';
    video.style.left = Math.floor(Math.random() * (mainContent.offsetWidth - video.height - 100)) + 'px';
  }
  const source = document.createElement('source');
  source.type = "video/mp4";
  source.src = parametro.path;
  video.appendChild(source);
  return video;
}


//Gestisce il contenuto della homepage inserendo le immagini ecc
async function HomePageContent(){
  await getJson();
  if(window.innerWidth < 1000){
    homeImages.forEach(homeElement => {
    if(homeElement.format === "mp4") {
       const vid = generaHomeVideo(homeElement);
      mainContent.appendChild(vid);
      images.push(vid);
    } else {
      const img = generaHomeImg(homeElement)
      mainContent.appendChild(img);
      images.push(img);
    }
    });
    mobileVersion();
  }else{
    let n = 0;
    let video;
    homeImages.forEach(homeElement => {
      let html_home_image;
      if (homeElement.format === "mp4"){
        video = generaHomeVideo(homeElement);
        images.push(video);
      } else {
        html_home_image = generaHomeImg(homeElement);
        images.push(html_home_image);
      }

      if(n == 0){
        if(homeElement.format === "mp4"){
          mainContent.append(video);
        }else {
        mainContent.appendChild(html_home_image);
        }
        n=1;
      }
    });
    showImages();
  }
  createProjectMenu();
  const footer = document.createElement('div');
  footer.classList.add('footer');
  const rAngle = document.createElement('p');
  const lAngle = document.createElement('p');
  if(window.innerWidth > 999){
    rAngle.style.position = 'absolute';
    rAngle.style.bottom = '40px';
    rAngle.style.right = '10px';
    rAngle.style.zIndex = 10000;
    lAngle.style.position = 'absolute';
    lAngle.style.bottom = '40px';
    lAngle.style.left = '10px';
    lAngle.style.zIndex = 10000;
  }else{
    lAngle.style.position = 'absolute';
    lAngle.style.right = '10px';
    lAngle.style.zIndex = 10000;
    lAngle.style.fontSize = '2.5rem';
  }
  
  rAngle.textContent = homeImages[home_element_count].name;
  home_element_count++;
  lAngle.innerHTML = home_element_count + '/' + ((window.innerWidth < 1000) ? homeImages.length : homeImages.length);
  footer.append(lAngle,rAngle);
  mainContent.append(footer);

  //console.log("fine lettura json e creazione immagini");
}

//Genera il contenuto dei progetti(si occupa di prelevare le immagini e costruire gli elementi all'interno dei progetti)
async function popolaProgetti(){
  await getJson();
  const rightColumn = document.querySelector('.right-column');
  const defaultProject = document.querySelector('#default-project');
  progetti.forEach(progetto => {
    const defaultImage = document.createElement('img');
    defaultImage.src = progetto.copertina;
    defaultImage.alt = progetto.titolo;
    if(!progetto.isLocked){
      defaultImage.onclick = function() {
        const classeProgetto = rimuoviSpazi(progetto.titolo);
        showProject(classeProgetto);
        addselected(document.querySelector('.'+ rimuoviSpazi(progetto.titolo)));
      }
    }
    defaultProject.append(defaultImage);
     
  })
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
        const status = document.createElement('p');
        const program = document.createElement('p');
        const info = document.createElement('p');

        client.innerHTML = '<b>Client: </b>' + progetto.cliente;
        status.innerHTML = '<b>Status: </b>' + progetto.status;
        program.innerHTML = '<b>Program: </b>' + progetto.program;
        info.innerHTML = '<b>Info: </b>' + progetto.info;

        genericInfo.append(client,status,program,info);
        const pt = document.createElement('p');
        const testo = document.createElement('p');
        pt.innerHTML = '<b>Project Team: </b>' + progetto.team;
        testo.textContent = progetto.testo;
        if (progetto.consultants != null){
          const cons = document.createElement('p');
          cons.innerHTML = '<b>Consultants: </b>' + progetto.consultants;
          projectText.append(pt,cons,testo);
        } else {
          projectText.append(pt,testo);
        }
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

//questa funzione viene richiamata al click su "progetti"
async function showProjectPage(p){
  if (document.querySelectorAll('.project-data-container').length == 1){
    await popolaProgetti();
  }
  showContent(p);
}

$(document).ready(function() {
  HomePageContent();
});