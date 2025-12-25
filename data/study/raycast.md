---
title: 효율적인 개발을 위한 메모
description: Raycast 등 효율적인 작업에 도움이 되는 부분들 메모
---

## 단축키

보통 mac에서 `command + ,`를 누르면 현재 포커스된 앱 설정이 열린다. raycast 설정 할 때도 `command + ,` 누르면 설정 열림

window에서는 alt + tab으로 탭 선택 가능한데 맥에서도 command + Tab으로 비슷하게 앱 선택이 가능하다. 그러나 창의 내용을 확인할 수 없는 빈약한 기능. 닉값하는 AltTab이라는 앱이 있다. 이걸 이용해서 여러 창이 있을 경우 하나 선택 가능하고 해당 AltTab 창에서 창닫기 등도 가능. 나는 이 앱을 left option + tab으로 설정해놓았다.

- 내가 몰랐던 것들

`command + 위/아래 방향키`: 문서의 위쪽끝/오른쪽끝으로 이동
`command + 왼쪽/오른쪽 방향키`: home/end처럼 줄의 왼쪽끝/오른쪽끝으로 이동 가능
`option + 왼쪽/오른쪽 방향키`: 단어 단위 이동 가능
`command + shift + 왼쪽/오른쪽 방향키`: 현재 커서가 있는 줄에서 왼쪽/오른쪽 전체 선택(한 줄 단위)
`option + shift + 왼쪽/오른쪽 방향키`: 현재 커서에서 단어 단위로 왼쪽/오른쪽 선택

`option` + 위아래 방향키로 마우스 커서가 위치한 줄을 1줄 단위로 위아래로 밀기 가능(from. 코더빡)

`option`을 누르고 클릭하면 다중 선택 가능. 위의 기능들과 결합하면 option + 포인터로 다중 선택 후 `command + <-`로 다중 선택 커서들이 있는 왼쪽을 전부 선택 후 지우기/따옴표로 감싸기 같은 거 가능

`command + q`: 현재 앱 닫기
`command + w`: 현재 탭 닫기
`command + shift + w`: 현재 창 닫기
`command + h`: 전면 앱 윈도우 가리기

`command + t`: 새 탭 띄우기. 터미널에서도 사용 가능
`command + n`: 새 창 띄우기, new인 듯 하다. 단 커서에서는 새 윈도우가 뜨지 않고 새 탭이 뜸에 주의. finder 하나 더 띄우기 등에 유용

`command + ~`: 동일한 애플리케이션의 다른 창 사이를 전환

(finder에서)
`command + 백스페이스`: 파일 삭제
`command + option + 백스페이스`: 휴지통으로 안보내고 바로 삭제. 윈도우의 shift + delete 같은 거

`command + (+), (-)`: 커서에서 폰트 확대/축소

`command + ctrl + q`: 화면 잠금. 물론 나는 전원버튼 누르는 걸 좋아함

- 대부분 코더빡이 알려준 크롬 관련 단축키

`command + shift + t`: 닫은 탭 다시 열기
`command + 숫자키`: 현재 열려 있는 창에서 숫자키에 해당하는 탭으로 가기(**1-index**). 열받는 건 `command + 9`는 마지막 탭으로 간다.
`control + tab`: 현재 탭의 오른쪽 탭으로 이동
`control + shift + tab`: 현재 탭의 왼쪽 탭으로 이동
이걸 방향키로도 할 수 있다. `option + command + 왼쪽/오른쪽 방향키`로 탭 간 이동 가능. 크롬/커서 등등에서 가능

`command` + 방향키로 뒤로가기/앞으로가기 가능. 내 마우스같은 경우 마우스 왼쪽에 달린 버튼 2개로도 가능(게이밍 마우스에 많이 달려 있는 듯)
링크에 대고 `command` 누른 상태에서 클릭시 새 탭에서 열림. 이외에 링크에 대고 휠을 클릭해도 새탭에서 열림
-> 하지만 js 이벤트 기반으로 페이지를 이동시키는 사이트에선 안될 때가 많다. 웹 표준을 안지키는 망할 사이트들

전체 모음

https://support.google.com/chrome/answer/157179?hl=ko&co=GENIE.Platform%3DDesktop

- 너무 유명하지만 혹시나 해서 적어놓는 단축키들

