---
title: 토글 스위치 만들기
description: 토글 스위치를 만들어보자
---

회사에서 on/off 상태가 있는 스위치를 만들 일이 있었다. 기존 코드는 완전한 제어 컴포넌트도 아니고 내부에 `value` state를 따로 두고 props로 받은 값과 해당 state를 `useEffect`를 통해 동기화하도록 짜여 있었다.

스타일링이나 다른 props 로직을 제외하고 기본적인 Switch 구현만 재현해 보면 이런 식이었다.

```tsx
interface Props {
  value: boolean;
  onToggle: (value: boolean) => void;
}

export default function Switch(props: Props) {
  // 1. Props로 받은 값을 내부 state의 초기값으로 할당
  const [value, setValue] = useState(props.value);

  // 2. Props(외부 상태)가 변할 때마다 내부 state를 강제로 동기화
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleToggle = () => {
    // ... disabled 처리 로직 등
    props.onToggle(!value);
  };

  return (
    <Container $active={value} onClick={handleToggle}>
      <Nob $active={value} />
    </Container>
  );
}

// ... 스타일 정의 생략 ...
```

스위치 자체가 간단한 기능의 UI인 만큼 조금만 주의를 기울이면 이해가 어려운 코드는 아니었다. 하지만 더 직관적이게 짤 수 있는 여지가 충분했고, `Container`로 `div` 태그를 썼음에도 `role`조차 부여되어 있지 않은 등 접근성 시점에서 개선할 여지도 많았다.

따라서 이를 개선해 보기로 했다.

## 기반 자료

ARIA 명세서 요구사항들에 대한 Web Accessibility Initiative의 구현 가이드인 WAI-ARIA에서는 다양한 웹 UI의 패턴을 안내하는 APG(Authoring Practices Guide)를 제공한다. https://www.w3.org/WAI/ARIA/apg/patterns/ Radix UI 등에서도 이를 기반으로 UI를 구현하고 있다.

on/off 상태가 있는 UI는 toggle, switch, checkbox(checkbox는 자료에 따라 약간 다른 부분도 있지만 여기의 핵심이 아니니 넘어가자. switch에는 indeterminate 같은 중간 상태가 없는 등의 차이가 있다 https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate)등 여러가지가 있다. UI 라이브러리들에서도 다양한 방식으로 이를 구현한다.

하지만 당시 디자인이 APG의 Switch 형태와 똑같았기에 Switch 패턴으로 구현하기로 했다. 가이드에서 요구하는 사항은 다음과 같다. https://www.w3.org/WAI/ARIA/apg/patterns/switch/

# 참고

Radix UI primitive, Switch

https://www.radix-ui.com/primitives/docs/components/switch

React Aria, Switch

https://react-spectrum.adobe.com/react-aria/Switch.html

ARIA Authoring Practices Guide, Switch Pattern

https://www.w3.org/WAI/ARIA/apg/patterns/switch/

ARIA Authoring Practices Guide, Switch Example Using HTML Button

https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-button/

HTML과 CSS로 토글 스위치 UI 만들기

https://www.daleseo.com/css-toggle-switch/

Under-Engineered Toggles Too

https://adrianroselli.com/2019/08/under-engineered-toggles-too.html

How TO - Toggle Switch

https://www.w3schools.com/howto/howto_css_switch.asp

useId React docs

https://ko.react.dev/reference/react/useId

MDN, ARIA: switch role

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/switch_role

W3C Aria, switch role

https://w3c.github.io/aria/#switch

Radix UI Primitives issue #2530, Checkbox and other components do not render `<input>` element with form attribute

https://github.com/radix-ui/primitives/issues/2530

Radix UI Primitives discussion #874, Checkbox forwarded Ref should set on Input field and not Button

https://github.com/radix-ui/primitives/discussions/874
