---
title: 효율적인 개발을 위한 메모
description: Raycast 등 효율적인 작업에 도움이 되는 부분들 메모
---

## 단축키

보통 mac에서 `command + ,`를 누르면 현재 포커스된 앱 설정이 열린다. raycast 설정 할 때도 `command + ,` 누르면 설정 열림

window에서는 alt + tab으로 탭 선택 가능한데 맥에서도 command + Tab으로 비슷하게 앱 선택이 가능하다. 그러나 창의 내용을 확인할 수 없는 빈약한 기능. 닉값하는 AltTab이라는 앱이 있다. 이걸 이용해서 여러 창이 있을 경우 하나 선택 가능하고 해당 AltTab 창에서 창닫기 등도 가능. 나는 이 앱을 left option + tab으로 설정해놓았다.

command + 왼쪽/오른쪽 방향키: home/end처럼 줄의 왼쪽끝/오른쪽끝으로 이동 가능
option + 왼쪽/오른쪽 방향키: 단어 단위 이동 가능
command + w: 현재 창(탭) 닫기

command + t: 새 탭 띄우기. 터미널에서도 사용 가능
command + p: 커서에서 파일 이름으로 검색해서 바로 열기 가능

- 참고

단축키 애호가의 맥북 단축키 정리

https://inkkim.github.io/etc/%EB%8B%A8%EC%B6%95%ED%82%A4-%EC%95%A0%ED%98%B8%EA%B0%80%EC%9D%98-%EB%A7%A5%EB%B6%81-%EB%8B%A8%EC%B6%95%ED%82%A4-%EC%A0%95%EB%A6%AC/

## 꿀팁

`-`는 보통 터미널에서 마지막 컨텍스트. 예를 들어 `git switch -`하면 이전에 있었던 브랜치로 감

mac automator: 효율화의 신. 이걸로 빠른 실행, 커서 열기 스크립트 같은 걸 추가할 수 있음 https://support.apple.com/ko-kr/guide/automator/welcome/mac
https://blog.naver.com/nearfall/223355336046

하지만 Lua를 쓰는 hammerspoon이라는 앱이 있는데 이게 압살함 https://www.hammerspoon.org/

rectangle: 창 왼쪽 오른쪽 위 아래 등등 옮기기 가능. 분할도 가능

## Raycast

단축키 설정이 고민인데 짬통 키 하나 만들어서 짬통키 + 알파벳, 숫자 등으로 설정하면 좋다. 나는 raycast 하이퍼키 기능 써서 right option으로.

raycast 파일 검색하면 편함 right option(하이퍼키) + F 누르면 되도록 해놨음. 그리고 이걸 잘 쓰려면 겹치는 파일명 같은 걸 좀 관리해 주면 좋은데 이걸 위한 PARA 메서드라는 게 있음
https://hannut91.github.io/blogs/books/para-method

clipboard history도 말 그대로인데 이미지 복사 같은 것도 보관해 놔서 좋음

cursor, github 같은 것도 다 확장이 있다. 깔고 적절한 기능에 단축키 / alias 등록하면 좋음

- github에서 레포지토리를 찾는 search repo는 gh로 alias 등록
- cursor에서 최근 프로젝트를 찾는 recent project는 projects로 alias 등록

이외의 익스텐션: kill process, emoji(e로 alias 등록해 놓았음), iTerm(open iterm2 here 등 가능)

설정 - advanced에서 하이퍼키를 설정할 수 있다. 대충 4개 키 1번에 누르는 거랑 같은효과인데 짬통 키로 쓰기 좋다. 나는 right option으로 사용 중

right option(하이퍼키) + 숫자키로 적당한 앱 열기나 기능 실행 같은 거 설정하면 좋다. 나는 right option + 1은 크롬 새탭 (검색도 가능), right option + 2는 커서 새창 열기로 해놓았다.

퀵링크로 특정 링크로 가거나 automator로 만든 명령어/스크립트 같은 것도 실행할 수 있다
https://www.raycast.com/core-features/quicklinks

## 참고할 만한 링크

https://humorous-bass-b9e.notion.site/21e016f4183980eca3a3f2f3994f4466

https://www.integer.blog/raycast/

## 터미널

터미널에서 현재 경로에서 finder 열려면 `open .`

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
