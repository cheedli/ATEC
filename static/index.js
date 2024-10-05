const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.right');
const previousButton = document.querySelector('.left');

const dotsNav = document.querySelector('.carousel_nav');
const dots= Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index)=>{
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, previousButton, nextButton, targetIndex) => {
    if (targetIndex === 0){
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden')
    } else {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

setInterval(()=>{
    const currentSlide = track.querySelector('.current-slide');
    var nextSlide;
    const currentDot = dotsNav.querySelector('.current-slide');
    var nextDot;
    var nextIndex;
    const lastSlide = slides[(slides.length)-1];
    
    if(currentSlide === lastSlide){
        nextIndex = 0;
        nextSlide = slides[0];
        nextDot = dots[0];
        //console.log("set");
    } else {
        nextSlide = currentSlide.nextElementSibling;
        nextIndex = slides.findIndex(slide => slide === nextSlide);
        nextDot = currentDot.nextElementSibling;
    }

   moveToSlide(track, currentSlide, nextSlide);
   updateDots(currentDot, nextDot);
   hideShowArrows(slides, previousButton, nextButton, nextIndex);
},5000);

// when I click left, move slides to the left
previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

   moveToSlide(track, currentSlide, prevSlide);
   updateDots(currentDot, prevDot);
   hideShowArrows(slides, previousButton, nextButton, prevIndex);
});

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

   moveToSlide(track, currentSlide, nextSlide);
   updateDots(currentDot, nextDot);
   hideShowArrows(slides, previousButton, nextButton, nextIndex);
});

// when I click nav indicators, move to that slide

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot=> dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, previousButton, nextButton, targetIndex);

    //console.log(targetIndex);
});

const missions = document.getElementById("nav-missions");
const facts = document.getElementById("nav-facts");
const reasons = document.getElementById("nav-reasons");
const page = document.getElementById("container");
const dropdownBox = document.getElementById("dropdown-box");
const pointer = document.getElementById("pointer");
const menuMissions = document.getElementById("menu-missions");
const menuFacts = document.getElementById("menu-facts");
const menuReasons = document.getElementById("menu-reasons");
const home = document.getElementById("home");

const mobile = window.matchMedia( "(max-width: 980px)" );

missions.onmouseenter = () => {
    menuFacts.style.transition="0s";
    menuFacts.style.transitionDelay="0s";
    menuReasons.style.transition="0s";
    menuReasons.style.transitionDelay="0s";
    menuMissions.style.display="flex";
    menuMissions.style.transition="0.5s";
    menuMissions.style.transitionDelay="0.2s";
    
    if (mobile.matches) {
        dropdownBox.style.width="95%";
        dropdownBox.style.height="380px";
        dropdownBox.style.right="unset";
        pointer.style.display="none";
    }
    else {
        dropdownBox.style.width="400px";
        dropdownBox.style.height="370px";
        dropdownBox.style.right="100px";
    }
    
    dropdownBox.style.background="rgba(255,255,255,0.9)";
    menuMissions.style.color="rgb(213, 91, 78)";
    pointer.style.background="rgb(213, 91, 78)";
    menuFacts.style.visibility="hidden";
    menuReasons.style.visibility="hidden";
    menuMissions.style.visibility="visible";
    menuFacts.style.color="transparent";
    menuReasons.style.color="transparent";
}
facts.onmouseenter = () => {
    menuMissions.style.transition="0s";
    menuMissions.style.transitionDelay="0s";
    menuReasons.style.transition="0s";
    menuReasons.style.transitionDelay="0s";
    menuFacts.style.display="flex";
    menuFacts.style.transition="0.5s";
    menuFacts.style.transitionDelay="0.2s";

    if (mobile.matches) {
        dropdownBox.style.width="95%";
        dropdownBox.style.height="380px";
        dropdownBox.style.right="unset";
        pointer.style.display="none";
    }
    else {
        dropdownBox.style.width="160px";
        dropdownBox.style.height="200px";
        dropdownBox.style.right="100px";
    }
    
    dropdownBox.style.background="rgba(255,255,255,0.9)";
    menuFacts.style.color="rgb(213, 91, 78)";
    pointer.style.background="rgb(213, 91, 78)";
    menuMissions.style.visibility="hidden";
    menuReasons.style.visibility="hidden";
    menuFacts.style.visibility="visible";
    menuMissions.style.color="transparent";
    menuReasons.style.color="transparent";
}
reasons.onmouseenter = () => {
    menuFacts.style.transition="0s";
    menuFacts.style.transitionDelay="0s";
    menuMissions.style.transition="0s";
    menuMissions.style.transitionDelay="0s";
    menuReasons.style.display="flex";
    menuReasons.style.transition="0.5s";
    menuReasons.style.transitionDelay="0.2s";

    if (mobile.matches) {
        dropdownBox.style.width="95%";
        dropdownBox.style.height="380px";
        dropdownBox.style.right="unset";
        pointer.style.display="none";
    }
    else {
        dropdownBox.style.width="350px";
        dropdownBox.style.height="170px";
        dropdownBox.style.right="-115px";
    }

    dropdownBox.style.background="rgba(255,255,255,0.9)";
    menuReasons.style.color="rgb(213, 91, 78)";
    pointer.style.background="rgb(213, 91, 78)";
    menuMissions.style.visibility="hidden";
    menuFacts.style.visibility="hidden";
    menuReasons.style.visibility="visible";
    menuFacts.style.color="transparent";
    menuMissions.style.color="transparent";
}

// remove dropdown box
page.onmouseenter = () => {
    menuMissions.style.transition="0s";
    menuMissions.style.transitionDelay="0s";
    menuFacts.style.transition="0s";
    menuFacts.style.transitionDelay="0s";
    menuReasons.style.transition="0s";
    menuReasons.style.transitionDelay="0s";
    menuMissions.style.visibility="hidden";
    menuFacts.style.visibility="hidden";
    menuReasons.style.visibility="hidden";
    menuMissions.style.color="transparent";
    menuFacts.style.color="transparent";
    menuReasons.style.color="transparent";
    dropdownBox.style.background="transparent";
    dropdownBox.style.height="0";
    pointer.style.background="transparent";
}

home.onmouseenter = () => {
    menuMissions.style.transition="0s";
    menuMissions.style.transitionDelay="0s";
    menuFacts.style.transition="0s";
    menuFacts.style.transitionDelay="0s";
    menuReasons.style.transition="0s";
    menuReasons.style.transitionDelay="0s";
    menuMissions.style.visibility="hidden";
    menuFacts.style.visibility="hidden";
    menuReasons.style.visibility="hidden";
    menuMissions.style.color="transparent";
    menuFacts.style.color="transparent";
    menuReasons.style.color="transparent";
    dropdownBox.style.background="transparent";
    dropdownBox.style.height="0";
    pointer.style.background="transparent";
}

const homePage = document.getElementById("homep");
var previousPage = homePage;
var currentPage;

switchPage = (clickedPage) => {
    previousPage.style.display="none";
    currentPage = document.getElementById(clickedPage.id+"p");
    currentPage.style.display="block";
    previousPage = currentPage;
}