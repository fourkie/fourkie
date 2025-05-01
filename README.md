

# 🌿 Smookie
![prevImg](https://github.com/user-attachments/assets/eb4c947d-2768-4885-8e71-061b82bc9637)
> 감정을 기록하고, 음악으로 위로받는 감정 기반 AI 다이어리 플랫폼

<br />

---

<br />

## ✨ 소개

하루의 끝, 마음을 조용히 들여다보고 싶은 순간이 있습니다.  
누군가에게 털어놓긴 애매하지만, 스스로 감정을 정리하고 싶은 날도 있죠.

**Smookie**는 이러한 순간을 위해 탄생한 **AI 기반 감정 기록 서비스**입니다.  
사용자가 하루를 일기처럼 적으면, 자연어처리(NLP) 기술로 텍스트를 분석해 감정을 도출하고, 이를 귀여운 이모지로 표현해줍니다.  
그 감정에 어울리는 음악까지 자동으로 추천되어, 글을 마무리하는 순간 자연스럽게 작은 위로가 찾아옵니다.

<br />

---

<br />

## 🙌 팀 소개

| 이름 |역할|
| :--: | -------- |
| 🧸 윤주하 | 👑팀장👑 배포, 팀원 관리, 유저관리, 공통 컴포넌트, ListPage, Polling, 통계 모달   |
| 🪫 김도현 | 문서 관리, 유저 관리, Mypage, 친구 관리, 사이트 정보 |
| 🐰 유선영 | 유저관리, DatePicker API, 달력, Homepage, Home 위젯(음악, 친구), Header, NavBar, 공통 컴포넌트 |
| ‍🐤 전우영 | Spotify API 관리, Musicpage, OAuth2.0 인증/인가, Footer  |
| 🐋 정현식 | 유저관리, 일기 작성/수정, Posting(Edit)page, AI 분석, Tutorial  |

<br />

---


<br />

## 🌈 주요 기능


| 기능 | 설명 | 미리보기 |
|------|------|----------|
| **🔐 회원가입 / 로그인** | Supabase 기반 인증 및 예외 처리, 닉네임 중복 체크 | <img src="https://github.com/user-attachments/assets/f7317eb2-282e-44a4-a9ae-1f5f0f638434" width="300" />|
| **✍️ 감정 일기 작성** | 하루를 자유롭게 작성하면 AI가 감정을 분석하여 결과가 직관적인 이모지로 시각화돼요. | <img src="https://github.com/user-attachments/assets/e9727e69-10f7-40b9-98db-dd39e4c76d81" width="300"/> |
| **📅 감정 캘린더** | 월 단위로 일별 감정을 달력 형태로 누적/기록해요 . | <img src="https://github.com/user-attachments/assets/2df1ed22-81da-45e4-9a5d-e6b3e8bfb080" width="300"/> |
| **🛠 기록 관리** | 작성한 일기를 수정 / 삭제 기능할 수 있어요. |<img src="https://github.com/user-attachments/assets/a3891afa-351f-4e7e-8a45-9d49b28974b0" width="300"/> |
| **🎵 음악 추천** | 감정에 어울리는 Spotify 음악을 자동 추천해줘요. | <img src="https://github.com/user-attachments/assets/40881bff-89e9-49de-9c08-e8d42ba2ced9" width="300"/> |
| **👥 친구 기능** | 친구를 추가해 친구의 감정과 통계를 확인할 수 있어요. | <img src="https://github.com/user-attachments/assets/7826fc2a-cf9e-4777-8264-0bb2867ba2c2" width="300"/> |
| **💽 마이페이지** | 친구 추가, 닉네임 수정, 프로젝트 정보 등을 확인할 수 있어요. | <img src="https://github.com/user-attachments/assets/9166a4b0-e02b-48c2-b3ec-b98ea31f43ce" width="300"/>|

<br />

---

<br />

## 🧩 프로젝트 핵심 기술

| 기능 구분 | 상세 설명 |
|-----------|-----------|
| 🎧 외부 API | Spotify API로 음악 추천 및 재생, 감정 분석 AI 연동 |
| 🔐 인증 관리 | Supabase 기반 회원가입 / 로그인 / 유저 데이터 저장 및 보호 |
| ✍️ CRUD 처리 | 일기 작성 → AI 분석 → 감정 이모지 저장 → 캘린더 반영 / 수정 및 삭제 기능 |
| 👥 팔로잉 기능 | 팔로우한 친구의 감정, 통계 탐색 가능 |
| 📆 감정 캘린더 | 하루 감정을 쿠키 이모지로 달력에 기록 |
| 🎶 음악 추천 | 감정 분석 결과 기반 Spotify 음악 추천 |
| ⚙️ 마이페이지 | 팔로우/팔로잉 관리, 닉네임 수정, 프로젝트 정보 관리 |

<br />

---

<br />

## 🛠️ 사용 기술 스택 및 라이브러리

| 기술 | 설명 |
|:----:|------|
| <div align="center"><img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" /></div> | 프레임워크 |
| <div align="center"><img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white" /></div> | UI 스타일링 |
| <div align="center"><img src="https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white" /></div> | 폼 관리 |
| <div align="center"><img src="https://img.shields.io/badge/Zustand-000000?logo=zustand&logoColor=white" /></div> | 전역 상태 관리 |
| <div align="center"><img src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white" /></div> | API 요청/캐싱 |
| <div align="center"><img src="https://img.shields.io/badge/React_Toastify-000000?logo=react&logoColor=white" /></div> | 알림 시스템 |
| <div align="center"><img src="https://img.shields.io/badge/Shadcn_UI-6E6E6E?logo=shadcn&logoColor=white" /></div> | UI 컴포넌트 |
| <div align="center"><img src="https://img.shields.io/badge/Lucide-000000?logo=lucide&logoColor=white" /></div> | 아이콘 라이브러리 |
| <div align="center"><img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white" /></div> | 인증 및 DB |
| <div align="center"><img src="https://img.shields.io/badge/Spotify_API-1DB954?logo=spotify&logoColor=white" /></div> | 음악 추천 API |
| <div align="center"><img src="https://img.shields.io/badge/NLP_AI_Model-gray?logo=python&logoColor=white" /></div> | 감정 분석 AI |
| <div align="center"><img src="https://img.shields.io/badge/Polling-4A90E2?logo=clockify&logoColor=white" /></div> | 실시간 데이터 갱신 |
| <div align="center"><img src="https://img.shields.io/badge/Framer_Motion-EF008F?logo=framer&logoColor=white" /></div> | 애니메이션 구현 |
| <div align="center"><img src="https://img.shields.io/badge/PWA-4285F4?logo=googlechrome&logoColor=white" /></div> | 웹앱 설치 기능, 오프라인 대응 |

<br />

---

<br />

## 💡 팁

> ✅ **텍스트 기반 감정 분석 모델**은 반드시 한국어일 필요가 없어요!   
> ✅ **음악 추천 로직**은 감정 분류값을 기준으로 Spotify 카테고리를 매핑하는 방식이 직관적입니다.  
> ✅ **감정 캘린더**는 월간/주간 감정 통계를 제공하면 사용자 리텐션이 높아집니다.  
> ✅ Supabase 인증 시스템은 **소셜 로그인 연동**도 함께 고려하면 확장성 좋습니다!

<br />

---

<br />

## 📌 향후 개발 방향

- 사용자 맞춤 감정 트래킹 및 통계 제공
- 더 정교한 감정 분류 모델 고도화
- 추천 음악 알고리즘 개선 (감정 유사도 기반 큐레이션)
- 커뮤니티 기능 강화 (댓글, 공감 순위, 인기 다이어리)

<br />

---



## 🔖 라이선스

이 프로젝트는 [라이선스 유형] 하에 오픈소스로 제공됩니다.

---
