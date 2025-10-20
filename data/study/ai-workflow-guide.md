---
title: AI를 활용한 개발 팁
description: Claude Code, ChatGPT 등 AI 도구를 실전 개발에 효과적으로 활용하는 방법
---

## 들어가며

개발에 AI를 다들 많이 사용하고 있고 회사에서도 Claude Code를 도입 검토 중이라고 하여 이것저것 써본다.

Claude Code뿐 아니라 Codex, GLM 등 다른 코딩 보조 도구도 많지만 Claude Code 기준으로 설명한다. 2025년 10월 기준으로 Claude code sonnet 4.5는 성능이 가장 좋은 모델 중 하나다.

Claude Code는 npm, brew 등 여러 경로로 설치 가능하다. 설치는 [Claude Code 공식 문서](https://www.claude.com/product/claude-code) 참고.

npm으로 설치하는 게 권장되는데 npm이 안 깔려 있다면 brew로 node, npm을 설치할 수 있다.(macOS 기준)

그리고 터미널에서 claude code를 실행하고 싶은 경로로 이동해 `claude`를 치면 실행된다.

## allow edit, plan mode

Claude Code에는 `claude`를 치면 바로 실행되는 일반 모드 외에도 편집 허용 모드, 플랜모드가 있다. 터미널 상에서 일반모드 - 편집 허용 모드 - 플랜 모드의 전환 단축키는 `Shift + Tab`이다.

plan mode의 경우 코드베이스 분석과 개발 계획에 집중하는 모드이다. 파일 편집, 명령어 실행 등이 허용되지 않는다. 즉 코드를 편집하지 않고 어떻게 편집할지 계획을 세운 후 사용자가 edit을 허락하면 그때 편집을 시작한다. plan mode에서도 기존 코드의 파악을 진행한 후 계획을 세우기 때문에 plan만 세우도록 하고 직접 작업해도 도움이 많이 된다. 또는 스펙 문서를 작성하도록 시킨 후("A 기능의 개발 계획을 spec.md로 작성해줘") 필요하다면 수정 후 해당 파일의 내용에 따라서 수정할 수도 있다.

그리고 Git을 통해 변경사항을 추적할 수 있다는 걸 이용할 수 있다. 결과물을 검사하고 claude code의 결과물이 마음에 들지 않으면 바로 전부 git reset으로 날린 후 다시 작업시키는 방식으로 반복을 돌려도 좋다.

https://insight.infograb.net/blog/2025/06/25/claude-code-plan-mode/

## SuperClaude

SuperClaude는 claude code가 좀더 개발을 잘 도와줄 수 있게 도와주는 프레임워크이다. 추가적인 명령어 (`/sc:command` 형식), 유용한 MCP, `@agent-frontend`와 같은 키워드로 호출할 수 있는, 특정 기능에 특화된 컨텍스트를 가진 에이전트 등을 제공한다.

https://superclaude.netlify.app/docs/Getting-Started/quick-start

설치 시 어떤 MCP를 설치할지, superclaude 명령어도 설치할지 등의 선택창이 뜨는데 all을 선택해 전부 설치해도 좋다.

토큰을 아껴주는 serena, 최신 문서를 읽어와 컨텍스트로 제공하는 Context7, 브라우저 조작을 제공하는 chrome-devtools 등의 MCP가 딸려온다.

### 커맨드

아이디어를 제시하고 생각해 주는 `/sc:brainstorm`, 기존 프로젝트를 분석하는 `/sc:analyze`, 특정 기능을 구현하는 `/sc:implement` 등의 커맨드를 사용 가능하다.

커맨드에 따라 조정할 수 있는 특정 플래그가 있는 경우도 많다. 예를 들어 `/sc:analyze`의 경우 성능에 중점을 두고 분석하는 `--performance`, 코드 품질에 중점을 두고 분석하는 `--quality`등을 붙일 수 있다.

전체 커맨드 목록은 [SuperClaude Full Command Reference](https://superclaude.netlify.app/docs/User-Guide/commands#full-command-reference)에서 볼 수 있다.

### 에이전트

에이전트는 md 파일을 통해 Claude Code를 설정한 결과물이다. 도메인별 전문 지식, 패턴, 문제 접근 방식 등을 포함한다. 예를 들어 프론트엔드 아키텍트 에이전트의 경우 접근성, 페이지 성능, 반응형 디자인, 각 프레임워크 모범 사례 등을 참고하도록 설정되어 있다.

특정 키워드를 커맨드에 입력 시 자동으로 해당 에이전트가 실행된다. 또는 `@agent-security` 처럼 명시적으로 호출할 수도 있다. 전체 제공하는 에이전트와 각 에이전트가 어떤 키워드를 통해 호출되는지에 대한 목록은 여기서 볼 수 있다.

https://superclaude.netlify.app/docs/User-Guide/agents#quick-reference-

참고로 다른 에이전트들도 많다. claude에서 `/agents` 커맨드를 통해서 볼 수 있다. 또한 직접 마크다운을 통해 에이전트를 작성할 수도 있는데 이런 에이전트 작성법과 고급 사용법은 [서브에이전트](https://docs.claude.com/ko/docs/claude-code/sub-agents)문서 참고.

### Flag

`/sc:`로 시작하는 superclaude 커맨드에 `--think`, `--think-hard`, `--ultrathink` 플래그를 통해 사고 깊이 정도를 설정할 수 있다. 생각의 깊이가 깊어질수록 시간, 토큰 소모도 훨씬 늘어난다.

## opcode

claude code를 GUI를 통해 사용할 수 있게 해주는 도구. 원래 Claudia라는 이름이었는데 저작권 문제로 이름이 바뀌었다.

https://github.com/winfunc/opcode

https://opcode.sh/

기존 세션들을 GUI로 정리해서(기존의 `claude -r`과 비슷) 보고 웹의 Claude, GPT와 비슷한 UI로 Claude Code와 대화를 나눌 수 있는 기능 등을 제공한다.

이때 채팅을 GUI로 이용하는 기능이 제대로 동작하지 않을 수 있는데 이 경우 claude, node 경로가 `~/.zshrc` 등에 제대로 설정되어 있는지 확인해보자. `which` 명령어를 통해 경로를 확인하고 `~/.zshrc`(혹은 다른 쉘 설정 파일)에 `export PATH="/opt/homebrew/bin:$PATH"` 처럼 추가할 수 있다.

opcode가 tauri(node를 이용해 크로스플랫폼 앱을 제작하는 프레임워크)를 통해 동작하기 때문에 node, npm 경로도 제대로 설정되어 있어야 한다.

MCP 서버도 쉽게 추가할 수 있다.

### opcode로 MCP 연결하기

[상단바의 점 3개를 누르면 메뉴에서 MCP Server를 추가할 수 있다.](https://opcode.sh/docs/usage/working-with-mcp-servers)

밑에서 설명하겠지만 mcp는 `claude mcp add~`처럼 커맨드라인을 통해 설치할 수도 있다. 그런데 커맨드라인을 통해 설치한 것과 동기화를 할 수는 있지만 상당히 귀찮기 때문에 둘 중 하나만 쓰는 게 낫다.

Server Name, command, arg 입력으로 쉽게 추가 가능. 예를 들어 gemini mcp라면 다음과 같이 할 수 있다.

```bash
server name: gemini-cli-mcp
command: npx
argument: -y gemini-mcp-tool
```

Figma는 sse로 claude code mcp를 지원하기 때문에 sse로 추가하면 좋다

https://help.figma.com/hc/ko/articles/32132100833559-Dev-Mode-MCP-%EC%84%9C%EB%B2%84-%EC%95%88%EB%82%B4%EC%84%9C

## 유용한 MCP

Figma server mode MCP https://help.figma.com/hc/ko/articles/32132100833559-Dev-Mode-MCP-%EC%84%9C%EB%B2%84-%EC%95%88%EB%82%B4%EC%84%9C

피그마 링크를 붙여넣으면 자동으로 해당 컴포넌트를 퍼블리싱해 준다. [Dev Mode MCP 서버 안내서](https://help.figma.com/hc/ko/articles/32132100833559-Dev-Mode-MCP-%EC%84%9C%EB%B2%84-%EC%95%88%EB%82%B4%EC%84%9C)에서 여러 사용법을 볼 수 있다.

Figma MCP getting started https://github.com/GLips/Figma-Context-MCP?tab=readme-ov-file#getting-started

Gemini MCP tool: Claude code에게 "Gemini랑 논의해서 ~~한 작업을 진행해줘" 같은 식으로 둘이 논의하게 해서 더 나은 결과물을 내도록 유도할 수 있다.

https://github.com/jamubc/gemini-mcp-tool

Task master AI

주어진 작업을 쪼개서 프로젝트의 Todolist로 만들어 준다. 물론 plan mode, superclaude의 `/sc:workflow` 등으로 대체할 수도 있다.

https://www.task-master.dev/

그 외에도 supabase, cloudflare 같은 수많은 벤더들이 MCP를 제공한다.

[Awesome MCP Servers](https://mcpservers.org/), [smithery](https://smithery.ai/servers) 등에서 찾아볼 수 있다.

## 기타 Claude 설정

프로젝트 루트에서 `/init`으로 CLAUDE.md 기본 생성 가능

### MCP 설치

MCP는 AI가 외부 애플리케이션에 접근해서 제어할 수 있게 해주는 표준 프로토콜이다. MCP 서버를 제공하는 앱의 경우, 해당 서버에 연결해서 외부 앱을 AI가 제어할 수 있다. 다음과 같은 커맨드로 설치 가능하다.

```bash
claude mcp add --transport {전송 타입(http | sse)} 서버명 서버주소
# 예시
claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp
claude mcp add --transport sse monday https://mcp.monday.com/sse
```

[단 sse 전송은 더 이상 사용되지 않기 때문에 http 서버를 사용하는 것을 공식 문서에서는 권장하고 있다.](https://docs.claude.com/ko/docs/claude-code/mcp#%EC%98%B5%EC%85%98-2%3A-%EC%9B%90%EA%B2%A9-sse-%EC%84%9C%EB%B2%84-%EC%B6%94%EA%B0%80)

MCP 설치 시 `--scope` 플래그로 스코프를 지정할 수 있다.

- `--scope local`(기본값): 현재 프로젝트에 설치되고 개인 설정에 저장된다.
- `--scope project`: 프로젝트 루트의 `.mcp.json` 설정 파일에 저장되고 해당 프로젝트에서 작업하는 모든 사람이 해당 MCP 설정을 사용하게 된다.
- `--scope user`: 개인이 작업하는 모든 프로젝트에서 해당 MCP에 접근할 수 있게 한다. 전역에 설치하는 거라고 보면 된다.

[이때 MCP 설정은 여러 군데에 분산되어 있을 수 있다.](https://claudelog.com/configuration/#mcp-configuration)

- 프로젝트에서 공유되는 mcp 설정: 프로젝트 루트의 `.mcp.json`
- 프로젝트에서 개인이 사용하는 mcp 설정: `프로젝트 경로/.claude/settings.local.json`에 있는 프로젝트 설정 파일에 포함
- 사용자의 전역 mcp 설정: `~/.claude/settings.json` 혹은 `~/.claude.json`에 있는 전역 설정 파일에 포함

mcp 관련 명령어들

```bash
# 설치된 MCP 서버 목록 + 연결 상태
claude mcp list
# 특정 MCP 서버의 상세 정보
claude mcp get [서버명]
# MCP 서버 제거
claude mcp remove [서버명]
# (클로드 코드 쉘 내에서) 설치된 MCP 서버 목록 + 연결 상태
/mcp
```

설치와 활용에 대한 더 많은 정보는 [Connect Claude Code to tools via MCP](https://docs.claude.com/en/docs/claude-code/mcp)에서 얻을 수 있다.

### output styles

claude에서 `/output-style` 커맨드를 입력 시 출력 스타일을 선택할 수 있다. 작업 완료에 필요한 인사이트를 제공하는 `explanatory` 모드와 클로드와 협업하고 클로드가 일종의 PM 역할을 해주는 `learning` 모드가 있다. `~/.claude/output-styles`에 있는 마크다운 파일을 통해 직접 출력 스타일을 커스텀할 수도 있다.

CLAUDE.md 같은 것과 달리 클로드의 기본 시스템 프롬프트(소프트웨어 작업을 빨리 끝낼 수 있게 설계됨)를 완전히 바꾼다고 한다.

https://docs.claude.com/en/docs/claude-code/output-styles

## 추가 자료

구글에서 직접 AI Agent를 개발할 수 있는 툴을 내놓았다. [Agent Development Kit](https://google.github.io/adk-docs/)을 이용하면 Gemini Code Review 같은 툴을 직접 만들 수 있다.

## 참고

https://www.anthropic.com/engineering/claude-code-best-practices

Claude Code: Best practices for agentic coding

https://www.anthropic.com/engineering/claude-code-best-practices

What is the Model Context Protocol (MCP)?

https://modelcontextprotocol.io/docs/getting-started/intro

Claude Code - Where is my MCP configuration stored

https://www.reddit.com/r/ClaudeAI/comments/1lm7fbc/claude_code_where_is_my_mcp_configuration_stored/

Claude Code 설정

https://docs.claude.com/ko/docs/claude-code/settings
