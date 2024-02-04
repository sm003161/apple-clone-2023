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
  stickyMsg11: document.querySelector('#js_scrollSection-0 #js_stickyMsg11'),
  stickyMsg12: document.querySelector('#js_scrollSection-0 #js_stickyMsg12'),
  stickyMsg13: document.querySelector('#js_scrollSection-0 #js_stickyMsg13')
  },
  values: {
  stickyMsg11OpacityIn: [ 0, 1, { start: 0.1, end: 0.25 }],
  stickyMsg11OpacityOut: [ 1, 0, { start: 0.3, end: 0.35 }],
  stickyMsg11TransformIn: [ 5, -5, { start: 0.1, end: 0.35 } ],
  stickyMsg12OpacityIn: [ 0, 1, { start: 0.35, end: 0.5 }],
  stickyMsg12OpacityOut: [ 1, 0, { start: 0.55, end: 0.6 }],
  stickyMsg12TransformIn: [ 5, -5, { start: 0.35, end: 0.6 } ],
  stickyMsg13OpacityIn: [ 0, 1, { start: 0.6, end: 0.75 }],
  stickyMsg13OpacityOut: [ 1, 0, { start: 0.8, end: 0.85 }],
  stickyMsg13TransformIn: [ 5, -5, { start: 0.6, end: 0.85 } ],
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
  container: document.querySelector('#js_scrollSection-2')
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
  sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
   const msg11OpacityIn = calcValue( sceneValues.stickyMsg11OpacityIn, currentYOffset );
   const msg11OpacityOut = calcValue( sceneValues.stickyMsg11OpacityOut, currentYOffset );
   const msg11TransformIn = calcValue( sceneValues.stickyMsg11TransformIn, currentYOffset );
   const msg12OpacityIn = calcValue( sceneValues.stickyMsg12OpacityIn, currentYOffset );
   const msg12OpacityOut = calcValue( sceneValues.stickyMsg12OpacityOut, currentYOffset );
   const msg12TransformIn = calcValue( sceneValues.stickyMsg12TransformIn, currentYOffset );
   const msg13OpacityIn = calcValue( sceneValues.stickyMsg13OpacityIn, currentYOffset );
   const msg13OpacityOut = calcValue( sceneValues.stickyMsg13OpacityOut, currentYOffset );
   const msg13TransformIn = calcValue( sceneValues.stickyMsg13TransformIn, currentYOffset );

   sceneObjs.stickyMsg11.style.transform = `translateY(${msg11TransformIn}%)`;
   sceneObjs.stickyMsg12.style.transform = `translateY(${msg12TransformIn}%)`;
   sceneObjs.stickyMsg13.style.transform = `translateY(${msg13TransformIn}%)`;

   if (scrollPercentage <= 0.28) { 
    sceneObjs.stickyMsg11.style.opacity = msg11OpacityIn;
   } else { 
   sceneObjs.stickyMsg11.style.opacity = msg11OpacityOut;
   }
   
   if (scrollPercentage <= 0.53) { 
    sceneObjs.stickyMsg12.style.opacity = msg12OpacityIn;
   } else { 
   sceneObjs.stickyMsg12.style.opacity = msg12OpacityOut;
   }
   if (scrollPercentage <= 0.78) { 
    sceneObjs.stickyMsg13.style.opacity = msg13OpacityIn;
   } else { 
   sceneObjs.stickyMsg13.style.opacity = msg13OpacityOut;
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