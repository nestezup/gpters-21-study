---
title: "4주 마스터 가이드"
description: "4주간의 커리큘럼과 실습 내용 총정리"
sidebar:
  order: 2
---

# 망해도 괜찮아: 4주 마스터 가이드

> 바이브코딩 입문자를 위한 용어정리 + 실습 예제 통합 가이드
> 스터디 기간: 3/16(월) ~ 4/13(월) | 카테고리: 개발&자동화 | 난이도: 입문 🐥

---

## 핵심 컨셉

> **"Ctrl+Z가 안 되는 영역에서 되돌리기"**

코드, 환경, OS — 세 가지 레이어에서 각각 되돌리기 포인트를 만들고, 망가뜨려도 복구할 수 있는 능력을 기릅니다.

| 레이어 | 도구 | 되돌리기 방법 |
|--------|------|--------------|
| 코드 | Git | `git checkout`, `git reset` → 커밋 단위로 복원 |
| 환경 | Docker | 컨테이너 삭제 후 이미지로 재생성 |
| 환경 | WSL | `wsl --unregister` 후 재설치 또는 백업 복원 |
| 환경 | fnm | `fnm uninstall` 후 다른 버전 설치 |
| OS | UTM/VMware/Hyper-V | 스냅샷으로 원하는 시점으로 복원 |

---

## 기본 용어 (전체 주차 공통)

### 터미널 (Terminal)
컴퓨터에 **글자로 명령을 내리는 창**. 마우스로 클릭하는 대신, 텍스트를 입력해서 파일을 만들거나 프로그램을 실행한다.
- Windows: PowerShell, 명령 프롬프트
- macOS: 터미널(Terminal.app)

### 패키지 관리자 (Package Manager)
프로그램을 **한 줄 명령어로 설치·삭제·업데이트**하는 도구. 앱스토어의 터미널 버전이라고 생각하면 된다.
- Windows: scoop
- macOS: Homebrew (brew)

### 플레이그라운드 (Playground)
**자유롭게 실험할 수 있는 연습 환경**. 망가뜨려도 되돌릴 수 있으니 부담 없이 시도할 수 있다.

### 바이브코딩 (Vibe Coding)
AI에게 자연어로 원하는 것을 설명하면, AI가 코드를 작성해주는 방식의 개발. 코드를 한 줄씩 외워서 타이핑하는 게 아니라, **"이런 거 만들어줘"**라고 말하면 만들어진다.

---

# 1주차: 시작 — Git으로 첫 되돌리기 포인트 만들기

> OT + Git 되돌리기 실습. 커밋 → 수정 → 복원 흐름을 직접 경험.

## 1주차 용어정리

### Git
코드의 **변경 이력을 기록하는 도구**. 세이브 포인트를 만들어 두고, 언제든 과거 상태로 돌아갈 수 있다. 파일 이름을 `보고서_최종_진짜최종.docx`로 바꿔가며 관리하던 시절을 끝내주는 도구.

### 커밋 (Commit)
Git에서 만드는 **하나의 세이브 포인트**. "여기까지는 잘 되니까 저장해두자"라는 의미.
```bash
git commit -m "로그인 기능 완성"
```

### 리포지토리 (Repository, 줄여서 repo)
Git이 관리하는 **프로젝트 폴더**. 코드 + 모든 변경 이력이 들어 있다.
- **로컬 리포지토리**: 내 컴퓨터에 있는 것
- **원격 리포지토리**: GitHub 같은 서버에 있는 것

### .git 폴더
Git이 모든 이력을 저장하는 **숨김 폴더**. `git init`을 하면 자동으로 생긴다. 이 폴더를 지우면 모든 세이브 기록이 사라진다.

### 스테이징 (Staging)
세이브 포인트를 만들기 전, 어떤 파일을 포함할지 **골라서 바구니에 담는 과정**. `git add` 명령어로 수행한다.

### 브랜치 (Branch)
하나의 프로젝트에서 **갈래를 나눠서 작업**하는 것. 원본을 건드리지 않고 실험할 수 있다.

### .gitignore
Git에게 "이 파일은 무시해"라고 알려주는 설정 파일. 비밀번호 파일이나 용량이 큰 파일을 기록에서 제외할 때 사용한다.

