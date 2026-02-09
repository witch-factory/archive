---
title: React의 useEffectEvent 훅 사용해보기
description: React 18.3에 추가된 useEffectEvent 훅을 사용해보자.
---

## 시작

React 18.3에 새롭게 추가된 `useEffectEvent` 훅은 이벤트 핸들러 내에서 최신 상태와 속성에 접근할 수 있도록 도와준다. 의존성 배열 없이도 최신 상태 참조 가능.

## 문제

기존에 React에는 "오래된 클로저 문제" 가 있었음

다음과 같은 코드에서 loginMessage는 userName이 바뀌어도 최신 상태로 업데이트되지 않음

```jsx
export default function Home() {
  const [userName, setUserName] = useState("김성현");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    let loggedInTime = 0;
    const interval = setInterval(() => {
      loggedInTime++;
      setLoginMessage(
        `${userName} has been logged in for ${loggedInTime} seconds`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h1>안녕, {userName}</h1>
      <p>{loginMessage}</p>
      <input
        className="p-2 mt-4 border rounded"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}
```

왜인가? `useEffect` 훅의 의존성 배열이 빈 배열이기 때문에, 이 효과는 컴포넌트가 처음 마운트될 때만 실행되고 이후에는 실행되지 않는다.

따라서 setInterval에 전달된 콜백 함수는 `userName`의 초기 값을 클로저에 캡처한 상태로 계속 실행된다.

`userName`을 useEffect 의존성에 추가할 수도 있다. 그러면 `userName` 변경 시마다 useEffect 콜백이 계속 실행되어 setInterval이 계속 새로운 클로저를 캡처하겠지? 따라서 loginMessage는 최신 상태로 업데이트될 것이다.

근데 문제는 그렇게 `setInterval` 콜백에서 캡처하는 클로저가 새로 생성되면 `loggedInTime` 변수도 초기화된다는 점이다. 그래서 `userName`이 바뀔 때마다 `loggedInTime`이 다시 0부터 시작하게 된다.

이 문제를 해결하려면 보통 `useRef` 훅을 사용하여 `userName` 참조의 안정성을 지켜주는 방법을 써야 했다.

## useEffectEvent 사용하기

이 문제를 해결하기 위해 React 18.3에서는 `useEffectEvent` 훅을 도입했다. 이 훅은 effect 내부의 비반응형 로직을 추출해서 재사용 가능한 함수로 만들어준다. 즉 의존성에는 넣지 않되, 최신 값을 읽어야 하는 경우에 유용하다.

예를 들어 이러면, getName을 통해서 매번 userName의 최신 값을 읽을 수 있다.

```jsx
const getName = useEffectEvent(() => userName);

useEffect(() => {
  let loggedInTime = 0;
  const interval = setInterval(() => {
    loggedInTime++;
    setLoginMessage(
      `${getName()} has been logged in for ${loggedInTime} seconds`,
    );
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

이러면 더 간단하다.

```jsx
const onTick = useEffectEvent((tick: number) =>
  setLoginMessage(`${userName} has been logged in for ${tick} seconds`),
);

useEffect(() => {
  let loggedInTime = 0;
  const interval = setInterval(() => {
    loggedInTime++;
    onTick(loggedInTime);
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

userName의 최신 값은 loginMessage에 반영해야 한다. 하지만 setInterval이 userName 변화에 따라 새로 실행될 필요는 없다(오히려 그래서는 안된다).

## 명세

useEffectEvent는 effect 이벤트를 선언한다.

```jsx
const onSomething = useEffectEvent(callback);
```

`callback`은 effect 이벤트를 위한 로직을 포함한다. 이렇게 콜백을 `useEffectEvent`에 전달하면, React는 이 콜백을 래핑하여 `onSomething`이 호출될 때마다 최신 props, state에 접근할 수 있도록 한다.

주의할 점

- `useEffectEvent`로 만든 함수는 `useEffect` 훅 내부에서만 호출해야 한다. 컴포넌트 렌더링 중에 호출하면 안 된다.
- useEffect의 의존성을 통해 실행해야 하는 로직에 넣으면 안된다. 비반응형 로직에만 사용해야 한다. 즉 effect는 다시 실행되지 않는 상황에서 effect 내에서 최신 props/state에 접근해야 할 때 사용해야 한다.

공식 문서의 예시로 로깅도 나온다. 예를 들어 페이지 방문을 로깅한다고 하자. 그럼 url이 바뀔 때마다 로그를 찍는 게 맞을 것이다.

```jsx
function PageLogger({ url }: { url: string }) {
  const logPageVisit = (url)=>{
    // ...
  }

  useEffect(() => {
    logPageVisit(url);
  }, [url]);

  return null;
}
```

그런데 로그에 다른 정보가 포함되는 경우는 아주 많다. 예를 들면 사용자 아이디, 세션 아이디, 타임스탬프 등등. 이런 정보들은 최신 상태를 반영해야 하지만 useEffect 의존성 배열에 넣으면 안 된다. 타임스탬프가 바뀐다고 해서 페이지 방문 로그를 다시 찍을 필요는 없기 때문이다.

따라서 이렇게 쓸 수 있다.

```jsx
function PageLogger({ url }: { url: string }) {
  const onPageVisit = useEffectEvent((url) => {
    // logPageVisit 은 적절히 정의되어 있다고 가정
    logPageVisit(url, {
      userId: getCurrentUserId(),
      sessionId: getCurrentSessionId(),
      timestamp: Date.now(),
    });
  });

  useEffect(() => {
    onPageVisit(url);
  }, [url]);

  // ...
}
```

이런 식으로 `useEffectEvent` 훅을 사용하면, effect 내부에서 최신 상태와 속성에 접근할 수 있으면서도 동시에 반응할 필요 없는 값에 반응하는 걸 피할 수 있다.

## 참고

리액트가 마침내 가장 큰 문제를 해결했습니다 - `useEffectEvent`의 묘미

https://velog.io/@superlipbalm/react-has-finally-solved-its-biggest-problem-useeffectevent

useEffectEvent 공식 문서

https://ko.react.dev/reference/react/useEffectEvent

```

```
