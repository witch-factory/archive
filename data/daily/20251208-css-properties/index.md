---
title: web.dev에 CSS 글들
description: web.dev에 있던 CSS 속성 관련 글들을 몇 개 읽어보기
---

## inert 속성

web.dev - inert 속성 https://web.dev/articles/inert?hl=ko

toast ui - HTML 요소 inert 속성에 대해 알아보자 https://ui.toast.com/posts/ko_20220603

inert는 모든 HTML 요소에 들어갈 수 있는 속성으로 요소의 사용자 상호작용을 억제한다. focus, click, 탭 키를 통한 접근과 검색 가능성 차단.

- `pointer-events: none;`, `user-select: none;` 처럼 동작
- non-editable 취급
- 사용자 에이전트의 노드 탐색에서 무시됨

예를 들어 `<dialog>` 요소를 썼을 때 나머지 부분들이 사용자 상호작용을 못 받게 하는 데 쓰인다. `<dialog>`의 기본동작이기도 하다.

또한 내부 요소들에도 적용된다. 이렇게 하면 내부의 버튼도 포커스, 클릭 등을 받을 수 없다.

```html
<div inert>
  <label for="button2">Button 2</label>
  <button id="button2">I am inert</button>
</div>
```

위처럼 HTML 요소에 넣어주는 것 뿐 아니라 JS DOM API에서 동적으로 넣어 주는 것도 가능

접근성 향상을 위해 쓸 수 있다. inert를 활성화하면 탭 순서와 접근성 트리에서 해당 요소가 삭제되기 때문이다. 즉 검색 가능성/포커스 상호작용 억제가 가능해진다.

DOM 트리에서 삭제되는 건 아니므로..`aria-hidden`이랑 비슷하다고 생각하면 된다. 이럴 때 사용한다.

- 요소가 DOM 트리의 일부이지만 화면 밖에 있거나 숨겨져 있는 경우
- 요소가 DOM 트리의 일부이지만 상호작용이 없어야 하는 경우

대표적인 경우가 dialog나 drawer(사용자에게 표시되지 않는 요소를 렌더링하는데, 사용자가 상호작용 못 하게 해야 하니까)
혹은 폼이 제출 중일 때 대화상자와 상호작용 불가능하도록 하기

또한 사용자를 위해 inert 속성이 지정된 요소에는 CSS를 지정해 시각적으로 비활성을 나타내주는 게 좋다. `disabled`와 달리 inert는 기본 스타일 변경을 안 해주기 때문.

```css
[inert],
[inert] * {
  opacity: 0.5;
  /* ... */
}
```

## CSS 그리드

web.dev 그리드 https://web.dev/learn/css/grid?hl=ko

그리드 형식 레이아웃으로 요소 배치하기

용어들

- 그리드 라인: 그리드를 구분하는 선. 열이 4개일 경우 마지막 열 다음까지 5개의 column line 존재. **1부터 센다**
- 그리드 트랙: 행/열 트랙이 있음. 두 그리드 라인 사이 공간
- 그리드 셀: 그리드의 한 칸

`grid-template-columns`으로 각 열의 너비를, `grid-template-rows`로 각 행의 높이를 지정한다. 여기 지정한 만큼 행/열이 생긴다. 다음처럼 지정했으면 5em, 100px, 30% 너비 이렇게 3개의 열이 생긴 것. `auto`를 쓰면 기본적으로 크기가 자동 조정되는데, 컨텐츠만큼 크다고 보면 됨.

```css
.container {
  display: grid;
  grid-template-columns: 5em 100px 30%;
  gap: 10px;
}
```

`min-content`, `max-content` 키워드로 크기를 조정도 가능. `fit-content(크기)`는 처음엔 `max-content`처럼 동작하다가 인수로 전달한 크기에 도달하면 줄바꿈 시작. 즉 `fit-content(10em)`이면 10em보다 크지 않은 경우 그 미만 너비의 트랙 생성.

