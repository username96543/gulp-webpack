
// Поэкранная прокрутка
var myFullpage = new fullpage('#main', {
  //Navigation
  menu: '#menu',
  lockAnchors: false,
  anchors: ['products', 'about_us', 'about_us_1', 'advantage', 'contacts'],
  navigation: true,
  navigationPosition: 'left',
  navigationTooltips: ['products', 'about_us', 'about_us_1', 'advantage', 'contacts'],
  showActiveTooltip: false,
  slidesNavigation: false,
  slidesNavPosition: 'bottom',
  //Scrolling
  css3: true,
  scrollingSpeed: 1500,
  autoScrolling: true, //true
  fitToSection: false,
  fitToSectionDelay: 1000,
  scrollBar: false,
  easing: 'easeInOutCubic',
  easingcss3: 'ease',
  loopBottom: false,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  offsetSections: false,
  resetSliders: false,
  fadingEffect: false,
  normalScrollElements: '#element1, .element2',
  //scrollOverflow: true,
  scrollOverflowReset: false,
  scrollOverflowOptions: null,
  touchSensitivity: 15,
  bigSectionsDestination: null,
  //Accessibility
  keyboardScrolling: false,
  animateAnchor: true,
  recordHistory: true,
  //Design
  controlArrows: false,
  verticalCentered: false,
  sectionsColor: [],
  //paddingTop: '3em',
  //paddingBottom: '10px',
  fixedElements: '#header, .footer',
  responsiveWidth: 0,
  responsiveHeight: 0,
  responsiveSlides: false,
  parallax: false,
  parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
  dropEffect: false,
  dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999 },
  cards: false,
  cardsOptions: { perspective: 100, fadeContent: true, fadeBackground: true },
  //Custom selectors
  sectionSelector: '.section',
  slideSelector: '.slide',
  lazyLoading: true,
  //events
  onLeave: function (origin, destination, direction) {

    //! Запреты скролла экранов
    if (origin.anchor == 'products') {
      // if (!document.querySelector('.background_1__map').classList.contains('animate')) {
      //   return false;
      // }
    }

    // if (!document.querySelector('.popup_catalog').classList.contains('hidden')) {
    //   return false;
    // }

    //! Действия при скролле
    if (destination.anchor == 'about_us') {
      // if (common.onLeave.screen_2__slider) {
      //   screen_2__slider.params.autoplay.delay = 8000;
      //   screen_2__slider.autoplay.start();
      // }
    }

  },
  afterLoad: function (origin, destination, direction) { },
  afterRender: function () { },
  afterResize: function (width, height) { },
  afterReBuild: function () { },
  afterResponsive: function (isResponsive) { },
  afterSlideLoad: function (section, origin, destination, direction) { },
  onSlideLeave: function (section, origin, destination, direction) { }
});