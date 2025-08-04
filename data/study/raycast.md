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
`command + w`: 현재 창(탭) 닫기
`command + h`: 전면 앱 윈도우 가리기

`command + t`: 새 탭 띄우기. 터미널에서도 사용 가능
`command + n`: 새 창 띄우기, new인 듯 하다. 단 커서에서는 새 윈도우가 뜨지 않고 새 탭이 뜸에 주의. finder 하나 더 띄우기 등에 유용

(finder에서)
`command + 백스페이스`: 파일 삭제
`command + option + 백스페이스`: 휴지통으로 안보내고 바로 삭제. 윈도우의 shift + delete 같은 거

`command + (+), (-)`: 커서에서 폰트 확대/축소

`command + ctrl + q`: 화면 잠금. 물론 나는 전원버튼 누르는 걸 좋아함

- 코더빡이 알려줌

`command + shift + t`: 닫은 탭 다시 열기
`command + 숫자키`: 현재 열려 있는 창에서 숫자키에 해당하는 탭으로 가기(**1-index**)
`control + tab`: 현재 탭의 오른쪽 탭으로 이동
`control + shift + tab`: 현재 탭의 왼쪽 탭으로 이동

- 너무 유명하지만 혹시나 해서 적어놓는 단축키들

`command + c,v`: 복사 붙여넣기
`command + x`: 잘라내기
`command + a`: 전체 선택
`command + z`: 직전 동작 실행 취소. `command + shift + z` 하면 실행 취소한 동작을 취소가능
`command + f`: 문서에서 검색. shift랑 같이 누르면 디렉토리 같은 단위로 검색도 가능(cursor, vscode)
`command + s`: 현재 문서 저장

`command + b`: 선택 텍스트 볼드체21
`command + i`: 선택 텍스트 이탤릭체
`command + u`: 선택 텍스트 밑줄

- 커서 IDE에서

`command + p`: 커서에서 파일 이름으로 검색해서 바로 열기 가능(원래는 현재 화면 프린트)
`command + b`: 왼쪽에 파일 트리 표시하는 사이드바 열기/닫기

`command + shift + L`: 선택한 단어 현재 문서에서 전부 찾아서 다중 선택. 원래 vscode 기능인데 커서에선 기본적으로 안되어서 Keyboard shortcut 설정에서 바꿔야 함 https://forum.cursor.com/t/equivalent-vscode-shift-command-l-l/11361/2

`command` 누르고 변수명, import 같은 거 클릭하면 해당 정의로 간다.

- 스크린샷

`command + shift + 3`: 전체 화면 캡처
`command + shift + 4`: 선택 영역 캡처. 이거 누르고 캡처할 영역을 선택할 수 있는 상태에서 스페이스바 누르면 특정 윈도우 창 선택해서 캡처 가능
`command + shift + 5`: 메뉴 바 같은 걸 통해서 이 모든 동작 가능. 그리고 그 메뉴바 - 옵션에서 스크린샷 관련 설정을 할 수 있다. 캡처한 사진이 어디로 갈지도 선택할 수 있는데 이때 "클립보드"로 설정하면 이렇게 캡처한 이미지가 자동으로 클립보드로 간다.

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

하지만 Lua를 쓰는 hammerspoon이라는 앱이 있는데 이게 압살한다고 함 https://www.hammerspoon.org/

rectangle: 창 왼쪽 오른쪽 위 아래 등등 옮기기 가능. 분할도 가능

물결키 눌렀을 때 원화 대신 백틱을 기본적으로 나오게 하기. 나는 `~/Library/KeyBindings` 설정을 통해서 했음.

https://www.korecmblog.com/blog/backtick-fix

카라비너에서 right command로 한영키 만들기.

https://blog.naver.com/paintshop5/222996072682

맥은 fn키를 누르면 이모지 검색이 나오는 그런 설정이 언제부턴가 기본이다. 이걸 꺼야 한다

https://tttap.tistory.com/273

## Raycast

`command + Space`: 레이캐스트 여는 단축키(레이캐스트 내에서 설정 가능)

raycast 기본 + 각종 익스텐션의 기능들을 alias나 하이퍼키를 이용한 단축키 설정으로 해놓으면 좋다.

이때 단축키 팁 같은 건 이미 커스텀 키보드 같은 걸 쓰는 사람들에 의해 굉장한 연구가 이루어져 왔다. 모든 걸 커스텀 키 조합으로 만들어서 모든 동작을 2 depth 안에 마치려고 하는 매니아들도 있다.

