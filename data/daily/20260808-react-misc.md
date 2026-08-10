---
title: 2026-08-08 React 새로 알게 된 것들 팔로우업
description: React에서 몰랐던 내용들과 새로나온 기능들을 알아보았다.
date: 2026-08-08
---

## useRef 관련 내용

Ref로 값 참조하기 https://ko.react.dev/learn/referencing-values-with-refs

기억해두고 싶지만 해당 정보의 업데이트가 일어났을 때 리렌더링이 유발되는 걸 막으려고 할 때 `useRef`를 쓴다. ref는 mutable로 사용할 수 있다. 실제 구현은 따로 되어 있지만 이런 식의 state라고 생각할 수 있다.

```jsx
const [ref, _] = useState({ current: initialValue });
```

useRef는 항상 동일한 객체를 반환하므로 state setter는 필요하지 않다. current만 변경하면 된다.

### 언제 쓰는가

보통 UI 컴포넌트 형태에 영향을 미치지 않으면서 리렌더링시 초기화되지 않도록 저장해야 하는 값에 쓴다.

공식 문서의 예시는 이렇다.

1. timeout ID 저장
2. DOM 요소 저장/조작(다음 섹션에 정리)
3. JSX 계산에는 필요없는 다른 객체 저장

단 렌더링 중엔 ref를 읽거나 쓰지 않아야 한다.

### ref로 DOM 조작

`useRef`로 선언한 ref를 DOM 노드를 가져와야 하는 JSX 태그에 ref 속성으로 전달한다. 그러면 ref를 통해 DOMㅡㄹ 조작할 수 있다.

```jsx
<div ref={myRef}>
```

초기에는 `myRef.current`가 null이다가 React가 DOM 노드를 생성할 때 `myRef.current`에 해당 노드 참조를 넣어준다. 그럼 그걸 통해 이벤트 핸들러에서 접근하거나 브라우저 API 사용 가능

---

### ref callback

https://ko.react.dev/reference/react-dom/components/common#ref-callback

ref가 붙은 요소가 여러 개 필요할 수 있다. 예를 들어 N개 항목이 있는 리스트의 각 항목에 `scrollIntoView`가 붙은 이벤트 핸들러를 달아줘야 할 수도 있고.

그렇다고 이렇게 할 수는 없다.

