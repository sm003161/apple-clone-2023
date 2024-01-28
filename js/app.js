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
    stickyMsg11Opacity: [0, 1, { start: 0.1, end: 0.2 }],
    stickyMsg12Opacity: [0, 1, { start: 0.3, end: 0.4 }],
    stickyMsgTransform: ['translateY(0px)', 'translateY(-30px)']
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
  let rv;
  const scrollHeight = sceneInfo[currentScene].scrollHeight;
  const scrollPercentage = currentYOffset / scrollHeight;

  if( sceneValues.length === 3 ) {
   const animationScrollStart = scrollHeight * sceneValues[2].start;
   const animationScrollEnd = scrollHeight * sceneValues[2].end;
   const animationDuration = animationScrollEnd - animationScrollStart;
   
   rv = (( currentYOffset - animationScrollStart ) / animationDuration ) * (( sceneValues[1] - sceneValues[0]) + sceneValues[0]) ;
  } else {
   rv = ( scrollPercentage * ( sceneValues[1] - sceneValues[0]) + sceneValues[0] );
  }

  return rv;
 }

 function playAnimation() {
  let sceneObjs = sceneInfo[currentScene].objs;
  let sceneValues = sceneInfo[currentScene].values;
  let currentYOffset = yOffset - prevScrollHeight;
  
  switch (currentScene) {
   case 0:
    // 현재 scene 에 적용할 CSS 값 선언하기
    let stickyMsg11OpacityIn = calcValue( sceneValues.stickyMsg11Opacity, currentYOffset );
    
    sceneObjs.stickyMsg11.style.opacity = stickyMsg11OpacityIn;
    console.log( stickyMsg11OpacityIn );

    break;
   case 1:

    // console.log(`${currentScene} play`);
    break;
   case 2:
    // console.log(`${currentScene} play`);
    break;
   case 3:
    // console.log(`${currentScene} play`);
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