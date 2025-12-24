---
title: 2025-12-20 react-simplikit, overlay-kit 등 토스 라이브러리
description: react에서 자주 쓰이는 도구들을 모아놓은 React-simplikit을 보았다.
---

토스에서는 여러 라이브러리를 공개하고 있는데 그것들을 알아볼 때마다 적는다.

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

### 참고

react-simplikit 공식 페이지 https://react-simplikit.slash.page/ko/

## overlay-kit

`@toss/use-overlay`와 비슷하게 오버레이(모달, 팝업...)를 관리하게 위해 사용할 수 있는 라이브러리다. reducer 기반으로 구현되었다고 한다.

최상단 `App` 같은 걸 `OverlayProvider`로 감싸고, 내부에서 `overlay.open(...)` 하면 된다.

```jsx
<Button
  onClick={() => {
    overlay.open(({ isOpen, close }) => {
      return <ConfirmDialog isOpen={isOpen} close={close} />;
    });
  }}
>
  Confirm Dialog 열기
</Button>
```

`overlay.openAsync`를 쓰면 openAsync에서 Promise를 반환하여 비동기로 다이얼로그 결과를 반환한다. 값을 반환하기 위해 콜백을 쓴다든지 하는 편법이 필요없어진다. UI와 동작이 분리되고 오버레이를 쓰는 UI는 UI에만 집중 가능

닫는 방법

- close: 닫기 애니메이션 실행, 다시 열었을 때 이전 상태 저장(메모리에서 제거 X)
- unmount: 바로 메모리에서 정리. 따라서 닫기 애니메이션도 없고 상태도 초기화됨

누수를 막기 위해 메모리 해제를 하려면 close 이후 `useEffect`의 클린업등을 이용해 그때 `unmount`

복잡한 오버레이 관리, 성능 최적화, 대규모 애플리케이션에서의 공통 사양 적용 등의 이점이 있다.

오버레이 열 때 `overlay.open`(물론 `openAsync`도)의 2번째 인자로 overlayId 속성을 갖는 객체를 넘겨서 id 지정 가능. id를 지정하지 않으면 내부적으로 ID가 자동으로 지정된다고 한다.

```jsx
overlay.open(
  // close로 닫기
  ({ isOpen, close }) => <ConfirmDialog isOpen={isOpen} close={close} />,
  { overlayId: "custom-overlayId" }
);
```

`useCurrentOverlay`로 현재 열려있는 오버레이의 ID를 얻을 수 있다. `useOverlayData`는 현재 메모리에 있는(close되었어도 unmount 안 되어서 메모리에 남아 있는 것까지) 모든 오버레이의 상태 정보를 얻게 해준다. https://overlay-kit.slash.page/ko/docs/guides/hooks

React 컴포넌트가 아닌 곳에서도 `overlay.open` 사용 가능(물론 렌더링되는 곳이 OverlayProvider의 영향에 있기는 해야 한다).

`overlay.closeAll`, `overlay.unmountAll` 같이 열려 있는 모든 오버레이에 영향을 미치는 함수도 있다.

`overlay.open`의 콜백 인자 `close` 뿐만 아니라 `overlay.close(overlayId)`를 통해서도 overlay를 닫을 수 있다.
