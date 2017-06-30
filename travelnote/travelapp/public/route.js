/**
 * Created by ottori on 2017-06-30.
 */

angular.module( 'route', [])

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
    .controller( 'app', function($scope, $location){
        $scope.name = "TEST NAME!!"
    })
