---
title: "Docker 활용"
description: "앱과 환경을 통째로 묶어서 실행하는 도구"
sidebar:
  order: 1
---

# Docker — 한 줄이면 설치, 한 줄이면 삭제

> **오늘의 목표**: Docker로 서비스를 설치하고, 브라우저에서 확인하고, 삭제까지 직접 해봅니다. 명령어 한 줄이면 됩니다.

---

## 1. Docker가 뭔가요?

프로그램과 그 프로그램이 실행되는 데 필요한 모든 환경을 **컨테이너**라는 독립된 상자에 담아 실행하는 도구입니다. 이사할 때 방 전체를 상자에 넣어 옮기는 것처럼, 어떤 컴퓨터에서든 똑같은 환경을 재현할 수 있습니다.

**왜 쓰나요?**
- 내 컴퓨터에 직접 설치하지 않으므로 시스템이 꼬이지 않습니다.
- 삭제하면 흔적이 남지 않습니다.
- 가상머신과 달리 OS를 새로 설치하지 않아 가볍고 빠릅니다.

---

## 2. 핵심 용어 3가지

| 용어 | 비유 | 설명 |
|------|------|------|
| **이미지(Image)** | 레시피 | 프로그램 실행에 필요한 모든 정보가 담긴 설계도. 변하지 않는 파일입니다. |
| **컨테이너(Container)** | 실제 요리 | 이미지를 바탕으로 만든 실행 환경. 하나의 이미지로 여러 컨테이너를 만들 수 있습니다. |
| **레지스트리(Registry)** | 레시피 책방 | 이미지를 공유하는 온라인 저장소. 대표적으로 Docker Hub가 있습니다. |

---

## 3. Docker Desktop 설치하기

### Windows

**설치 전 확인 사항:**
- 윈도우 10 빌드 19045 버전 이상, 64비트
- 최소 4GB 메모리
- BIOS에서 가상화 기능 활성화 (최근 컴퓨터는 대부분 기본 활성화)
- WSL 2가 설치되어 있으면 성능이 더 안정적

