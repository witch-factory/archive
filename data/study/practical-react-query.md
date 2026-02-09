---
title: TkDodo의 practical react query를 비롯한 블로그 글 읽기
description: Practical React Query를 읽고 tanstack query를 더 잘 쓰기 위해 정리한다. TkDodo의 다른 글도 읽음
---

## Exhaustive matching in TypeScript

https://tkdodo.eu/blog/exhaustive-matching-in-type-script

## 1: Practical React Query

https://tkdodo.eu/blog/practical-react-query

graphql api로 데이터를 요청하고 변경하고 서버 데이터 캐시를 제공하는 apollo client가 나왔을 때 리덕스가 끝났냐는 말이 나왔다.

이걸 보고 react query에 대한 영감이 나왔다고 한다. 서버에서 데이터를 불러온 후 어디서든 사용할 수 있게 하는 데 리덕스가 쓰이고 있다면, 사실 캐시를 통해 서버 상태를 보여줄 수만 있다면 진짜 '클라이언트에 필요한 상태'는 얼마 없지 않을까?

---

[react query 기본 설정](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)

react query는 리렌더링을 할 때마다 queryFn을 실행하는 게 아니다. 특정 조건 맞을 때만 데이터 페칭

staleTime: 쿼리가 신선하지 않은 걸로 판정될 때까지의 시간. 쿼리가 신선한 데이터는 항상 캐시에서 불러와지고, 쿼리가 신선하지 않아도 데이터는 여전히 캐시에서 오지만 특정 조건 만족시 백그라운드에서 refetch된다.

gcTime: inactive 쿼리가 캐시에서 제거되기까지의 시간

- 쿼리 키를 의존성 배열처럼 다루기

react query는 쿼리 키가 변할 때마다 데이터를 fetch. 보통 queryFn의 인수로 들어가는 값들은 queryKey에도 들어간다. 해당 값이 변하면 fetch를 해서 값 업데이트를 해야 하는 게 보통이기 때문.

- initialData 넣어주기

쿼리 키가 바뀔 때마다 데이터가 업데이트되기 때문에 로딩 스피너 등이 표시될 수 있다. 그런데 새로운 데이터가, 물론 서버 상태가 SSOT가 되어야 하겠지만 클라이언트 사이드에서 react query 캐싱을 통해 가지고 있을 수 있는 값인 경우가 있다. 예를 들어 todolist의 할 일 목록에서 완료한 일 목록으로 간다면, 일반적으로 완료한 일 목록은 이전에 fetch되었던 모든 할 일 목록에서 계산될 수 있다. 따라서 이를 이용해 `initialData`를 지정 가능하다. 문서의 예시는 이거.

`all`에서 `done`으로 바뀔 때 아직 데이터가 없다면 기존 `["todos", "all"]` 캐시에서 이를 표시하려고 시도한다. 백그라운드에서 데이터 페칭 완료시 업데이트된 목록이 보여지고, 사용자는 로딩스피너를 덜 본다.

```tsx
type State = "all" | "open" | "done";

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ["todos", state],
    queryFn: () => fetchTodos(state),
    initialData: () => {
      const allTodos = queryClient.getQueryData < Todos > ["todos", "all"];
      const filteredData =
        allTodos?.filter((todo) => todo.state === state) ?? [];

      return filteredData.length > 0 ? filteredData : undefined;
    },
  });
```

클라-서버 데이터를 분리하라. 만약 폼의 초기값 등으로 데이터를 불러오는 데에 react query를 쓰는 경우 staleTime를 `Infinity`로 설정. "진짜 클라이언트 상태"에는 react state, redux 같은 진짜 클라이언트 도구들을 사용하라.

쿼리의 `enabled` 옵션을 통해 쿼리 실행 조건을 지정할 수 있다. 이를 통해 [dependent query](https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries) (물론 waterfall로 인한 성능 저하 우려 존재) 등 쿼리 실행 제어 가능.

그리고 queryCache는 `setQueryData`, `getQueryData` 등을 통해 직접 접근 가능하지만, 낙관적 업데이트나 mutation을 제외하면 직접 접근하지 말도록 하자. queryCache를 로컬 상태 관리자로 쓰지 말도록!

커스텀 훅을 생성하는 걸 여기선 추천하는데, 굳이? 왜냐 하면 useMutation에서 invalidate해야 하는 경우가 상당히 많은데 이 경우 querykey를 박아줘야 한다. 그럼 그냥 useQuery 단에서 key를 바로 볼 수 있는 게 나음. mutation 했을 때 어떤 key를 invalidate해야 하는지 알기 쉬워서.
