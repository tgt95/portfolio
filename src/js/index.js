class Theme {
	constructor() {
		this.spacer = [];
		this.server = 'https://api.npoint.io/';
		this.data = {};
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
			navigation: document.querySelector('.header .navigation-menu'),
		};
	}
	baseConfig() {
		// Push Spacing
		let temp;
		for (let i = 1; i <= 10; i++) {
			temp = temp === undefined ? 2 : temp + temp;
			this.spacer.push(temp);
		}
	}
	navigation() {
		let { header, navigation } = this.elements;
			
		navigation.querySelectorAll("ul:first-child a").forEach((link) => {
			link.addEventListener("click", (e) => {
				const targetId = link.getAttribute("href");
				const offsetTop = parseInt(link.getAttribute("data-offset-top")) || 0; // Offset = 0 if it is not defined
				const targetElement = document.querySelector(targetId);

				if (targetElement) {
					e.preventDefault();
					const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offsetTop;
					// window.scrollTo({ top: targetPosition, behavior: "smooth" });
					document.documentElement.velocity({
						scrollTop: targetPosition + 'px'
					}, { duration: 400 });
				}
			});
		});

		window.addEventListener('scroll', () => {
			// Device is not Mobile, and HTML scrollY > <Header> height then toggle class "has-background"
			!detectMobile.isMobile && header.classList.toggle("has-background", window.scrollY > header.offsetHeight);
		});
	}
	appearanceOnTime() {
		const html = document.documentElement;
		const themeToggle = document.getElementById("mode-toggle");

		const applyTheme = () => {
			// Add or remove dark mode class based on the time
			const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;

			// The second parameter can be used to determine whether the class is included or not. This example would include the 'dark-mode' class only if {isNight} is true
			html.classList.toggle("dark-mode", isNight);
			themeToggle.checked = !isNight;
		};

		themeToggle.addEventListener("change", () => {
			html.classList.toggle("dark-mode");
		});

		applyTheme();
	}
	animation(status = true) {
		// Human
		this.animation.human = (status = true) => {
			let value = 32,
				element = document.getElementById('boy');

			if (status) {
				element
					.velocity({ transform: ["translate(0, 0)", `translate(10, ${value})`] }, 2500)
					.velocity({ transform: [`translate(10, ${value})`, "translate(0, 0)"] }, 4000, this.animation.human);
			}
			else {
				element.velocity('stop');
			}
		};

		// Trees
		this.animation.trees = (status = true) => {
			let valueY = 12, valueX = 24,
				element = document.getElementById('trees');

			if (status)
				element
					.velocity({ transform: ["translate(0, 0)", `translate(${valueX}, ${valueY})`] }, 3500)
					.velocity({ transform: [`translate(${valueX}, ${valueY})`, "translate(0, 0)"] }, 5000, this.animation.trees);
			else
				element.velocity('stop');
		};

		// Container
		// this.animation.svg = (status = true)=> {
		//     let value = 1,
		// 		element = document.querySelector('.section-banner svg');

		// 	if(status)
		// 		element
		// 		.velocity({ transform: ["scale(0.97)", `scale(${value})`] }, 3500)
		// 		.velocity({ transform: [`scale(${value})`, "scale(0.97)"] }, 5000, this.animation.svg);
		// 	else
		// 		element.velocity('stop');
		// };

		// Light Shape
		this.animation.lightShape = (status = true) => {
			let value = 1.04,
				element = document.getElementById('light-shape');

			if (status)
				element
					.velocity({ transform: ["scale(1)", `scale(${value})`] }, 3500)
					.velocity({ transform: [`scale(${value})`, "scale(1)"] }, 5000, this.animation.lightShape);
			else
				element.velocity('stop');
		};

		// Section Profile
		// Profile
		this.animation.profile = (status = true) => {
			let element = document.getElementById('DESIGNERDEVELOPER')

			if (status)
				element.velocity({ opacity: 0.1 }, { loop: true });
			else
				element.velocity('stop');
		};


		// Section Contact
		// Hand Shake
		this.animation.handShake = (status = true) => {
			let hand = Snap.select('#Hand'),
				handBBbox = hand.getBBox();

			let state = true;
			const waveLeft = () => {
				hand.animate({ transform: `r8, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			const waveRight = () => {
				hand.animate({ transform: `r-2, ${handBBbox.cx}, ${handBBbox.y2}` }, 500);
			}
			waveRight();
			setInterval(() => {
				if (state) {
					waveLeft();
					state = false;
				}
				else {
					waveRight();
					state = true;
				}
			}, 500)
		};



		this.animation.human(status);
		this.animation.trees(status);
		// this.animation.svg(status);
		this.animation.lightShape(status);

		this.animation.profile(status);

		this.animation.handShake(status);
	}
	testimonialSwiper() {
		new Swiper('.section-testimonials .swiper-container', {
			mousewheel: true,
			keyboard: true,
			parallax: true,
			grabCursor: true,
			loop: true,
			speed: 600,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				//- dynamicBullets: true,
			}
		});
	}
	workSwiper() {
		if (window.innerWidth <= this.breakpoint.sm && !this.listView) {
			// < 576
			document.querySelectorAll('.section-work .item').forEach((el, i) => {
				el.style.maxWidth = window.innerWidth - this.spacer[6] - this.spacer[5] + 'px';
			});
		}

		let filterButtons = document.querySelectorAll('.section-work .navigation-tabs ul a'),
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
				pagination: {
					// el: ".swiper-pagination",
					// clickable: true,
					// type: "fraction",
				},
				navigation: {
					nextEl: ".slide-button-next",
					prevEl: ".slide-button-prev",
				},
				breakpoints: {
					576: {
						spaceBetween: 32,
					},
					320: {
						spaceBetween: 16,
					}
				}
			},
			gallerySlider = new Swiper('.section-work .swiper-container', setttings);

		// Click Grid view event
		switchGirdButton.addEventListener('click', (e) => {
			e.preventDefault();

			let $this = e.currentTarget;

			switchViewButtons.forEach((element, index) => element.classList.remove('active'));
			$this.classList.add('active');

			container.forEach((element, index) => {
				// Show Swiper navigation
				element.querySelector('.swiper-controls').style.display = 'block';

				// Remove list view property classes
				element.classList.remove('container')
			});
			row.forEach((element, index) => element.classList.remove('row'));
			item.forEach((element, index) => element.classList.remove('col-md-6'));

			gallerySlider = new Swiper('.section-work .swiper-container', setttings);
		});

		// Click List view event
		switchListButton.addEventListener('click', (e) => {
			e.preventDefault();

			let $this = e.currentTarget;

			switchViewButtons.forEach((element, index) => element.classList.remove('active'));
			gallerySlider.forEach((element, index) => { element.destroy() });
			$this.classList.add('active');

			filterLi.forEach((element, index) => {
				if (element.classList[0] == 'active') {
					let target = element.children[0].getAttribute('data-tab-target').substring(1);

					container.forEach((element, index) => {
						element.getAttribute('id') != target ? element.style.display = 'none' : 0;

						// Hide Swiper navigation
						element.querySelector('.swiper-controls').style.display = 'none';

						// Add list view property classes
						element.classList.add('container');
						row.forEach((element, index) => element.classList.add('row'));
						item.forEach((element, index) => element.classList.add('col-md-6'));
					});
				}
			});
		});

		// Click Filter tab navigation event
		filterButtons.forEach((element, index) => {
			element.addEventListener('click', (e) => {
				e.preventDefault();

				let $this = e.currentTarget,
					$ul = $this.parentNode.parentNode,
					$li = $this.parentNode,
					dataTarget = $this.getAttribute('data-tab-target'),
					target = document.querySelector(dataTarget),
					containers = document.querySelectorAll('.section-work .swiper-container');

				filterLi.forEach((el, i) => el.classList.remove('active'));
				$li.classList.add('active');
				containers.forEach((el, i) => {
					if (getComputedStyle(el, null).display !== 'none') {
						el.velocity({ opacity: 0 }, 200, () => {
							el.style.display = 'none';
						});
					}
				});
				target.velocity({ opacity: 1 }, 200, () => {
					target.style.display = 'block';
					$ul.querySelectorAll('li').forEach((el, i) => {
						if (el.classList.contains('active')) {
							gallerySlider[i].update();
						}
					});
				});
			});
		});

		// Cheat for open list view by default
		trigger(switchListButton, 'click');
	}
	photoswipeInit(container, gallerys, thumbnails, database) {
		let $pswp = document.querySelector('.pswp'),
			$container = document.querySelector(container),
			$gallerys = $container.querySelectorAll(gallerys);

		// Get data featured
		const parseDataFeatured = (database) => {
			let database_featured = [];
			for (var type in database) {
				database[type].data.forEach((item, index) => {
					let isFeatured = database[type].data[index].featured;
					(typeof (isFeatured) === 'boolean') && isFeatured ? database_featured.push(item) : 0;
				});
			}
			return database_featured;
		}

		// Get Data
		const parseData = (gid, database) => {
			gid = gid.replace('category-', '');
			return gid === 'featured' ? parseDataFeatured(database) : database[gid].data;
		}

		// Open Photoswipe from URL
		(() => {
			let hash = window.location.hash.substring(1);
			if (hash.includes('gid') && hash.includes('pid')) {
				let vars = hash.split('&').slice(1, 3),
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

		const thumbnailsOnClick = (e) => {
			e.preventDefault();

			let thumbnail = e.currentTarget,
				gid = thumbnail.closest(gallerys).getAttribute('id'),
				options = {
					arrowEl: true,
					bgOpacity: 0.8,
					index: parseInt(thumbnail.getAttribute('data-img-index')),
					galleryUID: gid,
					getThumbBoundsFn: (index) => {
						// get window scroll Y
						var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
						// optionally get horizontal scroll

						// get position of element relative to viewport
						var rect = thumbnail.getBoundingClientRect();

						// w = width
						return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
					}
				};

			let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, parseData(gid, database), options);
			lightBox.init();
		}

		// Thumbnails on click
		$gallerys.forEach((el, i) => {
			el.querySelectorAll(thumbnails).forEach((element, index) => {
				element.onclick = (e) => { thumbnailsOnClick(e) }
			});
		});
	}
	loading(timeout = 1000, description = 'Loading...', src = 'assets/images/logo.svg') {
		let loader, loaderHTML = `
			<div class="page-loader">
				<div class="loader-content"><img class="logo-img" src="${src}"/>
					<div class="page-loader-title mt-2">${description}</div>
				</div>
			</div>`;

		// Append loading
		document.body.style.overflow = 'hidden';
		document.body.style.display = '';
		document.body.style.backgroundColor = '';
		document.body.insertAdjacentHTML('beforeend', loaderHTML);

		loader = document.body.querySelector('.page-loader');

		setTimeout(() => {
			// Time to show loading - 1s
			document.body.style.overflow = '';
			loader.classList.add('move2Left', 'animated');
			loader.addEventListener("animationend", () => loader.remove());
		}, timeout);
	}
	mobileResponsive() {
		let container = document.querySelector('.section-banner'),
			row = container.querySelector('.row'),
			background = container.querySelector('.content-bg'),
			text = container.querySelector('.content-text'),
			svg = container.querySelector('svg');

		if (detectMobile.isMobile) {
			document.body.classList.add('is-mobile');

			// Fix bug for use Navigation bottom
			document.body.style.paddingBottom = this.elements.header.offsetHeight + 'px';

			// Turn off animation
			this.animation(false);
		}
		else {
			// Turn on animation
			this.animation();
		}

		// (Desktop: >= 992px)
		if (window.innerWidth >= this.breakpoint.lg) {
			row.style.height = _getHeight(svg) + 'px';
		}

		// (Tablet: >= 768px and < 992px)
		if (window.innerWidth >= this.breakpoint.md && window.innerWidth < this.breakpoint.lg) {
			let width = parseInt(_getWidth(svg) + this.spacer[4]),
				mt = 320;

			svg.setAttribute('width', `${width}px`);
			svg.setAttribute('viewBox', `0 0 ${width} 1093`);
			svg.style.transform = `translate(-164px, -${mt}px)`;

			text.style.marginTop = `${this.spacer[5]}px`;
			background.style.height = `${_getHeight(svg) - mt}px`;
		}

		// (Mobile Large: >= 576 and < 768px)
		if (window.innerWidth >= this.breakpoint.sm && window.innerWidth < this.breakpoint.md) {
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
		if (window.innerWidth >= this.breakpoint.xxs && window.innerWidth < this.breakpoint.sm) {
			let width = parseInt(window.innerWidth + this.spacer[5] + 480),
				height = 800;

			svg.setAttribute('width', `${width}px`);
			svg.setAttribute('height', `${height}px`);
			svg.setAttribute('viewBox', `0 0 ${1200} ${height}`);
			svg.style.transform = `translateX(-184px)`;

			text.style.marginTop = `${this.spacer[5]}px`;
			svg.style.marginTop = `-${this.spacer[7] + this.spacer[5]}px`;
		}
		// }
	}
	fetchData() {
		// Making a GET request

		// Get Banner data
		fetch(this.server + 'df2e5675f00bc58b57ca').then(response => response.json())
			.then(data => {
				// Handle the API response data here
				this.data = data;

				// Sort the date by the index (Only apply for Arrray)
				this.data.profile = data.profile.sort((a, b) => a.index - b.index)

				// Section Banner
				document.getElementById('section-banner-description').textContent = this.data.introduce.description;

				let hello = new Typewriter('#section-banner-title', {
					loop: true,
					delay: 75,
				});

				hello
					.pauseFor(1800)
					// .typeString(this.data.introduce.title.text_1)
					// .pauseFor(300)
					// .deleteChars(this.data.introduce.title.text_1.length)
					.typeString(this.data.introduce.title.text_2)
					.pauseFor(100)
					.deleteChars(this.data.introduce.title.text_2.length)
					.typeString(this.data.introduce.title.text_3)
					.pauseFor(1000)
					.start();

				// Section Profile
				this.data.profile.forEach((item, i) => {
					let element = '';
					if (item.activated) {
						if (item.type == 'dob') {
							element = `
							<li>
								<div class="title">${item.label}</div>
								<span>${item.value} &nbsp;</span>
								<i style="color: var(--fg-main);">
									(age ${new Date().getFullYear() - item.birthYear})
								</i>
							</li>
						`
						}
						else if (item.type == 'email') {
							element = `
							<li data-type="email">
								<div class="title">${item.label}</div>
								<div class="content">
									<a class= href="mailto:${item.value}">${item.value}</a>
									<i class="${item.iconClassName != undefined ? item.iconClassName : ''}" style="color: ${item.textColor != undefined ? item.textColor : ' '};"></i>
								</div>
							</li>
						`
						}
						else if (item.type == 'phone') {
							element = `
							<li data-type="phone">
								<div class="title">${item.label}</div>
								<div class="content">
									<a class= href="mailto:${item.value}">${item.value}</a>
									<i class="${item.iconClassName != undefined ? item.iconClassName : ''}" style="color: ${item.textColor != undefined ? item.textColor : ' '};"></i>
								</div>
							</li>
						`
						}
						else if (item.type == 'social') {
							element = `
							<li data-type="social">
								<div class="title">${item.label}</div>
								<div class="content">
									<a href="${item.href}">${item.value}</a>
									<i class="${item.iconClassName != undefined ? item.iconClassName : ''}" style="color: ${item.textColor != undefined ? item.textColor : ' '};"></i>
								</div>
							</li>
						`
						}
						else if (item.type == 'exp') {
							element = `
							<li>
								<div class="title">${item.label}</div>
								<span>
									${(new Date().getFullYear() - 1) - item.value}
									&nbsp;yrs+ &nbsp;<i style="color: var(--fg-subtlest);">(${item.value} - Present)</i>
								</span>
							</li>
						`
						}
						else if (item.type == 'personality') {
							element = `
							<li class="align-items-center"><div class="personality-progress"><div class="label"><span><b>Introvert </b>(${item.value})</span><span><b>Extrovert</b></span></div><div class="holder"><div class="tracker"></div><span class="emoji">${item.emoji}</span></div></div></li>
						`
						}
						else {
							element = `
							<li>
								<div class="title">${item.label}</div>
								<span>${item.value}</span>
							</li>
						`
						}
						document.getElementById('section-profile-content').insertAdjacentHTML('beforeend', element);
					}
				})

				// Section Testimonials
				this.data.testimonial.forEach((item, i) => document.getElementById('section-testimonials-content').insertAdjacentHTML('beforeend', `
					<div class=swiper-slide>
						<i class="icon-quotes ri-double-quotes-l" style="color: var(--fg-decor);"></i>
						<div class=testimonials-description>${item.message}</div>
						<div class=testimonials-author-content>
							<div class=testimonials-author-content-left>
								<img class=testimonials-author-avatar src=${item.avatar}>
							</div>
							<div class=testimonials-author-content-right>
								<div class=testimonials-author-name>
									${item.author}
									<a href="${item.linkedin}">
										<i class=ri-linkedin-box-fill></i>
									</a>
								</div>
								<div class=testimonials-author-role>${item.role}</div>
							</div>
						</div>
					</div>`) 
				)

				// Section Footer
				let footer = new Typewriter('#section-footer-description', {
					loop: true,
					delay: 75,
					cursor: '',
					deleteSpeed: 'fast'
				});

				footer
					// .pauseFor(1800)
					.typeString(this.data.footer.text_1)
					// .pauseFor(100)
					.deleteChars(this.data.footer.text_1.length - 3)
					.typeString(this.data.footer.text_2)
					.deleteChars(this.data.footer.text_2.length - 3)
					.pauseFor(100)
					.start();
			})
			.catch(err => console.error(err))
	}
	init() {
		this.baseConfig();
		this.navigation();
		this.loading();
		this.fetchData();
		this.mobileResponsive();
	}
}