`fr`을 이용해 사용 가능한 공간을 얼마나 차지할 건지 나타내기 가능. `minmax(mn, mx)`로 트랙의 최소/최대 크기 지정 가능. 예를 들어 `minmax(10px, 1fr)`

트랙 수를 지정 안 하고 컨테이너에 맞는 만큼 많이 만들기: `auto-fill`, `auto-fit`. 이걸 minmax와 함께 사용하면 이런 식으로 응용 가능. 최소 200px, 최대 1fr의 칸들이 컨테이너 꽉 차게 생긴다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
```

기본적으로 칸들은 행을 따라 배치(`grid-auto-flow: row`). 이 값을 조정하면(`grid-auto-flow: column`)칸들이 column-major로 배치됨. `dense` 옵션을 줘서 남은 공간 채우도록 할 수도 있다. `writing-mode`를 통한 배치 방향 추가제어 가능.

`grid-column-(start|end)`로 시작/마지막 그리드 라인 지정 가능. `span 2`처럼 여러 트랙에 걸치기 가능. 이 옵션을 사용하면 두 칸 겹치기도 가능. 예를 들어 `grid-column:1/3`이면 1~3 그리드 라인 사이에 배치됨. 근데 `grid-column:1/4`인 다른 칸이 있으면 같은 칸에 배치되니까 겹쳐진다.

근데 `grid-column:1/3`처럼 라인 기반 배치를 사용하면 암시적 그리드(예를 들어 열 수만 정의하고 행 수를 정의 안 한 경우의 row grid track)에서는 음수 라인 번호를 사용할 수 없다.

- 암시적 트랙 크기

암시적 그리드의 경우 크기 자동 조정. 이를 조절하려면 `grid-auto-rows`, `grid-auto-columns` 사용.

예시

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 100px 100px;
  grid-auto-rows: 80px; /_ 암시적 행은 80px로! _/
}
```

이러면 100px짜리 열 3개에 자동으로 차례차례 항목들이 들어간다. 이때 2행까지는 100px 높이를 가지는데 그 다음 3행부터는 열 높이가 지정되지 않았으니 암시적 그리드. 이 높이를 `grid-auto-row`로 지정한다.

- 라인에 이름 붙이기

라인에 번호 대신 이름을 붙여서 항목 배치에 사용 가능. 동일한 대괄호 내에서 공백 구분을 통해 여러 이름 붙이기도 가능. `grid-row` 등에서 해당 이름을 사용해서 좀 더 직관적 배치 가능하다.

```css
.container {
  display: grid;
  grid-template-columns:
    [main-start aside-start] 1fr
    [aside-end content-start] 2fr
    [content-end main-end]; /* a two column layout */
}

.sidebar {
  grid-column: aside-start / aside-end;
  /* placed between line 1 and 2*/
}
```

- 영역에 이름 붙이기

그리드 영역에 이름 지정 후 명명된 영역에 항목 배치도 가능. `grid-area`랑 `grid-template-areas` 사용 https://web.dev/learn/css/grid?hl=ko#%EA%B7%B8%EB%A6%AC%EB%93%9C_%ED%85%9C%ED%94%8C%EB%A6%BF_%EC%98%81%EC%97%AD

`grid-template-areas`에 `grid-area`로 이름을 지정한 클래스들을 차례차례 배치하는 것이다. 그리드 내에 항목들이 어떻게 배치될지 직관적으로 표현 가능

```css
header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.content {
  grid-area: content;
}

footer {
  grid-area: footer;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "header header header header"
    "sidebar content content content"
    "sidebar footer footer footer";
}
```

`grid-template-areas` 값에 grid-area로 지정했던 이름들이 배치대로 나온 게 보인다. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas

약식 속성: `grid-template`, `grid`

정렬(`justify-`, `align-`)은 flex layout에서와 같다.

## CSS 서브그리드

https://web.dev/articles/css-subgrid?hl=ko

CSS 그리드
