/* reservationSuccess */
angular.module('travel')
    .controller('reservationSuccess',['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams){
        $scope.info = $location.search();
        console.log($scope.info);
    }])