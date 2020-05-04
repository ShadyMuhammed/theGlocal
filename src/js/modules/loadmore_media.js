import helper from "./helper";
import axios from "../libs/axios.min";



let loadmore = {};
let _category = '';


let active_event = '';
let base_url = location.origin;
// let base_url = "https://new.gololy.com";
// let base_url = "https://cors-anywhere.herokuapp.com/https://new.gololy.com";



loadmore.loadNews = () =>{
    let _wrapper = helper.selector_id("requested"),
        _id = helper.selector_id("single-wrapper").getAttribute("article-id"),
        _content = ``;
        helper.add_loader(_wrapper);
        axios.get(`${base_url}/api/scrollarticles/${_id}`).then((res) => {
            helper.remove_loader(_wrapper,helper.selector_query(".loader"))
            // console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                _content +=`
                <div class="breadCrumb mt50">
              <div class="breadCrumb__list"><span class="icon breadCrumb__home">
                  <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <g>
                      <g>
                        <polygon points="256,152.96 79.894,288.469 79.894,470.018 221.401,470.018 221.401,336.973 296.576,336.973 296.576,470.018     432.107,470.018 432.107,288.469   "></polygon>
                      </g>
                    </g>
                    <g>
                      <g>
                        <polygon points="439.482,183.132 439.482,90.307 365.316,90.307 365.316,126.077 256,41.982 0,238.919 35.339,284.855     256,115.062 476.662,284.856 512,238.92   "></polygon>
                      </g>
                    </g>
                  </svg></span>
                <li class="breadCrumb__item"><a href="${base_url}" class="breadCrumb__link">الرئيسية</a></li><span class="icon">
                  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
                    <g>
                      <g>
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path>
                      </g>
                    </g>
                  </svg></span>
                <li class="breadCrumb__item"><a href="${base_url +"/"+res.data[i].section_data[0].url }" class="breadCrumb__link">${res.data[i].section_data[0].name}</a></li><span class="icon">
                  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
                    <g>
                      <g>
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path>
                      </g>
                    </g>
                  </svg></span>
                <li class="breadCrumb__item"><span class="breadCrumb__link">${res.data[i].title}</span></li>
              </div>
            </div>
                <div class="single-wrapper" article-id='${res.data[i].news_id}'>
                <div class="single-wrapper__title">
                  <h1>${res.data[i].title}</h1>
                </div>
                <div class="single-wrapper__status">
                <div class="status-cell">
                  <div class="status-cell__icon icon">
                    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                      <path d="M437.02,74.98C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.98C26.629,123.333,0,187.62,0,256    s26.629,132.667,74.98,181.02C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.98    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.98z M256,472c-119.103,0-216-96.897-216-216S136.897,40,256,40    s216,96.897,216,216S375.103,472,256,472z"></path>
                      <polygon points="276,236 276,76 236,76 236,276 388,276 388,236   "></polygon>
                    </svg>
                  </div>
                  <div class="status-cell__text">${res.data[i].publication_date} </div>
                </div>
                <div class="status-cell">
                  <div class="status-cell__icon icon">
                    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 383.947 383.947" style="enable-background:new 0 0 383.947 383.947;" xml:space="preserve">
                      <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893    "></polygon>
                      <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04     C386.027,77.92,386.027,64.373,377.707,56.053z"></path>
                    </svg>
                  </div>
                  <div class="status-cell__text">${res.data[i].written} </div>
                </div>
                <div class="status-cell">
                  <div class="status-cell__icon icon">
                    <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
                      <g>
                        <g>
                          <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035    c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201    C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418    c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418    C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275    s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516    s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div class="status-cell__text">${res.data[i].hits_data.hits}</div>
                </div>
              </div>
                <div class="single-wrapper__img-holder mb25"><img src="${base_url+`/images/800x500/`+res.data[i].main_img}" alt=""></div>
                <div class="single-wrapper__article covered">`;
                for (let x = 0; x < res.data[i].content.length; x++) {
                    _content +=  `<p> ${res.data[i].content[x]}</p>`
                }
                  _content +=  `<div class="single-wrapper__full-text"><a href="${base_url+`/`+res.data[i].url}">المقال كامل</a></div>
                </div>
              </div>`
                
                
            }
            _wrapper.innerHTML = _content;
            
        })

       

}




// loadmore.init = () =>{
  
 
    
     
  
// }
 
   





export default loadmore