//    Promise를 쓰려 했으나 IE 모든 버전에서 지원하지 않아 쓸 수 없음ㅠㅠ Promise는 ES6버전 부터 정식 채택된 바 있음
//    ( new Promise 생성시 정의되지 않았다고 오류 뜸 )
//    var _promise = new Promise(function( resolve, reject){
//        var findFB = setInterval(function(){
//            if( FB ){
//                clearInterval( findFB );
//                resolve("FB 확인됨");
//            }else{
//                reject('FB찾을 수 없음');
//            }
//        },500);
//    });
//    _promise.then(
//        function(success){
//            console.log(success);
//        },
//        function(fail){
//            console.log(fail);
//        }
//    );
function startBtnShow(){
    document.getElementById("startApp").style.display = "block";
    document.getElementById("loginFacebook").style.display = "none";
};
function startBtnHide() {
    document.getElementById("startApp").style.display = "none";
    document.getElementById("loginFacebook").style.display = "block";
};

/* login화면 진입시 페북 로그인 상태 : 로그인 대화상자를 띄워 XX님으로 계속 버튼 표시. 버튼 클릭시 loginSuccess 화면 리디렉트,  로그아웃 버튼 노출 */
function loginWidthFacebook(response){
    FB.getLoginStatus(function(res){
        if( res.status == "connected" ){
            console.log('로그인 완료 상태. 피드리스트 화면으로.');
            document.getElementById("btnLoginFB").style.display ="none";
            window.location.href = "http://tn.com:3000/#/feedlist";
        }else{
            console.log('미로그인 상태. 로그인버튼 노출');
            document.getElementById("btnLoginFB").style.display ="block";
            //FB.login();
        }
    });
};
function loginpage(response){
    if (response.status === 'connected') {
        if (document.getElementsByClassName("login")[0]) {
            startBtnShow();
        };
    }else{
        if( document.getElementsByClassName("login")[0] ){
            startBtnHide()
        };
    }
}
/* angular module */
angular.module('travel')
    .controller('login', [ '$scope', '$location', '$http', function($scope, $location, $http) {
        //loginWidthFacebook()


        $scope.loginFB = function(){
            FB.login();
        };
    }])
    .controller('loginSuccess', function($scope){
        //loginWidthFacebook()
    })
    .controller('wrap', [ '$scope', '$location', '$http', function($scope, $location, $http) {
        $scope.res;
        $scope.connected =false;

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1752200768352421',
                cookie     : true,  // enable cookies to allow the server to access
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.8' // use graph api version 2.8
            });
            FB.getLoginStatus(function(response) { //문서 로드되자마자 페이스북 로그인 여부 확인
                if (response.status === 'connected') {
                    console.log("facebook 로그인 상태임");
                } else {
                    console.log('facebook 미로그인 상태임');
                    document.location.href = document.location.origin + "/#/login"; //login 화면으로 이동
                };
                loginpage(response);//login 페이지에서.
            });
            var cnt = 0;
            (function call(){
                FB.api('/me', {fields:'music, age_range, photos, picture, likes, gender, languages,link, locale, location, name_format,website, work, id, about, name, cover, education, favorite_teams, email,first_name, last_name'}, function(response){
                    if(!response || response.error){
                        $scope.connected = false;
                        if( cnt >= 10 ){ return false; }
                        call();
                        cnt++;
                    }else{
                        console.log( "성공.response 값 : ", response );
                        $scope.headers(response);//header controller로 분리
                        $scope.accountLoad(response);//accountLoad controller로 분리
                        $scope.useremail = response.email;//loginSuccess controller로 분리
                        $scope.res = response;
                        feedCall();// $scope.$apply(); // 여기서 $scope.apply 하면 안됨
                    };
                });
            })();

            function feedCall(){
                FB.api( '/me/feed', function (response) {
                    if(!response || response.error){
                    }else{
                        $scope.feedListLoad(response);//피드 리스트 클릭시 우측에 데이터 바인딩하는 함수 호출
                        $scope.feedOpenLoad(response.data[0]);//최초 로드시 컨텐츠 영역에 가장 최근 게시물을 뿌림
                    };
                });
            };             
        };

        $scope.goLoginPage = function(){
            console.log($location.url)
            $location.url = '/login';
        };
        $scope.out = function(){
            FB.logout(function(response){
                document.location.href= document.location.origin + "/#/login";
                console.log('로그아웃!!!!!!!!!!!', response)
            });
        };

        /* feed list page */
        $scope.feedListLoad = function(response){
            $scope.feeds = response.data;
            $scope.$apply();
        };
        //피드 리스트 클릭시 우측에 데이터 바인딩하는 함수
        $scope.feedOpen = function(){            
            if(!this.item.story){
                $scope.feedTitle = "게시글";
            }else{
                $scope.feedTitle = this.item.story;
            }
            $scope.feedContents = this.item.message;
            $scope.feedDate = this.item.created_time;
        };
        //최초 로드시 컨텐츠 영역에 가장 최근 게시물을 뿌림
        $scope.feedOpenLoad = function(res){
            $scope.feedTitle = res.story;
            $scope.feedContents = res.message;
            $scope.feedDate = res.created_time;
            $scope.$apply();
        }

        $scope.names = 'Name';
        $scope.userPic = 'https://s3.amazonaws.com/whisperinvest-images/default.png';
        $scope.userMail = 'user@mail.com';

        $scope.headers = function(response){
            $scope.userPic = response.picture.data.url;
            $scope.userMail = response.email;
            $scope.$apply();
        };

        $scope.accountLoad = function(response){
            $scope.picture = response.picture.data.url;
            $scope.first_name = response.first_name;
            $scope.last_name = response.last_name;
            $scope.nation = response.locale;
            $scope.email = response.email;
            $scope.name = response.name;
            $scope.gender = response.gender;
            $scope.languages = response.languages;
            $scope.music = response.music.data;
            $scope.linkss = response.link;
            $scope.likes = response.likes.data;
            $scope.cover = response.cover.source;
            $scope.age_range = response.age_range.min + "세 이상";
            $scope.$apply();
        };

        /* facebook 공유 */
        $scope.reserv_share = function(){
            if(confirm("예약내용을 페이스북에 게시할까요?")){
                var reserveText = angular.element(document.querySelector('#share_list')).text();
                FB.api('/me/feed', 'post', {
                    message: reserveText
                });
            };
        };
        
        //LNB OPEN
        $scope.lnbOpen = function(){
            document.getElementById("aside").style.left = 0;
        };
        //LNB CLOSE
        $scope.lnbClose = function(){
            document.getElementById("aside").style.left = -500+"px";
        };
        $scope.fbLogout = function(){
            console.log('로그아웃을 눌렀음');
            FB.getLoginStatus(function(response) { //문서 로드되자마자 페이스북 로그인 여부 확인

                if (response.status === 'connected') {
                    console.log("facebook 로그인 상태입니다.");
                    FB.logout(function(response) {
                        console.log("token is 2::",FB.getAuthResponse());
                    });
                    console.log("logout 완료");
                } else {
                    document.location.href = document.location.origin + "/#/login"; //login 화면으로 이동
                    console.log('facebook 미로그인 상태입니다.');
                };
            },true);

        }
    }])
    .controller('account', function($scope){
        //loginWidthFacebook()
    })
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
    .controller('reservationSuccess',['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams){
        $scope.info = $location.search();
        console.log($scope.info);
    }])
    .controller('feedlist', function($scope){
        //loginWidthFacebook()
    })
