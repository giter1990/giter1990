let payment = document.getElementById("payment");

function cardElems() {
	return ([
		document.querySelectorAll("#platinum-card, #gold-card, #silver-card"),
		document.querySelectorAll("#platinum-score, #gold-score, #silver-score"),
		document.querySelectorAll("#platinum-descr, #gold-descr, #silver-descr")
	]);
}

function payDim() {
	if (window.innerHeight < 993) {
		payment.style.height = (window.innerHeight - 100) + "px";
		payment.style.overflow = "auto";
	}
}

window.addEventListener("DOMContentLoaded", () => {
	let anyElem = document.querySelectorAll("*:not(html, body, .container, .container > *, #burger)"),
		bonum = document.getElementById("bonum"),
		reviewsSlider = document.querySelectorAll("#prev, #next"),
		bodyDoc = document.getElementById("bodyDoc"),
		btnRecord = document.querySelectorAll("#btn-header, #btn-menu, #btn-know, #btn-whom"),
		cross = document.getElementById("cross"),
		curtain = document.getElementById("curtain"),
		popup = document.getElementById("popup");
	
	anyElem.forEach(item => {
		item.addEventListener("mouseover", e => {
			switch (e.target) {
				case bonum.childNodes[0]:
				case reviewsSlider[0]:
				case reviewsSlider[1]:
					item.style.transition = "0s";
					break;
				default: 
					item.style.transition = ".5s";
			}
		});
		
		item.addEventListener("mouseout", e => {
			item.style.transition = "0s";
		})
	});
	
	// Functions
	function showModal(windowUnit) {
		curtain.style.display = "block";
		curtain.style.animation = "opacity 1s forwards";
		windowUnit.style.display = "flex";
		windowUnit.style.animation = "opacity 2s";
	}
	
	function hideModal(windowUnit) {
		if (windowUnit.style.display = "block") {
			windowUnit.style.display = "none";
			curtain.style.display = "none";
		}
	}
	
	function pattern(label, input, btn, wrapper, mod = "", e) {
		e.preventDefault();
		
		let errors = wrapper.querySelectorAll(".record__error");
		
		for (let i = 0; i < errors.length; i++) {
			errors[i].remove();
		}
		
		for (let i = 0; i < input.length; i++) {
			if (!input[i].value) {
				let error = document.createElement("div");
				
				error.classList.add("record__error");
				
				if (mod == null) {
					mod = "";
				}
				
				error.classList.add("record__error" + (i + 1) + mod);
				
				if (i == 0) {
					error.innerHTML = "Введите имя";
				} else if (i == 1) {
					error.innerHTML = "Введите номер телефона";
				} else {
					error.innerHTML = "Введите почту";
				}
				
				// Неверный формат номера телефона
								
				wrapper.appendChild(error);
				
				if (i <= 1) {
					wrapper.insertBefore(error, label[i + 1]);
				} else {
					wrapper.insertBefore(error, btn);
				}
			}
		}
		
		if (/[^a-zа-яё]/i.test(input[0].value)) {
			let error = document.createElement("div");
				
			error.classList.add("record__error");
			error.innerHTML = "Неверное имя";
			wrapper.appendChild(error);
			wrapper.insertBefore(error, label[1]);
		}
	}
	
	// Video
	let playWrapper = document.getElementById("video"),
		iframe = document.getElementById("frame"),
		play = document.getElementById("play");
		
	play.addEventListener("click", e => {
		e.preventDefault();
		
		play.style.display = "none";
		playWrapper.style.alignItems = "stretch";
		iframe.style.display = "block";
	});
	
	// Timer
	let id = setInterval(() => {
		let daysSet = document.querySelector("days"),
			progressDay = document.getElementById("progress-day"),
			progressHour = document.getElementById("progress-hour"),
			progressMinute = document.getElementById("progress-minute"),
			progressSecond = document.getElementById("progress-second"),
			dayStart = 20,
			dayDiff,
			dayTotal = 11,
			d = new Date(),
			dateEnd = new Date();
		
		dateEnd.setSeconds = 0;
		dateEnd.setMinutes = 0;
		dateEnd.setHours = 24;
		dateEnd.setDate = 31;
		
		/* Секунды */
		let seconds = d.getSeconds(),
			secondsEnd;
		
		secondsEnd = (seconds == 0) ? 00 : 60 - seconds; 
		
		/* Минуты */
		let minutes = d.getMinutes(),
			minutesEnd;
			
		if ((seconds == 0) && (minutes == 0)) {
			minutesEnd = minutes;
		} else if (seconds == 0) {
			minutesEnd = 60 - minutes;
		} else {
			minutesEnd = 60 - (minutes + 1);
		}
		
		/* Часы */
		let hours = d.getHours(),
			hoursEnd;
		
		hoursEnd = ((minutes == 0) && (seconds == 0)) ? (24 - hours) : (24 - (hours + 1));
		
		/* Дни */
		let days = d.getDate(),
			daysEnd;
		
		if ((hours == 0) && (minutes == 0) && (seconds == 0)) {
			daysEnd = dateEnd.setDate - (days - 1);
		} else {
			daysEnd = dateEnd.setDate - days;
		};
		
		if (daysEnd == 0) {
			daysSet.style.display = "none";
		};
		
		if (secondsEnd < 10) {
			second.innerHTML = "0" + secondsEnd;
		} else {
			second.innerHTML = secondsEnd;
		}
		
		if (minutesEnd < 10) {
			minute.innerHTML = "0" + minutesEnd;
		} else {
			minute.innerHTML = minutesEnd;
		}
		
		if (hoursEnd < 10) {
			hour.innerHTML = "0" + hoursEnd;
		} else {
			hour.innerHTML = hoursEnd;
		}
		
		if (daysEnd < 10) {
			day.innerHTML = "0" + daysEnd;
		} else {
			day.innerHTML = daysEnd;
		}
		
		progressSecond.style.width = (secondsEnd / 60 * 100) + "%";
		
		if (secondsEnd !== 0) {
			minutesEnd = minutesEnd + (secondsEnd / 60);
		}
		
		progressMinute.style.width = (minutesEnd / 60 * 100) + "%";
		
		if (((secondsEnd !== 0) && (minutesEnd !== 0)) || ((secondsEnd == 0) && (minutesEnd !== 0)) || ((secondsEnd == 0) && (minutesEnd !== 0))) {
			hoursEnd = hoursEnd + (minutesEnd / 60);
		}
		progressHour.style.width = (hoursEnd / 24 * 100) + "%";
		
		dayDiffPass = d.getDate() - dayStart;
		dayLeft = dayTotal - dayDiffPass ;
		
		if ((hoursEnd !== 0) && (minutesEnd == 0)) {
			dayLeft = dayLeft + (hoursEnd / 24);
		} else if ((hoursEnd !== 0) && (minutesEnd !== 0)) {
			dayLeft = dayLeft + ((hoursEnd - 1) / 24) + (minutesEnd / 60 / 24);
		} else if ((hoursEnd == 0) && (minutesEnd !== 0)) {
			dayLeft = dayLeft + (minutesEnd / 60 / 24);
		}
		
		progressDay.style.width = (dayLeft / dayTotal * 100) + "%";
		
	}, 1000);
	
	// Menu
	let burger = document.getElementById("burger"),
		menu = document.getElementById("menu");
		
	burger.addEventListener("click", () => {
		burger.classList.toggle("cross");
		menu.classList.toggle("down");
		if ((bodyDoc.classList.contains("webinar")) || (bodyDoc.classList.contains("thanks"))) {
			btnRecord[0].classList.add("menu__btn_active");
		}
	});
	
	btnRecord.forEach(item => {
		item.addEventListener("click", e => {
			if ((bodyDoc.classList.contains("webinar")) || (bodyDoc.classList.contains("thanks"))) {
				e.preventDefault();
				showModal(popup);
			}
		});
	});
	
	cross.addEventListener("click", () => {
		hideModal(popup);
	});
	
	// Validate
	let formUnit = document.querySelectorAll("#record-master, #record-want, #record-popup"),
		fields0 = document.querySelectorAll("#record-master .record__field"),
		fields1 = document.querySelectorAll("#record-want .record__field"),
		fields2 = document.querySelectorAll("#record-popup .record__field"),
		labels = document.querySelectorAll("#record-master .record__title, #record-want .record__title, #record-popup .record__title"),
		labels0 = document.querySelectorAll("#record-master .record__title"),
		labels1 = document.querySelectorAll("#record-want .record__title"),
		labels2 = document.querySelectorAll("#record-popup .record__title"),
		submitBtns = document.querySelectorAll("#btn-master, #btn-want, #btn-popup"),
		submitBtn0 = document.querySelector("#btn-master"),
		submitBtn1 = document.querySelector("#btn-want"),
		submitBtn2 = document.querySelector("#btn-popup");
	
	formUnit.forEach(function(item, i) {
		if (i == 0) {
			item.addEventListener("submit", pattern.bind(null, labels0, fields0, submitBtn0, item, "_master"));
		} else if (i == 1) {
			item.addEventListener("submit", pattern.bind(null, labels1, fields1, submitBtn1, item, "_want"));
		} else if (i == 2) {
			item.addEventListener("submit", pattern.bind(null, labels2, fields2, submitBtn2, item, "_popup"));
		}
	});
	
	// Chat
	let chat = document.getElementById("chat");
	
	chat.addEventListener("click", function(e) {
		e.preventDefault();
		
		if (!(bodyDoc.classList.contains("webinar"))) {
			window.open("webinar.html#messenger", "_blank");
		} else {
			window.open("webinar.html#messenger", "_self");
		}
	});
			
	// Pages
	if (!(bodyDoc.classList.contains("webinar")) && !(bodyDoc.classList.contains("thanks"))) {
		// Play
		let watch = document.getElementById("watch");
		
		watch.addEventListener("click", function(e) {
			e.preventDefault();
			window.open("index.html#video", "_self");
		}); 
		
		// Know
		let btns = document.querySelectorAll("#btn-promo, #btn-reasons");
		
		btns.forEach(function(item) {
			item.addEventListener("click", function(e) {
				e.preventDefault();
				window.open("index.html#details", "_self");
			});
		});
		
		// Take part
		btnRecord.forEach(item => {
			item.addEventListener("click", e => {
				e.preventDefault();
				showModal(popup);
			});
		});
		
		curtain.addEventListener("click", () => {
			hideModal(popup);
		});	
		
		cross.addEventListener("click", () => {
			hideModal(popup);
		});
	}
	
	if (bodyDoc.classList.contains("webinar")) {
		
		// Messenger
		let messenger = document.getElementById("messenger"),
			container = document.createElement("form"),
			txtAElem = document.getElementById("txt"),
			btnMessenger = document.getElementById("commentsBtn");
		
		txtAElem.parentNode.insertBefore(container, txtAElem);
		container.appendChild(txtAElem);
		container.appendChild(btnMessenger)
		
		messenger.appendChild(container);
		container.classList.add("comments__chat");
		
		// Card
		cardElems()[1].forEach(function(item, i) {
			item.addEventListener("click", () => {
				if (window.matchMedia("(max-width: 1366px)").matches) {
					cardElems()[0][i].classList.toggle("products__card_active");
					item.classList.toggle("products__title_active");
					cardElems()[2][i].classList.toggle("products__descr_active");
				}
			});
		});
			
		// Buy
		let buy = document.querySelectorAll("#buy-platinum, #buy-gold, #buy-silver"),
			name = document.getElementById("product"),
			price = document.getElementById("price"),
			productsTitle = document.querySelectorAll("#platinum-title, #gold-title, #silver-title"),
			productsPrice = document.querySelectorAll("#platinum-price, #gold-price, #silver-price");
		
		buy.forEach(function(item, i) {
			item.addEventListener("click", e => {
				e.preventDefault();
				
				showModal(payment);
				document.body.style.overflow = "hidden";
				
				payDim();
							
				name.innerHTML = productsTitle[i].innerHTML;
				price.innerHTML = productsPrice[i].innerHTML;				
			});
			
			curtain.addEventListener("click", () => {
				hideModal(payment);
				document.body.style.overflow = "";
			});
		})
		
		// Payment
		let question = document.getElementById("question"),
			promptText = document.getElementById("prompt");
			
		question.addEventListener("mouseover", () => {
			promptText.style.animation = "opacity 1s forwards";
		});
		
		question.addEventListener("mouseout", () => {
			promptText.style.animation = "none";
		});
		
		// Slider-reviews
		let	prev = document.querySelector('#prev'),
			next = document.querySelector('#next'),
			tnsSet = document.querySelector(".reviews__pack, .tns-slider, .tns-carousel, .tns-subpixel, .tns-calc, .tns-horizontal"),
			tnsGroup = document.querySelectorAll(".reviews__board, .tns-item"),
			slider = tns({
				container: ".reviews__pack",
				items: 1,
				slideBy: 1,
				autoplay: true,
				autoplayButtonOutput: false,
				autoplayTimeout: 2500,
				controls: false,
				navContainer: "ul.reviews__dots",
				navPosition: "bottom",
				responsive: {
					768: {
						autoplay: false,
						controlsContainer: ".reviews__arrows",
						fixedWidth: 240,
						items: 3,
						mouseDrag: true,
						nav: false,
						preventScrollOnTouch: "force"
					},
					1025: {
						fixedWidth: 255
					},
					1367: {
						fixedWidth: 308
					}
				}
			});
		
		prev.addEventListener("click", function() {
			slider.goTo("prev");
		});

		next.addEventListener("click", function() {
			slider.goTo("next");
		});
	}
	
	if (bodyDoc.classList.contains("thanks")) {
		// Present
		let btnPresent = document.getElementById("btn-present"),
			curtain = document.getElementById("curtain"),
			getPresent = document.getElementById("get-present");
		
		btnPresent.addEventListener("click", e => {
			e.preventDefault();
			showModal(getPresent);
		});
		
		curtain.addEventListener("click", () => {
			hideModal(getPresent);
		})	
	}	
});

