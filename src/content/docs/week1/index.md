---
title: "Git 되돌리기"
description: "AI가 작성한 문서를 여러 언어로 바꿔가며 Git의 세이브 포인트와 되돌리기를 체험합니다"
sidebar:
  order: 1
---

# Git: 코드의 세이브 포인트 만들기

> **오늘의 목표**: AI에게 "AI란 무엇인가" 문서를 여러 언어로 작성시키면서, Git으로 세이브 포인트를 만들고, 원하는 시점으로 되돌리는 연습을 합니다.

---

## Git이 뭔가요?

게임을 생각해볼게요. 어려운 보스 전 앞에서 우리는 저장을 합니다. 죽어도 여러 번 도전해도 괜찮죠. 다시 불러오면 되니까요.

코딩도 똑같습니다. 코드를 고치다가 "어, 이전 게 나았는데..." 싶을 때, 새 기능을 추가했더니 아예 작동이 안 될 때 — 세이브 포인트가 있으면 두렵지 않습니다.

Git이 없던 시절엔 이렇게 했습니다:

```
보고서_최종.docx
보고서_최종_진짜최종.docx
보고서_최종_진짜진짜최종_수정완료.docx
```

Git은 이 혼란을 끝내줍니다. 파일 하나로, 원하는 순간마다 세이브 포인트를 만들고, 언제든 돌아갈 수 있습니다.

---

## 설치 & 초기 설정 (처음 한 번만)

### Git 설치하기

#### Windows (scoop 이용)
```powershell
scoop install git
```
scoop이 없다면 2주차 패키지 관리자 가이드를 참고하세요.

#### Windows (winget 이용)
```powershell
winget install --id Git.Git -e --source winget
```

#### macOS (Homebrew 이용)
```bash
brew install git
```

### 설치 확인

```bash
git --version
```

`git version 2.x.x` 같은 숫자가 나오면 성공입니다.

### 내 이름 등록하기

세이브 포인트마다 "누가 저장했는지" 기록되는 도장 같은 겁니다.

```bash
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"
```

잘 들어갔는지 확인:
```bash
git config --list
```

---

## 시나리오: AI 설명 문서를 여러 언어로 만들기

오늘의 실습 흐름은 이렇습니다:

```
한글 문서 작성 → 커밋
    ↓
영어로 교체 → 커밋
    ↓
중국어 추가 → 커밋
    ↓
일본어 추가 → 커밋
    ↓
커밋 기록 확인 → 원하는 시점으로 되돌리기!
```

AI(ChatGPT, Claude 등)에게 문서를 만들어달라고 요청하면서 진행합니다. **Git을 배우는 게 목적**이니까, 문서 내용은 AI가 알아서 써주면 됩니다.

---

### STEP 1: 프로젝트 폴더 만들고 Git 시작하기

```bash
mkdir ai-docs
cd ai-docs
git init
```

**지금 무슨 일이 일어났나요?**

`ai-docs` 폴더가 생기고, 그 안에 `.git`이라는 숨김 폴더가 만들어졌습니다. 이제부터 이 폴더 안의 모든 변화를 Git이 추적할 수 있습니다.

---

### STEP 2: 한글 문서 작성 → 첫 번째 커밋

AI에게 이렇게 요청하세요:

> "AI란 무엇인가를 설명하는 짧은 글을 한글로 써줘. 3~5문장이면 돼."

받은 내용을 `ai-intro.txt` 파일로 저장합니다. 예를 들면:

```
인공지능(AI)은 인간의 학습, 추론, 판단 능력을 컴퓨터로 구현한 기술입니다.
최근에는 대규모 언어 모델(LLM)의 발전으로 자연어 대화가 가능해졌습니다.
AI는 의료, 교육, 창작 등 다양한 분야에서 활용되고 있습니다.
```

파일을 저장했으면 Git으로 세이브 포인트를 만듭니다:

