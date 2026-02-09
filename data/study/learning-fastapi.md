---
title: FastAPI 빠르게 배우기
description: 공식 문서와 클로드의 힘을 빌려가며 fastapi를 빠르게 배워보자.
---

## 시작

FastAPI는 Python으로 작성된 현대적인 웹 프레임워크로, 개발 속도와 빠른 성능(Python치고 그렇다는 거 같다)을 제공한다고 한다.

먼저 환경 세팅

```bash
# pyenv 설치 (mac 기준)
brew install pyenv

# Python 설치
pyenv install 3.11
pyenv global 3.11

# 프로젝트 폴더로 이동 후
# 가상환경 생성
python -m venv venv

# 활성화 (mac/linux)
source venv/bin/activate

# 필요한 패키지 설치
pip install fastapi uvicorn
```

그리고 이런 코드를 써보자. nestjs랑 비슷하다고 보인다. `/` 경로에 GET 요청이 오면 `hello` 함수가 실행되고 응답을 반환하는 식.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello World"}
```

서버를 핫 리로드로 띄워보자

```bash
uvicorn main:app --reload
```

`서버경로/docs`로 가면 자동으로 생성된 API 문서를 볼 수 있다.

## 경로 매개변수와 쿼리 매개변수

- 경로 매개변수

경로 매개변수는 URL 경로의 일부로 전달되는 값을 의미한다. 예를 들어, `/items/{item_id}` 경로에서 `item_id`는 경로 매개변수이다. 다음은 경로 매개변수를 사용하는 예제이다.

`user_id: int` 명시하면 문자열 경로 넣을 시 정수가 들어와야 한다고 에러 뜸.

````python
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
    ```
````

- 쿼리 매개변수

쿼리 매개변수는 URL의 쿼리 문자열 부분에 전달되는 값을 의미한다. 예를 들어, `/items/?skip=0&limit=10` 경로에서 `skip`과 `limit`은 쿼리 매개변수이다. 다음은 쿼리 매개변수를 사용하는 예제이다.

```python
@app.get("/items")
def get_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

쿼리 매개변수의 기본값을 지정하면 해당 매개변수가 제공되지 않을 때 기본값이 사용된다. 만약 지정하지 않으면 필수 쿼리가 되어서, 해당 매개변수를 반드시 제공해야 한다. 그렇지 않으면 에러(422 Unprocessable Entity)가 발생한다.
