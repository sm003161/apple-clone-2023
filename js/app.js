(() => {

 let yOffset = 0;
 let prevScrollHeight = 0;
 let currentScene = 0;

 const sceneInfo = [
 {
  // scene 0
  type: 'sticky',
  heightNum: 5,
  scrollHeight: 0,
  objs: {
   container: document.querySelector('#js_scrollSection-0'),
   stickyMsg00: document.querySelector('#js_scrollSection-0 #js_stickyMsg00'),
   stickyMsg01: document.querySelector('#js_scrollSection-0 #js_stickyMsg01'),
   stickyMsg02: document.querySelector('#js_scrollSection-0 #js_stickyMsg02'),
  },
  values: {
   stickyMsg00OpacityIn: [ 0, 1, { start: 0.1, end: 0.3 }],
   stickyMsg00OpacityOut: [ 1, 0, { start: 0.3, end: 0.33 }],
   stickyMsg00TransformIn: [ 5, -5, { start: 0.1, end: 0.3 } ],
   stickyMsg00TransformOut: [ -5, -8, { start: 0.3, end: 0.33 } ],
   stickyMsg01OpacityIn: [ 0, 1, { start: 0.35, end: 0.55 }],
   stickyMsg01OpacityOut: [ 1, 0, { start: 0.55, end: 0.58 }],
   stickyMsg01TransformIn: [ 5, -5, { start: 0.35, end: 0.55 }],
   stickyMsg01TransformOut: [ -5, -8, { start: 0.55, end: 0.58 }],
   stickyMsg02OpacityIn: [ 0, 1, { start: 0.6, end: 0.8 }],
   stickyMsg02OpacityOut: [ 5, 0, { start: 0.8, end: 0.83 }],
   stickyMsg02TransformIn: [ 4, -5, { start: 0.6, end: 0.8 }],
   stickyMsg02TransformOut: [ -5, -8, { start: 0.8, end: 0.83 } ],
  }
 },
 {
  // scene 1
  type: 'normal',
  heightNum: 5,
  scrollHeight: 0,
  objs: {
   container: document.querySelector('#js_scrollSection-1')
  }
 },
 {
  // scene 2
  type: 'sticky',
  heightNum: 5,
  scrollHeight: 0,
  objs: {
   container: document.querySelector('#js_scrollSection-2'),
   stickyMsg20: document.querySelector('#js_scrollSection-2 #js_stickyMsg20'),
   stickyMsg21: document.querySelector('#js_scrollSection-2 #js_stickyMsg21'),
   stickyMsg22: document.querySelector('#js_scrollSection-2 #js_stickyMsg22'),
  }
 },
 {
  // scene 3
  type: 'sticky',
  heightNum: 5,
  scrollHeight: 0,
  objs: {
   container: document.querySelector('#js_scrollSection-3')
  }
 }
 ];

 // 
 function setLayout() {
 // 각 섹션의 높이 지정해주기
  for (let i = 0; i < sceneInfo.length; i++) {
   if (sceneInfo[i].type === "sticky") {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
   } else if (sceneInfo[i].type === "normal"){
    sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
   }

   sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
  }

  yOffset = window.scrollY;
  let totalScrollHeight = 0;
  for (let i = 0; i < sceneInfo.length; i++) {
   totalScrollHeight += sceneInfo[i].scrollHeight;
   if (totalScrollHeight >= yOffset) {
    currentScene = i;
    break;
   }
  }
 document.body.setAttribute("id", `js_showScene${currentScene}`);
 }

 function calcValue(sceneValues, currentYOffset) {
 // 재생구간 스크롤 위치를 절댓값으로 환산하기
 const scrollHeight = sceneInfo[currentScene].scrollHeight;
 const scrollPercentage = currentYOffset / scrollHeight;

 // console.log(scrollPercentage);

 let rv;

 if (sceneValues.length === 3) {
  const animationScrollStart = scrollHeight * sceneValues[2].start;
  const animationScrollEnd = scrollHeight * sceneValues[2].end;
  const animationDuration = animationScrollEnd - animationScrollStart;
  
  if (currentYOffset >= animationScrollStart && currentYOffset <= animationScrollEnd) {
   rv = (( currentYOffset - animationScrollStart ) / animationDuration ) * ( sceneValues[1] - sceneValues[0] ) + sceneValues[0] ;
  } else if (currentYOffset < animationScrollStart) {
   rv = sceneValues[0];
  } else if (currentYOffset > animationScrollEnd) {
   rv = sceneValues[1];
  }
 } else {
  rv = ( scrollPercentage * ( sceneValues[1] - sceneValues[0]) + sceneValues[0] );
 }
 
 return rv;
 }

 function playAnimation() {
  const sceneObjs = sceneInfo[currentScene].objs;
  const sceneValues = sceneInfo[currentScene].values;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollPercentage = currentYOffset / scrollHeight;

  switch (currentScene) {
   case 0:

   // 현재 scene 에 적용할 CSS 값 선언하기


   if (scrollPercentage <= 0.3) { 
    sceneObjs.stickyMsg00.style.opacity = calcValue( sceneValues.stickyMsg00OpacityIn, currentYOffset );
    sceneObjs.stickyMsg00.style.transform = `translateY(${calcValue( sceneValues.stickyMsg00TransformIn, currentYOffset )}%)`;
   } else { 
    sceneObjs.stickyMsg00.style.opacity = calcValue( sceneValues.stickyMsg00OpacityOut, currentYOffset );
    sceneObjs.stickyMsg00.style.transform = `translateY(${calcValue( sceneValues.stickyMsg00TransformOut, currentYOffset )}%)`;
   }
   
   if (scrollPercentage <= 0.55) { 
    sceneObjs.stickyMsg01.style.opacity = calcValue( sceneValues.stickyMsg01OpacityIn, currentYOffset );
    sceneObjs.stickyMsg01.style.transform = `translateY(${calcValue( sceneValues.stickyMsg01TransformIn, currentYOffset )}%)`;
   } else { 
    sceneObjs.stickyMsg01.style.opacity = calcValue( sceneValues.stickyMsg01OpacityOut, currentYOffset );
    sceneObjs.stickyMsg01.style.transform = `translateY(${calcValue( sceneValues.stickyMsg01TransformOut, currentYOffset )}%)`;
   }

   if (scrollPercentage <= 0.8) { 
    sceneObjs.stickyMsg02.style.opacity = calcValue( sceneValues.stickyMsg02OpacityIn, currentYOffset );
    sceneObjs.stickyMsg02.style.transform = `translateY(${calcValue( sceneValues.stickyMsg02TransformIn, currentYOffset )}%)`;
   } else { 
    sceneObjs.stickyMsg02.style.opacity = calcValue( sceneValues.stickyMsg02OpacityOut, currentYOffset );
    sceneObjs.stickyMsg02.style.transform = `translateY(${calcValue( sceneValues.stickyMsg02TransformOut, currentYOffset )}%)`;
   }

   break;

   case 1:
   break;

   case 2:
   break;

   case 3:
   break;
  }
 }

 function scrollLoop() {
 // 현재 스크롤 높이를 기준으로 scene 계산하기
 prevScrollHeight = 0;
 for (let i = 0; i < currentScene; i++) {
  prevScrollHeight += sceneInfo[i].scrollHeight;
 }

 if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
  currentScene++;
  document.body.setAttribute("id", `js_showScene${currentScene}`);
 }

 if (yOffset < prevScrollHeight) {
  if (yOffset === 0) return;
  currentScene--;
  document.body.setAttribute("id", `js_showScene${currentScene}`);
 }
 playAnimation()
 }

 window.addEventListener('load', setLayout);
 window.addEventListener('resize', setLayout);
 window.addEventListener('scroll', () => {
 yOffset = window.scrollY;
 scrollLoop();
 });

 setLayout();
})();