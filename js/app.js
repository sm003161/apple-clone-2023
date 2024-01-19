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
    container: document.querySelector('#js-scrollSection-0')
   }
  },
  {
   // scene 1
   type: 'normal',
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector('#js-scrollSection-1')
   }
  },
  {
   // scene 2
   type: 'sticky',
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector('#js-scrollSection-2')
   }
  },
  {
   // scene 3
   type: 'sticky',
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector('#js-scrollSection-3')
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
  document.body.setAttribute("id", `js-showScene${currentScene}`);
 }

 function scrollLoop() {
  // 현재 스크롤 높이를 기준으로 scene 계산하기
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
   prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
   currentScene++;
   document.body.setAttribute("id", `js-showScene${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
   if (yOffset === 0) return;
   currentScene--;
   document.body.setAttribute("id", `js-showScene${currentScene}`);
  }
 }

 window.addEventListener('load', setLayout);
 window.addEventListener('resize', setLayout);
 window.addEventListener('scroll', () => {
  yOffset = window.scrollY;
  scrollLoop();
 });

 setLayout();
})();