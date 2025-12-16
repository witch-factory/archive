---
title: 20251212 svelte 문서 리딩
description: 빠와 까를 미치게 하는 svelte
---

svelte를 써볼 일이 있어 공식 문서 튜토리얼을 진행해 보았다. 직접 따라해가며 해볼 수 있는 튜토리얼이 있더라.

svelte는 다른 UI 프레임워크처럼 마크업, 스타일, 동작까지 함께 있는 컴포넌트로 선언적 코드로 앱을 만들게 해줌 -> 작고 효율적인 JS 모듈로 "컴파일"됨

nextjs같은 느낌의 svelteKit도 있다.

## 시작

`npx sv create`로 프로젝트 시작 가능

컴포넌트는 `.svelte` 파일에 쓴다. HTML, CSS, JS가 있음

JS는 `<script>` 태그 내부에 씀. 이런 구조

```svelte
<script lang="ts">
    // JS
</script>

// 이곳에 컴포넌트 HTML 구성
script 내에 정의된 변수들 {var} 처럼 갖다쓰기 가능
// import한 컴포넌트들 여기서 사용 가능

<style>
    /* 스타일 */
</style>
```

이 style은 컴포넌트 스코프로 적용되어서 다른 곳에 영향을 미치지 않음

`<script>` 태그 내에서 import하면 해당 컴포넌트 사용 가능. import한 컴포넌트라고 해도 스타일은 컴포넌트 스코프

HTML 렌더링을 하려면 `{@html string}` 처럼 특수 HTML 태그 쓰면 됨
**XSS 방어를 위한 sanitize 같은 거 수행 안 함**

## 반응성

`$state`를 이용해서 reactive하게 동작하는 변수를 만들 수 있다. 이걸 rune이라고 한다. 다음처럼 직접 변경이 가능하다.

```svelte
<script lang="ts">
	let count = $state(0);

	const increment = () => {
		count += 1;
	};
</script>

<p>Count: {count}</p>
<button onclick={increment}>Increment</button>
```

배열 같은 걸 굳이 불변으로 만들지 않아도 state는 반응형으로 동작한다. proxy를 사용하는 걸로 보임

다른 상태에서 derived 되는 상태의 경우 react는 상수로 선언하는데 svelte는 `$derived` 룬 사용. derived 내의 표현식은 의존성 변경시마다 재평가

```js
let numbers = $state([1, 2, 3, 4, 5]);

const numbersTotal = $derived(numbers.reduce((acc, curr) => acc + curr, 0));
```

state 값 조사를 위해선 `$state.snapshot(state)`이나 `$inspect` 사용

```js
$inspect(state).with(로그 찍기 함수)
```

effect를 개발자가 발생시킬 수 있도록 해주는 `$effect` 단 이벤트 핸들러에 사이드이펙트를 넣을 수 있다면 그게 더 낫다.
`$effect`에서 콜백을 리턴하도록 하면, `useEffect` 콜백의 리턴과 같이 interval 종료나 정리 같은 걸 하도록 할 수 있음

또한 `shared` 파일에 state를 넣고 다른 곳에서 import하는 방식으로 전역 state 객체 관리도 가능.

- `.js`말고 `.svelte.js`에서만 룬을 사용 가능

## props

props는 `$props` 룬을 통해서 하위 컴포넌트에 전달한 속성을 받을 수 있다. react props랑 비슷. 다음과 같이 받아서 사용한다.

```svelte
// answer = ...로 하면 react props에서처럼 기본값도 지정 가능
<script>
	let { answer } = $props();
</script>

<p>The answer is {answer}.</p>
```

spread로 props 전달도 가능. 진짜 react랑 비슷하다..

## logic

조건부 렌더링을 위해서는 `{#if}` 로 블럭 시작

`{#...}`으로 블럭 시작
`{:...}`으로 블럭 계속
`{/...}`으로 블럭 종료

```svelte
{#if count > 10}
	<p>Count is greater than 10</p>
{:else if count > 5}
	<p>Count is greater than 5</p>
{:else}
	<p>Count is less than 5</p>
{/if}
```

리액트에서 map을 사용하는 것처럼 스벨트에서는 `{#each}`블록으로 목록 렌더링 가능. 열거하는 목록은 array-like 즉 `Array.from`이 동작하는 모든 객체

```svelte
{#each 리스트 as 항목명}
//...
{/each}

// 예시
<div>
	{#each colors as color}
		<button
			style="background-color: {color}"
			aria-label={color}
			aria-current={selected === color}
			onclick={() => (selected = color)}
			>{color}
		</button>
	{/each}
</div>
```

