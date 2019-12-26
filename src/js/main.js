'use strict';
class Theme {
	constructor(){
		this.spacer = [];
		this.breakpoint = {
			xxs: 320,
			xs : 414,
			sm : 576,
			md : 768,
			lg : 992,
			xl : 1200,
			xxl: 1440,
			xxxl: 1600
		};
		this.elements = {
			contentPage : $('.content-page'),
			header : $('.header'),
			bottomNav : $('.bottom-navigation-wrapper'),
		};
	}
	baseConfig(){
		// Push Spacing
		let temp;
		for (let i = 1; i <= 16; i++){
			temp = temp === undefined ? 2 : temp + temp;
			this.spacer.push(temp);
		}
		$('[data-toggle="tooltip"]').tooltip();
	}
	bannerCofig(){
        let banner = $('.section-banner'),
            bannerBackground = banner.find('.content-bg'),
            row = banner.find('.row');

        bannerBackground.height(bannerBackground.outerHeight(true));
        row.height(bannerBackground.outerHeight(true));
        if (window.innerHeight >= 900){
        }

        // Human
        const humanAnimate = ()=> {
            let value = 400;
			$('#Human > g')
			.velocity({ transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, { duration: 2500 } )
			.velocity({ transform: [`translate(55.216854, ${value}.290468)`, "translate(55.216854, 355.290468)"] }, { duration: 4000, complete: humanAnimate });
		};
        humanAnimate();
        
        // Trees
        const treesAnimate = ()=> {
            // let value = Math.round(Math.random() * 1000);
            let valueY = 532;
            let valueX = 432;
			$('#Trees > g')
			.velocity({ transform: ["translate(480.000000, 489.000000)", `translate(${valueX}.000000, ${valueY}.000000)`] }, { duration: 3500 } )
			.velocity({ transform: [`translate(${valueX}.000000, ${valueY}.000000)`, "translate(480.000000, 489.000000)"] }, { duration: 5000, complete: treesAnimate });
		};
        treesAnimate();

        // Trees
        const svgAnimate = ()=> {
            // let value = Math.round(Math.random() * 1000);
            let value = 1.04;
			bannerBackground.children('svg')
			.velocity({ transform: ["scale(1)", `scale(${value})`] }, { duration: 3500 } )
			.velocity({ transform: [`scale(${value})`, "scale(1)"] }, { duration: 5000, complete: svgAnimate });
		};
        svgAnimate();
        $('#DESIGNERDEVELOPER').velocity({ opacity: 0.1 },{ loop: true },);
        // Light Shape
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
	init(){
		this.baseConfig();
		this.bannerCofig();
	}
}


// Add Loading
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
document.addEventListener('DOMContentLoaded', (e)=> {
	// $(".page-loader").fadeOut(400, ()=> $(".page-loader").remove());

	const theme = new Theme();
	theme.init();

	window.onresize = (e)=> {
		// theme.navigationCofig();
	};
});
