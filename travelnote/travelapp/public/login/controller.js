/* login */
angular.module('travel')
    .controller('login', [ '$scope', '$location', '$http', function($scope, $location, $http) {
        //loginWidthFacebook()
        $scope.loginFB = function(){
            FB.login();
            $location.path('/loginSuccess');
        };
    }])