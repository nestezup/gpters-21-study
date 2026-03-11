---
title: "트러블슈팅 모음"
description: "스터디 실습 중 자주 만나는 문제와 해결법"
sidebar:
  order: 3
---

스터디 실습 중 만날 수 있는 문제들을 주제별로 정리했습니다.<br/>
에러 메시지를 `Ctrl+F`(또는 `Cmd+F`)로 검색하면 빠르게 찾을 수 있습니다.

> 이 페이지는 스터디 진행 중 새로운 문제가 발견될 때마다 계속 업데이트됩니다.

---

## 1주차: Git

### `fatal: not a git repository`

현재 폴더에 `.git`이 없을 때 발생합니다.

```bash
pwd          # 현재 위치 확인
ls -a        # .git 폴더 존재 여부 확인
git init     # 새 저장소 시작 시
git clone URL  # 기존 저장소 가져올 시
```

### `git commit` 후 이상한 화면 (Vim에 갇힘)

`-m` 옵션 없이 `git commit`을 실행하면 Vim 에디터가 열립니다.

**탈출 방법:** `Esc` → `:q!` → Enter (커밋 취소)
**메시지 입력 후 저장:** `Esc` → `:wq` → Enter

**근본 해결 — 기본 에디터 변경:**
```bash
git config --global core.editor "code --wait"   # VS Code로 변경
```

### `nothing to commit, working tree clean`

`git add`를 하지 않았거나, 파일을 수정한 뒤 저장(Ctrl+S)을 안 한 경우입니다.

```bash
git status              # 현재 상태 확인
git add 파일명           # 스테이징 영역에 추가
git commit -m "메시지"   # 커밋
```

### 한글 파일명이 깨져 보임 (Windows)

`git status`에서 `"\355\225\234\352\270\200"` 같은 코드가 나타나는 경우:

```bash
git config --global core.quotepath false
```

### `git log`에서 빠져나올 수 없음

`q` 키를 누르면 됩니다. 페이저 없이 보려면:

```bash
git log --oneline      # 한 줄씩 간결하게
git log -5             # 최근 5개만
```

### `.gitignore`에 추가해도 파일이 계속 추적됨

이미 한 번이라도 `git add`한 파일은 `.gitignore`에 넣어도 무시되지 않습니다.

```bash
git rm --cached 파일명         # 추적 해제 (파일은 유지)
git rm -r --cached 폴더명/    # 폴더 전체 해제
git commit -m "gitignore 적용"
```

### `git init` vs `git clone` — 언제 뭘 쓰나요?

| 명령 | 사용 시점 |
|------|----------|
| `git init` | 내 컴퓨터에서 새 프로젝트를 처음 시작할 때 |
| `git clone URL` | GitHub 등 원격 저장소를 가져올 때 |

> `git clone` 후 생성된 폴더 안에서 다시 `git init`을 실행하면 안 됩니다.

---

## 2주차: 패키지 매니저 + fnm + WSL

### Homebrew — `brew: command not found` (macOS)

설치 후 표시되는 "Next steps"를 실행하지 않은 경우입니다.

**Apple Silicon (M1/M2/M3/M4):**
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

**Intel Mac:**
```bash
eval "$(/usr/local/bin/brew shellenv)"
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
```

설정 후 **터미널을 새로 열거나** `source ~/.zprofile` 실행.

### Homebrew — Apple Silicon vs Intel 경로 혼동

| 아키텍처 | 올바른 Homebrew 경로 |
|---------|---------------------|
| Apple Silicon (arm64) | `/opt/homebrew/bin/brew` |
| Intel (x86_64) | `/usr/local/bin/brew` |

`which brew`로 확인. 경로가 맞지 않으면 Homebrew를 제거하고 **터미널의 "Rosetta로 열기" 옵션을 해제한 뒤** 재설치하세요.

### scoop — PowerShell 스크립트 실행 차단 (Windows)

```powershell
# 현재 정책 확인
Get-ExecutionPolicy

# RemoteSigned로 변경 (관리자 권한 불필요)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# scoop 설치 재시도
iwr -useb get.scoop.sh | iex
```

### fnm — `command not found`

fnm 설치 후 shell 초기화 코드를 추가하지 않은 경우입니다.

