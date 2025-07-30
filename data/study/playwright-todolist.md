---
title: todolist를 만들면서 playwright를 배워보자
description: E2E 테스트 툴인 playwright를 만져보는 이야기
---

E2E 테스트를 제안해준 분이 계셔서, 늘 테스트를 해보고 싶었는데 이 기회에 한번 해본다. playwright가 요즘 e2e의 1황이라고 해서 사용해본다.

이런 걸 할 때 가장 만만한 건 역시 투두리스트다. 간단한 할 일 관리 어플리케이션을 만들어 보자. 클로드, 커서와 함께라면 뭐든지 할 수 있다. DB를 띄우기는 귀찮으니까 supabase를 사용할 것이다. 그리고 클라이언트와 supabase가 바로 통신할 수 있게도 할 수 있지만 그러면 서버가 있는 구조에서 테스트를 하는 느낌이 안 살 거 같아서 express로 간단한 서버를 만들기로 했다.

나는 js가 익숙한 프론트이기 때문에 기술 스택은 전부 js 기반이다. 그리고 이게 제대로 각잡고 진행하는 개발 프로젝트라면 Prisma의 편의성과 Nest.js의 강력하고 체계적인 구조를 잡으려고 하겠지만 이건 테스트 공부를 위해 후다닥 만드는 프로젝트이므로 supabase API와 express로 간단히 만들자.

## 백엔드 구성

간단한 회원 제도가 있는 todolist를 만든다. `todo-server-express`에 만들자.

```bash
npm init -y
pnpm express @supabase/supabase-js cors dotenv bcrypt jsonwebtoken
pnpm add -D -D typescript @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/node tsx
# tsc 설정
npx tsc --init
```

`src/index.ts`를 만들고 다음과 같은 내용을 만들어 실행해본다. [tsx](https://tsx.is/)를 이용해서 실행 가능하다. `tsx src/index.ts`를 쓰면 되고 `tsx watch`로 옵션을 주면 개발 모드 실행도 쉽다.

```ts
// ... import...

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello me!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

supabase에서는 프로젝트를 만들고 테이블 만든다. claude가 생성해 준 sql을 그대로 넣는다.

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- todos 테이블 생성 (Prisma Todo 모델과 동일)
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_users_username ON users(username);

-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 개발용 정책 (모든 접근 허용)
-- 실제 프로덕션에서는 더 세밀한 권한 설정 필요
CREATE POLICY "Enable all access for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all access for todos" ON todos FOR ALL USING (true);

-- updated_at 자동 업데이트를 위한 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 자동 업데이트 트리거 생성
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

이제 express로 간단한 서버를 순식간에 작성하고 프론트도 작성후 실행했다. cursor가 큰일했다. 자잘한 버그들이 있었지만 안 다뤄본 기술 스택도 아니어서 금방 해결할 수 있었다. supabase 연결이 유일하게 안 해본 부분이라 가장 걱정이었는데 그건 cursor가 잘 끝내줬다.

구체적인 코드는 내가 토이 프로젝트들을 모아 놓는 모노레포의 todo-client와 todo-server-express 폴더에서 볼 수 있다. https://github.com/witch-factory/toy-project-monorepo/tree/main/apps

원래 todo-server는 prisma와 nestjs로 해보던 부분이고 모노레포를 통한 타입 공유를 실험하던, 여러가지를 공부한 흔적이 있는 곳이라 놔두고 `todo-server-express`를 새로 생성한 것이다.

아무튼 이제 e2e 테스트를 해본다.

## 테스트 환경

https://playwright.dev/docs/intro

```bash
# 테스트 환경을 구성할 폴더, 나 같은 경우 apps/e2e-test에 진행
pnpm create playwright
```

실행 시 터미널에 질문들이 뜨고 답변하면 된다. 나는 모노레포의 `apps/e2e-test` 폴더에 ts로 테스트를 구성하도록 했고 깃헙 액션 ci는 나는 로컬에서만 해보는 용도이므로 안 하고, 브라우저 설치는 기본으로 진행.

그러면 예시 테스트도 생기고, `pnpm exec playwright test`로 예시 테스트를 실행시켜볼 수 있다. package.json에 다음과 같은 스크립트도 설정

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "e2e": "npm run test:e2e",
    "ui": "npm run test:e2e:ui",
    "headed": "npm run test:e2e:headed",
    "report": "playwright show-report",
    "record": "playwright codegen http://localhost:5173"
  }
}
```

`record` 스크립트에 들어 있는 codegen 기능을 이용하면 딸깍딸깍하는 걸 자동으로 테스트로 만들어 줌.

https://playwright.dev/docs/codegen-intro
