---
title: 수학 수식 테스트 문장들
description: 수학 수식 표기를 위한 katex 문법 테스트
---

## 1. 기본 산술 연산

기본적인 덧셈은 $a + b = c$로 표현할 수 있습니다.

뺄셈의 경우 $x - y = z$와 같이 쓸 수 있고, 곱셈은 $a \times b = ab$로 나타냅니다.

분수는 $\frac{a}{b} = c$처럼 표현됩니다.

## 2. 지수와 첨자

피타고라스 정리는 다음과 같이 표현됩니다:
$$x^2 + y^2 = z^2$$

수열의 합은 $a_1 + a_2 + \ldots + a_n$으로 쓸 수 있습니다.

오일러의 항등식은 수학에서 가장 아름다운 공식 중 하나입니다:
$$e^{i\pi} + 1 = 0$$

거듭제곱의 거듭제곱은 $x^{y^z} = x^{(y^z)}$로 표현합니다.

## 3. 제곱근과 n제곱근

두 점 사이의 거리는 $\sqrt{x^2 + y^2}$로 계산할 수 있습니다.

세제곱근의 예시로 $\sqrt[3]{27} = 3$이 있습니다.

분수의 제곱근은 다음과 같이 분리할 수 있습니다:
$$\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}$$

## 4. 복잡한 분수

연분수의 예시입니다:
$$\frac{1}{1 + \frac{1}{2 + \frac{1}{3 + \frac{1}{4}}}}$$

복잡한 분수식도 깔끔하게 표현됩니다:
$$\frac{a^2 + b^2}{c^2 - d^2}$$

## 5. 합계와 곱셈 기호

자연수의 합에 대한 공식은 다음과 같습니다:
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

팩토리얼은 곱셈 기호로 표현할 수 있습니다:
$$\prod_{i=1}^{n} i = n!$$

지수함수의 테일러 급수는 무한급수로 나타납니다:
$$\sum_{k=0}^{\infty} \frac{x^k}{k!} = e^x$$

## 6. 적분

정적분의 기본 예시입니다:
$$\int_0^1 x^2 \, dx = \frac{1}{3}$$

가우스 적분은 확률론에서 중요한 역할을 합니다:
$$\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}$$

선적분은 $\oint_C \mathbf{F} \cdot d\mathbf{r}$로 표현합니다.

이중적분은 영역 $D$에서 다음과 같이 계산됩니다:
$$\iint_D f(x,y) \, dx \, dy$$

## 7. 미분

함수의 도함수는 $\frac{df}{dx} = f'(x)$로 나타냅니다.

편미분은 $\frac{\partial f}{\partial x} + \frac{\partial f}{\partial y}$와 같이 표기합니다.

그래디언트 벡터는 다음과 같이 정의됩니다:
$$\nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z}\right)$$

## 8. 극한

삼각함수의 중요한 극한입니다:
$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

자연상수 $e$의 정의 중 하나는 다음과 같습니다:
$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

## 9. 행렬

2×2 행렬은 다음과 같이 표현됩니다:

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

더 큰 행렬의 예시입니다:

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

2×2 행렬의 행렬식은 다음과 같이 계산됩니다:

$$
\det\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
$$

## 10. 그리스 문자

그리스 문자를 사용한 간단한 식: $\alpha + \beta = \gamma$

이차방정식의 판별식은 $\Delta = b^2 - 4ac$입니다.

원의 넓이는 $\pi r^2$로 계산됩니다.

표본공간은 $\Omega = \{\omega : \omega \in \mathbb{R}\}$로 나타낼 수 있습니다.

## 11. 특수 함수

삼각함수의 합성공식입니다:
$$\sin(x) + \cos(x) = \sqrt{2}\sin\left(x + \frac{\pi}{4}\right)$$

로그의 밑 변환 공식: $\log_a b = \frac{\ln b}{\ln a}$

역탄젠트 함수의 덧셈공식은 다음과 같습니다:
$$\arctan(x) + \arctan(y) = \arctan\left(\frac{x+y}{1-xy}\right)$$

## 12. 집합 기호

합집합의 정의: $A \cup B = \{x : x \in A \text{ or } x \in B\}$

교집합의 정의: $A \cap B = \{x : x \in A \text{ and } x \in B\}$

수 체계의 포함관계는 다음과 같습니다:
$$\mathbb{R} \supset \mathbb{Q} \supset \mathbb{Z} \supset \mathbb{N}$$

## 13. 복잡한 수식

정규분포의 확률밀도함수는 다음과 같습니다:
$$f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

아인슈타인의 특수상대성이론에서 질량-에너지 등가성:
$$E = mc^2 = \frac{mc^2}{\sqrt{1-\frac{v^2}{c^2}}}$$

벡터장의 회전(curl)은 다음과 같이 계산됩니다:

$$
\nabla \times \mathbf{F} = \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\
F_x & F_y & F_z
\end{vmatrix}
$$

## 14. 경우 분할

절댓값 함수를 조각별로 정의하면:

$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

## 15. 연분수

원주율 $\pi$의 연분수 표현입니다:
$$\pi = 3 + \cfrac{1}{7 + \cfrac{1}{15 + \cfrac{1}{1 + \cfrac{1}{292 + \cfrac{1}{\ddots}}}}}$$

## 16. 큰 괄호

복잡한 지수식에서는 괄호 크기가 자동으로 조정됩니다:
$$\left(\frac{a}{b}\right)^{\left(\frac{c}{d}\right)}$$

집합의 표기에서도 큰 중괄호가 사용됩니다:
$$\left\{\frac{1}{n} : n \in \mathbb{N}\right\}$$

## 17. 화학 반응식

황산과 수산화나트륨의 중화반응입니다:
$$\text{H}_2\text{SO}_4 + 2\text{NaOH} \rightarrow \text{Na}_2\text{SO}_4 + 2\text{H}_2\text{O}$$

## 18. 물리학 공식

만유인력의 법칙: $F = G\frac{m_1 m_2}{r^2}$

단순조화운동의 미분방정식:
$$\frac{d^2x}{dt^2} = -\omega^2 x$$

## 19. 통계학

베이즈 정리는 조건부 확률의 핵심입니다:
$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

표준편차의 공식은 다음과 같습니다:
$$\sigma = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}$$

## 20. 최고난이도 수식

복잡한 적분과 급수가 결합된 수식입니다:
$$\int_{-\infty}^{\infty} \frac{e^{-x^2/2}}{\sqrt{2\pi}} \left[\sum_{n=0}^{\infty} \frac{(-1)^n}{n!} \left(\frac{x}{\sqrt{2}}\right)^{2n}\right] dx$$

## 인라인 수식 테스트

문장 중간에 아인슈타인의 $E = mc^2$ 공식이나 간단한 적분 $\int_0^1 x dx = \frac{1}{2}$ 같은 수식이 자연스럽게 들어가는지 확인해보세요.

이차방정식 $ax^2 + bx + c = 0$의 해는 $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$로 구할 수 있습니다.

## 마지막 테스트 수식들

바젤 문제의 해답:
$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$

지수함수의 극한 정의:
$$\lim_{n \to \infty} \left(1 + \frac{x}{n}\right)^n = e^x$$

이 모든 수식들이 제대로 렌더링되면 블로그의 수학 수식 표시 기능이 완벽하게 작동하는 것입니다!