**macOS/Linux (zsh):**
```bash
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

**Windows PowerShell:**
```powershell
# profile 파일 없으면 생성
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
notepad $PROFILE
# 아래 줄 추가 후 저장:
# fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

PowerShell 재시작 후 확인.

### fnm — `No default version is set`

```bash
fnm install --lts        # 최신 LTS 설치
fnm default lts-latest   # 기본 버전 지정
```

### macOS — `.zshrc` vs `.bash_profile` 혼동

macOS Catalina(10.15)부터 기본 셸이 **zsh**입니다. `echo $SHELL`로 확인하세요.

| 셸 | 설정 파일 |
|-----|----------|
| **zsh** (macOS 기본) | `~/.zshrc` (인터랙티브), `~/.zprofile` (로그인) |
| bash | `~/.bashrc`, `~/.bash_profile` |

> zsh를 쓰면서 `.bash_profile`에 PATH를 넣으면 적용되지 않습니다.

### 기존 Node.js와 fnm 충돌

```bash
which -a node    # node가 여러 경로에 있는지 확인
```

fnm 경로가 아닌 곳(`/usr/local/bin/node` 등)이 보이면, 기존 Node.js를 제거하세요:
```bash
brew uninstall node                   # Homebrew로 설치한 경우
# Windows: 제어판에서 Node.js 제거
```

### WSL — 가상화 기능 비활성화 오류

BIOS에서 CPU 가상화가 꺼져 있는 경우입니다.

1. PC 재부팅 → BIOS 진입 (Del, F2, F10 등 제조사별 상이)
2. `Intel Virtualization Technology` 또는 `SVM Mode` → **Enabled**
3. F10으로 저장 후 재부팅

Windows 기능도 확인:
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### WSL — `wsl --install`이 반응 없음

- **Windows 버전 확인:** `Win+R` → `winver` → Build 19041 이상 필요
- **이미 설치된 경우:** `wsl --install -d Ubuntu` (배포판 지정)
- **다운로드 멈춤:** `wsl --install --web-download -d Ubuntu`

### WSL — 비밀번호 입력 시 화면에 아무것도 안 보임

**정상입니다.** Linux는 보안상 비밀번호 입력 시 `****`도 표시하지 않습니다. 그냥 입력하고 Enter를 누르세요.

### WSL — `/mnt/c/` 경로에서 작업이 느림

WSL 내부 파일시스템(`~/`)에서 작업하세요. `/mnt/c/`는 Windows 파일시스템을 네트워크로 마운트한 것이라 느립니다.

```bash
# 프로젝트를 WSL 내부로 이동
cp -r /mnt/c/Users/이름/project ~/project
cd ~/project

# Windows 탐색기에서 WSL 파일 접근
explorer.exe .
```

### WSL — Linux 커널 업데이트 필요 에러

```powershell
wsl --update
```

안 되면 수동 설치: [x64 커널 패키지](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) 다운로드 후 실행.

### WSL — 디스크 공간이 계속 커짐 (vhdx)

WSL은 가상 디스크를 사용하며, 파일 삭제 후에도 **자동으로 줄어들지 않습니다**.

```powershell
wsl.exe --shutdown
# WSL 2.5 이상
wsl --manage Ubuntu --resize 50GB
```

---

## 3주차: Docker

### `docker: command not found`

Docker Desktop 앱이 실행 중인지 확인하세요. 시스템 트레이(Mac: 메뉴바)에 고래 아이콘이 보여야 합니다.

### `port is already allocated`

다른 프로그램이나 컨테이너가 같은 포트를 쓰고 있습니다.

```bash
# 포트 사용 중인 프로세스 확인
lsof -i :8080           # Mac/Linux
netstat -aon | find "8080"   # Windows

# 이전 컨테이너가 남아있는 경우
docker ps -a             # 모든 컨테이너 확인
docker rm -f 컨테이너명   # 강제 삭제

# 또는 호스트 포트를 변경
docker run -d -p 8081:80 --name my-web nginx
```

### 컨테이너가 바로 종료됨

```bash
docker logs 컨테이너명    # 에러 로그 확인
docker ps -a             # Exited 상태 확인
```

주요 원인: 환경 변수 누락, 설정값 오류, 포그라운드 프로세스 없음

### Docker Desktop — WSL 관련 에러 (Windows)

```
Wsl/Service/RegisterDistro/CreateVm/HCS_E_HYPERV_NOT_INSTALLED
```

