# Remove Markdown

Markdown 서식을 제거해 평문으로 변환하는 한국어 웹 도구입니다.

**[사이트 열기](https://42inshin.github.io/removeMarkdown/)**

무료 · 가입 없음 · 입력 내용 저장 없음

## 사용법

1. 입력창에 Markdown을 붙여넣습니다.
2. 결과창에서 변환된 내용을 확인합니다.
3. **복사**를 눌러 필요한 곳에 붙여넣습니다.

**예시** 버튼으로 변환 결과를 살펴보고, **지우기** 버튼으로 입력을 초기화할 수 있습니다.

## 변환 규칙

| 항목 | 변환 결과 |
| --- | --- |
| 제목 | `#` 등 제목 기호 제거 |
| 강조·취소선 | 굵게, 기울임, 취소선 기호 제거 |
| 목록 | `-` 유지, `*`·`+`를 `-`로 변경, 중첩 들여쓰기 보존 |
| 순서 목록 | 번호 유지 |
| 체크박스 | `[x]`·`[ ]` 유지 |
| 링크·이미지 | `설명 (URL)` 형식으로 표시 |
| 인용문 | `>` 기호 제거 |
| 인라인 코드 | 백틱 제거, 내용 유지 |
| 코드 블록 | 원문 유지, 언어가 있으면 `[swift]`처럼 표시 |
| 표 | HTML 테이블로 미리보기, 평문 복사 시 탭으로 구분 |

복사 버튼은 **HTML과 일반 텍스트(TSV 포함)**를 함께 제공합니다. 붙여넣는 앱에 따라 테이블 또는 탭 구분 텍스트로 처리됩니다.

일반적인 Markdown 문법을 지원하는 경량 변환기입니다. 참조형 링크, 복잡하게 중첩된 괄호가 있는 링크, HTML 기반 서식 및 전체 CommonMark 규격은 지원하지 않습니다. 입력한 HTML은 실행하지 않고 문자로 표시합니다.

## 입력 데이터 처리

변환 기능은 브라우저에서 실행되며, 입력 내용을 서버로 전송하거나 브라우저 저장소에 저장하지 않습니다. 복사를 요청할 때만 결과를 클립보드에 기록합니다.

호스팅은 GitHub Pages를 사용합니다. 접속 정보 처리에 관한 내용은 [개인정보 처리 안내](https://42inshin.github.io/removeMarkdown/privacy.html)를 참고하세요.

## 로컬 실행

Node.js 20 이상이 필요합니다. 미리보기에는 Python 3을 사용합니다. 별도 패키지 설치는 필요하지 않습니다.

```sh
git clone https://github.com/42inshin/removeMarkdown.git
cd removeMarkdown
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

[localhost:8000](http://localhost:8000)에서 확인할 수 있습니다. 파일을 수정한 뒤에는 `npm run build`를 다시 실행하세요.

## GitHub Pages 배포

이 저장소는 GitHub Actions로 배포합니다.

- `main`에 push: 테스트 → 빌드 → Pages 배포
- Pull request: 테스트와 빌드만 실행
- 배포 대상: `dist/` 폴더
- 배포 설정: [pages.yml](.github/workflows/pages.yml)

다른 저장소에서 사용할 경우 **Settings → Pages → Source → GitHub Actions**를 선택하세요.

## 검색 설정

canonical, 소셜 메타 태그, sitemap은 현재 배포 주소를 기준으로 설정되어 있습니다.

- [sitemap.xml](https://42inshin.github.io/removeMarkdown/sitemap.xml): Search Console에 제출할 사이트맵
- `index.html`·`privacy.html`: 페이지 메타 정보와 canonical
- `robots.txt`: 프로젝트에 포함된 크롤링 설정

주소가 바뀌면 위 파일의 URL도 함께 수정하세요. 크롤러가 사용하는 robots.txt의 위치는 **호스트 루트 `/robots.txt`**이며, `/removeMarkdown/robots.txt`는 호스트 전체의 크롤링 규칙으로 적용되지 않습니다.

## AdSense 설정

### 연결 현황

| 항목 | 설정 |
| --- | --- |
| 등록 사이트 | `42inshin.github.io` |
| 게시자 ID | `ca-pub-5682766684917953` |
| 소유권 확인 메타 태그 | 루트 사이트의 `index.html`에 추가 |
| ads.txt | [42inshin.github.io/ads.txt](https://42inshin.github.io/ads.txt)에 게시 |

루트 홈페이지와 `ads.txt`는 별도 저장소인 [42inshin.github.io](https://github.com/42inshin/42inshin.github.io)에서 관리합니다. 이 프로젝트의 배포 파일에는 포함되지 않습니다.

### 광고 게재

도구 화면에는 광고 스크립트나 광고 단위를 포함하지 않습니다. 광고 운영을 검토할 때는 게시자 콘텐츠가 있는 가이드 페이지를 기준으로 배치와 개인정보 처리 안내를 검토하세요.

## 참고 문서

- [GitHub Pages 배포 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [AdSense 사이트 연결](https://support.google.com/adsense/answer/7584263?hl=ko)
- [AdSense 승인 상태 확인](https://support.google.com/adsense/answer/12170222?hl=ko)
- [ads.txt 안내](https://support.google.com/adsense/answer/12171612?hl=ko)