```bash
git add ai-intro.txt
git commit -m "한글 버전 작성"
```

#### 지금 상태 확인

```bash
git log --oneline
```

```
a1b2c3d 한글 버전 작성
```

세이브 포인트가 하나 생겼습니다!

---

### STEP 3: 영어 버전으로 교체 → 두 번째 커밋

AI에게 이렇게 요청하세요:

> "같은 내용을 영어로 다시 써줘."

받은 영어 내용으로 `ai-intro.txt`를 **통째로 교체**합니다:

```
Artificial Intelligence (AI) is a technology that implements human learning,
reasoning, and judgment capabilities through computers.
Recent advances in Large Language Models (LLMs) have enabled natural
language conversations.
AI is being utilized in various fields including healthcare, education,
and creative arts.
```

변경사항을 확인해봅시다:

```bash
git diff
```

한글이 `-`(빨간색)로, 영어가 `+`(초록색)로 표시됩니다. "이전 세이브와 지금이 어떻게 다른지"를 보여주는 겁니다.

> VS Code나 Cursor의 소스 제어 패널에서 파일을 클릭하면 보이는 빨간/초록 비교 화면이 바로 이 `git diff`의 GUI 버전입니다. 같은 원리예요.

```bash
git add ai-intro.txt
git commit -m "영어 버전으로 교체"
```

---

### STEP 4: 중국어 버전 추가 → 세 번째 커밋

이번엔 파일을 교체하지 말고, **아래에 추가**합니다.

AI에게 요청:

> "같은 내용을 중국어로도 써줘."

받은 중국어를 `ai-intro.txt` 맨 아래에 붙여넣습니다:

```
---
人工智能（AI）是一种通过计算机实现人类学习、推理和判断能力的技术。
近年来，大型语言模型（LLM）的发展使自然语言对话成为可能。
AI正在医疗、教育、创作等多个领域得到广泛应用。
```

```bash
git add ai-intro.txt
git commit -m "중국어 버전 추가"
```

---

### STEP 5: 일본어 버전 추가 → 네 번째 커밋

같은 방식으로 일본어도 추가합니다.

AI에게 요청:

> "같은 내용을 일본어로도 써줘."

받은 일본어를 `ai-intro.txt` 맨 아래에 붙여넣습니다:

```
---
人工知能（AI）は、人間の学習・推論・判断能力をコンピュータで実現する技術です。
近年、大規模言語モデル（LLM）の発展により、自然言語での対話が可能になりました。
AIは医療、教育、創作など、さまざまな分野で活用されています。
```

```bash
git add ai-intro.txt
git commit -m "일본어 버전 추가"
```

---

### STEP 6: 커밋 기록 확인하기 (핵심!)

이제 우리가 만든 세이브 포인트 전체를 살펴봅시다:

```bash
git log --oneline
```

```
d4e5f6a 일본어 버전 추가
c3d4e5f 중국어 버전 추가
b2c3d4e 영어 버전으로 교체
a1b2c3d 한글 버전 작성
```

4개의 세이브 포인트가 쌓여 있습니다. 각각의 시점에서 파일이 어떤 상태였는지 Git이 전부 기억하고 있어요.

더 자세한 기록을 보고 싶다면:

```bash
git log
```

커밋마다 누가, 언제 저장했는지까지 표시됩니다. (`q`를 누르면 빠져나옵니다)

#### 특정 커밋의 상세 내용 보기

커밋 ID를 지정하면 그 커밋에서 **누가, 언제, 뭘 바꿨는지** 한꺼번에 볼 수 있습니다:

```bash
git show b2c3d4e
```

```
commit b2c3d4e
Author: 홍길동 <hong@example.com>
Date:   Tue Mar 11 14:30:00 2026 +0900

    영어 버전으로 교체

diff --git a/ai-intro.txt b/ai-intro.txt
- 인공지능(AI)은 인간의 학습, 추론, 판단 능력을...
+ Artificial Intelligence (AI) is a technology that...
```

