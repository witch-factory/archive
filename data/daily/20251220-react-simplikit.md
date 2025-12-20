---
title: 2025-12-20 react-simplikit 등의 라이브러리
description: react에서 자주 쓰이는 도구들을 모아놓은 React-simplikit을 보았다.
---

## react-simplikit

리액트로 작업하다 보면 비슷한 코드가 반복된다. 예를 들어 이런 것.

```jsx
const [isChecked, setIsChecked] = useState(false);

const handleCheckboxToggle = () => {
  setIsChecked(!isChecked);
};
```

혹은 어떤 속성에 따라 다른 컴포넌트 렌더링하기.

```jsx
switch (a.type) {
  case "A":
    return <CompA />;
  case "B":
    return <CompB />;
  // ...
}
```

그래서 토스에서, es-toolkit의 리액트 버전 같은 느낌의 유틸 라이브러리를 만든 게 있는데 이게 react-simplikit으로 보인다.

> react-simplikit은 자주 사용되지만 직접 구현하기 복잡한 기능들을 적절히 추상화하여 제공해요. 이를 바탕으로 복잡한 로직을 가지는 컴포넌트를 작성할 때도 직관적인 가독성을 유지할 수 있어요.
>
> react-simplikit은 실제 서비스를 개발하면서 자주 접하게 되는 다양한 문제들을 선언적으로 해결하는 인터페이스를 제시해요.
>
> [출처: react-simplikit 문서의 "react-simplikit, 선택의 이유"](https://react-simplikit.slash.page/ko/why-react-simplikit-matters.html)

토글하는 걸 `useToggle` 훅으로, 속성값에 따라 다른 컴포넌트를 렌더링하는 걸 `SwitchCase` 컴포넌트를 통해 제공한다.

물론 `useToggle` 같이 단순한 기능을 제공하는 경우도 있다. 하지만 지정된 컨테이너 외부에서 클릭 이벤트가 발생할 때 콜백을 트리거하는 `useOutsideClickEffect`와 같이, 직접 구현하기는 까다로운 것들을 깔끔하게 제공한다.

`useGeolocation` 처럼 직접 쓰기 귀찮은 웹 API들의 래퍼도 제공하고 있다.

이 라이브러리 기능 하나하나가 중요하다기보다는 이런 식으로 선언적인 코드를 작성하는 걸 도와주고, 맥락을 줄임으로써 개발에 있어서 정말 중요한 걸 고민할 수 있도록 해주는 게 의미있다고 생각한다. 언젠가 한번 뭐뭐가 있는지 대강 훑어보면 좋겠다.

## 참고

react-simplikit 공식 페이지 https://react-simplikit.slash.page/ko/
