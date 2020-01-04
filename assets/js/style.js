'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Theme =
/*#__PURE__*/
function () {
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
      contentPage: $('.content-page'),
      header: $('.header'),
      navigation: $('.header .navigation-menu')
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
      this.elements.navigation.find('ul:first-child a').on('click', function () {
        event.preventDefault();
        var offsetTop = $(this).data('offset-top') !== undefined ? $(this).data('offset-top') : 0;
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
        }, 500);
      });
      var header = this.elements.header;
      $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        scrollTop > 64 ? header.addClass('has-background') : header.removeClass('has-background');
      });
    }
  }, {
    key: "bannerCofig",
    value: function bannerCofig() {
      var banner = $('.section-banner'),
          bannerBackground = banner.find('.content-bg'),
          row = banner.find('.row');

      if (window.innerWidth > 991) {
        bannerBackground.height(bannerBackground.outerHeight(true));
        row.height(bannerBackground.outerHeight(true));
      }

      if (window.innerWidth <= 576 && window.innerWidth > 414) {
        var height = bannerBackground.data('responsive-sm');
        bannerBackground.find('svg').attr('width', "".concat(window.innerWidth, "px"));
        bannerBackground.find('svg').attr('height', "".concat(height, "px"));
        bannerBackground.find('svg').attr('viewBox', "0 0 1024 ".concat(height));
      }

      if (window.innerWidth <= 414) {
        var _height = bannerBackground.data('responsive-xs');

        bannerBackground.find('svg').attr('width', "".concat(window.innerWidth, "px"));
        bannerBackground.find('svg').attr('height', "".concat(_height, "px"));
        bannerBackground.find('svg').attr('viewBox', "0 0 1180 ".concat(_height));
      } // Human


      var humanAnimate = function humanAnimate() {
        var value = 400;
        $('#Human > g').velocity({
          transform: ["translate(55.216854, 355.290468)", "translate(55.216854, ".concat(value, ".290468)")]
        }, {
          duration: 2500
        }).velocity({
          transform: ["translate(55.216854, ".concat(value, ".290468)"), "translate(55.216854, 355.290468)"]
        }, {
          duration: 4000,
          complete: humanAnimate
        });
      };

      humanAnimate(); // Trees

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
      };

      treesAnimate(); // Trees

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

      svgAnimate();
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
      };

      lightShapeAnimate(); // Hand Shake

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

      handShakeAnimate();
    }
  }, {
    key: "workGrid",
    value: function workGrid() {
      if (window.innerWidth <= 576) {
        $('.section-work .item').css('maxWidth', "".concat(window.innerWidth - 60, "px"));
      }

      var sliderElement = $('.section-work .swiper-container'),
          filterButtonElements = $('.section-work .navigation-tabs a'),
          titleElement = $('.section-work .section-title');
      var gallerySlider = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        slidesOffsetBefore: titleElement.position().left,
        slidesOffsetAfter: titleElement.position().left,
        spaceBetween: 32
      });
      filterButtonElements.on('click', function (e) {
        var $this = $(e.currentTarget),
            li = $('.section-work .navigation-tabs li'),
            $li = $this.parent(),
            target = $($this.data('tab-target')),
            containers = $('.section-work .swiper-container');
        e.preventDefault();
        li.removeClass('active');
        $li.addClass('active');
        containers.hide(400, function () {
          target.show(400);
          gallerySlider[$li.index()].update();
        });
      });
    }
  }, {
    key: "photoswipeInit",
    value: function photoswipeInit(container, gallerys, thumbnails) {
      var $pswp = document.querySelectorAll('.pswp')[0],
          $container = document.querySelectorAll(container)[0],
          $gallerys = $container.querySelectorAll(gallerys); // Get Data

      var getCategory = function getCategory(type) {
        var data;

        switch (type) {
          case 'category-web':
            data = webItems;
            break;

          case 'category-app':
            data = appItems;
            break;

          case 'category-branding':
            data = brandingItems;
            break;
        }

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
          var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(gid), options);
          gallery.init();
        }
      };

      var thumbnailsOnClick = function thumbnailsOnClick(e) {
        e.preventDefault();
        var $this = e.currentTarget,
            thumbnail = $this,
            type = $this.closest(gallerys).getAttribute('id'),
            options = {
          arrowEl: true,
          bgOpacity: 0.8,
          index: parseInt($this.getAttribute('data-img-index')),
          galleryUID: type,
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
        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(type), options);
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