`command + c,v`: 복사 붙여넣기
`command + x`: 잘라내기
`command + a`: 전체 선택
`command + z`: 직전 동작 실행 취소. `command + shift + z` 하면 실행 취소한 동작을 취소가능
`command + f`: 문서에서 검색. shift랑 같이 누르면 디렉토리 같은 단위로 검색도 가능(cursor, vscode)
`command + s`: 현재 문서 저장
`command + r`: 새로고침(fn키를 통해 F5를 쓸 수도 있겠지만 귀찮다)

`command + b`: 선택 텍스트 볼드체
`command + i`: 선택 텍스트 이탤릭체
`command + u`: 선택 텍스트 밑줄

tab을 치면 들여쓰기를 한다. 근데 `shift + tab`을 누르면 들여쓰기가 한칸 지워진다. 이걸 이용해서 여러 줄의 들여쓰기를 한번에 바꿀 수 있다.

- 터미널에서는 `control + r`을 통해 지난 명령 검색 가능. `fzf`(brew로 설치)를 쓰면 더 보기 좋게 방향키로 이동해 가면서 보는 것 등도 가능.

- 커서 IDE에서

`command + p`: 커서에서 파일 이름으로 검색해서 바로 열기 가능(원래는 현재 화면 프린트)
`command + b`: 왼쪽에 파일 트리 표시하는 사이드바 열기/닫기

`command + shift + L`: 선택한 단어 현재 문서에서 전부 찾아서 다중 선택. 원래 vscode 기능인데 커서에선 기본적으로 안되어서 Keyboard shortcut 설정에서 바꿔야 함 https://forum.cursor.com/t/equivalent-vscode-shift-command-l-l/11361/2

`command + shift + h`: 선택한 단어를 현재 열린 프로젝트에서 전부 찾아서 바꾸기 기능. 바꿀 단어 선택 -> `command + shift + h` -> 포함/제외할 파일 형식 선택 -> 바꿀 단어 입력하고 replace 클릭하면 한방에 일괄 변경 가능. 단 필요없는 부분까지 바뀌지는 않는지 주의 필요

`command` 누르고 변수명, import 같은 거 클릭하면 해당 정의로 간다.

- 스크린샷

`command + shift + 3`: 전체 화면 캡처
`command + shift + 4`: 선택 영역 캡처. 이거 누르고 캡처할 영역을 선택할 수 있는 상태에서 스페이스바 누르면 특정 윈도우 창 선택해서 캡처 가능
`command + shift + 5`: 메뉴 바 같은 걸 통해서 이 모든 동작 가능. 그리고 그 메뉴바 - 옵션에서 스크린샷 관련 설정을 할 수 있다. 캡처한 사진이 어디로 갈지도 선택할 수 있는데 이때 "클립보드"로 설정하면 이렇게 캡처한 이미지가 자동으로 클립보드로 간다.

맥 기본 스크린샷을 압살하는 기능을 가진 shottr라는 앱도 있다는데 써보지는 않았다.

- 참고

단축키 애호가의 맥북 단축키 정리

https://inkkim.github.io/etc/%EB%8B%A8%EC%B6%95%ED%82%A4-%EC%95%A0%ED%98%B8%EA%B0%80%EC%9D%98-%EB%A7%A5%EB%B6%81-%EB%8B%A8%EC%B6%95%ED%82%A4-%EC%A0%95%EB%A6%AC/

Mac keyboard shortcuts

https://support.apple.com/ko-kr/102650

## 꿀팁

`-`는 보통 터미널에서 마지막 컨텍스트. 예를 들어 `git switch -`하면 이전에 있었던 브랜치로 감

시스템 설정 - 키보드 - "키 반복 속도", "반복 지연 시간" 빠르게, 빠르게 설정해야 안 답답함

mac automator: 효율화의 신. 이걸로 빠른 실행, 커서 열기 스크립트 같은 걸 추가할 수 있음 https://support.apple.com/ko-kr/guide/automator/welcome/mac
https://blog.naver.com/nearfall/223355336046

나는 사실 대부분 앱에 대해 raycast의 확장을 이용하고 있어서 이걸 쓰진 않고 있음.

만약 정말 잘 자동화를 쓰고 싶으면 Lua를 쓰는 hammerspoon이라는 앱이 있는데 이게 automator를 압살한다고 함 https://www.hammerspoon.org/

