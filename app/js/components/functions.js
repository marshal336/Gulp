
//*BURGER
document.querySelector('.menu__btn').addEventListener('click', function()  {
    this.classList.toggle('active');
    document.querySelector('.header__menu_list').classList.toggle('active');
    document.body.classList.toggle('lock')
});

//!DARK MODE
document.querySelector('.theme-link-items').addEventListener('change', (event) =>{
    if (event.target.nodeName === 'INPUT'){
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(event.target.value)
    }
})

//!CLOSE MENU
document.documentElement.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-link')) {
        let menu = document.querySelector('.theme-link-items')
        menu.classList.remove('active')
    }
})


//!GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.wrapper',
	content: '.content',
    smooth: 2,
})


//!SWIPER
new Swiper('.swiper-slide', {
    navigation: {
        nextE1: '.swiper-button-next',
        prevE1: '.swiper-button-prev',       
    },
    pagnation: {
        el: '.swiper-pagination',
        clickable: true
    },
})