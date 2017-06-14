window.addEventListener('touchstart', gestureStart);
window.addEventListener('touchmove', gestureMove);
window.addEventListener('touchend', gestureEnd);




// src: https://github.com/paulrouget/dzslides/blob/master/template.html
// Dz.setupTouchEvents = function() {
//   var orgX, newX;
//   var tracking = false;
//   var db = document.body;
//   db.addEventListener("touchstart", start.bind(this), false);
//   db.addEventListener("touchmove", move.bind(this), false);
//   function start(aEvent) {
//     aEvent.preventDefault();
//     tracking = true;
//     orgX = aEvent.changedTouches[0].pageX;
//   }
//   function move(aEvent) {
//     if (!tracking) return;
//     newX = aEvent.changedTouches[0].pageX;
//     if (orgX - newX > 100) {
//       tracking = false;
//       this.forward();
//     } else {
//       if (orgX - newX < -100) {
//         tracking = false;
//         this.back();
//       }
//     }
//   }
// }





/**
  * Handles start of a swipe on a touch-enabled device
  * Adapted from https://patrickhlauke.github.io/touch/swipe/
  */
function gestureStart(e) {
  if (e.touches.length > 1) {
    window.sessionStorage.tracking = false;
    return;
  } else {
    window.sessionStorage.tracking = true;
    window.sessionStorage.thresholdTime = 500;
    window.sessionStorage.thresholdDistance = 100;

    /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
    window.sessionStorage.startTime = new Date().getTime();
    window.sessionStorage.startX = e.targetTouches[0].clientX;
    window.sessionStorage.startY = e.targetTouches[0].clientY;
  }
};

/**
  * Handles middle of a swipe on a touch-enabled device
  * Adapted from https://patrickhlauke.github.io/touch/swipe/
  */
function gestureMove(e) {
  if (window.sessionStorage.tracking) {
    e.preventDefault();
    window.sessionStorage.endX = e.targetTouches[0].clientX;
    window.sessionStorage.endY = e.targetTouches[0].clientY;
  }
}

/**
  * Handles end of a swipe on a touch-enabled device
  * Adapted from https://patrickhlauke.github.io/touch/swipe/
  */
function gestureEnd(e) {
  window.sessionStorage.tracking = false;
  let now = new Date().getTime();
  let deltaTime = now - window.sessionStorage.startTime;
  let deltaX = window.sessionStorage.endX - window.sessionStorage.startX;
  let deltaY = window.sessionStorage.endY - window.sessionStorage.startY;
  /* work out what the movement was */
  if (deltaTime > window.sessionStorage.thresholdTime) {
    /* gesture too slow */
    return;
  } else {
    if ((deltaX > window.sessionStorage.thresholdDistance) &&
        (Math.abs(deltaY) < window.sessionStorage.thresholdDistance)) {
      // swipe right
      previousSlide();
    } else if ((-deltaX > window.sessionStorage.thresholdDistance) &&
               (Math.abs(deltaY) < window.sessionStorage.thresholdDistance)) {
      // swipe left
      nextSlide();
    }
  }
}
