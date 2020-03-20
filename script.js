'use strict'

window.onload = function() {
    addTagClickHandler(); 
}

// add scroll from navigation items to anchors && add active class to navigation items
document.addEventListener('scroll', onScroll);

function onScroll() {
   const curPos = window.scrollY + 450;
   const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
   const sections = document.querySelectorAll('.main>section');      
   const links = document.querySelectorAll('.header__navigation a');

   sections.forEach((el) => {
     if(el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos || curPos > (scrollHeight - screen.height)) {
         links.forEach((a) => {
             a.classList.remove('active');
             if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                 a.classList.add('active');   
             }
         })
     }
 })
}



//  add black screen on phones
let iphoneVerticalScreen = document.querySelector('.slider__iphone-vertical'),
    iphoneBlackVertical = document.querySelector('.black-vertical'),
    iphoneHorizontalScreen = document.querySelector('.slider__iphone-horizontal'),
    iphoneBlackHorizontal = document.querySelector('.black-horizontal');

function toggleScreen(screen, blackScreen) {
	screen.addEventListener('click', function () {
		if(blackScreen.classList.contains('hidden')) {
			blackScreen.classList.remove('hidden');
		} else blackScreen.classList.add('hidden');
	});
}

toggleScreen(iphoneVerticalScreen, iphoneBlackVertical);
toggleScreen(iphoneHorizontalScreen, iphoneBlackHorizontal);


//  add change slides function
 let items = [document.querySelector('.slider1'), document.querySelector('.slider2')];
 let currentItem = 0;
 let isEnabled = true;

 function changeCurrentItem(n) {
   currentItem = (n + items.length) % items.length;
 }

 function hideItem(direction) {
   isEnabled = false;
   items[currentItem].classList.add(direction);
   items[currentItem].addEventListener('animationend', function() {
     this.classList.remove('show', direction);
   });
 }
 
 function showItem(direction) {
   items[currentItem].classList.add('next', direction);
   items[currentItem].addEventListener('animationend', function() {
     this.classList.remove(direction, 'next');
     this.classList.add('show');
     isEnabled = true;
   });
 }

 function previousItem(n) {
   hideItem('to-right');
   changeCurrentItem(n - 1);
   showItem('from-left');
 }

 function nextItem(n) {
   hideItem('to-left');
   changeCurrentItem(n + 1);
   showItem('from-right');
 }
 
 document.querySelector('.slider__previous-arrow').addEventListener('click', function() {
   if(isEnabled) {
     previousItem(currentItem);
   }
 });
 
 document.querySelector('.slider__next-arrow').addEventListener('click', function() {
   if(isEnabled) {
     nextItem(currentItem);
   } 
 });



//  add active class to portfolio tags
const addTagClickHandler = () => {
    document.querySelector('.portfolio__tags').addEventListener("click", (e) => {
        if(e.target.classList.contains('tag')) {
            let clickedTag = e.target;
            removeSelectedTags();
            selectClickedTag(clickedTag);
        }
    })
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.portfolio__tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag-active');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('tag-active');
}



//  mix portfolio images 
let image = document.querySelectorAll('.portfolio__items .image');
let listOfImages = document.querySelector('.portfolio__items'),
    images = document.querySelectorAll('.portfolio__items > li'),
    tagAll = document.getElementById('tag-all'),
    tagWeb = document.getElementById('tag-web'),
    tagDesign = document.getElementById('tag-design'),
    tagArtwork = document.getElementById('tag-art');

const mixImages = (event) => {
    if (!event.target.classList.contains('tag-active')) {
        for (let i = images.length; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            listOfImages.insertBefore(images[randomIndex], images[i]);
        }
    }
}

tagAll.addEventListener('click', mixImages);
tagWeb.addEventListener('click', mixImages);
tagDesign.addEventListener('click', mixImages);
tagArtwork.addEventListener('click', mixImages);




// Image border
for (let i = 0; i < image.length; i++) {

    image[i].addEventListener('click', function (event) {
        image.forEach(function (item) {
            if (event.target !== item) {
                item.classList.remove('bordered');
            }
        });


        if (event.target.classList.contains('bordered')) {
            event.target.classList.remove('bordered');
        }
        event.target.classList.add('bordered');
    });
}



//  Modal window
const button = document.querySelector(".contact-form__button");
const modal = document.querySelector(".modal");
const modalMessage = document.querySelector(".modal__message");

//  Add Close button to modal window
function addCloseButton(node){
  node.innerHTML += "<button class='modal__close-button' type='button'>OK</button>";
  const modalCloseButton = document.querySelector(".modal__close-button");
  modalCloseButton.addEventListener("click", hideModal);
  return node;
}

//  Get value from form field
function addNodeValue (node, fieldName, defaultValue = "Не заполнено", br) {
  let value = document.querySelector(node).value;
  value = (value == "") ? defaultValue : value;
  return `<p>${fieldName}: ${value}</p>`;
}

//  Show modal window
function showModal () {
  modal.classList.remove("hidden");
}

//  Hide modal window
function hideModal () {
  modal.classList.add("hidden");
}

//  Create content of modal window
button.addEventListener("click", (event) => {
  let requiredFields = [...document.querySelectorAll("[required]")];
  let isValid = node => node.checkValidity();

  //  Check is valid
  if ( requiredFields.every(isValid) ) {
    event.preventDefault();
    let message = "<p>The letter was sent</p>";

    message += addNodeValue("input[name='subject']", "Subject", "Without subject");
    message += addNodeValue("textarea[name='user-message']", "Description", "Without description");
    modalMessage.innerHTML = message;
    addCloseButton(modalMessage);
    showModal();
  }
});