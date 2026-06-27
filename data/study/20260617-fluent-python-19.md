---
title: 전문가를 위한 파이썬 19장
description: 파이썬 동시성 모델
---

여기서는 파이썬이 한 번에 여러 가지 일을 하도록 하는 방법을 다룬다. 그게 실제로 병렬 처리든 번갈아서 실행하는 것이든 간에.

함수를 호출하면 기존의 맥락은 멈추고 함수의 맥락이 실행된다. 따라서 함수 호출에 대한 걸 다루는 건 쉽다. 그러나 스레드, 프로세스를 시작할 때는 그렇지 않다. 스레드를 시작한 A 코드에서 스레드 B의 작업이 완료되었는지 자동으로 알 수 있는 방법은 없다. 별도의 실행 흐름이니까. 따라서 통신 채널을 설정해야 한다. 메시지, 큐 등을 사용한다.

파이썬 코루틴과 스레드를 다루는 것도 역시 어려운데 이에 대해 알아본다.

## GIL

객체 참조 수, 인터프리터 내부 상태 접근은 글로벌 인터프리터 락(GIL)으로 보호된다. 언제나 하나의 파이썬 스레드만 GIL을 잡을 수 있다. CPU 코어 수에 상관없이.

단 어떤 스레드가 gil을 무한히 잡는 걸 방지하기 위해 파이썬 인터프리터는 스레드를 5ms(`sys.getswitchinterval()`로 변경 가능)마다 강제로 해제하고 스케줄링을 다시 한다.

파이썬 코드에서 GIL을 제어할 수는 없고 C 내장함수, 확장 모듈에서는 GIL을 해제할 수 있다. 디스크, 네트워크 I/O 등 시스템 호출 함수들은 GIL을 해제한다. numpy 등의 cpu 바운드 작업을 하는 라이브러리도 GIL을 해제한다.

다중 코어 컴퓨팅을 위해선 `multiprocessing` 이나 `concurrent.futures.ProcessPoolExecutor`를 사용해야 한다.

GIL이 파이썬 언어 정의에 속한 건 아니고 CPython에 속하며 Jython, IronPython에는 GIL이 없다. 하지만 CPython이 가장 널리 쓰이므로 GIL은 파이썬의 특징으로 여겨진다.

또한 비동기 프로그램에서는 여러 스레드를 쓸 수 있지만 스레드 하나가 이벤트 루프와 모든 코루틴을 실행하고, 나머지 스레드는 특정 작업만 처리하게 하는 게 좋다고 한다.

## 스레드

파이썬에는 스레드 종료 API가 없다. 종료를 위해서는 반드시 메시지를 보내야 함

`threading.Event` 는 스레드 제어 신호를 보내는 가장 간단한 방법.

`Event`는 처음 생성되면 false 상태다. `Event.set()`을 호출하면 True가 된다. 해당 플래그가 false인 동안 스레드가 `Event.wait()`을 호출하면 해당 스레드는 블록된다. 다른 스레드에서 `Event.set()`을 호출하면 블록된 스레드는 깨어나 다시 실행된다.

예를 들면 이런 식이다. 워커 함수는 내부에서 Event가 set될때까지 계속 일한다. 외부에서 `Event.set()`을 호출하면 워커가 멈춘다. 이런 식으로 Event를 통해 스레드 제어 신호를 보낸다.

```python
import time
from threading import Thread, Event

def worker(done: Event) -> None:
    while not done.is_set():      # done이 False인 동안 계속 돈다
        print("일하는 중...")
        time.sleep(0.5)
    print("멈춤!")

done = Event()
t = Thread(target=worker, args=(done,))
t.start()        # 스레드 시작 → worker가 돌기 시작

time.sleep(2)    # 메인은 2초 동안 sleep
done.set()       # "멈춰" 신호 → worker의 while 조건이 False 됨
t.join()         # worker 끝날 때까지 대기
print("끝")
```

Event 말고도 queue나 Lock을 사용할 수도 있다.

## 프로세스

`multiprocessing` 모듈은 스레드 대신 프로세스를 사용한다. `multiprocessing.Process` 인스턴스는 완전히 새로운 파이썬 인터프리터가 자식 프로세스로 시작된다. GIL도 고유하게 존재한다. 따라서 모든 CPU 코어 활용 가능. 단 API는 `threading.Thread`와 유사하다.