rectangle: 창 왼쪽 오른쪽 위 아래 등등 옮기기 가능. 분할도 가능

-> 하지만 raycast의 window management로 대체했다. rectangle이 기능이 더 많다고도 하데 어차피 상하좌우 반으로밖에 안 써서... `control + option + 상하좌우 방향키`로 창을 이동한다.
`control + option + f`로는 최대화. (원래 맥에서 `command control f`로 전체화면을 하는 걸 참고했다)
`control + option + r`로 restore(이전 화면 크기로)

클로드 코드에서 `shift + tab`을 누르면 planning mode / 수정 허용 모드 등을 왔다갔다할 수 있다.

물결키 눌렀을 때 원화 대신 백틱을 기본적으로 나오게 하기. 나는 `~/Library/KeyBindings` 설정을 통해서 했음.

https://www.korecmblog.com/blog/backtick-fix

카라비너에서 right command로 한영키 만들기.

https://blog.naver.com/paintshop5/222996072682

맥은 fn키를 누르면 이모지 검색이 나오는 그런 설정이 언제부턴가 기본이다. 이걸 꺼야 한다

https://tttap.tistory.com/273

## Raycast

### 세팅에 관한 결정들

`command + Space`: 레이캐스트 여는 단축키(레이캐스트 내에서 설정 가능, 기본 spotlight는 버리기)

raycast 기본 + 각종 익스텐션의 기능들을 alias나 하이퍼키를 이용한 단축키 설정으로 해놓으면 좋다.

이때 단축키 팁 같은 건 이미 커스텀 키보드 같은 걸 쓰는 사람들에 의해 굉장한 연구가 이루어져 왔다. 모든 걸 커스텀 키 조합으로 만들어서 모든 동작을 2 depth 안에 마치려고 하는 매니아들도 있다.

그들의 설정을 모두 따올 수는 없지만 가장 공감한 건 "한손으로 누를 수 있어야 한다"는 거. 그러니 오른손으로는 마우스를 조작하고 왼손으로 단축키를 누를 수 있도록 자주 쓰는 단축키라면 왼손 쪽에 배치하도록 하자.

이 전략을 따라서 Caps Lock을 하이퍼키로 설정하였다. 설정 - advanced에서 하이퍼키를 설정할 수 있다. 대충 4개 키 1번에 누르는 거랑 같은효과인데 짬통 키로 쓰기 좋다. 나는 Caps Lock으로 사용.

왼쪽에 있는 키들 중 control, option, command 는 단축키들에 너무 많이 쓰이기 때문에 곤란하다.

**나는 하이퍼키를 karabiner를 통해 설정했다. 카라비너 세팅 - complex modifications - Add predefined rules에서 기본으로 설정 가능.** 이렇게 안하면 카라비너 세팅이랑 레이캐스트의 하이퍼키 세팅이랑 자꾸 충돌함.

카라비너가 잘 안되는 경우가 있다고 하는데 내가 겪지는 않았지만 이 경우 hyperkey라는 앱을 쓸 수도 있다고 한다.

### 내 alias, 하이퍼키 설정

내가 해놓은 것

- alias `http`: HTTP 코드 찾기
- alias `gh`: github 레포지토리 찾아서 열기
- alias `e`: 이모지 검색
- alias `projects`: cursor 최근 프로젝트 찾기
- alias `term`: Open iTerm here
- alias `claude`: claude.ai 퀵링크
- alias `sec`: 설정 - 개인정보 보호 및 보안(각종 앱 설치 시마다 이거 설정해야 할 때가 많은데 켜기 귀찮으니까)

Caps Lock이 하이퍼키임. 하이퍼키 + 숫자키로 적당한 앱/기능 실행하면 좋겠어서 설계 중

- `Caps Lock + g`: 내 github 레포지토리들 찾기
- `Caps Lock + h`: clipboard history. 말 그대로 복사했던 내용들인데 이미지 복사 같은 것도 보관해 놔서 좋음
- `Caps Lock + f`: 파일 검색. 이걸 잘 쓰려면 겹치는 폴더/파일명 같은 거 좀 관리해주면 좋은데 이걸 위한 PARA 메서드라는 게 있음
  https://hannut91.github.io/blogs/books/para-method
