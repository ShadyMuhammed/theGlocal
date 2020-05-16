import helper from "./helper"
import loadmore from './loadmore_media'




let functions = {}

functions.expand_and_collapse = (el_1, el_2, class_1, class_2) => {
	el_1 = document.querySelector(el_1)
	if (el_1) {
		el_1.onclick = () => {
			el_1.classList.toggle(class_1)
			document.querySelector(el_2).classList.toggle(class_2);
		}
	}
}


functions.header_nav = () =>{
	let header_links = document.querySelectorAll(".header__main-list-item a")
	if (helper.page_type() == "home") {
		header_links[0].classList.add("active")
	}
	if(helper.page_type() == "section") {
		switch(helper.selector_id('app-box').getAttribute("section-name")){
			case  "اخر الاخبار" :
				header_links[1].classList.add("active");
				break;
			case  "عرب" :
				header_links[2].classList.add("active");
				break;
			case  "تركى" :
				header_links[3].classList.add("active");
				break;
			case  "بوليود" :
				header_links[4].classList.add("active");
				break;	
			case  "منوعات" :
				header_links[5].classList.add("active");
				break;
			case  "عالمي" :
				header_links[6].classList.add("active");
				break;
			case  "زمان" :
				header_links[7].classList.add("active");
				break;
			case  "رياضة" :
				header_links[8].classList.add("active");
				break;
				default:
					
			}

	}
	
}
functions.header_cover = () =>{
	let cover = helper.selector_query(".header__cover"),
		_app = helper.selector_id("app"),
		cover_cards = helper.selector_query_all(".top-cover"),
		side_banner = helper.selector_query(".side-banner"),
		_event = true,
		mainSection = helper.selector_query(".main-section"),
		main_header = helper.selector_query(".header");
		setTimeout(()=>{
			if (screen.width >= 1024) {
				_app.style.marginTop = "305px";
			}else{
				for (let i = 0; i < cover_cards.length; i++) {
					cover_cards[i].classList.add("news-card--switch")
				}
				_app.style.marginTop = "464px";
			}
			
			
			// cover.classList.add("active");
			// main_header.style.position = "relative";
		},1000);
		window.onscroll = () =>{
			if ((window.innerHeight + window.scrollY) >= (mainSection.offsetHeight - 100) && _event == true && helper.page_type() == "single" ){
				console.log("end of the page")
				loadmore.loadNews();
				_event =false;
				  
			
			}
			if (screen.width >= 1024) {
				if (window.pageYOffset > 300 && window.pageYOffset < 350) {
					main_header.style.top = "-50px";
					main_header.style.position = "relative";
				}
				 else if (window.pageYOffset >= 350) {
					side_banner.style.position = "fixed";
					side_banner.style.top ="80px"
					main_header.style.position = "fixed";
					main_header.style.top = "0px";
			   }
				else
				{
					side_banner.style.top ="80px";
					side_banner.style.position = "absolute";
					main_header.style.position = "relative";
					main_header.style.top = "0px";
				}
			
			}else{
				if (window.pageYOffset >= 464) {					
					main_header.style.position = "fixed";
					main_header.style.top = "0px";
					helper.selector_query(".header__nav").style.top = "59px";
			   }
				else
				{
					main_header.style.position = "relative";
					main_header.style.top = "0px";
					helper.selector_query(".header__nav").style.top = "0px";
				}	
			}
		}
}

functions.scroll_to_top = () => {
	let btn = document.querySelector(".footer__goup");
	btn.addEventListener('click', function () {
		scrollTo(document.body, document.body.offsetTop, 400)
	});
}
functions.fixed_icon = () =>{

	let lastScrollTop = 0;
	let _content  =helper.selector_id("single-wrapper") ;
	window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
	  // downscroll code
	  helper.selector_query(".mob-icons").style.bottom = "-1px";
   } else {
	  // upscroll code
	 
	  helper.selector_query(".mob-icons").style.bottom = "-50px";

   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);
}


// functions.lazy_load = () => {

// 	document.addEventListener("DOMContentLoaded", function () {
// 		var lazyloadImages;

// 		if ("IntersectionObserver" in window) {
// 			lazyloadImages = document.querySelectorAll("[data-src]");
// 			var imageObserver = new IntersectionObserver(function (entries, observer) {
// 				entries.forEach(function (entry) {
// 					if (entry.isIntersecting) {
// 						var image = entry.target;
// 						image.src = image.dataset.src;
// 						// image.classList.remove("lazy");
// 						imageObserver.unobserve(image);
// 					}
// 				});
// 			});

// 			lazyloadImages.forEach(function (image) {
// 				imageObserver.observe(image);
// 			});
// 		} else {
// 			var lazyloadThrottleTimeout;
// 			lazyloadImages = document.querySelectorAll(".news-card__img img");

// 			function lazyload() {
// 				if (lazyloadThrottleTimeout) {
// 					clearTimeout(lazyloadThrottleTimeout);
// 				}

// 				lazyloadThrottleTimeout = setTimeout(function () {
// 					var scrollTop = window.pageYOffset;
// 					lazyloadImages.forEach(function (img) {
// 						if (img.offsetTop < (window.innerHeight + scrollTop)) {
// 							img.src = img.dataset.src;
// 							// img.classList.remove('lazy');
// 						}
// 					});
// 					if (lazyloadImages.length == 0) {
// 						document.removeEventListener("scroll", lazyload);
// 						window.removeEventListener("resize", lazyload);
// 						window.removeEventListener("orientationChange", lazyload);
// 					}
// 				}, 20);
// 			}

// 			document.addEventListener("scroll", lazyload);
// 			window.addEventListener("resize", lazyload);
// 			window.addEventListener("orientationChange", lazyload);
// 		}
// 	})




// }
functions.social_sharing = () => {

	

		let fb_share = document.querySelectorAll(".fb"),
			twtr_share = document.querySelectorAll(".twtr"),
			wts_share = document.querySelectorAll(".wts");


			for (let i = 0; i < fb_share.length; ++i) {
				fb_share[i].addEventListener("click", (e) => {
					e.preventDefault()
					window.open(`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank", "width=600,height=600")
		
				})

			  }
		
			for (let i = 0; i < twtr_share.length; ++i) {
				twtr_share[i].addEventListener("click", (e) => {
					e.preventDefault()
					window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`, "_blank", "width=400,height=400")
		
				})
			  }
		
			  for (let i = 0; i < wts_share.length; ++i) {
				wts_share[i].addEventListener("click", (e) => {
					e.preventDefault()
					window.open(`whatsapp://send?text=${window.location.href}menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600`, "_blank", "width=400,height=400")
		
				})
			  }
		


	


}

functions.navExplandAndCollapse = (el_arrow, el_dropdown) => {
	let arrow = document.querySelectorAll(el_arrow)
	let dropDown = document.querySelectorAll(el_dropdown)
	for (let i = 0; i < arrow.length; i++) {
		arrow[i].addEventListener('click', (e) => {
			e.preventDefault()
			arrow[i].classList.toggle('active')
			dropDown[i].classList.toggle('active')
		})
	}
}

functions.remove_empty_tags = () => {
	let all = document.querySelectorAll('.single-wrapper__article p')
	for(let i=0;i<all.length;i++){
		if(all[i].textContent == '' || all[i].textContent == null){
			all[i].style.display = 'none';
		}
	}
}


export default functions