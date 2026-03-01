---
title: Do it! Go 완전 정복
description: 늘 배워보고 싶었던 Go 언어를 완전 정복한다는 책을 읽어보았다.
---

> 코드는 예술이다. 여러분의 작품으로 세상에 영감을 불어넣어라.
>
> Do it! Go 완전 정복, 머리말

## 1장. Go 시작하기

Go는 컴파일을 해야 하는 정적 언어다. 컴파일 시간 단축을 목적으로 문법 구조부터 다른 언어와 다르게 설계되어서 컴파일도 빠르다. 이를 위해 Go는 객체지향 프로그래밍의 많은 기능을 포기했다. 그만큼 단순하며 예약어도 25개뿐이다.

- Go는 상속 대신 조합과 인터페이스를 사용한다. 클래스도 없고 대신 구조체를 비슷하게 사용
- Go는 클래스가 없기에 메서드는 특정 타입에 연결된 함수 형태이다.
- Go에는 예외 처리(try-catch)가 없고 대신 panic, recover 등 go만의 방식을 사용한다. 에러 발생시 패닉이 발생하며 이를 defer하거나 복구한다.
- Go는 고루틴을 통해 동시성을 간단하게 구현한다.

Go는 도커, 쿠버네티스, 코크로치 DB, TS컴파일러(TS진영에선 이것의 go 포팅이 상당히 말이 많았다) 등 대형 프로젝트에서 사용되고 있다. 한때 프론트에서도 esbuild처럼 여러 프로젝트를 Go로 재작성하는 게 한창 유행이었다. 언어만 바꿨는데 속도가 올라간다구요. 구글에서도 내부적으로 Go를 많이 사용한다고 한다.

