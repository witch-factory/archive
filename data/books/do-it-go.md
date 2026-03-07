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

## 5장. 연산자

Go에서는 당연히 연산자를 이용해 데이터에 대한 변경과 계산 가능. 사칙연산이랑 `%` 당연히 지원. 이때 C처럼, 정수 나눗셈과 실수 나눗셈을 명확히 구분. `+=` 같은 것도 지원한다.(syntactic sugar)

`++`, `--` 도 지원한다. 하지만 C와 달리 Go에서는 `a++` 같은 후위 연산만 지원하고 전위 연산은 지원하지 않음. 그리고 `b=a++` 같이 증감 연산 결과를 대입하는 것도 Go에선 안된다. 개발자를 혼란스럽게 한다는 이유로 지원 안 함.

덧셈으로 문자열 concat도 지원. 단 JS같은 근본 없는 언어와 달리 문자열끼리만 concat할 수 있다. 좋다.

근데 만약에 이런 경우에는 어떨까? 나이 변수가 int형으로 있는데 이걸 포함해서 출력하고 싶을 수 있으니까. 물론 Printf를 이용할 수 있지만 그냥 이렇게 해보자.

```go
package main

import "fmt"

// 변수의 주소값을 전달받는다
func updateValue(value *int) {
	*value=200
}

func main(){
	name:="김성현"
	age:=25

	msg :=name+"님의 나이는 "+string(age)+"세입니다."

	fmt.Printf(msg)
}
```

이렇게 하면 나이가 안 보인다. `string(25)`를 했을 때 나오는 건 유니코드 문자 코드로 `U+0019`(16진수로 25)이기 때문이다. EOM(End of Medium)이다.

따라서 포맷 문자열을 쓰거나, fmt.Sprintf(출력 결과를 문자열로 반환함)를 이용해서 문자열로 변환하거나 `strconv.Itoa` 함수를 이용해서 정수를 문자열로 변환하는 방법이 있다.

이외에도 비교 연산자, 비트 연산자, `&&`, `||`, `!` 같은 C에서 알고 있던 연산자들은 Go에서도 다 지원한다.

Go의 비트 연산자 관련 메모

- `^`은 이항 연산자로 썼을 때 xor인데, Go에서는 단항 연산자로 써서 비트 반전 가능
- NAND 연산 `&^` 지원(and 한 다음 비트 반전)

할당 연산자(`=`, `:=`), 주소 연산자 `&`, 역참조할 땐 `*`

고루틴과 채널 연산자는 나중에 나오는데 그때 쓰이는 `<-` 를 채널 연산자라고 한다.

- 왼쪽 항이 채널이면 오른쪽 항 값을 왼쪽 채널로 보냄
- 오른쪽 항이 채널이면 오른쪽 항 채널에서 값을 받아 왼쪽 항에 대입
- 왼쪽 오른쪽 모두 채널이면 오른쪽 채널 -> 왼쪽 채널로 값 전달

나중에 더 자세히 다루겠지만 간단하게 고루틴과 채널을 이용해서 메시지를 보내고 받는 예시

```go
package main

import "fmt"

// 변수의 주소값을 전달받는다
func updateValue(value *int) {
	*value=200
}

func main(){
	messages :=make(chan string)

	// 고루틴을 통해 메시지 전송
	go func() {
		messages <- "Hello, World!"
	}()

	msg := <-messages
	fmt.Println(msg)
}
```

## 6장. 함수

함수는 input을 받아서 body에서 작업을 처리한 뒤 반환한다.

```
입력 -> 함수 body -> 출력
```

정수형 인자 2개를 받아서 합을 계산하고 정수형을 반환하는 건 이렇게. 이떄 반환값이 없다면 자료형을 생략할 수 있다.(void return)

```go
package main

import "fmt"

func add(a int, b int) int {
	return a + b
}

func main(){
	fmt.Printf("Hello, %s!\n", "Go")
	result := add(3, 5)
	fmt.Printf("3 + 5 = %d\n", result)
}
```

Go에서는 함수가 값을 여러 개 반환할 수 있다. 그리고 이 반환값을 받을 때는 변수 여러 개를 선언해서 받거나, 반환값 중 일부만 받고 나머지는 무시할 수 있다. 반환값이 여러 개인 경우에는 괄호로 묶어서 반환한다.

```go
package main

import "fmt"

func addAndSub(a, b int) (int, int) {
	add:= a + b
	sub:= a - b

	return add, sub
}

func main(){
	fmt.Printf("Hello, %s!\n", "Go")
	add, sub := addAndSub(10, 5) // 변수 여러 개를 선언해서 반환값 받기
	fmt.Printf("Addition: %d, Subtraction: %d\n", add, sub)
}
```

