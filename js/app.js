(() => {
 let yOffset = 0;
 let prevScrollHeight = 0;
 let currentScene = 0;

 const sceneInfo = [
  {
   // scene 0
   type: "sticky",
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector("#js_scrollSection-0"),
    stickyMsg00: document.querySelector("#js_scrollSection-0 #js_stickyMsg00"),
    stickyMsg01: document.querySelector("#js_scrollSection-0 #js_stickyMsg01"),
    stickyMsg02: document.querySelector("#js_scrollSection-0 #js_stickyMsg02"),
    canvas: document.querySelector("#js_scrollSection-0 canvas"),
    ctx: document.querySelector("#js_scrollSection-0 canvas").getContext("2d"),
    imgObj: [],
   },
   values: {
    stickyMsg00OpacityIn: [0, 1, { start: 0.1, end: 0.3 }],
    stickyMsg01OpacityIn: [0, 1, { start: 0.35, end: 0.55 }],
    stickyMsg02OpacityIn: [0, 1, { start: 0.6, end: 0.8 }],
    stickyMsg00OpacityOut: [1, 0, { start: 0.3, end: 0.33 }],
    stickyMsg01OpacityOut: [1, 0, { start: 0.55, end: 0.58 }],
    stickyMsg02OpacityOut: [1, 0, { start: 0.8, end: 0.83 }],
    stickyMsg00TransformIn: [5, -5, { start: 0.1, end: 0.3 }],
    stickyMsg01TransformIn: [5, -5, { start: 0.35, end: 0.55 }],
    stickyMsg02TransformIn: [5, -5, { start: 0.6, end: 0.8 }],
    stickyMsg00TransformOut: [-5, -8, { start: 0.3, end: 0.33 }],
    stickyMsg01TransformOut: [-5, -8, { start: 0.55, end: 0.58 }],
    stickyMsg02TransformOut: [-5, -8, { start: 0.8, end: 0.83 }],
    canvasImgs: 300,
    canvasImgIndex: [0, 299],
   },
  },
  {
   // scene 1
   type: "normal",
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector("#js_scrollSection-1"),
   },
  },
  {
   // scene 2
   type: "sticky",
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector("#js_scrollSection-2"),
    stickyMsg20: document.querySelector("#js_scrollSection-2 #js_stickyMsg20"),
    stickyMsg21: document.querySelector("#js_scrollSection-2 #js_stickyMsg21"),
    stickyPin21: document.querySelector(
     "#js_scrollSection-2 #js_stickyMsg21 #js_stickyCont21 #js_stickyPin21"
    ),
    stickyMsg22: document.querySelector("#js_scrollSection-2 #js_stickyMsg22"),
    stickyPin22: document.querySelector(
     "#js_scrollSection-2 #js_stickyMsg22 #js_stickyCont22 #js_stickyPin22"
    ),
   },
   values: {
    stickyMsg20OpacityIn: [0, 1, { start: 0.1, end: 0.3 }],
    stickyMsg21OpacityIn: [0, 1, { start: 0.35, end: 0.55 }],
    stickyMsg22OpacityIn: [0, 1, { start: 0.6, end: 0.8 }],
    stickyMsg20OpacityOut: [1, 0, { start: 0.3, end: 0.33 }],
    stickyMsg21OpacityOut: [1, 0, { start: 0.55, end: 0.58 }],
    stickyMsg22OpacityOut: [1, 0, { start: 0.8, end: 0.83 }],
    stickyMsg20TransformIn: [0, -5, { start: 0.1, end: 0.3 }],
    stickyMsg21TransformIn: [0, -5, { start: 0.35, end: 0.55 }],
    stickyMsg22TransformIn: [0, -5, { start: 0.6, end: 0.8 }],
    stickyMsg20TransformOut: [-5, -8, { start: 0.3, end: 0.33 }],
    stickyMsg21TransformOut: [-5, -8, { start: 0.55, end: 0.58 }],
    stickyMsg22TransformOut: [-5, -8, { start: 0.8, end: 0.83 }],
    stickyPin21Height: [30, 80, { start: 0.35, end: 0.55 }],
    stickyPin22Height: [30, 80, { start: 0.6, end: 0.8 }],
   },
  },
  {
   // scene 3
   type: "sticky",
   heightNum: 5,
   scrollHeight: 0,
   objs: {
    container: document.querySelector("#js_scrollSection-3"),
   },
  },
 ];

 function setCanvasImgs() {
  if (!sceneInfo[currentScene].values.canvasImgs) {
   return;
  } else {
   for (let i = 0; i < sceneInfo[currentScene].values.canvasImgs; i++) {
    imgElem = new Image();
    imgElem.src = `../assets/video/00/astronomy_stars_${i}.jpg`;
    sceneInfo[currentScene].objs.imgObj.push(imgElem);
   }
  }
 }

 function setLayout() {
  // 각 섹션의 높이 지정해주기
  for (let i = 0; i < sceneInfo.length; i++) {
   if (sceneInfo[i].type === "sticky") {
    sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
   } else if (sceneInfo[i].type === "normal") {
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

  let rv;

  if (sceneValues.length === 3) {
   const animationScrollStart = scrollHeight * sceneValues[2].start;
   const animationScrollEnd = scrollHeight * sceneValues[2].end;
   const animationDuration = animationScrollEnd - animationScrollStart;

   if (
    currentYOffset >= animationScrollStart &&
    currentYOffset <= animationScrollEnd
   ) {
    rv =
     ((currentYOffset - animationScrollStart) / animationDuration) *
      (sceneValues[1] - sceneValues[0]) +
     sceneValues[0];
   } else if (currentYOffset < animationScrollStart) {
    rv = sceneValues[0];
   } else if (currentYOffset > animationScrollEnd) {
    rv = sceneValues[1];
   }
  } else {
   rv = scrollPercentage * (sceneValues[1] - sceneValues[0]) + sceneValues[0];
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
     sceneObjs.stickyMsg00.style.opacity = calcValue(
      sceneValues.stickyMsg00OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg00.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg00TransformIn,
      currentYOffset
     )}%, 0)`;
    } else {
     sceneObjs.stickyMsg00.style.opacity = calcValue(
      sceneValues.stickyMsg00OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg00.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg00TransformOut,
      currentYOffset
     )}%, 0)`;
    }

    if (scrollPercentage <= 0.55) {
     sceneObjs.stickyMsg01.style.opacity = calcValue(
      sceneValues.stickyMsg01OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg01.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg01TransformIn,
      currentYOffset
     )}%, 0)`;
    } else {
     sceneObjs.stickyMsg01.style.opacity = calcValue(
      sceneValues.stickyMsg01OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg01.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg01TransformOut,
      currentYOffset
     )}%, 0)`;
    }

    if (scrollPercentage <= 0.8) {
     sceneObjs.stickyMsg02.style.opacity = calcValue(
      sceneValues.stickyMsg02OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg02.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg02TransformIn,
      currentYOffset
     )}%, 0)`;
    } else {
     sceneObjs.stickyMsg02.style.opacity = calcValue(
      sceneValues.stickyMsg02OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg02.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg02TransformOut,
      currentYOffset
     )}%, 0)`;
    }
    break;

   case 2:
    // 현재 scene 에 적용할 CSS 값 선언하기
    if (scrollPercentage <= 0.3) {
     sceneObjs.stickyMsg20.style.opacity = calcValue(
      sceneValues.stickyMsg20OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg20.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg20TransformIn,
      currentYOffset
     )}%, 0)`;
    } else {
     sceneObjs.stickyMsg20.style.opacity = calcValue(
      sceneValues.stickyMsg20OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg20.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg20TransformOut,
      currentYOffset
     )}%, 0)`;
    }

    if (scrollPercentage <= 0.55) {
     sceneObjs.stickyMsg21.style.opacity = calcValue(
      sceneValues.stickyMsg21OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg21.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg21TransformIn,
      currentYOffset
     )}%, 0)`;
     sceneObjs.stickyPin21.style.height = `${calcValue(
      sceneValues.stickyPin21Height,
      currentYOffset
     )}px`;
    } else {
     sceneObjs.stickyMsg21.style.opacity = calcValue(
      sceneValues.stickyMsg21OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg21.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg21TransformOut,
      currentYOffset
     )}%, 0)`;
    }

    if (scrollPercentage <= 0.8) {
     sceneObjs.stickyMsg22.style.opacity = calcValue(
      sceneValues.stickyMsg22OpacityIn,
      currentYOffset
     );
     sceneObjs.stickyMsg22.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg22TransformIn,
      currentYOffset
     )}%, 0)`;
     sceneObjs.stickyPin22.style.height = `${calcValue(
      sceneValues.stickyPin22Height,
      currentYOffset
     )}px`;
    } else {
     sceneObjs.stickyMsg22.style.opacity = calcValue(
      sceneValues.stickyMsg22OpacityOut,
      currentYOffset
     );
     sceneObjs.stickyMsg22.style.transform = `translate3d(0, ${calcValue(
      sceneValues.stickyMsg22TransformOut,
      currentYOffset
     )}%, 0)`;
    }
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
  playAnimation();
 }

 window.addEventListener("load", setLayout);
 window.addEventListener("resize", setLayout);
 window.addEventListener("scroll", () => {
  yOffset = window.scrollY;
  scrollLoop();
 });

 setLayout();
 setCanvasImgs();
})();