[Go 공식 홈페이지](https://go.dev/dl/)에서 go를 설치할 수 있다.

```bash
go version # Go 버전 확인
```

나는 vscode의 go 익스텐션도 설치했다.

Go로 작성된 hello world

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

이렇게 하고 빌드하면 실행 파일을 생성할 수 있다. C언어를 배우던 시절이 오랜만에 떠오른다.

```bash
go build 파일명
./파일명 # 실행
```

Go에서 제공하는 명령어들. 앞에서 go version이랑 go build를 사용했는데, 그 외에도 유용한 명령어들이 많다.

- `go get <패키지명>`: 현재 프로젝트에 패키지 설치하고 의존성 관리(`npm install --save` 같은 느낌)
- `go install <패키지명>`: 패키지 컴파일 후 실행 파일을 지정한 경로에 설치(`npm install -g` 같은 느낌)
- `go mod`: 의존성 관리 작업들. `npm init` 같은 `go mod init`으로 모듈 초기화, `npm prune`같은 `go mod tidy`로 의존성 정리 등
- `go list`: 현재 프로젝트의 패키지 목록과 의존성 트리 확인
- `go run <파일명>`: 소스파일이나 패키지를 바로 실행
- `go fmt`: 코드 포맷팅. `prettier` 같은 느낌
- `go test`: 테스트 실행. `jest`, `vitest` 같은 느낌
- `go doc <패키지명>`: 패키지 문서 보기. `npm docs` 같은 느낌
- `go clean`: 빌드 캐시와 임시 파일 정리
- `go vet`: 코드 검사. `eslint` 같은 느낌

## 2장. Go 프로그래밍 준비하기

패키지는 go 코드의 기본 단위다. 프로그램은 패키지 단위로 개발하며 모든 코드 파일의 첫 줄에는 이 코드가 어떤 패키지에 속하는지를 명시해야 한다. 또 같은 디렉토리에 있으면 같은 패키지에 속해야 한다(안 그러면 `package` 선언에서 에러 발생)

이때 `main` 패키지는 특별 취급으로 `package main`으로 선언된 패키지는 프로그램의 진입점인 `main` 함수를 포함해야 한다. 따라서 `main` 패키지는 독립적으로 실행 가능한 프로그램을 만들 때 사용한다.

- 모듈: 하나 이상의 패키지를 포함하는 단위. JS의 npm 패키지 같은 느낌. `go mod init <모듈명>`으로 모듈 초기화
  `npm init` 처럼 `go mod init`으로 모듈 초기화하면 `go.mod` 파일이 생성된다. 모듈 이름이랑 의존성을 담는다. `package.json` 같은 느낌
  go.mod로 의존성 정의, go.sum으로 의존성 패키지 체크섬 관리

외부 패키지 내려받으려면 `go get <패키지명>`

혹은 소스 파일에서 먼저 import 한 다음 `go mod tidy`를 사용하면 사용하지 않는 패키지는 `go.mod`에서 제거되고 필요한 패키지는 자동으로 설치된다. 이런 외부 패키지는 모듈 캐시에 저장되고 `go env GOMODCACHE`로 지정된 디렉토리에 설치된다. 캐시 정리는 `go clean -modcache`로 할 수 있다.

### 환경 변수 GOROOT, GOPATH

GOROOT 환경 변수는 `which go`로 go 실행 파일 위치 확인. 그러면 `/usr/local/go/bin/go` 같은 경로가 나오는데, 이때 `GOROOT`는 `/usr/local/go`가 된다. Go 설치 디렉토리를 가리킨다. 이걸 `.bash_profile` 같은 쉘 설정 파일에 추가하면 된다.

```bash
vi ~/.zshrc # export GOROOT=/usr/local/go 추가 후 저장
source ~/.zshrc # 변경 사항 적용
```

go 1.16까지는 GOPATH 라는 환경 변수로 프로젝트와 의존성을 관리했다. go 프로젝트를 수행할 작업 공간(workspace) 경로를 지정하는 환경 변수다. GOPATH는 기본적으로 `~/go`로 설정되어 있다. 아무튼 원하는 워크스페이스 경로를 위와 같은 방식으로 쉘 설정에 GOPATH 환경 변수로 추가하면 된다.

### 외부 패키지 사용하기

폴더 만들고 모듈로 만들기

```bash
mkdir myproject
cd myproject
go mod init myproject
# 깃헙에서 패키지 다운로드. 모듈 캐시에 저장됨
go get github.com/fatih/color
```

다음과 같이 import 해서 사용할 수 있다. 이때 import된 패키지들은 큰따옴표로 묶어서 작성하고 쉼표로 구분하지 않는다.

```go
package main

import (
	"fmt"

	"github.com/fatih/color"
)

func main() {
	fmt.Printf("%v %v\n", color.RedString("Hello"), color.GreenString("World"))
}
```

`go run hello.go`로 실행하면 빨간색과 초록색으로 Hello World가 출력된다.

- `go run`과 `go build`의 차이: `go build`는 소스를 컴파일해서 실행 파일을 생성하는 반면, `go run`은 소스 파일을 컴파일한 후 바로 실행하며 실행 파일이 남지 않는다. go run은 개발 중 빠르게 테스트할 때 유용하게 쓰며 `go build`는 최종 배포 시 많이 사용한다.

## 3장. 변수와 상수

go의 주석은 JS랑 똑같다. `//`로 한 줄 주석, `/* */`로 여러 줄 주석을 작성할 수 있다.

변수 선언은 다음과 같은 형태로 할 수 있다.

```go
var 변수명 타입
var age int = 30 // 예시. 근데 이런 식으로 초기값을 대입하면 타입은 생략 가능
var name = "Alice" // 타입 생략. 컴파일러가 초기값으로부터 타입 추론
```

walrus 연산자 `:=`를 사용하면 변수 선언과 초기화를 동시에 할 수 있다. 이때 타입은 생략해야 하며 컴파일러의 타입 추론을 위해 초기값을 반드시 제공해야 한다. 반드시 함수 내부에서만 사용할 수 있다.

```go
// 변수명 := 초기값
total := 1
```

python 스타일로 여러 변수 한 번에 선언할 수도 있다. 혹은 var 이후에 `()`로 묶어서 여러 변수를 한 번에 선언할 수도 있다.

```go
var a,b,c=1,2,3
a, b, c := 1, 2, 3 // walrus 연산자도 여러 변수에 동시에 사용할 수 있다.
// 괄호로 묶어서 한 번에 선언하기
var (name="Kim Sunghyun"
  age=30)

fmt.Printf("My name is %s and I'm %d years old.\n", name, age)
```

변수명 규칙은 다른 언어와 다 비슷하다. 예약어 못 쓰고, 공백이나 특수문자 안되고, 문자나 밑줄로만 시작할 수 있고 등등.

### 변수의 자료형

변수 선언 시 초기값을 지정하면 컴파일러가 자동으로 추론하지만, 초기값이 없는 경우에는 명시적으로 자료형을 지정해야 한다.

```go
// var 변수명 자료형 같은 형식
var age int32
var pi float64
```

### 변수 스코프

지역 변수는 `{}`로 묶인 블록 내부에서 선언된 변수로, 해당 블록 내에서만 접근할 수 있다. 이렇게 `{}`로 묶인 블록은 스코프를 만드는데, 함수, 조건문, 반복문 등에서 사용할 수 있다. 참고로 이런 중괄호는 함수 선언이나 제어문에서만 쓸 수 있는 게 아니라 그냥도 쓸 수 있다.

```go
func main(){
	{
		a:= 10
		fmt.Printf("a: %d\n", a)
	}
	fmt.Printf("a: %d\n", a) // 에러. a는 중괄호로 묶인 블록 내부에서 선언된 지역 변수이므로 블록 외부에서는 접근할 수 없다.
}
```

전역 변수는 어떤 스코프에도 속하지 않으면서 패키지 수준에서 선언된 변수로 패키지 내 모든 곳에서 접근 가능하다. 그냥 제일 바깥에서 선언하면 됨.

C언어랑 비슷하게 전역 변수는 데이터 영역, 지역 변수와 매개변수 같은 건 스택 영역에 저장된다. 또한 지역 변수 스코프의 같은 이름의 변수가 전역 변수를 shadowing할 수 있는 것도 똑같음.

### 출력 함수

출력시 `%s` 같은 서식 지정자를 사용할 수 있다. 서식 지정자는 c에서처럼 값의 출력 형태를 지정한다.

```go
fmt.Printf("안녕하세요, %s\n", "Go 언어")
```

- `%s`: 문자열
- `%d`: 10진수 정수
- `%f`: 부동 소수점 숫자. 기본적으로 소수점 이하 6자리까지 출력
- `%v`: 기본 형식으로 값 출력. 어떤 타입이든 사용할 수 있다.
- `%t`: true 또는 false로 boolean 값 출력
- `%c`: 단일 문자 출력. C언어의 char 같은 느낌
- `%p`: 포인터 주소 출력

이런 서식 지정자를 쓸 수 있는 출력 함수랑 아닌 게 나뉘어 있는데, `fmt.Printf`는 서식 지정자를 사용할 수 있지만 `fmt.Println`은 서식 지정자를 지원하지 않는다. 또한 `fmt.Println`은 자동으로 줄바꿈 추가.

### 상수

JS에서처럼 go에서도 `const`로 상수 선언할 수 있다. Go의 상수는 반드시 초깃값을 지정해야 한다.

```go
func main(){
	const PI = 3.14

	fmt.Printf("PI: %v\n", PI)
}
```

앞서서처럼 여러 개 한번에 선언도 똑같이 가능

```go
const a,b,c = 1,2,3
```

## 4장. 자료형과 포인터

go에서 지원하는 기본 자료형

- bool
- 숫자(int뿐 아니라 int8, int16, int32, int64 등 다양한 크기의 정수 타입과 float32, float64 등 부동 소수점 타입)
  이외에도 byte, 유니코드를 저장하는 용도인 rune, 복소수를 나타내는 complex64, complex128 등이 있다.
- string

signed int에서 비트로 음수를 표현하는 방식 -> N의 비트 표현이 있을 때 `-N`은 N에 2의 보수를 취하고 1을 더한 값으로 표현된다. 즉 `-19`는 go에서 `^19 + 1`과 같다.

go에서는 string이라고 문자열 타입이 있다. 또한 `byte`, `rune`으로 문자(C의 char 같은 느낌)를 표현할 수 있다. `byte`는 8비트로 ASCII 문자 표현에 주로 사용되고, `rune`은 32비트로 유니코드 문자 표현에 사용된다. char 타입이 아스키 문자만 담을 수 있었던 문제를 해결하는 타입임. 물론 C의 문자열 표현처럼 문자 배열로 즉 `[]byte`나 `[]rune`로 문자열을 표현할 수도 있다.

근데 사실 byte는 `uint8`의, rune은 `int32`의 별칭이기 때문에, byte는 0~255 범위의 정수로 표현되고 rune은 유니코드 코드 포인트를 나타내는 정수로 표현된다. (https://go.dev/blog/strings#code-points-characters-and-runes) 이런 type alias는 유저가 직접 정의할 수도 있다.

```go
type MyString = string
```

또한 C에서처럼 문자는 작은따옴표, 문자열은 큰따옴표나 백틱으로 표현. 포맷 지정자도 `%c`랑 `%s`로 구분해서 사용할 수 있다. 문자열을 `%c`로 출력하거나 하면 제대로 출력 안되고 경고도 뜸

값이 없음을 표현하는 값은 `nil`이다. JS의 null, 파이썬의 None 같은 개념으로, 변수를 선언만 하고 초기화하지 않으면 기본값으로 nil이 할당된다. nil은 포인터, 슬라이스, 맵, 채널, 인터페이스 타입의 제로 값으로 사용된다.

형변환은 `변환할 자료형(값)` 식으로 한다. `int64(3.14)` 같은 느낌.

```go
package main

import "fmt"

func main(){
	var intValue int=42;
	var floatValue = float64(intValue);

	fmt.Printf("intValue: %d, floatValue: %f\n", intValue, floatValue);

	var s string = "123"
	var asc int = int(s[1]);

	fmt.Printf("s: %s, asc: %d\n", s, asc);
}
```

C에서와 똑같이, 큰 자료형 -> 작은 자료형 형변환 시 데이터 손실에 주의.

### 4-3 포인터

Go는 C의 영향을 많이 받았다. 포인터도 제공함. C처럼 이렇게 포인터 선언시 `*` 쓰고, 다른 변수 주소 할당 가능. 포인터 역참조도 가능하고 역참조를 통해 값 변경시 원본도 변경됨

```go
var ptr *int // int 포인터 타입

var intValue int = 42

ptr = &intValue // intValue의 주소를 ptr에 할당

*ptr = 123;
```

- `*`를 통해 포인터임을 표시
- `&`로 변수의 주소를 가져옴
- `*`로 포인터 역참조하여 값에 접근하거나 변경

포인터는 함수에 인자로 전달할 때 유용하다. 일반적으로 go는 값 전달 방식이지만, 포인터를 사용하면 함수 내에서 원본 데이터에 직접 접근하여 수정할 수 있다. C를 하던 추억이 떠오른다. 이게 go의 call by reference!

```go
package main

import "fmt"

// 변수의 주소값을 전달받는다
func updateValue(value *int) {
	*value=200
}

func main(){
	score:=100
	fmt.Printf("score 지역 변수에 저장된 값: %d\n", score)
	updateValue(&score)
	fmt.Printf("score 지역 변수에 저장된 값: %d\n", score)
}
```
