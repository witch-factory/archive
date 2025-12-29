---
title: GitHub 멀티 계정 설정
description: 개인/회사 GitHub 계정을 분리하여 사용하기
---

회사에서 사용하는 GitHub 계정이 따로 있는 경우가 많다. 그런데 회사 프로젝트, 개인 프로젝트 따로 매번 로그인-로그아웃을 반복하기는 귀찮은 일이다. 또 실수로 회사 계정에 커밋해 버릴지도 모르고. 이상적으로는 회사 노트북-개인 노트북을 분리하면 좋겠지만 그러기 힘든 경우도 많으니까.

그래서 하나의 컴퓨터에서 개인 계정과 회사 계정을 분리하여 사용할 수 있게 설정해봤다.

## ssh 키 생성

`ssh-keygen`으로 ssh 키를 생성할 수 있다. 이 경우 `~/.ssh`(맥 기준)에 `id_ed25519`가 생성된다. 그런데 나는 이미 개인용 프로필로 `id_ed25519` ssh 키를 만들어 놓았으므로 회사용 키를 새로 만들어야 한다.

```bash
ssh-keygen -t ed25519 -C "회사이메일" -f ~/.ssh/id_ed25519_회사
# 예시
ssh-keygen -t ed25519 -C "company@abc.com" -f ~/.ssh/id_ed25519_abc
```

그러면 `~/.ssh`에 회사 프로필에 쓸 ssh 키가 생성된다.

## ssh 설정

`~/.ssh/config`에서 ssh 설정을 한다. host에 별명을 지어서 키를 분리하기 위한 설정이다.

```bash
# 물론 nano나 emacs, vscode 같은 걸 써도 된다.
vi ~/.ssh/config
```

다음 내용을 추가

```bash
# 개인 GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes

# 회사 GitHub
Host github-abc # 설정할 호스트명
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_abc
  IdentitiesOnly yes
```

- Host: 접속할 때 사용할 별명
- IdentityFile: 사용할 SSH 키 경로
- IdentitiesOnly yes: 지정한 키만 사용 (다른 키 시도 방지)

## Git 설정

이제 깃헙에 ssh 키를 등록한다. 아까 만든 회사용 키의 공개 키인 `.pub`를 등록하면 된다.

1. 회사 계정으로 GitHub 로그인
2. Settings → SSH and GPG keys
3. New SSH key 클릭해서 식별용 이름(ex: my-company-key) 짓기
4. 복사한 공개키를 붙여넣고 저장

이때 '복사한 공개키'란 다음과 같이 해서 나오는 값을 복사 붙여넣기하면 된다. 앞서 생성한 키의 `pub` 버전.

```bash
cat ~/.ssh/id_ed25519_abc.pub
```

테스트는 `ssh -T git@github-abc` 처럼 해서 내 회사 계정이 나오면 성공이다.

디렉토리별 Git 설정도 한다. 나는 `~/workspace`에 회사 프로젝트들을 전부 담아 놓았다. 그러므로 workspace 폴더에 대해서는 회사 프로필이 담긴 새로운 git 설정 파일을 쓰도록 하겠다.

`~/.gitconfig`에 다음과 같은 내용을 추가한다. `~/workspace`를 포함하는 폴더에 대해서는 `~/.gitconfig-work`를 설정 파일로 쓴다는 뜻이다.

이때 `~/workspace`에서만 회사 프로필을 쓰고 나머지에서는 개인 프로필을 쓰려고 하기 때문에 전역 설정인 `~/.gitconfig`의 `[user]`에 내 개인 프로필이 있는지 확인한다. 잘 되었는지는 `git config user.email`등의 커맨드로 확인할 수 있다.

```bash
[includeIf "gitdir:~/workspace/"]
  path = ~/.gitconfig-work
```

그럼 당연히 `~/.gitconfig-work`를 설정해야겠지? `vi ~/.gitconfig-work` 등을 통해 이렇게 설정한다.

```bash
[user]
  name = 회사이름
  email = 회사이메일@company.com
```

그러면 `~/workspace` 하위에서는 회사 프로필이 적용된다.

## 클론, remote URL 설정

이제 git clone할 때도 회사 프로필의 호스트를 사용하도록 한다. 기존의 git clone이라면 다음과 같이 했을 것이다. (`organization`, `repo` 명칭은 프로젝트에 따라 다름)

```bash
git clone git@github.com:organization/repo.git
```

여기서 호스트 github.com을 아까 설정한 회사 프로필의 별명으로 바꾼다. 예를 들어 `github-company`로 했다면 이렇게. 나는 아예 기존 회사 레포지토리 폴더들을 전부 삭제 후 다음과 같은 커맨드로 다시 클론했다.

```bash
git clone git@github-company:organization/repo.git
```

기존에 remote origin이 설정되어 있었다면 다음과 같이 수정 가능

```bash
git remote set-url origin git@github-company:organization/repo.git
```

해당 git 레포지토리에서 `git config user.email`으로 설정된 사용자 이메일을 확인할 수 있다. `git remote -v`로 원격 저장소 URL도 확인해보자.

커밋 후 `git log -1`로, 회사 이메일로 잘 커밋되었는지도 확인 가능하다.
