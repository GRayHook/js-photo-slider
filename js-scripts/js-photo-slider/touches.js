function touches() {
  var zis = this;
  zis.posX = 0;
  zis.posX2 = 0;
  zis.posY = 0;
  zis.posY2 = 0;
  zis.posOn = false;
  zis.callback_start = function() {};
  zis.callback_move = function() {};
  zis.callback_stop = function() {};
  zis.touches_positionHandler = function(e) {
    if ((e.clientX)&&(e.clientY)) {
      zis.posX = e.clientX;
      zis.posY = e.clientY;
    } else if (e.targetTouches) {
      zis.posX = e.targetTouches[0].clientX;
      zis.posY = e.targetTouches[0].clientY;
    }
    if(zis.posOn){
      zis.callback_move();
    }
    e.preventDefault();
  };
  zis.touches_initPosition = function(e) {
    if ((e.clientX)&&(e.clientY)) {
      zis.posX2 = e.clientX;
      zis.posY2 = e.clientY;
    } else if (e.targetTouches) {
      zis.posX2 = e.targetTouches[0].clientX;
      zis.posY2 = e.targetTouches[0].clientY;
    }
    zis.posOn = true;
    zis.callback_start();
    e.preventDefault();
  };
  zis.touches_stopPosition = function(e) {
    zis.posOn = false;
    zis.callback_stop();
  };
  zis.touches_addEvnts = function(divka){
    divka.addEventListener('touchmove', zis.touches_positionHandler, false);
    divka.addEventListener('touchstart', zis.touches_initPosition, false);
    divka.addEventListener('touchend', zis.touches_stopPosition, false);
  };
}
