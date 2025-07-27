---
title: HTTP 301 vs 308
date: "2025-06-24T00:00:00Z"
description: "HTTP 코드 301과 308의 차이점을 알아보자."
tags: ["CS", "network"]
---

HTTP 코드 301과 308은 둘 다 리다이렉트를 의미하는 코드이다. 하지만 둘이 어떤 차이가 있을까?

Next.js SEO 문서에서 본 게 처음. Next.js의 redirect는 308을 쓴다고 한다.

https://nextjs.org/learn/seo/status-codes

301(Moved Permanently)는 요청한 리소스가 영구적으로 다른 URL로 이동했음을 뜻하고 302(Found)는 일시적으로 이동했음을 뜻한다. 역사적인 이유로 POST를 GET으로 변환하는 것을 허용한다.

> 이 발언에서 언급된 "user agent"들은 당시 널리 사용되던 브라우저들, 예를 들어 Netscape Navigator와 Internet Explorer를 포함합니다. 어쩌면 이러한 동작은 대부분의 웹사이트가 원하던 것이었을지도 모릅니다 — POST 요청이 성공한 후에는 사용자를 다른 URL로 보내서 새로운 내용을 보여주는 방식이었기 때문입니다. 하지만 POST 요청을 GET 요청으로 변환하는 이러한 동작은 HTTP의 작성자들이 의도했던 방식은 아니었습니다.

https://web.archive.org/web/20190109001229/https://blogs.msdn.microsoft.com/ieinternals/2011/08/19/http-methods-and-redirect-status-codes/

307(Temporary Redirect)는 302와 동일하지만 요청 메서드 변경을 허용하지 않는다. 이게 원래 HTTP 제작자들의 의도.

* 단 301, 308 둘 중 어느 걸 쓰는지 검색 엔진에서 구별은 안 한다고 한다

https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=ko#overview-of-redirect-types

# 참고

https://stackoverflow.com/questions/42136829/whats-the-difference-between-http-301-and-308-status-codes