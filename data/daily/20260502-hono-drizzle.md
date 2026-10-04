---
title: 2026-09-01 Hono, drizzle
description: Node 기반 서버 사이드에서 요즘 핫한 hono, drizzle을 써보자
date: 2026-09-01
---

hono는 요즘 자주 쓰이는 웹 애플리케이션 프레임워크다. 오직 서버에서만 실행되는 건 아니고 cloudflare worker, vercel 등 어떤 JS 런타임에서도 돌아간다. 가볍고 미들웨어도 내장되어 있고 TS도 잘 지원한다고 한다.

```bash
npm create hono@latest
```

템플릿은 cloudflare-workers를 쓴다. 폴더명은 단순히 `hono-drizzle`로 했다.

## 기본 기능

https://hono.dev/docs/getting-started/basic

`npm run dev` 로 개발서버 실행 가능. 나는 cf worker를 사용하니 wrangler라는 cli 도구를 사용한다.

`src/index.ts`에 코드를 작성한다(이런 엔트리 경로는 `wrangler.jsonc`에서 설정가능). 전반적으로 express랑 비슷하다. 초기 설정은 다음과 같음

```ts
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
```

위의 `c.text`대신 `c.json` 쓰면 `application/json` 응답 가능

## concept

처음에 Hono는 cloudflare 워커를 이용해 웹 애플리케이션을 만들려고 하던 중 cloudflare worker에서 동작하는 좋은 프레임워크가 없어서 만들었다고 한다.

이때 웹 표준 API만 쓰면서 Deno랑 Bun에서도 동작하게 만들 수 있었다. express.js for bun 같은 느낌. 엄청 빠르고 어디서든 동작하는 프레임워크라고 문서에서는 말한다.

다양한 라우터 지원 https://hono.dev/docs/concepts/routers

웹 표준을 따르기 때문에 여러 플랫폼에서 그대로 동작한다.
https://hono.dev/docs/concepts/web-standard

미들웨어도 많아서 `app.use`로 쉽게 붙일 수 있다. 이건 hono 각 미들웨어의 문서를 참고. https://hono.dev/docs/concepts/middleware

### 라우터

hono에는 5가지의 라우터가 있다.

- RegExpRouter

express에서는 `/:id` 같은 경로를 사용한다. 이는 [path-to-regexp](https://github.com/pillarjs/path-to-regexp)라는 라이브러리를 사용하며 모든 라우트에 대해 정규식 매칭이 이루어지기 때문에 라우트가 많아질수록 성능이 떨어진다.

하지만 Hono에서는 다르다. hono에서는 이런 라우트 패턴들을 하나의 큰 정규칙으로 만들어서 한번에 처리한다. radix tree 같은 트리 기반의 알고리즘보다도 대부분 빠르다고 한다.

모든 라우팅 패턴을 지원하는 건 아니므로 RegExpRouter와 다른 라우트를 혼합해 사용한다.

- TrieRouter: 이름 그대로 trie 기반의 매칭 알고리즘을 사용한다. RegExpRouter보다는 느리지만 express의 라우터보단 빠르고 모든 라우팅 패턴 지원
- SmartRouter: 등록된 라우터들에서 추론을 통해 가장 좋은 라우터를 찾는다. 기본적으로 Hono는 SmartRouter, RegExpRouter, TrieRouter 를 사용한다. 앱이 켜지면 SmartRouter가 가장 빠른 라우터 사용
- LinearRouter: 라우트를 순서대로 검사해 매칭하는 가장 단순한 라우터. RegExpRouter가 물론 가장 빠르지만 라우트 등록이 느리다. LinearRouter는 등록이 엄청 빠르기 때문에, 한번 요청할 때마다 초기화되는 그런 환경에 적합하다.
- PatternRouter: 가장 작은 형태의 라우터다. 최소한의 앱 크기를 추구해야 할 때 쓴다.

### 웹 표준

hono는 fetch, URL object 같이 HTTP 요청, 응답을 핸들링하는 웹 표준을 기반으로 한다. 예를 들어 이런 식이다.

```js
export default {
  async fetch() {
    return new Response("Hello World");
  },
};
```

이건 웹 표준 기반이라 cloudflare worker든 bun이든 어디에서든 동작한다. 따라서 hono도 웹 표준을 지원하는 어디서든 동작할 수 있다.

### 미들웨어

`Response` 객체를 돌려주는 구성 요소를 핸들러라고 부른다. 미들웨어는 핸들러가 요청을 받고 응답을 돌려주는 그때 실행되어서 데이터를 제어한다.

```
요청 -> 미들웨어A -> 미들웨어B -> 핸들러 -> 미들웨어B -> 미들웨어A -> 응답
```

이런 식으로 함수 적용처럼 동작. 문서에서는 양파같다고 표현한다.
