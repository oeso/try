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

angular.module('travel')
    .controller('loginController' , function($scope){
        $scope.username = "은선";
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
