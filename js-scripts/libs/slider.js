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
    nodeForEach.call(zis.div.childNodes, function(elem) {
      if(elem.tagName == "IMG"){
        zis.imgs.push(elem.src);
        //zis.div.removeChild(elem);
      } else if(elem.tagName == "DIV") {
        zis.imgs.push(elem);
      }
    } );
  else
    zis.imgs = imgs;
  zis.n_cur = 0;

  zis.options = new slider_opts();
  if (typeof flags == "object")
    Object.assign(zis.options, flags);
  else {
    if(flags !== null) // Парсим строку с флагами
      while(flags !== ""){
        var c = pop_symbol(flags);
        flags = drop_symbol(flags);
        switch (c) {
          case 'd': // Показать точки
            zis.options.dots = true;
            break;
          case 'c': // Показать управление
            zis.options.controls = true;
            break;
          case 'f': // Запретить палец
            zis.options.touches = true;
            break;
          case 'z': // Вместить в размер
            zis.options.zoom = true;
            break;
          case 'w': // Установить ширину, например: w(200)
            if (get_from_skobki(flags) == "a")
              zis.options.width = "auto";
            else
              zis.options.width = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'h': // Установить высоту, например: h(100)
            if (get_from_skobki(flags) == "a")
              zis.options.height = "auto";
            else
              zis.options.height = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 't': // Таймер автослайда, например: t(15000)
            if(get_from_skobki(flags) == '0')
              zis.options.timerAutoSlide = false;
            else
              zis.options.timerAutoSlide = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'm': // Расстояние между точками, например: t(15)
              zis.options.dotsMargin = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'r': // Радиус точек, например: t(15)
              zis.options.dotsRadius = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'b': // Толщина границы точек, например: t(15)
              zis.options.dotsBorder = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'l': // Лево
              zis.options.controlsImages.left = get_from_skobki(flags);
            flags = drop_skobki(flags);
            break;
          case 'p': // Право
              zis.options.controlsImages.right = get_from_skobki(flags);
            flags = drop_skobki(flags);
            break;
          case 'b': // Толщина границы точек, например: t(15)
              zis.options.dotsBorder = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          case 'a': // Таймер автохолда, например: a(20000)
            if(get_from_skobki(flags) == '0')
              zis.options.delayAfterAction = false;
            else
              zis.options.delayAfterAction = get_from_skobki(flags) * 1;
            flags = drop_skobki(flags);
            break;
          default:
            console.log("Флаги зафейлены");
        }
      }
  }

  if (zis.options.timerMap !== null)
    zis.options.timerAutoSlide = zis.options.timerMap.even;

  if (zis.options.width == "auto")
    zis.options.width = max_width_height_of_dochkas(zis.div)[0];
  if (zis.options.height == "auto")
    zis.options.height = max_width_height_of_dochkas(zis.div)[1];

  zis.goto = function(n) {
    var i = n - zis.n_cur;
    if (n < zis.imgs.length && 0 <= n && i !== 0){
      var funct;
      zis.stop_timer();
      zis.start_timer();
      if (i > 0)
        funct = zis.next;
      else {
        funct = zis.prev;
        i = -i;
      }
      for (;i > 0; i--){
        funct();
        // i--;
        console.log(i);
      }

    } else
      console.log("Error: slider.goto");
  };
  zis.next = function() {
    if(zis.n_cur === zis.imgs.length - 1){
      // zis.prev_to_beg();
      zis.visibles([], 'hide', true);
      zis.visibles([zis.n_cur, 0], 'show');
      document.getElementById(zis.div.id + "_slider-" + zis.n_cur)
      .style.marginLeft = zis.hldr.style.width;
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
      document.getElementById(zis.div.id + "_slider-" + 0)
      .style.marginLeft = '0px';
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
    } else {
      zis.visibles([1], 'hide', true);
      zis.visibles([zis.n_cur, zis.n_cur + 1, zis.n_cur + 2], 'show');
      var elem = document.getElementById(zis.div.id + "_slider-" + zis.n_cur);
      // elem.style.transition = '';
      elem.style.marginLeft = '-' + zis.hldr.style.width;
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
      elem = document.getElementById(zis.div.id + "_slider-" + (++zis.n_cur));
      // elem.style.transition = '';
      elem.style.marginLeft = '0px';
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
    }
  };
  zis.prev = function() {
    if(zis.n_cur === 0){
      zis.next_to_end();
    } else {
      zis.visibles([], 'hide', true);
      zis.visibles([zis.n_cur, zis.n_cur - 1], 'show');
      document.getElementById(zis.div.id + "_slider-" + zis.n_cur)
      .style.marginLeft = zis.hldr.style.width;
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
      document.getElementById(zis.div.id + "_slider-" + (--zis.n_cur))
      .style.marginLeft = '0px';
      if(zis.options.dots)
        zis.dots[zis.n_cur].invert();
      // zis.onSlideChanged(zis.n_cur);
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

  zis.visibles = function(arr_of_nums, act, boolka_invert) {
    // Меняет значение display на 'none' если act = 'hide', и на 'visible',
    // если act = 'show'.
    // boolka_invert - если true, то метод обрабатывает все картинки, кроме
    // указанных, в противном случае - только указанные
    // TODO: А теперь ебани это так, чтобы оставить видимыми только некоторые
    // фоты
    var len = zis.imgs.length;
    if (boolka_invert) {
      var new_arr = [];
      for (var k = 0; k < len; k++) {
        if (arr_of_nums.indexOf(k) == -1) {
          new_arr.push(k);
        }
      }
      arr_of_nums = new_arr;
    }
    for (var i = 0; i < len; i++) {
      if (arr_of_nums[i] < len) {
        console.log(arr_of_nums[i]);
        var elem = document.getElementById(zis.div.id + '_slider-' + arr_of_nums[i]);
        if (act == 'hide') {
          elem.style.display = 'none';
        } else if (act == 'show') {
          elem.style.display = 'block';
        }
      }
    }
    zis.mk_correct();
  };

  zis.mk_correct = function() {
    var boolka = false;
    // nodeForEach.call(zis.hldr.childNodes, function(elem) {
    //   var indof = elem.id.indexOf(zis.div.id + '_slider-');
    //     if (indof === 0 && elem.style.display == 'block') {
    //       elem.style.transition = 'none';
    //     }
    // });
    nodeForEach.call(zis.hldr.childNodes, function(elem) {
      var indof = elem.id.indexOf(zis.div.id + '_slider-');
      if (indof === 0 && elem.style.display == 'block') {
        if (boolka) {
          elem.style.marginTop = '-' + zis.hldr.style.height;
        } else {
          elem.style.marginTop = '0';
          boolka = true;
        }
      }
    });
  };

  zis.show = function() {
    // Метод для отрисовки слайдера.
    var n = 0;
    zis.n_cur = 0;
    zis.div.style.width = zis.options.width + 'px';
    zis.div.style.height = zis.options.height + 'px';

    var crazy_frag = document.createDocumentFragment();

    // Работа с холдером для изображений:
    var holder = document.createElement("div");
    holder.id = zis.div.id + '_slider_holder';
    holder.classList.add("slider_holder");
    zis.hldr = holder;
    zis.hldr.style.width = zis.options.width + 'px';
    zis.hldr.style.height = zis.options.height + 'px';
    if (zis.options.zoom) {
      // Вмещаем слайды в заданные размеры
      // Если получится, то ранее заданные, размеры перезапишутся
      var all_width = zis.options.width,
        all_height = zis.options.height,
        all_prop = all_width / all_height,
        i = 0,
        imgka,
        slide_prop,
        boolka = false;
      try { // Обработаем исключение на случай недостатка фоток
        while (!boolka) {
        // Находим подходящую для расчётов фотку
          imgka = zis.imgs[i++];
          if (typeof imgka == "string") {
            imgka = document.createElement("img");
            imgka.src = zis.imgs[i-1];
          }
          if (imgka.tagName == "IMG") {
            boolka = true;
          } else {
            console.log("Тут у " + zis.div.id + " фота - не фота");
          }
        }
      } catch (e) {
        console.log("Тут у " + zis.div.id + " фоты кончились");
      }
      if (boolka) {
        slide_prop = imgka.naturalWidth / imgka.naturalHeight;
        if (all_prop < slide_prop) {
          zis.hldr.style.width = all_width + 'px';
          var prop_height = all_width / slide_prop;
          zis.hldr.style.height = prop_height + 'px';
          zis.hldr.style.marginTop = ((all_height - prop_height) / 2) + 'px';
        } else {
          zis.hldr.style.height = all_height;
          var prop_width = all_height * slide_prop;
          zis.hldr.style.width = prop_width + 'px';
          zis.hldr.style.marginLeft = ((all_width - prop_width) / 2) + 'px';
        }
      }
    }
    crazy_frag.appendChild(holder);

    if(zis.options.controls){
      var ctl_left = document.createElement("img");
      var ctl_right = document.createElement("img");
      ctl_left.id = zis.div.id + 'slider_ctl_l';
      ctl_right.id = zis.div.id + 'slider_ctl_r';
      ctl_left.classList.add("slider_ctl");
      ctl_right.classList.add("slider_ctl");
      ctl_left.src = zis.options.controlsImages.left;
      ctl_right.src = zis.options.controlsImages.right;
      holder.appendChild(ctl_left);
      holder.appendChild(ctl_right);
    }

    zis.dots = [];

    zis.imgs.forEach(function(elem) { // Работа со слайдами
      var imgka;
      if (typeof elem == "string") {
        imgka = document.createElement("img");
        imgka.src = elem;
      }
      else if (typeof elem == "object") {
        imgka = elem;
      }
      imgka.id = zis.div.id + '_slider-' + n;
      if (n === 0){
        imgka.style.marginTop = '0px';
        imgka.style.marginLeft = '0px';
      } else {
        imgka.style.marginTop = '-' + zis.hldr.style.height;
        imgka.style.marginLeft = zis.hldr.style.width;
      }
      imgka.style.display = 'block';
      imgka.style.width = zis.hldr.style.width;
      imgka.style.height = zis.hldr.style.height;
      holder.appendChild(imgka);

      zis.dots.push(new slider_dot(zis, n++, zis.options.dotsBorder,
                    zis.options.dotsRadius));
    });

    nodeForEach.call(zis.div.childNodes, function(elem) {
      if (elem.tagName == "IMG" || elem.tagName == "DIV")
        // elem.remove();
        elem.style.display = 'none';
    } );

    zis.div.innerHTML = "";//Дикий колхоз (removeChild() не ремувит все чайлды)
    zis.div.appendChild(crazy_frag);


    if(zis.options.controls){
      zis.ctl = {};
      zis.ctl.l = document.getElementById(zis.div.id + "slider_ctl_l");
      zis.ctl.r = document.getElementById(zis.div.id + "slider_ctl_r");
      zis.ctl.r.onload = function() {
        zis.ctl.r.onclick = function () {
          zis.next();
          zis.onSlideChanged(zis.n_cur);
          if(zis.options.timerAutoSlide && zis.options.delayAfterAction)
            zis.delayAfterAction();
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
          zis.onSlideChanged(zis.n_cur);
          if(zis.options.timerAutoSlide && zis.options.delayAfterAction)
              zis.delayAfterAction();
          };
        //zis.ctl.l.ontouchstart = zis.ctl.l.onclick;
        zis.ctl.l.style.top = zis.options.height / 2 -
                               zis.ctl.l.offsetHeight / 2 + 'px';
        zis.ctl.l.style.left = 15 + 'px';
      };
    }

    if(zis.options.dots){
      zis.dots.forEach(function (elem) { elem.show(); });
      zis.dots[0].invert();
    }

    if(zis.options.timerAutoSlide){
      zis.stop_timer();
      zis.start_timer();
    }

    if(zis.options.touches)
      zis.touches.touches_addEvnts(zis.hldr);

    return zis;
  };

  zis.start_timer = function() {
    if (zis.options.timerAutoSlide){
      var timer1 = zis.options.timerAutoSlide; // timer1. 1 - патамушта
      zis.timerAutoSlide_id = setTimeout( function autoSlide() {

        zis.next();

        if (zis.options.timerMap !== null)
        if (zis.n_cur % 2 === 0)
        timer1 = zis.options.timerMap.even;
        else
        timer1 = zis.options.timerMap.odd;

        zis.timerAutoSlide_id = setTimeout(autoSlide, timer1);

      }, timer1);
    }
  };
  zis.stop_timer = function() {
    if (zis.options.timerAutoSlide){
      clearInterval(zis.timerAutoSlide_id);
    }
  };
  zis.delayAfterAction = function() {
    zis.stop_timer();
    clearTimeout(zis.timerAutoSlide_id2);
    zis.timerAutoSlide_id2 = setTimeout( function() { zis.start_timer(); },
                               zis.options.delayAfterAction );
  };

  if(zis.options.dots){
    zis.reload_dots = function(r, br, color, bcolor){
      zis.dots.forEach( function(elem) { elem.change(r, br, color, bcolor); });
    };
  }

  if(zis.options.touches){
    zis.touches = new touches();
    zis.touches.callback_start = function() {
      zis.delayAfterAction();
    };
    zis.touches.callback_stop = function() {
      var elem1, elem2, elem3,
          difference = zis.touches.posX - zis.touches.posX2;
      if(difference < -zis.options.touchDifferenceToSlide) {
        zis.next();
        zis.onSlideChanged(zis.n_cur);
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
      } else if(difference > zis.options.touchDifferenceToSlide){
        zis.prev();
        zis.onSlideChanged(zis.n_cur);
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
        nodeForEach.call(zis.div.childNodes, function(elem) {
          if(elem.tagName == "IMG" || elem.tagName == "DIV")
            elem.style.transition = '';
        } );
        if(zis.n_cur !== 0)
          document.getElementById(zis.div.id + "_slider-" + (zis.n_cur - 1))
                  .style.marginLeft = '-' + zis.options.width + 'px';
        else
          document.getElementById(zis.div.id + "_slider-" +
                                  (zis.imgs.length - 1))
                  .style.marginLeft = '-' + zis.options.width + 'px';

        if(zis.n_cur !== (zis.imgs.length - 1))
          document.getElementById(zis.div.id + "_slider-" + (zis.n_cur + 1))
                  .style.marginLeft = zis.options.width + 'px';
        else
          document.getElementById(zis.div.id + "_slider-" + '0')
                  .style.marginLeft = zis.options.width + 'px';

        document.getElementById(zis.div.id + "_slider-" + zis.n_cur)
                .style.marginLeft = '0px';
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

  zis.onSlideChanged = function(n) {
    console.log('Теперь на ' + n + ' слайде.');
  };
}

function slider_opts(){ // Конструктор опций для слайдера.
  // Здесь дефолтные значения:
  this.dots = false; // Включить точки
  this.controls = false; // Включить стрелки
  this.touches = true; // Включить управление тачскрином
  this.zoom = false;
  this.timerAutoSlide = 5000; // Таймер автослайда
  this.delayAfterAction = 10000; // Задержка после действия перед автослайдом
  this.width = 300; // Ширина
  this.height = 200; // Высота
  this.controlsImages = { // Картинки для стрелочек
    left: 'img/left.png',
    right:'img/right.png'
  };
  this.dotsMargin = 20; // Расстояние между точками
  this.touchDifferenceToSlide = 40; // Длина пути пальца для слайда
  this.dotsRadius = 7; // Радиус точки
  this.dotsBorder = 4; // Граница точки
  this.timerMap = null; // Карта таймеров для слайда
}

function slider_dot(papa, id, br, r, color, bcolor) {
  // Точки для обозначения текущей фоты
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
      // Рисует точки
      var batya;
      if(!(batya = document.getElementById(
                   zis.papa.div.id + "_slider_dot_holder")))
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
      divka.onclick = function() {
        zis.papa.goto(zis.id);
      };
      batya.appendChild(divka);
      zis.div = divka;
      return zis;
    };
    zis.position = function() {
      // Вычисляет крайнее положение точек
      return ( zis.papa.options.width / 2 -
               ( zis.papa.dots.length * (zis.radius + zis.border_weight) * 2 +
               (
                 zis.papa.dots.length - 1) * zis.papa.options.dotsMargin ) / 2
               ) + (zis.id * ((zis.radius + zis.border_weight) * 2 +
              zis.papa.options.dotsMargin));
    };
    zis.invert = function(non_r, non_c) {
      // Инвертирует точки
      if(!non_r)
        zis.change(null, null, zis.bcolor, zis.color);
      if(!non_c)
        zis.change(zis.border_weight, zis.radius, null, null);
      if(non_r && non_c)
        console.log("Тут " + zis.id +
                    " хочет инвертироваться с обоими флагами");
    };
    zis.change = function(r, br, color, bcolor) {
      // Перерисовывет точки
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
function max_width_height_of_dochkas(divka){
  result = [];
  result[0] = 0;
  result[1] = 0;
  nodeForEach.call(divka.childNodes, function(elem) {
    if (elem.offsetWidth > result[0])
      result[0] = elem.offsetWidth;
    if (elem.offsetHeight > result[1])
      result[1] = elem.offsetHeight;
  } );
  return result;
}

var nodeForEach = Array.prototype.forEach;
