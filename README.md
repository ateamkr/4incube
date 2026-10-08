# 포인큐브 · 4 IN CUBE 컨피규레이터

브랜드: 포인큐브. 3D 워터마크: 4 IN CUBE. 포인트 `#4d6080`, 배경 `#ebebeb`, 공지 `#ffd800`.

스토어: https://smartstore.naver.com/4incube
견적 요청: http://pf.kakao.com/_xndWBX
상호, 3D 배경·바닥 워터마크, 다운로드 이미지, 파일명, 공유 문구, 22개 레퍼런스별 판매 링크를 변경했습니다. 아래 원본 출처는 개발 이력용입니다.

원본: https://planfurni.github.io/PLANFURNI/configurator

공개 배포 저장소 https://github.com/planfurni/PLANFURNI 의 커밋 `544803942bc33dc5ae5e0cf9261c38a86c6890bd`에서 컨피규레이터 배포 파일만 가져왔습니다. 원본 React/TypeScript 개발 소스가 아닌 실행 가능한 정적 배포본입니다. 브랜드·상담·스토어 링크는 포인큐브로 변경했습니다. 상품 이미지와 가격표는 기존 값을 유지하며 자동 동기화하지 않습니다. 원본 Google·네이버 방문 통계 로더와 이벤트 전송은 제거했으며 자체 통계는 연결하지 않았습니다.

## 실행

외부 런타임 의존성이 없어 `npm install`은 필요하지 않습니다. `npm run build`는 제공된 정적 배포본의 JavaScript 문법과 HTML 리소스 경로를 검사하고 `build/`에 배포 파일을 복사합니다. 원본 React/TypeScript 소스의 재컴파일은 아닙니다. `build/`는 생성물이며 Git에서 제외합니다.

Node.js 환경에서 `npm start`를 실행하면 http://127.0.0.1:4173 에서 열립니다. 외부 패키지 설치나 원본 사이트에 대한 프록시 연결 없이 동작합니다.

`dist/`가 독립 배포 폴더입니다. `replica.css`는 첨부 화면에 맞춘 데스크톱 배치입니다. `customize.mjs`는 원본 배포본에 적용하는 아이콘 및 카메라 보정 스크립트입니다. `/configurator/` 경로도 로컬 서버에서 지원합니다.

## 추가 제작에 필요한 자료

기존 기능에는 추가 자료가 필요하지 않습니다. 판매 가격표는 원본 값을 유지합니다. 구조적인 기능 확장에는 편집 가능한 React/TypeScript 개발 소스가 있으면 유리합니다. 상담 버튼은 포인큐브 카카오톡으로 연결되며, 자체 주문 접수 서버는 포함하지 않습니다.