## 1주차 실습 예제

### 예제 1: Git 설치하고 확인하기

**Windows (scoop):**
```powershell
scoop install git
```

**Windows (winget):**
```powershell
winget install --id Git.Git -e --source winget
```

**macOS (Homebrew):**
```bash
brew install git
```

**설치 확인:**
```bash
git --version
# → git version 2.43.0 같은 숫자가 나오면 성공!
```

### 예제 2: 이름과 이메일 등록하기
```bash
git config --global user.name "내이름"
git config --global user.email "이메일@example.com"

# 잘 들어갔는지 확인
git config --list
```

### 예제 3: 첫 번째 세이브 포인트 만들기

```bash
# 1) 연습용 폴더 만들기
mkdir my-first-project
cd my-first-project

# 2) Git 시작하기 — "이 폴더를 Git으로 관리하겠다"
git init
# → Initialized empty Git repository 라고 나오면 성공

# 3) 파일 만들기
echo "안녕하세요" > hello.txt

# 4) 상태 확인 — Git이 이 파일을 발견했는지 보기
git status
# → 빨간색으로 hello.txt가 보임 (아직 바구니에 안 담음)

# 5) 세이브 준비 (스테이징) — 바구니에 담기
git add hello.txt
git status
# → 초록색으로 변함 (세이브 준비 완료!)

# 6) 세이브! (커밋)
git commit -m "첫 번째 파일 추가"

# 7) 기록 확인
git log --oneline
# → abc1234 첫 번째 파일 추가
```

### 예제 4: 되돌리기 실습 — 망가뜨리고 복구하기

```bash
# 파일을 망가뜨려보자
echo "파일을 망가뜨렸어요" > hello.txt
cat hello.txt
# → "파일을 망가뜨렸어요" (원래 내용 사라짐!)

# Git으로 되돌리기 — 마지막 세이브 상태로 복구
git checkout -- hello.txt
cat hello.txt
# → "안녕하세요" (복구됨! 마법처럼!)
```

### 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| `fatal: not a git repository` | `git init`을 안 한 폴더 | 폴더 위치 확인 후 `git init` 실행 |
| 커밋 메시지 입력 화면에 갇힘 | `-m`을 빼먹고 `git commit`만 침 | `Esc` → `:q!` → Enter로 탈출 |
| `nothing to commit` | 변경한 게 없거나 `git add`를 안 함 | 파일 수정 후 `git add` 먼저 |
| 한글 파일명 깨짐 | Windows 인코딩 문제 | 가급적 영어 파일명 사용 |

### 핵심 명령어 요약

| 명령어 | 역할 | 비유 |
|--------|------|------|
| `git init` | Git 저장소 시작 | 게임 시작 + 자동저장 활성화 |
| `git status` | 상태 확인 | 세이브되지 않은 변경사항 확인 |
| `git add [파일]` | 스테이징 | 세이브할 항목 바구니에 담기 |
| `git commit -m "[메시지]"` | 커밋 | 설명 적고 세이브 포인트 생성 |
| `git log --oneline` | 기록 확인 | 세이브 목록 열람 |
| `git checkout -- [파일]` | 파일 되돌리기 | 마지막 세이브 시점으로 복구 |

---

# 2주차: 환경 — 날리고 다시 만들기

> scoop/brew로 깔끔한 설치 환경 만들기 + fnm으로 Node.js 버전 관리 + WSL 설치 & 되돌리기

## 2주차 용어정리

### scoop (Windows용 패키지 관리자)
Windows 터미널에서 프로그램을 **한 줄로 설치·삭제**하는 도구. 설치된 프로그램이 사용자 폴더 아래로 정리되어 시스템을 깨끗하게 유지한다.
```powershell
scoop install git     # 설치
scoop uninstall git   # 삭제 — 찌꺼기 없이 깔끔
```

### Homebrew (macOS용 패키지 관리자)
맥에서 표준처럼 사용되는 패키지 관리자. "맥에 빠진 패키지 관리자"라는 별칭.
```bash
brew install git     # 설치
brew uninstall git   # 삭제
```

