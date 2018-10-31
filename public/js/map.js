$(function () {

  var clusterer;
  var points = {};
  var geoObjects = [];
  var $citiesDropdown = $('.js-cities-select');
  var $areasDropdown = $('.js-areas-select');
  var $inputAddress = $('.js-input-address');
  var $shopForm = $('.js-shop-form');

  /**
   * func close shop popup
   */
  function closeMapPopup() {
    if ($('.b-tooltip-init').length){
      $('.b-tooltip-init .close').trigger('click');
    }
  }

  /**
   * autocomplete address
   */
  $inputAddress.autocomplete({
    source: shopsArr,
    appendTo: $inputAddress.closest('.b-input__box'),
    open: function( event, ui ) {
      closeMapPopup();
      $inputAddress.closest('.b-input__box').addClass('open');
    },
    close: function( event, ui ) {
      $inputAddress.closest('.b-input__box').removeClass('open');
    },
    select: function( event, ui ) {
      var choosedId = parseInt(ui.item.id);

      $inputAddress.val(ui.item.label);

      // show only this shop
      $.each(points, function (id, value) {
        clusterer.remove(value.placemark);
        id = parseInt(id);
        if (choosedId == id) {
          clusterer.add(value.placemark);
        }
      });

      // open map popup
      $.each(geoObjects, function (id, value) {
        var thisGeoId = value.properties.get('name');
        if (thisGeoId == choosedId){
          value.events.fire('click');
          return false;
        }
      });

      return false;
    }
  });

  /**
   * set list of cities on load page
   */
  function setCitiesDropdowns() {
    $.each(citiesArr, function (key, val) {
      var activeClass = (val.geostatus) ? 'hidden active' : '';

      $('.b-dropdown__sub', $citiesDropdown).append('<li class="b-dropdown__item '+activeClass+'">'+key+'</li>')

      if (val.geostatus){
        $('.js-input-for-select', $citiesDropdown).val(key);
        setAreasDropdown();
      }
    })
  }
  setCitiesDropdowns();


  /**
   * set areas list on load page and on change cities dropdown
   */
  function setAreasDropdown() {
    var city = $('.js-input-for-select', $citiesDropdown).val();
    $('.b-dropdown__sub', $areasDropdown).html('');
    $('.js-input-for-select', $areasDropdown).val('').trigger('change');

    $.each(citiesArr[city].areas, function (key, val) {
      $('.b-dropdown__sub', $areasDropdown).append('<li class="b-dropdown__item">'+val+'</li>');
    });
  }

  /**
   * change area on city change
   */
  $('.js-input-for-select', $citiesDropdown).on('change', function () {
    setAreasDropdown();
    $areasDropdown.addClass('open');
    $('.b-dropdown', $areasDropdown).addClass('b-dropdown_open');
  });

  /**
   * disable address input if area dropdown empty
   */
  $('.js-input-for-select', $areasDropdown).on('change', function () {
    $inputAddress.val('').trigger('change');

    if ($(this).val() == ''){
      $inputAddress.closest('.b-input__box').addClass('disabled');
    } else {
      $inputAddress.closest('.b-input__box').removeClass('disabled');
    }
  });


  /**
   * send data
   */
  $('.js-input-for-select', $shopForm).on('change', function () {
    if ($(this).val() != ''){
      $.ajax({
        url: $shopForm.attr('action'),
        method: "POST",
        data: $shopForm.serialize(),
        dataType: "JSON",
        success: function (data) {
          data.result === 'ok' ? showSuccessShops(data.gocodeName, data.shopsArr) : showErrorShops();
        },
        error: function () {
          showErrorShops();
        }
      });
    }
  });

  function showSuccessShops(gocodeNameNew, shopsArrNew) {
    shopsArr = [];
    points = {};
    geoObjects = [];
    gocodeName = gocodeNameNew;
    shopsArr = shopsArrNew;

    myMap.destroy();
    initMap();
    $inputAddress.autocomplete( "option", "source", shopsArr );
  }

  function showErrorShops() {

  }


  /**
   * init map
   */
  function initMap() {
    ymaps.ready(function () {

      var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="b-tooltip-init" style="position: absolute">' +
        '<a class="close" href="#">&times;</a>'+
        '$[[options.contentLayout observeSize]]' +
        '</div>', {
          /**
           * Builds an instance of a layout based on a template and adds it to the parent HTML
           * element.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
           * @function
           * @name build
           */
          build: function () {
            this.constructor.superclass.build.call(this);

            this._$element = $('.b-tooltip-init', this.getParentElement());

            this.applyElementOffset();

            this._$element.find('.close')
              .on('click', $.proxy(this.onCloseClick, this));
          },

          /**
           * Removes the layout contents from DOM.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
           * @function
           * @name clear
           */
          clear: function () {
            this._$element.find('.close')
              .off('click');

            this.constructor.superclass.clear.call(this);
          },

          /**
           * The method will be invoked by the API's template system when resizing the nested
           * layout.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onSublayoutSizeChange
           */
          onSublayoutSizeChange: function () {
            MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

            if(!this._isElement(this._$element)) {
              return;
            }

            this.applyElementOffset();

            this.events.fire('shapechange');
          },

          /**
           * Moving the balloon so the "tail" points at the anchor point.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name applyElementOffset
           */
          applyElementOffset: function () {
            var height = $(".b-tooltip", this._$element[0]).outerHeight();
            this._$element.css({
              left: 0,
              top: 0
            });
          },

          /**
           * Closes the balloon when the "x" is clicked, throwing the "userclose" event on the
           * layout.
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
           * @function
           * @name onCloseClick
           */
          onCloseClick: function (e) {
            e.preventDefault();

            this.events.fire('userclose');
          },

          /**
           * Used for autopositioning (balloonAutoPan).
           * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
           * @function
           * @name getClientBounds
           * @returns  {Number[][]} The coordinates of the top left and bottom right corners of the template relative to the anchor point.
           */
          getShape: function () {
            if(!this._isElement(this._$element)) {
              return MyBalloonLayout.superclass.getShape.call(this);
            }

            var position = this._$element.position();
            // var width = this._$element.outerWidth();
            // var height = this._$element.outerHeight();
            var width = (windowWidth > 767 ) ? parseInt(windowWidth / 3) : 0;
            var height = (windowWidth > 767 ) ? this._$element.outerHeight() : parseInt(windowHeight / 2 +100);

            return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
              [position.left - width, -height], [position.left + windowWidth, position.top + height]
            ]));
          },

          /**
           * Checking the availability of the item (in IE and Opera it might not be there
           * yet).
           * @function
           * @private
           * @name _isElement
           * @param  {jQuery} [element] Element.
           * @returns  {Boolean} Availability flag.
           */
          _isElement: function (element) {
            return element && element[0];
          }
        });


      var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass('$[properties.balloonContent]');

      $.each(shopsArr, function (key, data) {
        points[data.id] = {
          visible: true,
          baloon: false,
          placemark: new ymaps.Placemark([data.longitude, data.altitude],
            {name: data.id, time: data.time, phone: data.phone, address: data.label, longitude: data.longitude, altitude: data.altitude},
            {
              iconLayout: 'default#imageWithContent',
              iconImageHref: './i/i-map-point.svg',
              iconImageSize: [32, 49],
              iconImageOffset: [-16, -49],
              openEmptyBalloon: true,
              balloonShadow: false,
              balloonLayout: MyBalloonLayout,
              balloonContentLayout: MyBalloonContentLayout,
              balloonPanelMaxMapArea: 0
            })
        };
      });

      var myGeocoder = ymaps.geocode(gocodeName);

      myGeocoder.then(
        function (res) {
          var coords = res.geoObjects.get(0).geometry.getCoordinates();
          var bounds = res.geoObjects.get(0).properties.get('boundedBy');

          myMap = new ymaps.Map('map', {
            center: coords,
            zoom: 10,
            controls: []
          }, {
            searchControlProvider: 'yandex#search'
          });

          myMap.controls.add(
            'zoomControl', {
              position: {
                top: 60,
                right: 15
              }
            }
          ).add('geolocationControl', {
            position: {
              top: 20,
              right: 15
            }
          });

          myMap.behaviors.disable('scrollZoom');

          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
          }

          var MyIconContentLayout = ymaps.templateLayoutFactory
            .createClass('<div style="color: #FFFFFF; text-align: center; font-family: GothamPro-Black; font-size: 18px; line-height: 49px; vertical-align: top;">$[properties.geoObjects.length]</div>');

          clusterer = new ymaps.Clusterer({
            clusterIcons: [{
              href: './i/i-cluster.svg',
              size: [46, 46],
              offset: [-23, -23]
            }],
            clusterIconContentLayout: MyIconContentLayout
          });

          geoObjects = [];

          $.each(points, function (id, value) {
            var thisData = value.placemark;
            geoObjects.push(thisData);
            thisData.events.add('click', myMapPlacemarkClick);
          });

          clusterer.add(geoObjects);
          myMap.geoObjects.add(clusterer);
          myMap.setBounds(clusterer.getBounds(), {checkZoomRange: true});
        }
      );


    });
  }
  initMap();

  /**
   * click on placemark and show popup
   * @param e
   */
  function myMapPlacemarkClick(e) {
    var placemark = e.get('target');

    var id = placemark.properties.get('name');
    var time = placemark.properties.get('time');
    var address = placemark.properties.get('address');
    placemark.properties.set('balloonContent', '<p><span>Адрес:</span>'+address+'</p><p><span>Время работы:</span>'+time+'</p>');

    myMap.setZoom(16);
    myMap.setCenter([longitude, altitude]);
  }

  /**
   * document click events
   */
  $(document).click(function (e) {
    var $target = $(e.target),
      $parent = undefined;

    // dropdown behaviour
    if ($target.is('.b-dropdown *')) {

      $parent = $target.parents('.b-dropdown');
      if ($target.is('.b-dropdown__item')) {
        $('.b-dropdown__item', $parent).removeClass('hidden active');
        $parent.removeClass('b-dropdown__first').removeClass('first-open');
        $target.addClass('hidden active');
        $('.b-dropdown__text', $parent).html($target.html()).addClass('js-link-stop');

        var $thisInputForSelect = $('.js-input-for-select', $parent.closest('.b-dropdown__box'));

        if ($target.data('letter') != undefined){
          $thisInputForSelect.val($target.data('letter')).trigger('change');
        } else {
          $thisInputForSelect.val($target.text()).trigger('change');
        }

        // if data-link go by url
        if ($target.data('link') != undefined)
          window.location = $target.data('link');
      }
      toggleDropdown($parent)
    } else {
      $('.b-dropdown').each(function () {
        if (!$(this).hasClass('first-open')){
          $(this).removeClass('b-dropdown_open');
          $(this).closest('.b-dropdown__box').removeClass('open');
        }
      })
    }
  });

  /**
   * dropdown open | close func
   * @param parent
   */
  function toggleDropdown(parent) {
    if (parent.hasClass('b-dropdown_open')) {
      parent.removeClass('b-dropdown_open');
      parent.closest('.b-dropdown__box').removeClass('open');
    } else {
      $('.b-dropdown').each(function () {
        if (!$(this).hasClass('first-open')){
          $(this).removeClass('b-dropdown_open');
          $(this).closest('.b-dropdown__box').removeClass('open');
        }
      });
      parent.addClass('b-dropdown_open');
      parent.closest('.b-dropdown__box').addClass('open');
      $('b-dropdown__text', parent).removeClass('js-link-stop');
    }
  }

});