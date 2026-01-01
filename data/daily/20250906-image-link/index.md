---
title: 2025-09-06 이미지에 링크를 거는 법 a, area, 또 a
description: 페이지를 만들다 보면 이미지에 링크를 걸고 싶을 때가 많다. 어떻게 하지?
---

개발을 하다 보면 이미지에 링크를 걸고 싶을 때가 있다. 가령 마녀 모자를 누르면 내 블로그로 이동하는 링크를 만들고 싶다던가. 여기에는 여러 가지 방법이 있고 복잡한 링크 이미지를 만들 수 있는 방법도 있는데 간략히 알아보자.

## 전체 이미지 링크 만들기

이미지 전체가 링크로 기능하도록 하고 싶다면 간단하다. 프론트엔드로 페이지를 조금만 짜 봤다면 해보았을 거라 생각한다. 링크 태그 내에 이미지 태그를 중첩해 넣으면 된다.

그럼 `<a>` 태그 내에 `<img>`태그를 중첩해 넣으면 된다. 이미지의 `alt` 속성에 마치 텍스트 링크에 설명을 적듯 이미지 링크가 가리키는 곳을 설명해 주면 된다.

<a
href="https://witch.work/"
class="image-link"
target="_blank"
rel="noopener noreferrer"
title="마녀 블로그 방문하기">
<img src="./witch-hat.png" alt="마녀 블로그 방문하기" width="400" height="300" />
</a>

Next.js와 같은 걸 사용하고 있다면 `<Link>`, `<Image>`등 최적화가 적용된 태그를 사용할 수도 있을 것이다.

# 참고

MDN 이미지 링크 넣기

https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#image_link

svg `<a>` 태그

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/a

html `<area>` 태그

https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area

html 스펙의 `area` 태그 관련 문서

https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element

HTML `<area>` 태그 – 올바른 이해와 사용 방법

https://codingeverybody.kr/html-area-%ED%83%9C%EA%B7%B8/

map, area tag로 간단하게 페이지 개발하기

https://vroomfan.tistory.com/59

CSS overlay 속성

https://developer.mozilla.org/en-US/docs/Web/CSS/overlay

CSS clip-path, 링크 태그를 일부만 보이도록 할 수 있게 할지도?

https://developer.mozilla.org/ko/docs/Web/CSS/clip-path

react-image-mapper

https://coldiary.github.io/react-image-mapper/
