---
title: 쿼리 파라미터를 쉽게 사용하게 해주는 nuqs 써보기
description: nuqs를 사용해보자.
---

vite로 만든 react-ts 프로젝트 상에서 진행했다.

## 설치와 설정

```bash
npm install nuqs
```

nuqs 사용을 위해서는 `NuqsAdapter` 컨텍스트 프로바이더가 필요하다. 나같은 React spa의 경우 이렇게. 다른 프레임워크들의 경우 [문서 참고](https://nuqs.dev/docs/adapters)

```jsx
import { NuqsAdapter } from 'nuqs/adapters/react'

createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <App />
  </NuqsAdapter>
)
```

## 기본 사용

`useState` 대신 `useQueryState` 사용하면 알아서 URL이랑 싱크됨.

```jsx
const [name, setName] = useQueryState("name");
```

이때 `useQueryState`가 받는 하나의 인자는 쿼리스트링의 key다. query string state랑 updater function을 리턴한다.

해당 key의 쿼리스트링 값이 없으면(`/`이면) state 값은 `null`. 비어 있으면 빈 문자열이다.

`/?name=3` 과 같은 경우 state는 `'3'`이다. 쿼리 값은 기본적으로 문자열임. 이걸 바꾸려면 parser 사용

```jsx
const [count, setCount] = useQueryState("count", parseAsInteger);
```

`useState`의 인자는 기본값인데 `useQueryState`는 query key가 인자라는 게 차이점. `useQueryState` 2번째 인자로 option을 넣을 수 있는데 여기 `defaultValue`로 기본값 지정 가능

```jsx
const [name, setName] = useQueryState("name", { defaultValue: "홍길동" });
```

parser가 있을 경우 `.withDefault(value)` 빌더 메서드 사용. 이렇게 기본값을 지정했을 경우 이 기본값은 default 설정상에서는 URL에 포함되지 않는다. 이걸 만약 포함하고 싶다면 `clearOnDefault` 옵션 사용

```jsx
// parser 미사용 시
const [name, setName] = useQueryState("name", {
  defaultValue: "홍길동",
  clearOnDefault: false,
});

// parser 사용 시
const [count, setCount] = useQueryState(
  "count",
  parseAsInteger.withDefault(0).withOptions({ clearOnDefault: false })
);
```

이 기본값은 쿼리스트링 값이 파서에게 유효하지 않을 때도 적용된다.

## 파서

search param은 기본적으로 문자열이지만 숫자, 불리언, 배열 등으로 다룰 수 있다. nuqs는 몇 가지 기본 파서를 제공한다.

- `parseAsString` - 기본값. 문자열을 파싱한다. 그럼 왜 이게 필요한가? 만약 빌더 패턴을 써서 파서들을 미리 정의하고 싶을 때 사용 가능하다.

```jsx
export const searchParamsParsers = {
  q: parseAsString.withDefault("").withOptions({
    shallow: false,
  }),
};
```

- `parseAsInteger` - 정수 파서
- `parseAsFloat` - 부동소수점 파서
- `parseAsIndex` - 인덱스로 파싱(integer랑 비슷)

리터럴로 파싱하기

```jsx
const sortOrder = ['asc', 'desc'] as const
// Then pass it to the parser
parseAsStringLiteral(sortOrder)

// 숫자로도 가능
const diceSides = [1, 2, 3, 4, 5, 6] as const

parseAsNumberLiteral(diceSides)

// enum도 지원

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
parseAsStringEnum(Object.values(Color))
```

이외의 DateTime, Array, JSON 파서들도 제공된다. [문서 참고](https://nuqs.dev/docs/parsers/built-in)

커스텀 파서를 직접 만들 수도 있다. 필요할 때 써보자. https://nuqs.dev/docs/parsers/making-your-own

기본 옵션

- client에서 동작
- history에서 replace로 동작(`router.replace` 즉 뒤로가기 해도 기록이 남지 않음)
  - 2번째 인자의 `history: 'push'` 옵션으로 바꿀 수 있음
- 쿼리스트링이 바뀔 때 기본적으로는 클라이언트에서만 반영됨. 서버 동작 필요시 `{ shallow: false }` 옵션 사용
- 검색처럼 사용자 입력이 자주 변경되고 그럴 땐 스로틀링이나 디바운싱 사용가능 https://nuqs.dev/docs/options#rate-limiting-url-updates
- `urlKeys` 옵션으로 url에 반영할 키들을 설정 가능. 코드에선 의미있는 변수명, URL에는 짧은 key

```jsx
const [{ latitude, longitude }, setCoordinates] = useQueryStates(
  {
    latitude: parseAsFloat,
    longitude: parseAsFloat,
  },
  {
    urlKeys: {
      latitude: "lat", // URL에는 ?lat=... 로 표시
      longitude: "lng",
    },
  }
);
```