```jsx
// 잘못된 예시
<ul>
  {items.map((item) => {
    // 안된다. 훅은 컴포넌트 최상단에서만 호출되어야 하기 때문
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

다음과 같이 DOM API를 쓸 수도 있다.

1. 부모에 단일 ref를 만든다
2. 거기에 `querySelectorAll` 등의 DOM API 결과물을 담는다
3. 이벤트 핸들러 함수에서 해당 DOM에서 특정 자식 노드를 찾도록 한다.

하지만 이건 다루기 힘든 편이다. 따라서 `ref` 속성에 함수를 전달하는 ref 콜백 테크닉을 고려할 수 있다. ref에는 해당 노드의 DOM 참조를 첫번째 인수로 받는 함수를 전달할 수 있기 때문이다.

아까 리액트는 해당 노드가 렌더링될 때 `ref.current`에 노드 참조를 넣어준다고 했다. 만약 ref가 함수라면 리액트는 DOM 노드가 화면에 추가되는 시점에, ref 콜백을 호출하고 그 인자로 DOM 노드를 전달한다. 해당 DOM 노드가 제거되면 리액트가 콜백에서 반환하는 클린업 함수를 호출한다.

이때 전달되는 인수명은 el이나 `node` 같은 걸로 하는 듯 하다. 공식문서에서는 `node`를 썼다.

따라서 배열이나 Map을 관리하며 인덱스, ID 등으로 ref에 접근할 수 있게 한다. 예를 들어 긴 리스트에서 특정 노드에 스크롤을 하려 한다면 이런 식으로 할 수 있다.

```jsx
function App() {
  const itemsRef = useRef(new Map<string, HTMLLIElement>());

  const scrollTo = (itemId: string) => {
    const item = itemsRef.current.get(itemId);
    if (!item) return;
    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div>
      <div>
        {ITEMS.map((item) => (
          <button key={item} onClick={() => scrollTo(item)}>
            {item}
          </button>
        ))}
      </div>

      <ul>
        {ITEMS.map((item) => (
          <li
            key={item}
            ref={(el) => {
              const mp = itemsRef.current;
              mp.set(item, el as HTMLLIElement);

              return () => {
                mp.delete(item);
              };
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

`itemsRef`는 식별자-DOM 노드 쌍이 연결될 수 있는 map을 갖고 있다. 그리고 각 `li` 태그에 붙은 ref 콜백은 해당 DOM 노드가 생길 때 식별자-DOM 노드를 map을 통해 연관시킨다.

그리고 이벤트 핸들러(`scrollTo`)에서는 map을 통해 개별 DOM 노드를 읽게 된다. 이때 클린업 함수에서 map 정리를 잊지 말자.

- Strict Mode와 ref callback

strict mode는 잘 알려져 있다시피, 순수해야 하는 함수(state setter 등등)을 2번씩 실행한다. 순수 함수의 경우 당연히 2번 실행되어도 동작이 변하지 않기 때문에, 만약 strict mode에서 뭔가 의도하지 않은 동작이 생기면 버그라는 걸 알 수 있다.

ref 콜백에도 이건 적용되는데, 만약 위와 같은 ref 콜백에서 클린업이 없을경우 문제가 될 수 있다.

위와 같은 경우에는 ITEMS 배열 하나만 쓰기 때문에 괜찮을 수도 있겠지만, 만약 저 배열이 바뀔 수 있는 거였다면? 그럼 클린업이 되지 않고 계속 Map에 요소만 추가되게 된다. 따라서 해당 요소가 없어질 때 호출될 클린업을 꼭 해야 하고, 이게 안 되어 있을 경우 strict mode가 클린업 함수 누락 검출에 도움을 줄 수 있다.

### 주의사항

- 커스텀 컴포넌트에 ref를 주입할 때는 기본적으로 `null`이 주어진다. 내장 컴포넌트까지 내려가도록 `ref`를 props로 전달하거나 해야 한다.

- 커스텀 컴포넌트를 만들 때와 같은 경우에 이런 식으로 ref를 외부로 노출할 수 있다. 그런데 내가 만든 커스텀 컴포넌트에 `focus` 와 같은 건 가능하게 하고 싶어도 css 스타일은 불변으로 하고 싶은 등, 노출된 기능을 제한하고 싶을 수 있다. 이럴 때 `useImperativeHandle` 사용. 그렇게 하면 부모에서 전달한 `ref`는 DOM 노드가 아니라 useImperativeHandle에서 직접 구성한 객체가 된다. 따라서 의도적으로 `useImperativeHandle`에서 노출한 메서드만 갖고 있다.

- ref 접근은 대부분 이벤트 핸들러에서 일어난다. 어떤 버튼을 눌렀을 때 어디에 focus된다든지

- ref 접근이 특정 state 변경 이후에 일어나야 할 때가 있다. 그렇게 state 변경을 동기적으로 수행하도록 하려면 `react-dom`의 `flushSync`로 state 업데이트를 감싼다.

```jsx
flushSync(() => {
  setTodos([...todos, newTodo]);
});
// todo 업데이트가 끝난 다음 실행된다.
listRef.current.lastChild.scrollIntoView();
```

https://ko.react.dev/learn/manipulating-the-dom-with-refs#flushing-state-updates-synchronously-with-flush-sync

- dom 노드를 일반적으로 react가 관리하도록 하고, remove 같은 파괴적 연산을 하지 말도록 하자.

- 특정 이미지가 활성화되어 있고, 활성화된 이미지로 스크롤하는 기능 같은 게 있다고 하자. 그러면 특정 이미지를 활성화할 때, "특정 이미지를 활성화로 지정(state 설정)"과 "활성화된 이미지로 스크롤" 2가지를 해야 한다. 첫번째를 할 때는 `scrollIntoView` 전에 state setter를 `flushSync`에 넣어야 한다는 걸 주의해야 하고, 두번째(활성화 이미지로 스크롤)를 할 때는 ref를 지정해야 하는데 이때 조건부로 지정하는 것도 가능함을 알고 있자. 예를 들어 다음과 같이 하면 map으로 렌더링할 때 index가 i인 요소의 DOM 노드가 `selectedRef`에 할당된다.

```jsx
<li ref={index === i ? selectedRef : null}>
```
