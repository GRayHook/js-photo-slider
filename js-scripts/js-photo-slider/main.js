var IIITYKA1, IIITYKA2, IIITYKA3;
window.onload = function(){
  IIITYKA1 = new slider(document.getElementById("slider1"),
                       ['/img/js-photo-slider/1.jpg',
                        '/img/js-photo-slider/2.jpg',
                        '/img/js-photo-slider/3.jpg'],
                       't(500)fzw(400)h(100)');
  IIITYKA2 = new slider(document.getElementById("slider2"),
                        null, {
                          width: "auto",
                          height: "auto",
                          dots: true,
                          controls: true,
                          timerMap: { even: 1000, odd: 4000 },
                          vertical: true
                        }).show();
  IIITYKA3 = new slider(document.getElementById("slider3"),
                        ['/img/js-photo-slider/1.jpg',
                         '/img/js-photo-slider/3.jpg',
                         '/img/js-photo-slider/2.jpg'],
                        { width: 600, height: 450,
                          dotsBorder: 10,
                          controls: true, dots: true
                        }).show();
  setTimeout(function() { IIITYKA1.show(); IIITYKA3.show(); }, 3000);

};
// Конструктор класса принимает первым параметром ссылку на DOM-объект,
// в который необходимо поместить слайдер.
// Вторым параметром должен идти массив ссылок на картинки. Я пока не работал
// над заполнением картинкой рамки, сейчас она растягивается по размерам
// рамки. Чтобы распарсить дочерние элементы, достаточно оставить значение null.
// Третий параметр - строка с флагами (в скобках значения по умолч.):
// // // // // // // // // // // // // //
// // // // //  НАСТРОЙКИ  // // // // //
// // // // // для строки: // // // // //
// // // // // // // // // // // // // //
// w(x) - задаёт ширину слайдера. Для автоподбора - "a" в строку
// или "auto" в объект (300);
// h(x) - задаёт высоту. Для автоподбора - "a" в строку
// или "auto" в объект (200);
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
// z - включает "вмещение" картинки;
// s - включает поддержку полноэкранного режима
// n - включает автоматическое скрытие элементов управления
// // // // // // // // // // // // // //
// // // // // для объекта // // // // //
// // // // // // // // // // // // // //
// Допускается передача объекта класса slider_opts или с частью полей.
// Здесь дефолтные значения:
// dots = false - Включить точки
// controls = false - Включить стрелки
// touches = true - Включить управление тачскрином
// zoom = false - Включить вмещение
// ctlHiding - Включить автоматическое скрытие элементов управления
// fullScreen - Включить поддержку полноэкранного режима
// timerAutoSlide = 5000 - Таймер автослайда
// delayAfterAction = 10000 - Задержка после действия перед автослайдом
// width = 300 - Ширина
// height = 200 - Высота
// controlsImages = { // Картинки для стрелочек
//   left: 'img/left.png', // Левая
//   right:'img/right.png' // Правая
// };
// dotsMargin = 20 - Расстояние между точками
// touchDifferenceToSlide = 40 - Длина пути пальца для слайда
// dotsRadius = 7 - Радиус точки
// dotsBorder = 4 - Граница точки
// timerMap = object { even: 1000, odd: 1000 } - Карта для автослайда. even -
//                                              чётные слайды, odd - нечётные.
//
// Инициализация производится методом .show(). Он так же возвращает ссылку
// на объект, так что можно вызывать прям вместе с конструктором. Но
// инициализировать можно и потом.
// Для точек можно задать сдвиг по id общего элемента. Пример в main.css.
//
// Для переключения на конкретный слайд используется метод .goto(n)