윗부분은 커밋 정보(누가, 언제, 메시지), 아랫부분은 그 커밋에서 바뀐 내용(diff)입니다. 파일이 여러 개 변경되었다면 모든 파일의 diff가 나옵니다.

변경된 **파일 목록만** 간단히 보고 싶다면:

```bash
git show --stat b2c3d4e
```

```
 ai-intro.txt | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
```

어떤 파일이 몇 줄 바뀌었는지만 한눈에 보여줍니다.

그리고 그 시점의 **파일 내용 전체**만 보고 싶다면 `:파일명`을 붙입니다:

```bash
git show b2c3d4e:ai-intro.txt
```

이렇게 하면 diff 없이 그 커밋 시점의 파일 원문이 출력됩니다.

---

### STEP 7: 되돌리기 실습 — 시간 여행하기

이제 진짜 중요한 부분입니다. **원하는 시점으로 돌아가봅시다.**

#### 실습 A: "한글만 있던 시절"로 파일 들여다보기

```bash
git show a1b2c3d:ai-intro.txt
```

> `a1b2c3d` 자리에 본인의 첫 번째 커밋 ID를 넣으세요. `git log --oneline`에서 확인할 수 있습니다.

한글만 있던 초기 상태의 내용이 화면에 출력됩니다. 현재 파일은 바뀌지 않아요 — 과거를 **구경만** 하는 겁니다.

#### 실습 B: "영어 버전"으로 파일을 실제로 되돌리기

중국어, 일본어를 다 추가했지만, "영어만 있던 상태가 더 깔끔했는데..." 싶을 때:

```bash
git restore --source b2c3d4e ai-intro.txt
```

> `b2c3d4e` 자리에 "영어 버전으로 교체" 커밋의 ID를 넣으세요.

파일을 열어보세요. **영어만 남아 있습니다.** 중국어, 일본어가 사라졌어요.

아직 커밋을 안 했으니, 마음이 바뀌면 최신 상태로 되돌릴 수 있습니다:

```bash
git restore ai-intro.txt
```

다시 4개 국어가 전부 들어있는 최신 상태로 돌아옵니다.

#### 실습 C: 실수를 커밋까지 해버렸을 때

일부러 파일을 망가뜨리고 커밋해봅시다:

```bash
echo "실수로 전부 지워버렸다!" > ai-intro.txt
git add ai-intro.txt
git commit -m "실수: 파일 내용 삭제"
```

```bash
git log --oneline
```

```
e5f6a7b 실수: 파일 내용 삭제
d4e5f6a 일본어 버전 추가
c3d4e5f 중국어 버전 추가
b2c3d4e 영어 버전으로 교체
a1b2c3d 한글 버전 작성
```

커밋까지 해버렸으니 `git restore`로는 안 됩니다. 이때는:

```bash
git revert HEAD
```

에디터가 열리면 그냥 저장하고 닫으세요. (vim이면 `Esc` → `:wq` → Enter)

파일을 확인해보면 — 4개 국어가 전부 돌아와 있습니다!

```bash
git log --oneline
```

```
f6a7b8c Revert "실수: 파일 내용 삭제"
e5f6a7b 실수: 파일 내용 삭제
d4e5f6a 일본어 버전 추가
...
```

`git revert`는 과거 기록을 지우지 않고, **되돌리는 커밋을 하나 더 만드는** 방식입니다. "실수했다가 되돌렸다"는 기록이 남아있어요.

---

### STEP 8: 실험 브랜치 — 망해도 괜찮은 놀이터

지금까지는 메인 도로(`main`)에서만 작업했어요. 이제 **샛길**을 만들어볼 겁니다. 이게 바로 **브랜치**입니다.

> 상황: "스페인어와 아랍어도 추가해보고 싶은데, 메인 파일은 건드리기 싫어."

#### 새 브랜치 만들고 이동하기

```bash
git checkout -b experiment-languages
```

