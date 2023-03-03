/*-------------------detect users' device and disable some JS events--------------------- */

function watchForEvents() {

  let lastTouchTime = 0;

  function enableEvents() {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('forJSEvents');
  }

  function disableEvents() {
    document.body.classList.remove('forJSEvents');
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableEvents, true);
  document.addEventListener('mousemove', enableEvents, true);

  enableEvents();
}

watchForEvents();


/* ---------------Open & close side bar------------------ */

const menuButton=document.querySelector('.menu-button');
menuButton.addEventListener('click',()=>{
    document.querySelector('.side-nav').classList.toggle("show-side-nav");
});

const closeButton=document.querySelector('.close-btn');
closeButton.addEventListener('click',()=>{
    document.querySelector('.side-nav').classList.remove("show-side-nav");
});

document.addEventListener('click',(event)=>{
    if(event.target.matches("div.side-nav")){
        document.querySelector('.side-nav').classList.toggle("show-side-nav");
     }
});


/*------------------move the home-start header part when occur mousemove event------------*/

const homeStart=document.querySelector('.home-start');
const moveElements=document.querySelectorAll('.move-header');
homeStart.addEventListener('mousemove',(event)=>{
  moveElements.forEach((moveElement)=>{
    const speed=moveElement.getAttribute('data-speed');
    let x=(window.innerWidth-event.pageX*speed)/100;
    let y=(window.innerWidth-event.pageY*speed)/100;
    moveElement.style.transform=`translate(${x}px , ${y}px)`
  })
    
});


/*------------scroll events-----------*/

const homeBgSvg=document.querySelector('.home-bg');
const someActivitySection=document.querySelector('.some-activities');
 
window.addEventListener("scroll",()=>{


    /* --------------Video paused when cover 50% of the video container */

    if(window.pageYOffset>=homeStart.clientHeight/1.4){
        document.getElementById('home-video').pause();
    }else if(document.querySelector('.header-part').classList.contains('go-anim')){
        document.getElementById('home-video').play();
    }else{
      document.getElementById('home-video').pause();
    }

      //--check body has forJSEvent class(Desktop devices)
    if(document.body.classList.contains('forJSEvents')){ 
      let value=window.scrollY/100+1;
      
      
      if(window.pageYOffset>=homeBgSvg.clientHeight/2.8){
        //--home background transform
        homeBgSvg.style.transform= `scale3d(12,12,1)`;

        //--set style class for header-part
        document.querySelector('.header-part').classList.add('go-anim');
      }else{
        homeBgSvg.style.transform= `scale3d(${value},${value},1)`;

        //--remove style class from header-part
        document.querySelector('.header-part').classList.remove('go-anim');
      }
      
      ///----set opacity to home background svg 2nd path
      if(window.pageYOffset>=homeBgSvg.clientHeight/10){
        document.querySelector('.p').style.opacity='0';
      }else{
        document.querySelector('.p').style.opacity='1';
      }
    }


        /*----change nav-container's back color when it came to the parallax-container-fixed div-------------*/

    if(window.pageYOffset>=someActivitySection.offsetTop){
        document.querySelector('.nav-wrapper').classList.add('change-back');
    }else{
        document.querySelector('.nav-wrapper').classList.remove('change-back');
    }
    
});

const video=document.getElementById('home-video');
const someActivitySec=document.querySelector('.some-activities');

video.addEventListener('timeupdate',()=>{
  const currentTime=video.currentTime;
  const fixed=currentTime.toFixed(1)
  if(fixed>=46.9){
    someActivitySec.scrollIntoView({behavior: 'smooth'})
  }
});


/*----------display 3 list from activity list in home page randomly when page loading---------*/

