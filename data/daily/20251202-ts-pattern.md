---
title: 20251202 토스 ts-pattern 글
description: 2025년 12월 2일에 토스의 ts-pattern 글을 읽고 메모
---

원글: ts-pattern은 더 멋진 if문이 아니다

https://toss.tech/article/ts-pattern-usage

[ts-pattern](https://github.com/gvergnaud/ts-pattern)은 조건부 분기문에서 타입을 관리하는 걸 용이하게 해주는 도구다. 다만 이 글에서 ts-pattern의 실사용이나 벤치마크 결과가 인상적인 건 아님. 댓글까지 보면, benny라는 유지보수도 잘 안되는 벤치마크 툴 써서 했다고 함.

글 내용보다는 타입 사용이나 간결한 코드 작성에 있어서 도움이 될 만한 패턴이 있어서 남긴다.

## switch에서 satisfies 사용하기

[Exhaustive matching](https://tkdodo.eu/blog/exhaustive-matching-in-type-script)은 ts의 switch문에서 유용하게 쓸 수 있다. 근데 안 쓰인 값이 없는지를 switch default문에서 `satisfies never`를 통해서 검증할 수 있다.

```ts
type Theme = "light" | "dark" | "system";

function getTheme(key: Theme) {
  switch (key) {
    case "light":
      console.log("라이트 테마");
      break;
    case "dark":
      console.log("다크 테마");
      break;
    case "system":
      console.log("시스템 테마");
      break;
    default:
      key satisfies never;
    // 나올 수 없는 코드
  }
}
```

위의 `Theme` 유니온 타입에 다른 걸 추가하면 `default` 케이스에서 `satisfies never`가 만족되지 않아서 타입 에러가 뜨는 걸 볼 수 있다.

## IIFE 써서 컴포넌트 렌더링

분기 처리를 담당하는 컴포넌트나 `render**` 함수를 만드는 경우도 있다. 물론 react query의 loading 상태를 이용해 스켈레톤을 보여준다든가 하는 로직은 많이 반복되니까 컴포넌트로 빼도 좋겠다. 하지만 간단한 코드의 경우 IIFE로도 처리 가능

```tsx
type Role = "user" | "assistant" | "admin";

interface BubbleProps {
  role: Role;
  content: string;
  timestamp?: Date;
}

function Bubble({ role, content, timestamp }: BubbleProps) {
  return (
    <div className="bubble-container">
      {/* 다른 코드들... */}
      {(() => {
        switch (role) {
          case "admin":
            return <AdminBubble content={content} timestamp={timestamp} />;
          case "user":
            return <UserBubble content={content} timestamp={timestamp} />;
          case "assistant":
            return <AssistantBubble content={content} timestamp={timestamp} />;
          default:
            role satisfies never; // 앞에서 본 패턴
            return null;
        }
      })()}
    </div>
  );
}
```

물론 IIFE 내에서 if-else로 처리하는 것도 가능한데 나는 ts로 Exhaustive matching을 할 때 switch을 좋아해서 이렇게 한 것 뿐이다.

토스 내부에선 `SwitchCase` 컴포넌트도 따로 있어서 그걸 쓸 수도 있다고 한다.

ts-pattern 라이브러리: https://github.com/gvergnaud/ts-pattern
