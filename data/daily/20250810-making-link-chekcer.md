---
title: 사이트 링크 검사기 만들기
description: playwright를 이용해서 사이트의 링크를 검사하는 도구를 만들어 보기
---

오픈소스에 기여하고 싶어서 이곳저곳 기웃대면서, 문서에 깨진 링크나 오타가 생각보다 정말 많다는 걸 알게 되었다. 꼭 404가 뜨는 링크가 아니더라도 이제 없어진 단락 id로 가는 링크라든지. 심지어 내 블로그에도 깨진 내부 링크가 엄청 많다.

이런 걸 기여한다고 해서, 문서를 읽게 된다는 거 이외에 개발 실력이 직접적으로 늘어난다든가 하는 건 없다. 그래도 메이저 오픈소스에 이런 거라도 도움을 줄 수 있는 건 기분이 좋은 일이다.

하지만 이걸 매번 수작업으로 검사하기는 힘들고 시간상 한계도 있으니 매크로를 만들어서 기여를 복사하면 어떨까? 하는 생각을 해봤다. 만들려고 설계를 하다 보니 오픈소스 관리자들도 매번 broken link 같은 기여를 받는 것도 귀찮을 테니 수요가 있을 수도 있겠다 싶었다. ai로 내용 검수 등의 로직을 추가할 수도 있겠다 싶고? 어쨌든 사이트 관리 도구 같은 걸 짜보자.

사실 개발 실력이 는다는 의미 같은 건 없긴 하다. 그래도 메이저 오픈소스에 기여한 건 기여한 것이므로 어쨌든 기분이 좋기는 하다..근데 이걸 내가 매번 수작업으로 검사하기는 힘드니까 매크로를 만들어서 기여를 복사하면 어떨까? 하는 생각을 해봤다.

그래서 만들어 보았다. 만들려고 설계를 하다 보니 오픈소스 관리자들도 매번 broken link 같은 기여를 받는 것도 귀찮을 테니 수요가 있을 수도 있겠다 싶었다. ai로 검수하는 로직을 추가할 수도 있겠다 싶기도 하고? 어쨌든 사이트 관리도구 같은 걸 짜보기로 했다.

브라우저를 띄우는 건 playwright를 사용하는 걸로. 어차피 스크립트를 실행하는 방식이지만 ts를 쓰고 싶으므로 [tsx](https://tsx.is/) 사용.

참고로 이렇게 만든 걸로 playwright, tsx등 여기서 사용한 오픈소스들의 페이지도 싹 한번 검사 돌릴 것이다.

pnpm으로 playwright 프로젝트 생성.

```
mkdir site-checker
cd site-checker
pnpm create playwright

mkdir src reports
mkdir -p src/{types,utils,config}
pnpm add -D typescript
npx tsc --init

pnpm add -D tsx
```

tsx 문서, claude 등의 도움으로 tsconfig는 대충 설정

기본적인 설계는 이렇다. 사이트 URL을 넣으면 해당 URL의 사이트맵을 찾아서 파싱한 후 각 페이지를 검사한다.

먼저 [DOMParser를 사용해서 사이트맵을 파싱하는 코드](https://bugfactory.io/articles/extracting-all-urls-of-your-sitemap-xml-with-javascript/)를 찾았으나 DOMParser는 브라우저 환경에서만 사용 가능하므로 패스. jsdom 같은 걸 쓸 수도 있긴 하지만 투머치라고 생각한다.

사이트맵이 XML로 구성된 것에 착안하여 xml2js를 쓰기로 결정. xml2js 파서를 이용해서 다음과 같은 코드를 짰다. 사이트맵 URL을 fetch해 와서 파싱 후 URL로 이루어진 배열을 리턴하는 방식이다. 사이트맵이 있는 URL을 넣어주면 사이트맵을 구성하는 URL들을 잘 가져오는 걸 확인 가능하다.

```ts
import { SitemapUrl } from "./types/index.js";
import * as xml2js from "xml2js";

// TODO: 사이트맵 인덱스에 대해서도 파싱하도록 추가
export async function readSitemap(sitemapUrl: string) {
  const response = await fetch(sitemapUrl);
  const rawXMLString = await response.text();

  const parsedUrls = await parseXmlToUrls(rawXMLString);

  return parsedUrls;
}

async function parseXmlToUrls(xmlString: string) {
  const parser = new xml2js.Parser();
  const parsedDocument = await parser.parseStringPromise(xmlString);
  return parsedDocument.urlset.url.map((url: SitemapUrl) => url.loc[0]);
}
```

TODO: linter 설정
vite로 프론트엔드 설정해보기