window.addEventListener('load',()=>{


    /*---------create 3 random numbers---------- */
    let nums = new Set();
        while (nums.size < 3) {
            nums.add(Math.floor(Math.random() * (30) +0));
        }
        /*----------create array from random numbers--------- */

        let no=[];
        function createArray(nums){
            no.push(nums);
        }
        nums.forEach(createArray);

            /*---------get img details from JSON file--------- */

            function display(img){
                const imgUlList=`
                    <li class="list ${img.imgList[no[0]].classListForTopMask} ${img.imgList[no[0]].classListForBottomMask}">
                        <a id="activity-link" href="${img.imgList[no[0]].a}">activity</a>
                        <picture>
                            <source srcset="img/${img.imgList[no[0]].source1}">
                            <source srcset="img/${img.imgList[no[0]].source2}">
                            <img src="img/${img.imgList[no[0]].source2}" alt="">
                        </picture>
                        <span class="${img.imgList[no[0]].spanClass}"></span>
                        <h3>${img.imgList[no[0]].h3}</h3>
                    </li>
                    <li class="list ${img.imgList[no[1]].classListForTopMask} ${img.imgList[no[1]].classListForBottomMask}">
                        <a id="activity-link" href="${img.imgList[no[1]].a}">activity</a>
                        <picture>
                            <source srcset="img/${img.imgList[no[1]].source1}">
                            <source srcset="img/${img.imgList[no[1]].source2}">
                            <img src="img/${img.imgList[no[1]].source2}" alt="">
                        </picture>
                        <span class="${img.imgList[no[1]].spanClass}"></span>
                        <h3>${img.imgList[no[1]].h3}</h3>
                    </li>
                    <li class="list ${img.imgList[no[2]].classListForTopMask} ${img.imgList[no[2]].classListForBottomMask}">
                        <a id="activity-link" href="${img.imgList[no[2]].a}">activity</a>
                        <picture>
                            <source srcset="img/${img.imgList[no[2]].source1}"2
                            <source srcset="img/${img.imgList[no[2]].source2}">
                            <img src="img/${img.imgList[no[2]].source2}" alt="">
                        </picture>
                        <span class="${img.imgList[no[2]].spanClass}"></span>
                        <h3>${img.imgList[no[2]].h3}</h3>
                    </li>`
                        
                    document.querySelector('.activity-list').innerHTML=imgUlList;
                    
            }
                
            const xhr=new XMLHttpRequest();
            xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                display(JSON.parse(xhr.responseText));
            }
            }
            xhr.open('GET','img-list.json');
            xhr.send();  
});

/*------------------------------------intersection observer--------------------------------- */

const intersects=document.querySelectorAll('.intersect');

const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        entry.target.classList.toggle('show',entry.isIntersecting);
        if(entry.isIntersecting){
            observer.unobserve(entry.target);
        }
    });
},{
    threshold:.2
});

  intersects.forEach((intersect)=>{
    observer.observe(intersect);
  })

/*-------------------set style classes for info-content underline animated a tag----------------*/

const underlineAnimationSpans=document.querySelectorAll('.underline-anim');
underlineAnimationSpans.forEach((underlineAnimationSpan)=>{
    underlineAnimationSpan.addEventListener('mouseover',()=>{
      if(document.body.classList.contains('forJSEvents')){
        if(underlineAnimationSpan.classList=="underline-anim mouse-out"){
          underlineAnimationSpan.classList.remove('mouse-out');
          underlineAnimationSpan.classList.add('mouse-over');
        }else{  
          underlineAnimationSpan.classList.add('mouse-over');
        }
      }  
    });
    
    underlineAnimationSpan.addEventListener('mouseout',()=>{
      if(document.body.classList.contains('forJSEvents')){
        underlineAnimationSpan.classList.remove('mouse-over');
        underlineAnimationSpan.classList.add('mouse-out');
      }  
    });
  
});



/*-----------------request animation frame----->Clip scroll animation for fitness-club and health-club sections------------ */

const Clubs=["fitness-club","health-club"];

