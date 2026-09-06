---
title: 2026-09-06 AI 도구, 스킬
description: openspec 등 AI 관련된 도구나 스킬 등을 아는 대로 정리 중
date: 2026-09-06
---

## openspec

우연히 openspec이라는 도구를 알게 되었다. spec driven으로 개발하는 걸 도와준다고 한다. 클코, 코덱스 등과 같이 쓸 수 있다.

https://github.com/Fission-AI/openspec

처음 시작하는 프로젝트보다는 브라운필드 프로젝트에 더 적합하다는 말이 많다. 또한 개인 단위부터 엔터프라이즈 단위까지 다 쓸만하다고 함

개발자와 코딩 어시스턴트가, 코드 작성 전에 '뭘 할지'에 대해 서로 합의하게 만드는 게 기본. 작업 설명 -> AI의 스펙 초안/작업목록 생성 -> 합의 과정

뭘 할지 확실하게 모르겠을 때는 `/opsx:explore`로 시작하라고 한다.

> The best habit to build first: when you're not sure what to build, start with /opsx:explore

### 시작하기

설치 https://github.com/Fission-AI/OpenSpec/blob/main/docs/installation.md

```bash
npm install -g @fission-ai/openspec@latest
# openspec --version 으로 설치 확인
```

시작하기: 프로젝트 경로에서 다음 명령어 실행

```
openspec init
```

이렇게 하면 프로젝트 디렉토리에 `openspec/` 폴더 생김

### 사용법

getting started https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md

`openspec ...` 명령어는 터미널에 타이핑, `/opsx:...` 명령어는 AI 채팅 세션(claude, codex..)에 타이핑

가장 기본은 이 순서대로 진행한다.

```bash
openspec init # 터미널에서
# 여기서부터는 세션에서 진행
/opsx:explore # 아직 뭘 만들지 확정하지 않고 코드베이스를 뒤져보며 문제를 정의. 뭘 할지 모를 때 이거부터 해보라고 문서에서 추천
/opsx:propose 할일(ex: add dark mode) # AI가 초안 작성하고 내가 리뷰. 맘에 안들면 추가 지시/수정
/opsx:apply # 적용
/opsx:archive # 구현이 끝났으니 변경사항을 spec에 반영하고 작업 기록 보관 처리
```

특히 뭘 할지 모를 경우 `/opsx:explore` 부터 하라고 문서에서 권장하고 있다. 코드베이스를 읽고 또 아이디어를 구체화해 준다고 한다.

더 많은 플로우는 이렇다

```
/opsx:explore ──► /opsx:propose ──► /opsx:apply ──► /opsx:sync ──► /opsx:archive
```

`/opsx:sync`는 이번 변경으로 달라지는 부분의 스펙을 `openspec/specs/`의 메인 스펙에 합치는 것. 단 변경을 끝내진 않고 지금 변경을 반영하는 거

## ponytail

https://github.com/dietrichgebert/ponytail

기능 구현 시 AI가 가는 방향을 교정하는 도구. 포니테일 시니어 개발자(대충 개고수)를 모티브로 만들었다고 한다.

기능이 필요한지, 기존 코드베이스 재사용 가능하거나 라이브러리 쓸 수 있는지 등등 '미니멀한 해결책'을 찾을 수 있도록 하는 방향의 도구. 무작정 새로 다 구현하는 AI를 교정한다. 코드량과 토큰을 상당히 줄여준다고 한다.

딱히 뭔가를 익힐 필요도 없고 깔기만 하면 되니까 좋은 듯 특히 새로 구현하는 걸 안 좋아하는 나같은 보수파의 느낌에는 좋았다.

## 참고

OpenSpec Documentation https://github.com/Fission-AI/OpenSpec/blob/main/docs/README.md
