---
title: AI를 활용한 개발 팁
description: Claude Code, ChatGPT 등 AI 도구를 실전 개발에 효과적으로 활용하는 방법
---

## 들어가며

개발에 AI를 다들 많이 사용하고 있고 회사에서도 Claude Code를 도입 검토 중이라고 하여 이것저것 써본 걸 공유합니다.

Claude Code뿐 아니라 Codex, GLM 등 다른 코딩 보조 도구도 많지만 Claude Code 기준으로 설명. 2025년 10월 기준으로 Claude code sonnet 4.5는 가장 좋은 모델 중 하나다.

Claude Code는 npm, brew 등 여러 경로로 설치 가능하다.

## allow edit, plan mode

Claude Code에는 `claude`를 치면 바로 실행되는 일반 모드 외에도 편집 허용 모드, 플랜모드가 있다. plan mode의 경우 코드를 편집하지 않고 어떻게 편집할지 계획을 세운 후 사용자가 edit을 허락하면 그때 편집을 시작한다.

plan mode에서도 기존 코드의 파악을 진행한 후 계획을 세우기 때문에 plan만 세우도록 하고 직접 작업해도 도움이 많이 돰. 그리고 Git을 통해 변경사항을 검사하고 claude code의 결과물이 마음에 들지 않으면 바로 전부 git reset으로 날린 후 다시 작업시키는 방식으로 반복을 돌려도 좋다. 터미널 상에서 전환 단축키는 `Shift + Tab`

https://insight.infograb.net/blog/2025/06/25/claude-code-plan-mode/

## SuperClaude

SuperClaude는 claude code가 좀더 개발을 잘 도와줄 수 있게 도와주는 프레임워크. 추가적인 명령어 (`/sc:command` 형식), 유용한 MCP, `@agent-frontend`와 같은 키워드로 호출할 수 있는, 특정 기능에 특화된 컨텍스트를 가진 에이전트 등을 제공.

https://superclaude.netlify.app/docs/Getting-Started/quick-start

설치 시 어떤 MCP를 설치할지, superclaude 명령어도 설치할지 등의 선택창이 뜨는데 all을 선택해 전부 설치해도 좋다.

토큰을 아껴주는 serena, 최신 문서를 읽어와 컨텍스트로 제공하는 Context7, 브라우저 조작을 제공하는 chrome-devtools 등의 MCP가 딸려온다.

아이디어를 제시하고 생각해 주는 `/sc:brainstorm`, 기존 프로젝트를 분석하는 `/sc:analyze`, 특정 기능을 구현하는 `/sc:implement` 등의 커맨드를 사용 가능.

제공하는 에이전트 목록은 여기서 볼 수 있다. 특정 키워드를 커맨드에 입력 시 자동으로 해당 에이전트가 실행됨. https://superclaude.netlify.app/docs/User-Guide/agents#quick-reference-

## opcode

claude code를 GUI를 통해 사용할 수 있게 해주는 도구. 원래 Claudia라는 이름이었는데 저작권 문제로 이름이 바뀌었다.

https://github.com/winfunc/opcode

https://opcode.sh/

기존 세션들을 GUI로 정리해서(기존의 `claude -r`과 비슷) 보고 웹의 Claude, GPT와 비슷한 UI로 Claude Code와 대화를 나눌 수 있는 기능 등을 제공한다.

MCP 서버도 쉽게 추가할 수 있다.

이때 세션을 GUI로 이용하는 기능이 제대로 동작하지 않을 수 있는데 이 경우 claude, node 경로가 `~/.zshrc` 등에 제대로 설정되어 있는지 확인해보자. `which` 를 통해 경로를 확인하고 `export PATH="/opt/homebrew/bin:$PATH"` 처럼 추가할 수 있다.

opcode가 tauri(node를 이용해 크로스플랫폼 앱을 제작)를 통해 동작하기 때문에 node, npm 경로도 제대로 설정되어 있어야 한다.

### opcode로 쉽게 MCP 연결하기

https://opcode.sh/docs/usage/working-with-mcp-servers

상단바의 점 3개를 누르면 메뉴에서 MCP Server를 추가할 수 있다.

Server Name, command, arg 입력으로 쉽게 추가 가능. 예를 들어 gemini mcp라면

server name: gemini-cli-mcp
command: npx
argument: -y gemini-mcp-tool

혹은 sse로 추가 가능.

Figma는 sse로 claude code mcp를 지원하기 때문에 sse로 추가하면 좋다

https://help.figma.com/hc/ko/articles/32132100833559-Dev-Mode-MCP-%EC%84%9C%EB%B2%84-%EC%95%88%EB%82%B4%EC%84%9C

물론 `claude mcp add~`처럼 커맨드로 할 수도 있다.

## 유용한 MCP

Figma server mode MCP https://help.figma.com/hc/ko/articles/32132100833559-Dev-Mode-MCP-%EC%84%9C%EB%B2%84-%EC%95%88%EB%82%B4%EC%84%9C

피그마 링크를 붙여넣으면 자동으로 해당 컴포넌트를 퍼블리싱해 준다. Figma MCP getting started https://github.com/GLips/Figma-Context-MCP?tab=readme-ov-file#getting-started

Gemini MCP tool: Claude code에게 "Gemini랑 논의해서 ~~한 작업을 진행해줘" 같은 식으로 둘이 논의하게 해서 더 나은 결과물을 내도록 유도할 수 있다.

https://github.com/jamubc/gemini-mcp-tool

Task master AI

주어진 작업을 쪼개서 프로젝트의 Todolist로 만들어 준다.

https://www.task-master.dev/
