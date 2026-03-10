---
title: "온보딩 가이드"
description: "스터디 시작 전 미리 봐두면 좋은 영상과 문서"
sidebar:
  order: 4
---

# 21기 스터디 온보딩 가이드

> 스터디 시작 전 미리 봐두면 좋은 영상과 문서를 정리했습니다.
> 전부 볼 필요 없으니 관심 있는 것만 골라 보세요.

---

## 사전 준비 (스터디 전 필수)
- **내 OS 확인하기**: Windows인지 Mac(Intel/Apple Silicon)인지 확인해 주세요.
- **터미널 열어보기**: Windows는 '명령 프롬프트'나 'PowerShell', Mac은 '터미널' 앱을 한 번 실행해 보세요.
- **GitHub 계정 만들기**: 1주차 수업에 바로 필요합니다. [github.com](https://github.com)에서 미리 가입해 두세요.
- **Docker Desktop 설치**: 3주차 실습을 위해 미리 설치해 두는 것을 권장합니다.

---

## 1주차: Git
개발자의 필수 덕목, 버전 관리 시스템 Git의 기초를 다룹니다.

### 📹 영상
- 🇰🇷 [쉽게 설명하는 Git 기초](https://youtube.com/watch?v=sly2u8BIi9E) (20분) - ⭐ **추천**: Git이 왜 필요한지 가장 쉽게 설명합니다.
- 🇰🇷 [깃허브 15분 정리](https://youtube.com/watch?v=lelVripbt2M) (15분) - GitHub 사용법을 빠르게 훑어보기 좋습니다.
- 🇰🇷 [깃 제대로 배우기 (드림코딩)](https://youtube.com/watch?v=Z9dvM7qgN9s) (30분) - 좀 더 체계적으로 Git을 배우고 싶을 때 보세요.

### 📖 공식문서
- [Git 공식 한국어 가이드](https://git-scm.com/book/ko/v2) - 가장 정확한 한글 텍스트 가이드입니다.
- [GitHub Guides](https://github.com/git-guides) - GitHub에서 제공하는 공식 튜토리얼입니다.

---

## 2주차: 패키지 관리자 + fnm + WSL
윈도우와 맥에서 개발 도구를 스마트하게 관리하는 방법을 배웁니다.

### 📹 영상
- 🇰🇷 [WSL 가장 쉬운 방법](https://youtube.com/watch?v=riPjalPKHj8) (10분) - 윈도우 유저라면 꼭 봐야 할 리눅스 설치 영상입니다.
- 🇰🇷 [WSL 초고속 설치](https://youtube.com/watch?v=W35_CrM4TsM) (5분) - 명령어 한 줄로 끝내는 WSL 설치법입니다.
- 🇺🇸 [Scoop Quickstart](https://youtube.com/watch?v=JugEIxYr3jk) (5분) - 윈도우용 패키지 매니저 Scoop 사용법입니다.
- 🇰🇷 [WSL2 + Docker 세팅](https://youtube.com/watch?v=J9pxPVcd-fY) (15분) - 윈도우에서 개발 환경의 끝판왕 조합을 설명합니다.

### 📖 공식문서
- [MS 공식 WSL 설치 가이드](https://learn.microsoft.com/ko-kr/windows/wsl/install) - 공식 설치 매뉴얼입니다.
- [fnm 공식 GitHub](https://github.com/Schniz/fnm) - Node.js 버전을 관리하는 fnm의 사용법입니다.
- [scoop 공식](https://scoop.sh/) / [Homebrew 공식](https://brew.sh/ko/) - 윈도우와 맥의 필수 도구입니다.

---

## 3주차: Docker
내 컴퓨터를 더럽히지 않고 독립된 개발 환경을 만드는 기술입니다.

### 📹 영상
- 🇰🇷 [도커 한방에 정리 (드림코딩)](https://youtube.com/watch?v=LXJhA3VWXFA) (15분) - ⭐ **추천**: 도커의 핵심 개념을 가장 명쾌하게 설명합니다.
- 🇰🇷 [가장 쉽게 배우는 도커](https://youtube.com/watch?v=hWPv9LMlme8) (20분) - 비전공자도 이해할 수 있는 수준의 입문 영상입니다.
- 🇰🇷 [생활코딩 Docker 입문](https://youtube.com/watch?v=Ps8HDIAyPD0) (10분) - 가볍게 개념만 파악하기 좋습니다.

### 📖 공식문서
- [Docker 공식 Get Started](https://docs.docker.com/get-started/) - 도커 공식 튜토리얼입니다.
- [Docker Desktop 설치](https://docs.docker.com/desktop/) - 내 OS에 맞는 도커를 설치하세요.

---

## 4주차: 가상화 (UTM, VMware, Hyper-V)
내 컴퓨터 안에 또 다른 컴퓨터를 만드는 마법, 가상머신을 다룹니다.

### 📹 영상
- 🇰🇷 [UTM으로 Mac에 Windows 11 설치](https://youtube.com/watch?v=uis3pvt4wBU) (15분) - 애플 실리콘 맥 유저를 위한 가상화 가이드입니다.
- 🇰🇷 [VMware 설치하기](https://youtube.com/watch?v=kYGI72LqqN0) (10분) - 가장 대중적인 가상화 소프트웨어 설치법입니다.
- 🇰🇷 [Hyper-V 끝판왕](https://youtube.com/watch?v=Wwztd_RN3GY) (15분) - 윈도우 기본 탑재 가상화 도구인 Hyper-V 활용법입니다.

### 📖 공식문서
- [UTM 공식 가이드](https://docs.getutm.app/) - 맥용 UTM 상세 설정법입니다.
- [VMware 공식 다운로드](https://www.vmware.com/products/workstation-player.html) - 개인 사용자용 VMware 링크입니다.

---

## 보너스: AI 코딩 도구
코딩 실력을 10배 키워주는 최신 AI 도구들을 소개합니다.

### 📹 영상
- 🇰🇷 [Cursor 25분 완벽 정리](https://youtube.com/watch?v=_oEhh8666pA) (25분) - 요즘 가장 핫한 AI 코드 에디터 Cursor 입문입니다.
- 🇰🇷 [Claude Code 왕초보 입문](https://youtube.com/watch?v=1_bRmkUvjHA) (50분) - 터미널에서 대화하며 코딩하는 최신 도구 가이드입니다.
- 🇰🇷 [윈도우·맥 설치 가이드](https://youtube.com/watch?v=C7RQncKh7G8) (10분) - AI 도구들을 내 PC에 세팅하는 방법입니다.

### 📖 공식문서
- [Cursor 공식 문서](https://docs.cursor.com/) - Cursor의 강력한 기능들을 확인해 보세요.
- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code) - Anthropic에서 만든 코딩 에이전트 가이드입니다.