window.addEventListener("scroll", () => {
	// Load
	let	progresses = document.querySelectorAll("#progress-01, #progress-02, #progress-03"),
		progress01 = document.getElementById("progress-01"),
		progress02 = document.getElementById("progress-02"),
		progress03 = document.getElementById("progress-03"),
		textCard = document.querySelectorAll("#text-01, #text-02, #text-03"),
		card = document.querySelectorAll("#card-01, #card-02, #card-03");
		
	progresses.forEach(function(item, i) {
		if (isElementInViewport(item)) {
			item.style.animation = "progress 2s forwards";
			card[i].style.animation = "expand-card 1s forwards";
			let id = setTimeout(function() {
				textCard[i].style.display = "block";
				textCard[i].style.animation = "opacity-text 3s forwards";
			}, 1000);
		}
	});
		
	function isElementInViewport(elem) {
		let rect = elem.getBoundingClientRect();

		return (
			(rect.top >= 0) &&
			(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) 
		);
	}
});

window.addEventListener("resize", () => {
	if (window.innerWidth >= 1367) {
		cardElems()[0].forEach((item, i) => {
			if (!(item.classList.contains("products__card_active"))) {
				item.classList.add("products__card_active");
				cardElems()[1][i].classList.add("products__title_active");
				cardElems()[2][i].classList.add("products__descr_active");
			}
		});
	}
	
	payDim();
})