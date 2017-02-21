function slider(div, imgs, flags){
  var zis = this;
  if(typeof div == "string") // Элемент
    zis.div = document.getElementById(div);
  else if(typeof div == "object")
    zis.div = div;
  else
    alert("Обшибка типа");
  zis.imgs = []; // Массив ссылок на фотки
  if(!imgs)
    zis.div.childNodes.forEach( function(elem) {
      if(elem.tagName == "IMG"){
        zis.imgs.push(elem.src);
        zis.div.removeChild(elem);
      }
    } );
  else
    zis.imgs = imgs;
  zis.n_cur = 0;
  zis.options = new slider_opts();
  if(typeof flags == "object")
    Object.assign(zis.options, flags);
  else{
    if(flags !== null) // Парсим строку с флагами
      while(flags !== ""){
        var c = pop_symbol(flags);
        flags = drop_symbol(flags);
        switch (c) {
          case 'd': // скрыть точки
            zis.options.hide_dots = true;
            break;
          case 'c': // скрыть управление
            zis.options.hide_ctl = true;
            break;
          case 'f': // Запретить палец
            zis.options.deny_finger = true;
            break;
          case 'w': // Установить ширину, например: w(200)
            zis.options.width = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'h': // Установить высоту, например: h(100)
            zis.options.height = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 't': // Таймер автослайда, например: t(15000)
            if(get_from_skobki(flags) == '0')
              zis.options.timer = false;
            else
              zis.options.timer = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'm': // Расстояние между точками, например: t(15)
              zis.options.m = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'r': // Радиус точек, например: t(15)
              zis.options.r = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'b': // Толщина границы точек, например: t(15)
              zis.options.br = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'l': // Лево
              zis.options.ctl_img.left = get_from_skobki(flags);
            flags = drop_skobki(flags);
            break;
          case 'p': // Право
              zis.options.ctl_img.right = get_from_skobki(flags);
            flags = drop_skobki(flags);
            break;
          case 'b': // Толщина границы точек, например: t(15)
              zis.options.br = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'a': // Таймер автохолда, например: a(20000)
            if(get_from_skobki(flags) == '0')
              zis.options.autohold = false;
            else
              zis.options.autohold = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          default:
            console.log("Флаги зафейлены");
        }
      }
  }
  zis.next = function() {
    if(zis.n_cur === zis.imgs.length - 1)
      zis.prev_to_beg();
    else {
      document.getElementById(zis.div.id + "_slider-" + zis.n_cur).style.marginLeft = '-' + zis.options.width + 'px';
      if(!zis.options.hide_dots)
        zis.dots[zis.n_cur].invert();
      document.getElementById(zis.div.id + "_slider-" + (++zis.n_cur))
      .style.marginLeft = '0px';
      if(!zis.options.hide_dots)
        zis.dots[zis.n_cur].invert();
    }
  };
  zis.prev = function() {
    if(zis.n_cur === 0)
      zis.next_to_end();
    else {
      document.getElementById(zis.div.id + "_slider-" + zis.n_cur)
      .style.marginLeft = zis.options.width + 'px';
      if(!zis.options.hide_dots)
        zis.dots[zis.n_cur].invert();
      document.getElementById(zis.div.id + "_slider-" + (--zis.n_cur))
      .style.marginLeft = '0px';
      if(!zis.options.hide_dots)
        zis.dots[zis.n_cur].invert();
    }
  };
  zis.next_to_end = function() {
    while(zis.n_cur != zis.imgs.length - 1)
      zis.next();
  };
  zis.prev_to_beg = function() {
    while(zis.n_cur !== 0)
      zis.prev();
  };
  zis.show = function() { // Метод для инициализации слайдера.
    var n = 0;
    zis.n_cur = 0;
    zis.div.style.width = zis.options.width + 'px';
    zis.div.style.height = zis.options.height + 'px';
    var str4ka = '\n';
    str4ka += '<div id = "' + zis.div.id + '_slider_holder" ' +
              'class = "slider_holder">\n';
    if(!zis.options.hide_ctl){
      str4ka += '<img id = "' + zis.div.id + 'slider_ctl_l"' +
                'class = "slider_ctl" src = "' + zis.options.ctl_img.left +
                '"><img id = "' + zis.div.id + 'slider_ctl_r"' +
                'class = "slider_ctl" src = "' + zis.options.ctl_img.right +
                '">';
    }
    //if(!zis.options.hide_dots)
      zis.dots = [];
    zis.imgs.forEach(function(elem) {
      str4ka += '\n<img id = "' + zis.div.id + '_slider-' +
                n + '" src = "' + elem + '" style = "';
      if(n === 0)
        str4ka += 'margin-top: 0px; margin-left: 0px;';
      else
        str4ka += 'margin-top: -' + zis.options.height + 'px; margin-left: ' +
                  zis.options.width + 'px;';
      str4ka += 'width: ' + zis.options.width + 'px; height: ' +
                zis.options.height + 'px;">';
      //if(!zis.options.hide_dots)
        zis.dots.push(new slider_dot(zis, n++, zis.options.br, zis.options.r));
    });
    str4ka += '\n</div>\n';
    zis.div.innerHTML = str4ka;
    zis.hldr = document.getElementById(zis.div.id + '_slider_holder');
    zis.hldr.style.width = zis.options.width + 'px';
    zis.hldr.style.height = zis.options.height + 'px';
    if(!zis.options.hide_ctl){
      zis.ctl = {};
      zis.ctl.l = document.getElementById(zis.div.id + "slider_ctl_l");
      zis.ctl.r = document.getElementById(zis.div.id + "slider_ctl_r");
      zis.ctl.r.onload = function() {
        zis.ctl.r.onclick = function () {
          zis.next();
          if(zis.options.timer && zis.options.autohold)
            zis.autohold();
        };
        //zis.ctl.r.ontouchstart = zis.ctl.r.onclick;
        zis.ctl.r.style.top = zis.options.height / 2 -
                               zis.ctl.r.offsetHeight / 2 + 'px';
        zis.ctl.r.style.left = zis.options.width - zis.ctl.r.offsetWidth -
                               15 + 'px';
      };
      zis.ctl.l.onload = function() {
        zis.ctl.l.onclick = function () {
          zis.prev();
          if(zis.options.timer && zis.options.autohold)
            zis.autohold();
        };
        //zis.ctl.l.ontouchstart = zis.ctl.l.onclick;
        zis.ctl.l.style.top = zis.options.height / 2 -
                               zis.ctl.l.offsetHeight / 2 + 'px';
        zis.ctl.l.style.left = 15 + 'px';
      };
    }

    if(!zis.options.hide_dots){
      zis.dots.forEach(function (elem) { elem.show(); });
      zis.dots[0].invert();
    }
    if(zis.options.timer){
      zis.stop_timer();
      zis.start_timer();
    }
    if(!zis.options.deny_finger)
      zis.touches.touches_addEvnts(zis.hldr);
    return zis;
  };
  zis.start_timer = function() {
    zis.timer_id = setInterval( function() { zis.next(); }, zis.options.timer );
  };
  zis.stop_timer = function() {
    clearInterval(zis.timer_id);
  };
  zis.autohold = function() {
    zis.stop_timer();
    clearTimeout(zis.timer_id2);
    zis.timer_id2 = setTimeout( function() { zis.start_timer(); },
                               zis.options.autohold );
  };
  if(!zis.options.hide_dots){
    zis.reload_dots = function(r, br, color, bcolor){
      zis.dots.forEach( function(elem) { elem.change(r, br, color, bcolor); });
    };
  }
  if(!zis.options.deny_finger){
    zis.touches = new touches();
    zis.touches.callback_start = function() {
      zis.autohold();
    };
    zis.touches.callback_stop = function() {
      var elem1, elem2, elem3;
      if((zis.touches.posX - zis.touches.posX2) < -100) {
        zis.next();
        if(zis.imgs.length > 2){
          if(zis.n_cur === 0)
            elem1 = document.getElementById(zis.div.id + "_slider-" +
                                            (zis.imgs.length - 2));
          else if(zis.n_cur === 1)
            elem1 = document.getElementById(zis.div.id + "_slider-" +
                                            (zis.imgs.length - 1));
          else
            elem1 = document.getElementById(zis.div.id + "_slider-" +
                                            (zis.n_cur - 2));
          elem1.style.transition = '';
        }
        elem3 = document.getElementById(zis.div.id + "_slider-" +
                                        zis.n_cur);

        if(zis.n_cur === 0)
          elem2 = document.getElementById(zis.div.id + "_slider-" +
                                          (zis.imgs.length - 1));
        else
          elem2 = document.getElementById(zis.div.id + "_slider-" +
                                          (zis.n_cur - 1));
        elem2.style.transition = '';
        elem3.style.transition = '';
      } else if((zis.touches.posX - zis.touches.posX2) > 100){
        zis.prev();
        if(zis.imgs.length > 2){
          if(zis.n_cur === (zis.imgs.length - 2))
            elem1 = document.getElementById(zis.div.id + "_slider-" + 0);
          else if(zis.n_cur === (zis.imgs.length - 1))
            elem1 = document.getElementById(zis.div.id + "_slider-" + 1);
          else
            elem1 = document.getElementById(zis.div.id + "_slider-" +
                                            (zis.n_cur + 2));
          elem1.style.transition = '';
        }

        if(zis.n_cur === (zis.imgs.length - 1))
          elem2 = document.getElementById(zis.div.id + "_slider-" + 0);
        else
          elem2 = document.getElementById(zis.div.id + "_slider-" +
                                          (zis.n_cur + 1));
        elem2.style.transition = '';

        elem3 = document.getElementById(zis.div.id + "_slider-" +
                                        zis.n_cur);
        elem3.style.transition = '';
      } else {
        zis.prev();
        zis.next();
        if(zis.imgs.length > 2){
          if(zis.n_cur === (zis.imgs.length - 2))
            elem1 = document.getElementById(zis.div.id + "_slider-" + 0);
          else if(zis.n_cur === (zis.imgs.length - 1))
            elem1 = document.getElementById(zis.div.id + "_slider-" + 1);
          else
            elem1 = document.getElementById(zis.div.id + "_slider-" +
                                            (zis.n_cur + 2));
          elem1.style.transition = '';
        }

        if(zis.n_cur === (zis.imgs.length - 1))
          elem2 = document.getElementById(zis.div.id + "_slider-" + 0);
        else
          elem2 = document.getElementById(zis.div.id + "_slider-" +
                                          (zis.n_cur + 1));
        elem2.style.transition = '';

        elem3 = document.getElementById(zis.div.id + "_slider-" +
                                        zis.n_cur);
        elem3.style.transition = '';
      }
    };
    zis.touches.callback_move = function() {
      var elem1, elem2, elem3;
      if(zis.imgs.length > 2){
        if(zis.n_cur === 0)
          elem1 = document.getElementById(zis.div.id + "_slider-" +
                                        (zis.imgs.length - 1));
        else
          elem1 = document.getElementById(zis.div.id + "_slider-" +
                                        (zis.n_cur - 1));
        elem1.style.transition = 'none';
        elem1.style.marginLeft =  - zis.options.width + zis.touches.posX -
                                  zis.touches.posX2 + 'px';
        if(zis.n_cur === (zis.imgs.length - 1))
          elem3 = document.getElementById(zis.div.id + "_slider-" +  0);
        else
          elem3 = document.getElementById(zis.div.id + "_slider-" +
                                        (zis.n_cur + 1));
        elem3.style.transition = 'none';
        elem3.style.marginLeft =  zis.options.width + zis.touches.posX -
                                  zis.touches.posX2 + 'px';
      }
      elem2 = document.getElementById(zis.div.id + "_slider-" + zis.n_cur);
      elem2.style.transition = 'none';
      elem2.style.marginLeft =  0 + zis.touches.posX - zis.touches.posX2 + 'px';
    };
  }
}

