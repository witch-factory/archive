---
title: 전문가를 위한 파이썬 17장
description: 반복자, 제너레이터, 고전적인 코루틴
---

# 반복자(iterator), 반복형(iterable)

데이터가 메모리에 다 들어가지 않을 경우 이걸 lazy하게 처리할 수 있어야 한다. 반복자(iterator) 패턴은 이걸 가능하게 해준다.

파이썬에서는 이렇다.

iterable: iter()가 iterator를 얻어낼 수 있다면 iterable이다. `__iter__` 또는 0에서 시작하는 인덱스를 받는 `__getitem__` 메서드를 구현한 객체는 iterable이다.

반복자(iterator): next()가 다음 요소를 반환하는 객체. 더 이상 요소가 없으면 StopIteration을 발생시킨다. `__next__`와 `__iter__` 메서드를 구현한 객체는 반복자이다. `__iter__`는 반복자 자신(self)을 반환해야 한다.

파이썬에서는 반복자를 제공하는 객체를 iterable이라고 부른다. 리스트, 튜플, 딕셔너리, 파일 객체 등이 모두 iterable이다. 내부적으로 반복자를 사용함.

Iterator가 어떤 데이터 타입이 아니라 특정 메서드를 구현하면 iterator로 간주하는, 일종의 프로토콜임에 주의

---

파이썬이 객체 x를 반복할 때는 `iter(x)`를 호출한다. 그 내장 함수는 다음 과정을 수행

1. x가 `__iter__` 메서드를 구현하는지 확인한다. 구현한다면 그걸 호출해서 반복자를 얻는다.
2. `__iter__` 메서드가 없다면 x가 `__getitem__` 구현했는지 확인. 구현한다면 0부터 시작하는 인덱스를 사용해서 요소를 반환하는 반복자를 만든다.
3. 둘 다 없다면 x is not iterable 에러를 발생시킨다.

파이썬 표준 시퀀스(리스트 등)는 다 `__iter__`를 구현한다.(물론 `__getitem__`도 구현되어 있다)

그리고 `__getitem__` 만 구현해도 반복 가능은 맞는데 `isinstance()` 결과를 보면 `collections.abc.Iterable`이 아니다. `__iter__`를 구현해야 isinstance에서 `Iterable`로 인정받는다. 따라서 객체 x가 이터러블인지 확인하는 가장 확실한 방법은 현재로서는 `iter(x)`를 호출해보고 만일 발생하는 TypeError를 잡는 것이다.

# iter 함수

iter에 인자 2개를 전달하면 콜러블 객체에서 반복자를 생성 가능하다. 인자 없이 반복 호출해 값을 생성할 수 있는 콜러블이 첫번째 인수, 해당 값이 나왔을 때 반복을 멈추는 값(sentinel)이 두번째 인수다.

예를 들어, `iter(input, '')`는 빈 문자열이 나올 때까지 input()에서 값을 읽는 반복자를 만든다. 이때 sentinel 값이 나올 때까지 계속해서 콜러블이 호출되며, sentinel 값이 나오면 StopIteration이 발생하고 sentinel 값은 반복자에 포함되지 않는다. sentinel이 포함되지 않음에 주의한다.

파일이 끝날 때까지 고정 폭 블록을 읽는 등의 작업에 쓸 수 있다. iter의 첫 인수로 전달하는 함수는 인자를 받지 않는 함수여야 함에 유의한다.

```py
with open('data.bin', 'rb') as f:
    for block in iter(lambda: f.read(16), b''):
        process(block)
```

이때 한번 StopIteration까지 소진된 iterator는 재사용할 수 없다는 점에 유의한다. 다시 반복하려면 새로운 반복자를 만들어야 한다.

이런 인터페이스가 된 이유는, 모든 반복자를 재설정할 수는 없기 때문. 예를 들어 반복자가 네트워크 패킷을 읽고 있다면 재설정할 수 없을 것이다.

# 반복형 vs 반복자

iterator에는 `__iter__` 메서드가 있으므로 이터레이터는 이터러블임. 반면 이터레이터는 next, iter가 있으야 하므로 이터러블이라고 해서 이터레이터인 건 아님. 또한 이터러블을 이터레이터로 만드는 건 안티패턴이기도 함.

# 제너레이터로 반복자 구현

고전적인 이터레이터 패턴을 이용해 `Iterator` 클래스를 새로 만들 수도 있지만 제너레이터를 쓰는 게 더 쉽고 파이썬스러움. yield를 쓰면 된다.

이런 식으로

```py
def __iter__(self):
    for item in self.data:
        yield item
```

단 이것도 self.data를 늘 가져오므로 느긋하지는 않다. 제너레이터 표현식으로도 만들 수 있다. 이러면 느긋하게 평가된다.

```py
def __iter__(self):
    return (item for item in self.data)
```

그러나 실제로는 제너레이터 함수를 쓰는 편이 가독성에 좋긴 하다. 책에서는 여러 줄에 걸친 제너레이터 표현식의 경우 제너레이터 함수를 사용하라고 권장한다.

