# 네이버 API 고객 니즈 조사

바닥왁스코팅 FAQ 후보를 찾기 위한 내부 조사 도구입니다. 공개 웹페이지나 API 경로로 노출하지 않습니다.

## 환경변수

- `NAVER_CLIENT_ID`: NAVER API HUB의 `X-NCP-APIGW-API-KEY-ID`
- `NAVER_CLIENT_SECRET`: NAVER API HUB의 `X-NCP-APIGW-API-KEY`

키는 `.env` 파일, Git, 문서 또는 클라이언트 코드에 저장하지 않습니다.

## 실행

환경변수가 설정된 터미널에서 다음 명령을 실행합니다.

```powershell
npm run research:naver
```

블로그·카페·지식iN 검색 결과에서 반복되는 관심사를 분류하고, 최근 12개월 검색어 트렌드를 함께 JSON으로 출력합니다. 외부 검색 결과는 고객 질문을 찾는 참고자료로만 사용합니다. FAQ 답변은 찐청소의 실제 작업 범위와 확인된 사실을 기준으로 별도 작성합니다.

읽기 쉬운 텍스트 파일로 저장하려면 다음처럼 실행합니다.

```powershell
node scripts/naver-customer-needs.mjs --text --output=outputs/naver-floor-wax-customer-needs.txt
```
