
console.log('Angular module 시작');

//    Promise를 쓰려 했으나 IE 모든 버전에서 지원하지 않아 쓸 수 없음ㅠㅠ
//    Promise는 ES6버전 부터 정식 채택된 바 있음
//    ( new Promise 생성시 정의되지 않았다고 오류 뜸 )
//    var _promise = new Promise(function( resolve, reject){
//        var findFB = setInterval(function(){
//            if( FB ){
//                clearInterval( findFB );
//                resolve("FB 확인됨");
//            }else{
//                reject('FB찾을 수 없음');
//            }
//        },500);
//    });
//    _promise.then(
//        function(success){
//            console.log(success);
//
//        },
//        function(fail){
//            console.log(fail);
//        }
//    );
var names = 123;

// feed list를 가져와서 리턴하는 함수
function feedBind(){
    FB.api('/me', {fields:'last_name'}, function(response){
        console.log(response);
        console.log(response.last_name);
        names = response.last_name;
        return response.last_name;
    })
    return names;
}

//페이스북 로그인 여부 확인
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log("로그인 상태입니다.");
        document.getElementById("btnLoginFB").style.display ="none";
    } else {
        //document.getElementById('status').innerHTML = 'Loggin with Facebook';
        console.log('미로그인 상태입니다.');
    };
};


/* login화면 진입시 페북 로그인 상태 : 로그인 대화상자를 띄워 XX님으로 계속 버튼 표시. 버튼 클릭시 loginSuccess 화면 리디렉트,  로그아웃 버튼 노출 */
function loginWidthFacebook(){
    FB.login(function(response){ //login을 호출하기면 하면 로그인 대화상자가 생김. 쉼표로 구분하여 나열한 리스트인 선택적 scope 매개변수를 함께 호출하면 추가로 사용자 데이터를 요청할 수 있다.

        if( response.status == "connected" ){
            console.log('이미 로그인 상태. 피드리스트 화면으로.');
            window.location.href = "http://tn.com:3000/#/loginSuccess";
        }else{
            //FB.login();
        }
    }, {scope: 'public_profile, email, user_likes'});
}

/* 로그아웃 */
function facebookLogout(){
    FB.login(function(response){
        console.log('로그아웃 되었습니다.')
    });
}
/* feedlist */
function feedlistLoad() {
    FB.api('/me', {fields: 'last_name'}, function (response) {
        console.log(response);
    });
};

//메시지 게시하는 api
function write(){
    FB.login(function(){
        FB.api('/me/feed', 'post', {
            message: 'Hello, world!'
        });
    }, {
        scope: 'publish_actions'
    });
};




/* angular module */
angular.module('travel')
    .controller('feed', function($scope){
        $scope.feeds = [{
            title: 'hi1',
            date: '2017-06-120'
        }, {
            title: 'hello',
            date: '2017-07-03'
        }, {
            title: 'hi hello',
            date: '2017-07-04'
        }];

        //view button click시 타임라인목록 호출/바인딩
        $scope.feedListLoad = function(){
            var feedlists = feedBind();
            console.log(feedlists)
            console.log("AAAAAAAAAAAAA:",feedBind)

            $scope.$watch('feedlists', function(newValue, oldValue){
                window.alert('$scope.feedlists의 값이 ' + $scope['feedlists'] + '로 바뀌었습니다!');
            }, true);

            $scope.feeds = [{
                title: feedlists,
                date: '2017-06-12'
            }, {
                title: 'hello',
                date: '2017-07-03'
            }, {
                title: 'hi hello',
                date: '2017-07-04'
            }];
            console.log(12)
        };

        // $scope.$watch('FB', function(newValue, oldValue){
        //     window.alert('$scope.FB의 값이 ' + $scope['FB'] + '로 바뀌었습니다!');
        // }, true);
    });

// $scope.$watch('llll',function(){
//     console.log('aaa')
// })

/* header */
//
// angular.module( 'travel', [])
//     .controller('header', function($scope){
//         document.getElementById("aside").style.left = -500+"px";
//     })
//
// var tkn, res;
// function statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//     if (response.status === 'connected') {
//         // Logged into your app and Facebook.
//         testAPI();
//     } else {
//         // The person is not logged into your app or we are unable to tell.
//         document.getElementById('status').innerHTML = 'Please log ' +
//             'into this app.';
//     }
// }
//
// // This function is called when someone finishes with the Login
// // Button.  See the onlogin handler attached to it in the sample
// // code below.
// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//         statusChangeCallback(response);
//     });
// }
//
// window.fbAsyncInit = function() {
//     FB.init({
//         appId      : '1752200768352421',
//         xfbml      : true,
//         version    : 'v2.9'
//     });
//     FB.AppEvents.logPageView();
//
//     FB.getLoginStatus(function(response) {
//         console.log($scope)
//         //console.log("response.authResponse : ", response.authResponse);
//         //console.log("액세스토큰 : " , response.authResponse.accessToken);
//
//
//         tkn = response.authResponse.accessToken;
//         res = response.status;
//         if (response.status === 'connected') {
//             console.log('Logged in.');
//             $scope.logged = true;
//             $scope.username = "oes";//임시로 test
//
//         }else {
//             console.log("미로그인");
//             $scope.notLogged = true;
//             FB.login();
//         }
//
//     });
//
//     (function(d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         js = d.createElement(s); js.id = id;
//         js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.9&appId=1498390546894034";
//         fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));
//
//
//     /* make the API call */
//     FB.api(
//         "1752200768352421",
//         function (response) {
//             if (response && !response.error) {
//                 /* handle the result */
//             }
//             console.log(response);
//         }
//     );
//     function testAPI() {
//         console.log('Welcome!  Fetching your information.... ');
//         FB.api('/me', function(response) {
//             console.log('Successful login for: ' + response.name);
//             document.getElementById('status').innerHTML =
//                 'Thanks for logging in, ' + response.name + '!';
//         });
//     }
// };

//
// angular.module('travel')
//     .controller('loginController' , function($scope){
//         /* Facebook Javascript SDK */
//
//
//         $scope.last_name = 'lastname'
//
//         // $scope.getMyLastName = function() {
//         //     facebookService.getMyLastName()
//         //         .then(function(response) {
//         //                 $scope.last_name = response.last_name;
//         //             }
//         //         );
//         // };
//
//     });

//
// angular.module('travel')
//     .controller('loginSuccessController' , function($scope){
//         $scope.useremail = "ottori@gmail.com"; // sns 사용자 계정 이메일 가져와서 바인딩
//     });
