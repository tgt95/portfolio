'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var detectMobile = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

var _getHeight = function _getHeight(el) {
  return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
};

var _getWidth = function _getWidth(el) {
  return parseFloat(getComputedStyle(el, null).width.replace("px", ""));
};

var Theme = /*#__PURE__*/function () {
  function Theme() {
    _classCallCheck(this, Theme);

    this.spacer = [];
    this.breakpoint = {
      xxs: 320,
      xs: 414,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1440,
      xxxl: 1600
    };
    this.elements = {
      body: $('body'),
      contentPage: $('.content-page'),
      header: document.querySelectorAll('.header')[0],
      navigation: document.querySelectorAll('.header .navigation-menu')[0],
      loader: $('.page-loader')
    };
  }

  _createClass(Theme, [{
    key: "baseConfig",
    value: function baseConfig() {
      // Push Spacing
      var temp;

      for (var i = 1; i <= 16; i++) {
        temp = temp === undefined ? 2 : temp + temp;
        this.spacer.push(temp);
      }

      $('[data-toggle="tooltip"]').tooltip();
    }
  }, {
    key: "navigationConfig",
    value: function navigationConfig() {
      var header = this.elements.header;
      var viewport = document.querySelectorAll('html, body')[0];
      this.elements.navigation.querySelectorAll('ul:first-child a').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
          e.preventDefault();
          var offsetTop = e.currentTarget.getAttribute('data-offset-top') !== undefined ? e.currentTarget.getAttribute('data-offset-top') : 0; // $('html, body').animate({
          // 	scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
          // }, 500);
          // debugger

          Velocity(document.querySelectorAll('html, body')[0], {
            offset: 0
          }, {
            duration: 1000
          });
        });
      }); // this.elements.navigation.find('ul:first-child a').on('click', function(e) {
      // 	e.preventDefault();
      // 	let offsetTop = $(this).data('offset-top') !== undefined ? $(this).data('offset-top') : 0;
      // 	$('html, body').animate({
      // 		scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
      // 	}, 500);
      // });

      window.addEventListener('scroll', function () {
        viewport.scrollTop > _getHeight(header) ? header.classList.add('has-background') : header.classList.remove('has-background');
      });
    }
  }, {
    key: "bannerCofig",
    value: function bannerCofig() {
      var header = this.elements.header,
          spacer = this.elements.spacer,
          breakpoint = this.breakpoint,
          // banner = 					$('.section-banner'),
      // bannerBackground = 			banner.find('.content-bg'),
      // bannerText = 				banner.find('.content-text'),
      // row = 						banner.find('.row');
      banner = document.querySelectorAll('.section-banner')[0],
          bannerBackground = banner.querySelectorAll('.content-bg')[0],
          bannerText = banner.querySelectorAll('.content-text')[0],
          row = banner.querySelectorAll('.row')[0]; // console.log(row);

      if (window.innerWidth > 991) {
        bannerBackground.style.height = _getHeight(bannerBackground) + this.spacer[4] + 'px';
        row.style.height = _getHeight(bannerBackground) + 'px'; // bannerBackground.height(bannerBackground.outerHeight(true) + this.spacer[4]);
      }

      if (window.innerWidth <= breakpoint.sm) {
        bannerText.style.marginTop = _getHeight(header) + this.spacer[5] + 'px';
      }

      if (window.innerWidth > breakpoint.xs && window.innerWidth <= breakpoint.sm) {
        // > 414 && < 576 
        var dataHeight = bannerBackground.getAttribute('data-responsive-sm');
        bannerBackground.querySelectorAll('svg')[0].setAttribute('width', "".concat(window.innerWidth, "px"));
        bannerBackground.querySelectorAll('svg')[0].setAttribute('height', "".concat(dataHeight, "px"));
        bannerBackground.querySelectorAll('svg')[0].setAttribute('viewBox', "0 0 1024 ".concat(dataHeight));
      }

      if (window.innerWidth <= breakpoint.xs) {
        // < 414
        var _dataHeight = bannerBackground.getAttribute('data-responsive-xs');

        bannerBackground.querySelectorAll('svg')[0].setAttribute('width', "".concat(window.innerWidth, "px"));
        bannerBackground.querySelectorAll('svg')[0].setAttribute('height', "".concat(_dataHeight, "px"));
        bannerBackground.querySelectorAll('svg')[0].setAttribute('viewBox', "0 0 1180 ".concat(_dataHeight));
      } // Human


      var humanAnimate = function humanAnimate() {
        var value = 400;
        Velocity(document.getElementById('banner--human-body').querySelectorAll('g')[0], {
          // transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, { duration: 2500 }, { 
          transform: ["translate(55.216854, 355.290468)", "translate(55.216854, ".concat(value, ".290468)")]
        }, {
          duration: 2500
        }, {
          transform: ["translate(55.216854, ".concat(value, ".290468)"), "translate(55.216854, 355.290468)"]
        }, {
          duration: 4000,
          complete: humanAnimate
        }); // getElementById('#banner--human-body')
        // .velocity({ transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, { duration: 2500 })
        // .velocity({ transform: [`translate(55.216854, ${value}.290468)`, "translate(55.216854, 355.290468)"] }, { duration: 4000, complete: humanAnimate });
      }; // Trees


      var treesAnimate = function treesAnimate() {
        // let value = Math.round(Math.random() * 1000);
        var valueY = 532;
        var valueX = 432;
        $('#Trees > g').velocity({
          transform: ["translate(480.000000, 489.000000)", "translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)")]
        }, {
          duration: 3500
        }).velocity({
          transform: ["translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)"), "translate(480.000000, 489.000000)"]
        }, {
          duration: 5000,
          complete: treesAnimate
        });
      }; // Trees


      var svgAnimate = function svgAnimate() {
        // let value = Math.round(Math.random() * 1000);
        var value = 1.04;
        bannerBackground.children('svg').velocity({
          transform: ["scale(1)", "scale(".concat(value, ")")]
        }, {
          duration: 3500
        }).velocity({
          transform: ["scale(".concat(value, ")"), "scale(1)"]
        }, {
          duration: 5000,
          complete: svgAnimate
        });
      };

      $('#DESIGNERDEVELOPER').velocity({
        opacity: 0.1
      }, {
        loop: true
      }); // Light Shape

      var lightShapeAnimate = function lightShapeAnimate() {
        // let value = Math.round(Math.random() * 1000);
        var value = 1.04;
        $('#Light-Shape').velocity({
          transform: ["scale(1)", "scale(".concat(value, ")")]
        }, {
          duration: 3500
        }).velocity({
          transform: ["scale(".concat(value, ")"), "scale(1)"]
        }, {
          duration: 5000,
          complete: lightShapeAnimate
        });
      }; // Hand Shake


      var handShakeAnimate = function handShakeAnimate() {
        var hand = Snap.select('#Hand'),
            handBBbox = hand.getBBox();
        var status = true;

        var waveLeft = function waveLeft() {
          hand.animate({
            transform: "r8, ".concat(handBBbox.cx, ", ").concat(handBBbox.y2)
          }, 500);
        };

        var waveRight = function waveRight() {
          hand.animate({
            transform: "r-2, ".concat(handBBbox.cx, ", ").concat(handBBbox.y2)
          }, 500);
        };

        waveRight();
        setInterval(function () {
          if (status) {
            waveLeft();
            status = false;
          } else {
            waveRight();
            status = true;
          }
        }, 500);
      };

      if (!detectMobile.isMobile) {
        humanAnimate(); // treesAnimate();
        // svgAnimate();
        // lightShapeAnimate();
        // handShakeAnimate();
      }
    }
  }, {
    key: "workGrid",
    value: function workGrid() {
      if (window.innerWidth <= 576) {
        $('.section-work .item').css('maxWidth', "".concat(window.innerWidth - 60, "px"));
      }

      var sliderElement = $('.section-work .swiper-container'),
          filterButtonElements = $('.section-work .navigation-tabs a'),
          buttonPrevElement = $('.slide-button-prev'),
          buttonNextElement = $('.slide-button-next'),
          titleElement = $('.section-work .section-title');
      var gallerySlider = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        slidesOffsetBefore: titleElement.position().left,
        slidesOffsetAfter: titleElement.position().left,
        spaceBetween: 32,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".slide-button-next",
          prevEl: ".slide-button-prev"
        }
      });
      buttonPrevElement.on('click', function (e) {
        e.preventDefault(); // gallerySlider.slidePrev();
      });
      buttonNextElement.on('click', function (e) {
        e.preventDefault(); // gallerySlider.slideNext();
      });
      filterButtonElements.on('click', function (e) {
        var $this = $(e.currentTarget),
            li = $('.section-work .navigation-tabs li'),
            $li = $this.parent(),
            target = $($this.data('tab-target')),
            containers = $('.section-work .swiper-container');
        e.preventDefault();
        li.removeClass('active');
        $li.addClass('active'); // containers.hide(400, ()=> {
        // 	target.show(400);
        // 	gallerySlider[$li.index()].update();
        // });

        containers.hide();
        target.show();
        gallerySlider[$li.index()].update();
      });
    }
  }, {
    key: "photoswipeInit",
    value: function photoswipeInit(container, gallerys, thumbnails, database, database_featured) {
      var $pswp = document.querySelectorAll('.pswp')[0],
          $container = document.querySelectorAll(container)[0],
          $gallerys = $container.querySelectorAll(gallerys); // Get Data

      var getCategory = function getCategory(gid, database) {
        var data;

        for (var name in database) {
          if (gid == "category-".concat(name)) {
            data = database[name].data;
            break;
          } else {
            data = database_featured;
            break;
          }
        }

        console.log(data);
        return data;
      }; // Open Photoswipe from URL


      var openFromURL = function openFromURL() {
        var hash = window.location.hash.substring(1);

        if (hash.includes('gid') && hash.includes('pid')) {
          var vars = hash.split('&').slice(1, 3),
              gid = vars[0].substring(4),
              pid = vars[1].substring(4),
              options = {
            arrowEl: true,
            bgOpacity: 0.8,
            index: parseInt(pid.split('-').pop()),
            galleryUID: gid
          };
          var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(gid, database), options);
          gallery.init();
        }
      };

      var thumbnailsOnClick = function thumbnailsOnClick(e) {
        e.preventDefault();
        var $this = e.currentTarget,
            thumbnail = $this,
            gid = $this.closest(gallerys).getAttribute('id'),
            options = {
          arrowEl: true,
          bgOpacity: 0.8,
          index: parseInt($this.getAttribute('data-img-index')),
          galleryUID: gid,
          getThumbBoundsFn: function getThumbBoundsFn(index) {
            // get window scroll Y
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; // optionally get horizontal scroll
            // get position of element relative to viewport

            var rect = thumbnail.getBoundingClientRect(); // w = width

            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width
            };
          }
        };
        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(gid, database), options);
        lightBox.init();
      }; // Loop Gallerys


      $gallerys.forEach(function (element, index) {
        element.querySelectorAll(thumbnails).forEach(function (thumbnail, thumbnailIndex) {
          thumbnail.onclick = function (e) {
            thumbnailsOnClick(e);
          };
        });
      });
      openFromURL();
    }
  }, {
    key: "init",
    value: function init() {
      this.baseConfig();
      this.navigationConfig();
    }
  }]);

  return Theme;
}(); // Add Loading
// document.querySelector('body').insertAdjacentHTML('beforeend', `
// 	<div class="page-loader">
// 		<div class="page-spinner">
// 			<svg viewBox="25 25 50 50">
// 		        <circle cx="50" cy="50" r="20" fill="none" stroke-width="1" stroke-miterlimit="10" />
// 		    </svg>
// 		    <div class="page-logo">
// 		    	<img src="assets/images/logo.png" alt="Payroc Logo">
// 		    </div>
// 	    </div>
//     </div>
// `);
// document.addEventListener('DOMContentLoaded', (e)=> {
// 	let loader = document.querySelector('.page-loader'),
// 		slideOutTime = 600;
// 	setTimeout(()=> {
// 		loader.animate([
// 		// keyframes
// 			{ transform: 'translateY(0)' }, 
// 			{ transform: 'translateY(100%)' }
// 		], { 
// 		// timing options
// 			duration: slideOutTime,
// 		});
// 		setTimeout(()=> {
// 			loader.style.display = 'none';
// 		}, slideOutTime);
// 	}, 600);
// });