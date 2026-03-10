---
title: golang을 공부하면서 보았던 추가 자료들을 정리
description: golang을 공부하면서 궁금증을 해소하기 위해 보았던 아티클들
---

## 상속보다는 합성을 사용하기

[상속보다는 조합(Composition)을 사용하자.](https://tecoble.techcourse.co.kr/post/2020-05-18-inheritance-vs-composition/)

상위 클래스 구현이 하위 클래스에 노출되는 상속은 오히려 캡슐화를 깨뜨린다. 예를 들어 다음과 같은 생성자를 갖는 `Animal` 클래스가 있다고 하자.

```ts
class Animal {
  constructor(public sounds: string[]) {
    this.sounds = sounds;
  }
}
```

이를 상속받는 `Dog`, `Cat` 클래스는 이름까지 해서 생성자를 다음과 같이 작성할 것이다. 또한 sounds를 이용하는 메서드도 넣어보낟.

```ts
class Dog extends Animal {
  constructor(
    public name: string,
    sounds: string[],
  ) {
    super(sounds);
    this.name = name;
  }

  bark() {
    console.log(this.sounds.join(","));
  }
}

class Cat extends Animal {
  constructor(
    public name: string,
    sounds: string[],
  ) {
    super(sounds);
    this.name = name;
  }

  meow() {
    console.log(this.sounds.join(","));
  }
}
```

근데 만약 `sounds`에 대한 요구사항이 `Set<string>`이 된다면? `Animal` 클래스의 생성자와 메서드가 모두 바뀌어야 한다. 또 js는 상속된 클래스의 생성자에서 `super`를 호출해야 하기 때문에 하위 클래스는 이런 상위 클래스의 변경사항에 영향을 받을 수밖에 없다. 상속구조가 깊을수록 이건 심화된다.

그 대신 합성(composition)을 사용하면? 기존 클래스를 새 클래스의 구성 요소로 쓰면 된다. 그러니까 `Animal` 클래스는 `Dog`, `Cat` 클래스의 구성 요소가 된다. 이렇게 하면 `Animal` 클래스의 변경사항이 `Dog`, `Cat` 클래스에 영향을 주지 않는다.

```ts
class Dog {
  #animal: Animal;

  constructor(
    public name: string,
    public sounds: string[],
  ) {
    this.name = name;
    this.#animal = new Animal(sounds);
  }
}
```

그리고 Animal의 메서드가 필요할 때는 `this.#animal.메서드()`와 같이 호출하면 된다. 이렇게 하면 `Animal` 클래스의 변경사항이 `Dog`, `Cat` 클래스에 영향을 주지 않는다. 또 Dog, Cat 클래스는 Animal 클래스(기존 클래스)의 구현에 의존하지 않게 된다.

확장을 고려하고 설계한 `is-a` 관계이며 변하기 쉽지 않을 때(예를 들어 `Dog`은 `Animal`이다) 상속이 유용할 수 있다. 개가 동물이 아니게 될 일이 뭐가 있겠는가. 하지만 이런 고려가 없이 단순히 코드 재사용을 막기 위해, 혹은 공통된 부분을 추출하기 위해 상속을 사용하는 것은 피해야 한다. 상속은 코드 재사용을 위한 수단이 아니라, 객체 간의 관계를 표현하기 위한 수단이기 때문이다. 그럴때는 합성(composition)을 사용하자.
