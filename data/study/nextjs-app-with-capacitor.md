---
title: capacitor.js로 Next.js 앱으로 빌드하기
description: 프로젝트에서 사용 중인 Capacitor.js로 nextjs 간단한 페이지를 앱으로 만들어 보자
---

프로젝트에서 [capacitor](https://capacitorjs.com/)를 사용중이다. Next.js를 앱으로 빌드해 주는 듯 한데 잘 몰라서 한번 간단한 프로젝트를 만들고 앱으로 빌드해 보려고 한다.

create-next-app으로 먼저 next.js 애플리케이션 init

```bash
npx create-next-app@latest nextjs-with-capacitor --yes
```

패키지 설치하고 시작

```bash
npm i @capacitor/core
npm i -D @capacitor/cli

npx cap init

npm i @capacitor/android @capacitor/ios
```

# 참고

2025 Next.js 15와 Capacitor로 네이티브 모바일 앱 만들기: 단계별 가이드

https://capgo.app/ko/blog/building-a-native-mobile-app-with-nextjs-and-capacitor/

nextjs-tailwind-ionic-capacitor-starter

https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter

Integrating Capacitor with Next.js: A Step-by-Step Guide

https://hamzaaliuddin.medium.com/integrating-capacitor-with-next-js-a-step-by-step-guide-685c5030710c

Build Mobile Apps with Tailwind CSS, Next.js, Ionic Framework, and Capacitor

https://dev.to/ionic/build-mobile-apps-with-tailwind-css-next-js-ionic-framework-and-capacitor-3kij

시작하기 공식 문서

https://capacitorjs.com/docs/getting-started