a,b의 타입이 한번만 `a, b int`로 선언된 것도 보인다. 이런 식으로 여러 매개변수의 타입이 같다면 마지막에 한 번만 타입을 선언할 수 있다.

보통은 반환값은 타입만 명시하지만 Go에서는 반환값에 이름 지정도 가능. 하지 않아도 동작에는 차이가 없지만 의미를 나타내서 가독성을 높일 수 있다. 또한 함수 반환값을 할당받는 데에서도 반환값 이름에 구애받지 않기에 자유롭게 명명 가능

```go
package main

import (
	"fmt"
	"time"
)

func getAgeDetail(bornYear int) (age int, isAdult bool){
	currentYear := time.Now().Year()

	ageValue := currentYear - bornYear

	isAdultValue := ageValue >= 18

	return ageValue, isAdultValue
}

func main(){
	var bornYear int

	fmt.Print("태어난 년도를 입력하세요: ")
	fmt.Scanf("%d", &bornYear)

	age, isAdult := getAgeDetail(bornYear)
	fmt.Printf("당신의 나이는 %d세입니다.\n", age)
	if isAdult {
		fmt.Println("당신은 성인입니다.")
	} else {
		fmt.Println("당신은 미성년자입니다.")
	}
}
```

C처럼 `fmt.Scanf`로 사용자 입력 받기 가능

### 6-2 익명 함수와 클로저

Go는 함수를 일급 시민(first-class citizen)으로 취급한다. 따라서 함수를 변수에 할당하거나, 다른 함수의 인자로 전달하거나, 함수에서 반환할 수 있다. 익명 함수도 선언 가능

```go
package main

import "fmt"

func main(){
	// 익명 함수 선언
	addResult := func(a,b int)(result int){
		return a+b
	}(10,20)
	fmt.Println(addResult)
}
```

또한 go도 JS처럼 렉시컬 스코프 기반의 클로저도 지원한다. 클로저는 자신이 생성될 때의 렉시컬 스코프를 캡처해 보존한다. 나중에 내부 함수가 실행되면 캡처된 스코프에 접근한다.

```go
package main

import "fmt"

func makeCounter() func() int{
	count :=0
	return func() int{
		count++
		return count
	}
}

func main(){
	// makeCounter에서 반환하는 익명 함수는 자신이 생성될 때의 렉시컬 스코프를 캡처하여, makeCounter가 종료되어도 생성 당시 count 변수에 접근할 수 있다. 따라서 makeCounter에서 반환된 함수가 호출될 때마다 캡처된 스코프의 count가 증가한다.
	counter := makeCounter()
	fmt.Println(counter()) // 1
	fmt.Println(counter()) // 2
	fmt.Println(counter()) // 3
}
```

클로저를 이용해서, 함수를 생성하는 팩토리 함수를 만드는 등의 테크닉도 가능하다.

```go
package main

import "fmt"

func funcFactory(x int) func(int) int {
	return func(y int) int {
		return x + y
	}
}

func main(){
	// x 인자에 전달하는 값이 클로저에 전달되어서, x만큼 증가하는 함수를 생성한다.
	addTwo := funcFactory(2)
	addThree := funcFactory(3)

	var result int

	result = addTwo(3)
	fmt.Println(result) // 5

	result = addThree(3)
	fmt.Println(result) // 6
}
```

## 7장-8장. 제어문, 반복문

if, else if, else를 제공한다. C나 JS같은 다른 언어와 달리 조건에 괄호 안 씌워줘도 됨

```go
func getScoreRank(score int) (rank string) {
	if score >= 90 {
		return "A"
	} else if score >= 80 {
		return "B"
	} else {
		return "C"
	}
}
```

switch도 if처럼 괄호가 없다 뿐이지 비슷함. 정말 C랑 비슷하다고 봐야 함. 단 Go의 switch는 break가 자동으로 들어가서 case마다 break 안 써도 된다. break를 쓸 수도 있지만 어차피 자동으로 종료되어 잘 사용하지 않는다.

```go
func getDayOfWeek(day int) string {
	switch day {
	case 1:
		return "Monday"
	case 2:
		return "Tuesday"
		// ...
	default:
		return "Invalid day"
	}
}
```

그리고 C와 달리 `case` 뒤에 표현식을 사용할 수도 있다. `case foo():` 같은 게 가능하다.

### tagless switch

switch에 비교할 값을 생략하고 case마다 참이나 거짓으로 표현되는 조건식을 쓰는 tagless switch라는 기법도 있다. 고랭의 신기한 기능 중 하나. if else 체인을 좀 더 간결하게 쓸 때 사용해볼 수 있다. 예를 들어 이런 식으로 여러 케이스의 유효성 검사

