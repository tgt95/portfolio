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
      body: document.body,
      contentPage: document.querySelector('.content-page'),
      header: document.querySelector('.header'),
      navigation: document.querySelector('.header .navigation-menu'),
      loader: document.querySelector('.page-loader')
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
      } // $('[data-toggle="tooltip"]').tooltip();

    }
  }, {
    key: "navigationConfig",
    value: function navigationConfig() {
      var header = this.elements.header;
      this.elements.navigation.querySelectorAll('ul:first-child a').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
          e.preventDefault();
          var $this = e.currentTarget,
              href = $this.getAttribute('href'),
              el = document.querySelectorAll(href)[0],
              elRect = el.getBoundingClientRect(),
              offsetTop = $this.getAttribute('data-offset-top') !== undefined ? $this.getAttribute('data-offset-top') : 0;
          window.scrollTo({
            top: elRect.top - document.body.getBoundingClientRect().top - offsetTop,
            behavior: 'smooth'
          });
        });
      });
      window.addEventListener('scroll', function () {
        document.querySelector('html').scrollTop > _getHeight(header) ? header.classList.add('has-background') : header.classList.remove('has-background');
      });
    }
  }, {
    key: "bannerCofig",
    value: function bannerCofig() {
      var banner = document.querySelector('.section-banner'),
          bannerBackground = banner.querySelector('.content-bg'),
          bannerText = banner.querySelector('.content-text'),
          row = banner.querySelector('.row'),
          bannerBackgroundSvg = bannerBackground.querySelector('svg');

      if (window.innerWidth > this.breakpoint.lg) {
        // > 992
        bannerBackground.style.height = _getHeight(bannerBackground) + this.spacer[4] + 'px';
        row.style.height = _getHeight(bannerBackground) + 'px';
        bannerBackgroundSvg.setAttribute('width', "1374px");
        bannerBackgroundSvg.setAttribute('height', "1093px");
        bannerBackgroundSvg.setAttribute('viewBox', '0 0 1374 1093');
      }

      if (window.innerWidth <= this.breakpoint.sm) {
        bannerText.style.marginTop = _getHeight(this.elements.header) + this.spacer[5] + 'px';
      }

      if (window.innerWidth > this.breakpoint.xs && window.innerWidth <= this.breakpoint.sm) {
        // > 414 && < 576 
        var dataHeight = bannerBackground.getAttribute('data-responsive-sm');
        bannerBackgroundSvg.setAttribute('width', "".concat(window.innerWidth, "px"));
        bannerBackgroundSvg.setAttribute('height', "".concat(dataHeight, "px"));
        bannerBackgroundSvg.setAttribute('viewBox', "0 0 1024 ".concat(dataHeight));
      }

      if (window.innerWidth <= this.breakpoint.xs) {
        // < 414
        var _dataHeight = bannerBackground.getAttribute('data-responsive-xs');

        bannerBackgroundSvg.setAttribute('width', "".concat(window.innerWidth, "px"));
        bannerBackgroundSvg.setAttribute('height', "".concat(_dataHeight, "px"));
        bannerBackgroundSvg.setAttribute('viewBox', "0 0 1180 ".concat(_dataHeight));
      } // Human


      var humanAnimate = function humanAnimate() {
        var value = 400,
            el = document.getElementById('banner--human-body').querySelector('g');
        el.velocity({
          transform: ["translate(55.216854, 355.290468)", "translate(55.216854, ".concat(value, ".290468)")]
        }, 2500);
        el.velocity({
          transform: ["translate(55.216854, ".concat(value, ".290468)"), "translate(55.216854, 355.290468)"]
        }, 4000, humanAnimate);
      }; // Trees


      var treesAnimate = function treesAnimate() {
        // let value = Math.round(Math.random() * 1000);
        var valueY = 532,
            valueX = 432,
            el = document.getElementById('Trees').querySelector('g');
        el.velocity({
          transform: ["translate(480.000000, 489.000000)", "translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)")]
        }, 3500);
        el.velocity({
          transform: ["translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)"), "translate(480.000000, 489.000000)"]
        }, 5000, treesAnimate);
      }; // Trees


      var svgAnimate = function svgAnimate() {
        var value = 1,
            el = bannerBackground.children;
        el.velocity({
          transform: ["scale(0.97)", "scale(".concat(value, ")")]
        }, 3500);
        el.velocity({
          transform: ["scale(".concat(value, ")"), "scale(0.97)"]
        }, 5000, svgAnimate);
      };

      document.getElementById('DESIGNERDEVELOPER').velocity({
        opacity: 0.1
      }, {
        loop: true
      }); // Light Shape

      var lightShapeAnimate = function lightShapeAnimate() {
        var value = 1.04,
            el = document.getElementById('Light-Shape');
        el.velocity({
          transform: ["scale(1)", "scale(".concat(value, ")")]
        }, 3500);
        el.velocity({
          transform: ["scale(".concat(value, ")"), "scale(1)"]
        }, 5000, lightShapeAnimate);
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

      if (!detectMobile.isMobile) {// humanAnimate();
        // treesAnimate();
        // svgAnimate();
        // lightShapeAnimate();
        // handShakeAnimate();
      }
    }
  }, {
    key: "workGrid",
    value: function workGrid() {
      var _this = this;

      if (window.innerWidth <= this.breakpoint.sm) {
        // < 576
        document.querySelectorAll('.section-work .item').forEach(function (el, i) {
          el.style.maxWidth = window.innerWidth - _this.spacer[6] - _this.spacer[5] + 'px';
        });
      }

      var slider = document.querySelectorAll('.section-work .swiper-container'),
          filterButtons = document.querySelectorAll('.section-work .navigation-tabs a'),
          filterLi = document.querySelectorAll('.section-work .navigation-tabs li'),
          buttonPrev = document.querySelectorAll('.section-work .slide-button-prev'),
          buttonNext = document.querySelectorAll('.section-work .slide-button-next'),
          title = document.querySelector('.section-work .section-title');
      var gallerySlider = new Swiper('.section-work .swiper-container', {
        slidesPerView: 'auto',
        slidesOffsetBefore: title.getBoundingClientRect().left,
        slidesOffsetAfter: title.getBoundingClientRect().left,
        spaceBetween: 32,
        breakpoints: {
          576: {
            spaceBetween: 32
          },
          320: {
            mousewheel: true,
            keyboard: true,
            // slidesPerView: 1,
            spaceBetween: 16,
            allowSlidePrev: true,
            allowSlideNext: true
          }
        } // pagination: {
        // 	el: ".swiper-pagination",
        // 	type: "fraction",
        // },
        // navigation: {
        // 	nextEl: ".slide-button-next",
        // 	prevEl: ".slide-button-prev",
        // }

      }); // gallerySlider.slidePrev();
      // gallerySlider.slideNext();
      // buttonPrev.on('click', (e)=> {
      // 	e.preventDefault();
      // });
      // buttonNext.on('click', (e)=> {
      // 	e.preventDefault();
      // });

      filterButtons.forEach(function (element, index) {
        element.addEventListener('click', function (e) {
          e.preventDefault();
          var $this = e.currentTarget,
              $ul = $this.parentNode.parentNode,
              $li = $this.parentNode,
              dataTarget = $this.getAttribute('data-tab-target'),
              target = document.querySelector(dataTarget),
              containers = document.querySelectorAll('.section-work .swiper-container');
          filterLi.forEach(function (el, i) {
            return el.classList.remove('active');
          });
          $li.classList.add('active');
          containers.forEach(function (el, i) {
            if (getComputedStyle(el, null).display !== 'none') {
              el.velocity({
                opacity: 0
              }, 200, function () {
                el.style.display = 'none';
              });
            }
          });
          target.velocity({
            opacity: 1
          }, 200, function () {
            target.style.display = 'block';
            $ul.querySelectorAll('li').forEach(function (el, i) {
              if (el.classList.contains('active')) {
                gallerySlider[i].update();
              }
            });
          });
        });
      }); // filterButtons.on('click', (e)=> {
      // 	let $this = $(e.currentTarget),
      // 		li = $('.section-work .navigation-tabs li'),
      // 		$li = $this.parent(),
      // 		target = $($this.data('tab-target')),
      // 		containers = $('.section-work .swiper-container');
      // 	e.preventDefault();
      // 	li.removeClass('active');
      // 	$li.addClass('active');
      // 	containers.hide();
      // 	target.show();
      // 	gallerySlider[$li.index()].update();
      // });
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


      $gallerys.forEach(function (el, i) {
        el.querySelectorAll(thumbnails).forEach(function (thumbnail, thumbnailIndex) {
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