console.log('Angular module 시작');
//    Promise를 쓰려 했으나 IE 모든 버전에서 지원하지 않아 쓸 수 없음ㅠㅠ Promise는 ES6버전 부터 정식 채택된 바 있음
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
        console.log(response.last_name);
        names = response.last_name;
        return response.last_name;
    })
    return names;
}
//문서 로드되자마자 페이스북 로그인 여부 확인
function statusChangeCallback(response) {
    if (response.status === 'connected') { console.log("facebook 로그인 상태입니다.");
        if(document.location.href == "http://tn.com:3000/#/login"){
            document.location.href = "http://tn.com:3000/#/loginSuccess"
        }
        document.getElementById("btnLoginFB").style.display ="none";
    } else { console.log('facebook 미로그인 상태입니다.')};
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


/* angular module */
angular.module('travel')
    .controller('wrap', function($scope) {
        $scope.names = 'lastNames';
        $scope.userPic = 'http://forum.whale.naver.com/uploads/monthly_2017_03/25789dd553195df114fd554ff25e5577100619.jpg.e8d69d581ecca3c31172064ea7c7deaf.jpg';
        $scope.userMail = 'email';

        function bindHeaderInfo(res){
            $scope.userPic = res.picture.data.url;
            $scope.userMail = res.email;
            $scope.$apply();
        };
        $scope.headers = function(){
            console.log('testcall')
            setTimeout(function(){
                FB.api('/me', {fields:'picture, email'}, function(response){
                    console.log( "HEADER res : ", response);
                    bindHeaderInfo(response);
                });
            },3000, true)
        };
        $scope.headers();

        //LNB OPEN
        $scope.lnbOpen = function(){
            document.getElementById("aside").style.left = 0;
        };
        //LNB CLOSE
        $scope.lnbClose = function(){
            document.getElementById("aside").style.left = -500+"px";
        }        
        //LOGOUT
        $scope.fbLogout = function(){
            var outment = confirm('로그아웃 하시겠습니까');
            if(outment){
                FB.logout(function(response){
                    console.log('로그아웃 되었습니다.', response)
                });
            }else{console.log('로그인취소함')};
        }        
    })
    .controller('feed', function($scope){
        $scope.feeds = [{ title: 'hi1', date: '2017-06-120' }, { title: 'hello', date: '2017-07-03' }, { title: 'hi hello', date: '2017-07-04' }];

        $scope.$watch('names', function(n , o){
            console.log('$watch :', $scope.names )
        }, true);

        //view button click시 타임라인목록 호출/바인딩
        $scope.feedListLoad = function(){
            $scope.changeNames = function( value ){
                $scope.names = value;
                $scope.feeds = [{
                    title: $scope.names ,
                    date: '2017-06-12'
                }, {
                    title: 'hello',
                    date: '2017-07-03'
                }, {
                    title: 'hi hello',
                    date: '2017-07-04'
                }];
                return $scope.names;
            };

            /* feed API call */
            FB.api( '/me/feed', { limit: 1000 }, function (response) {
                console.log('me/feed : ',response);
                if (response && !response.error) {
                    /* handle the result */
                }
                return $scope.changeNames( response );
            });

            // FB.api('/me', {fields:'feed'}, function(response){
            //     console.log( 'FB.api의 반환 response 값 : ', response );
            //     console.log( response );
            //     return $scope.changeNames( response.email );
            // });

        };
    })
    .controller('account', function($scope){
        $scope.accountLoad = function(){
            $scope.yourAccount = function(response){
                $scope.picture = response.picture.data.url;
                $scope.first_name = response.first_name;
                $scope.last_name = response.last_name;
                $scope.nation = response.locale;
                $scope.email = response.email;
                $scope.gender = response.gender;
                $scope.languages = response.languages;
                $scope.music = response.music.data;
                $scope.linkss = response.link;
                $scope.feed = response.feed; // feed 는 검수받아야 함
                $scope.likes = response.likes.data;
                $scope.cover = response.cover.source;
                $scope.age_range = response.age_range.min + "세 이상";
            };

            FB.api('/me', {fields:'feed,  music, age_range, photos, picture, likes, gender, languages,link, locale, location, name_format,website, work, id, about, name, cover, education, favorite_teams, email,first_name, last_name'}, function(response){
                console.log( 'FB.api의 반환 response 값 : ', response );
                console.log( 'FB.api의 반환 response.age_range 값 : ', response.age_range );

                return $scope.yourAccount( response );
            });
        }
    })
    .controller('reservation', function($scope){

        $scope.accountLoad = function(){};

        $scope.reserv_lastname      = '오';
        $scope.reserv_firstname     = '은선';
        $scope.reserv_email         = 'ellyess@naver.com';
        $scope.reserv_phonenumber   = '010-3378-1526';
        $scope.reserv_gender        = 'femail';
        $scope.reserv_period        = '2017-07-07 ~2017-07-30';
        $scope.reserv_nation        = 'korea';
        $scope.reserv_country       = 'china';
        $scope.reserv_link          = '';
        $scope.reserv_memo          = '다함께 고고고';

        /* facebook 공유 */
        $scope.reserv_share = function(){
            FB.login(function(){
                FB.api('/me/feed', 'post', {
                    message: $scope.reserv_astname + $scope.reserv_firstname + $scope.reserv_email + $scope.reserv_phonenumber + $scope.reserv_gender + $scope.reserv_period + $scope.reserv_nation + $scope.reserv_country + $scope.reserv_link + $scope.reserv_memo
                });
            }, {
                scope: 'publish_actions'
            });
        };
    })

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