```go
func validate(name string, age int) error {
    switch {
    case name == "":
        return errors.New("이름은 필수입니다")
    case len(name) > 50:
        return errors.New("이름이 너무 깁니다")
    case age < 0 || age > 150:
        return errors.New("나이가 유효하지 않습니다")
    default:
        return nil
    }
}
```

### 반복문

go의 반복문은 `for` 하나뿐이다. `if`에서도 그랬지만 go의 for도 소괄호 안 써도 됨

```go
func main() {
	for i := 0; i < 5; i++ {
		num := i + 1
		fmt.Printf("%d번 반복문: i는 %d\n", num, i)
	}
}
```

> 중간에 있던 팁
> 표현식(expression)은 항상 값을 반환하며 다른 표현식 안에서도 사용 가능. `2`, `f(3)`, `x > 5` 같은 게 표현식이다. 반면 문(statement)은 값을 반환하지 않으며 프로그램의 흐름을 제어하는 역할. `if`, `for`, `switch` 같은 게 문이다. C에서는 `x++` 가 표현식이지만 go에서는 문인 등 언어마다 차이가 있음

그리고 go에는 반복문이 for 하나뿐인 만큼 유연하게 쓸 수 있는 여러 방도가 있다. 예를 들어 `for { body }`로 무한 루프 만들기 가능. C처럼 초기식, 증감식에 여러 변수 넣는 테크닉도 비슷하게 가능. 단 go의 문법을 사용해 병렬 대입을 한 걸 볼 수 있다. `i, j = i+1, j-1` 같은 느낌. 이런 식으로 여러 변수를 동시에 업데이트할 수 있다.

```go
func main() {
	for i, j := 0, 10; i < j; i, j = i+1, j-1 {
		num := i + 1
		fmt.Printf("%d번 반복문: i는 %d, j는 %d\n", num, i, j)
	}
}
```

break, continue, goto도 지원한다. goto는 레이블을 이용해서 코드의 특정 위치로 이동하는 제어문이다. 일반적으로 goto는 코드의 가독성을 떨어뜨릴 수 있기 때문에 권장되지 않지만, 특정 상황에서는 유용하게 사용될 수 있다. 예를 들어 중첩된 루프에서 빠져나올 때 사용할 수 있다. 나머지 break, continue는 다른 언어와 동일

- break: 현재 루프를 즉시 탈출
- continue: 이 예약어를 포함한 가장 가까운 루프를 즉시 다시 반복(한 사이클 건너뛰고 다음 사이클로 넘어감)

`label:`처럼 코드의 특정 위치에 레이블을 지정하고, `break label` 또는 `continue label`을 사용하여 해당 레이블로 이동할 수 있다. 중첩 루프 탈출에 유용하게 쓰인다.

goto를 이용해서 코드의 실행을 특정 레이블로 이동시킬 수도 있다. 단 가독성도 떨어뜨려서 잘 쓰지 않음
그리고 go의 goto에는 바깥에서 안쪽 블록에 goto로 이동하는 건 허용되지 않고, 변수 선언을 건너뛸 수 없고, 같은 함수 내에서만 쓸 수 있는 등의 제약이 있다.

```go
func main() {
	// ❌ 컴파일 에러
	goto skip
	x := 10 // 이 선언을 건너뛰게 되니까
skip:
	fmt.Println("hi")
}
```

### while처럼 쓰기

go에는 while문이 없다. 대신 for문을 조건문만 있는 형태로 작성 가능하다. 이렇게 하면 while문처럼 사용할 수 있다.

```go
func main() {
	i := 0
	fmt.Println("i를 1씩 증가시킵니다.")
	for i < 10 {
		fmt.Printf("현재 i의 값: %d\n", i)
		i++
	}
}
```

## 9장. 자료구조

배열 사용하기. 이런 식으로 `[배열 크기]자료형`으로 배열 타입을 선언한다. 메모리 공간이 고정되며 이후 크키 변경 불가.

```go
var nameArray [5]string
```

