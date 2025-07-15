# Witch's Archive

개인 학습 내용과 기술 스크랩을 아카이빙하는 정적 사이트입니다. [Eleventy (11ty)](https://www.11ty.dev/)를 사용하여 구축되었습니다.

## 📚 아카이브 구성

- **Study**: 학습 노트 및 문서
- **Scrap**: 기술 관련 스크랩 및 메모
- **Books**: 도서 리뷰 및 요약

## 🛠️ 기술 스택

- **Static Site Generator**: Eleventy (11ty)
- **Package Manager**: pnpm

## 🚀 개발 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- pnpm

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 시작되면 `http://localhost:8080`에서 사이트를 확인할 수 있습니다. 파일 변경 시 자동으로 새로고침됩니다.

### 빌드

```bash
pnpm build
```

정적 파일이 `_site` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
archive/
├── _data/              # 전역 데이터
├── _includes/          # 템플릿 포함 파일
├── _layouts/           # 레이아웃 템플릿
├── _site/              # 빌드 출력 디렉토리
├── assets/             # 정적 자산 (이미지, 아이콘)
├── data/               # 콘텐츠 데이터
│   ├── books/          # 도서 관련 콘텐츠
│   ├── scrap/          # 스크랩 콘텐츠
│   └── study/          # 학습 노트
├── styles/             # CSS 스타일
└── eleventy.config.js  # 11ty 설정
```

## 📝 콘텐츠 추가

새로운 콘텐츠를 추가하려면 해당 카테고리 디렉토리에 마크다운 파일을 생성하세요:

- 학습 노트: `data/study/` 디렉토리
- 스크랩: `data/scrap/` 디렉토리
- 도서: `data/books/` 디렉토리

각 마크다운 파일은 front matter에 `title`을 포함해야 합니다:

```markdown
---
title: 문서 제목
---

콘텐츠 내용...
```

## 🎨 커스터마이징

- 스타일 수정: `styles/` 디렉토리의 CSS 파일
- 레이아웃 수정: `_layouts/` 디렉토리의 HTML 템플릿
- 설정 수정: `eleventy.config.js` 파일

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.
