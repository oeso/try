function startBtnDisplay(bool){
    if(bool){
        document.getElementById("startApp").style.display = "none";
        document.getElementById("loginFacebook").style.display = "block";
    }else{
        document.getElementById("startApp").style.display = "none";
        document.getElementById("loginFacebook").style.display = "block";
    };
};

/* angular module */
angular.module('travel')
    .controller('wrap', [ '$scope', '$location', '$http', function($scope, $location, $http ) {

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
                    FB.api('/me', {fields:'events,videos,about,education,favorite_athletes,hometown,work,groups,religion,birthday, email,first_name, last_name,music, age_range, picture, likes, gender, languages,link, locale, name, cover'}, function(response){
                        if(!response || response.error){
                            if( cnt >= 10 ){ return false; }
                            call();
                            cnt++;
                        }else{
                            console.log( "성공.response 값 : ", response );
                            $scope.headers(response);
                            $scope.accountLoad(response);
                            $scope.useremail = response.email;
                            feedCall();
                            console.log(response)
                        };
                    });
                    if (document.getElementsByClassName("login")[0]) {
                        startBtnDisplay(true);
                    };
                } else {
                    console.log('facebook 미로그인 상태임');
                    document.location.href = document.location.origin + "/#/login"; //login 화면으로 이동
                    if (document.getElementsByClassName("login")[0]) {
                        startBtnDisplay(false);
                    };  
                };

            });
            var cnt = 0;

            function feedCall(){
                FB.api( '/me/feed', function (response) {
                    if(response){
                        $scope.feedListLoad(response);//피드 리스트 클릭시 우측에 데이터 바인딩하는 함수 호출
                        $scope.feedOpenLoad(response.data[0]);//최초 로드시 컨텐츠 영역에 가장 최근 게시물을 뿌림
                    };
                });
                FB.api( '/me/groups', function (response) {
                    console.log("groups ::::", response)
                });
                FB.api( '/me/videos', function (response) {
                    console.log("videos ::::", response)
                });
                /*FB.api( '/me/photos', function (response) {
                    console.log("photos ::::", response);
                    $scope.photoSet(response.data)
                });*/
                FB.api( '/me/books', function (response) {
                    console.log("books ::::", response)
                });
            };             
        };

        $scope.goLoginPage = function(){
            console.log($location.url)
            $location.url = '/login';
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
            $scope.feedPhotos = res.created_time;
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
                        console.log("액세스 token is ::",FB.getAuthResponse());
                        window.location.reload();
                    });
                    console.log("logout 완료");
                } else {
                    document.location.href = document.location.origin + "/#/login"; //login 화면으로 이동
                    console.log('facebook 미로그인 상태입니다.');
                };
            },true);

        }
    }])