# 반복자 vs 제너레이터

반복자(이터레이터)는 `__next__` 를 구현하는 모든 객체에 대한 일반적인 용어다. 클라이언트에서 소비되는 데이터를 생성하도록 설계됨.

제너레이터는 파이썬 컴파일러가 생성한 이터레이터. `__next__` 대신 yield를 이용해 제너레이터 함수를 만든다. 제너레이터 함수는 제너레이터 객체를 생성하며 이 제너레이터 객체가 반복 가능한 객체이자 반복자.

# 등차수열 제너레이터 만들어보기

```py
class ArithmeticProgression:
    def __init__(self, begin, step, end=None):
        self.begin = begin
        self.step = step
        self.end = end # None이면 무한 수열

    def __iter__(self):
        resultType = type(self.begin + self.step)
        result=resultType(self.begin)
        forever=self.end is None
        idx=0
        while forever or result < self.end:
            yield result
            idx+=1
            result = self.begin + self.step * idx
```

이때 step 값을 계속 더하는 대신 begin + step \* idx로 계산하는 이유는, step이 부동소수점일 때 오차가 누적되는 것을 방지하기 위해서다. 물론 step이 정수라면 그냥 더해도 상관없지만, 일반적으로는 이렇게 하는 게 더 안전하다.

그러나 이런 식으로 제너레이터 생성만이 목적이라면 하나의 제너레이터 함수로 할 수 있다.

```py
def arithmetic_progression(begin, step, end=None):
    resultType = type(begin + step)
    result=resultType(begin)
    forever=end is None
    idx=0
    while forever or result < end:
        yield result
        idx+=1
        result = begin + step * idx
```

하지만 가장 쉬운 건 역시 표준 라이브러리의 `itertools`에서 제공하는 걸 쓰는 것이다. `itertools.count`나 `itertools.takewhile` 등. 반복할 때 뭔가 `itertools`, `functools` 모듈에서 제공하는 함수가 이미 있는 게 아닐지 한번 검토해보자. 제너레이터의 느긋한 계산을 잘 제공하니까

마음에 남는 건 `itertools.accumulate`, 내장 `enumerate`, `zip` 정도? 이외의 이터러블 받아서 값 하나 만들어주는 all, any, max, min, `functools.reduce`, sum 등은 알고 있던 부분

## 초기값을 나머지 값과 동일한 타입으로 만드는 법

https://marc.info/?l=python-list&m=141826925106951&w=2

TODO

# 서브제너레이터

yield from을 사용해서 제너레이터를 조합할 수 있다. 제너레이터가 다른 제너레이터에 작업을 위임하는 것도 가능하게 되었다.

```py
def sub_gen():
    yield "sub A"
    yield "sub B"

def gen():
    yield "A"
    yield from sub_gen()
    yield "B"

for i in gen():
    print(i) # A, sub A, sub B, B
```

즉 yield from은 잠시 함수를 중단시키고 다른 제너레이터를 호출한 뒤 그 제너레이터가 끝나면 다시 돌아와서 중단되었던 기존 함수를 이어서 실행한다.

서브제너레이터에 값이 있는 리턴문이 있다면 yield from 표현식의 값으로 평가됨

```py
def sub_gen():
    yield "sub A"
    yield "sub B"
    return "sub done"

def gen():
    yield "A"
    result = yield from sub_gen()
    # sub_gen()이 끝나고 result에는 반환값 sub done이 저장됨
    # result를 안쓰면 딱히 영향 없음
    print(f"Sub generator returned: {result}")
    yield "B"
```

yield from을 이용하면 트리를 순회하는 등의 작업을 쉽게 구현 가능. 그냥 매번 자식에 yield from을 호출하면 된다. 이때 자식 제너레이터가 끝나면 부모 제너레이터로 돌아와서 이어서 실행된다.

```py
def tree_gen(node):
    yield node.value
    for child in node.children:
        yield from tree_gen(child)
```

`A`에서 `yield from B`를 했다고 하자. 그러면 yield from은 A를 지나치고 B를 직접 클라이언트 코드에 연결한다. 이건 클라이언트 코드의 값을 소비할 때 중요해진다.

# 제너레이터와 코루틴

전문가를 위한 파이썬 2판 727p

- 제너레이터는 반복하기 위한 데이터를 생성한다
- 코루틴은 데이터의 소비자이며 반복과 관련이 없다
- 이 둘을 섞어서 생각하지 말 것
- 코루틴 안에서 yield가 값을 생성하도록 할 때가 있지만 이건 반복과 상관없다

제너레이터를 코루틴으로 사용하지 말자.. `.send()` 메서드로 next() 호출 같은 기능을 할 순 있는데 권장되지는 않는다.

제너레이터를 코루틴으로 사용하는 대신 `async`/`await` 구문을 사용하는 게 좋다. `async`/`await`는 파이썬 3.5에서 도입되었으며, 비동기 프로그래밍을 위한 표준 방식이 되었다. 다음 19장에서 자세히 알아본다.
