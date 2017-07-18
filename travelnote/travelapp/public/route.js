/* route */

angular.module( 'travel', [])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {templateUrl: 'login/template.html'})
            .when('/login', {templateUrl: 'login/template.html'})
            .when('/loginSuccess', {templateUrl: 'login/login_success.html'})
            .when('/account', {templateUrl: 'account/template.html'})
            .when('/terms', {templateUrl: 'terms/template.html'})
            .when('/feedlist', {templateUrl: 'feedlist/template.html'})
            .when('/reservation', {templateUrl: 'reservation/template.html'})
            .when('/reservationSuccess', {templateUrl: 'reservationSuccess/template.html'})
            .when('/error', {templateUrl: 'error/error.html'})

            .otherwise({redirectTo: '/error'});

        //$locationProvider.html5Mode(true);

    })