1. BIOS에서 가상화 활성화 (2주차 WSL 항목 참조)
2. Windows 기능에서 `Virtual Machine Platform`, `WSL` 활성화
3. `wsl --update` 실행
4. 재부팅

### Docker Desktop이 "Starting..."에서 멈춤

**빠른 시도:** Docker 메뉴 → Restart Docker Desktop
**Mac에서 반복 시:** 완전 삭제 → 재부팅 → 재설치. 또는 **OrbStack**으로 대체 (Mac 사용자에게 추천, 가볍고 빠름)

### Docker 이미지 다운로드 실패

```bash
docker login              # Docker Hub 로그인 (익명 pull 한도 100회/6시간)
```

DNS 문제 시: Docker Desktop → Settings → Docker Engine에 추가:
```json
{ "dns": ["8.8.8.8", "1.1.1.1"] }
```

### 저장 공간 부족

```bash
docker system df           # 용량 현황 확인
docker system prune        # 미사용 리소스 정리
docker system prune -a     # 사용 중이 아닌 이미지까지 전부 삭제
```

> `docker system prune -a --volumes`는 볼륨 데이터까지 삭제합니다. 주의하세요.

### 컨테이너 이름 충돌

```
The container name "/my-web" is already in use
```

```bash
docker rm my-web                          # 기존 컨테이너 삭제
docker run -d -p 8080:80 --name my-web nginx   # 다시 실행
```

### Docker Desktop 리소스 과다 사용

Docker Desktop → Settings → Resources에서 Memory와 CPU 제한을 설정하세요.
- Memory: 4GB 이하 권장
- CPU: 2~4코어

**Mac 사용자:** OrbStack이 훨씬 가볍습니다 (Apple Silicon에서 백그라운드 CPU 0.1% 미만).

### Linux — `permission denied` (docker.sock)

```bash
sudo usermod -aG docker $USER
newgrp docker    # 로그아웃 없이 즉시 적용
```

### Hyper-V VM 안에서 Docker 실행이 안 됨 (중첩 가상화)

Hyper-V로 설치한 Windows VM 안에서 Docker Desktop을 실행하면 WSL2/가상화 에러가 발생합니다. Docker Desktop은 내부적으로 가상화(WSL2)를 사용하기 때문에, VM 안에서 다시 가상화를 돌리려면 **호스트에서 중첩 가상화(Nested Virtualization)를 활성화**해야 합니다.

**호스트 Windows에서 실행 (VM을 종료한 상태에서):**
```powershell
# VM 이름 확인
Get-VM

# 중첩 가상화 활성화
Set-VMProcessor -VMName "VM이름" -ExposeVirtualizationExtensions $true

# 확인
Get-VMProcessor -VMName "VM이름" | Select ExposeVirtualizationExtensions
# True가 나오면 성공
```

**요구 사항:**
- 호스트 CPU가 VT-x/AMD-V + SLAT 지원
- 호스트 Windows 10 버전 1607 이상 또는 Windows 11
- VM이 **종료(Off)** 상태여야 설정 가능 (일시 정지 상태 안 됨)
- VM에 할당할 메모리를 충분히 확보 (Docker용 추가 4GB 이상 권장)

**설정 후 VM 내부에서:**
1. VM 시작 → Windows 부팅
2. Docker Desktop 설치 및 실행
3. 정상 작동 확인: `docker run hello-world`

---

## 4주차: 가상화 (UTM / VMware / Hyper-V)

### BIOS에서 가상화 활성화하기

| 제조사 | BIOS 진입키 | 설정 경로 |
|--------|------------|----------|
| ASUS | Del 또는 F2 | Advanced → CPU Configuration → Intel VT / SVM Mode |
| MSI | Del | Overclocking → CPU Features → SVM Mode / VT-D |
| Dell 노트북 | F2 | Security → Virtualization |
| HP 노트북 | F10 | Security → Virtualization |
| Lenovo 노트북 | F1 또는 F2 | Security → Virtualization |

Windows에서 확인: 작업 관리자 → 성능 → CPU → "가상화: 사용"

### UTM — Ubuntu 해상도가 낮게 고정됨

게스트 도구를 설치하세요:
```bash
sudo apt install spice-vdagent spice-webdavd
sudo reboot
```