그들의 설정을 모두 따올 수는 없지만 가장 공감한 건 "한손으로 누를 수 있어야 한다"는 거. 그러니 오른손으로는 마우스를 조작하고 왼손으로 단축키를 누를 수 있도록 자주 쓰는 단축키라면 왼손 쪽에 배치하도록 하자.

이 전략을 따라서 Caps Lock을 하이퍼키로 설정하였다. 설정 - advanced에서 하이퍼키를 설정할 수 있다. 대충 4개 키 1번에 누르는 거랑 같은효과인데 짬통 키로 쓰기 좋다. 나는 Caps Lock으로 사용.

왼쪽에 있는 키들 중 control, option, command 는 단축키들에 너무 많이 쓰이기 때문에 곤란하다.

**나는 하이퍼키를 karabiner를 통해 설정했다. 카라비너 세팅 - complex modifications - Add predefined rules에서 기본으로 설정 가능.** 이렇게 안하면 카라비너 세팅이랑 레이캐스트의 하이퍼키 세팅이랑 자꾸 충돌함.

---

내가 해놓은 것

- alias `http`: HTTP 코드 찾기
- alias `gh`: github 레포지토리 찾아서 열기
- alias `e`: 이모지 검색
- alias `projects`: cursor 최근 프로젝트 찾기
- alias `terminal`: Open iTerm here

Caps Lock이 하이퍼키임. 하이퍼키 + 숫자키로 적당한 앱/기능 실행하면 좋겠어서 설계 중

- `Caps Lock + g`: 최근 github 레포지토리들 찾기
- `Caps Lock + h`: clipboard history. 말 그대로 복사했던 내용들인데 이미지 복사 같은 것도 보관해 놔서 좋음
- `Caps Lock + f`: 파일 검색. 이걸 잘 쓰려면 겹치는 폴더/파일명 같은 거 좀 관리해주면 좋은데 이걸 위한 PARA 메서드라는 게 있음
  https://hannut91.github.io/blogs/books/para-method
- `Caps Lock + 1`: 크롬 새탭 (검색도 가능)
- `Caps Lock + 2`: 커서 새창 열기

앱 단축키

- `Caps Lock + d`: 디스코드
- `Caps Lock + b`: Bruno
- `Caps Lock + c`: cursor
- `Caps Lock + k`: GitKraken
- `Caps Lock + t`: iterm(혹은 아무 터미널이나)

`command` 따닥 2번 누르기: Chrome

---

"create snippet" 등 snippet 기능으로 자동완성 문구 설정 가능. 예를 들어 `:hi` 입력하면 "안녕하세요. 잘 부탁드립니다" 나온다든지.

---

깔면 좋은 익스텐션

- github
- cursor
- kill process
- iTerm(이외에 사용하는 터미널 아무거나)
- emoji
- HTTP status code
- (Tailwind를 쓴다면) tailwind css 클래스명 검색하는거
- (나는 안쓰지만 화면을 안 끄고 싶다면 쓰기) Amphetamine

cursor, github 같은 것도 다 확장이 있다. 깔고 적절한 기능에 단축키 / alias 등록하면 좋음

- github에서 레포지토리를 찾는 search repo는 gh로 alias 등록
- cursor에서 최근 프로젝트를 찾는 recent project는 projects로 alias 등록

이외의 익스텐션: kill process, emoji(e로 alias 등록해 놓았음), iTerm(open iterm2 here 등 가능)

퀵링크로 특정 링크로 가거나 automator로 만든 명령어/스크립트 같은 것도 실행할 수 있다
https://www.raycast.com/core-features/quicklinks

## 참고할 만한 링크

https://www.integer.blog/raycast/

## 터미널

터미널 현재 경로에서 finder 열려면 `open .`

raycast에서 iTerm2 익스텐션을 깔면 현재 경로에서 iterm 열 수 있다.

터미널 탭 하나 더 여는 단축키는 현재 `command + t`

나는 iTerm2 + starship을 사용중인데 powerlevel10k라는 툴도 있다 https://github.com/romkatv/powerlevel10k

raycast에서 터미널로 이동하는 단축키 같은 것도 설정 가능한데 나는 커맨드 2번 누르는 걸로 했음

zshrc로 단축 명령어 등등 지정 가능. git 명령 같은 거 해놓았다.

지금 내가 해놓은 zshrc는 다음과 같음

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

- 참고 링크

https://humorous-bass-b9e.notion.site/21e016f4183980eca3a3f2f3994f4466
