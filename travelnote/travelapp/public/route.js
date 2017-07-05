/* rout */

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
        $scope.lnbToggle = 0;

        var lnbOpen = function(){
            console.log('MENU click!');
            $scope.lnbToggle = 1;
        }
    });