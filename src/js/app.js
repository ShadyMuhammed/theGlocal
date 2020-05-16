import functions from './modules/functions';
import helper from './modules/helper';
import loadmore from './modules/loadmore_media'
import sticky from './libs/float-sidebar.min';
import notify from './components/notification-card'


window.onload = () => {
  
  
    functions.expand_and_collapse('.header__burger','.header__nav','active','active');
    openSearchWindow();
    // functions.header_cover();
    // functions.header_nav();
    // notify.hide();
    // if (helper.page_type() == "single") {
    //   functions.social_sharing();
    //   if (screen.width > 1024){
    //       floatIcons();
    //       floatSide();      
    //   }
    //   else{
    //     functions.fixed_icon();
    //   }
    // }
  
    functions.scroll_to_top()
    
}

let openSearchWindow = () => {
  var open = document.querySelector('.header__cornerBtn .open'),
      close = document.querySelector('.header__cornerBtn .close'),
      searchWindow = document.getElementById('search-full-section'),
      menu = document.querySelector('.header'),
      searchInput = document.querySelector('.search-full-section__searchInput');
  if (open) {
      open.onclick = function () {
          this.classList.remove('active')
          close.classList.add('active')
          searchWindow.classList.add('active')
          searchInput.focus();
          menu.classList.remove('active');
        
          //html.classList.add('no-scroll')
      }
  } if (close) {
      close.onclick = function () {
          this.classList.remove('active')
          open.classList.add('active')
          searchWindow.classList.remove('active')
          //html.classList.remove('no-scroll')
      }
  }


}
let floatSide = () =>{

  let sidebar = document.querySelector("aside");
  let content = document.querySelector(".layout-wrap");
  let floatSidebar = new sticky({
    sidebar: sidebar,
    relative: content,
    topSpacing: 110,
    bottomSpacing: 70
  });
}
let floatIcons = () =>{

  let socialBox = document.querySelector(".social-box");
  let textContent = document.querySelector(".single-wrapper__content");
  let floatSidebar2 = new sticky({
    sidebar: socialBox,
    relative: textContent,
    topSpacing: 300,
    bottomSpacing: 20
  });
}