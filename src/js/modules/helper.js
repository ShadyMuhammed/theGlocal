
import sticky from '../libs/float-sidebar.min';



let helper = {};


let d = document

helper.selector_id = (id) => {
    return d.getElementById(id)
}

helper.selector_query = (selector) => {
    return d.querySelector(selector)
}

helper.selector_query_all = (selector) => {
    return d.querySelectorAll(selector)
}


//-- Sticky
// helper.stickySide = (o_aside,o_box) => {
// 	let sidebar = document.querySelector(o_aside);
// 	let content = document.querySelector(o_box);
// 	let floatSidebar = new sticky({
// 		sidebar: sidebar,
// 		relative: content,
// 		topSpacing: 140,
// 		bottomSpacing: 20
// 	});
// }

helper.page_type = () => {
    let app = document.getElementById('app-box');
    let type = app.getAttribute('data-src');
    return type;
}

const _baseUrl = location.origin;
// const _baseUrl = window.location.href




helper.add_loader = (parent) => {
    // parent = document.querySelector(parent)
    parent.innerHTML += `<div class="loader"></div>`;
}

helper.remove_loader = (parent, target) => {
    
    if (target) {
        parent.removeChild(target)
    }
}

helper.no_data = () => {
    return `<div class="no-data">
        <span class="icon">
            
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 492.308 492.308" style="enable-background:new 0 0 492.308 492.308;" xml:space="preserve">
<g>
<g>
   <path d="M242.173,63.721L181.452,0H0v492.308h492.308V63.721H242.173z M472.615,472.615H19.692V19.692H173.01l60.721,63.721
       h238.885V472.615z"/>
</g>
</g>
<g>
<g>
   <polygon points="324,213.846 309.558,200.462 246.159,268.841 182.76,200.462 168.317,213.846 232.733,283.322 168.317,352.798 
       182.76,366.183 246.159,297.803 309.558,366.183 324,352.798 259.585,283.322 		"/>
</g>
</g>

</svg>

        </span>
        <p>لا يوجد بيانات</p>
    </div>`
}





export default helper