`len(nameArray)`로 배열 길이 확인 가능. 배열 요소는 인덱스로 접근 가능. `nameArray[0]` 같은 느낌.

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	var nameArray [5]string

	for i := 0; i < 5; i++ {
		fmt.Printf("%d번째 이름을 입력하세요: ", i+1)
		fmt.Scanf("%s\n", &nameArray[i])
	}

	randomNumber := rand.Intn(len(nameArray))
	fmt.Printf("\n")
	fmt.Printf("오늘의 행운의 이름은 %s입니다.\n", nameArray[randomNumber])
}
```

### 슬라이스

슬라이스는 같은 자료형의 여러 값을 저장 가능한 동적 배열. 내부 포인터를 이용해 배열의 특정 부분을 가리키며 원소를 가변으로 다룰 수 있다.

```go
slice := []int{1, 2, 3, 4, 5}
```

슬라이스는 내부 배열을 참조하여 값을 저장한다. 배열의 시작 주소를 가리키는 포인터를 가지며, 길이와 용량(capacity) 정보를 포함한다. capacity는 리터럴 값으로 직접 초기화 시 선언할 때의 길이와 같다. 슬라이스는 capacity만큼의 요소를 담을 수 있음.

혹은 `make`로 만들 수도 있다. `make([]자료형, 길이, 용량)` 같은 느낌. 길이와 용량을 다르게 지정할 수 있다.

```go
// make([]T, length, capacity)
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	nameSlice := make([]string, 5)

	for i := 0; i < 5; i++ {
		fmt.Printf("%d번째 이름을 입력하세요: ", i+1)
		fmt.Scanf("%s\n", &nameSlice[i])
	}

	randomNumber := rand.Intn(len(nameSlice))
	fmt.Printf("\n")
	fmt.Printf("오늘의 행운의 이름은 %s입니다.\n", nameSlice[randomNumber])

}
```

이때 `make`는 슬라이스뿐 아니라 map, channel의 초기화에도 쓰이기 때문에 타입은 원래 `make(t Type, size ...IntegerType) Type`으로 정의되어 있다. 여기서는 슬라이스 초기화에만 사용하므로 `make([]자료형, 길이, 용량)`의 형태.

슬라이스는 `append` 함수를 이용해 동적으로 요소를 추가할 수 있다. `append`는 기존 슬라이스에 새로운 요소를 추가한 새로운 슬라이스를 반환한다. 만약 추가로 인해 용량이 초과되면, Go 런타임이 자동으로 더 큰 배열을 할당하고 기존 요소를 복사한 후 새 요소를 추가한다.

```go
func main() {
	var nameSlice []string
	var newName string

	for i := 0; i < 5; i++ {
		fmt.Printf("%d번째 이름을 입력하세요: ", i+1)
		fmt.Scanf("%s\n", &newName)
		nameSlice = append(nameSlice, newName)
	}

	randomNumber := rand.Intn(len(nameSlice))
	fmt.Printf("\n")
	fmt.Printf("오늘의 행운의 이름은 %s입니다.\n", nameSlice[randomNumber])
}
```

이런 식으로 하면 사용자가 종료할 때까지 계속 입력을 받으면서 append로 계속 요소를 추가하는 식으로도 작성 가능하다. `append(값을 추가할 슬라이스, 추가할 요소)` 처럼 쓴다.

append할 때마다 만약 capacity가 꽉 차면 go에서 알아서 배열을 확장한다. python의 list(amortized array)와 비슷한 느낌. 일반적으로 2배씩 확장되며 용량이 커질수록 증가폭은 조금씩 작아진다.

또한 추가할 요소를 여러 개 전달 가능

```go
nameSlice = append(nameSlice, "Alice", "Bob", "Charlie")
```

### 슬라이싱

파이썬 리스트랑 비슷하다. 단 append가 새 슬라이스를 반환하는 등 차이가 있다.

또 비슷하면서 다른 게 있는데 슬라이싱도 가능. `sliced := original[1:4]` 처럼 하면 된다. 이때 슬라이스는 원본 배열의 요소를 참조하기 때문에, 슬라이스에서 요소를 변경하면 원본 배열에도 영향을 미친다. 슬라이스는 원본 배열의 특정 부분을 가리키는 뷰(view) 역할을 한다고 볼 수 있다.

```go
func main() {
	original := []int{1, 2, 3, 4, 5, 6}

	sliced := original[1:4]

	fmt.Println("Original:", original) // [1 2 3 4 5 6]
	fmt.Println("Sliced:", sliced)     // [2 3 4] - sliced는 original의 1, 2, 3번째 요소를 참조

	sliced[0] = 20 // slice뿐 아니라 원본(original[1]에 해당)도 변경됨

	fmt.Println("After modifying sliced:")                                       // original과 sliced 모두 변경됨
	fmt.Println("Original:", original)                                           // [1 20 3 4 5 6] - original의 1번째 요소가 sliced[0]의 변경으로 인해 변경됨
	fmt.Println("original len: ", len(original), "original cap:", cap(original)) // 6,6
	fmt.Println("Sliced:", sliced)                                               // [20 3 4]
	fmt.Println("sliced len: ", len(sliced), "sliced cap:", cap(sliced))         // 3,5
	// sliced의 cap이 5인 이유는 sliced가 original이 1번 인덱스부터 끝까지를 참조하기 때문
}
```

이런 슬라이스의 메모리 참조와 계산 방식을 알아 두면 효율적인 메모리 사용에 도움이 된다.

### range

python처럼 range라는 것도 사용가능

```go
func main() {
	score := make([]int, 5)

	for i := range score {
		fmt.Printf("%d번째 과목 점수 입력: ", i+1)
		fmt.Scanf("%d\n", &score[i])
	}

	sumOfScore := 0
	for _, scoreItem := range score {
		sumOfScore += scoreItem
	}

	mean := float64(sumOfScore) / float64(len(score))
	fmt.Printf("총점: %d, 평균: %.2f\n", sumOfScore, mean)
}
```

이렇게 `range`를 쓰면 score의 길이만큼 자동으로 반복하면서 인덱스 i를 반환한다. 슬라이스 순회 시 첫번째로는 인덱스를, 두번째로 값을 돌려준다.

```go
for i,v := range score {
	// i는 인덱스, v는 해당 인덱스의 값
}
```

`_`는 blank identifier라고 하며 값을 무시하거나 버릴 때 사용한다. Go는 모든 코드가 명시적이어야 한다는 철학이 있어서 모든 변수가 코드 내에서 사용되어야 한다. 그렇지 않으면 컴파일 에러 발생. 근데 range에서 인덱스는 필요 없는 등의 경우가 있다. 이때 `_`를 사용하면 해당 값을 할당 즉시 버리며, go 컴파일러도 오류를 발생시키지 않는다.

### copy

슬라이스를 다른 변수에 할당하는 건 가능하지만 이렇게 되면 얕은 복사라 원본과 새 변수 모두 같은 배열을 참조하게 된다. 따라서 한쪽에서 요소를 변경하면 다른 쪽에서도 변경이 반영된다. 만약 원본과 독립적인 새로운 슬라이스가 필요하다면 `copy` 함수를 사용해서 슬라이스를 복사해야 한다.

다음 코드에서 원본 변경시 대입으로 만든 새 변수 내용도 변경되는 걸 볼 수 있다.

```go
func main() {
	orig := []int{1, 2, 3, 4, 5}
	ref := orig

	fmt.Printf("orig: %v\n", orig)
	fmt.Printf("ref: %v\n", ref)

	orig[0] = 100
	fmt.Printf("orig: %v\n", orig) // Output: orig: [100 2 3 4 5]
	fmt.Printf("ref: %v\n", ref)   // Output: ref: [100 2 3 4 5] - ref도 orig의 변경을 반영
}
```

깊은 복사를 수행해야 한다. copy의 반환형이 int인 이유는 복사된 요소의 개수를 정수형으로 반환하기 때문이다.

```go
copy(dst, src []T) int
```

다음과 같이 `make`로 새 슬라이스를 만들고 `copy`로 원본 슬라이스의 요소를 새 슬라이스로 복사하면 된다. 깊은 복사가 된다.

```go
func main() {
	orig := []int{1, 2, 3, 4, 5}
	copied := make([]int, len(orig))
	copy(copied, orig)

	fmt.Printf("orig: %v\n", orig)
	fmt.Printf("copied: %v\n", copied)

	orig[0] = 100
	fmt.Printf("orig: %v\n", orig)     // Output: orig: [100 2 3 4 5]
	fmt.Printf("copied: %v\n", copied) // Output: copied: [1 2 3 4 5] - 독립적
}
```

근데 왜 `make`를 먼저 해줄까? `copy`는 대상 슬라이스의 기존 길이만큼만 복사하기 때문이다. 따라서 만약 `copied := make([]int, 3)` 처럼 3개짜리 배열을 만들고 거기에 복사하다면, 위 코드의 `orig`를 복사한다면 `[1,2,3]`만 복사된다. 앞쪽 3개만...

### 맵

map은 key-value 쌍을 저장하는 자료구조. 내부적으로 해시 테이블을 사용한다.

```go
func main() {
	// make(map[키 자료형]값 자료형)처럼 만든다
	scoreMap := make(map[string]int)

	for i := 0; i < 3; i++ {
		var subName string
		var score int
		fmt.Printf("Enter subject name and score: ")
		fmt.Scanf("%s %d", &subName, &score)
		scoreMap[subName] = score
	}

	fmt.Println("Subject\tScore\tRank")
	for subName, score := range scoreMap {
		rank := getRank(score)
		fmt.Printf("%s\t%d\t%s\n", subName, score, rank)
	}
}
```

map은 키를 이용해서 값에 접근할 수 있다. 그리고 range로 선언 시 (key, value) 쌍으로 순회할 수 있다.

`make` 대신 리터럴로도 맵을 만들 수 있다. `map[키 자료형]값 자료형{키1:값1, 키2:값2}` 같은 느낌

```go
func main() {
	scoreMap := map[string]int{
		"Math":    95,
		"English": 88,
		"Science": 92,
	}
	fmt.Println(scoreMap)
}
```

좀 예쁘게 출력하고자 하면 이렇게 `%-10s` 같은 식으로 서식 지정자에 폭을 지정할 수도 있다. `%-10s`는 문자열을 왼쪽 정렬로 10칸의 폭을 차지하도록 출력한다. 이렇게 하면 과목 이름이 10칸의 공간을 차지하면서 왼쪽 정렬되어 출력된다.

```go
fmt.Println("| Subject    | Score | Rank |")
fmt.Println("|------------|-------|------|")
for subName, score := range scoreMap {
	rank := getRank(score)
	fmt.Printf("| %-10s | %-5d | %-4s |\n", subName, score, rank)
}
```

그리고, 당연하지만 해시 테이블 특성상 map은 키의 순서를 보장하지 않는다. 따라서 range로 순회할 때마다 키의 순서가 달라질 수 있다. 만약 특정한 순서로 출력하고 싶다면, 키를 슬라이스에 담아서 정렬한 다음에 그 순서대로 값을 출력하는 식으로 구현해야 한다.

### 구조체

여러 자료형을 하나로 묶어서 저장. C의 struct와 비슷하다. `type 구조체명 struct { 필드1 자료형; 필드2 자료형; ... }` 같은 느낌으로 선언한다.

```go
func main() {
	type Student struct {
		Name  string
		Age   int
		Score map[string]int
	}

	// 필드 초기화
	// 구조체 필드의 선언 순서와 일치해애 한다.
	// 만약 필드명을 명시하면 순서 상관없이 초기화 가능
	student := Student{"이능룡", 47, map[string]int{"Math": 95, "English": 88, "Science": 92}}
	/*
	필드명으로 초기화하는 건 이런 식으로.
	student := Student{
		Age:  47,
		Name: "이능룡",
	}
	*/
	fmt.Printf("Name: %s, Age: %d\n", student.Name, student.Age)
	fmt.Printf("구조체 전체: %v\n", student)
}
```

go에서는 보통 구조체를 응용해 로직을 구성한다. oop에서의 클래스와 비슷하게 사용 가능.

## 10장. 객체지향 프로그래밍

객체지향은 각 기능을 객체(데이터 + 기능)로 분리하고 객체간의 상호작용을 통해 전체가 동작하도록 한다. go에서는 이렇게 한다. 메서드 오버로딩, 추상 클래스 같은 것 대신 구조체와 메서드라는 기본적인 개념을 활용해서 객체지향 프로그래밍을 구현한다.

- 구조체로 객체 구현
- 인터페이스로 공통 기능 추상화
- 리시버로 메서드-객체 연결
- 구조체 임베딩으로 상속 모방

go에서는 구조체를 정의한 후 `new` 함수에 전달하는 방식으로 객체를 생성한다.

```go
// 자료형을 전달받아 메모리 할당 후 그 포인터를 반환한다
func new(Type) *Type
```

다음은 go에서 enum을 만드는 법이랑 새 구조체 만드는 법을 보이는 코드다.

```go
// type alias
type Subject string