`{#each colors as color, i}`처럼, react의 map으로 렌더링하는 것처럼 2번째 인수로 현재 인덱스 얻기도 가능. 이걸 통해서 순서를 표시하거나 할 수 있다.

### key

리액트랑 비슷하면서도 다른 개념의 key를 써야 할 때가 있다. 리액트는 state가 변경되면 전체 컴포넌트를 리렌더링하는데 스벨트는 컴포넌트를 1번만 렌더링하고 연관된 업데이트는 세분화된다.

믈론 연관된 업데이트가 담긴 값을 `$derived`로 할 수도 있다. 하지만 각 블록 반복마다 key를 지정하는 방법도 있다. 이렇게 하면 each의 각 iteration마다 key를 부여한다. `thing (thing.id)`

```ts
{#each things as thing (thing.id)}
	<Nested selected={thing.name} />
{/each}
```

비동기 데이터 처리는 `{#await} - {/await}` 블록 사용. `{:then}`, `{:error}` 블록도 promise 값을 받는 것처럼 쓸 수 있다.

```svelte
{#await promise}
	<p>rolling...</p>
{:then number}
	<p>result is {number}</p>
{:catch error}
	<p>{error.message}</p>
{/await}
```

약속이 reject되지 않을 거라면 catch 블록 생락할 수도 있고, 만약 약속이 resolve되어 then 블록까지 아무것도 안 보여주고 싶다면 `{#await} - {:then}` 사이를 생략하고 다음과 같이 쓰기도 가능.

```svelte
{#await promise then number}
	<p>result is {number}</p>
{/await}
```

## dom event

`onclick`, `onpointermove` 같은 이벤트 부착도 가능. 바닐라 html+js랑 비슷함

보통 이벤트는 버블링(내부->외부 전파)되는데, 캡처링(외부->내부 전파)을 쓰고 싶다면 `onkeydowncapture` 같이 capture가 붙은 이벤트를 쓴다.

이벤트 핸들러를 props로 전달받아서 사용하는 것도 가능. react에서 `onClick` 핸들러 전달하는 거랑 비슷하다.

`{...props}` 처럼 spread props를 사용해도 이벤트 핸들러까지 다 spread된다.

## binding

일반적으로 스벨트의 데이터는 단방향(리액트랑 같음)이다. 근데 이걸 깨고 양방향 바인딩을 하는 게 좋을 때도 있다. 이걸 위해서는 `bind` 쓸 수 있음. `input`같은 경우 value 대신 `bind:value` 쓰면 됨

```svelte
<!-- name의 변경이 input에 반영됨. input 값 변경은 value에 영향 X -->
<input value={name} />
<!-- input value와 name이 바인딩  -->
<input bind:value={name} />
```

`<input type="number">`등은 숫자를 값으로 갖는다. 하지만 dom에서는 모든 input 값이 숫자여야 한다. `input`의 `target.value`가 state와 왔다갔다할 때 형변환을 해줘야 한다. `bind:value` 사용시 이게 스벨트에서 자동으로 처리됨

- 체크박스는 `bind:checked`
- select는 `bind:value`(객체도 알아서 처리해줌). 만약 select에 `multiple` 옵션이 있으면 command 눌러서 다중 선택 가능한데 이 경우 select의 `value`는 배열이 되고 선택에 따라 요소가 채워짐
- 같은 값에 대해 여러 input이 있다면(radio/checkbox...) `bind:group`으로 가능
- textarea도 `bind:value`

## class, styles

스벨트 class에 배열을 전달하여 일종의 `clsx` 형식으로 클래스를 쓸 수 있다. 좀 편하게 클래스를 쓰는거.

인라인 스타일도 그대로 쓸 수 있다. 근데 인라인 스타일에 문자열을 그대로 이렇게 박으면 이상해 보인다.

```svelte
<button
	class="card"
	style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"
	onclick={() => flipped = !flipped}
>
```

따라서 `style:` directive를 이용해 정리 가능.

```svelte
<button
	class="card"
	style:transform=...
>
```

자식 컴포넌트의 스타일에 영향을 줘야 할 때가 있다.

- 방법 1: 다른 컴포넌트 내의 요소를 스타일링할 수 있게 css에 `:global` 디렉티브 사용

```svelte
<!-- 원래 svelte는 각 컴포넌트의 스타일이 독립적인데, :global 디렉티브 쓰면 무차별적으로 적용 가능 -->
<style>
	.boxes :global(.box:nth-child(1)){
		background-color: blue;
	}
</style>
```