function slider_opts(){ // Конструктор опций для слайдера.
  // Здесь дефолтные значения:
  this.hide_dots = false;
  this.hide_ctl = false;
  this.deny_finger = false;
  this.timer = 5000;
  this.autohold = 10000;
  this.width = 300;
  this.height = 200;
  this.ctl_img = {
    left: 'img/left.png',
    right:'img/right.png'
  };
  this.m = 20;
}

function slider_dot(papa, id, br, r, color, bcolor) {
  if(!id && id !== 0){
    console.log("Потерялся id у точки");
  }else{
    var zis = this;
    zis.id = id;
    if(papa)
        zis.papa = papa;
    else
      console.log("У точки потерялся папа");
    zis.border_weight = br || 4;
    zis.radius = r || 7;
    zis.color = color || '#fff';
    zis.bcolor = bcolor || '#000';

    zis.show = function() {
      var batya;
      if(!(batya = document.getElementById(zis.papa.div.id + "_slider_dot_holder")))
       {batya = document.createElement("div");
       batya.id = zis.papa.div.id + "_slider_dot_holder";
       zis.papa.hldr.appendChild(batya);}
      var divka = document.createElement("div");
      divka.id = zis.papa.div.id + "_slider_dot_" + zis.id;
      divka.classList.add("slider_dot");
      divka.style.background = zis.color;
      divka.style.border = zis.border_weight + 'px solid ' + zis.bcolor;
      divka.style.borderRadius = zis.radius + zis.border_weight + 'px';
      divka.style.width = zis.radius * 2 + 'px';
      divka.style.height = zis.radius * 2 + 'px';
      divka.style.left = zis.position() + 'px';
      divka.style.top = zis.papa.options.height - 15 -
                        (zis.radius + zis.border_weight) * 2 + 'px';
      batya.appendChild(divka);
      // zis.papa.hldr.appendChild(divka);
      zis.div = divka;
      return zis;
    };
    zis.position = function() {
      return ( zis.papa.options.width / 2 -
               ( zis.papa.dots.length * (zis.radius + zis.border_weight) * 2 +
               (zis.papa.dots.length - 1) * zis.papa.options.m ) / 2 ) +
             (zis.id * ((zis.radius + zis.border_weight) * 2 + zis.papa.options.m));
    };
    zis.invert = function(non_r, non_c) {
      if(!non_r)
        zis.change(null, null, zis.bcolor, zis.color);
      if(!non_c)
        zis.change(zis.border_weight, zis.radius, null, null);
      if(non_r && non_c)
        console.log("Тут " + zis.id +
                    " хочет инвертироваться с обоими флагами");
    };
    zis.change = function(r, br, color, bcolor) {
      if(r){
        zis.radius = r;
        zis.div.style.borderRadius = zis.radius + zis.border_weight + 'px';
        zis.div.style.width = zis.radius * 2 + 'px';
        zis.div.style.height = zis.radius * 2 + 'px';
      }
      if(br){
        zis.border_weight = br;
        zis.div.style.borderWidth = zis.border_weight + 'px';
        zis.div.style.borderRadius = zis.radius + zis.border_weight + 'px';
      }
      if(color){
        zis.color = color;
        zis.div.style.background = zis.color;
      }
      if(bcolor){
        zis.bcolor = bcolor;
        zis.div.style.borderColor = bcolor;
      }
      zis.div.style.left = zis.position() + 'px';
      zis.div.style.top = zis.papa.options.height - 15 -
                        (zis.radius + zis.border_weight) * 2 + 'px';
    };
  }
}

function get_from_skobki(str4ka){
  var boolka = false;
  var result = '';
  while(pop_symbol(str4ka) !== ')'){
    if(pop_symbol(str4ka) === '('){
      boolka = true;
      str4ka = drop_symbol(str4ka);
    }
    if(boolka)
      result += pop_symbol(str4ka);
    str4ka = drop_symbol(str4ka);
  }
  return result;
}
function drop_skobki(str4ka){
  return (str4ka.slice(0, str4ka.indexOf('(')) +
          str4ka.slice(str4ka.indexOf(')') + 1));
}
function drop_symbol(str4ka){
  return str4ka.slice(1);
}
function pop_symbol(str4ka){
  return str4ka[0];
}