단 구현은 아주 다르다. 프로세스 간 통신은 스레드 간에서보다 좀 더 어렵기 때문에 프로세스 경계를 넘어가는 객체의 직렬화 등도 들어가고. 예를 들어 `multiprocessing.syncronize.Event`는 threading.Event와 API는 같지만 구현은 완전히 다르다. `multiprocessing` 모듈의 이벤트는 세마포어로 구현되었다.

코루틴을 이용해서도 비동기 프로그래밍 가능하다. os 스케줄러가 관리하는 스레드/프로세스와 달리 코루틴은 파이썬 이벤트 루프가 관리한다. 이벤트 루프는 코루틴을 하나씩 실행하고 코루틴의 이벤트를 감시하고, 이벤트 발생시 코루틴에 제어권을 전달한다. 이들은 모두 싱글스레드에서 실행된다. JS의 이벤트 루프와 비슷함.

## 코루틴 비동기

`async def` 로 함수를 선언하면 해당 함수는 코루틴 객체를 반환한다. 이걸 실행하는 주요 방법은 3가지 있음

- `asyncio.run(코루틴 객체)`: 새 이벤트 루프를 만들고 전달받은 코루틴 객체(객체 내부의 await들까지)를 실행하고 그게 끝날 때까지 이벤트 루프를 운영
- `await 코루틴 객체`: 현재 실행 중인 코루틴 안에서 다른 코루틴을 실행하고 결과를 기다린다
- `asyncio.create_task(코루틴 객체)`: 코루틴 객체를 Task로 감싸서 현재 이벤트 루프에 등록(예약)하고, 현재 코루틴은 바로 다음 줄로 진행한다.

create_task는 코루틴을 예약만 하고, await은 결과까지 기다린다. `create_task`로 만든 건 await을 해서 결과를 가져올 수 있다. 둘의 차이에 대해서는 https://passwd.tistory.com/entry/Python-%EB%B9%84%EB%8F%99%EA%B8%B0-asynciocreatetask 참고.

이때 `asyncio.run`은 인자로 받은 코루틴 객체가 리턴한 값을 똑같이 리턴한다.

또 코루틴 내에서 일정 시간을 멈추고 싶으면 `time.sleep()` 대신 `await asyncio.sleep()`을 사용해야 한다. `time.sleep()`은 이벤트 루프 자체를 멈추게 하기 때문이다. 예를 들어 다음 코드는 3초 걸린다. 분명 `asyncio.gather`로 동시에 실행되는데도 각 bad 함수의 `time.sleep(1)`이 이벤트 루프 자체를 멈추기 때문이다.

```python
import asyncio
import time

async def bad(name):
    print(f"{name} 시작")
    time.sleep(1)
    print(f"{name} 끝")

async def main():
    await asyncio.gather(
        bad("A"),
        bad("B"),
        bad("C"),
    )

asyncio.run(main())
```

이런 식으로 해야 한다.

```python
import asyncio

async def good(name):
    print(f"{name} 시작")
    await asyncio.sleep(1)
    print(f"{name} 끝")

async def main():
    await asyncio.gather(
        good("A"),
        good("B"),
        good("C"),
    )

asyncio.run(main())
```

`await asyncio.sleep()`는 이벤트 루프를 멈추지 않고, 현재 코루틴을 일시 중단하고 제어권을 이벤트 루프에 반환한다.

근데 이렇게 asyncio를 써도 CPU 바운드 작업을 하는 코루틴은 이벤트 루프를 멈추게 한다. 따라서 CPU 바운드 작업은 프로세스를 이용해서 병렬로 처리하는 게 좋다. `ProcessPoolExecutor` 등을 이용할 수 있다고 한다.

임시 방편으로는 중간중간 `await asyncio.sleep(0)`을 넣어서 이벤트 루프에 제어권을 반환하게 할 수도 있다. 하지만 이건 임시 방편일 뿐이다.

## 파이썬의 이유

근데 GIL같은 제약 사항에도 불구하고 파이썬은 번창 중이다. 왜 그럴까? go같이 비동기나 멀티코어 프로그래밍이 더 쉬운 언어도 있는데.