### Node.js
JavaScript를 브라우저 밖에서도 실행할 수 있게 해주는 **실행 환경(런타임)**. 바이브코딩 도구들(Claude Code 등)이 이 위에서 돌아간다.

### 런타임 (Runtime)
프로그래밍 언어로 작성한 코드를 **실제로 실행해주는 환경**. Node.js는 JavaScript의 런타임.

### fnm (Fast Node Manager)
Node.js의 **버전을 여러 개 설치하고 전환**하는 도구. 프로젝트마다 다른 버전이 필요할 때, 옷을 갈아입듯이 버전을 바꿀 수 있다.
```bash
fnm install 22    # 22 버전 설치
fnm use 22        # 22 사용
fnm use 20        # 20으로 전환 — 되돌리기!
```

### LTS (Long Term Support)
오랫동안 안정적으로 지원되는 버전. 특별한 이유가 없다면 항상 LTS 선택이 안전하다.

### npm (Node Package Manager)
Node.js에서 사용할 수 있는 다양한 부품(패키지)을 가져오는 도구. Node.js를 설치하면 함께 설치된다.

### WSL (Windows Subsystem for Linux)
Windows 안에서 **Linux를 바로 실행**하는 기능. 가상머신보다 훨씬 가볍다. Windows 사용자만 해당 (Mac은 이미 유닉스 기반이므로 불필요).
```powershell
wsl --install          # 설치
wsl --export Ubuntu backup.tar   # 백업
wsl --unregister Ubuntu          # 삭제 (되돌리기)
wsl --import Ubuntu C:\wsl backup.tar  # 복원
```

### 환경 변수 (Environment Variable)
컴퓨터가 프로그램을 찾고 실행하기 위해 참고하는 **설정값**. 패키지 관리자가 이걸 자동으로 처리해준다.

### 셸 설정 파일 (.bashrc / .zshrc / $PROFILE)
터미널을 켤 때 **자동으로 실행되는 설정 파일**. fnm 같은 도구가 매번 자동으로 작동하려면 여기에 설정을 추가해야 한다.

## 2주차 실습 예제

### 예제 1: 패키지 관리자 설치

**Windows — scoop 설치:**
```powershell
# 1) 실행 정책 변경 (보안 빗장 열기)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 2) scoop 설치
irm get.scoop.sh | iex

# 3) 확인
scoop --version
```

**macOS — Homebrew 설치:**
```bash
# 1) Xcode 명령줄 도구 설치 (이미 있으면 생략)
xcode-select --install

# 2) Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 3) 확인
brew --version
```

### 예제 2: 패키지 관리자로 프로그램 설치·확인·삭제 체험

**Windows:**
```powershell
scoop install curl      # 설치
scoop list              # 설치 목록 확인
scoop uninstall curl    # 삭제 — 깔끔하게 사라짐
```

**macOS:**
```bash
brew install wget       # 설치
brew list               # 설치 목록 확인
brew uninstall wget     # 삭제
```

### 예제 3: fnm으로 Node.js 설치하고 버전 전환하기

**설치:**
```powershell
# Windows
scoop install fnm
# 또는
winget install Schniz.fnm
```
```bash
# macOS
brew install fnm
```

**셸 설정 (매우 중요!):**
```powershell
# Windows PowerShell — 프로필 파일 열기
notepad $PROFILE
# 열린 파일 맨 아래에 아래 한 줄을 추가하고 저장:
# fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```
```bash
# macOS (zsh)
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

**Node.js 설치 & 버전 전환:**
```bash
# 안정 버전 설치
fnm install --lts

# 특정 버전 설치
fnm install 20
fnm install 22

# 버전 목록 확인
fnm list

# 버전 전환 — 되돌리기!
fnm use 22
node --version   # → v22.x.x

fnm use 20
node --version   # → v20.x.x (바뀌었다!)

# 기본 버전 지정
fnm default 22
```

**첫 Node.js 프로그램 실행:**
```bash
echo 'console.log("안녕하세요!")' > hello.js
node hello.js
# → 안녕하세요!
```

### 예제 4: WSL 설치 & 되돌리기 (Windows 사용자만)

```powershell
# 1) 관리자 권한 PowerShell에서 설치
wsl --install

