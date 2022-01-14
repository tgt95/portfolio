'use strict';
let detectMobile = {
	isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

const _getHeight = el => {
	return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
}

const _getWidth = el => {
	return parseFloat(getComputedStyle(el, null).width.replace("px", ""));
}

class Theme {
	constructor(callback){
		this.data;
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
			contentPage :		document.querySelector('.content-page'),
			header :			document.querySelector('.header'),
			navigation :		document.querySelector('.header .navigation-menu'),
		};
	}
	baseConfig(){
		// Push Spacing
		let temp;
		for (let i = 1; i <= 10; i++){
			temp = temp === undefined ? 2 : temp + temp;
			this.spacer.push(temp);
		}
		// $('[data-toggle="tooltip"]').tooltip();
	}
	navigationConfig(){
		let header = this.elements.header;

		this.elements.navigation.querySelectorAll('ul:first-child a').forEach((element, index)=> {
			element.addEventListener('click', (e)=> {
				e.preventDefault();

				let $this 		= e.currentTarget,
					href		= $this.getAttribute('href'),
					el 			= document.querySelectorAll(href)[0],
					elRect		= el.getBoundingClientRect(),
					offsetTop 	= $this.getAttribute('data-offset-top') !== undefined ? $this.getAttribute('data-offset-top') : 0;

				window.scrollTo({
					top: (elRect.top - document.body.getBoundingClientRect().top - offsetTop), 
					behavior: 'smooth'
				});
			});
		});

		window.addEventListener('scroll', ()=> {
			document.querySelector('html').scrollTop > _getHeight(header) ? header.classList.add('has-background') : header.classList.remove('has-background');
		});
	}
	bannerCofig(){
		let banner				= document.querySelector('.section-banner'),
            bannerBackground 	= banner.querySelector('.content-bg'),
            bannerText			= banner.querySelector('.content-text'),
            row					= banner.querySelector('.row'),
            bannerBackgroundSvg = bannerBackground.querySelector('svg');

		if (window.innerWidth > this.breakpoint.lg){
			// > 992
			bannerBackground.style.height	= _getHeight(bannerBackground) + this.spacer[4] + 'px';
			row.style.height				= _getHeight(bannerBackground) + 'px';
			bannerBackgroundSvg.setAttribute('width', `1374px`);
			bannerBackgroundSvg.setAttribute('height', `1093px`);
			bannerBackgroundSvg.setAttribute('viewBox', '0 0 1374 1093');
		}
		
		if (window.innerWidth <= this.breakpoint.sm){
			bannerText.style.marginTop = _getHeight(this.elements.header) + this.spacer[5] + 'px';
		}

		if (window.innerWidth > this.breakpoint.xs && window.innerWidth <= this.breakpoint.sm){
			// > 414 && < 576 
			let dataHeight = bannerBackground.getAttribute('data-responsive-sm--height');
			bannerBackgroundSvg.setAttribute('width', `${window.innerWidth}px`);
			bannerBackgroundSvg.setAttribute('height', `${dataHeight}px`);
			bannerBackgroundSvg.setAttribute('viewBox', `0 0 1024 ${dataHeight}`);
		}
		if (window.innerWidth <= this.breakpoint.xs){
			// < 414
			let dataHeight = bannerBackground.getAttribute('data-responsive-xs--height');
			bannerBackgroundSvg.setAttribute('width', `${window.innerWidth}px`);
			bannerBackgroundSvg.setAttribute('height', `${dataHeight}px`);
			bannerBackgroundSvg.setAttribute('viewBox', `0 0 1180 ${dataHeight}`);
		}

        // Human
        const humanAnimate = ()=> {
            let value = 400,
				el = document.getElementById('banner--human-body').querySelector('g');

			el.velocity({ transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, 2500);
			el.velocity({ transform: [`translate(55.216854, ${value}.290468)`, "translate(55.216854, 355.290468)"] }, 4000, humanAnimate);
		};
        
        // Trees
        const treesAnimate = ()=> {
            // let value = Math.round(Math.random() * 1000);
            let valueY = 532, valueX = 432,
				el = document.getElementById('Trees').querySelector('g');

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
			// humanAnimate();
			// treesAnimate();
			// svgAnimate();
			// lightShapeAnimate();
			// handShakeAnimate();
		}
	}
	workGrid(){
		if (window.innerWidth <= this.breakpoint.sm) {
			// < 576
			document.querySelectorAll('.section-work .item').forEach((el, i)=> {
				el.style.maxWidth = window.innerWidth - this.spacer[6] - this.spacer[5] + 'px';
			});
		}

		let filterButtons	= document.querySelectorAll('.section-work .navigation-tabs a'),
			filterLi		= document.querySelectorAll('.section-work .navigation-tabs li'),
			buttonPrev		= document.querySelectorAll('.section-work .slide-button-prev'),
			buttonNext		= document.querySelectorAll('.section-work .slide-button-next'),
			title			= document.querySelector('.section-work .section-title');

		let gallerySlider = new Swiper('.section-work .swiper-container',{
			slidesPerView: 'auto',
			slidesOffsetBefore: title.getBoundingClientRect().left,
			slidesOffsetAfter: title.getBoundingClientRect().left,
			spaceBetween: 32,
			// mousewheel: true,
			keyboard: true,
			pagination: {
				// el: ".swiper-pagination",
				// clickable: true,
				// type: "fraction",
			},
			// navigation: {
				// nextEl: ".slide-button-next",
				// prevEl: ".slide-button-prev",
			// },
			breakpoints: {
				576: {
					spaceBetween: 32,
				},
				320: {
					spaceBetween: 16,
				}
			}
		});

		filterButtons.forEach((element, index)=> {
			element.addEventListener('click', (e)=> {
				e.preventDefault();

				let $this			= e.currentTarget,
					$ul				= $this.parentNode.parentNode,
					$li				= $this.parentNode,
					dataTarget		= $this.getAttribute('data-tab-target'),
					target			= document.querySelector(dataTarget),
					containers		= document.querySelectorAll('.section-work .swiper-container');
				
				filterLi.forEach((el, i)=> el.classList.remove('active'));
				$li.classList.add('active');
				containers.forEach((el, i)=> {
					if (getComputedStyle(el, null).display !== 'none'){
						el.velocity({ opacity: 0 }, 200, ()=> { 
							el.style.display = 'none';
						});
					}
				});
				target.velocity({ opacity: 1 }, 200, ()=> { 
					target.style.display = 'block';
					$ul.querySelectorAll('li').forEach((el, i)=> {
						if(el.classList.contains('active')){
							gallerySlider[i].update();
						}
					});
				});
			});
		});
	}
	photoswipeInit(container, gallerys, thumbnails, database) {
		this.data = database;
		let $pswp = document.querySelector('.pswp'),
			$container = document.querySelector(container),
			$gallerys = $container.querySelectorAll(gallerys);

		// Get Data
		const getCategory = (gid, database)=> {
			let data, database_featured = [];

			for(var type in database) {

				// Get data featured
				database[type].data.forEach((item, index)=> {
					let isFeatured = database[type].data[index].featured;
					(typeof(isFeatured) === 'boolean') && isFeatured ? database_featured.push(item) : 0;
				})

				if (gid === `category-${type}`){
					data = database[type].data;
					break;
				}
				else{
					data = database_featured;
					break;
				}
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
		$gallerys.forEach((el, i)=> {
			el.querySelectorAll(thumbnails).forEach((thumbnail, thumbnailIndex)=> {
				thumbnail.onclick = (e)=> { thumbnailsOnClick(e) }
			});
		});
		openFromURL();
	}
	loading(timeout = 1000, des = 'Loading...', src = 'assets/images/logo.svg'){
		// Append loading
		document.body.style.overflow = 'hidden';
		document.body.insertAdjacentHTML('beforeend', `
		<div class="page-loader">
			<div class="loader-content"><img class="logo-img" src="${src}"/>
				<div class="title mt-2">${des}</div>
			</div>
		</div>
		`);

		let loader = document.body.querySelector('.page-loader');

		// Show the loading overlay
		const showTime = (doSomthingAfter)=> {
			setTimeout(()=> {
				// Time to show loading - 1s
				document.body.style.overflow = '';
				loader.classList.add('move2Left', 'animated');
				doSomthingAfter();
			}, timeout);
		}

		// After animated then remove
		// Set time out for pending the loading do the animation then remove
		showTime(()=> setTimeout(()=> loader.remove(), 1000));
	}
	init(){
		this.baseConfig();
		this.navigationConfig();
		this.loading();
	}
}