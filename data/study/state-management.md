---
id: 상태 관리 정보
title: zustand 중심의 상태 관리에 관한 이야기
description: 상태 관리에 대해 학습하면서 정리한 내용입니다.
---

- 프론트엔드 상태관리 실전 편 with React Query & Zustand

https://www.youtube.com/watch?v=nkXIpGjVxWU

보다가 늘 말로만 듣던 Flux 패턴이라는 게 나왔다.

https://velog.io/@andy0011/Flux-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80

react query의 쿼리 키를 만들 때 변수 작명 같아서 고민일 때가 많은데 그럴 때 쿼리 키 생성 라이브러리 사용 가능

https://tanstack.com/query/v4/docs/framework/react/community/lukemorales-query-key-factory

회사에서 zustand를 사용하고 있는데 써본지 오래되어서 공식 문서를 읽고 다시 한번 따라해보면서 간단히 메모한다.

## zustand

`create` 함수를 사용해서 상태를 생성하고 `set` 함수를 사용해서 상태를 변경하는 함수를 정의한다. `set`에는 상태를 업데이트하는 콜백을 넘긴다.

```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

이때 객체의 프로퍼티가 많다면 `{...state, bears: state.bears + 1 }`와 같이 기존 상태를 복사해서 새로운 상태를 반환하는 방식으로 불변성을 유지하면서 상태를 업데이트해야 하지만, 이건 워낙 흔한 패턴이므로 `set` 이 자동으로 상태를 병합해주기 때문에 굳이 복사할 필요는 없다.

이런 자동 병합을 끌 수도 있는데 그러면 `set`함수의 2번째 인자인 `replace`를 `true`로 설정하면 된다. 이 경우 상태가 완전히 교체된다.

```tsx
set((state) => newState, true)
```

단 이런 자동 병합은 얕은 복사로 이루어진다([it will be shallowly merged with the existing state in the store.](https://zustand.docs.pmnd.rs/guides/updating-state)). 따라서 중첩 객체 업데이트 시 `...` 연산자를 사용해서 상태를 복사하여 불변 객체를 보장해줘야 한다. 하지만 깊이 중첩된 객체의 경우 Immer와 같은 대안을 고려할 수 있다. 깊은 중첩 객체를 복사하는 건 실수의 여지도 많기 때문이다.

상태를 가져와 사용할 땐 `create`에서 리턴하는 `use~Store` 훅을 사용한다. state에서 필요한 속성을 선택적으로 가져온다.

```tsx
import { useStore } from "./store";

function App() {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  // ...
}
```

이런 식으로 선택적으로 속성을 가져오는 걸 셀렉터를 이용한다고 한다. 그런데 이런 콜백을 매번 쓰는 게 귀찮다면 자동으로 생성하는 함수를 만들어줄 수 있다고 한다. [Auto Generating Selectors](https://zustand.docs.pmnd.rs/guides/auto-generating-selectors)



`combine` 함수를 사용해서 initial state와 업데이트 함수를 한번에 정의할 수도 있다. 이러면 state creator 함수가 리턴되는데 타입 추론도 더 잘된다고 함.

https://zustand.docs.pmnd.rs/middlewares/combine

```tsx
combine<T, U>(initialState: T, additionalStateCreatorFn: StateCreator<T, [], [], U>): StateCreator<Omit<T, keyof U> & U, [], []>
```

보통 `combine(초기상태, set을 이용해서 상태를 업데이트하는 함수를 담은 객체)` 형태로 사용한다.

### Flux inspired practice

상태 업데이트 함수는 변경하는 데이터와 같은 store에 두는 게 추천된다.

```tsx
const useStore = create((set) => ({
  x:0,
  y:0,
  setX: (x: number) => set({ x }),
  setY: (y: number) => set({ y }),
}));
```

store 훅의 `setState` 메서드를 이용해서 외부에서 state를 업데이트하는 것도 가능은 하다. [Practice with no store actions](https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions)

위의 훅이라면 이런 식으로 사용할 수 있다. `setX`를 선언하는 대신 이렇게 직접 `setState`를 사용해서 상태를 업데이트하는 함수를 만드는 것.

```tsx
const increaseX = useStore.setState((state) => ({ x: state.x + 1 }));
```

### create vs createStore

그리고 `create` 함수는 상태를 사용할 수 있게 하는 커스텀 훅을 리턴한다. `createStore`는 상태 저장소 그 자체를 리턴한다. 즉 훅으로 사용할 게 아닐 경우(조건문, context API 등에서 사용하고 싶다면) `createStore`를 써야 한다.

https://tuffstuff9.hashnode.dev/zustand-create-vs-createstore

