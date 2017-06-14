'use strict';

window.addEventListener('load', slideshowInit);

/**
  * Slideshow initialization
  */
function slideshowInit(){
  numberSlides();
  augmentSlides();
  // augmentExternalSlides();
  // need to revisit iframe functionality later
  window.addEventListener('keydown', keyHandler);
}

/**
  * Adds an "id" attribute to each slide containing the slide number.
  * This enables hash / fragment navigation (http://foo.com/#12).
  */
function numberSlides(){
  let slides = document.querySelectorAll(".slideshow > li");
  window.sessionStorage.slideCount = slides.length;
  for(let i=0; i<slides.length; i++){
    slides[i].id = `${i + 1}`;
  }
}

/**
  * Adds a "slide" css style to each slide
  */
function augmentSlides(){
  let showNotes = ( window.localStorage.getItem('showNotes') === 'true' );
  if(!showNotes){
    showNotes = false;
    window.localStorage.setItem('showNotes', showNotes);
  }

  let slides = document.querySelectorAll(".slideshow > li");
  for(let i=0; i<slides.length; i++){
    slides[i].classList.add("slide");
    if(showNotes && slides[i].querySelectorAll("aside").length > 0){
      slides[i].classList.toggle("slide-with-notes");
    }
  }
}

/**
  * Adds slideshow-specific styling to external slides.
  */
function augmentExternalSlides(){
  let cssLink = document.createElement("link");
  cssLink.href = "../../bower_components/talk-o-vision/talk-o-vision.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let slides = document.querySelectorAll(".slideshow li iframe");
  for(let i=0; i<slides.length; i++){
    slides[i].contentDocument.head.appendChild(cssLink);
  }
}

/**
  * Enables keyboard shortcuts
  * For example: next, previous, fullscreen
  */
function keyHandler(e){
  switch(e.which){
    case 33: // pgup
    case 37: // left
      e.preventDefault();
      previousSlide()
      break;

    case 32: // spacebar
    case 34: // pgdn
    case 39: // right
      e.preventDefault();
      nextSlide()
      break;

    case 70: // f
      e.preventDefault();
      fullscreen();
      break;

    case 78: // n
      //toggle showNotes
      let showNotes = ( window.localStorage.getItem('showNotes') === 'true' );
      window.localStorage.setItem('showNotes', !showNotes);
      augmentSlides();
      break;
  }
}

/**
  * Advances slideshow to next slide
  */
function nextSlide(){
  let current = window.location.hash.replace("#", "") * 1;
  let next = current + 1;
  if(next >= window.sessionStorage.slideCount){
    next = window.sessionStorage.slideCount;
  }
  window.location.hash = next;
}

/**
  * Moves slideshow to previous slide
  */
function previousSlide(){
  let current = window.location.hash.replace("#", "") * 1;
  let previous = current - 1;
  if(previous <= 1){
    previous = 1;
  }
  window.location.hash = previous;
}

/**
  * Enables fullscreen
  */
function fullscreen(){
  let html = document.querySelector("html");
  let requestFullscreen = html.requestFullscreen ||
                          html.requestFullScreen ||
                          html.webkitRequestFullscreen ||
                          html.mozRequestFullScreen ||
                          html.msRequestFullscreen;

  if (requestFullscreen) {
    requestFullscreen.apply(html);
  }
}
