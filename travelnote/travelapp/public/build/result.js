/**
 * Created by ottori on 2017-06-30.
 */


angular.module( 'travel', [])
    .config(function($routeProvider) {

        $routeProvider
            .when('/login', {templateUrl: 'login/template.html'})
            .when('/loginSuccess', {templateUrl: 'login/login_success.html'})
            .when('/account', {templateUrl: 'account/template.html'})
            .when('/intro', {templateUrl: 'intro/template.html'})
            .when('/feedlist', {templateUrl: 'feedlist/template.html'})
            .when('/reservation', {templateUrl: 'reservation/template.html'})
            .when('/reservationSuccess', {templateUrl: 'reservationSuccess/template.html'})

            .otherwise({redirectTo: 'error/error.html'});
    })
    .controller('wrap', function($scope){

        //LNB 열기
        $scope.lnbOpen = function(){
            console.log('MENU 열기');
            $scope.lnbToggle = 'open';
        };
        //LNB 닫기
        $scope.lnbClose = function(){
            console.log('MENU 닫음');
            $scope.lnbToggle = 'close';
        };

        //로그아웃
        $scope.fbLogout = function(){
            facebookLogout();
        };
    });

/* feed list */
angular.module('travel')
    .controller('feedlist', function($scope){
        console.log(2);

        $scope.feedListLoad = function(){
            feedlistLoad();

            $scope.fees  =  function() {
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
            };
        }
    });


/**
 * Account
 * Created by ottori on 2017-06-30.
 */

/**
 * feedlist
 * Created by ottori on 2017-06-30.
 */

/* header */
//
// angular.module( 'travel', [])
//     .controller('header', function($scope){
//         document.getElementById("aside").style.left = -500+"px";
//     })
/**
 * login
 * Created by ottori on 2017-06-30.
 */
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


angular.module('travel')
    .controller('loginController' , function($scope){
        /* Facebook Javascript SDK */


        $scope.last_name = 'lastname'

        // $scope.getMyLastName = function() {
        //     facebookService.getMyLastName()
        //         .then(function(response) {
        //                 $scope.last_name = response.last_name;
        //             }
        //         );
        // };

    });

/**
 * loginSuccess
 * Created by ottori on 2017-06-30.
 */

angular.module('travel')
    .controller('loginSuccessController' , function($scope){
        $scope.useremail = "ottori@gmail.com"; // sns 사용자 계정 이메일 가져와서 바인딩
    });

/**
 * reservation
 * Created by ottori on 2017-06-30.
 */

/**
 * reservationSuccess
 * Created by ottori on 2017-06-30.
 */