VM 설정 → Display → "Auto resolution" 체크 확인

### UTM — Apple Silicon에서 x86 VM이 극도로 느림

Apple Silicon은 ARM 아키텍처이므로 x86 OS는 소프트웨어 에뮬레이션(10~20배 느림)으로 실행됩니다.

**해결:** **ARM64 Ubuntu ISO**를 사용하세요. UTM이 네이티브 가상화로 실행하여 거의 원래 속도가 나옵니다.

### VMware — 가상화 에러

Hyper-V가 VT-x를 독점하고 있을 수 있습니다:

```
제어판 → Windows 기능 → 다음 항목 해제:
- Hyper-V
- Windows Hypervisor Platform
- Virtual Machine Platform
→ 재부팅
```

### VMware — Broadcom 인수 후 라이선스

**2024년 11월 이후**: VMware Workstation Pro / Fusion Pro 모두 **개인·상업·교육 무료**입니다.

다운로드: Broadcom Support Portal 계정(무료) 생성 후 다운로드. 설치 시 "Personal Use" 선택.

### Hyper-V 활성화 시 VMware/VirtualBox 충돌

Windows가 Hyper-V를 켜면 OS 전체가 하이퍼바이저 위에서 동작하여 다른 가상화 도구가 VT-x에 직접 접근할 수 없습니다.

**해결:** 동시에 쓸 계획이 없으면 사용할 도구에 맞게 Hyper-V를 켜거나 끄세요:
```powershell
bcdedit /set hypervisorlaunchtype off   # Hyper-V 비활성화 (VMware용)
bcdedit /set hypervisorlaunchtype auto  # Hyper-V 재활성화
# 재부팅 필요
```

### Hyper-V — Ubuntu 부팅 안 됨 (2세대 VM)

Secure Boot 템플릿이 Windows 전용으로 설정되어 있습니다.

Hyper-V 관리자 → VM 설정 → 보안 → Secure Boot 템플릿을 **"Microsoft UEFI Certificate Authority"**로 변경.

### 가상머신 메모리 할당 기준

호스트 RAM의 **50% 이하**로 할당하세요.

| VM 용도 | 권장 RAM |
|---------|---------|
| CLI 전용 Linux | 1~2 GB |
| 데스크탑 Linux (Ubuntu 등) | 4 GB |
| Windows 11 | 4~8 GB |

### 가상머신 네트워크 연결 안 됨

| 네트워크 모드 | 특징 | 초보자 추천 |
|-------------|------|-----------|
| **NAT** | 호스트를 통해 인터넷 접속. 설정 간단 | **추천** |
| Bridge | 물리 네트워크에 직접 참여. 환경에 따라 안 될 수 있음 | 고급 |

VMware NAT 안 될 때: `services.msc` → `VMware NAT Service`, `VMware DHCP Service` 재시작

### 가상머신 공유 폴더

| 도구 | 전제 조건 | 게스트에서 접근 경로 |
|------|----------|-------------------|
| UTM | 설정 → Sharing → 디렉토리 선택 | WebDAV 마운트 |
| VMware | VMware Tools 설치 | `/mnt/hgfs/폴더이름` |
| VirtualBox | Guest Additions 설치 | 자동 마운트 또는 `/media/sf_폴더이름` |
| Hyper-V | Enhanced Session Mode | RDP 드라이브 리디렉션 |

---

## 보너스: AI 코딩 도구

### `npm: command not found`

Node.js가 설치되지 않았습니다. 2주차 fnm 가이드를 참고하여 Node.js를 먼저 설치하세요.

```bash
node --version   # 확인
# 없으면: fnm install --lts
```

### Claude Code 인증 화면이 안 열림