- `Caps Lock + 1`: 크롬 새탭 (검색도 가능)
- `Caps Lock + 2`: 커서 새창 열기

앱 단축키. 보통 앱이나 해당 기능의 머리글자를 따서 짓는다.

- `Caps Lock + s`: 슬랙
- `Caps Lock + d`: 디스코드
- `Caps Lock + b`: Bruno(API 쏘는 거)
- `Caps Lock + c`: chrome
- `Caps Lock + k`: GitKraken
- `Caps Lock + t`: 터미널. 나 같은 경우 iterm2이고 알라크리티 같은 다른 프로그램일 수도
- `Caps Lock + e`: 코드 에디터(나의 경우 cursor)
- `Caps Lock + z`: zoom
- `Caps Lock + n`: raycast note(note의 첫 글자를 땄으므로 이후에 다른 노트 앱으로 바꿀 수도 있는데 raycast note도 쓸만한 듯)
- `command` 따닥 2번 누르기: finder

`shift` 따닥 누르기도 편한데 아직 여기 들어갈 정도로 중요한 앱을 찾지 못했다.

### 좋은 기능과 팁

**action panel**: 레이캐스트는 액션 패널이란 걸 통해서 앱의 추가적인 기능을 사용할 수 있다. 레이캐스트 상에서 `command + k`로 실행할 수 있음. 액션 패널에서 나오는 기능들은 보통 단축키도 있는데 이런 추가 기능들을 익혀 놓으면 좋음. 예를 들어 clipboard history상에서 `command + k`를 누르면 paste to~(엔터), 컨텐츠 수정(`commend + e`)같은 다양한 기능과 단축키를 볼 수 있다. https://manual.raycast.com/action-panel

하지만 단축키까지 안 외워도, 액션 패널만 해도 앱 종료, 앱의 추가 기능 사용 등등 다양한 걸 할 수 있다. 심지어 앱 삭제 같은 것도 가능.

"create snippet" 등 snippet 기능으로 자동완성 문구 설정 가능. 예를 들어 `:hi` 입력하면 "안녕하세요. 잘 부탁드립니다" 나온다든지.

나는 이 아카이브에 메모할 때 마크다운 frontmatter를 자주 써야 하는 편인데 이걸 `;memo`로 등록해 놓았다. 이렇게 하면 해당 텍스트를 치면 다음 내용으로 자동으로 바뀐다.

```
---
title:
description:
---
```

calculator가 내장되어 있어서 레이캐스트에서 1+2 같은 거 치면 계산해줌.
이뿐 아니라 `rem`같은 개발 관련, 혹은 `ft`같은 단위환산도 해준다.

퀵링크로 특정 링크로 가거나 automator로 만든 명령어/스크립트 같은 것도 실행할 수 있다.
파일이나 폴더 경로도 퀵링크로 설정할 수 있는데 나 같은 경우 프로젝트 폴더를 퀵링크로 지정해 두고 `workspace`로 접근할 수 있도록 했음
https://www.raycast.com/core-features/quicklinks

`localhost:xxxx` 같은 걸 자주 쓰는데 나는 3000, 3001, 5173(vite)같은 자주 쓰는 포트번호는 숫자로 퀵링크를 설정했음. 3000 치면 `localhost:3000` 나오게

보통은 구글 검색 등 검색을 할 때 퀵링크를 쓰는 거 같은데 나는 레이캐스트 크롬 익스텐션에서 구글 검색 쓰는 게 편한 듯

