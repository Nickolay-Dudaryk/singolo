'use strict'

window.onload = function() {

    // Nav
    addNavClickHandler();
    // Tag
    addTagClickHandler();
    
}


//  add smooth scroll from navigation items to anchors
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener("click", function(event) {
      event.preventDefault();
      const blockID = anchor.getAttribute('href')
      document.querySelector('' + blockID).scrollIntoView({
          behavior: "smooth",
          block: "start"
      })
  })
};


//  add active class to navigation items
const addNavClickHandler = () => {
    document.querySelector('.navigation').addEventListener("click", (e) => {
        if(e.target.classList.contains('navigation__link')) {
            let clickedNav = e.target;
            removeSelectedNavs();
            selectClickedNav(clickedNav);
        }
    })
}

const removeSelectedNavs = () => {
    let navs = document.querySelectorAll('.navigation .navigation__link');
    navs.forEach(nav => {
        nav.classList.remove('active');
    })
}

const selectClickedNav = (clickedNav) => {
    clickedNav.classList.add('active');
}


//  add black screen to phones
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


//  add next slide in slider
let prevArrow = document.querySelector('.slider__previous-arrow'),
    nextArrow = document.querySelector('.slider__next-arrow'),
    newSlide = document.querySelector('.slider2');

function changeSlides(arrow, slide) {
    arrow.addEventListener('click', function () {
        if(slide.classList.contains('none')) {
            slide.classList.remove('none');
        } else slide.classList.add('none');
    });
}

changeSlides(prevArrow, newSlide);
changeSlides(nextArrow, newSlide);


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



// mix portfolio images 
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



// let submitBtn = document.querySelector('.contact-form__button'),
//     formWindow = document.querySelector('.modal-window'),
//     contentWindow = document.querySelector('.modal-window__content'),
//     okFormBtn = document.querySelector('.modal-window__submit-btn'),
//     formInputs = document.querySelectorAll('.quote__input'),
//     formTextarea = document.querySelector('.quote__textarea'),
//     nameHint = document.querySelector('.quote__name-hint'),
//     mailHint = document.querySelector('.quote__mail-hint'),
//     mailSecondHint = document.querySelector('.quote__mail-hint-second'),
//     subjectText = document.querySelector('.modal-window__subject'),
//     describeText = document.querySelector('.modal-window__describe');

// function cleanForm() {
//     formInputs[0].value = '';
//     formInputs[1].value = '';
//     formInputs[2].value = '';
//     formTextarea.value = '';
//     contentWindow.style.width = '350px';
//     contentWindow.style.height = '200px';
// }

// okFormBtn.addEventListener('click', function () {
// formWindow.classList.add('none');
// cleanForm();
// });

// window.addEventListener('click', function (event) {
// if (event.target === formWindow) {
//     formWindow.classList.add('none');
//     cleanForm();
// }
// });


// submitBtn.addEventListener('click', function (event) {
// event.preventDefault();

// if (formInputs[0].value === '') {
//     nameHint.classList.remove('none');
// }

// if (formInputs[1].value === '') {
//     mailHint.classList.remove('none');
// } else if (formInputs[1].value.search(/.+@.+\..+/i) === -1) {
//     mailSecondHint.classList.remove('none');
// }

// if (formInputs[0].value !== '' && formInputs[1].value.search(/.+@.+\..+/i) !== -1) {
//     if (formInputs[2].value === '') {
//         subjectText.textContent = 'Тема: Без темы'
//     } else subjectText.textContent = 'Тема: ' + formInputs[2].value;

//     if (formTextarea.value === '') {
//         describeText.textContent = 'Описание: Без описания'
//     } else describeText.textContent = 'Описание: ' + formTextarea.value;


//     if (formTextarea.value.length > 101 && formTextarea.value.length <= 401) {
//         contentWindow.style.width = '410px';
//         contentWindow.style.height = '300px';
//     }

//     if (formTextarea.value.length >= 402 && formTextarea.value.length < 601) {
//         contentWindow.style.width = '440px';
//         contentWindow.style.height = '370px';
//     }

//     if (formTextarea.value.length >= 601 && formTextarea.value.length <= 1000) {
//         contentWindow.style.width = '520px';
//         contentWindow.style.height = '450px';
//     }

//     formWindow.classList.remove('none');
// }
// });

// formInputs[0].addEventListener('click', function () {
// nameHint.classList.add('none');
// });

// formInputs[1].addEventListener('click', function () {
// mailHint.classList.add('none');
// mailSecondHint.classList.add('none');
// });