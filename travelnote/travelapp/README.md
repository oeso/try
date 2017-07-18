#AngularJS+SNS API 구현 프로젝트

## login페이지 진입시 버튼 구별 노츨
1. 해당 브라우저에 facebook 미로그인 상태(당연히 액세스 토큰도 없는 상태임) : Login with Facebook 버튼만 노출
2. 해당 브라우저에 facebook 로그인 상태, 액세스 토큰이 없는 경우(TravelNote 미로그인임) : Login with Facebook 버튼만 노출
2. 해당 브라우저에 facebook 로그인 상태, 액세스 토큰이 있는 경우 : START 버튼만 노출