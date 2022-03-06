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
			contentPage :		document.querySelector('.content-page'),
			header :			document.querySelector('.header'),
			footer :			document.querySelector('.footer'),
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
	navigation(){
		let header = this.elements.header,
			footer = this.elements.footer;

		this.elements.navigation.querySelectorAll('ul:first-child a').forEach((element, index)=> {
			element.addEventListener('click', (e)=> {
				e.preventDefault();

				let $this 		= e.currentTarget,
					href		= $this.getAttribute('href'),
					el 			= document.querySelector(href),
					elRect		= el.getBoundingClientRect(),
					offsetTop 	= $this.getAttribute('data-offset-top') !== undefined ? $this.getAttribute('data-offset-top') : 0;

				// Native smooth scroll of Browser
				// window.scrollTo({
				// 	top: (elRect.top - document.body.getBoundingClientRect().top - offsetTop), 
				// 	behavior: 'smooth'
				// });
				
				document.querySelector('html').velocity({
					scrollTop: (elRect.top - document.body.getBoundingClientRect().top - offsetTop) + 'px'
				}, { duration: 400 });
			});
		});

		window.addEventListener('scroll', ()=> {
			!detectMobile.isMobile && (document.querySelector('html').scrollTop > _getHeight(header)) ? header.classList.add('has-background') : header.classList.remove('has-background');
		});
	}
	animation(status = true){
		// Section Banner
		var hello = new Typewriter('#hello-world', {
			loop: true,
			delay: 75,
		});

		hello.paragraph = {
			text_1 : `Hello everyone!`,
			text_2 : `I'm a UX/UI Designer`,
			text_3 : `based in HCMC/VN`,
		}
		
		hello
			.pauseFor(2200)
			.typeString(hello.paragraph.text_1)
			.pauseFor(300)
			.deleteChars(hello.paragraph.text_1.length)
			.typeString(hello.paragraph.text_2)
			// .pauseFor(100)
			// .typeString(hello.paragraph.text_3)
			.pauseFor(1000)
			.start();

        // Human
        this.animation.human = (status = true)=> {
			let value = 400,
				element = document.getElementById('banner--human-body').querySelector('g');
			
			if(status)
				element
				.velocity({ transform: ["translate(55.216854, 355.290468)", `translate(55.216854, ${value}.290468)`] }, 2500)
				.velocity({ transform: [`translate(55.216854, ${value}.290468)`, "translate(55.216854, 355.290468)"] }, 4000, this.animation.human);
			else
				element.velocity('stop');
		};
		
        // Trees
        this.animation.trees = (status = true)=> {
			let valueY = 532, valueX = 432,
				element = document.getElementById('Trees').querySelector('g');
			
			if(status)
				element
				.velocity({ transform: ["translate(480.000000, 489.000000)", `translate(${valueX}.000000, ${valueY}.000000)`] }, 3500)
				.velocity({ transform: [`translate(${valueX}.000000, ${valueY}.000000)`, "translate(480.000000, 489.000000)"] }, 5000, this.animation.trees);
			else
				element.velocity('stop');
		};

        // Trees
		this.animation.svg = (status = true)=> {
            let value = 1,
				element = document.querySelector('.section-banner svg');
			
			if(status)
				element
				.velocity({ transform: ["scale(0.97)", `scale(${value})`] }, 3500)
				.velocity({ transform: [`scale(${value})`, "scale(0.97)"] }, 5000, this.animation.svg);
			else
				element.velocity('stop');
		};
		
        // Light Shape
		this.animation.lightShape = (status = true)=> {
            let value = 1.04,
				element = document.getElementById('Light-Shape');
			
			if(status)
				element
				.velocity({ transform: ["scale(1)", `scale(${value})`] }, 3500)
				.velocity({ transform: [`scale(${value})`, "scale(1)"] }, 5000, this.animation.lightShape);
			else
				element.velocity('stop');
		};

		// Section Profile
        // Profile
		this.animation.profile = (status = true)=> {
            let element = document.getElementById('DESIGNERDEVELOPER')
			
			if(status)
				element.velocity({ opacity: 0.1 },{ loop: true });
			else
				element.velocity('stop');
			};
			

		// Section Contact
		// Hand Shake
		this.animation.handShake = (status = true)=> {
			let hand = Snap.select('#Hand'),
			handBBbox = hand.getBBox();

			console.log(hand);
			
			let state = true;
			const waveLeft = ()=> {
				hand.animate({ transform: `r8, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			const waveRight = ()=> {
				hand.animate({ transform: `r-2, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			waveRight();
			setInterval(()=> {
				if(state){
					waveLeft();
					state = false;
				}
				else{
					waveRight();
					state = true;
				}
			}, 500)
		};

		this.animation.human(status);
		this.animation.trees(status);
		this.animation.svg(status);
		this.animation.lightShape(status);

		this.animation.profile(status);
		
		this.animation.handShake(status);
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
			title			= document.querySelector('.section-work .section-title'),
			gallerySlider 	= new Swiper('.section-work .swiper-container',{
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
		let $pswp = document.querySelector('.pswp'),
			$container = document.querySelector(container),
			$gallerys = $container.querySelectorAll(gallerys);

		// Get data featured
		const parseDataFeatured = (database)=> {
			let database_featured = [];
			for(var type in database) {
				database[type].data.forEach((item, index)=> {
					let isFeatured = database[type].data[index].featured;
					(typeof(isFeatured) === 'boolean') && isFeatured ? database_featured.push(item) : 0;
				});
			}
			return database_featured;
		}

		// Get Data
		const parseData = (gid, database)=> {
			gid = gid.replace('category-','');
			return gid === 'featured' ? parseDataFeatured(database) : database[gid].data;
		}

		// Open Photoswipe from URL
		(()=> {
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
				let gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, parseData(gid, database), options);
				gallery.init();
			}
		})();

		const thumbnailsOnClick = (e)=> {
			e.preventDefault();
			
			let thumbnail = e.currentTarget,
				gid = thumbnail.closest(gallerys).getAttribute('id'),
				options = {
					arrowEl: true,
					bgOpacity: 0.8,
					index:  parseInt(thumbnail.getAttribute('data-img-index')),
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

			let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, parseData(gid, database), options);
			lightBox.init();
		}

		// Thumbnails on click
		$gallerys.forEach((el, i)=> {
			el.querySelectorAll(thumbnails).forEach((element, index)=> {
				element.onclick = (e)=> { thumbnailsOnClick(e) }
			});
		});
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
	mobileResponsive(){
		if(detectMobile.isMobile) {
			document.body.classList.add('is-mobile');

			// Fix bug for use Navigation bottom
			document.body.style.paddingBottom = _getHeight(this.elements.header) + 'px';

			// Turn off animation
			this.animation(false);
		}
		else{
			this.animation();
		}

		let container			= document.querySelector('.section-banner'),
			row					= container.querySelector('.row'),
            background			= container.querySelector('.content-bg'),
            text				= container.querySelector('.content-text'),
            svg					= container.querySelector('svg');

		// (Desktop: >= 992px)
		if (window.innerWidth >= this.breakpoint.lg){
			row.style.height = _getHeight(svg) + 'px';
		}

		// (Tablet: >= 768px and < 992px)
		if (window.innerWidth >= this.breakpoint.md && window.innerWidth < this.breakpoint.lg){
			let width = parseInt(_getWidth(svg) + this.spacer[4]),
				mt = 320;
				
			svg.setAttribute('width', `${width}px`);
			svg.setAttribute('viewBox', `0 0 ${width} 1093`);
			svg.style.transform = `translate(-164px, -${mt}px)`;
			
			text.style.marginTop = `${this.spacer[5]}px`;
			background.style.height = `${_getHeight(svg) - mt}px`;
		}

		// (Mobile Large: >= 576 and < 768px)
		if (window.innerWidth >= this.breakpoint.sm && window.innerWidth < this.breakpoint.md){
			let width = parseInt(window.innerWidth + this.spacer[5] + 480),
				height = 800;
				
			svg.setAttribute('width', `${width}px`);
			svg.setAttribute('height', `${height}px`);
			svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
			svg.style.transform = `translateX(-184px)`;

			text.style.marginTop = `${this.spacer[5]}px`;
			svg.style.marginTop = `-${this.spacer[7] + this.spacer[5]}px`;
		}

		// (Mobile Small: < 576)
		if (window.innerWidth >= this.breakpoint.xxs && window.innerWidth < this.breakpoint.sm){
			let width = parseInt(window.innerWidth + this.spacer[5] + 480),
				height = 800;
				
			svg.setAttribute('width', `${width}px`);
			svg.setAttribute('height', `${height}px`);
			svg.setAttribute('viewBox', `0 0 ${1200} ${height}`);
			svg.style.transform = `translateX(-184px)`;

			text.style.marginTop = `${this.spacer[5]}px`;
			svg.style.marginTop = `-${this.spacer[7] + this.spacer[5]}px`;
		}
		// if (window.innerWidth <= this.breakpoint.lg){
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
	init(){
		this.baseConfig();
		this.navigation();
		this.loading();
		this.mobileResponsive();
	}
}