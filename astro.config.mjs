// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'AI스터디 21기 개발환경셋팅 — 실수가 자유로운 개발 연습장 만들기',
			customCss: ['./src/styles/custom.css'],
			description: '바이브코딩 입문자를 위한 개발 환경 세팅 101 — GPTers 21기 스터디',
			defaultLocale: 'ko',
			locales: {
				root: { label: '한국어', lang: 'ko' },
			},
			sidebar: [
				{
					label: '개요',
					items: [
						{ slug: 'overview' },
						{ slug: 'overview/master-guide' },
						{ slug: 'overview/glossary' },
						{ slug: 'overview/onboarding' },
					],
				},
				{
					label: '1주차: Git',
					items: [
						{ slug: 'week1' },
					],
				},
				{
					label: '2주차: 패키지관리자 + fnm + WSL',
					items: [
						{ slug: 'week2' },
					],
				},
				{
					label: '3주차: Docker',
					items: [
						{ slug: 'week3' },
					],
				},
				{
					label: '4주차: 가상화',
					items: [
						{ slug: 'week4' },
					],
				},
				{
					label: '보너스',
					items: [
						{ slug: 'bonus/ai-tools' },
						{ slug: 'bonus/vibe-coding' },
						{ slug: 'bonus/troubleshooting' },
					],
				},
			],
		}),
	],
});
