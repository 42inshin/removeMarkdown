# 마크다운 제거

한국어 Markdown → 일반 텍스트 변환기. 외부 의존성 없이 브라우저에서 처리합니다. 입력은 저장하거나 전송하지 않습니다.

## 실행 및 배포

Node.js 20 이상에서 `npm test`, `npm run build`를 실행하세요. 로컬 확인은 `python3 -m http.server 8000 --directory dist` 후 http://localhost:8000 을 열면 됩니다.

GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정하세요. main 브랜치에 올리면 포함된 workflow가 테스트 후 배포합니다. 예상 주소: https://42inshin.github.io/removeMarkdown/ . PR에서는 테스트와 빌드만 수행합니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 변환과 복사

제목, 강조, 취소선, 인용 기호를 제거합니다. 목록 들여쓰기와 체크박스를 유지하고 `*`, `+` 목록을 `-`로 통일합니다. 링크와 이미지는 `설명 (URL)`, fenced code는 `[언어]`와 원문으로 출력합니다. 표를 HTML 테이블로 표시하며 복사 버튼은 HTML과 TSV 텍스트를 함께 제공합니다. 붙여넣을 앱에 따라 HTML 테이블 또는 탭 구분 텍스트가 사용됩니다. 입력 HTML은 실행하지 않고 문자로 표시합니다.

경량 변환기로 일반적인 Markdown 문법을 지원합니다. 참조형 링크, 중첩된 괄호가 복잡한 링크, HTML 기반 서식 및 전체 CommonMark 규격은 지원 범위가 아닙니다.

## SEO

canonical, 소셜 메타와 sitemap은 `https://42inshin.github.io/removeMarkdown/` 기준입니다. 주소가 바뀌면 HTML과 sitemap, robots를 함께 수정하세요. robots.txt의 표준 위치는 호스트 루트 `/robots.txt`입니다. 프로젝트 경로의 파일만으로는 호스트 전체 크롤링 규칙이 적용되지 않으므로 42inshin.github.io 루트 저장소에도 필요한 robots 설정을 반영하세요. Search Console에서 sitemap URL을 제출할 수 있습니다.

## AdSense 연결

`index.html`의 head에 게시자 `ca-pub-5682766684917953`의 AdSense 스크립트를 연결했습니다. AdSense에서 사이트를 승인하고 자동 광고를 활성화하면 계정 설정에 따라 광고가 게재됩니다. 코드 연결만으로 승인이나 광고 노출을 보장하지 않습니다.

수동 광고용 `#ad-slot`은 숨겨져 있습니다. 특정 위치에만 광고를 표시하려면 실제 광고 단위 코드가 추가로 필요합니다. 자동 광고를 사용할 때는 AdSense 미리보기에서 변환기 입력·결과 영역을 방해하지 않는 위치를 확인하세요.

1. 운영자 정보와 개인정보 안내를 실제 운영 상황에 맞춰 검토하고 AdSense에 사이트를 등록하세요. 계정에서 제공한 소유권 확인 메타 태그를 head에 추가할 수 있습니다.
2. 계정의 사이트 상태가 Ready인지 확인하세요. 광고 도입 전 개인정보 안내를 수정하고 대상 지역에 필요한 동의 처리를 구성하세요.
3. 수동 광고를 사용할 경우 계정에서 발급한 광고 단위 코드를 사용하세요. 광고 스크립트는 이미 로드되므로 중복 삽입하지 말고, `#ad-slot`의 hidden을 해제한 뒤 광고 단위를 삽입하세요. 입력 내용을 광고 요청에 전달하지 마세요.
4. ads.txt는 `https://42inshin.github.io/ads.txt`에서 제공해야 합니다. 이 프로젝트 하위 경로가 아니라 **42inshin.github.io 루트 저장소**에 계정에서 제공한 내용을 게시하세요. 루트에 접근할 수 없다면 직접 관리하는 도메인을 검토하세요.

5. AdSense의 개인정보 보호 및 메시지에서 적용 대상 지역의 동의 메시지를 설정하세요. 사이트가 실제로 사용하는 광고 설정과 동의 절차에 맞춰 개인정보 안내를 유지하세요.

공식 안내:
- https://support.google.com/adsense/answer/12131223
- https://support.google.com/adsense/answer/12170222
- https://support.google.com/adsense/answer/12171612