[레이캐스트 검색은 fuzzy search를 지원한다.](https://manual.raycast.com/search-bar) 따라서 첫 글자만 따서 검색하는 것도 가능. 예를 들어 Search Screenshot 기능은 `ssc`만 쳐도 검색된다.

101 Things You Can Do With Raycast https://www.youtube.com/watch?v=NuIpZoQwuVY

- clipboard history -> `command+e`로 해당 클립보드 컨텐츠 수정 가능
- google search로 웹 검색 가능
- raycast note(나는 하이퍼키 + n으로 사용 중. 플로팅 노트라 적당히 쓰기 좋음)
- search screenshot: 스크린샷을 미리보기 하면서 찾고 복사 가능. fuzzy search로 `ssc`로 검색
- toggle ~ 로 여러 설정을 바꿀 수 있다(ex: toggle system appearance)
- empty trash: 휴지통 비우기
- 앱 딥링크도 퀵링크 지정 가능
- raycast ai
- dictionary(기본 기능): 사전
- theme 변경(pro 구독 필요)

괜찮아 보이는 익스텐션들

- download manager 익스텐션으로 가장 최근에 다운받은 컨텐츠 보기(show latest download, open latest download, 비슷하게 가장 최근에 받은 파일을 클립보드 copy도 가능)
- system monitor 익스텐션으로 현재 시스템 자원 사용량 모니터링
- google meet 익스텐션으로 미팅 참여하기(나는 안쓸거같긴 함)
- convert image 익스텐션으로 이미지 포맷 변환(ex: jpeg -> png), 회전, 반전 등등 가능
- tinyPNG를 이용하면 이미지 압축이 가능하지만 유료.
- measure distance 익스텐션: 화면상 두 점 사이의 거리 측정 가능. 다른 페이지나 앱 상의 gap 설정 등을 볼 수 있을 것
- color picker 익스텐션: pick color(특정 부분 색 감지), color names(hex 형식 색상의 이름 검색), extract color from image(finder에서 선택한 이미지에 사용된 색 추출)등 색상에 관한 다양한 기능 제공
- video downloader: 유튜브 등의 비디오를 다운로드 가능
- pomodoro 익스텐션: 뽀모도로 타이머. 메뉴바에 타이머 노출도 가능

생산성이랑은 큰 상관 없어 보이는 뜬금없는 기능들도 있다.

- typing practice(기본 기능): 타자연습 가능
- 다른 곳의 시간 검색(ex: `time in usa`나 `time tokyo` 검색)
- ai에 날씨 물어보기(`ask weather`)
- confetti: 화면에서 폭죽이 터지는데 이걸 보면 기분이 좋다.

### 익스텐션

사용하는 애플리케이션의 확장은 보통 깔면 좋다.

- github
- cursor
- chrome
- google search(fuzzy search를 이용하면 `gs`로 실행 가능)
- iTerm(이외에 사용하는 터미널 아무거나)

애플리케이션의 특정 기능에 alias를 달아 놓으면 유용하게 쓸 수 있다.예를 들면 이런 거.

- github에서 레포지토리를 찾는 search repo는 `gh`로 alias 등록
- cursor에서 최근 프로젝트를 찾는 recent project는 `projects`로 alias 등록
- iterm의 open iterm here은 `term`으로 alias 등록
- google meet를 사용하는 사람이라면 관련 익스텐션 기능으로 미팅을 빨리 열기

이외에 다음과 같은 익스텐션들이 깨알같은 도움이 된다.

- kill process
- port manager: 특정 포트에서 켜진 프로세스를 끌 수 있다. 개발 서버를 켤 때가 많으면 좋은 듯
- emoji(나는 `e`로 alias를 등록했다)
  - 이 익스텐션은 ai를 통한 검색도 지원해서 "congrats for grad" 같은 걸 치면 학사모를 추천해 주는 등 똑똑한 검색 가능.
- HTTP status code
- Amphetamine: 화면이 꺼지지 않게 해준다. Caffeinated 같은 비슷한 앱들도 있는 듯
  - 내게 개발을 처음 가르쳐준 사람 중 한 명은 아주 강한 고집이 몇 가지 있었다. 개발자라면 vim을 메인으로 쓰지 않더라도 기본은 무조건 알아야 한다는 등등. 그중에는 "화면을 켠 상태로 자리를 비우면 세션 탈취 등등으로 인해 너의 모든 게 탈탈 털릴 수 있으니까 단 5초라도 자리를 비우면 무조건 모니터를 꺼야 한다 안 그러면 머저리다"라는 것도 있었고 내가 모니터를 안 끄고 일어날 때마다 나를 엄청나게 괴롭혔다. 그 결과로 나는 모니터를 안 끄면 일어나서 다른 데로 걸어가다가도 모니터를 끄러 돌아오는 사람이 되어버렸고 자동으로 꺼지지 않는 것도 굉장히 불편하다. 그래서 나는 이런 걸 쓰지 않지만, 이런 걸 좋아하는 사람이 많은 듯해 쓴다.
- (Tailwind를 쓴다면) tailwind css 클래스명 검색하는거
- Paste as Plain Text: 맥에서 코드 같은 걸 붙여넣을 때 IDE에서 복사하면 배경색 같은 게 같이 들어갈 때가 있다. 나는 이게 싫어서 이 익스텐션을 깔고 option + v에 해당 익스텐션의 "plain text로 붙여넣기"를 덮어씌워 놓았다.

## 참고할 만한 링크

https://www.integer.blog/raycast/

생산성에 진심인 자의 Raycast 세팅 엿보기 (for macOS)

https://velog.io/@wisepine/%EC%83%9D%EC%82%B0%EC%84%B1%EC%97%90-%EC%A7%84%EC%8B%AC%EC%9D%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-Raycast-%EC%84%B8%ED%8C%85-%EC%97%BF%EB%B3%B4%EA%B8%B0-for-macOS

## 터미널

터미널 현재 경로에서 finder 열려면 `open .`

raycast에서 iTerm2 익스텐션을 깔면 현재 경로에서 iterm 열 수 있다.

터미널 탭 하나 더 여는 단축키는 현재 `command + t`

나는 iTerm2 + starship을 사용중인데 powerlevel10k라는 툴도 있다 https://github.com/romkatv/powerlevel10k

raycast에서 터미널로 이동하는 단축키 같은 것도 설정 가능한데 나는 커맨드 2번 누르는 걸로 했음

zshrc로 단축 명령어 등등 지정 가능. git 명령 같은 거 해놓았다.

지금 내가 해놓은 zshrc는 다음과 같음. 사실 나는 gitKraken을 쓰기 때문에 github 관련한 커맨드들은 잘 쓰지 않음

```bash
eval "$(starship init zsh)"

# 예쁜 터미널 별칭들
alias ls='eza --icons'
alias ll='eza -l --icons --git'
alias la='eza -la --icons --git'
alias lt='eza --tree --icons'
alias cat='bat'
alias find='fd'

# Git 별칭들
alias g='git'
alias ga='git add'
alias gaa='git add --all'
alias gb='git branch'
alias gbd='git branch -d'
alias gbD='git branch -D'
alias gcane='git commit --amend --no-edit'
alias gcd='git switch $(git_develop_branch)'
alias gcl='git clone --recursive'
alias gcm='git switch $(git_main_branch)'
alias gcmsg='git commit -S -m'
alias gcnmsg='git commit --allow-empty-message'
alias gco='git checkout'
alias gd='git diff'
alias gds='git diff --staged'
alias gf='git fetch'
alias gl='git pull'
alias glog='git log --oneline --decorate --graph'
alias gloga='git log --oneline --decorate --graph --all'
alias gm='git merge'
alias gp='git push'
alias gpup='git push -u'
alias gpf='git push --force'
alias gr='git restore'
alias grs='git restore --staged'
alias gst='git status'
alias gsgsd='git stash && git stash drop'
alias gsw='git switch'
alias gswc='git switch -c'
alias gswd='git switch -d'

eval "$(zoxide init zsh)"
alias cd='z'
alias -g ...='../..'
alias -g ....='../../..'
alias -g .....='../../../..'
alias zshrc='vim ~/.zshrc'

function git_main_branch() {
  command git rev-parse --git-dir &>/dev/null || return
  local ref
  for ref in refs/{heads,remotes/{origin,upstream}}/{main,trunk}; do
    if command git show-ref -q --verify $ref; then
      echo ${ref:t}
      return
    fi
  done
  echo master
}

function git_develop_branch() {
  command git rev-parse --git-dir &>/dev/null || return
  local branch
  for branch in dev devel development; do
    if command git show-ref -q --verify refs/heads/$branch; then
      echo $branch
      return
    fi
  done
  echo develop
}
```

수정하고 싶으면 수정 후 `source ~/.zshrc`

터미널 열고 매번 cd로 경로 이동하는 거 귀찮다. 따라서 zoxide라는 걸 쓸 수 있다. 이걸 쓰면 한번 이동한 경로는 학습해서 조금만 쳐도 자동완성해 줌 https://github.com/ajeetdsouza/zoxide

## 도움주신 분

- [이창희](https://xo.dev/)
- [박성훈](https://blog.koder.page/)
- [이재열](https://kodingwarrior.github.io/)
