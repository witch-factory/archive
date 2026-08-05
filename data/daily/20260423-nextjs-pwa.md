---
title: 2026-04-23 Next.js에서 PWA 만들기
description: Next.js는 프로그레시브 웹 앱을 쉽게 만들 수 있는 방법이 있다
---

pwa는 웹의 접근성과 네이티브 앱의 기능/UX를 결합한 형태다. 앱스토어 심사 없이도 업데이트 배포, 홈 화면 설치나 푸시 알림 같은 네이티브스러운 기능을 제공할 수 있다.

웹사이트도 PWA로 만들면 알림을 보낼 수 있다고 한다. Next.js에서 또 이걸 쉽게 할 수 있는 방법을 제공한다고 해서 한번 해보았다.

create-next-app으로 만든 보일러플레이트에서 진행했다.

# manifest 파일

Next.js는 manifest.json이나 manifest.ts로 웹 앱 매니페스트를 만들 수 있게 해준다. metadata랑 비슷한 방식.

이 파일은 원래 W3C의 [Web Application Manifest 표준](https://w3c.github.io/manifest/)에 의해 정의되는, 웹 어플리케이션에 관한 정보를 제공하는 JSON 파일이다.

`<head>` 태그 내의 `<link>` 요소를 통해 배포된다. `.webmanifest` 확장자도 정의되어 있지만 일반적인 브라우저에서는 `.json`과 같은 형식도 지원한다.

```html
<link rel="manifest" href="manifest.json" />
```

만약 해당 파일 내에서 fetch하는 것에 credential을 요구하는 게 있다면 이렇게 `use-credentials` 속성 설정

```html
<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials" />
```

아무튼 next.js에서 알아서 지원해 주니 만들자. 푸시 알림을 구현해 보고 싶어서 만든 프로젝트라 이렇게 이름지었다.

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Witch push notification demo",
    short_name: "PushDemo",
    description: "A demo for push notifications",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
```

## 푸시 알림

웹 푸시 알림은 대부분의 현대 브라우저에서 지원한다. iOS에서는 홈 스크린에 설치된 앱에서만 지원하지만 어쨌든 지원한다.

웹 푸시 api를 위해서는 VAPID key가 필요한데 가장 쉬운 건 웹푸시 cli를 쓰는 거라고 한다.

```bash
npm install -g web-push
```

간단한 명령어로 VAPID key를 생성할 수 있다.

```bash
web-push generate-vapid-keys
```

`.env`에 이렇게 환경 변수로 넣기

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

VAPID를 넣고 그걸 통해 푸시를 쏘면 알림을 받을 수 있게 된다. 권한 허용이 필요하긴 함

# 참고

How to build a Progressive Web Application (PWA) with Next.js

https://nextjs.org/docs/app/guides/progressive-web-apps

Next.js docs manifest.json

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

MDN Web application manifest

https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
