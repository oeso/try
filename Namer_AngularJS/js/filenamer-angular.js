/**
 * Title : File Name Editor developed AngularJS
 * Date : 2017 04 28
 **/

'use strict';

/* body */
angular.module( 'app', []).controller('All', [ '$scope' , function( $scope ) {
    $scope.layerState = false;
}]);

/* file open */
var navBtns // 왼쪽메뉴버튼
    , openMessage
    , fileNameList = [] //open한 file 네임 리스트

window.onload = function(){ //두 개 이상의함수에서 쓰는 변수들은 onload시 초기화.
    navBtns       =  document.getElementById("nav").getElementsByTagName("button"); // 왼쪽메뉴버튼
    openMessage   =  document.getElementById("openMessage"); // 레이어 확인 버튼
    //navButtonDisable(); //새로고침시 왼쪽 메뉴 버튼 초기화(비활성화);
};

var app = angular.module( 'app', [])
    .factory('facebookService', function($q) {
        return {
            getMyLastName: function() {
                var deferred = $q.defer();
                FB.api('/me', {
                    fields: 'last_name'
                }, function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;
            }
        }
    })
    .controller('editor', [ '$rootScope', '$scope', function( $rootScope, $scope ){
        $scope.testTrue = true;
        $scope.testFalse = false;
        $scope.theFile = null;
        $scope.checkedList = [];

        // 전체 삭제
        $scope.resetFile = function () {
            $scope.theFile = null;
        };

        // 선택 삭제
        $scope.deleteRows = function(){
            // 선택된 checkbox가 해당하는 tr을 소팅, 일괄 remove
            $scope.orderDel = true;
        };

        // checkbox를 클릭할 때마다 해당상위 tr 요소들을 리스팅 해 둠
        $scope.checkedSorting = function(checkbox){
            $scope.checkedList.push(checkbox);

            console.log($scope.checkedList[0].item)
        };

        $scope.alerts = function(){
            alert("복사금지!!!")
        }
        $scope.includeAlert = function(){
            console.log("인클루드 파일 정상 로드")
        }

    }])
    // input file 요소 onChange 발생시 파일객체를 가져오는 directive 등록
    .directive('bindFile', [function () {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, el, attrs, ngModel) {
                el.bind('change', function (event) {
                    ngModel.$setViewValue(event.target.files);
                    console.log( event.target.files );
                    $scope.$apply();
                });

                $scope.$watch(function () {
                    return ngModel.$viewValue;
                }, function (value) {
                    if (!value) {
                        el.val("");
                    };
                });
            }
        };
    }])

    .directive('toast', [function () {
        return {
            require: "ngModel",
            restrict: 'A',
            link: function ($scope, el, attrs, ngModel) {
                el.bind('click', function (event) {
                    //ngModel.$setViewValue(event.target.files);
                    $scope.orderDel = true;
                    console.log( this, 'alert' );
                    $scope.$apply();
                });

                $scope.$watch(function () {
                    return ngModel.$viewValue;
                }, function (value) {
                    if (!value) {
                        el.val("");
                    };
                });
            }
        };
    }]);

app.run(['$rootScope', '$window', 'srvAuth',
  function($rootScope, $window, sAuth) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({

      /*
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ )
      */

      appId: '1752200768352421',

      /*
       Adding a Channel File improves the performance
       of the javascript SDK, by addressing issues
       with cross-domain communication in certain browsers.
      */

      channelUrl: 'app/channel.html',

      /*
       Set if you want to check the authentication status
       at the start up of the app
      */

      status: true,

      /*
       Enable cookies to allow the server to access
       the session
      */

      cookie: true,

      /* Parse XFBML */

      xfbml: true,

      /* version */
      version: 'v2.9'
    });
    console.log(FB);

    sAuth.watchAuthenticationStatusChange();

  };

  (function(d){
    // load the Facebook javascript SDK

    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));

}]);