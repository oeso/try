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
    navButtonDisable(); //새로고침시 왼쪽 메뉴 버튼 초기화(비활성화);
};

function fileOpenStart(input){
    //fileObj = input; // Fire Base로 넘길 객체에 file 정보를 담아둔다.나중에 설명
    navButtonEnable(); // left menu 버튼 활성화 한다.
    if( input.files ){ // IE9 이상 , 그 외 브라우저
        for(var i=0; i<input.files.length;i++){ // 불러오면 일단 원래 파일명 리스트를 저장해둔다. 원복 가능해야 하므로.
            fileNameList.push(input.files[i].name);
        };
    }else{ // IE9 이하( File List 객체가 없음 )
        fileNameList = nameSort( input.value );
    };
    //writeInTable( input ); // Table에 삽입하는 함수 호출
};

/* 현재 리스트에 파일이 없을 경우 왼쪽 메뉴 비활성화 */
function navButtonDisable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].setAttribute( "disabled", "disabled" );
    };
    openMessage.style.display = "block";
};

/* 현재 리스트에 파일이 하나 이상일 경우 왼쪽 메뉴 활성화 함수 */
function navButtonEnable(){
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].removeAttribute( "disabled" );
    };
    openMessage.style.display = "none";
};


angular.module( 'app', [])
    .controller('editor', [ '$rootScope', '$scope', function( $rootScope, $scope ){
        $scope.fileOpenStart = function(a){
            alert(123);
            console.log(a)
        };
        $scope.leftNav = function(){
            alert(123);
        };
    }]);


/* left menu */
// 현재 리스트에 파일이 없을 경우 왼쪽 메뉴 비활성화 - 부모 요소인 nav의 하위 button 태그들에 disabled 추가/제거
// app.controller('leftMenu', [ '$scope' , function( $scope ){
//         a();
//
// }]);

//
// /* content */
// app.controller('content', [ '$scope' , function( $scope ){
//
// }]);