# 2) 재부팅 후, Ubuntu 창에서 사용자명/비밀번호 설정
#    ⚠️ 비밀번호 입력 시 화면에 아무것도 안 보이는 게 정상!

# 3) 설치 확인
wsl -l -v
# → Ubuntu  Running  2  ← 버전 2인지 확인
```

**WSL 되돌리기 실습:**
```powershell
# 백업 (현재 상태를 파일로 저장)
wsl --export Ubuntu C:\backup\ubuntu-backup.tar

# 삭제 (흔적 없이 사라짐, Windows에는 영향 없음)
wsl --unregister Ubuntu

# 복원 (백업에서 원래 상태로 복구)
wsl --import Ubuntu C:\wsl\Ubuntu C:\backup\ubuntu-backup.tar
```

**WSL 안에서 첫 명령어:**
```bash
pwd              # 현재 위치 확인
ls               # 파일 목록 보기
mkdir test       # 폴더 만들기
touch hello.txt  # 빈 파일 만들기
cat hello.txt    # 파일 내용 보기
```

### 핵심 명령어 요약

| 도구 | 설치 | 삭제 | 확인 |
|------|------|------|------|
| scoop | `scoop install [이름]` | `scoop uninstall [이름]` | `scoop list` |
| brew | `brew install [이름]` | `brew uninstall [이름]` | `brew list` |
| fnm | `fnm install [버전]` | `fnm uninstall [버전]` | `fnm list` |
| WSL | `wsl --install` | `wsl --unregister [이름]` | `wsl -l -v` |

---

# 3주차: 격리 — Docker 활용

> Docker로 서비스 설치 연습. 한 줄이면 설치, 한 줄이면 삭제.

## 3주차 용어정리

### Docker
앱과 그 앱이 필요로 하는 환경을 **통째로 묶어서 실행**하는 도구. 내 컴퓨터 환경을 더럽히지 않고 프로그램을 실행할 수 있다. 이사할 때 방 전체를 상자에 넣어 옮기는 기술.

### 컨테이너 (Container)
Docker가 만드는 **격리된 실행 환경**. 독립된 작은 방을 만드는 것. 필요 없으면 방째로 삭제하면 끝 — 흔적이 남지 않는다.

### 이미지 (Image)
컨테이너를 만들기 위한 **설계도(레시피)**. 하나의 이미지로 똑같은 컨테이너를 몇 개든 만들 수 있다. 이미지는 변하지 않는 파일이다.
```bash
docker run nginx        # nginx 이미지로 컨테이너 생성+실행
docker rm -f my-nginx   # 컨테이너 삭제
```

### 레지스트리 (Registry) / Docker Hub
전 세계 사람들이 만든 이미지를 **공유하는 온라인 저장소**. 원하는 이미지 이름만 알면 내 컴퓨터로 가져올 수 있다.

### 포트 (Port)
네트워크 통신의 **출입구 번호**. 아파트 동호수처럼, 같은 컴퓨터(주소)에서 어떤 프로그램에 접근할지 구분한다.

### 포트 매핑 (Port Mapping)
내 컴퓨터의 포트와 컨테이너의 포트를 **연결**하는 것. `-p 8080:80`은 "내 8080번으로 오면 컨테이너 80번으로 전달"이라는 뜻.

### Docker Desktop
Docker를 쉽게 사용할 수 있게 해주는 **데스크탑 앱**. 고래 모양 아이콘이 특징. 이 앱이 실행 중이어야 docker 명령어가 작동한다.

### 환경 변수 (-e 옵션)
컨테이너에 전달하는 **설정값**. 비밀번호나 설정을 프로그램에 건네주는 "메모 쪽지".

## 3주차 실습 예제

### 예제 1: Docker 설치 확인
```bash
docker --version
# → Docker version 24.x.x 같은 숫자가 나오면 성공

docker run hello-world
# → 환영 메시지가 나오면 모든 준비 완료!
```

### 예제 2: 한 줄로 서비스 설치해보기

**웹 서버 (nginx):**
```bash
docker run -d -p 8080:80 --name my-web nginx
# 브라우저에서 http://localhost:8080 접속 → 웹 서버 작동!

