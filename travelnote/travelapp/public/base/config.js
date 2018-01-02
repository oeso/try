
/* route */
angular.module( 'travel', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {templateUrl: 'login/template.html', controller: 'login'})
            .when('/login', {templateUrl: 'login/template.html', controller: 'login'})
            .when('/loginSuccess', {templateUrl: 'login/login_success.html', controller: 'loginSuccess'})
            .when('/account', {templateUrl: 'account/template.html', controller: 'account'})
            .when('/terms', {templateUrl: 'terms/template.html'})
            .when('/feedlist', {templateUrl: 'feedlist/template.html', controller: 'feedlist'})
            .when('/reservation', {templateUrl: 'reservation/template.html', controller: 'reservation'})
            .when('/reservationSuccess', {templateUrl: 'reservationSuccess/template.html', controller: 'reservationSuccess'})
            .when('/error', {templateUrl: 'error/error.html'})

            .otherwise({redirectTo: '/error'});

        //$locationProvider.html5Mode(true);

    }]);

/* factory 등록시 주의 사항 : 아래와 같이 angular.module( 'travel') 와 같이 써야 함. angular.module( 'travel', ['$window', ...]) <- 여기에 종속물 넣으면 동작 안함 */
angular.module( 'travel')
    .factory('fb', ['$window','$http', '$timeout', '$rootScope', '$q', function($window, $http, $timeout, $rootScope, $q) {
        // (function(d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     js = d.createElement(s); js.id = id;
        //     js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.9&appId=1498390546894034";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));

        $timeout(function(){
            $rootScope.abc = 456;
        });
        function loadFB(){
            var deferred = $q.defer();

        }

        /* gz elite 방식 */
        //TODO: proxyCallback 보강필요 (timeout 처리 등등...)
        function proxyCallback(callback) {
            return function (res) {
                if (res.status < 200 || res.status >= 300) {
                    return callback(res);
                }
                if (!res.data) {
                    callback({message: 'no data!'});
                }
                return callback(null, res.data);
        };
        }
        $rootScope.proxyCallback = proxyCallback;

        function loadingSDK(callback, params, url){
            var rest = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.9&appId=1498390546894034';
            var req = {
                method : 'GET',
                url : rest,
                params : params
            };
            if(url){req.url = url};
            $http.jsonp(rest).success(function(){
                console.log(1)
                proxyCallback(callback);
            }).error(function(){
                alert("error~!")
            })
            //$http(req).then(proxyCallback(callback))
        };
        loadingSDK();

        $timeout(function(){
            console.log(window.fbAsyncInit )
        },3000)

        window.fbAsyncInit = function() {
            FB.init({
                appId: '1752200768352421',
                cookie: true,  // enable cookies to allow the server to access
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });
        };

        return 123;
    }]);
