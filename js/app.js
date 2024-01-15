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
   for (let i = 0; i < sceneInfo.length; i++) {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
   }
 }

 function scrollLoop() {
  prevScrollHeight = 0;
  for (let i = 0; i < currentScene; i++) {
   prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
   currentScene++;
  }

  if (yOffset < prevScrollHeight) {
   if (yOffset === 0) return;
   currentScene--;
  }
  
  console.log(currentScene);
  const body = document.querySelector("body");
  body.setAttribute("id", `js-showScene${currentScene}`);
 }

 window.addEventListener('resize', setLayout);
 window.addEventListener('scroll', () => {
  yOffset = window.scrollY;
  scrollLoop();
 });

 setLayout();
})();