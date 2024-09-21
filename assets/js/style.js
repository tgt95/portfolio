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

var trigger = function trigger(el, eventType) {
  if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
    el[eventType]();
  } else {
    var event = typeof eventType === 'string' ? new Event(eventType, {
      bubbles: true
    }) : eventType;
    el.dispatchEvent(event);
  }
};

var Theme = /*#__PURE__*/function () {
  function Theme() {
    _classCallCheck(this, Theme);

    this.spacer = [];
    this.server = 'https://api.npoint.io/';
    this.data = {
      banner: null
    };
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
      contentPage: document.querySelector('.content-page'),
      header: document.querySelector('.header'),
      footer: document.querySelector('.footer'),
      navigation: document.querySelector('.header .navigation-menu')
    };
  }

  _createClass(Theme, [{
    key: "baseConfig",
    value: function baseConfig() {
      // Push Spacing
      var temp;

      for (var i = 1; i <= 10; i++) {
        temp = temp === undefined ? 2 : temp + temp;
        this.spacer.push(temp);
      } // $('[data-toggle="tooltip"]').tooltip();

    }
  }, {
    key: "navigation",
    value: function navigation() {
      var header = this.elements.header,
          footer = this.elements.footer;
      this.elements.navigation.querySelectorAll('ul:first-child a').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
          e.preventDefault();
          var $this = e.currentTarget,
              href = $this.getAttribute('href'),
              el = document.querySelector(href),
              elRect = el.getBoundingClientRect(),
              offsetTop = $this.getAttribute('data-offset-top') !== undefined ? $this.getAttribute('data-offset-top') : 0; // Native smooth scroll of Browser
          // window.scrollTo({
          // 	top: (elRect.top - document.body.getBoundingClientRect().top - offsetTop), 
          // 	behavior: 'smooth'
          // });

          document.querySelector('html').velocity({
            scrollTop: elRect.top - document.body.getBoundingClientRect().top - offsetTop + 'px'
          }, {
            duration: 400
          });
        });
      });
      window.addEventListener('scroll', function () {
        !detectMobile.isMobile && document.querySelector('html').scrollTop > _getHeight(header) ? header.classList.add('has-background') : header.classList.remove('has-background');
      });
    }
  }, {
    key: "animation",
    value: function animation() {
      var _this = this;

      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // Human
      this.animation.human = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = 400,
            element = document.getElementById('banner--human-body').querySelector('g');
        if (status) element.velocity({
          transform: ["translate(55.216854, 355.290468)", "translate(55.216854, ".concat(value, ".290468)")]
        }, 2500).velocity({
          transform: ["translate(55.216854, ".concat(value, ".290468)"), "translate(55.216854, 355.290468)"]
        }, 4000, _this.animation.human);else element.velocity('stop');
      }; // Trees


      this.animation.trees = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var valueY = 532,
            valueX = 432,
            element = document.getElementById('Trees').querySelector('g');
        if (status) element.velocity({
          transform: ["translate(480.000000, 489.000000)", "translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)")]
        }, 3500).velocity({
          transform: ["translate(".concat(valueX, ".000000, ").concat(valueY, ".000000)"), "translate(480.000000, 489.000000)"]
        }, 5000, _this.animation.trees);else element.velocity('stop');
      }; // Trees


      this.animation.svg = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = 1,
            element = document.querySelector('.section-banner svg');
        if (status) element.velocity({
          transform: ["scale(0.97)", "scale(".concat(value, ")")]
        }, 3500).velocity({
          transform: ["scale(".concat(value, ")"), "scale(0.97)"]
        }, 5000, _this.animation.svg);else element.velocity('stop');
      }; // Light Shape


      this.animation.lightShape = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var value = 1.04,
            element = document.getElementById('Light-Shape');
        if (status) element.velocity({
          transform: ["scale(1)", "scale(".concat(value, ")")]
        }, 3500).velocity({
          transform: ["scale(".concat(value, ")"), "scale(1)"]
        }, 5000, _this.animation.lightShape);else element.velocity('stop');
      }; // Section Profile
      // Profile


      this.animation.profile = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var element = document.getElementById('DESIGNERDEVELOPER');
        if (status) element.velocity({
          opacity: 0.1
        }, {
          loop: true
        });else element.velocity('stop');
      }; // Section Contact
      // Hand Shake


      this.animation.handShake = function () {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var hand = Snap.select('#Hand'),
            handBBbox = hand.getBBox();
        var state = true;

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
          if (state) {
            waveLeft();
            state = false;
          } else {
            waveRight();
            state = true;
          }
        }, 500);
      };

      this.animation.human(status);
      this.animation.trees(status);
      this.animation.svg(status);
      this.animation.lightShape(status);
      this.animation.profile(status);
      this.animation.handShake(status);
    }
  }, {
    key: "testimonialSwiper",
    value: function testimonialSwiper() {
      var testimonialsSlider = new Swiper('.section-testimonials .swiper-container', {
        mousewheel: true,
        keyboard: true,
        parallax: true,
        grabCursor: true,
        loop: true,
        speed: 600,
        pagination: {
          el: ".swiper-pagination",
          clickable: true //- dynamicBullets: true,

        }
      });
    }
  }, {
    key: "workSwiper",
    value: function workSwiper() {
      var _this2 = this;

      if (window.innerWidth <= this.breakpoint.sm && !this.listView) {
        // < 576
        document.querySelectorAll('.section-work .item').forEach(function (el, i) {
          el.style.maxWidth = window.innerWidth - _this2.spacer[6] - _this2.spacer[5] + 'px';
        });
      }

      var filterButtons = document.querySelectorAll('.section-work .navigation-tabs ul a'),
          switchViewButtons = document.querySelectorAll('.section-work .navigation-tabs .switch-view a'),
          switchGirdButton = document.querySelector('.section-work .navigation-tabs .switch-view a[action="grid"]'),
          switchListButton = document.querySelector('.section-work .navigation-tabs .switch-view a[action="list"]'),
          filterLi = document.querySelectorAll('.section-work .navigation-tabs li'),
          buttonPrev = document.querySelectorAll('.section-work .slide-button-prev'),
          buttonNext = document.querySelectorAll('.section-work .slide-button-next'),
          container = document.querySelectorAll('.section-work .swiper-container'),
          row = document.querySelectorAll('.section-work .swiper-container .slide-wrapper'),
          item = document.querySelectorAll('.section-work .swiper-container .slide-wrapper .item'),
          title = document.querySelector('.section-work .section-title'),
          setttings = {
        slidesPerView: 'auto',
        slidesOffsetBefore: title.getBoundingClientRect().left,
        slidesOffsetAfter: title.getBoundingClientRect().left,
        // mousewheel: true,
        keyboard: true,
        parallax: true,
        pagination: {// el: ".swiper-pagination",
          // clickable: true,
          // type: "fraction",
        },
        navigation: {
          nextEl: ".slide-button-next",
          prevEl: ".slide-button-prev"
        },
        breakpoints: {
          576: {
            spaceBetween: 32
          },
          320: {
            spaceBetween: 16
          }
        }
      },
          gallerySlider = new Swiper('.section-work .swiper-container', setttings); // Click Grid view event

      switchGirdButton.addEventListener('click', function (e) {
        e.preventDefault();
        var $this = e.currentTarget;
        switchViewButtons.forEach(function (element, index) {
          return element.classList.remove('active');
        });
        $this.classList.add('active');
        container.forEach(function (element, index) {
          // Show Swiper navigation
          element.querySelector('.swiper-controls').style.display = 'block'; // Remove list view property classes

          element.classList.remove('container');
        });
        row.forEach(function (element, index) {
          return element.classList.remove('row');
        });
        item.forEach(function (element, index) {
          return element.classList.remove('col-md-6');
        });
        gallerySlider = new Swiper('.section-work .swiper-container', setttings);
      }); // Click List view event

      switchListButton.addEventListener('click', function (e) {
        e.preventDefault();
        var $this = e.currentTarget;
        switchViewButtons.forEach(function (element, index) {
          return element.classList.remove('active');
        });
        gallerySlider.forEach(function (element, index) {
          element.destroy();
        });
        $this.classList.add('active');
        filterLi.forEach(function (element, index) {
          if (element.classList[0] == 'active') {
            var target = element.children[0].getAttribute('data-tab-target').substring(1);
            container.forEach(function (element, index) {
              element.getAttribute('id') != target ? element.style.display = 'none' : 0; // Hide Swiper navigation

              element.querySelector('.swiper-controls').style.display = 'none'; // Add list view property classes

              element.classList.add('container');
              row.forEach(function (element, index) {
                return element.classList.add('row');
              });
              item.forEach(function (element, index) {
                return element.classList.add('col-md-6');
              });
            });
          }
        });
      }); // Click Filter tab navigation event

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
      }); // Cheat for open list view by default

      trigger(switchListButton, 'click');
    }
  }, {
    key: "photoswipeInit",
    value: function photoswipeInit(container, gallerys, thumbnails, database) {
      var $pswp = document.querySelector('.pswp'),
          $container = document.querySelector(container),
          $gallerys = $container.querySelectorAll(gallerys); // Get data featured

      var parseDataFeatured = function parseDataFeatured(database) {
        var database_featured = [];

        for (var type in database) {
          database[type].data.forEach(function (item, index) {
            var isFeatured = database[type].data[index].featured;
            typeof isFeatured === 'boolean' && isFeatured ? database_featured.push(item) : 0;
          });
        }

        return database_featured;
      }; // Get Data


      var parseData = function parseData(gid, database) {
        gid = gid.replace('category-', '');
        return gid === 'featured' ? parseDataFeatured(database) : database[gid].data;
      }; // Open Photoswipe from URL


      (function () {
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
          var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, parseData(gid, database), options);
          gallery.init();
        }
      })();

      var thumbnailsOnClick = function thumbnailsOnClick(e) {
        e.preventDefault();
        var thumbnail = e.currentTarget,
            gid = thumbnail.closest(gallerys).getAttribute('id'),
            options = {
          arrowEl: true,
          bgOpacity: 0.8,
          index: parseInt(thumbnail.getAttribute('data-img-index')),
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
        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, parseData(gid, database), options);
        lightBox.init();
      }; // Thumbnails on click


      $gallerys.forEach(function (el, i) {
        el.querySelectorAll(thumbnails).forEach(function (element, index) {
          element.onclick = function (e) {
            thumbnailsOnClick(e);
          };
        });
      });
    }
  }, {
    key: "loading",
    value: function loading() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var des = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Loading...';
      var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'assets/images/logo.svg';
      // Append loading
      document.body.style.overflow = 'hidden';
      document.body.style.display = '';
      document.body.style.backgroundColor = '';
      document.body.insertAdjacentHTML('beforeend', "\n\t\t<div class=\"page-loader\">\n\t\t\t<div class=\"loader-content\"><img class=\"logo-img\" src=\"".concat(src, "\"/>\n\t\t\t\t<div class=\"title mt-2\">").concat(des, "</div>\n\t\t\t</div>\n\t\t</div>\n\t\t"));
      var loader = document.body.querySelector('.page-loader'); // Show the loading overlay

      var showTime = function showTime(doSomthingAfter) {
        setTimeout(function () {
          // Time to show loading - 1s
          document.body.style.overflow = '';
          loader.classList.add('move2Left', 'animated');
          doSomthingAfter();
        }, timeout);
      }; // After animated then remove
      // Set time out for pending the loading do the animation then remove


      showTime(function () {
        return setTimeout(function () {
          return loader.remove();
        }, 1000);
      });
    }
  }, {
    key: "mobileResponsive",
    value: function mobileResponsive() {
      if (detectMobile.isMobile) {
        document.body.classList.add('is-mobile'); // Fix bug for use Navigation bottom

        document.body.style.paddingBottom = _getHeight(this.elements.header) + 'px'; // Turn off animation

        this.animation(false);
      } else {
        // Turn on animation
        this.animation();
      }

      var container = document.querySelector('.section-banner'),
          row = container.querySelector('.row'),
          background = container.querySelector('.content-bg'),
          text = container.querySelector('.content-text'),
          svg = container.querySelector('svg'); // (Desktop: >= 992px)

      if (window.innerWidth >= this.breakpoint.lg) {
        row.style.height = _getHeight(svg) + 'px';
      } // (Tablet: >= 768px and < 992px)


      if (window.innerWidth >= this.breakpoint.md && window.innerWidth < this.breakpoint.lg) {
        var width = parseInt(_getWidth(svg) + this.spacer[4]),
            mt = 320;
        svg.setAttribute('width', "".concat(width, "px"));
        svg.setAttribute('viewBox', "0 0 ".concat(width, " 1093"));
        svg.style.transform = "translate(-164px, -".concat(mt, "px)");
        text.style.marginTop = "".concat(this.spacer[5], "px");
        background.style.height = "".concat(_getHeight(svg) - mt, "px");
      } // (Mobile Large: >= 576 and < 768px)


      if (window.innerWidth >= this.breakpoint.sm && window.innerWidth < this.breakpoint.md) {
        var _width = parseInt(window.innerWidth + this.spacer[5] + 480),
            height = 800;

        svg.setAttribute('width', "".concat(_width, "px"));
        svg.setAttribute('height', "".concat(height, "px"));
        svg.setAttribute('viewBox', "0 0 ".concat(_width, " ").concat(height));
        svg.style.transform = "translateX(-184px)";
        text.style.marginTop = "".concat(this.spacer[5], "px");
        svg.style.marginTop = "-".concat(this.spacer[7] + this.spacer[5], "px");
      } // (Mobile Small: < 576)


      if (window.innerWidth >= this.breakpoint.xxs && window.innerWidth < this.breakpoint.sm) {
        var _width2 = parseInt(window.innerWidth + this.spacer[5] + 480),
            _height = 800;

        svg.setAttribute('width', "".concat(_width2, "px"));
        svg.setAttribute('height', "".concat(_height, "px"));
        svg.setAttribute('viewBox', "0 0 ".concat(1200, " ", _height));
        svg.style.transform = "translateX(-184px)";
        text.style.marginTop = "".concat(this.spacer[5], "px");
        svg.style.marginTop = "-".concat(this.spacer[7] + this.spacer[5], "px");
      } // if (window.innerWidth <= this.breakpoint.lg){
      // 	bannerBackgroundSvg.setAttribute('width', `${window.innerWidth}px`);
      // 	bannerBackgroundSvg.setAttribute('viewBox', `0 0 ${window.innerWidth} 1093`);
      // 	// bannerBackgroundSvg.style.marginLeft = `calc(${window.innerWidth}px - 50%)`;
      // }
      // if (window.innerWidth <= this.breakpoint.sm){
      // 	bannerText.style.marginTop = this.spacer[5] + 'px';
      // }
      // if (window.innerWidth > this.breakpoint.xs && window.innerWidth <= this.breakpoint.sm){
      // 	// > 414 && < 576 
      // 	let dataHeight = bannerBackground.getAttribute('data-responsive-sm--height');
      // 	bannerBackgroundSvg.setAttribute('width', `${window.innerWidth}px`);
      // 	bannerBackgroundSvg.setAttribute('height', `${dataHeight}px`);
      // 	bannerBackgroundSvg.setAttribute('viewBox', `0 0 1024 ${dataHeight}`);
      // }
      // if (window.innerWidth <= this.breakpoint.xs){
      // 	// < 414
      // 	let dataHeight = bannerBackground.getAttribute('data-responsive-xs--height');
      // 	bannerBackgroundSvg.setAttribute('width', `${window.innerWidth}px`);
      // 	bannerBackgroundSvg.setAttribute('height', `${dataHeight}px`);
      // 	bannerBackgroundSvg.setAttribute('viewBox', `0 0 1180 ${dataHeight}`);
      // }

    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this3 = this;

      // Making a GET request
      // Get Banner data
      fetch(this.server + 'df2e5675f00bc58b57ca').then(function (response) {
        return response.json();
      }).then(function (data) {
        // Handle the API response data here
        _this3.data.banner = data; // Section Banner

        var hello = new Typewriter('#section-banner-title', {
          loop: true,
          delay: 75
        }); // hello.paragraph = {
        // 	text_1 : `Hello everyone!`,
        // 	text_2 : `I'm a Product Designer`,
        // 	text_3 : `based in HCMC,VN`,
        // }

        document.getElementById('section-banner-description').textContent = data.description;
        hello.pauseFor(1800) // .typeString(data.title.text_1)
        // .pauseFor(300)
        // .deleteChars(data.title.text_1.length)
        .typeString(data.title.text_2).pauseFor(100).deleteChars(data.title.text_2.length).typeString(data.title.text_3).pauseFor(1000).start();
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.baseConfig();
      this.navigation();
      this.loading();
      this.fetchData();
      this.mobileResponsive();
    }
  }]);

  return Theme;
}();