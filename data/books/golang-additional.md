---
title: golang 추가 학습 자료
description: golang을 Do it go로 공부하며 추가적으로 알아본 자료들
---

The Go Language - A brief introduction to the Go language and built-in types

https://drstearns.github.io/tutorials/golang/

이런 사이트를 찾았는데 이 글 외에도 좋은 자료가 많아서 틈틈이 읽어볼 예정

아무튼 go의 문법에 대해 설명함

### Arrays, slices (and strings)

https://go.dev/blog/slices

언어마다 배열에 대한 설계가 매우 다르다. go에서는 유연한 구조를 제공하기 위해 고정 길이 배열을 기반의 slices를 사용한다.

go에서도 배열은 있다. 하지만 프로그래머가 선언한 고정된 길이를 갖기 때문에 자주 사용되지 않는다. 보통 slice를 위해 메모리 할당하는 과정에서 내부적으로 쓴다고 한다.

```go
var arr [3]int
```

slice는 배열의 연속된 구간을 나타내는 자료구조다. _배열이 아님_

파이썬의 리스트 슬라이싱처럼 쓸 수 있는 것이다.

```go
slice := arr[0:2]
```

그리고 slice는 배열의 원소를 향한 포인터, 그리고 길이를 내부적으로 갖고 있는 구조로 생각할 수 있다. 이런 느낌(물론 illustration일 뿐 실제로는 다르다)

```go
type sliceHeader struct {
    Length        int
    ZerothElement *int // pointer to the first element of the slice
}
```

슬라이스를 인자로 받는 함수들은 사실 이런 slice header(길이 + 첫 원소 포인터)를 받는다고 생각할 수 있다.

그리고 슬라이스는 포인터가 아니라 그 자체로 값임. 즉 함수에 전달될 때도 위의 `SliceHeader` 구조체처럼, 그런데 "값으로" 전달됨

물론 슬라이스도 원본 배열의 원소를 가리키는 포인터를 내부적으로 갖고 있기 때문에, 슬라이스를 통해 원본 배열의 원소를 수정할 수 있다. 하지만 슬라이스 자체를 수정한다면?

```go
func MakeSlice(slice []int) []int {
	slice = slice[0:2]
	return slice
}

func main() {
	slice := []int{1, 2, 3, 4, 5}
	fmt.Printf("length of slice: %d\n", len(slice)) // 5
	newSlice := MakeSlice(slice)
	fmt.Printf("length of original slice: %d\n", len(slice)) // 5
	fmt.Printf("length of new slice: %d\n", len(newSlice)) // 2
}
```

`MakeSlice` 내에서 slice를 수정했는데 원본 slice는 수정 안 됐다. slice가 값으로 전달되기 때문. 함수 내에서 slice를 수정하려면 포인터로 전달해야 한다.

```go
func MakeSlice(slicePtr *[]int) {
    *slicePtr = (*slicePtr)[0:2]
}
```

slice를 수정하는 메서드에서는 이렇게 포인터로 전달하는 게 go에서는 일반적이라고 한다.

위에서 slice는 length랑 첫 원소 포인터만 가진다고 했는데 사실 capacity도 있다. 내부의 배열 길이가 실제로 얼만큼인지를 저장함. 파이썬의 리스트 관리를 생각하면 됨. capacity를 보고 싶으면 `len` 대신 `cap` 함수를 쓰면 된다. `cap(slice)`

make 함수를 이용해서 슬라이스를 만들 때, 길이와 용량을 따로 지정할 수 있다. `make([]int, length, capacity)` 만약 capacity를 생략하면 기본적으로는 length와 같은 값이 된다.

slice를 베끼는 방법은 `copy` 함수를 이용하는 것이다. `copy(dest, src)` dest와 src는 둘 다 slice여야 한다. 그리고 dest가 src보다 길이가 짧으면 dest의 길이만큼만 복사된다. `min(len(dest), len(src))` 만큼 복사된다고 생각하면 된다.

또한 copy는 인수로 받은 두 배열이 겹칠 때도 잘 처리해준다, 하나의 배열에서 원소 하나만큼 shift 이럴 때도 쓸 수 있음

```go
func Insert(slice []int, index, value int) []int {
	slice = append(slice, 0)
	// Use copy to move the upper part of the slice out of the way and open a hole.
	copy(slice[index+1:], slice[index:])
	slice[index] = value
	return slice
}

func main() {
	slice := []int{1, 2, 3, 4, 5}
	newSlice := Insert(slice, 2, 10)
	fmt.Println(newSlice) // [1 2 10 3 4 5]
}
```

append를 쓰면 자동으로 slice를 확장하고 capacity가 부족하면 새로운 배열을 할당해서 복사해준다. ㄹㅇ python의 리스트 append 그리고 리스트의 capacity 관리와 매우 유사하다.

```go
append(slice, value)
```

append 호출마다 slice 헤더가 업데이트되기 때문에 호출 이후 반환된 slice를 저장하는 걸 잊지 말자. 사실 애초에 컴파일러가 결과 저장 없이 append 호출을 하는 걸 막아준다.(컴파일 에러가 뜸)

다음처럼 slice 자체를 slice에 추가하는 것도 가능하다. `...`은 스프레드

```go
slice = append(slice, slice...)
```

nil slice는 이런 형태다.

```go
sliceHeader{
    Length:        0,
    Capacity:      0,
    ZerothElement: nil,
}
```

이건 길이가 0인 슬라이스(`slice[0:0]`으로 생기는 것과 같은)와는 다르다. 포인터도 nil이기 때문이다. 길이가 0인 슬라이스는 더 커질 수도 있지만 nul slice는 더 커질 수 없다. 내부적으로 가리키즌 배열도 없으니까.

그리고 문자열도 go에서는 그냥 몇 가지 문법적인 지원을 추가한, byte 형의 read-only slice라고 생각할 수 있다. 따라서 인덱싱, 슬라이싱 다 가능

이렇게 문자열을 슬라이스처럼 처리한 결과, substring 생성이 매우 효율적이어졌다. 그냥 문자열 헤더를 하나 더 만들면 되니까. 문자열은 read-only라서 슬라이싱으로 만들어진 문자열과 안전하게 공유할 수 있다. substring을 만들 때마다 문자열 전체를 복사할 필요가 없게 된 것이다. 역사적으로 초기 구현에서는 문자열을 늘 새로 복사했는데 이렇게 슬라이스로 처리하게 되면서 굉장한 속도 향상이 있었다고 한다.(원문에서 그렇대) [문자열에 대한 다음 글](https://go.dev/blog/strings)은 다음 섹션에.

슬라이스는 결국 별도로 할당된 배열의 한 구간을 기술하는 slice header라는 작은 값으로 이루어진다. 값이므로 함수 전달 시 값으로 복사된다(물론 내부 포인터는 공유됨) `copy`랑 `append`로 슬라이스를 잘 써보자.

### Strings, bytes, runes and characters in Go

### go의 메서드 섀도잉과 다형성