// enum
const (
	Math    Subject = "Math"
	Science Subject = "Science"
	History Subject = "History"
)

type Student struct {
	Name  string
	Age   int
	Major Subject
}

func main() {
	student1 := new(Student)
	fmt.Printf("Student1: %+v\n", student1)
	fmt.Printf("Student1 Name: %s\n", student1.Name)
	fmt.Printf("Student1 Age: %d\n", student1.Age)
	fmt.Printf("Student1 Major: %s\n", student1.Major)
}
```

근데 이러면 그냥 빈 구조체가 만들어질 뿐이다. 생성자를 만들어보자.

go에는 다른 언어 같은 constructor나 `__init__` 같은 게 없다. 대신 생성자 역할을 하는 함수를 만들어서 객체를 초기화하는 관례가 있다. 보통 `New + 구조체명` 같은 이름으로 생성자 함수를 정의한다. 다음 함수를 보면 `student`의 포인터를 반환하는 걸 볼 수 있다.

```go
func NewStudent(name string, age int, major Subject) *Student {
	student := new(Student)
	student.Name = name
	student.Age = age
	student.Major = major
	return student
}
// 호출은 이렇게
student1 := NewStudent("이능룡", 47, Math)
```

구조체는 객체의 구조를 정의하고, 생성자 함수는 초기값을 설정하는 역할을 한다. 위보다 더 간단하게 리터럴 초기화와 `&` 연산자를 이용해서도 객체를 만들 수 있다.

```go
student1 := &Student{
	Name:  "이능룡",
	Age:   47,
	Major: Math,
}