**설치 방법:**
1. [공식 설치 페이지](https://docs.docker.com/desktop/setup/install/windows-install/)에서 설치 파일 다운로드
2. 기본 옵션으로 설치 진행
3. 재부팅 후 Docker Desktop 실행
4. 트레이에 고래 아이콘이 나타나면 준비 완료

### macOS

**설치 전 확인 사항:**
- macOS 11 이상
- 최소 4GB 메모리

**설치 방법:**
1. [공식 설치 페이지](https://docs.docker.com/desktop/setup/install/mac-install/)에서 프로세서에 맞는 파일 다운로드
   - M1/M2/M3/M4 → Apple Silicon 용
   - Intel Mac → Intel 용
2. 고래 아이콘을 응용 프로그램 폴더로 드래그
3. 응용 프로그램에서 Docker 실행

### 설치 확인

```bash
# 버전 확인
docker --version
# → Docker version 24.x.x 같은 숫자가 나오면 성공

# 작동 테스트
docker run hello-world
# → 환영 메시지가 나오면 모든 준비 완료!
```

---

## 4. 처음 사용해보기 — 서비스를 한 줄로 설치하기

### STEP 1: 웹 서버 실행하기

```bash
docker run -d -p 8080:80 --name my-web nginx
# -d          : 백그라운드 실행 (터미널 닫아도 계속 돌아감)
# -p 8080:80  : 내 컴퓨터 8080번 → 컨테이너 80번 포트 연결
# --name my-web : 컨테이너 이름 지정
# nginx       : 사용할 이미지 (세계에서 가장 많이 쓰는 웹 서버)
```

브라우저에서 `http://localhost:8080` 접속 → 웹 서버 작동 확인!

### STEP 2: 데이터베이스 실행하기

```bash
docker run -d -p 5432:5432 --name my-db -e POSTGRES_PASSWORD=1234 postgres
# -e POSTGRES_PASSWORD=1234 : 환경 변수로 DB 비밀번호 설정
```

### STEP 3: 재미있는 서비스 띄워보기

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

### STEP 4: 실행 중인 서비스 확인하기

```bash
docker ps
# 현재 돌아가는 컨테이너 목록 (이름, 상태, 포트 확인)

docker ps -a
# 멈춘 컨테이너까지 전부 표시
```

### STEP 5: 서비스 삭제하기

```bash
# 중지 → 삭제
docker stop my-web
docker rm my-web
# → 흔적 없이 사라짐!

# 다시 설치? 같은 명령어 한 줄이면 됩니다
docker run -d -p 8080:80 --name my-web nginx
```

---

## 5. 자주 쓰는 명령어

| 용도 | 명령어 |
| :--- | :--- |
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

### `docker run` 옵션 요약

| 옵션 | 의미 | 예시 |
| :--- | :--- | :--- |
| `-d` | 백그라운드 실행 | `-d` |
| `-p` | 포트 연결 (호스트:컨테이너) | `-p 8080:80` |
| `--name` | 컨테이너 이름 지정 | `--name my-web` |
| `-e` | 환경 변수 설정 | `-e POSTGRES_PASSWORD=1234` |

---

## 6. 깨끗하게 정리하기

```bash
# 모든 컨테이너 멈추기
docker stop $(docker ps -q)

# 모든 컨테이너 삭제
docker rm $(docker ps -aq)

# 모든 이미지 삭제
docker rmi $(docker images -q)

# 대청소 (사용하지 않는 모든 것 한번에 정리)
docker system prune -a
# ⚠️ 강력한 명령어 — 사용 중인 것 외 전부 삭제됩니다
```

### Docker Desktop 완전 삭제

삭제 전 데이터를 먼저 비우는 것을 권장합니다.

```bash
# 1) 데이터 정리
docker system prune -a --volumes

# 2) 프로그램 삭제
# Windows: 제어판 → 프로그램 추가/제거 → Docker Desktop 제거
# macOS: 응용 프로그램 폴더에서 Docker를 휴지통으로
```

---

## 7. 자주 만나는 문제

| 상황 | 원인 | 해결 |
|------|------|------|
| `docker: command not found` | Docker Desktop이 실행 안 됨 | 고래 아이콘이 트레이에 있는지 확인 |
| `port is already allocated` | 포트가 이미 사용 중 | 다른 컨테이너 중지하거나 포트 번호 변경 |
| 컨테이너가 바로 죽음 | 설정값 오류 | `docker logs 이름`으로 에러 확인 |
| 권한 거부 오류 (Linux) | 사용자 권한 부족 | `sudo` 붙이거나 사용자를 docker 그룹에 등록 |
| WSL 관련 오류 (Windows) | Linux 커널 업데이트 필요 | 화면에 표시된 주소로 업데이트 설치 |
| 저장 공간 부족 | 이미지가 쌓임 | `docker system prune -a`로 정리 |

---

## 8. 추천 실습 흐름

```
1. docker run 한 줄로 Uptime Kuma 설치 → 대시보드 구경
2. docker run 한 줄로 IT-Tools 설치 → QR코드 만들어보기
3. docker run 한 줄로 Stirling PDF 설치 → PDF 합쳐보기
4. docker stop + docker rm → 깨끗하게 사라짐 → "되돌리기" 체감!
```

---

## 9. 정리

### 핵심 명령어 요약

| 용도 | 명령어 |
| :--- | :--- |
| 서비스 실행 | `docker run [옵션] 이미지이름` |
| 목록 확인 | `docker ps` |
| 서비스 중지 | `docker stop 이름` |
| 서비스 삭제 | `docker rm 이름` |
| 이미지 삭제 | `docker rmi 이미지이름` |
| 전체 초기화 | `docker system prune -a` |

### 작업 흐름 한눈에 보기

```
1. 이미지 검색  → Docker Hub에서 필요한 이미지 이름 확인
2. 컨테이너 실행 → docker run 한 줄로 서비스 시작
3. 사용 & 실습  → 브라우저에서 서비스 접속
4. 중지 & 삭제  → docker stop + docker rm으로 깨끗하게 정리
```