# 옵션 설명:
# -d : 백그라운드 실행 (터미널 닫아도 계속 돌아감)
# -p 8080:80 : 내 8080번 포트 → 컨테이너 80번 포트 연결
# --name my-web : 이 컨테이너의 이름
# nginx : 사용할 이미지
```

**모니터링 대시보드 (Uptime Kuma):**
```bash
docker run -d -p 3001:3001 --name kuma louislam/uptime-kuma
# 브라우저에서 http://localhost:3001 → 멋진 대시보드!
```

**개발자 유틸리티 모음 (IT-Tools):**
```bash
docker run -d -p 8081:80 --name tools corentinth/it-tools
# 브라우저에서 http://localhost:8081 → QR 생성, JSON 포맷터 등!
```

**PDF 올인원 도구 (Stirling PDF):**
```bash
docker run -d -p 8082:8080 --name pdf stirlingtools/stirling-pdf
# 브라우저에서 http://localhost:8082 → PDF 합치기/나누기/변환!
```

**메모 서비스 (Memos):**
```bash
docker run -d -p 5230:5230 --name memo neosmemo/memos
# 브라우저에서 http://localhost:5230 → 간단한 메모장!
```

### 예제 3: 되돌리기 — 한 줄이면 삭제

```bash
# 실행 중인 컨테이너 확인
docker ps

# 서비스 중지 + 삭제
docker stop my-web
docker rm my-web
# → 흔적 없이 사라짐!

# 다시 설치하면? 몇 초면 원래대로
docker run -d -p 8080:80 --name my-web nginx
```

### 예제 4: 전부 한꺼번에 정리하기

```bash
# 모든 컨테이너 멈추기
docker stop $(docker ps -q)

# 모든 컨테이너 삭제
docker rm $(docker ps -aq)

# 모든 이미지 삭제
docker rmi $(docker images -q)

# 대청소 (사용하지 않는 모든 것 한번에 정리)
docker system prune -a
```

### 추천 실습 흐름

```
1. docker run 한 줄로 Uptime Kuma 설치 → 대시보드 구경
2. docker run 한 줄로 IT-Tools 설치 → QR코드 만들어보기
3. docker run 한 줄로 Stirling PDF 설치 → PDF 합쳐보기
4. docker rm → 깨끗하게 사라짐 → "되돌리기" 체감!
```

**핵심: 한 줄이면 설치, 한 줄이면 삭제**

### 자주 쓰는 명령어

| 용도 | 명령어 |
|------|--------|
| 서비스 실행 | `docker run [옵션] 이미지이름` |
| 실행 목록 확인 | `docker ps` |
| 모든 목록 (멈춘 것 포함) | `docker ps -a` |
| 서비스 중지 | `docker stop 이름` |
| 서비스 삭제 | `docker rm 이름` |
| 기록(로그) 확인 | `docker logs 이름` |
| 컨테이너 안으로 진입 | `docker exec -it 이름 bash` |
| 이미지 목록 | `docker images` |
| 이미지 삭제 | `docker rmi 이미지이름` |
| 전체 초기화 | `docker system prune -a` |

### 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| `docker: command not found` | Docker Desktop이 실행 안 됨 | 고래 아이콘이 트레이에 있는지 확인 |
| `port is already allocated` | 포트가 이미 사용 중 | 다른 컨테이너 중지하거나 포트 번호 변경 |
| 컨테이너가 바로 죽음 | 설정값 오류 | `docker logs 이름`으로 에러 확인 |
| WSL 관련 오류 (Windows) | Linux 커널 업데이트 필요 | 화면에 표시된 주소로 업데이트 설치 |

---

# 4주차: 완성 — 플레이그라운드 연결

> 가상화 (UTM/VMware/Hyper-V)로 OS 레벨 되돌리기 + 1~3주차 환경을 하나로 연결

## 4주차 용어정리

### 가상화 (Virtualization)
하나의 컴퓨터 안에 **또 다른 컴퓨터를 소프트웨어로 만드는 기술**. 진짜 컴퓨터처럼 OS를 설치하고 사용할 수 있다.

### 가상머신 (Virtual Machine, VM)
가상화로 만들어진 **가상의 컴퓨터**. 실제 하드웨어 없이 OS를 통째로 실행한다. Docker와의 차이: Docker는 앱 하나를 격리, VM은 OS 전체를 격리.

### 스냅샷 (Snapshot)
가상머신의 **현재 상태를 통째로 저장**한 것. 게임의 세이브 포인트와 같다. 망가뜨려도 그 시점으로 정확히 되돌아갈 수 있다. Hyper-V에서는 '체크포인트'라고 부른다.

### UTM
macOS에서 사용하는 **무료 가상화 앱**. Mac 위에서 Windows, Linux 등을 실행할 수 있다. 애플 실리콘에 최적화.

### VMware
Windows/Mac/Linux에서 사용하는 **가상화 소프트웨어**. 개인 학습 목적이라면 무료로 사용 가능.

### Hyper-V
Windows에 **기본 내장된 가상화 기능**. 별도 설치 불필요, 기능만 켜면 됨. 단, Windows Pro 이상 에디션에서만 사용 가능 (Home 에디션 불가).

### ISO 파일
운영체제의 설치 CD를 파일로 만든 것. 가상머신에 OS를 설치할 때 이 파일을 연결한다.

### BIOS / 가상화 기능
컴퓨터 하드웨어 차원의 가상화 지원 설정. 가상머신을 돌리려면 이 기능이 켜져 있어야 한다. 최근 컴퓨터는 대부분 기본으로 켜져 있다.

### AI 코딩 도구

**Claude Code:** 터미널에서 동작하는 AI 코딩 어시스턴트. 자연어로 명령하면 파일을 만들고, 코드를 수정하고, 터미널 명령어를 실행해준다.
```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

