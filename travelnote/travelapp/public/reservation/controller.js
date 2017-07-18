/* reservation */
angular.module('travel')
    .controller('reservation',['$scope', '$rootScope', '$window', '$routeParams', '$http', '$location', function($scope, $rootScope, $window, $routeParams, $http, $location){
        $scope.tel1 = "010";
        $scope.submit = function(){
            $scope.info = {
                last_name       : $scope.last_name,
                first_name      : $scope.first_name,
                gender           : $scope.gender,
                email           : $scope.email,
                tel1           : $scope.tel1,
                tel2           : $scope.tel2,
                tel3           : $scope.tel3,
                startday           : $scope.startday,
                endday           : $scope.endday,
                nation           : $scope.nation,
                country           : $scope.country,
                linkss           : $scope.linkss,
                memo           : $scope.memo
            };
            $location.path("/reservationSuccess").search( $scope.info );
        };

    }])
