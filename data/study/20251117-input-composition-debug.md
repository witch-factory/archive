---
title: 2025-11-17 엔터키로 전송하면 끝 글자 전송되는 문제 해결
description: input에서 한글 입력시 엔터키를 눌렀을 때 생기는 문제
---

사이드 프로젝트를 진행하면서 겪었던 문제와 해결을 간략히 재현한다.

# 상황

입력창이 있고 해당 입력창에서 '추가'를 누르거나 엔터키를 누르면 해당 입력창에 있는 항목이 반영되어야 하는 상황이었다.

입력창에 있는 텍스트가 새로운 항목으로 추가되어야 했던 당시 상황을 간단히 재현해 보자면 이런 코드였다.

```tsx
function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() === "") return;

    const newItem: Item = {
      id: Date.now(),
      text: inputValue,
    };

    setItems([...items, newItem]);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="새 항목을 입력하세요"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddItem();
          }
        }}
      />
      <button onClick={handleAddItem}>추가</button>
      {/* items 항목들을 표시하는 코드 */}
    </div>
  );
}
```

이때 영어나 숫자가 아닌 한글을 입력한 후 엔터를 통해 항목을 추가하려고 하면 `handleAddItem`이 2번 호출되면서 항목이 2번 추가되는 현상이 발생했다.

# 원인과 해결

## IME API

원인은 한글이 조합형 문자인데서 발생한다. 마찬가지로 일본어, 중국어 같이 조합을 통해 쓰는 문자들도 같은 현상을 겪는다.

핵심 원인은 이런 조합형 문자들을 쓰는 데 사용되는 IME(Input Method Editor) API이다. CJK 문자 입력, 터치스크린의 손글씨 인식기를 통한 문자 입력 등에 사용된다고 한다. 보통 OS 단계에서 담당한다. https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor

예를 들면 `ㄱ + ㅏ`를 치면 `가`가 되는 것이나 일본어에서 히라가나/가타카나가 한자로 변환되는 과정에 쓰인다. 각종 텍스트 에디터에서도 "가"를 치는 과정에서 중간중간, 조합되고 있는 글자에 밑줄이 그어지는 걸 관찰할 수 있다. 이게 IME API가 동작하고 있는 것이다.

그럼 왜 이런 현상이 발생하는 걸까? IME composition 과정에서 엔터키를 누르는 이벤트가 일어나면 os와 브라우저 둘 모두에서 해당 이벤트가 처리되기 때문이다. 좀더 자세히 설명하면 다음과 같다.

## 한글 조합 동작

keydown 이벤트의 기본 동작에는 text composition system의 실행이 포함되어 있다. [관련 W3C 문서, 3.7.5. Keyboard Event Types](https://w3c.github.io/uievents/#events-keyboard-types) 이 composition system엔 IME도 포함되어 있다. 그리고 조합형 문자인 한글을 타이핑할 때도 당연히 실행된다.

compositionstart -> compositionupdate -> compositionend 순으로 진행된다. 조합형 문자가 타이핑 시작될 때, 예를 들어 '김'의 'ㄱ'이 쳐질 때 compositionstart가 실행된다. 그리고 조합하면서 글자가 업데이트될 때마다 업데이트 이벤트가 발생. '김' 같이 한 글자가 완성되거나 사용자가 '기'같은 글자로 확정할 시 compositionend가 발생한다. composition session은 compositionstart 이벤트 이후, 그에 대응하는 compositionend 이벤트가 발생하기 전까지의 기간을 말한다.

즉 한글 하나하나를 칠 때마다 keydown 이벤트를 통해 조합 시스템이 동작하고 있다. 그런데 여기서 엔터는 일반적으로 조합을 확정하는 Accept의 의미를 가진다. [4.3.3. Input Method Editors](https://w3c.github.io/uievents/#keys-IME)

따라서 위 코드에서 내가 input창에 '새 항목'이라는 한글 텍스트를 입력하고 엔터를 눌렀을 때 동작은 다음과 같다.(순서는 브라우저에 따라 약간씩 다를 수 있다)

1. '새 항목'의 마지막 글자인 '목'이 조합중이다.
2. "Enter" keydown 이벤트가 발생한다. composition session동안 발생한 keydown 이벤트도 처리되어야 하기 때문이다. [3.8.5. Key Events During Composition] 단 이때의 엔터는 composition의 "Accept" 역할을 한다.(https://w3c.github.io/uievents/#events-composition-key-events)
3. "Enter"를 통해 발동된 composition 'accept' 이벤트를 통해 조합이 확정된다. 이건 OS에서 일어난다.(compositionend)
4. 브라우저에서 Enter keydown이 다시 한번 처리된다.

따라서 keydown 핸들러가 2번 호출되는 이런 현상이 일어나는 것이다. 반면 영어처럼 조합형이 아닌 문자들은 이런 문제가 없다.

## 해결

해결은 단순하다. keyboardEvent에는 현재 조합 세션 중에 이 이벤트가 발생했는지를 나타내는 `isComposing` 속성이 있다. 이 속성을 체크해서 조합중이 아닐 때만 이벤트 핸들러가 발동하도록 하면 된다.

`input`의 onKeyDown 이벤트 핸들러의 조건을 이렇게 바꾸기만 한다.

```tsx
<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="새 항목을 입력하세요"
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleAddItem();
    }
  }}
/>
```

혹은 `isComposing` 플래그를 두고 input의 `onCompositionStart` 와 `onCompositionEnd` 를 이용하는 방법도 있다. 대략 이런 식으로.

```tsx
const [isComposing, setIsComposing] = useState(false);

// ...

<input
  // ...
  onCompositionStart={() => setIsComposing(true)}
  onCompositionEnd={() => setIsComposing(false)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !isComposing) {
      handleAddItem();
    }
  }}
/>;
```

이렇게 `isComposing` 상태를 직접 만들어 관리하면 브라우저 호환성 문제나 `nativeEvent` 접근 없이도 제어할 수 있다.

# 다른 방법 고려

다른 방법도 있을까? 엔터키를 감지해서 입력해둔 정보를 제출하는 동작...당연히 HTML `<form>` 태그와 submit 이벤트를 사용할 수 있다. 로그인 페이지 같은 곳에서 엔터를 눌러서 폼을 제출하는 동작과 비슷하니까.

따라서 위 코드의 입력 부분을 이렇게 고치면 간단히 해결된다. `e.preventDefault();`를 넣은 까닭은 폼 제출 시 페이지가 새로고침되는 게 기본 동작인데 그럴 경우 react state가 날아가기 때문이다. ajax가 일반화되면서 폼 제출 시 새로고침을 하는 게 필수는 아니기도 하고 해서 꺼놓았다. 만약 DB도 사용하는 실제 프로젝트였다면 `e.preventDefault();`를 하지 않아도 되었을 수 있지만 중요한 건 아니다.

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    handleAddItem();
  }}
>
  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="새 항목을 입력하세요"
  />
  <button type="submit">추가</button>
</form>
```

실제 프로젝트에서는 이렇게 적용하지는 않았다. 이 입력창이 더 큰 폼의 일부였기 때문이다. 사용자 프로필을 입력할 때 태그를 입력하기 위해서 이 input이 사용되는 거였는데, 이렇게 추가한 태그가 포함된 사용자 정보를 form으로 제출하는 형식이었기 때문이다.

TODO: 블로그에 올릴 땐 그림 추가

하지만 HTML 표준에서는 nested form을 허용하지 않고 있다.

> 4.10.3 The form element
>
> Content model: Flow content, but with no form element descendants.
>
> HTML Living Standard, https://html.spec.whatwg.org/multipage/forms.html#the-form-element

따라서 form 안의 form을 사용하지 않기 위해서 그냥 `isComposing`을 쓰는 방법을 사용하였다.

물론 정말 nested form을 피하면서도 form의 submit 이벤트를 활용하고 싶다면 이런 방법도 있었다. `input`과 `button`의 form 속성을 이용해서 외부 form과 연결해줄 수 있다.

```tsx
<input
  form="my-form"
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="새 항목을 입력하세요"
/>
<button type="submit" form="my-form">
  추가
</button>

<form
  id="my-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleAddItem();
  }}
