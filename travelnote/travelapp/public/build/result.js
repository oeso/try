/**
 * route
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
    .controller( 'wrap', function($scope, $location){
        $scope.name = "TEST NAME!!"
    })

/**
 * Account
 * Created by ottori on 2017-06-30.
 */

/**
 * feedlist
 * Created by ottori on 2017-06-30.
 */

/**
 * header
 * Created by ottori on 2017-06-30.
 */

/**
 * login
 * Created by ottori on 2017-06-30.
 */

var tkn, res;

angular.module('travel')
    .controller('loginController' , function($scope){
        /* Facebook Javascript SDK */

        $scope.logged = true;
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1752200768352421',
                xfbml      : true,
                version    : 'v2.9'
            });
            FB.AppEvents.logPageView();

            FB.getLoginStatus(function(response) {
                console.log($scope)
                //console.log("response.authResponse : ", response.authResponse);
                //console.log("액세스토큰 : " , response.authResponse.accessToken);


                tkn = response.authResponse.accessToken;
                res = response.status;
                if (response.status === 'connected') {
                    console.log('Logged in.');
                    $scope.logged = true;
                    $scope.username = "oes";//임시로 test

                }else {
                    console.log("미로그인");
                    $scope.notLogged = true;
                    FB.login();
                }

            });

            /* make the API call */
            FB.api(
                "1752200768352421",
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                    }
                    console.log(response);
                }
            );

        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.9&appId=1498390546894034";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

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