1. 터미널에 표시되는 URL을 직접 브라우저에 복사·붙여넣기
2. 브라우저 팝업 차단 해제
3. [status.anthropic.com](https://status.anthropic.com)에서 서비스 상태 확인

> **보안 주의:** Google 검색 광고를 통한 가짜 Claude Code 사이트가 보고되었습니다. 반드시 공식 npm 패키지(`@anthropic-ai/claude-code`)만 사용하세요.

### Claude Code — 구독 vs API 키 혼동

| 방식 | 적합 대상 | 비용 |
|------|----------|------|
| **Claude.ai 구독** (추천) | 초보자 | Pro $20/월, Max $100~200/월 |
| Anthropic Console API Key | 개발자, 사용량 제어 | 토큰당 과금 |

초보자는 **Claude.ai Pro 구독 후** `claude` 실행 → 1번 선택 → 브라우저 인증이 가장 간단합니다.

### AI가 만든 코드가 작동 안 할 때

1. **에러 메시지를 그대로 붙여 넣기** — AI가 진단해줍니다
2. **한 번에 하나씩 요청** — "계산기 전체" 대신 "덧셈 기능만 먼저"
3. **되돌리기** — `"이전 상태로 되돌려줘"` 또는 Git으로 복구
4. **Claude Code:** `Shift+Tab`으로 Plan Mode → 먼저 계획 → 그 다음 구현

### Cursor 무료 한도 초과

- 다음 달까지 대기, 또는 Pro($20/월) 업그레이드
- 임시 대안: Settings → Models → 본인 API 키 입력 (별도 과금)

### AI 응답이 느리거나 타임아웃

1. 서비스 상태 확인: [status.anthropic.com](https://status.anthropic.com) / [status.openai.com](https://status.openai.com)
2. Claude Code: `/compact`로 대화 내용 압축
3. 빠른 모델로 전환: `/model` → Haiku 또는 Sonnet

### Antigravity 설치 방법

1. [antigravity.google](https://antigravity.google) 접속 → OS 맞는 버전 다운로드
2. 설치 후 Google 계정 로그인 → **현재 완전 무료**
3. "Agent Assistant Development" 모드 선택 (AI가 중요 작업 전 확인 요청)

### Codex CLI / Gemini CLI 설치

```bash
# OpenAI Codex CLI
npm install -g @openai/codex
# OPENAI_API_KEY 환경변수 설정 필요

# Google Gemini CLI
npx @google/gemini-cli
# GEMINI_API_KEY 환경변수 설정 필요 (Google AI Studio에서 발급)
```

---

## 참고 영상 모음

### Git

| 제목 | 링크 |
|------|------|
| git 초보자를 위한 git 기초 강의 | https://www.youtube.com/watch?v=FmsshPRJotE |
| Git 실무 트러블슈팅 모음 (풀스택) | https://www.youtube.com/watch?v=JVbJXDL4cdc |
| Git 충돌, 완벽 해결법! | https://www.youtube.com/watch?v=gn-zYcqSr0w |

### 패키지 매니저 & fnm

| 제목 | 링크 |
|------|------|
| Fix 'brew: command not found' on macOS | https://www.youtube.com/watch?v=A7EtRLD5TVc |
| fnm으로 Node.js 버전 관리 | https://www.youtube.com/watch?v=SPNlIRZmgHk |

### Docker

| 제목 | 링크 |
|------|------|
| 도커 에러 "container name already in use" 대처 (한국어) | https://www.youtube.com/watch?v=FwK8CLTOeAE |
| 도커 네트워크 연결 문제 해결 (한국어) | https://www.youtube.com/watch?v=9jk5SeF0eog |
| Docker Support 엔지니어의 트러블슈팅 팁 | https://www.youtube.com/watch?v=DK1ew1HpmeY |

### AI 코딩 도구

| 제목 | 링크 |
|------|------|
| Claude Code 왕초보 입문 튜토리얼 23가지 팁 (47분) | https://www.youtube.com/watch?v=1_bRmkUvjHA |
| 클로드 코드 Windows 설치 완벽 가이드 (12분) | https://www.youtube.com/watch?v=elybc26qCt0 |
| 비개발자를 위한 클로드 코드 설치 가이드 (10분) | https://www.youtube.com/watch?v=cjKzIgS3kO0 |
| Google Antigravity 설치 방법 (7분) | https://www.youtube.com/watch?v=_3OgTtrrrrE |
| Google Antigravity: 입문~전문가 14분 정리 | https://www.youtube.com/watch?v=mbxq88TOxp4 |
| Google AI Studio 전체 튜토리얼 | https://www.youtube.com/watch?v=Dem3ZSQ6RVM |
| OpenAI Codex CLI 설치 및 사용법 (한국어) | https://www.youtube.com/watch?v=Zn8n2U8sTkw |
| Gemini CLI 설치 및 설정 (한국어) | https://www.youtube.com/watch?v=v3QEdKkFdGM |
