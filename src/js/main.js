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
			navigation : $('.header .navigation-menu'),
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
	navigationConfig(){
		this.elements.navigation.find('ul:first-child a').on('click', function() {
			event.preventDefault();
			let offsetTop = $(this).data('offset-top') !== undefined ? $(this).data('offset-top') : 0;
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
			}, 500);
		});

		let header = this.elements.header;
		$(window).scroll(function(){
			let scrollTop = $(this).scrollTop();
			scrollTop > 64 ? header.addClass('has-background') : header.removeClass('has-background');
		});
	}
	bannerCofig(){
        let banner = $('.section-banner'),
            bannerBackground = banner.find('.content-bg'),
            row = banner.find('.row');

		if (window.innerWidth > 991){
			bannerBackground.height(bannerBackground.outerHeight(true));
			row.height(bannerBackground.outerHeight(true));
		}
		
		if (window.innerWidth <= 576 && window.innerWidth > 414){
			let height = bannerBackground.data('responsive-sm');
			bannerBackground.find('svg').attr('width', `${window.innerWidth}px`);
			bannerBackground.find('svg').attr('height', `${height}px`);
			bannerBackground.find('svg').attr('viewBox', `0 0 1024 ${height}`);
		}
		if (window.innerWidth <= 414){
			let height = bannerBackground.data('responsive-xs');
			bannerBackground.find('svg').attr('width', `${window.innerWidth}px`);
			bannerBackground.find('svg').attr('height', `${height}px`);
			bannerBackground.find('svg').attr('viewBox', `0 0 1180 ${height}`);
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
        const lightShapeAnimate = ()=> {
            // let value = Math.round(Math.random() * 1000);
            let value = 1.04;
			$('#Light-Shape')
			.velocity({ transform: ["scale(1)", `scale(${value})`] }, { duration: 3500 } )
			.velocity({ transform: [`scale(${value})`, "scale(1)"] }, { duration: 5000, complete: lightShapeAnimate });
		};
		lightShapeAnimate();

		// Hand Shake
		const handShakeAnimate = ()=> {
			let hand = Snap.select('#Hand'),
			handBBbox = hand.getBBox();
		
			let status = true;
			const waveLeft = ()=> {
				hand.animate({ transform: `r8, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			const waveRight = ()=> {
				hand.animate({ transform: `r-2, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			waveRight();
			setInterval(()=> {
				if(status){
					waveLeft();
					status = false;
				}
				else{
					waveRight();
					status = true;
				}
			}, 500)
		};
		handShakeAnimate();
	}
	workGrid(){
		if (window.innerWidth <= 576){
			$('.section-work .item').css('maxWidth', `${window.innerWidth - 60}px`);
		}

		let sliderElement = $('.section-work .swiper-container'),
			filterButtonElements = $('.section-work .navigation-tabs a'),
			titleElement = $('.section-work .section-title');

		let gallerySlider = new Swiper(sliderElement,{
			slidesPerView: 'auto',
			slidesOffsetBefore: titleElement.position().left,
			slidesOffsetAfter: titleElement.position().left,
			spaceBetween: 32
		});

		filterButtonElements.on('click', (e)=> {
			let $this = $(e.currentTarget),
				li = $('.section-work .navigation-tabs li'),
				$li = $this.parent(),
				target = $($this.data('tab-target')),
				containers = $('.section-work .swiper-container');
				
			e.preventDefault();
			li.removeClass('active');
			$li.addClass('active');
			// containers.hide(400, ()=> {
			// 	target.show(400);
			// 	gallerySlider[$li.index()].update();
			// });
			containers.hide();
			target.show();
			gallerySlider[$li.index()].update();
			
		});
	}
	photoswipeInit(container, gallerys, thumbnails) {
		let $pswp = document.querySelectorAll('.pswp')[0],
			$container = document.querySelectorAll(container)[0],
			$gallerys = $container.querySelectorAll(gallerys);

		// Get Data
		const getCategory = (type)=> {
			let data;
			switch (type){
				case 'category-web' :
					data = webItems
					break;
				case 'category-app' :
					data = appItems
					break;
				case 'category-branding' :
					data = brandingItems
					break;
					case 'category-illustration' :
						data = illustrationItems
						break;
			}
			return data;
		}

		// Open Photoswipe from URL
		const openFromURL = ()=> {
			let hash = window.location.hash.substring(1);
			if (hash.includes('gid') && hash.includes('pid')){
				let vars = hash.split('&').slice(1,3),
					gid = vars[0].substring(4),
					pid = vars[1].substring(4),
					options = {
						arrowEl: true,
						bgOpacity: 0.8,
						index: parseInt(pid.split('-').pop()),
						galleryUID: gid,
					};

				let gallery = new PhotoSwipe( $pswp, PhotoSwipeUI_Default, getCategory(gid), options);
				gallery.init();
			}
		}

		const thumbnailsOnClick = (e)=> {
			e.preventDefault();
			let $this = e.currentTarget,
				thumbnail = $this,
				type = $this.closest(gallerys).getAttribute('id'),
				options = {
					arrowEl: true,
					bgOpacity: 0.8,
					index:  parseInt($this.getAttribute('data-img-index')),
					galleryUID: type,
					getThumbBoundsFn: (index)=> {
						// get window scroll Y
						var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
						// optionally get horizontal scroll

						// get position of element relative to viewport
						var rect = thumbnail.getBoundingClientRect();

						// w = width
						return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
					}
				};

			let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(type), options);
			lightBox.init();
		}

		// Loop Gallerys
		$gallerys.forEach((element, index)=> {
			element.querySelectorAll(thumbnails).forEach((thumbnail, thumbnailIndex)=> {
				thumbnail.onclick = (e)=> { thumbnailsOnClick(e) }
			});
		});
		openFromURL();
	}
	init(){
		this.baseConfig();
		this.navigationConfig();
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