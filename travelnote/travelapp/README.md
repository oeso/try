#AngularJS+SNS API 구현 프로젝트

## login페이지 진입시 버튼 구별 노츨
1. 해당 브라우저에 facebook 미로그인 상태(당연히 액세스 토큰도 없는 상태임) : Login with Facebook 버튼만 노출
2. 해당 브라우저에 facebook 로그인 상태, 액세스 토큰이 없는 경우(TravelNote 미로그인임) : Login with Facebook 버튼만 노출
2. 해당 브라우저에 facebook 로그인 상태, 액세스 토큰이 있는 경우 : START 버튼만 노출


# 2017년 11월 2차 업그레이드
### 업그레이드 사항
1. factory와 service의 유용함 캐치 ---> 필요한 외부 js 라이브러리나 api 를 factory에 담아 각 컨트롤러에서 가져다 쓸 수 있게 수정.
2. 각 (QA, DEV, LIVE 서버별) API 도메인을 다르게 당겨올 수 있는 코드 작성.
3. template에 있던 controller 네임을 route.js 내부로 가져옴.
4. 기능이 wrap controller 내부에 몰려있었으며 각 컨트롤러로 떼어 분류함.
5. Highcharts.js 추가