/>
```

하지만 이런 식으로까지 하고 싶지는 않았기에 역시 선택하지 않았다.

# 마무리

# 마치며

엔터를 쳤는데 keydown 이벤트 핸들러가 의도치 않게 2번 실행되는 것의 원인을 알아보았다. 원인이 OS와 브라우저가 텍스트를 조합하는 **IME(Input Method Editor)** 과정에 있다는 것을 이해함으로써, `isComposing`이라는 표준 속성을 활용한 더 깔끔하고 근본적인 해결책을 찾을 수 있었다.

`form`의 submit 이벤트를 통해 좀 더 HTML 표준을 고려하고 일반적인 해결책을 찾으려 시도도 해보았다. 구현을 위해서는 HTML 표준에서 허용하지 않는 nested form을 만들거나 트리키한 방법을 써야만 했기에 결국 채택하지는 않았다.

하지만 작은 버그 하나에서 시작해 CJK 입력 처리, form의 동작, HTML 표준 스펙 등을 파볼 수 있었다.

# 참고

Input Method Editor API

https://www.w3.org/TR/ime-api/

UI Events

https://w3c.github.io/uievents/#events-composition-input-events

React, 한글 입력시 keydown 이벤트 중복 발생 현상

https://velog.io/@dosomething/React-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5%EC%8B%9C-keydown-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A4%91%EB%B3%B5-%EB%B0%9C%EC%83%9D-%ED%98%84%EC%83%81

Improving Japanese Input UX in Multilingual Applications: Properly Handling IME Conversion

https://dev.to/oikon/improving-japanese-input-ux-in-multilingual-applications-properly-handling-ime-conversion-2ild

Event order between "compositionend" and "input"

https://github.com/w3c/uievents/issues/202

엔터 키로 전송 시 끝 글자만 전송되는 문제 해결하기

https://velog.io/@chichi2/%EC%97%94%ED%84%B0%ED%82%A4%EC%98%A4%EB%A5%98%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0

Understanding Composition Browser Events

https://medium.com/square-corner-blog/understanding-composition-browser-events-f402a8ed5643

Handling IME events in JavaScript

https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/

MDN Glossary, Input method editor

https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor

MDN, Element: compositionstart event

https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event

MDN, Element: compositionend event

https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event

Wikipedia, Input method

https://en.wikipedia.org/wiki/Input_method

HTML spec 4.10.3 The form element

https://html.spec.whatwg.org/multipage/forms.html#the-form-element

Can you nest HTML forms?

https://stackoverflow.com/questions/379610/can-you-nest-html-forms
