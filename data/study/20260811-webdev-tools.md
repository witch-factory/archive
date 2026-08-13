---
title: 웹 프로젝트에 쓰일 만한 새로운 도구들
description: 그간 나온 도구들 몇 개를 훑어본다.
date: 2026-08-11
---

몇몇 프로젝트를 해 보려고 하고 있었다. 그런데 역시 개발자의 마음이라 그런지 뭔지도 모르는 도구들을 대충 쓰기는 싫었다. 문서 정독은 아니더라도 대충 뭐 하는 녀석들인지 몇 가지 새로운 도구들을 알아보았다.

## oxlint, oxfmt

voidzero에서 관리하는 oxc 툴체인에 있는 린터와 포매터다. oxc계 도구들이 다 그렇듯이 rust로 작성되었다.

### oxlint

oxc 컴파일러 위에서 만들어진 js, ts 린터

oxlint는 eslint보다 50-100배 빠르다고 한다.

`npm install -D oxlint` 로 설치하고 `package.json`에서 lint 명령어 등을 설정 가능.

설정은 `.oxlintrc.json`, `oxlint.config.ts` 등으로 관리 가능. 물론 `--config`, `-c` 플래그로 설정 파일 경로를 수동 지정도 가능

eslint flat config에서 마이그레이션하려면 [oxlint/migrate](https://github.com/oxc-project/oxlint-migrate) 같은 도구 사용

oxlint는 go 기반의 타입스크립트 컴파일러(ts7)를 기반으로 해서 타입 린팅도 지원한다. 원래는 typescript-eslint에서 하던 그것. 이걸 쓰려면 `oxlint-tsgolint`를 깔긴 해야 함. `--type-aware` 플래그로 알 수 있고 당연하지만 oxlint 설정 파일의 `options`에서 설정 가능.

`import/no-cycle`로 순환 의존성 찾기 등도 가능

### oxfmt

oxfmt는 prettier를 대체하는 코드 포매터

역시 devdep로 설치

`npm install -D oxfmt`

이런 식으로 스크립트를 추가

```json
{
  "scripts": {
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

oxfmt는 현재 디렉토리 파일 포매팅, `--check`은 포맷이 맞는지만 확인

prettier보다 약 30배, biome보다 약 2배 빠르다고 한다. import 정렬, tailwind css className 정렬,styled-componrnt나 graphql 같은 템플릿 리터럴 내 정보(즉 embedded formatting) 등의 정렬, package.json 속성 소팅 등도 추가 플러그인 없이 처리

import 정렬, tailwind CSS 정렬 등은 따로 활성화해야

### 마이그레이션

마이그레이션할 때 기존 설정이 복잡하거나 지원 안되는 플러그인이 남아 있다면 점진적 마이그레이션 가능. `eslint-plugin-oxlint`를 이용해 중복 규칙을 끌 수 있다. flat config에서 배열 끝에 oxlint 설정 넣기

```js
// eslint.config.js
import oxlint from "eslint-plugin-oxlint";

export default [
  // 기존 ESLint 설정...
  ...oxlint.configs["flat/recommended"],
];
```

eslint 8의 경우 oxlint migrate가 직접 못 읽으니 flat config로 바꾸고 난 후 oxlint로( flat config 마이그레이션은 `@eslint/migrate-config` 등 사용. eslint 공식문서 참고)

prettier -> oxfmt 마이그레이션도 할만하다

```
npm add -D oxfmt@latest && npx oxfmt --migrate=prettier && npx oxfmt
```

다만 이런 차이가 있음

- 1줄 길이(`printWidth`) default가 oxfmt에선 100
- prettier 플러그인은 지원 안됨
- 몇몇 옵션 지원 안됨(https://oxc.rs/docs/guide/usage/formatter/unsupported-features.html). `sortTailwindcss`같은 건데 보니까 대부분 oxlint에서 지원한다. 굿~

몇몇 차이점을 감안할 수 있다면 해볼만 하다. 특히 ai가 코드 작성 후 자동으로 계속 포매팅해가며 배포하고 실행하는 사이클에서 이런 도구들의 속도 개선은 CI를 빠르게 해주니까

## vite+

Vite+로 웹 개발 도구 통합하기 https://daleseo.com/vite-plus/

vite+ getting started https://viteplus.dev/guide/

테스팅(vitest), 린터(oxlint), 포매터(oxfmt) 등을 묶은 하나의 툴체인 vite+가 나왔다. 하나의 바이너리 `vp`로 다 통합하고 설정도 `vite.config.ts` 하나로 다 할 수 있게 하는 것

맥 os 기준 설치

```
curl -fsSL https://vite.plus | bash
```

- vp create: 새로운 프로젝트 만들기: 처음에는 application 선택해서 프로젝트 시작하는 게 좋겠다.
- vp install: 의존성 설치. remove등도 똑같이 가능
- vp migrate: 기존 vite 프로젝트 마이그레이션
- vp dev, vp build: 개발서버 실행, 프로덕션 빌드
- vp check: 타입 검사 + 린팅 + 포매팅 검사(tsgo, oxlint, oxfmt 사용)
- vp test: 테스트

아까 언급했듯이 설정도 `vite.config.ts` 하나로 다 할 수 있게 되는데 이런 식으로 설정 파일이 쓰인다. https://viteplus.dev/config/

```ts
import { defineConfig } from "vite-plus";

export default defineConfig({
  server: {},
  build: {},
  preview: {},

  create: {},
  run: {},
  fmt: {},
  lint: {},
  check: {},
  test: {},
  pack: {},
  staged: {},
});
```

모노레포라면 `vp run -` 을 통해서 태스크를 올바른 순서로 실행할 수 있게 해주고 캐싱도 지원한다. 필요하면 `run` 문서로. https://viteplus.dev/guide/run

유용해 보이는 건 노드 버전관리. nvm 대체용으로 좋을 듯

```bash
vp env use 20 # use node 20
vp env current # 지금의 환경 보기
```

기존에 react는 vite로 쓰는게 거의 표준이 되어가고 있었고, vp migrate도 있으니 써봐도 좋을 듯 하다.

## 참고

Oxc로 자바스크립트 린팅과 포맷팅을 압도적으로 빠르게

https://daleseo.com/oxc/
