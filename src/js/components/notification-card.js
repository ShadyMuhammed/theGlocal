


let notify = {};


let  hidden = document.querySelectorAll(".hide-notification");
    

notify.hide = ()=>{

    // setTimeout(()=>{
    //     let _notify = document.querySelector('.notify')
    //     if(_notify){
    //         document.querySelector(".notify").classList.add("active")
    //     }
        
    // },1000)
    for (let i = 0; i < hidden.length; ++i) {
        hidden[i].addEventListener("click", ()=>{
            let _notify = document.querySelector('.notify')
            if(_notify){
                document.querySelector(".notify").classList.remove("active")
            }
            
        })
      }
}

export default notify