import helper from "./helper";



let search = {}



let input_section = document.querySelector('.tabs-wrap__searchBox .search')
if(input_section){
    input_section.addEventListener('search',()=>{
        search.start_search()
        
    })
    input_section.addEventListener('keyup',(e)=>{
        if(e.keyCode == 13){
            search.start_search()
        }
    })
}



search.start_search = () => {
    if(input_section.value != ''){
        if(helper.page_type() == 'cinema-movies'){
            window.location = window.location.origin + `/movies/search?q=${input_section.value}`
        } else {
            window.location = window.location.origin + `/${helper.page_type()}/search?q=${input_section.value}`
        }
        
        
    }
}


search.large_search = () => {
    let _icon = document.querySelector('.header__searchBox span')
    let search_room = document.querySelector('.search-room')
    let search_closer = document.querySelector('.search-room__closer')
    if(_icon){
        _icon.addEventListener('click',()=>{
            search_room.classList.add('active')
        })
    }
    if(search_closer){
        search_closer.addEventListener('click',()=>{
            search_room.classList.remove('active')
        })
    }
}





let main_search = document.querySelector('.search-room__box .search')
let icon_search = document.querySelector('.search-room__box .start')
if(main_search){
    main_search.addEventListener('search',()=>{
        search.start_main_search()
        
    })
    main_search.addEventListener('keyup',(e)=>{
        if(e.keyCode == 13){
            search.start_main_search()
        }
    })
}
if(icon_search){
    icon_search.addEventListener('click',()=>{
        search.start_main_search()
    })
}


search.start_main_search = () => {
    if(main_search.value != ''){
        window.location = window.location.origin + `/search?q=${main_search.value}`
        
    }
}




export default search