**Cursor:** AI가 내장된 코드 에디터. VS Code 기반으로, 코드를 보면서 AI에게 수정을 요청할 수 있다. https://cursor.com 에서 설치.

## 4주차 실습 예제

### 예제 1: 도구 선택 가이드

| 내 컴퓨터 | 추천 도구 | 이유 |
|-----------|-----------|------|
| Mac (M1/M2/M3/M4) | **UTM** | 맥 전용, 무료, 애플 실리콘 최적화 |
| Windows Pro 이상 | **Hyper-V** | 윈도우 내장, 무료, 최고 성능 |
| Windows Home | **VMware** | 무료(개인용), 높은 호환성 |

### 예제 2: UTM 설치 (Mac)
```bash
brew install --cask utm
```
또는 https://mac.getutm.app/ 에서 직접 다운로드.

### 예제 3: VMware 설치 (Windows Home)
1. https://docs.docker.com/desktop/setup/install/windows-install/ 에서 설치 파일 다운로드
2. 설치 중 "비상업적 용도" 선택 → 무료 사용
3. 재부팅

### 예제 4: Hyper-V 활성화 (Windows Pro)
```powershell
# 관리자 권한 PowerShell에서 실행
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
# → 재부팅 후 시작 메뉴에서 "Hyper-V Manager" 검색
```

### 예제 5: 가상머신에 Ubuntu 설치하기

**공통 준비:** Ubuntu 공식 사이트에서 ISO 파일 다운로드

**UTM (Mac):**
1. UTM 실행 → "새 가상머신 만들기"
2. Virtualize 선택 → Linux 선택
3. 다운로드한 ISO 파일 연결
4. 메모리 4GB, 저장소 30~40GB 설정
5. 재생 버튼으로 설치 시작

**Hyper-V (Windows Pro):**
1. Hyper-V Manager 실행
2. 새로 만들기 → 가상 컴퓨터
3. 2세대 선택, 메모리 4096MB
4. Default Switch 네트워크 선택
5. 가상 하드 디스크 30~40GB
6. ISO 파일 연결 → 마침 → 시작

### 예제 6: 스냅샷 — 가상화의 꽃

```
1. 가상머신에 Ubuntu 설치 완료
2. "깨끗한 상태" 스냅샷 저장 ← 첫 번째 세이브 포인트!
3. 마음껏 실험 — 시스템 폴더 삭제해도 OK
4. 망가졌다? → 스냅샷으로 복원 → 2번 상태로 복구!
5. 다시 실험 → 또 망가짐 → 또 복원 → 무한 반복
```

**UTM:** 가상머신 정보 → 스냅샷 탭 → 저장
**VMware:** 상단 메뉴 → 스냅샷 찍기
**Hyper-V:** 가상머신 우클릭 → 체크포인트 만들기

