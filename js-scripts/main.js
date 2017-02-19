var IIITYKA1, IIITYKA2, IIITYKA3;
window.onload = function(){

  IIITYKA1 = new slider(document.getElementById("slider1"),
                       ['img/1.jpg',
                        'img/2.jpg',
                        'img/3.jpg'],
                       't(500)fcd');
  IIITYKA2 = new slider(document.getElementById("slider2"),
                        null,
                        'w(350)h(275)a(0)m(15)l(img/right.png)p(img/left.png)')
            .show();
  IIITYKA3 = new slider(document.getElementById("slider3"),
                        ['img/1.jpg',
                         'img/3.jpg',
                         'img/2.jpg'],
                        { width: 600, height: 450, br: 10 }).show();
  setTimeout(function() { IIITYKA1.show(); IIITYKA3.show(); }, 3000);

};
// Конструктор класса принимает первым параметром ссылку на DOM-объект,
// в который необходимо поместить слайдер.
// Вторым параметром должен идти массив ссылок на картинки. Я пока не работал
// над заполнением картинкой рамки, сейчас она растягивается по размерам
// рамки. Чтобы распарсить дочерние элементы, достаточно оставить значение null.
// Третий параметр - строка с флагами (в скобках значения по умолч.):
// w(x) - задаёт ширину слайдера (300);
// h(x) - задаёт высоту (200);
// t(x) - задаёт время для таймера в мс (5000);
// a(x) - задаёт время для паузы таймера в мс (10000);
// r(x) - задаёт радиус точек в px (4);
// b(x) - задаёт толщину границы точек в px (7);
// m(x) - задаёт расстояние между точками в px (20);
// l(x) - задаёт ссылку на левую стрелку (img/left.png);
// p(x) - задаёт ссылку на правую стрелку (img/right.png);
// f - запрещает пользоваться жестами;
// с - скрывает элементы управления - стрелки;
// d - скрывает точки;
// Допускается передача объекта класса slider_opts или с частью полей.
// Инициализация производится методом .show(). Он так же возвращает ссылку
// на объект, так что можно вызывать прям вместе с конструктором. Но
// инициализировать можно и потом.
