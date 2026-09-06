---
title: 20280826 학습내용 - webpack, vite, 브라우저 버전
description: 20260826 브라우저 버전 지원 관련 학습 내용
date: 2026-08-26
---

[“빌드 도구를 바꿨을 뿐인데” — 번들러 마이그레이션이 브라우저 지원 정책까지 바꾼 이야기](https://mintplo.me/%EB%B9%8C%EB%93%9C-%EB%8F%84%EA%B5%AC%EB%A5%BC-%EB%B0%94%EA%BF%A8%EC%9D%84-%EB%BF%90%EC%9D%B8%EB%8D%B0-%EB%B2%88%EB%93%A4%EB%9F%AC-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%EC%9D%B4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%A7%80%EC%9B%90-%EC%A0%95%EC%B1%85%EA%B9%8C%EC%A7%80-%EB%B0%94%EA%BE%BC-%EC%9D%B4%EC%95%BC%EA%B8%B0-d3d89b278de2)라는 글을 읽었다.

웹팩이 느려서 Vite(와 그 내부의 rolldown)으로 바꾼 거랑 그 여파를 설명한 글임

## 웹팩 vs Vite

웹팩이 느린 건 유명하다. 근데 왜 느릴까?

웹팩은 번들러다. dev 서버든 빌드든 실행하면 우선 번들링을 실행한다. 이때 `index.js` 등 미리 정의해 둔 진입점(여러 개일 수도 있음)에서 시작해 의존성 그래프를 만들고 몇 개의 번들로 묶는다. 그래프를 만들 때 import/require/css import 등까지 처리한다. css등은 loader가 따로 처리한다. 실제로 웹팩 설정을 해보면 css를 위한 로더를 따로 설정해 줘야 할 때가 있다.

그런데 파일이 늘어나면 이런 방식은 개발 시 특히 느려진다. 개발 서버 시작 전에 미리 처리를 전부 해놓아야 하고 수정시마다 HMR(핫 모듈 리로딩)과정에서 의존성 그래프가 다시 그려지기 때문이다. 따라서 Next 내부의 turbopack이나 rust 기반 rspack 등이 나옴.

이 상황에서 vite와 그 밑에 있는 esbuild/rollup(지금은 rolldown으로 통합되었지만) 계열이 엄청나게 빠른 DX로 주목받았다. 서버를 먼저 띄운 뒤 브라우저에서 요청하는 모듈만 그때그때 변환해 내려주어서 이런 게 가능했다. ES6에서 ESM 모듈이 등장하면서 이제 브라우저가 import를 따라갈 수 있어져서 이런 걸 할 수 있게 된 것이다. 웹팩은 cjs 시절부터 나온 도구여서 하위 호환성 등을 생각하면 이런 게 불가능. 그리고 esbuild는 golang이라 빠른 것도 있다.

그러니까 일단 개발 서버를 시작하고 브라우저가 특정 페이지/파일을 요청하면 그때그때 그 파일과 거기 있는 의존성을 읽어서 내려주는 것이다. 근데 그러면 `node_modules`에 있는 라이브러리 등은 요청이 폭발한다. 따라서 이런 걸 한다.

- `node_modules`에 있는 라이브러리들은 사전 번들링(Dependency Pre-bundling)
- 한번 사전 번들링 이후에는 캐싱

여기에 golang의 성능까지 더해져 빠른 것이다.

HMR 또한, esm을 사용하는 vite가 훨씬 빠르게 가능하다. 딱 변경된 파일 + 그게 영향을 미치는 경계 까지만 invalidate하면 되기 때문이다.

반면 vite에서는 프로덕션 빌드에서는 좀 더 트리셰이킹 등의 최적화를 잘하는 번들러인 rollup를 사용했었다. 지금은 역시 rolldown

## 위 글에서 발생했다는 문제

DX를 위해 vite로 마이그레이션했다고 한다. 몇몇 웹팩 플러그인이나 import 경로 등을 수정했다고. 근데 프로덕션 배포하니 오류 발생

폴리필 문제였는데, 웹팩에서 지원하던 폴리필과 달리 vite에서 사용했던 폴리필이 `Array.prototype.findLast()`를 지원하지 않아서 오류가 발생하고 있었다고 한다. 해당 메서드를 vite가 쓰던 폴리필에서 지원을 안 해서, 해당 메서드를 지원하지 않는 브라우저에서 typeError가 발생하고 있었다.

물론 다 핫픽스를 하거나 다른 폴리필 쓸 수 있지만, 근본 원인은 구형 브라우저 사용임. 따라서 es2022까지만 사용하게 하고 그 이상은 금지. 그리고 구형 브라우저에는 https://browser-update.org/ 를 활용해 업그레이드 배너를 노출했다고 한다. + 매년 사용자 데이터 기반으로 지원 범위 재검토 컨벤션 정립(https://blog.lemonbase.team/%EB%A0%88%EB%AA%AC%EB%B2%A0%EC%9D%B4%EC%8A%A4%EA%B0%80-%ED%8F%B4%EB%A6%AC%ED%95%84%EC%9D%84-%EB%8C%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-8c9f8c8bddc4) 저 글에서는 eu, 마이크로소프트 팀즈 등 여러 제품에서 브라우저 지원 범위를 어떻게 정했는지 좀 더 나옴.

`.browserslistrc`로 지원 대상 브라우저를 명시하고 eslint-plugin-compat이라는 플러그인으로 지원 범위 밖의 js 문법은 린터가 잡도록 했다고 한다. 이렇게 하면 구조적으로 es2023등 컨벤션을 벗어나는 js API를 쓰는 게 막힌다.

그리고 구버전 브라우저 테스트는 생각보다 어려우니(browserstack 등을 써도) 지원 범위를 넓게 가져가면 테스트 비용이 늘어난다는 걸 고려하자.

또한 폴리필을 맹신하지 말고, 프로젝트에서 사용하는 API가 폴리필에서 다 잘 지원되는지 확인하라는 교훈

- 폴리필 맹신 X
- browserlist, eslint-plugin-compat, stylelint(미지원 css 확인)을 알아두자

## browserlist

Browserslist와 함께 기준 사용 https://web.dev/articles/use-baseline-with-browserslist?hl=ko

browserlist는 `package.json`이나 `.browserslistrc`에 쓰여서, 해당 프로젝트에서 지원하는 최소 브라우저 목록을 명시한다. Autoprefixer(css에서 `webkit::`같은 접두사를 필요하면 붙여 주는 도구)나 eslint-plugin-compat같은 플러그인과 함께 사용 가능하다.

브라우저 기준을 정해서 명시하기로 했다면 사용자층을 고려해 어디까지 지원할지를 결정해야 한다.

baseline widely available: 30개월 전 기준으로 핵심 브라우저(크롬, 엣지, 파폭, 사파리)들에서 완전히 지원

baseline newly availble: 현재 baseline 브라우저들의 최신 버전에서 전부 지원. 예전 버전엔 안될수도(caniuse 참고)

baseline 연도(ex:2026): 지정 연도 말 기준 새로 제공된 모든 기능 포함

MDN에서 나오는 그것이다. (https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)

### browserslist 설정

https://github.com/browserslist/browserslist

package.json에서 설정하면 `browserslist` 속성을 설정.

```json
{
  "private": true,
  "browserslist": ["baseline newly available"]
}
```

`.browserslistrc`에서는 평문으로 설정. 그냥 `last 1 version` 같은 걸 쓰면 됨

핵심 브라우저에는 기본적으로 크롬 엣지 파폭 사파리가 있다. 그런데 크로미움 등 오픈소스 브라우저 엔진 갖다 쓰는 다른 브라우저도 많다. 오페라 등. 이런 것도 고려하려면 `with downstream`을 붙임.

```json
"browserslist": "baseline 2024 with downstream"
```

이렇게 적절한 baseline 을 설정하면 babel 같은 패키징 도구가 변환하는 결과값도 줄일 수 있다. polyfill 지원이 줄어드니 당연함

### 자동변환

`eslint-plugin-compat`을 쓰면 js 코드에 대한 지원을 체크해줌.

stylelint의 `stylelint-browser-compat` 플러그인과 룰도 사용 가능하다. 이렇게 하면 설정한 기준상 해당 브라우저에서 지원 안 되는 css들 체크 가능하다. 예를 들어 `calc-size`는 크롬, 엣지에서만 지원

stylelint 설정 파일에서도 browserlist 설정 가능하지만 `browserlistrc`를 연동해 사용하는 게 더 낫다.

단 warning으로 할지, 또 baseline을 언제로 할지 등은 팀 논의 필요