문제는 장황하고 유지보수가 힘들다. 또한 원칙적으로 "컴포넌트는 어떤 스타일을 외부에서 제어할 수 있는지를 스스로 결정할 수 있어야 한다". props의 형태를 정하는 것과 마찬가지로 말이다.

css 변수를 통해서 외부에서 변경할 수 있도록 한다. 예를 들어 `Box` 컴포넌트 스타일을 이렇게 지정한다.

```svelte
<style>
	.box {
		background-color: var(--color, #ddd);
	}
</style>
```

이러면 Box의 어떤 부모 요소, 혹은 `Box`의 사용처에서도 `--color`의 값을 설정 가능하다.(동적 설정도 가능)

```svelte
<Box --color="gold">
```

이 기능은 각 컴포넌트를 `display: contents`가 있는 요소로 감싸고 커스텀 속성을 적용하는 방식으로 동작한다.

`display: contents` - https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display#box

## attachments

attachments는 `@attach`로 요소에 부착하는데 일종의 effect이다. 요소가 생성시 실행되고 언마운트시 클린업(리턴하는 콜백)을 실행한다.

```svelte
<div {@attach 함수}>
```

attachment 함수가 매개변수나 컴포넌트 상태에 의존해야 할 경우 factory 함수 만들어서 쓸 수도 있다.

```js
function tooltip(content) {
  return (node) => {
    const tooltip = tippy(node, { content });
    return tooltip.destroy;
  };
}
```

이런 걸 쓰고 `@attach tooltip(content)` 처럼 요소에 부착

## transition

transition directive로 쉽게 트랜디션 애니메이션 넣기 가능. `svelte/transition` 패키지에서 import

```svelte
<p transition:fade>
	Fades in and out
</p>
```

`transition:fly={{y:200}}` 처럼 transition 함수가 인자를 받을 수도 있다. 이 경우 애니메이션은 왕복으로 적용된다.

transition 대신 `in`, `out` directive를 써서 마운트될 때/언마운트될 때의 애니메이션을 따로 지정할 수도 있다. 이러면 애니메이션은 왕복이 아니라 각각에 대해 적용

커스텀 애니메이션 transition 함수 만들기 - transition이 적용될 노드, 그리고 전달될 인자들을 받아서 transition 객체를 반환한다. 리턴 객체 타입은 이곳 참조 https://svelte.dev/tutorial/svelte/custom-css-transitions

보통 `tick` 말고 `css` 를 반환하는 게 거의 더 효율적.

원하면 이런 복잡한 애니메이션 커스텀도 가능(무지개색으로 변하고 회전하면서 등장)

```js
function spin(node, { duration }) {
  return {
    duration,
    css: (t, u) => {
      const eased = elasticOut(t);

      return `
				transform: scale(${eased}) rotate(${eased * 1080}deg);
				color: hsl(
					${Math.trunc(t * 360)},
					${Math.min(100, 1000 * u)}%,
					${Math.min(50, 500 * u)}%
				);`;
    },
  };
}
```

리턴 객체의 `tick` 속성을 이용해서 tick마다 일어나는 일을 정의 가능하다. 이런 걸 이용하면 글자가 한 글자씩 타이핑되는 애니메이션도 만들 수 있다.

transition 시작/끝 이벤트 `onintrostart`, `onoutrostart` `onintroend` `onoutroend`

- global event

보통 트랜지션은 직접적인 부모 블록이 추가/제거될 때만 실행된다. 만약 더 상위의 블록이 제거되면(예를 들어 list item에 transition이 붙으면 보통 해당 list item에 대해서만 트랜지션이 실행된다. list 전체가 제거되거나 할 때는 애니메이션 없음) 트랜지션이 안된다.

Global transition을 넣으면 해당 요소를 포함하는 "어떤 블록이든" 추가/제거될 때 트랜지션이 실행되게 할 수 있다. transition 디렉티브 값에 `|global`을 붙이면 됨. `transition:slide|global` 처럼 말이다.

- key block

요소를 key block으로 감싸면 key가 바뀔 때마다 내부 요소를 다시 만든다. `in`과 같은 애니메이션도 다시 실행됨. 어떤 값이 바뀔 때마다 DOM에 다시 올리고 또 애니메이션도 실행시키고 싶으면 써보자.

```svelte
{#key 키값}
<!-- // ... -->
{/key}
```
