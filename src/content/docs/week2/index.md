---
title: "환경 — 날리고 다시 만들기"
description: "패키지 관리자, fnm, WSL로 되돌릴 수 있는 개발 환경 만들기"
sidebar:
  order: 1
---

# 2주차: 환경 — 날리고 다시 만들기

> scoop/brew로 깔끔한 설치 환경 만들기 + fnm으로 Node.js 버전 관리 + WSL 설치 & 되돌리기

---

## 1. 패키지 관리자 (scoop / Homebrew)

코딩을 처음 시작하시는 분들을 위해 패키지 관리자의 개념과 설치 방법을 상세하게 안내해 드립니다.

### 패키지 관리자가 뭔가요?

스마트폰의 앱스토어처럼, 터미널에서 프로그램을 명령어 한 줄로 설치·삭제·업데이트하는 도구입니다. 직접 홈페이지를 찾아다닐 필요 없이 관리자가 모든 설치/삭제를 깔끔하게 처리해 줍니다.

### Windows: scoop 설치하기

파워쉘을 열고 순서대로 입력합니다.

```powershell
# 1) 실행 정책 변경 (보안 빗장 열기)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 2) scoop 설치
irm get.scoop.sh | iex

# 3) 확인
scoop --version
```

### macOS: Homebrew 설치하기

터미널을 열고 입력합니다.

```bash
# 1) Xcode 명령줄 도구 (이미 있으면 생략)
xcode-select --install

# 2) Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 3) 확인 (설치 후 안내된 경로 추가 명령어 먼저 실행!)
brew --version
```

> ⚠️ 맥에서 설치 완료 후 "다음 단계" 안내가 나오면 반드시 해당 명령어를 실행해야 `brew`가 인식됩니다.

### 처음 사용해보기

```powershell
# Windows
scoop install curl
scoop list
scoop uninstall curl
```

```bash
# macOS
brew install wget
brew list
brew uninstall wget
```

### 핵심 명령어 요약

| 기능 | Windows (scoop) | macOS (Homebrew) |
| :--- | :--- | :--- |
| 설치 확인 | `scoop --version` | `brew --version` |
| 프로그램 설치 | `scoop install 이름` | `brew install 이름` |
| 프로그램 삭제 | `scoop uninstall 이름` | `brew uninstall 이름` |
| 설치 목록 확인 | `scoop list` | `brew list` |
| 프로그램 검색 | `scoop search 이름` | `brew search 이름` |
| 도구 업데이트 | `scoop update` | `brew update` |

### 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| 스크립트 실행 차단 (Windows) | 실행 정책 미변경 | `Set-ExecutionPolicy` 명령 다시 실행 |
| 명령어를 찾을 수 없음 (Mac) | 경로 추가 단계 생략 | 설치 후 안내된 경로 추가 명령어 실행 |
| 설치 파일 다운로드 안 됨 | 방화벽/네트워크 차단 | 보안이 해제된 환경에서 재시도 |

---

## 2. fnm & Node.js

### Node.js가 뭔가요?

자바스크립트를 브라우저 밖에서 실행할 수 있게 해주는 런타임. Claude Code, Cursor 같은 AI 도구들이 Node.js 위에서 돌아갑니다.

### 왜 fnm이 필요한가요?

공식 사이트에서 직접 설치하면 버전을 하나밖에 쓸 수 없습니다. fnm(Fast Node Manager)을 쓰면 여러 버전을 설치해두고 옷 갈아입듯이 전환할 수 있습니다. 되돌리기도 됩니다.

### fnm 설치하기

```powershell
# Windows (scoop)
scoop install fnm

# Windows (winget)
winget install Schniz.fnm
```

```bash
# macOS
brew install fnm
```

### 셸 설정 (매우 중요!)

설치 후 터미널이 fnm을 자동으로 인식하도록 설정을 추가해야 합니다.

