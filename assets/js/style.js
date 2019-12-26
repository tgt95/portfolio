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
      bottomNav: $('.bottom-navigation-wrapper')
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
    key: "bannerCofig",
    value: function bannerCofig() {
      var banner = $('.section-banner'),
          bannerBackground = banner.find('.content-bg'),
          row = banner.find('.row');
      bannerBackground.height(bannerBackground.outerHeight(true));
      row.height(bannerBackground.outerHeight(true));

      if (window.innerHeight >= 900) {} // Human


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
      // const lightShapeAnimate = ()=> {
      //     // let value = Math.round(Math.random() * 1000);
      //     let valueY = '16px';
      //     let valueX = '10px';
      //     console.log(valueY);
      // 	$('#Light-Shape')
      // 	.velocity({ transform: ["translate(0,0)", `translate(${valueX}, ${valueY})`] }, { duration: 3500 } )
      // 	.velocity({ transform: [`translate(${valueX}, ${valueY})`, "translate(0,0)"] }, { duration: 5000, complete: lightShapeAnimate });
      // };
      // lightShapeAnimate();
    }
  }, {
    key: "init",
    value: function init() {
      this.baseConfig();
      this.bannerCofig();
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
// On load


document.addEventListener('DOMContentLoaded', function (e) {
  // $(".page-loader").fadeOut(400, ()=> $(".page-loader").remove());
  var theme = new Theme();
  theme.init();

  window.onresize = function (e) {// theme.navigationCofig();
  };
});