// 같은 방식으로 생성자 함수도 정의 가능
func NewStudent(name string, age int, major Subject) *Student {
	return &Student{
		Name:  name,
		Age:   age,
		Major: major,
	}
}
```

객체지향을 간단히 설명하는데, 어차피 아는 내용이라 스킵. 객체지향 지식이 필요하면 "스프링 입문을 위한 자바 객체 지향의 원리와 이해" 같은 책을 참고하자.

### 메서드

구조체의 정보를 보관하는 필드 -> 멤버 변수. 기능을 정의하는 함수: 메서드

go에서 메서드를 정의할 때도 func을 사용하지만 메서드의 소속을 알려준다.

```go
func (receiver ReceiverType) MethodName(parameters) returnType {
	// 메서드 본문
	// receiver는 메서드를 호출하는 객체를 지칭한다.
}

// 예를 들면 이런 식
func (s *Store) GetProducts() []*Product {
	return s.Products
}
```

보통 receiver는 메서드가 속한 구조체의 포인터 타입으로 선언하며 관례상 타입 이름의 첫 글자 소문자로 지을 때가 많다. 위와 같이 쓰면 `myStore.GetProducts()` 처럼 메서드 호출 가능하다.

근데 만약 nil pointer dereference 에러 같은 게 발생하면 어떡하지? 예를 들어 name으로 product를 찾고 해당 product에서 뭔가를 하는 코드를 짰는데, 해당 name에 대응하는 product가 없는 경우 말이다. 이런 경우 에러 핸들링이 필요한데 12장에서 다룬다.

### 인터페이스

인터페이스는 구조체가 구현해야 할 메서드 집합을 정의하는 구조다. ts 등에서의 `implements`랑 비슷하다. 인터페이스를 사용하는 객체는 인터페이스의 메서드를 반드시 정의해야 함. 따라서 함수 인자 등으로 인터페이스를 쓸 때 유용하다.

다음과 같이 `type 인터페이스명 interface { 메서드 시그니처 }`로 인터페이스를 정의한다. 각 메서드의 입력, 출력 타입을 제공해서 일종의 명세서 같은 역할을 한다.

```go
type Shape interface {
	Area() float64
	Perimeter() float64

	// 게터 함수
	Length() float64
}
```

또한 getter도 있는데, go는 다른 언어같은 Get prefix를 안 쓰고 필드 이름을 그대로 게터로 사용할 때가 많다. `Name()` 게터라면 `name` 필드를 가져오는 식이다. 이렇게 게터를 쓰면 내부 상태를 안전하게 관리하고 이후 변경하기 쉽게 할 수 있다고 한다.

- 객체의 내부 데이터에 대한 접근을 제어하여 구조체의 내부 구현과 구조체의 활용을 경계짓고 이후 데이터 저장 방식이 변하는 등의 변경에 유연하게 대처할 수 있다.
- 할인 등의 데이터 변환/처리 등이 필요할 때 게터에서 처리할 수 있다.
- 게터를 통해 필드값의 읽기만 가능하게 하면 객체 불변성 유지 가능

이때 주의할 점: go에서는 소문자로 시작하는 필드는 private member variable이 된다. 외부에서 접근해야 하면 게터를 만들거나 필드 이름을 대문자로 시작하게 해야 한다. https://cvml.tistory.com/11

인터페이스를 마치 타입처럼 쓸 수 있다. 이렇게 하면 `ProductItem` 인터페이스를 구현하는 어떤 구조체든 `Product`의 `Item` 필드로 사용할 수 있다. 즉 Store.Products 에는 ProductItem을 구현하는, Coffee, Tea, Juice 같은 구조체가 들어갈 수 있다. 인터페이스를 이용하면 같은 기능을 하는 여러 구조체를 하나의 타입으로 다룰 수 있어서 유연한 코드 작성이 가능하다. 다형성이라고 한다.

```go
type ProductItem interface {
	Make() error
	Package() error
	Pick() error
}