`main` 브랜치를 그대로 두고, 복사본인 `experiment-languages` 브랜치로 이동했습니다. 여기서 아무리 바꿔도 `main`은 안전합니다.

#### 브랜치에서 실험하기

AI에게 스페인어, 아랍어 버전도 받아서 `ai-intro.txt`에 추가해보세요. 커밋도 해보세요:

```bash
git add ai-intro.txt
git commit -m "스페인어, 아랍어 실험 추가"
```

#### 실험이 마음에 안 들면 — main으로 돌아가기

```bash
git checkout main
```

`ai-intro.txt`를 열어보세요. 스페인어, 아랍어가 없습니다. **main은 건드리지 않았으니까요.**

#### 실험 브랜치 정리하기

```bash
git branch -d experiment-languages
```

#### 실험이 마음에 들면 — main에 합치기

```bash
# main 브랜치에 있는 상태에서
git merge experiment-languages
```

오늘은 합치지 않아도 됩니다. "이런 게 된다"는 것만 알아두세요.

---

## 오늘 배운 것 정리

| 상황 | 명령어 | 설명 |
|------|--------|------|
| Git 시작 | `git init` | 이 폴더를 Git이 감시하게 함 |
| 상태 확인 | `git status` | 뭐가 바뀌었는지 확인 |
| 변경사항 비교 | `git diff` | 마지막 커밋 이후 바뀐 내용 보기 |
| 세이브 예약 | `git add 파일명` | 다음 세이브에 포함할 파일 지정 |
| 세이브 포인트 만들기 | `git commit -m "메모"` | 세이브 포인트 생성 |
| 기록 보기 | `git log --oneline` | 세이브 포인트 목록 보기 |
| 과거 내용 구경 | `git show 커밋ID:파일명` | 파일을 바꾸지 않고 과거 내용만 확인 |
| 특정 시점으로 복원 | `git restore --source 커밋ID 파일명` | 파일을 특정 커밋 상태로 되돌리기 |
| 커밋 전 되돌리기 | `git restore 파일명` | 파일을 마지막 커밋 상태로 복원 |
| 커밋 후 되돌리기 | `git revert HEAD` | 되돌리는 커밋 추가 |
| 새 브랜치 만들기 | `git checkout -b 이름` | 실험 공간 만들기 |
| 브랜치 이동 | `git checkout 이름` | 다른 브랜치로 전환 |

---

## 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| `fatal: not a git repository` | `git init`을 안 한 폴더 | 폴더 위치 확인 후 `git init` 실행 |
| 커밋 메시지 입력 화면에 갇힘 | `-m`을 빼먹고 `git commit`만 침 | `Esc` → `:q!` → Enter로 탈출 |
| `nothing to commit` | 변경한 게 없거나 `git add`를 안 함 | 파일 수정 후 `git add` 먼저 |
| 한글 파일명 깨짐 | Windows 인코딩 문제 | 가급적 영어 파일명 사용 |
| `git log`에서 못 나옴 | 긴 기록을 보는 중 | `q`를 누르면 빠져나옴 |

---

## .gitignore — 기록에서 제외하기

프로젝트를 하다 보면 기록에 남기고 싶지 않은 파일이 생깁니다. 비밀번호가 담긴 파일이나 용량이 큰 설정 파일 같은 것들입니다.

`.gitignore`라는 파일을 만들어서 무시할 파일명을 적어두면, Git이 알아서 제외합니다.

```bash
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
```

---

## Git 기록 완전 삭제

프로젝트를 처음부터 다시 시작하고 싶다면, 폴더 안의 `.git` 폴더를 삭제하면 됩니다. 현재 파일들은 그대로 남되, Git이 관리하던 모든 세이브 기록만 사라집니다. 세이브 파일만 지우고 게임은 계속 켜두는 것과 같습니다.

**기록을 지우는 일은 되돌릴 수 없으니 주의하세요.**