```powershell
# Windows PowerShell — 프로필 파일 열기
notepad $PROFILE
# 아래 줄을 맨 아래에 추가하고 저장:
# fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

```bash
# macOS (zsh)
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### Node.js 설치하고 버전 전환하기

```bash
# 안정 버전(LTS) 설치
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

### 첫 Node.js 프로그램 실행

```bash
echo 'console.log("안녕하세요!")' > hello.js
node hello.js
# → 안녕하세요!
```

### 핵심 명령어 요약

| 명령어 | 역할 |
| :--- | :--- |
| `fnm install --lts` | 안정 버전 설치 |
| `fnm list` | 설치된 버전 목록 |
| `fnm use [버전]` | 버전 전환 |
| `fnm default [버전]` | 기본 버전 지정 |
| `node --version` | 현재 버전 확인 |

### 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| `fnm: command not found` | 셸 설정 누락 또는 터미널 재시작 안 함 | 설정 추가 후 터미널 껐다 켜기 |
| `No default version is set` | 기본 버전 미지정 | `fnm default 22` 실행 |
| `$PROFILE` 파일 없음 (Windows) | 프로필 파일 미생성 | 메모장으로 해당 경로에 파일 직접 생성 |

---

## 3. WSL (Windows 사용자만)

> 맥 사용자는 이미 유닉스 기반이므로 WSL이 필요 없습니다.

### WSL이 뭔가요?

Windows 안에서 Linux를 바로 실행하는 기능. 가상머신보다 훨씬 가볍고, 개발 도구 대부분이 Linux 환경을 기준으로 만들어져 있어서 매우 유용합니다.

### WSL 설치하기

관리자 권한으로 PowerShell을 열고 입력합니다.

```powershell
wsl --install
```

명령어 하나로 Ubuntu가 자동 설치됩니다. 완료 후 재부팅하면 Ubuntu 창이 열리며 사용자명/비밀번호를 설정합니다.

> ⚠️ 비밀번호 입력 시 화면에 아무것도 안 보이는 게 정상입니다. 그냥 입력하고 Enter.

설치 확인:

```powershell
wsl -l -v
# → Ubuntu  Running  2  ← 버전 2인지 확인
```

### 처음 사용해보기

```bash
pwd              # 현재 위치 확인
ls               # 파일 목록
mkdir test       # 폴더 만들기
touch hello.txt  # 빈 파일 만들기
cat hello.txt    # 파일 내용 보기
```

윈도우 파일에 접근하려면:

```bash
/mnt/c/Users/사용자이름/
```

### WSL 되돌리기 실습

```powershell
# 백업 (현재 상태를 파일로 저장)
wsl --export Ubuntu C:\backup\ubuntu-backup.tar

# 삭제 (Windows에는 영향 없음)
wsl --unregister Ubuntu

# 복원 (백업에서 원래 상태로)
wsl --import Ubuntu C:\wsl\Ubuntu C:\backup\ubuntu-backup.tar
```

### 핵심 명령어 요약

| 상황 | 명령어 | 실행 위치 |
| :--- | :--- | :--- |
| 설치 | `wsl --install` | PowerShell (관리자) |
| 상태 확인 | `wsl -l -v` | PowerShell |
| 진입 | `wsl` | PowerShell |
| 백업 | `wsl --export [이름] [경로]` | PowerShell |
| 삭제 | `wsl --unregister [이름]` | PowerShell |
| 복원 | `wsl --import [이름] [위치] [파일]` | PowerShell |

### 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| 가상화 기능 비활성화 오류 | BIOS에서 가상화 꺼짐 | BIOS 진입 후 가상화 옵션 활성화 |
| 설치 명령에 반응 없음 | Windows 버전 오래됨 | Windows Update 후 재시도 |
| 비밀번호 입력 시 글자 안 보임 | Linux 보안 규칙 | 정상 — 그냥 입력하고 Enter |
| 파일 접근 속도 느림 | `/mnt/c` 경로 사용 | 작업 파일을 Linux 폴더 내부로 이동 |
