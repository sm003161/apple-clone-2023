# 240115

## \`${}`

ES6부터 도입된 문자 표기 문법. 백틱과 ${} 사인을 이용해 문자열과 변수를 자유롭게 사용할 수 있다. 파이썬에서 fstring 같은 느낌.

```js
const name = "키자이";
console.log(`안녕하세요, ${name} 입니다.`);
```

## +=, -=, \*=, /=

변수의 값을 업데이트할 때, 변수를 지속적으로 기재하는 번거로움을 줄이도록 ES6부터 도입된 표현식이다.

```js
let i = 1;

function addNumber() {
 // i = i + 1;
 i += 1;
}
```

# 240218

## new Image()

HTML 안에 새로운 이미지를 생성하는 함수. For 반복문과 함께 사용하면 굿.

```js
createImg = new Image();
```

## Canvas

HTML 안에 캔버스를 만들어 2D 또는 3D 를 그릴 수 있게 하는 JS API 로, 기본적으로 canvas 엘리먼트와 그 안에 그려질 context 라는 내용을 선언해 동작시킨다.

```html
<body>
 <canvas></canvas>
</body>
```

```js
// 1. 캔버스와 컨텍스트를 호출한다.
const canvas = document.querySelector(canvas);
const ctx = canvas.getContext("2d");

// 2. 캔버스에 그린다.
.....
```