### 예제 7: 1~3주차 통합 — 나만의 플레이그라운드 체크리스트

```markdown
## 나만의 개발 환경 세팅 체크리스트

### Step 1: 기본 도구 (5분)
- [ ] 패키지 관리자 설치 (scoop 또는 brew)
- [ ] Git 설치 → `git --version`으로 확인
- [ ] fnm 설치 → `fnm --version`으로 확인
- [ ] Node.js 설치 → `fnm install --lts` → `node --version`

### Step 2: 프로젝트 시작 (3분)
- [ ] 폴더 생성 → `mkdir my-project && cd my-project`
- [ ] Git 초기화 → `git init`
- [ ] 첫 커밋 → `git add . && git commit -m "시작"`
- [ ] ⭐ 코드 세이브 포인트 완성!

### Step 3: Docker 준비 (5분)
- [ ] Docker Desktop 설치 → `docker --version`
- [ ] 테스트 → `docker run hello-world`
- [ ] 서비스 하나 띄워보기 → 브라우저에서 확인
- [ ] 삭제 → 다시 띄우기 → 되돌리기 체험!

### Step 4: (선택) 가상화
- [ ] UTM/VMware/Hyper-V 설치
- [ ] 가상머신 생성 + Ubuntu 설치
- [ ] 스냅샷 만들기 → 망가뜨리기 → 복원하기

### 🎉 초보 탈출 선언
"나는 망가뜨려도 되돌릴 수 있다!"
```

---

## 도구별 비교 총정리

| 비교 항목 | UTM | VMware | Hyper-V |
|-----------|-----|--------|---------|
| 추천 OS | macOS | Windows (Home 포함) | Windows Pro 이상 |
| 비용 | 무료 | 개인 사용 시 무료 | 무료 (윈도우 내장) |
| 설치 방식 | 앱 설치 | 앱 설치 | 윈도우 기능 켜기 |
| 주요 강점 | 애플 실리콘 최적화 | 높은 호환성·안정성 | 윈도우 네이티브·높은 성능 |
| 되돌리기 | 스냅샷 | 스냅샷 | 체크포인트 |
| 주의 사항 | 맥 전용 | 특별한 제약 없음 | 다른 가상화 도구와 충돌 가능 |

## AI 도구 비교

| 항목 | Claude Code | Cursor |
|------|-------------|--------|
| 동작 방식 | 터미널 기반 (명령어) | 코드 편집기 기반 (시각적) |
| 설치 | `npm install -g @anthropic-ai/claude-code` | https://cursor.com 에서 다운로드 |
| 시각적 편집 | 텍스트 대화로만 | 화면에서 직접 코드 보며 수정 |
| 추천 상황 | 프로젝트 초기 설정, 빠른 실행 | 코드 세부 내용 보며 수정할 때 |
| 비용 | API 사용량 기반 과금 | 무료 플랜 있음 (유료 플랜 별도) |

---

## 전체 일정 한눈에 보기

```
3/17 화  1주차 OT + Git 되돌리기 실습
3/24 화  2주차 scoop/brew + fnm + WSL + 사례 발표
3/31 화  3주차 Docker 서비스 설치 연습 + 사례 발표
4/7  화  4주차 가상화 + 플레이그라운드 연결 + 사례 발표 + 마무리
```

```
Week 1 (3/17~)       Week 2 (3/24~)       Week 3 (3/31~)       Week 4 (4/7~)
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Git 시작      │ →  │ scoop/brew   │ →  │ Docker 활용   │ →  │ 가상화+통합   │
│ 커밋 & 복구   │     │ fnm + Node   │     │ 한 줄 설치    │     │ 스냅샷 체험   │
│ AI 도구 소개  │     │ WSL (Win)    │     │ 한 줄 삭제    │     │ 체크리스트    │
│ 따라하기      │     │ 사례 발표    │     │ 사례 발표     │     │ 초보탈출 선언 │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘

  코드 되돌리기        환경 되돌리기        컨테이너 되돌리기      OS 되돌리기
     (Git)          (fnm, WSL)           (Docker)         (UTM/VMware/Hyper-V)
```