// 상품 구조체
type Product struct {
	Item     ProductItem
	Quantity int
}

type Store struct {
	Products []*Product
	Money   int
}
```

그리고 이런 건 한 파일에 작성하면 힘드니까, 여러 파일(예: product.go, store.go, main.go)로 나눠서 작성할 수 있다. go에서는 같은 패키지 내에 있는 파일들은 서로의 내용을 자유롭게 참조할 수 있다. 그리고 `go run .` 처럼 하면 해당 디렉토리 내의 모든 go 파일을 컴파일해서 실행할 수 있다.(단 모듈이어야, 즉 `go.mod` 파일이 있어야 함)

### 리시버

go에서 메서드는 특정 타입 값을 수신할 수 있도록 설정된다. 이를 리시버라고 하는데 이 리시버 선언이 함수를 특정 타입에 속한 메서드로 만들어준다.

```go
// func 다음에 리시버를 명시한다
func (receiver ReceiverType) MethodName(parameters) returnType {
	// 메서드 본문
	// receiver는 메서드를 호출하는 객체를 지칭한다. this 같은 느낌
}

// 예시: Building 구조체에 Open 메서드 추가
func (b *Building) Open() {
	b.Status = "OPEN"
}
```

이때 리시버는 값 리시버, 포인터 리시버가 있다.

값 리시버(`func (b Building) Open()` 처럼 선언)는 메서드가 호출될 때 리시버 타입의 복사본이 생성되어 메서드 내부에서 사용된다. 따라서 메서드 내에서 리시버의 필드를 변경해도 원본 객체에는 영향을 미치지 않는다.

반면 포인터 리시버(`func (b *Building) Open()`처럼 선언)는 메서드가 호출될 때 리시버 타입의 포인터가 전달된다. 따라서 메서드 내에서 리시버의 필드를 변경하면 원본 객체에도 영향을 미친다. 일반적으로 객체의 상태를 변경하는 메서드는 포인터 리시버로 정의하는 것이 좋다.

go에는 사실 객체라는 개념이 별도로 존재하지 않는다. 구조체에 리시버를 통해서 메서드를 연결해 객체처럼 사용할 수 있게 하는 것이다.

### 상속과 구조체 임베딩

전통적인 객체지향에서는 상속을 통해서 구조를 확장할 수 있도록 한다. 하지만 go에는 이런 게 없고 대신 구조체 합성을 통해 비슷한 걸 처리한다.

한 구조체 안에 다른 구조체를 포함하면 마치 상속처럼 사용 가능하다. 상속보다는 합성을 사용하라는 격언에 맞는 내용이기도 함.

예를 들어 학생, 군인이 모두 사람이라는 공통된 특성을 가지면서도 각각의 고유한 특성도 가지고 있다고 생각해보자. 이때 `Person`이라는 구조체를 만들고, 학생, 군인 구조체에 `Person`을 포함시키는 식으로 구현할 수 있다.

다음을 보면 그냥 `Person`을 `Student`와 `Soldier`에 포함만 시켜도 `Person`의 필드와 메서드를 사용할 수 있는 걸 볼 수 있다. 이렇게 구조체를 익명으로 임베딩하면 go의 필드 및 메서드 승격(promotion) 규칙에 따라 Person 구조체의 exported(대문자로 시작하는) 필드와 메서드가 외부에서 접근 가능하게 된다.

```go
package main