for(let a=0; a<Clubs.length; a++){
  
  let lastScrollY = 0,
  ticking = false,
  bodyHeight = 0,
  parallaxHeight = 0,
  viewportHeight = 0,
  lastTime = 0,
  layers = null;

  function getScrollPosition(){
    return window.pageYOffset-document.querySelector(`.${Clubs[a]}`).offsetTop;
  }

  function requestAnimationFramePolyfill() {
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }

  function onScroll() {
    lastScrollY = getScrollPosition();
    requestTick();
  }

  function onResize() {
    bodyHeight = document.querySelector(`.${Clubs[a]} .info-wrapper`).offsetHeight;
    viewportHeight = window.innerHeight;
    parallaxHeight = document.querySelectorAll(`.${Clubs[a]} .to-rect`)[0].offsetHeight;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function getLayers() {
    if (layers === null) {
      layers = document.querySelectorAll(`.${Clubs[a]} .to-rect`);
    }
    return layers;
  }

  function update() {
    ticking = false;

    let currentScrollY = lastScrollY;

    if (currentScrollY < 0) {
      currentScrollY = 0;
    }
    if (currentScrollY + viewportHeight > bodyHeight) {
      currentScrollY = bodyHeight - viewportHeight;
    }

    const layerIndex = Math.floor(currentScrollY / parallaxHeight);
    const layers = document.querySelectorAll(`.${Clubs[a]} .to-rect`);
    const layer = layers[layerIndex];

    const clipValue = parallaxHeight - (currentScrollY - (parallaxHeight * (layerIndex)));
    const length = layers.length;

    for (let i = 0; i < length; i++) {
      if (i < layerIndex) {
        layers[i].style.clip = "rect(0px,9999px,0px,0px)";
      } else if (i > layerIndex) {
        layers[i].style.clip = "rect(0px,9999px," + parallaxHeight + "px,0px)";
      } else {
        layers[i].style.clip = "rect(0px,9999px," + clipValue + "px,0px)";
      }
    }
  }

  function addClass(el, classname) {
    if (el.classList)
      el.classList.add(classname);
    else
      el.className += ' ' + classname;
  }

  function removeClass(el,classname){
    if(el.classList){
      el.classList.remove(classname);
    }else{
      el.className+=' '+classname;
    }
  }

  function addFixedStyles(){
    const layers=document.querySelectorAll(`.${Clubs[a]} .to-rect`);
    const h3Head=document.querySelector(`.${Clubs[a]} .h3-head`);
    const laylength=layers.length;
    if(window.pageYOffset>=document.querySelector(`.${Clubs[a]}`).offsetTop){
      for(let i=0; i<laylength; i++){
        addClass(layers[i],'fixed');
        layers[i].style.zIndex=100-i;
        h3Head.classList.add('fixed');
        requestTick();
      }
    }else{
      for(let i=0; i<laylength; i++){
        removeClass(layers[i],'fixed');
        layers[i].style.zIndex=100-i;
      }
      h3Head.classList.remove('fixed');
    }
  }

  function init() {
    requestAnimationFramePolyfill();
    bodyHeight = document.querySelector(`.${Clubs[a]}`).offsetHeight;
    viewportHeight = window.innerHeight;
    parallaxHeight = viewportHeight;
    window.addEventListener('scroll', addFixedStyles);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  }

  if (window.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      init();
    });
  }
};

const clubLists=document.querySelector('.club-lists');
const clubListsLi=document.querySelector('.club-lists li');

/*----------------------mousemove event for club-list---------------------------------- */

let liWidth=0,
    clubListWidth=0,
    viewportWidth=0,
    lastScrollX=0,
    testLiValue=0,
    testClValue=0,
    lastTouchX=0;
  
function onMouseMove(event) {
  lastScrollX =event.pageX;
  liWidth = clubListsLi.clientWidth*3;
  viewportWidth = window.innerWidth;
  clubListWidth = clubLists.clientWidth;
  getValues(liWidth,clubListWidth);
  translateClubLists();
}

function onClResize() {
  clubLists.style.transform=`translateX(0px)`
  liWidth = clubListWidth.clientWidth*3;
  viewportWidth = window.innerWidth;
  clubListWidth = clubLists.clientWidth;
  getValues(liWidth,clubListWidth);
}

function getValues(liValue,ClValue){
  testLiValue=liValue;
  testClValue=ClValue;
}

function translateClubLists(){
  if(document.body.classList.contains('forJSEvents')){
    let dif=testLiValue-testClValue-1;
    let x=lastScrollX/viewportWidth*dif;
    clubLists.style.transform=`translateX(-${x}px)`;
  }   
}

function initForClubLists(){
    clubLists.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onClResize);
    liWidth = clubListsLi.clientWidth*3;
    viewportWidth = window.innerWidth;
    clubListWidth = viewportWidth;
}

if (window.addEventListener) {
  document.addEventListener('DOMContentLoaded', ()=> {
    initForClubLists();
  });
}


/*-----------------move the club-lists div scroll left and scroll right when click prev & nxt btns (mobile)-----------*/

const distance = clubListsLi.clientWidth;

function scrollLft(){
  clubLists.scrollBy({
    left: -distance,
    behavior: 'smooth'
  });
}

function scrollRgt(){
  clubLists.scrollBy({
    left: distance,
    behavior: 'smooth'
  });
}

/*---------set class for prev & nxt buttons when scroll left==0 && scroll left==max----------*/


clubLists.addEventListener('scroll',()=>{

  /*-----prev btn-----*/

  const scrollLeft=clubLists.scrollLeft;
  if(scrollLeft==0){
    document.querySelector('.prev-btn').classList.add('disable');
  }else{
    document.querySelector('.prev-btn').classList.remove('disable');
  }

  /*-----nxt btn------*/
  const difference=(clubListsLi.clientWidth*3)-clubLists.clientWidth;
  if(scrollLeft==difference){
    document.querySelector('.nxt-btn').classList.add('disable');
  }else{
    document.querySelector('.nxt-btn').classList.remove('disable');
  }


})