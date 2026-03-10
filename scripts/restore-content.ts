/**
 * Restore MD content from originals into Starlight docs structure.
 * Adds proper frontmatter + copies body content.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const SRC = "/Users/nest/Downloads/21기 스터디자료";
const DEST = "/Users/nest/projects/gpters-21-study/src/content/docs";

interface DocMapping {
  source: string;
  target: string;
  title: string;
  description: string;
  order: number;
}

const mappings: DocMapping[] = [
  {
    source: "21기-스터디-상세페이지.md",
    target: "overview/index.md",
    title: "스터디 소개",
    description: "망해도 괜찮아: 개발 환경 세팅 101 스터디 소개",
    order: 1,
  },
  {
    source: "21기-스터디-4주-마스터가이드.md",
    target: "overview/master-guide.md",
    title: "4주 마스터 가이드",
    description: "4주간의 커리큘럼과 실습 내용 총정리",
    order: 2,
  },
  {
    source: "21기-스터디-용어정리.md",
    target: "overview/glossary.md",
    title: "용어정리",
    description: "바이브코딩 입문자를 위한 핵심 용어 설명",
    order: 3,
  },
  {
    source: "21기-스터디-온보딩가이드.md",
    target: "overview/onboarding.md",
    title: "온보딩 가이드",
    description: "스터디 시작 전 미리 봐두면 좋은 영상과 문서",
    order: 4,
  },
  {
    source: "21기-스터디-Git.md",
    target: "week1/index.md",
    title: "Git 되돌리기",
    description: "코드의 변경 이력을 기록하고 되돌리는 방법",
    order: 1,
  },
  {
    source: "21기-스터디-패키지관리자.md",
    target: "week2/package-manager.md",
    title: "패키지 관리자 (scoop/brew)",
    description: "한 줄 명령어로 프로그램을 설치·관리하는 도구",
    order: 1,
  },
  {
    source: "21기-스터디-fnm-Node.js.md",
    target: "week2/fnm-nodejs.md",
    title: "fnm & Node.js",
    description: "Node.js 버전을 여러 개 관리하는 방법",
    order: 2,
  },
  {
    source: "21기-스터디-WSL.md",
    target: "week2/wsl.md",
    title: "WSL",
    description: "Windows에서 Linux를 바로 실행하는 방법",
    order: 3,
  },
  {
    source: "21기-스터디-Docker.md",
    target: "week3/index.md",
    title: "Docker 활용",
    description: "앱과 환경을 통째로 묶어서 실행하는 도구",
    order: 1,
  },
  {
    source: "21기-스터디-가상화-UTM-VMware.md",
    target: "week4/index.md",
    title: "가상화 (UTM / VMware / Hyper-V)",
    description: "내 컴퓨터 안에 또 다른 컴퓨터를 만드는 기술",
    order: 1,
  },
  {
    source: "21기-스터디-AI도구.md",
    target: "bonus/ai-tools.md",
    title: "AI 도구 (Cursor & Claude Code)",
    description: "바이브코딩의 핵심 도구 설치와 사용법",
    order: 1,
  },
  {
    source: "21기-스터디-바이브코딩-입문가이드.md",
    target: "bonus/vibe-coding.md",
    title: "바이브코딩 입문 가이드",
    description: "AI에게 말해서 앱을 만드는 새로운 코딩 방식",
    order: 2,
  },
];

async function processFile(mapping: DocMapping) {
  const raw = await readFile(`${SRC}/${mapping.source}`, "utf-8");

  // Strip existing frontmatter if present (상세페이지 has its own)
  let body = raw;
  if (body.startsWith("---")) {
    const endIdx = body.indexOf("---", 3);
    if (endIdx !== -1) {
      body = body.slice(endIdx + 3).trimStart();
    }
  }

  const frontmatter = `---
title: "${mapping.title}"
description: "${mapping.description}"
sidebar:
  order: ${mapping.order}
---`;

  const fullContent = `${frontmatter}\n\n${body}`;
  const targetPath = `${DEST}/${mapping.target}`;

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, fullContent, "utf-8");
  console.log(`✅ ${mapping.target} (${fullContent.split("\n").length} lines)`);
}

async function main() {
  console.log("Restoring content from originals...\n");

  for (const mapping of mappings) {
    await processFile(mapping);
  }

  // Create root index.md (landing page)
  const rootIndex = `---
title: "실수가 자유로운 개발 연습장 만들기"
description: "바이브코딩 입문자를 위한 개발 환경 세팅 101 — GPTers 21기 스터디"
template: splash
hero:
  tagline: "망해도 괜찮아 — 개발 환경 세팅 101"
  actions:
    - text: 스터디 소개 보기
      link: /overview/
      icon: right-arrow
    - text: 바로 1주차 시작
      link: /week1/
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="1주차: Git" icon="github">
    코드의 세이브 포인트를 만들고 되돌리는 방법을 배웁니다.
  </Card>
  <Card title="2주차: 패키지관리자 + fnm + WSL" icon="setting">
    한 줄 명령어로 개발 도구를 설치하고 관리하는 법을 익힙니다.
  </Card>
  <Card title="3주차: Docker" icon="rocket">
    앱과 환경을 통째로 묶어 어디서든 동일하게 실행합니다.
  </Card>
  <Card title="4주차: 가상화" icon="laptop">
    내 컴퓨터 안에 또 다른 컴퓨터를 만드는 기술을 실습합니다.
  </Card>
</CardGrid>
`;

  // Root index needs to be .mdx for Starlight components
  await writeFile(`${DEST}/index.mdx`, rootIndex, "utf-8");
  console.log(`✅ index.mdx (landing page)`);

  console.log("\nDone! Run 'pnpm build' to verify.");
}

main().catch(console.error);