import "fmt"

type Person struct {
	Name string
}

func (p Person) Walk() {
	fmt.Printf("%s 이 걷고 있다.\n", p.Name)
}

func (p Person) Greet() {
	fmt.Printf("안녕하세요. 제 이름은 %s입니다.\n", p.Name)
}

type Student struct {
	Person
}

func (s Student) Study() {
	fmt.Printf("%s 이 공부하고 있다.\n", s.Name)
}

type Soldier struct {
	Person
}

func (s Soldier) Train() {
	fmt.Printf("%s 이 훈련하고 있다.\n", s.Name)
}

// Greet 메서드 섀도잉
func (s Soldier) Greet() {
	fmt.Printf("안녕하세요. 저는 군인 %s입니다.\n", s.Name)
}

func main() {
	student := Student{Person{Name: "철수"}}
	student.Walk()

	soldier := Soldier{Person{Name: "영희"}}
	soldier.Walk()
	soldier.Greet()
}
```

임베딩된 구조체의 메서드와 똑같은 이름으로 외부 구조체에 메서드를 정의하면 외부 메서드가 우선 호출된다. 위에서 `Soldier.Greet`를 호출하면 `Person.Greet`이 아니라 `Soldier.Greet`가 호출되는 게 그 예시다.

오버라이딩과 비슷하지만, go에서는 단순히 이름 우선 규칙에 따라 내부 메서드가 가려지는 것이다. 렉시컬 스코프에서 변수 섀도잉과 같다.
