'use strict';
let detectMobile = {
	isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

const _getHeight = (el)=> {
	return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
}

const _getWidth = (el)=> {
	return parseFloat(getComputedStyle(el, null).width.replace("px", ""));
}

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
			body :				document.body,
			contentPage :		document.querySelectorAll('.content-page')[0],
			header :			document.querySelectorAll('.header')[0],
			navigation :		document.querySelectorAll('.header .navigation-menu')[0],
			loader :			document.querySelectorAll('.page-loader')[0]
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
		let header = 		this.elements.header;
		let viewport = 		document.querySelectorAll('html');

		this.elements.navigation.querySelectorAll('ul:first-child a').forEach((element, index)=> {
			element.addEventListener('click', (e)=> {
				e.preventDefault();

				let $this = e.currentTarget,
					href = $this.getAttribute('href'),
					offsetTop = $this.getAttribute('data-offset-top') !== undefined ? $this.getAttribute('data-offset-top') : 0;
				
				$(viewport).animate({
					scrollTop: $(href).offset().top - offsetTop
				}, 500);
			});
		});

		window.addEventListener('scroll', function() {
			viewport[0].scrollTop > _getHeight(header) ? header.classList.add('has-background') : header.classList.remove('has-background');
		});
	}
	bannerCofig(){
		let header = 					this.elements.header,
			spacer = 					this.elements.spacer,
			breakpoint = 				this.breakpoint,
			// banner = 					$('.section-banner'),
            // bannerBackground = 			banner.find('.content-bg'),
            // bannerText = 				banner.find('.content-text'),
            // row = 						banner.find('.row');
			banner = 					document.querySelectorAll('.section-banner')[0],
            bannerBackground = 			banner.querySelectorAll('.content-bg')[0],
            bannerText = 				banner.querySelectorAll('.content-text')[0],
            row = 						banner.querySelectorAll('.row')[0];

			// console.log(row);

		if (window.innerWidth > 991){
			bannerBackground.style.height = _getHeight(bannerBackground) + this.spacer[4] + 'px';
			row.style.height = 				_getHeight(bannerBackground) + 'px';
			// bannerBackground.height(bannerBackground.outerHeight(true) + this.spacer[4]);
		}
		
		if (window.innerWidth <= breakpoint.sm){
			bannerText.style.marginTop = _getHeight(header) + this.spacer[5] + 'px';
		}

		if (window.innerWidth > breakpoint.xs && window.innerWidth <= breakpoint.sm){
			// > 414 && < 576 
			let dataHeight = bannerBackground.getAttribute('data-responsive-sm');
			bannerBackground.querySelectorAll('svg')[0].setAttribute('width', `${window.innerWidth}px`);
			bannerBackground.querySelectorAll('svg')[0].setAttribute('height', `${dataHeight}px`);
			bannerBackground.querySelectorAll('svg')[0].setAttribute('viewBox', `0 0 1024 ${dataHeight}`);
		}
		if (window.innerWidth <= breakpoint.xs){
			// < 414
			let dataHeight = bannerBackground.getAttribute('data-responsive-xs');
			bannerBackground.querySelectorAll('svg')[0].setAttribute('width', `${window.innerWidth}px`);
			bannerBackground.querySelectorAll('svg')[0].setAttribute('height', `${dataHeight}px`);
			bannerBackground.querySelectorAll('svg')[0].setAttribute('viewBox', `0 0 1180 ${dataHeight}`);
		}

        // Human
        const humanAnimate = ()=> {
            let value = 400,
				el = document.getElementById('banner--human-body').querySelectorAll('g')[0];

			el.velocity({ transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, 2500);
			el.velocity({ transform: [`translate(55.216854, ${value}.290468)`, "translate(55.216854, 355.290468)"] }, 4000, humanAnimate);
		};
        
        // Trees
        const treesAnimate = ()=> {
            // let value = Math.round(Math.random() * 1000);
            let valueY = 532, valueX = 432,
				el = document.getElementById('Trees').querySelectorAll('g')[0];

			el.velocity({ transform: ["translate(480.000000, 489.000000)", `translate(${valueX}.000000, ${valueY}.000000)`] }, 3500);
			el.velocity({ transform: [`translate(${valueX}.000000, ${valueY}.000000)`, "translate(480.000000, 489.000000)"] }, 5000, treesAnimate);
		};

        // Trees
        const svgAnimate = ()=> {
            let value = 1,
				el = bannerBackground.children;

			el.velocity({ transform: ["scale(0.97)", `scale(${value})`] }, 3500);
			el.velocity({ transform: [`scale(${value})`, "scale(0.97)"] }, 5000, svgAnimate);
		};
		
		document.getElementById('DESIGNERDEVELOPER').velocity({ opacity: 0.1 },{ loop: true });
		
        // Light Shape
        const lightShapeAnimate = ()=> {
            let value = 1.04,
				el = document.getElementById('Light-Shape');

			el.velocity({ transform: ["scale(1)", `scale(${value})`] }, 3500);
			el.velocity({ transform: [`scale(${value})`, "scale(1)"] }, 5000, lightShapeAnimate);
		};
		
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

		if(!detectMobile.isMobile){
			humanAnimate();
			treesAnimate();
			svgAnimate();
			// lightShapeAnimate();
			handShakeAnimate();
		}
	}
	workGrid(){
		if (window.innerWidth <= 576) {
			$('.section-work .item').css('maxWidth', `${window.innerWidth - 60}px`);
		}

		let sliderElement = $('.section-work .swiper-container'),
			filterButtonElements = $('.section-work .navigation-tabs a'),
			buttonPrevElement = $('.slide-button-prev'),
        	buttonNextElement = $('.slide-button-next'),
			titleElement = $('.section-work .section-title');

		let gallerySlider = new Swiper(sliderElement,{
			slidesPerView: 'auto',
			slidesOffsetBefore: titleElement.position().left,
			slidesOffsetAfter: titleElement.position().left,
			spaceBetween: 32,
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			navigation: {
				nextEl: ".slide-button-next",
				prevEl: ".slide-button-prev",
			}
		});

		buttonPrevElement.on('click', (e)=> {
			e.preventDefault();
			// gallerySlider.slidePrev();
		});
		buttonNextElement.on('click', (e)=> {
			e.preventDefault();
			// gallerySlider.slideNext();
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
	photoswipeInit(container, gallerys, thumbnails, database, database_featured) {
		let $pswp = document.querySelectorAll('.pswp')[0],
			$container = document.querySelectorAll(container)[0],
			$gallerys = $container.querySelectorAll(gallerys);

		// Get Data
		const getCategory = (gid, database)=> {
			let data;
			for(var name in database) {
				if (gid == `category-${name}`){
					data = database[name].data;
					break;
				}
				else{
					data = database_featured;
					break;
				}
			}
			console.log(data);
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

				let gallery = new PhotoSwipe( $pswp, PhotoSwipeUI_Default, getCategory(gid, database), options);
				gallery.init();
			}
		}

		const thumbnailsOnClick = (e)=> {
			e.preventDefault();
			let $this = e.currentTarget,
				thumbnail = $this,
				gid = $this.closest(gallerys).getAttribute('id'),
				options = {
					arrowEl: true,
					bgOpacity: 0.8,
					index:  parseInt($this.getAttribute('data-img-index')),
					galleryUID: gid,
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

			let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, getCategory(gid, database), options);
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