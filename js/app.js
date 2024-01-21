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
    stickyMsgOpacity: [0, 1],
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
  let rv;
  let scrollPercentage = currentYOffset / sceneInfo[currentScene].scrollHeight;
  
  rv = ( scrollPercentage * ( sceneValues[1] - sceneValues[0]) + sceneValues[0] );
  
  return rv;
 }

 function playAnimation() {
  let sceneObjs = sceneInfo[currentScene].objs;
  let sceneValues = sceneInfo[currentScene].values;
  let currentYOffset = yOffset - prevScrollHeight;
  
  switch (currentScene) {
   case 0:
    // 현재 scene 에 적용할 CSS 값 선언하기
    let stickyMsgOpacityIn = calcValue( sceneValues.stickyMsgOpacity, currentYOffset );
    
    sceneObjs.stickyMsg11.style.opacity = stickyMsgOpacityIn;
    console.log( stickyMsgOpacityIn );

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