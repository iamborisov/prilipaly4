// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var windowHeight = $(window).height();
var windowWidth = $(window).width();

var widthVideo = windowWidth - 100;
var heightVideo = widthVideo * .565;

if (windowWidth < 1025){
  widthVideo = windowWidth;
  heightVideo = widthVideo * .565;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: heightVideo,
    width: widthVideo,
    videoId: 'ipWnb2NkcYI',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

  if (event.data == 0){
    $('.video-container').removeClass('played').addClass('preload-pic')
  }

  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

$(function () {

  var $html = $('html');
  var $body = $('body');
  var $loader = $('.js-loader');
  var $parallax = $('.js-parallax');
  var $heroClick =  $('.js-hero-click');
  var $overlayVideo = $('.js-overlay-video');
  var $overlayVideoClose = $('.js-overlay-video-close');
  var $callVideoMain = $('.js-call-video-main');
  var $popup = $('.js-popup');
  var $popupBorder = $('.js-popup-border');
  var promoCodeSubmitAllow = false;
  var $promoCodeForm = $('.js-promo-from');
  var $phoneInput = $('.js-phone-input');
  var $promoCodeForm_Error = $('.js-promo-from-error');
  var $promoCodeForm_Success = $('.js-promo-from-success');
  var $popupTabs = $('.js-popup-tab');
  var $popupTabsBox = $('.js-tabs-box');
  var $promoCodeCall = $('.js-promo-code-call');
  var $overlayPromoCode = $('.js-overlay-promo-code');
  var $promoCodePOpupClose = $('.js-close-promo-code');
  var $shopForm = $('.js-shop-form');
  var $shopFormBorder = $('.js-shop-form-border');
  var $carouselHeroes = $('.js-carousel-heroes');
  var $carouselHeroes_slideIndex = $('.js-carousel-heroes-num');
  var $sectionCarousel = $('.js-section-carousel');
  var cloneCarouselHeroes = $carouselHeroes.clone();
  var $sectionNav = $('.js-section-nav');
  var $menuBorder = $('.js-menu-border');
  var $menuBurgerWrapper = $('.js-menu-wrapper');
  var $burgerCall = $('.js-burger-call');
  var $menuBurgerOverlay = $('.js-menu-overlay');
  var $menuClose = $('.js-menu-close');
  var $promoCodeMenuCall = $('.js-promo-code-menu-call');
  var $menuLink = $('.js-menu-link');
  var $footerMenuLink = $('.js-footer-menu-link');
  var $scrollTopLink = $('.js-scroll-top');
  var $playNumberLink = $('.js-play-number');
  var $playTextInsert = $('.js-play-text-insert');
  var $productCarousel = $('.js-products-carousel');
  var $productTab = $('.js-products-tab');
  var $productTabLink = $('.js-product-tab-link');
  var $areaSelect = $('.js-area-select');
  var $areaForm = $('.js-area-form');

  var defaultPlayCloudText = '<h6>ПРИШЛО ВРЕМЯ ИГРЫ!</h6><p>качай и распечатывай задания от прилипал, делись своими результатами в социальных сетях с тегом #ПРИЛИПАЛЫ_4</p>';
  var heroText = {
    1: [
      {
        text: '<p>Есть промокод? <i>Получи приз!</i></p>'
      },{
        text: '<p>Еще нет промокода? <i>Тренируйся больше!</i></p>'
      }
    ],
    2: [
      {
        text: '<p><a href="section-products" class="js-scroll-to">Получи <i>веселого<br>прилипалу</i> за&nbsp;каждые 500&nbsp;рублей в&nbsp;чеке!</a></p>'
      },{
        text: '<p><a href="section-heroes" class="js-scroll-to">Собери <i>полную коллекцию</i> прилипал-супергероев!</a></p>'
      },{
        text: '<p><a href="section-app" class="js-scroll-to"><i>Закачай</i> прилипал к&nbsp;себе в&nbsp;телефон!</a></p>'
      },{
        text: '<p><a href="section-play" class="js-scroll-to">Выполни <i>все задания</i> от&nbsp;прилипал!</a></p>'
      },{
        text: '<p><a href="section-barter" class="js-scroll-to">Много одинаковых прилипал? <i>Меняйся!</i></a></p>'
      },{
        text: '<p><a href="section-products" class="js-scroll-to"><i>Попробуй</i> любимые товары прилипал!</a></p>'
      }
    ],
    3: [
      {
        text: '<p><a href="section-app" class="js-scroll-to">Прилипалы-супергерои <i>в&nbsp;твоем телефоне!</i></a></p>'
      },{
        text: '<p><a href="section-app" class="js-scroll-to">Набирай очки и&nbsp;<i>выигрывай призы!</i></a></p>'
      },{
        text: '<p><a href="section-app" class="js-scroll-to"><i>Играй</i> вместе с&nbsp;прилипалами-супергероями!</a></p>'
      },{
        text: '<p><a href="section-app" class="js-scroll-to">Играю в&nbsp;<i>прилипал на&nbsp;телефоне</i> и&nbsp;тебе советую!</a></p>'
      }
    ]
  };
  var playTextObj = {
    1: {
      title: "Береги голову",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_01.pdf",
      text: "Бригадирро никогда не расстается со своей каской, особенно когда наступает время спасать мир. Чтобы вступить в бой с Тайфуном, тебе понадобится такой же супергеройский атрибут. Сделай его сам и стань настоящим супергероем!"
    },
    2: {
      title: "Красота спасет мир",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_02.pdf",
      text: "Даже на спасение мира Бобо не хочет отправляться без своего любимого цветочка в прическе. Помоги Бобо ослабить Тайфун красотой - нарисуй 5 цветочков, которыми она могла бы украсить свою прическу."
    },
    3: {
      title: "Ловушка для ума",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_03.pdf",
      text: "Мистер Плут настолько хитрый, что может перехитрить не только злодеев, но и самого себя! Он уже заманил Тайфун в лабиринт, но и сам потерялся. Помоги Мистеру Плуту выйти из лабиринта и продолжить спасать мир!"
    },
    4: {
      title: "По следам супергероя",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_04.pdf",
      text: "Космоеж вперед всех остальных прилипал полетел сражаться с ураганом. Соедини все точки на рисунке - и узнаешь, что герой вытащил из самого эпицентра урагана."
    },
    5: {
      title: "Новая суперсила",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_05.pdf",
      text: "Мыслехват давно прочитал мысли Тайфунного монстра и знает, как его остановить! Но для этого ему понадобится твоя помощь. Тебе нужно собрать Мыслехвата из... бумаги. Скорее бери листок и собирай супергероя по схеме! Теперь он может прыгать и точно спасет город!"
    },
    6: {
      title: "Валентинка",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_06.pdf",
      text: "Суперспособность Сеньориты - сила красоты. Может быть, Тайфун удастся победить с помощью симпатичной открытки? Проверь это - распечатай открытку-сердце и раскрась по своему вкусу. Тайфун точно начнет умиляться и забудет о своем злом плане."
    },
    7: {
      title: "Все самое необходимое",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_07.pdf",
      text: " Чтобы составить план по спасению мира, Октопусу нужно много чего найти, ведь у него дома настоящий хаос после вечеринки осьминогов! Помоги главному умнику прилипал найти все, что ему нужно, для того чтобы спасти город."
    },
    8: {
      title: "Найди вкусняшку",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_08.pdf",
      text: "Чтобы победить Тайфун, Сарделькину необходимо подкрепиться. Но он умудрился растерять все свои сосиски у себя дома! Попробуй найти их!"
    },
    9: {
      title: "Супермозг",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_09.pdf",
      text: "Тайфун приближается! Всех супергероев может собрать только утенок Супердак, ведь именно он знает все обо всех. Помоги ему - реши его хитрый сканворд и узнай, кто готов защищать город!"
    },
    10: {
      title: "Найди помощника",
      url: "./i/section-play/downloads/Stikeez_SiteRebus_10.pdf",
      text: "Даже главному компьютерному гению среди супергероев нужна твоя помощь! Чтобы ослабить Тайфун, тебе кое-что понадобится. Скорее узнай, что именно, - раскрась картинку."
    }
  };

  var LOADER_PERCENT = Object;

  $(window).on('scroll', function () {
    activeSectionScroll();
  });

  $(window).on('resize', function () {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    popupBorderHeight();
    mapChoosepBorderHeight();
    destroyAndInitHeroesCarousel();
    activeSectionScroll();
    menuBorderHeight();
  });

  $(window).on('load', function () {
      scrollTo($body, 0, 0);
      loader();
      getHashToOpenPromoPopup();
  });

  function loaderAnimation() {
    var width = 100,
      perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime/1000)%60)*100;

    var s = Snap('.js-circle-loader');
    var progress = s.select('.js-circle-loader-progress');


    var PercentageID = $(".js-percent-loader"),
      start = 0,
      end = 100,
      durataion = time;
    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

      duration = duration + 1500;

      var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      LOADER_PERCENT[0] = start;

      var timer = setInterval(function() {
        LOADER_PERCENT[0] += increment;
        $(obj).text(LOADER_PERCENT[0] + "%");

        var value = 251.2 / 100 * LOADER_PERCENT[0];
        $('.js-circle-loader').css('opacity', 1);
        progress.attr({strokeDasharray: '0, 251.2'});
        progress.attr({ 'stroke-dasharray':value+',251.2'});

        if (LOADER_PERCENT[0] == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

  }
  // loaderAnimation();

  /**
   * set default region
   */
  function setDefRegion() {
    $('.b-dropdown__item', $areaSelect).each(function () {
      var id = parseInt($(this).attr('data-id'));

      if (currentArea == id){
        var html = $(this).html();
        $(this).addClass('hidden active');
        $('.b-dropdown__text', $areaSelect).html(html);
        $('.js-input-for-select', $areaSelect).val(html);
        return false;
      }
    })
  }
  setDefRegion();

  /**
   * get new products of change region
   */
  $('.js-input-for-select', $areaSelect).on('change', function () {

    $.ajax({
      url: $areaForm.attr('action'),
      method: "POST",
      data: $areaForm.serialize(),
      dataType: "JSON",
      success: function (data) {
        data.result === 'ok' ? showSuccessProducts(data.products) : showErrorProducts();
      },
      error: function () {
        showSuccessProducts();
        // showErrorProducts();
      }
    });
  });
  
  function showErrorProducts() {
    
  }

  function showSuccessProducts(productsObj) {
    var data = productsObj;

    $productTab.removeClass('show');

    setTimeout(function () {
      // reset slick if it work
      $productCarousel.each(function () {
        if ($(this).hasClass('slick-slider')){
          $(this).slick('unslick');
          $(this).html('');
        }
      });

      setProducts(data);
      $('.js-product-tab-link[data-type=1]').removeClass('active').trigger('click');
    }, 450);

  }

  /**
   * tab product
   */
  $productTabLink.on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass('active')){
      $productTabLink.removeClass('active');
      $(this).addClass('active');
      var id = $(this).attr('data-type');
      $productTab.removeClass('show');
      $('.js-products-tab[data-type='+id+']').addClass('show');
      $('.js-product').removeClass('open');
    }
  });

  /**
   * set products to page and init carousel
   */
  function setProducts(data) {
    
    $.each(data, function (key, val) {
      var $thisTab = $('.js-products-tab[data-type='+key+']');

      $.each(val, function (key, val) {
        $('.js-products-carousel', $thisTab).append('<div class="js-product b-products">'+
            '<div class="b-products__pic" style="background-image: url(\''+val.img+'\')"></div>'+
            '<div class="b-products__text">'+
              '<div class="b-products__faq">'+
                '<i class="b-products__faq-icon"></i>'+
                '<div class="b-products__faq-text">'+
                '<div class="b-products__faq-text-wrapper">'+
                  '<h6>'+val.title+'</h6>'+
                  '<p>'+val.text+'</p>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<h6 class="b-products__title">'+val.title+'</h6>'+
          '</div>'+
        '</div>');
      });

    });

    productCarouselInit();
  }
  setProducts(productsObj);

  /**
   * product carousel init
   */
  function productCarouselInit() {
    $productCarousel.each(function () {
      $(this).slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        touchThreshold: 20,
        responsive: [{
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  }

  /**
   * play number click
   */
  $playNumberLink.on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass('active')){
      $playNumberLink.removeClass('active');
      $(this).addClass('active');
      var id = parseInt($(this).attr('data-id'));
      var thisItemArr = playTextObj[id];

      $playTextInsert.html('<h6><a target="_blank" href="'+thisItemArr.url+'">'+thisItemArr.title+'</a></h6><p>'+thisItemArr.text+'</p>').addClass('hero-text');
    } else {
      $playNumberLink.removeClass('active');
      $playTextInsert.html(defaultPlayCloudText).removeClass('hero-text');
    }
  });

  /**
   * scroll top page on click
   */
  $scrollTopLink.on('click', function (e) {
    e.preventDefault();
    scrollTo($body);
  });

  /**
   * footer menu link scroll to section
   */
  $footerMenuLink.on('click', function (e) {
    e.preventDefault();

    var href = $(this).attr('href');
    var percent = windowWidth / 100;
    var offset = (windowWidth >= 768) ? 2 * percent : 3.5 * percent;
    scrollTo($('#'+href), offset);
  });

  /**
   * menu link click scroll page
   */
  $menuLink.on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    closeBurgerMenu();
    var percent = windowWidth / 100;
    var offset = (windowWidth >= 768) ? 2 * percent : 3.5 * percent;
    scrollTo($('#'+href), offset);
  });


  /**
   * open burger menu
   */
  $burgerCall.on('click', function (e) {
    e.preventDefault();

    $menuBurgerOverlay.addClass('open');
    $body.addClass('overflow');
  });

  /**
   * promo call from menu
   */
  $promoCodeMenuCall.on('click', function (e) {
    e.preventDefault();
    closeBurgerMenu();
    setTimeout(function () {
      openPopupPromoCode();
    }, 700);
  });

  /**
   * close menu on click
   */
  $menuClose.on('click', function (e) {
    e.preventDefault();
    closeBurgerMenu();
  });

  /**
   * fn close burger menu
   */
  function closeBurgerMenu() {
    $menuBurgerOverlay.removeClass('open');
    $body.removeClass('overflow');
  }

  /**
   * scroll sections activate
   */
  function activeSectionScroll() {
    var windowPart = parseInt(windowHeight / 2);
    $sectionNav.each(function () {
      var val = $(this)[0].getBoundingClientRect();

      if (val.top <= windowPart && val.top > windowPart - val.height && !$(this).hasClass('active-section')){
        $sectionNav.removeClass('active-section');
        $(this).addClass('active-section');
        var id = $(this).attr('id');
        $menuLink.removeClass('active');
        $('.js-menu-link[href='+id+']').addClass('active');
      }
    })
  }
  activeSectionScroll();

  /**
   * destroy and init carousel
   */
  function destroyAndInitHeroesCarousel() {
    if ($('.js-carousel-heroes').data("carousel")){
      $('.js-carousel-heroes').data("carousel").deactivate();
    }

    if (windowWidth >= 768 && $('.js-carousel-heroes').hasClass('slick-slider')){
      $('.js-carousel-heroes').slick('unslick');
      $('.js-carousel-heroes').remove();
      $sectionCarousel.append(cloneCarouselHeroes);
    } else if (windowWidth < 768 && !$('.js-carousel-heroes').hasClass('slick-slider')) {
      $('.js-carousel-heroes').remove();
      $sectionCarousel.append(cloneCarouselHeroes);
    }

    initHeroesCarousel();
  }

  /**
   * init heroes carousel different libs depend of width
   */
  function initHeroesCarousel() {
    if (windowWidth >= 768){
      $('.js-carousel-heroes').Cloud9Carousel({
        bringToFront: true,
        frontItemClass: 'active',
        itemClass: 'b-heroes-carousel__item',
        farScale: 0.5,
        // yRadius: $('.js-carousel-heroes').height() / 6 * -1,
        // xRadius: $('.js-carousel-heroes').width() / 2
      });
    } else if (windowWidth < 768 && !$('.js-carousel-heroes').hasClass('slick-slider')) {
      $carouselHeroes_slideIndex.html('1');

      $('.js-carousel-heroes').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        touchThreshold: 20
      });

      $('.js-carousel-heroes').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var numSlide = parseInt(nextSlide) + 1;
        $carouselHeroes_slideIndex.html(numSlide);
      });
    }
  }
  initHeroesCarousel();



  /**
   * open popup promo on load if hash
   */
  function getHashToOpenPromoPopup() {
    var hash = window.location.hash;
    if (hash == '#?promoCodePopup'){
      openPopupPromoCode();
    }
    if (hash == '#?sectionApp'){
      var percent = windowWidth / 100;
      var offset = (windowWidth >= 768) ? 2 * percent : 3.5 * percent;
      scrollTo($('#section-app'), offset);
    }
  }

  /**
   * close promo code popup
   */
  function closePopupPromoCode(){

    $body.removeClass('overflow');
    $overlayPromoCode.removeClass('open');
    window.location.hash = '';

    setTimeout(function () {
      $promoCodeForm[0].reset();
      $promoCodeForm.removeClass('hidden error-show');
      $promoCodeForm_Success.addClass('hidden');
    }, 250);
  }

  /**
   * close promo code on click
   */
  $promoCodePOpupClose.on('click', function (e) {
    e.preventDefault();

    closePopupPromoCode();
  });

  /**
   * promo code popup call
   */
  $promoCodeCall.on('click', function (e) {
    e.preventDefault();

    var idText = parseInt($(this).closest($heroClick).attr('data-text'));

    $('.js-popup-tab', $('.b-popup__tabs-item').eq(idText)).trigger('click');

    openPopupPromoCode();
  });

  /**
   * promo code popup open
   */
  function openPopupPromoCode() {
    window.location.hash = '#?promoCodePopup';
    $body.addClass('overflow');
    $overlayPromoCode.addClass('open');
    scrollTo($body, 0, 500, $overlayPromoCode);
  }

  /**
   * popup tabs
   */
  $popupTabs.on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass('active')){
      var thisHref = $(this).attr('href');
      $popupTabs.removeClass('active');
      $(this).addClass('active');
      $popupTabsBox.addClass('hidden');
      $(thisHref).removeClass('hidden');
      popupBorderHeight();
    }
  });

  /**
   * set popup promo cod border height
   */
  function popupBorderHeight() {
    setTimeout(function () {
      var heightPopup = $popup.height();
      var val = heightPopup + 44;
      $popupBorder.css('border-bottom-width', val+'px');
    }, 10);
  }
  popupBorderHeight();

  /**
   * set popup promo cod border height
   */
  function menuBorderHeight() {
    setTimeout(function () {
      var height = $menuBurgerWrapper.outerHeight(true);
      $menuBorder.css('border-bottom-width', height+'px');
    }, 10);
  }
  menuBorderHeight();

  /**
   * set popup promo cod border height
   */
  function mapChoosepBorderHeight() {
    setTimeout(function () {
      var heightPopup = $shopForm.height();
      var val = 0;
      (windowWidth >= 768) ? val = parseInt(heightPopup + 1.4 * 12.8) : val = parseInt(heightPopup + 4 * 3.75);
      $shopFormBorder.css('border-bottom-width', val+'px');
    }, 10);
  }
  mapChoosepBorderHeight();

  /**
   * loader activation and hide
   */
  function loader() {
    $loader.addClass('active');
    setTimeout(function () {
      $body.addClass('show');
      setTimeout(function () {
        paralax();
        $body.addClass('regular').removeClass('transitions').removeClass('overflow');
        $html.removeClass('overflow');
      }, 4000)
    }, 600);
  }

  /**
   * video play popup
   */
  $callVideoMain.on('click', function (e) {
    e.preventDefault();
    $body.addClass('overflow');
    $overlayVideo.addClass('open');
    player.playVideo();
  });

  /**
   * fn close video popup
   */
  function closePopupVideo() {
    $body.removeClass('overflow');
    $overlayVideo.removeClass('open');
    setTimeout(function () {
      player.stopVideo();
    }, 250);
  }

  /**
   * close popup video on click
   */
  $overlayVideoClose.on('click', function (e) {
    e.preventDefault();
    closePopupVideo();
  });

  /**
   * close popup if esc
   */
  $(document).keyup(function (e) {
    if (e.which == 27 && $overlayVideo.hasClass('open')) {
      closePopupVideo();
    }

    if (e.which == 27 && $overlayPromoCode.hasClass('open')) {
      closePopupPromoCode();
    }

    if (e.which == 27 && $menuBurgerOverlay.hasClass('open')) {
      closeBurgerMenu();
    }

    if (e.which == 39 && windowWidth >= 768 && $sectionCarousel.hasClass('active-section')){
      $('.js-carousel-heroes').data("carousel").go(1);
    }

    if (e.which == 37 && windowWidth >= 768 && $sectionCarousel.hasClass('active-section')){
      $('.js-carousel-heroes').data("carousel").go(-1);
    }

  });

  /**
   * close popup on overlay
   */
  $(document).on('click', function (e) {
    var $target = $(e.target);

    if ($target.is('.js-overlay-promo-code')){
      closePopupPromoCode();
    }

    if ($target.is('.js-menu-overlay')){
      closeBurgerMenu();
    }

    /**
     * product toggle open faq
     */
    if ($target.is('.js-product *')){
      e.preventDefault();
      var $thisProduct = $target.closest('.js-product');

      if (!$thisProduct.hasClass('open')){
        $('.js-product').removeClass('open');
        $thisProduct.addClass('open');
      } else {
        $('.js-product').removeClass('open');
      }
    }

    // scroll to
    if ($target.is('.js-scroll-to *') || $target.is('.js-scroll-to')){
      e.preventDefault();
      var $thisLink = $target.closest('.js-scroll-to');
      var href = $thisLink.attr('href');
      var percent = windowWidth / 100;
      var offset = (windowWidth >= 768) ? 2 * percent : 3.5 * percent;
      scrollTo($('#'+href), offset);
    }
  });

  /**
   * hero click change text
   */
  $heroClick.on('click', function (e) {

    var id = $(this).attr('data-id');
    var numText = parseInt($(this).attr('data-text')) + 1;
    var length = heroText[id].length - 1;

    if (numText > length)
      numText = 0;

    $(this).attr('data-text', numText);
    $('.b-section-top__hero-cloud div', $(this)).html(heroText[id][numText].text);

  });

  /**
   * parallax top screen
   */
  function paralax() {
    if (windowWidth > 1024){
      $parallax.each(function () {
        var scene = $(this)[0];
        var parallaxInstance = new Parallax(scene);
      })
    }
  }


  // VALIDATION

  /**
   * validate form for amount of filled required felds
   * @param $form - form dom
   */
  function chkformCode($form) {
    var emailMask = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-zA-Z0-9]{1}[a-zA-Z0-9\-]{0,62}[a-zA-Z0-9]{1})|[a-zA-Z])\.)+[a-zA-Z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/;
    var validEmail = emailMask.test($('.js-email-input', $form).val());

    if ($('.js-required.js-filled', $form).length < $('.js-required', $form).length) {
      promoCodeSubmitAllow = false;
    } else if ($('.js-phone-input', $form).val().length < 17) {
      promoCodeSubmitAllow = false;
      $('.js-phone-input', $form).addClass('error');
    } else if (!validEmail){
      promoCodeSubmitAllow = false;
      $('.js-email-input', $form).addClass('error');
    } else if (!$('.js-agree', $form).is(':checked')){
      promoCodeSubmitAllow = false;
    } else {
      promoCodeSubmitAllow = true;
      $('.js-email-input', $form).removeClass('error');
      $('.js-phone-input', $form).removeClass('error');
    }
  }

  /**
   * inputs set status filled of value more than 0
   */
  $('input, textarea', $promoCodeForm).on('keyup paste change input', function () {
    var $this = $(this);

    commonFormsInputsChanging($this, this);

    // check form
    chkformCode($promoCodeForm);
  });

  /**
   * submit form
   */
  $promoCodeForm.on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this);

    if (promoCodeSubmitAllow){
      submitPromoCodeForm($this, $this.serialize());
    } else {
      $('input, textarea', $promoCodeForm).trigger('change');
      $promoCodeForm_Error.html('Пожалуйста, заполните все поля формы');
      $this.addClass('error-show');
    }

    return false;
  });

  /**
   * submit Form
   * @param $this
   * @param data
   */
  function submitPromoCodeForm($this, data) {

    $.ajax({
      url: $this.attr('action'),
      method: "POST",
      data: data,
      dataType: "JSON",
      success: function (data) {
        data.result === 'ok' ? showSuccessPromoCodeForm() : showErrorPromoCodeForm();
      },
      error: function () {
        showErrorPromoCodeForm();
      }
    });
  }

  /**
   * promo code success
   */
  function showSuccessPromoCodeForm() {
    $promoCodeForm.addClass('hidden');
    $promoCodeForm_Success.removeClass('hidden');
    popupBorderHeight();
  }

  /**
   * promo code form error
   */
  function showErrorPromoCodeForm() {
    $promoCodeForm_Error.html('Возникла ошибка.<br>Повторите попытку позже.');
    $promoCodeForm.addClass('error-show');

    setTimeout(function () {
      $promoCodeForm.removeClass('error-show');
    }, 3000);
  }

  /**
   * phone mask
   */
  $phoneInput.mask('+7 (000) 000-0000');

});

/**
 * common inputs behaviour
 * @param $this
 */
commonFormsInputsChanging = function ($thisElem, $this) {
  //reset error class
  var $thisForm = $thisElem.closest('form');
  if ($thisForm.hasClass('error-show'))
    $thisForm.removeClass('error-show');

  //set filled class
  if ($thisElem.hasClass('js-checkbox')){

    $thisElem.is(':checked') ? $thisElem.addClass('js-filled').removeClass('error') : $thisElem.removeClass('js-filled').addClass('error');

  } else {
    $this.value.length > 0 ? $thisElem.addClass('js-filled').removeClass('error') : $thisElem.removeClass('js-filled').addClass('error');
  }
};

/**
 * scroll to block
 * @param selector
 */
scrollTo = function(selector, offset, time, scrollElem, position) {
  if (time != 0) {
    time = 500;
  }

  setTimeout(function () {
    !offset ? offset = 0 : offset;
    if (!position == true){
      var scroll = $(selector).offset().top - offset;
    } else {
      var scroll = $(selector).position().top - offset;
    }

    if (!scrollElem){
      scrollElem = $('html,body');
    }
    scrollElem.animate({
      scrollTop: scroll
    }, time);
  }, 10);
};