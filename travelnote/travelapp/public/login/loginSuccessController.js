/* loginSuccess */
angular.module('travel')
    .controller('loginSuccess', [ '$scope', '$rootScope','$timeout','$q','fb', function($scope , $rootScope, $timeout, $q, FB ){
        $rootScope.gnbInfo = {
            title : '로그인 완료'
        };
        $rootScope.foot = "FOOTER";
        $scope.testitem = api.academyMessages.networkGetFail;
        $scope.useremail = 123;
        console.log($rootScope)
        //loginWidthFacebook()

        $timeout(function(){
            $rootScope.gnbInfo = {title : "으랏차차!!!!!"};
            $scope.useremail = "성공. $timeout에의 해 바뀜";
        },2300);
        $timeout(function(){
            $scope.foot = "footer";
        },500);

        $rootScope.$watch('gnbInfo',function(o){
            console.log('watch 발생!!!' , o)
        });
        $rootScope.$watch('foot',function(o){
            console.log('watch 발생~~~~!!!' , o)
        });

        function asyncGreet(name) {
            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('setTimeout 시작합니다. 인자 : ' + name);

                if ($scope.useremail == 123) {
                    deferred.resolve('Hello, ' + name + '!');
                } else {
                    deferred.reject('Greeting ' + name + ' is not allowed.');
                }
            }, 1000);
            console.log(deferred)
            // deferred 의 promise 의 값은
            return deferred.promise;
        }

        var promise = asyncGreet('OES');
        promise.then(function(data) {
            console.log('Success: ' + data);
        }, function(reason) {
            console.log('Failed: ' + reason);
        }, function(update) {
            console.log('Got notification: ' + update);
        });
    }]);